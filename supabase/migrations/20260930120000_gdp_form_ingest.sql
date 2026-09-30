-- Website forms (contact + project wizard) become human-mode conversations in
-- the GDP inbox and reuse the durable email notification queue. No AI job is
-- created (nobody is waiting in a chat session). Additive; nothing dropped.
create or replace function public.gdp_form_ingest(p_name text, p_email text, p_body text, p_request_id text, p_flags text[] default '{}')
returns jsonb language plpgsql security definer set search_path='' as $$
declare c public.gdp_chat_conversations; m public.gdp_chat_messages; cid uuid; ref text; body text;
begin
  ref := 'form:' || lower(trim(p_email));
  perform pg_advisory_xact_lock(hashtextextended('gdp:web:' || ref, 0));
  select * into m from public.gdp_chat_messages where request_id = p_request_id;
  if found then return jsonb_build_object('conversation_id', m.conversation_id, 'message_id', m.id, 'duplicate', true); end if;
  select * into c from public.gdp_chat_conversations where channel = 'web' and external_ref = ref;
  if not found then
    insert into public.gdp_chat_contacts(name, email) values (nullif(trim(p_name), ''), lower(trim(p_email))) returning id into cid;
    insert into public.gdp_chat_conversations(channel, external_ref, contact_id, mode, mode_version)
      values ('web', ref, cid, 'human', 1) returning * into c;
  else
    update public.gdp_chat_contacts set name = coalesce(nullif(trim(p_name), ''), name), email = coalesce(email, lower(trim(p_email))) where id = c.contact_id;
    update public.gdp_chat_conversations set mode = 'human', mode_version = mode_version + 1 where id = c.id and mode <> 'human';
  end if;
  body := p_body || case when coalesce(array_length(p_flags, 1), 0) > 0 then E'\n\n[Review signals: ' || array_to_string(p_flags, ', ') || ' — looks automated, verify before replying]' else '' end;
  update public.gdp_chat_conversations set last_inbound_at = now(), updated_at = now(), unread_count = unread_count + 1 where id = c.id;
  insert into public.gdp_chat_messages(conversation_id, channel, author, direction, body, request_id)
    values (c.id, 'web', 'customer', 'in', body, p_request_id) returning * into m;
  return jsonb_build_object('conversation_id', c.id, 'message_id', m.id, 'duplicate', false);
end $$;
revoke all on function public.gdp_form_ingest(text, text, text, text, text[]) from public, anon, authenticated;
grant execute on function public.gdp_form_ingest(text, text, text, text, text[]) to service_role;
