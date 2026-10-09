require("@next/env").loadEnvConfig(process.cwd());
const fs = require("fs");
(async () => {
  const e = process.env;
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(e.TWILIO_ACCOUNT_SID + ":" + e.TWILIO_AUTH_TOKEN).toString(
        "base64",
      ),
    "Content-Type": "application/json",
  };
  const base = "https://messaging.twilio.com/v2/Channels/Senders";
  const r = await fetch(base + "?Channel=whatsapp", { headers });
  if (!r.ok) throw Error("Sender lookup HTTP " + r.status);
  const d = await r.json();
  const sender = d.senders.find((s) => s.sender_id === e.TWILIO_WHATSAPP_FROM);
  if (!sender || sender.status !== "ONLINE")
    throw Error("GDP sender not online");
  fs.writeFileSync(
    ".local/ai-backups/twilio-senders-before.json",
    JSON.stringify(d, null, 2),
    { mode: 0o600 },
  );
  const webhook = {
    ...sender.webhook,
    callback_url: e.SUPABASE_URL + "/functions/v1/whatsapp-inbound",
    callback_method: "POST",
    status_callback_url: e.SUPABASE_URL + "/functions/v1/whatsapp-status",
    status_callback_method: "POST",
  };
  const u = await fetch(base + "/" + sender.sid, {
    method: "POST",
    headers,
    body: JSON.stringify({ webhook }),
  });
  if (!u.ok)
    throw Error("Sender update HTTP " + u.status + ": " + (await u.text()));
  const v = await fetch(base + "?Channel=whatsapp", { headers });
  const after = await v.json();
  for (const s of after.senders) {
    const before = d.senders.find((x) => x.sid === s.sid);
    if (
      s.sid !== sender.sid &&
      JSON.stringify(s.webhook) !== JSON.stringify(before.webhook)
    )
      throw Error("Unexpected other sender change");
  }
  const final = after.senders.find((x) => x.sid === sender.sid);
  if (
    final.webhook.callback_url !== webhook.callback_url ||
    final.webhook.status_callback_url !== webhook.status_callback_url
  )
    throw Error("Webhook readback mismatch");
  console.log(
    "GDP WhatsApp sender ONLINE; incoming and status webhooks verified. Other senders unchanged.",
  );
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
