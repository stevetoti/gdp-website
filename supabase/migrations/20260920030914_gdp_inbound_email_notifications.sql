-- One durable email per new customer message; no historical backfill.
create table public.gdp_chat_email_notifications (
 message_id uuid primary key references public.gdp_chat_messages(id) on delete cascade,
 state text not null default 'pending' check (state in ('pending','processing','sent','failed')),
 attempts integer not null default 0,
 available_at timestamptz not null default now(),
 started_at timestamptz,
 first_attempt_at timestamptz,
 payload jsonb,
 provider_id text,
 last_error text,
 created_at timestamptz not null default now()
);
alter table public.gdp_chat_email_notifications enable row level security;
revoke all on public.gdp_chat_email_notifications from public,anon,authenticated;
grant all on public.gdp_chat_email_notifications to service_role;
create index gdp_chat_email_pending on public.gdp_chat_email_notifications(available_at) where state in ('pending','processing');
create function public.gdp_chat_queue_email() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if new.direction='in' and new.author='customer' then
  insert into public.gdp_chat_email_notifications(message_id) values(new.id) on conflict do nothing;
 end if;
 return new;
end $$;
revoke all on function public.gdp_chat_queue_email() from public,anon,authenticated;
create trigger gdp_chat_queue_email after insert on public.gdp_chat_messages
for each row execute function public.gdp_chat_queue_email();
create function public.gdp_chat_claim_email() returns setof public.gdp_chat_email_notifications
language plpgsql security definer set search_path='' as $$
begin
 return query
 with candidate as (
  select message_id from public.gdp_chat_email_notifications
  where (state='pending' and available_at<=now())
     or (state='processing' and started_at<now()-interval '3 minutes')
  order by created_at for update skip locked limit 1
 )
 update public.gdp_chat_email_notifications n
 set state='processing', attempts=n.attempts+1, started_at=now(),first_attempt_at=coalesce(n.first_attempt_at,now())
 from candidate where n.message_id=candidate.message_id returning n.*;
end $$;
revoke all on function public.gdp_chat_claim_email() from public,anon,authenticated;
grant execute on function public.gdp_chat_claim_email() to service_role;
