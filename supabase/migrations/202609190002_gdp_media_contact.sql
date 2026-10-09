-- Attachments need human review; retain supplied lead email without unverified identity merging.
create or replace function public.gdp_chat_ingest(p_channel text,p_external_ref text,p_body text,p_request_id text,p_name text default null,p_phone text default null,p_media jsonb default '[]') returns jsonb
language plpgsql security definer set search_path='' as $$
declare c public.gdp_chat_conversations; m public.gdp_chat_messages; cid uuid; wants_human boolean; begin
 perform pg_advisory_xact_lock(hashtextextended('gdp:'||p_channel||':'||p_external_ref,0));
 select * into m from public.gdp_chat_messages where request_id=p_request_id;
 if found then return jsonb_build_object('conversation_id',m.conversation_id,'message_id',m.id,'duplicate',true); end if;
 select * into c from public.gdp_chat_conversations where channel=p_channel and external_ref=p_external_ref;
 if not found then
  if p_channel='whatsapp' then
   insert into public.gdp_chat_contacts(name,phone_e164,wa_id) values(p_name,p_phone,p_external_ref)
   on conflict(wa_id) do update set name=coalesce(excluded.name,gdp_chat_contacts.name) returning id into cid;
  else insert into public.gdp_chat_contacts(name) values(p_name) returning id into cid; end if;
  insert into public.gdp_chat_conversations(channel,external_ref,contact_id) values(p_channel,p_external_ref,cid) returning * into c;
 end if;
 select exists(select 1 from public.gdp_chat_config cfg,unnest(cfg.handoff_keywords) k where lower(trim(p_body))=k or lower(p_body) ~ '\m(talk|speak|connect|chat)\s+(to|with)\s+(a\s+|an\s+|the\s+)?(human|agent|person|someone|stephen|team)\M') into wants_human;
 wants_human := wants_human or jsonb_array_length(p_media)>0;
 update public.gdp_chat_conversations set last_inbound_at=now(),updated_at=now(),unread_count=unread_count+1,
 mode=case when wants_human then 'human' else mode end,
 mode_version=mode_version+case when wants_human then 1 else 0 end where id=c.id;
 insert into public.gdp_chat_messages(conversation_id,channel,author,direction,body,request_id,provider_sid,media)
 values(c.id,p_channel,'customer','in',p_body,p_request_id,case when p_channel='whatsapp' then p_request_id else null end,p_media) returning * into m;
 -- Store a supplied email without automatically merging identities across channels.
 if p_body ~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}' then
  update public.gdp_chat_contacts set email=lower(substring(p_body from '(?i)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}')) where id=c.contact_id and email is null;
 end if;
 insert into public.gdp_chat_jobs(message_id,conversation_id,handoff) values(m.id,c.id,wants_human and c.mode='ai');
 return jsonb_build_object('conversation_id',c.id,'message_id',m.id,'duplicate',false);
end $$;
