do $$
declare ch text; md text; r jsonb; r2 jsonb; ref text; cid uuid; mid uuid;
begin
 foreach ch in array array['web','whatsapp'] loop
  foreach md in array array['ai','human'] loop
   ref := 'email-test-'||gen_random_uuid()::text;
   r := public.gdp_chat_ingest(ch,ref,'Email regression test',gen_random_uuid()::text);
   cid := (r->>'conversation_id')::uuid;
   perform public.gdp_chat_set_mode(cid,md);
   r2 := public.gdp_chat_ingest(ch,ref,'Second message',ref);
   perform public.gdp_chat_ingest(ch,ref,'Second message',ref);
   if (select count(*) from public.gdp_chat_email_notifications n join public.gdp_chat_messages m on m.id=n.message_id where m.conversation_id=cid)<>2 then
    raise exception 'Missing or duplicate notification for % %',ch,md;
   end if;
   insert into public.gdp_chat_messages(conversation_id,channel,author,direction,body)
   values(cid,ch,'human','out','Outbound') returning id into mid;
   if exists(select 1 from public.gdp_chat_email_notifications where message_id=mid) then raise exception 'Outbound incorrectly notified'; end if;
  end loop;
 end loop;
 if has_table_privilege('anon','public.gdp_chat_email_notifications','select') or has_table_privilege('authenticated','public.gdp_chat_email_notifications','select') then raise exception 'Private email queue exposed'; end if;
 if has_function_privilege('anon','public.gdp_chat_claim_email()','execute') or has_function_privilege('authenticated','public.gdp_chat_claim_email()','execute') then raise exception 'Private claim exposed'; end if;
end $$;
