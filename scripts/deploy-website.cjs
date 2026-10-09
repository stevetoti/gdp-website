const { spawnSync } = require("child_process");
const fs = require("fs");
require("@next/env").loadEnvConfig(process.cwd());
(async () => {
  const e = process.env;
  const project = JSON.parse(fs.readFileSync(".vercel/project.json", "utf8"));
  const envs = [
    "SUPABASE_URL",
    "GDP_INTERNAL_SECRET",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ].map((key) => ({
    key,
    value: e[key],
    type: "encrypted",
    target: ["production", "preview"],
  }));
  const r = await fetch(
    `https://api.vercel.com/v10/projects/${project.projectId}/env?teamId=${project.orgId}&upsert=true`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + e.VERCEL_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envs),
    },
  );
  if (!r.ok) throw Error("Vercel env HTTP " + r.status);
  console.log("Website chat environment configured.");
  const args = ["deploy", "--yes", "--token", e.VERCEL_TOKEN];
  if (process.argv.includes("--prod")) args.push("--prod");
  const p = spawnSync("vercel", args, { env: e, encoding: "utf8" });
  let output = p.stdout + "\n" + p.stderr;
  output = output.replaceAll(e.VERCEL_TOKEN, "[redacted]");
  console.log(output);
  process.exitCode = p.status || 0;
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
