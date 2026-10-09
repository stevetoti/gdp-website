const fs = require("fs");
require("@next/env").loadEnvConfig(process.cwd());
(async () => {
  const sql = fs.readFileSync(
    "supabase/migrations/202609190001_gdp_chat.sql",
    "utf8",
  );
  const apply = process.argv.includes("--apply");
  const query = apply
    ? "begin;\n" + sql + "\ncommit;"
    : "begin;\n" + sql + "\nrollback;";
  const r = await fetch(
    "https://api.supabase.com/v1/projects/" +
      process.env.SUPABASE_PROJECT_REF +
      "/database/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.SUPABASE_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!r.ok) {
    console.error(
      "Migration failed HTTP " + r.status + ": " + (await r.text()),
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    apply
      ? "Migration applied."
      : "Migration transaction validated and rolled back.",
  );
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
