begin;
do $$
declare a jsonb; b jsonb; c public.gdp_chat_conversations; n integer; begin
 a:=public.gdp_chat_ingest('web',repeat('f',64),'Can I speak to Stephen?','db-test-1');
 b:=public.gdp_chat_ingest('web',repeat('f',64),'Can I speak to Stephen?','db-test-1');
 if not (b->>'duplicate')::boolean then raise exception 'Duplicate not detected'; end if;
 select * into c from public.gdp_chat_conversations where id=(a->>'conversation_id')::uuid;
 if c.mode<>'human' or c.unread_count<>1 then raise exception 'Handoff or unread count incorrect'; end if;
 select count(*) into n from public.gdp_chat_jobs where conversation_id=c.id;
 if n<>1 then raise exception 'Duplicate job created'; end if;
 perform public.gdp_chat_set_mode(c.id,'ai');
 select * into c from public.gdp_chat_conversations where id=c.id;
 if c.mode<>'ai' or c.unread_count<>0 then raise exception 'Hand-back failed'; end if;
 perform public.gdp_chat_ingest('web',repeat('f',64),'My email is test@example.com','db-test-2');
 if not exists(select 1 from public.gdp_chat_contacts where id=c.contact_id and email='test@example.com') then raise exception 'Lead email not captured'; end if;
 perform public.gdp_chat_ingest('web',repeat('f',64),'Photo','db-test-3',null,null,'[{"type":"image/jpeg"}]');
 if not exists(select 1 from public.gdp_chat_conversations where id=c.id and mode='human') then raise exception 'Media not routed to human'; end if;
 perform public.gdp_chat_status('SM00000000000000000000000000000000','read');
 perform public.gdp_chat_status('SM00000000000000000000000000000000','sent');
 if not exists(select 1 from public.gdp_chat_status_events where provider_sid='SM00000000000000000000000000000000' and status='read') then raise exception 'Status regressed'; end if;
 if has_function_privilege('anon','public.gdp_chat_set_mode(uuid,text)','execute') then raise exception 'Anonymous mutation access'; end if;
end $$;
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
do $$ begin
 if exists(select 1 from public.gdp_chat_conversations) then raise exception 'Non-admin sees conversations'; end if;
 if exists(select 1 from public.gdp_chat_messages) then raise exception 'Non-admin sees messages'; end if;
end $$;
rollback;
