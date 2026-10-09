const { spawnSync } = require("child_process");
require("@next/env").loadEnvConfig(process.cwd());
(async () => {
  const e = process.env,
    ref = e.SUPABASE_PROJECT_REF;
  const secrets = [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_WHATSAPP_FROM",
    "ELEVENLABS_API_KEY",
    "ELEVENLABS_AGENT_ID",
    "GDP_INTERNAL_SECRET",
    "TWILIO_CONTENT_SID_GDP_WELCOME",
    "TWILIO_CONTENT_SID_GDP_UPDATE",
    "RESEND_API_KEY",
    "GDP_ERROR_NOTIFICATION_EMAILS",
    "GDP_ERROR_NOTIFICATION_FROM",
    "GDP_MESSAGE_NOTIFICATION_EMAIL",
    "GDP_MESSAGE_NOTIFICATION_FROM",
  ]
    .filter((k) => e[k])
    .map((name) => ({ name, value: e[name] }));
  secrets.push({
    name: "ADMIN_ORIGIN",
    value: "https://www.globaldigitalprime.com",
  });
  const r = await fetch(`https://api.supabase.com/v1/projects/${ref}/secrets`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + e.SUPABASE_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(secrets),
  });
  if (!r.ok) throw Error("Secret upload HTTP " + r.status);
  console.log("Backend secrets configured.");
  for (const name of [
    "whatsapp-inbound",
    "whatsapp-status",
    "whatsapp-send",
    "gdp-chat-worker",
    "gdp-web-chat",
  ]) {
    const p = spawnSync(
      "supabase",
      ["functions", "deploy", name, "--project-ref", ref, "--use-api"],
      { env: process.env, encoding: "utf8" },
    );
    console.log(name + ": " + (p.status === 0 ? "deployed" : "FAILED"));
    if (p.status !== 0) {
      console.log(p.stdout, p.stderr);
      process.exit(1);
    }
  }
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
