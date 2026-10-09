require("@next/env").loadEnvConfig(process.cwd());
const fs = require("fs");
(async () => {
  const e = process.env;
  const migration = fs.readFileSync(
    "supabase/migrations/20260920030914_gdp_inbound_email_notifications.sql",
    "utf8",
  );
  const tests = fs.readFileSync("tests/chat-email-database.sql", "utf8");
  const apply = process.argv.includes("--apply");
  const r = await fetch(
    `https://api.supabase.com/v1/projects/${e.SUPABASE_PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${e.SUPABASE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "begin;\n" +
          migration +
          "\n" +
          (apply ? "commit;" : tests + "\nrollback;"),
      }),
    },
  );
  if (!r.ok) throw Error("Database HTTP " + r.status + ": " + (await r.text()));
  console.log(
    apply
      ? "Email queue migration applied."
      : "Email queue, both channels/modes, duplicate and access tests passed (rolled back).",
  );
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
