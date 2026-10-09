require("@next/env").loadEnvConfig(process.cwd());
const quote = (s) => "'" + s.replaceAll("'", "''") + "'";
(async () => {
  const e = process.env;
  const query = `create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;
select vault.create_secret(${quote(e.GDP_INTERNAL_SECRET)}, 'gdp_chat_worker_token') where not exists(select 1 from vault.secrets where name='gdp_chat_worker_token');
select cron.schedule('gdp-chat-retry','* * * * *', $job$select net.http_post(url:=${quote(e.SUPABASE_URL + "/functions/v1/gdp-chat-worker")},headers:=jsonb_build_object('Content-Type','application/json','x-gdp-secret',(select decrypted_secret from vault.decrypted_secrets where name='gdp_chat_worker_token')),body:='{}'::jsonb);$job$);
select cron.schedule('gdp-chat-rate-cleanup','17 * * * *', $job$delete from public.gdp_chat_rate_limits where expires_at<now()-interval '1 day';$job$);
select count(*) as authorized_admins from public.gdp_chat_admins;`;
  const r = await fetch(
    "https://api.supabase.com/v1/projects/" +
      e.SUPABASE_PROJECT_REF +
      "/database/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + e.SUPABASE_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!r.ok) throw Error("Cron setup HTTP " + r.status);
  console.log("Retry worker configured; " + (await r.text()));
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
