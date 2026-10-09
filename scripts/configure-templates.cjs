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
  const base = "https://content.twilio.com/v1/Content";
  const existing = [];
  let next = base + "?PageSize=100";
  while (next) {
    const r = await fetch(next, { headers });
    if (!r.ok) throw Error("Template lookup HTTP " + r.status);
    const d = await r.json();
    existing.push(...d.contents);
    next = d.meta?.next_page_url;
    if (next && !next.startsWith("https://content.twilio.com/"))
      throw Error("Unexpected pagination URL");
  }
  const defs = [
    {
      name: "gdp_welcome",
      body: "Hi {{1}}, thanks for contacting Global Digital Prime. How can we help today?",
      variables: { 1: "Alex" },
      key: "TWILIO_CONTENT_SID_GDP_WELCOME",
    },
    {
      name: "gdp_update",
      body: "Hi {{1}}, an update from Global Digital Prime: {{2}}. Reply here if you have questions.",
      variables: {
        1: "Alex",
        2: "Your requested project proposal is ready for review",
      },
      key: "TWILIO_CONTENT_SID_GDP_UPDATE",
    },
  ];
  const secrets = [];
  for (const def of defs) {
    let t = existing.find((x) => x.friendly_name === def.name);
    if (!t) {
      const r = await fetch(base, {
        method: "POST",
        headers,
        body: JSON.stringify({
          friendly_name: def.name,
          language: "en",
          variables: def.variables,
          types: { "twilio/text": { body: def.body } },
        }),
      });
      if (!r.ok) throw Error("Template creation HTTP " + r.status);
      t = await r.json();
    }
    let r = await fetch(base + "/" + t.sid + "/ApprovalRequests", { headers });
    let a = await r.json();
    if (!a.whatsapp?.status || a.whatsapp.status === "unsubmitted") {
      r = await fetch(base + "/" + t.sid + "/ApprovalRequests/whatsapp", {
        method: "POST",
        headers,
        body: JSON.stringify({ name: def.name, category: "UTILITY" }),
      });
      if (!r.ok)
        throw Error(
          "Template submission HTTP " + r.status + ": " + (await r.text()),
        );
      a = { whatsapp: await r.json() };
    }
    console.log(def.name + ": " + a.whatsapp?.status);
    secrets.push({ name: def.key, value: t.sid });
    let text = fs.readFileSync(".env.local", "utf8");
    text = text.replace(
      new RegExp("^" + def.key + "=.*$", "m"),
      def.key + "=" + t.sid,
    );
    fs.writeFileSync(".env.local", text);
  }
  const r = await fetch(
    "https://api.supabase.com/v1/projects/" +
      e.SUPABASE_PROJECT_REF +
      "/secrets",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + e.SUPABASE_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(secrets),
    },
  );
  if (!r.ok) throw Error("Template secret update HTTP " + r.status);
  console.log("Template SIDs stored securely.");
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
