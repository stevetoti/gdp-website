require("@next/env").loadEnvConfig(process.cwd());
const fs = require("fs"),
  { randomUUID } = require("crypto");
const { createClient } = require("@supabase/supabase-js");
(async () => {
  const e = process.env,
    db = createClient(e.SUPABASE_URL, e.SUPABASE_SERVICE_ROLE_KEY);
  function check(r) {
    if (r.error) throw Error(r.error.message);
    return r.data;
  }
  const ids = [];
  for (const channel of ["web", "whatsapp"]) {
    const contact = check(
      await db
        .from("gdp_chat_contacts")
        .insert({ name: "GDP notification setup test" })
        .select("id")
        .single(),
    );
    const ref = "email-check-" + randomUUID();
    const c = check(
      await db
        .from("gdp_chat_conversations")
        .insert({
          channel,
          external_ref: ref,
          contact_id: contact.id,
          mode: "human",
        })
        .select("id")
        .single(),
    );
    const input = {
      p_channel: channel,
      p_external_ref: ref,
      p_body: `[Setup test] Every incoming ${channel === "web" ? "website chat" : "WhatsApp"} message now sends an email to notifications@pacificwavedigital.com, including conversations handled by a person. This is a configuration test, not a customer enquiry.`,
      p_request_id: randomUUID(),
    };
    const msg = check(await db.rpc("gdp_chat_ingest", input));
    check(await db.rpc("gdp_chat_ingest", input));
    ids.push({
      channel,
      contact_id: contact.id,
      conversation_id: c.id,
      message_id: msg.message_id,
    });
  }
  fs.writeFileSync(
    ".local/email-notification-tests.json",
    JSON.stringify(ids),
    { mode: 0o600 },
  );
  const r = await fetch(e.SUPABASE_URL + "/functions/v1/gdp-chat-worker", {
    method: "POST",
    headers: { "x-gdp-secret": e.GDP_INTERNAL_SECRET },
  });
  console.log("Two labeled test notifications queued; worker HTTP", r.status);
})();
