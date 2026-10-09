-- GDP has no existing chat store: public.conversations is another system's message log.
-- Shared tables below serve BOTH web and WhatsApp, isolated from the other brands.
create table public.gdp_chat_admins (user_id uuid primary key references auth.users(id), created_at timestamptz not null default now());
alter table public.gdp_chat_admins enable row level security;
insert into public.gdp_chat_admins(user_id)
select distinct u.id from auth.users u join public.admin_users a on lower(a.email)=lower(u.email)
where a.is_active and a.role='super_admin' and a.name ilike '%Stephen%';
create function public.gdp_chat_is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.gdp_chat_admins where user_id=auth.uid());
$$;
revoke all on function public.gdp_chat_is_admin() from public, anon;
grant execute on function public.gdp_chat_is_admin() to authenticated, service_role;
create table public.gdp_chat_contacts (
 id uuid primary key default gen_random_uuid(), name text, email text, phone_e164 text, wa_id text unique,
 created_at timestamptz not null default now()
);
create table public.gdp_chat_conversations (
 id uuid primary key default gen_random_uuid(), channel text not null check(channel in ('web','whatsapp')),
 contact_id uuid references public.gdp_chat_contacts, external_ref text not null,
 mode text not null default 'ai' check(mode in ('ai','human')), mode_version integer not null default 0,
 last_inbound_at timestamptz, last_outbound_at timestamptz, unread_count integer not null default 0,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(channel,external_ref)
);
create index on public.gdp_chat_conversations(updated_at desc);
create index on public.gdp_chat_conversations(contact_id);
create table public.gdp_chat_messages (
 id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.gdp_chat_conversations on delete cascade,
 channel text not null check(channel in ('web','whatsapp')), author text not null check(author in ('customer','ai','human','system')),
 direction text not null check(direction in ('in','out')), body text not null,
 provider_sid text unique, request_id text unique, status text not null default 'received',
 media jsonb not null default '[]', created_at timestamptz not null default now()
);
create index on public.gdp_chat_messages(conversation_id,created_at);
create table public.gdp_chat_config (
 id boolean primary key default true check(id), ai_enabled boolean not null default true,
 twilio_from text not null default 'whatsapp:+16068067748',
 handoff_keywords text[] not null default array['agent','human','speak to someone','talk to a person','speak to stephen'],
 knowledge text not null default '', updated_at timestamptz not null default now()
);
insert into public.gdp_chat_config(id,knowledge) values(true,'Global Digital Prime provides enterprise software development, AI and machine learning, cloud infrastructure, digital transformation, cybersecurity and data analytics for USA and Indonesia markets. Contact: info@globaldigitalprime.com. Pricing and contracts require review by the team.');
create table public.gdp_chat_jobs (
 id uuid primary key default gen_random_uuid(), message_id uuid not null unique references public.gdp_chat_messages,
 conversation_id uuid not null references public.gdp_chat_conversations,
 state text not null default 'pending' check(state in ('pending','processing','done','failed')),
 handoff boolean not null default false, attempts integer not null default 0, available_at timestamptz not null default now(), started_at timestamptz,
 last_error text, created_at timestamptz not null default now()
);
create index on public.gdp_chat_jobs(state,available_at);
create table public.gdp_chat_errors (
 id uuid primary key default gen_random_uuid(), service text not null, code text not null,
 conversation_id uuid references public.gdp_chat_conversations, created_at timestamptz not null default now()
);
create table public.gdp_chat_status_events(provider_sid text primary key,status text not null,created_at timestamptz not null default now());
create table public.gdp_chat_rate_limits(key text primary key, hits integer not null default 1, expires_at timestamptz not null);
-- Read-only admin browser access; mutations must pass server-side authorization.
do $$ declare t text; begin
 foreach t in array array['gdp_chat_contacts','gdp_chat_conversations','gdp_chat_messages','gdp_chat_config','gdp_chat_jobs','gdp_chat_errors','gdp_chat_status_events','gdp_chat_rate_limits'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('revoke all on public.%I from anon, authenticated',t);
 execute format('grant all on public.%I to service_role',t);
 end loop;
 foreach t in array array['gdp_chat_contacts','gdp_chat_conversations','gdp_chat_messages','gdp_chat_config','gdp_chat_errors'] loop
 execute format('grant select on public.%I to authenticated',t);
 execute format('create policy gdp_admin_read on public.%I for select to authenticated using (public.gdp_chat_is_admin())',t);
 end loop;
end $$;
alter publication supabase_realtime add table public.gdp_chat_conversations,public.gdp_chat_messages,public.gdp_chat_errors;

create function public.gdp_chat_ingest(p_channel text,p_external_ref text,p_body text,p_request_id text,p_name text default null,p_phone text default null,p_media jsonb default '[]') returns jsonb
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
 update public.gdp_chat_conversations set last_inbound_at=now(),updated_at=now(),unread_count=unread_count+1,
 mode=case when wants_human then 'human' else mode end,
 mode_version=mode_version+case when wants_human then 1 else 0 end where id=c.id;
 insert into public.gdp_chat_messages(conversation_id,channel,author,direction,body,request_id,provider_sid,media)
 values(c.id,p_channel,'customer','in',p_body,p_request_id,case when p_channel='whatsapp' then p_request_id else null end,p_media) returning * into m;
 insert into public.gdp_chat_jobs(message_id,conversation_id,handoff) values(m.id,c.id,wants_human and c.mode='ai');
 return jsonb_build_object('conversation_id',c.id,'message_id',m.id,'duplicate',false);
end $$;
create function public.gdp_chat_claim() returns setof public.gdp_chat_jobs language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended('gdp-job-claim',0));
 -- A crash before a provider send is safe to retry; existing outbox rows prevent re-sending.
 update public.gdp_chat_jobs set state='pending',available_at=now() where state='processing' and started_at<now()-interval '3 minutes';
 return query update public.gdp_chat_jobs j set state='processing',attempts=attempts+1,started_at=now()
 where j.id=(select q.id from public.gdp_chat_jobs q where q.state='pending' and q.available_at<=now()
 and not exists(select 1 from public.gdp_chat_jobs busy where busy.conversation_id=q.conversation_id and busy.state='processing')
 order by q.created_at limit 1 for update skip locked) returning j.*;
