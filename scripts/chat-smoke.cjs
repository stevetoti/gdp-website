require("@next/env").loadEnvConfig(process.cwd());
const { createClient } = require("@supabase/supabase-js");
const { randomBytes, randomUUID } = require("crypto");
const fs = require("fs");
const e = process.env;
const db = createClient(e.SUPABASE_URL, e.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const base = e.SUPABASE_URL + "/functions/v1/";
const assert = (v, m) => {
  if (!v) throw Error(m);
  console.log("PASS " + m);
};
async function edge(name, body, headers = {}) {
  const r = await fetch(base + name, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  return { status: r.status, data: await r.json() };
}
(async () => {
  const invalid = await fetch(base + "whatsapp-inbound", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-twilio-signature": "invalid",
    },
    body: "Body=test",
  });
  assert(invalid.status === 403, "Invalid Twilio signature rejected");
  const noauth = await edge("gdp-web-chat", {});
  assert(
    noauth.status === 401,
    "Private web bridge rejects unauthenticated calls",
  );
  const { data: anonymous, error: anonError } = await createClient(
    e.SUPABASE_URL,
    e.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
    .from("gdp_chat_messages")
    .select("id")
    .limit(1);
  assert(
    !!anonError || anonymous?.length === 0,
    "Anonymous database access blocked",
  );
  const ref = randomBytes(32).toString("hex");
  const h = { "x-gdp-secret": e.GDP_INTERNAL_SECRET };
  let r = await edge(
    "gdp-web-chat",
    {
      action: "send",
      session: ref,
      ip_hash: "smoke",
      text: "What software and AI services does Global Digital Prime offer?",
      request_id: randomUUID(),
    },
    h,
  );
  assert(r.status === 202, "Website message accepted");
  const { data: c } = await db
    .from("gdp_chat_conversations")
    .select("*")
    .eq("external_ref", ref)
    .single();
  assert(!!c, "Conversation persisted");
  fs.writeFileSync(
    ".local/smoke-conversation.json",
    JSON.stringify({ conversation_id: c.id, session: ref }),
  );
  for (let i = 0; i < 25; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const { data: m } = await db
      .from("gdp_chat_messages")
      .select("author,body,status")
      .eq("conversation_id", c.id)
      .order("created_at");
    if (m.some((x) => x.author === "ai")) {
      assert(true, "Live shared agent reply stored");
      break;
    }
    if (i === 24) throw Error("AI reply did not arrive");
  }
  const { data: admins } = await db
    .from("gdp_chat_admins")
    .select("user_id")
    .limit(1);
  const {
    data: { user },
  } = await db.auth.admin.getUserById(admins[0].user_id);
  const { data: link, error } = await db.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  });
  if (error) throw error;
  const auth = createClient(e.SUPABASE_URL, e.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
  const { data: session, error: verify } = await auth.auth.verifyOtp({
    token_hash: link.properties.hashed_token,
    type: "magiclink",
  });
  if (verify) throw verify;
  const ah = {
    Authorization: "Bearer " + session.session.access_token,
    apikey: e.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
  r = await edge(
    "whatsapp-send",
    { action: "set_mode", conversation_id: c.id, mode: "human" },
    ah,
  );
  assert(r.status === 200, "Authorized human takeover");
  r = await edge(
    "whatsapp-send",
    {
      action: "reply",
      conversation_id: c.id,
      text: "GDP integration test: a team member can reply here.",
      request_id: randomUUID(),
    },
    ah,
  );
  assert(r.status === 200, "Human website reply stored");
  r = await edge(
    "whatsapp-send",
    { action: "set_mode", conversation_id: c.id, mode: "ai" },
    ah,
  );
  assert(r.status === 200, "Hand back to AI");
  r = await edge(
    "gdp-web-chat",
    {
      action: "send",
      session: ref,
      ip_hash: "smoke",
      text: "agent",
      request_id: randomUUID(),
    },
    h,
  );
  assert(r.status === 202, "Handoff message accepted");
  const { data: after } = await db
    .from("gdp_chat_conversations")
    .select("mode")
    .eq("id", c.id)
    .single();
  assert(after.mode === "human", "Agent keyword immediately pauses AI");
  const { data: fake } = await db
    .from("gdp_chat_conversations")
    .insert({
      channel: "whatsapp",
      external_ref: "12025550199",
      last_inbound_at: new Date(Date.now() - 90000000).toISOString(),
    })
    .select()
    .single();
  r = await edge(
    "whatsapp-send",
    {
      action: "reply",
      conversation_id: fake.id,
      text: "This must never be sent",
      request_id: randomUUID(),
    },
    ah,
  );
  assert(r.status === 409, "Expired WhatsApp window blocked server-side");
  await db.from("gdp_chat_conversations").delete().eq("id", fake.id);
  await auth.auth.signOut({ scope: "local" });
  console.log("Smoke checks complete; no WhatsApp messages sent.");
})().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