end $$;
create function public.gdp_chat_rate(p_key text,p_limit integer,p_seconds integer) returns boolean language plpgsql security definer set search_path='' as $$
declare n integer; begin
 insert into public.gdp_chat_rate_limits(key,expires_at) values(p_key,now()+make_interval(secs=>p_seconds))
 on conflict(key) do update set hits=case when gdp_chat_rate_limits.expires_at<now() then 1 else gdp_chat_rate_limits.hits+1 end,
 expires_at=case when gdp_chat_rate_limits.expires_at<now() then now()+make_interval(secs=>p_seconds) else gdp_chat_rate_limits.expires_at end returning hits into n;
 return n<=p_limit;
end $$;
create function public.gdp_chat_set_mode(p_id uuid,p_mode text) returns void language plpgsql security definer set search_path='' as $$
begin
 if p_mode not in ('ai','human') then raise exception 'Invalid mode'; end if;
 update public.gdp_chat_conversations set mode=p_mode,mode_version=mode_version+1,unread_count=0,updated_at=now() where id=p_id;
end $$;
do $$ declare f text; begin
 foreach f in array array['gdp_chat_ingest(text,text,text,text,text,text,jsonb)','gdp_chat_claim()','gdp_chat_rate(text,integer,integer)','gdp_chat_set_mode(uuid,text)'] loop
 execute 'revoke all on function public.'||f||' from public, anon, authenticated';
 execute 'grant execute on function public.'||f||' to service_role';
 end loop;
end $$;
create function public.gdp_chat_status(p_sid text,p_status text) returns void language plpgsql security definer set search_path='' as $$
declare old_status text; ranks jsonb:='{"accepted":0,"scheduled":0,"queued":1,"sending":2,"sent":3,"delivered":4,"read":5,"failed":6,"undelivered":6,"canceled":6}'; begin
 if not ranks ? p_status then return; end if;
 perform pg_advisory_xact_lock(hashtextextended('gdp-status:'||p_sid,0));
 select status into old_status from public.gdp_chat_status_events where provider_sid=p_sid;
 if old_status is not null and (ranks->>old_status)::int >= (ranks->>p_status)::int then return; end if;
 insert into public.gdp_chat_status_events(provider_sid,status) values(p_sid,p_status) on conflict(provider_sid) do update set status=excluded.status;
 update public.gdp_chat_messages set status=p_status where provider_sid=p_sid and channel='whatsapp' and direction='out';
end $$;
revoke all on function public.gdp_chat_status(text,text) from public,anon,authenticated;
grant execute on function public.gdp_chat_status(text,text) to service_role;

grant all on public.gdp_chat_admins to service_role;
