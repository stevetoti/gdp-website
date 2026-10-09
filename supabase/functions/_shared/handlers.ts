import { createClient } from "npm:@supabase/supabase-js@2.97.0";
import {
  db,
  env,
  json,
  checked,
  background,
  kickWorker,
  report,
  conversation,
} from "./runtime.ts";
import { equalSecret, twilioSignature, whatsappIdentity } from "./security.ts";
import { sendMessage, WindowClosed } from "./send.ts";
import { processJobs } from "./worker.ts";
import { processEmailNotifications } from "./email-notifications.ts";
const twiml = () =>
  new Response("<Response></Response>", {
    headers: { "Content-Type": "text/xml" },
  });
const uuid = (x: unknown): x is string =>
  typeof x === "string" && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(x);
const origins = () => [
  env("ADMIN_ORIGIN"),
  "https://globaldigitalprime.com",
  "https://www.globaldigitalprime.com",
];
export async function handler(kind: string, req: Request): Promise<Response> {
  const origin = req.headers.get("origin") || "";
  const cors: Record<string, string> = origins().includes(origin)
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers":
          "authorization, apikey, content-type, x-client-info",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        Vary: "Origin",
      }
    : {};
  if (req.method === "OPTIONS")
    return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST")
    return json({ error: "Method not allowed" }, 405, cors);
  try {
    if (kind === "whatsapp-inbound" || kind === "whatsapp-status") {
      if (
        !req.headers
          .get("content-type")
          ?.includes("application/x-www-form-urlencoded")
      )
        return json({ error: "Form required" }, 400);
      const raw = await req.text();
      if (raw.length > 65536) return json({ error: "Payload too large" }, 413);
      const form = new URLSearchParams(raw);
      const url = `${env("SUPABASE_URL")}/functions/v1/${kind}`;
      if (
        !equalSecret(
          await twilioSignature(url, form, env("TWILIO_AUTH_TOKEN")),
          req.headers.get("x-twilio-signature") || "",
        )
      )
        return json({ error: "Invalid signature" }, 403);
      if (form.get("AccountSid") !== env("TWILIO_ACCOUNT_SID"))
        return json({ error: "Wrong account" }, 403);
      if (kind === "whatsapp-status") {
        if (form.get("From") !== env("TWILIO_WHATSAPP_FROM")) return twiml();
        const sid = form.get("MessageSid") || "",
          status = form.get("MessageStatus") || "";
        if (!/^SM[0-9a-f]{32}$/i.test(sid))
          return json({ error: "Invalid message" }, 400);
        checked(
          await db.rpc("gdp_chat_status", { p_sid: sid, p_status: status }),
        );
        return twiml();
      }
      if (form.get("To") !== env("TWILIO_WHATSAPP_FROM")) return twiml();
      const from = form.get("From") || "",
        sid = form.get("MessageSid") || "";
      const identity = whatsappIdentity(from);
      if (
        !identity ||
        !/^SM[0-9a-f]{32}$/i.test(sid)
      )
        return json({ error: "Invalid message" }, 400);
      const wa = identity.ref;
      if (identity.phone && form.get("WaId") && form.get("WaId") !== wa)
        return json({ error: "Sender mismatch" }, 400);
      const media = [];
      const num = Number(form.get("NumMedia") || 0);
      for (let i = 0; i < Math.min(num, 10); i++)
        media.push({
          url: form.get(`MediaUrl${i}`),
          type: form.get(`MediaContentType${i}`),
        });
      const body =
        (form.get("Body") || "").trim().slice(0, 4000) ||
        (media.length
          ? "[Attachment received. A team member can review it.]"
          : "[Empty message]");
      const result = checked(
        await db.rpc("gdp_chat_ingest", {
          p_channel: "whatsapp",
          p_external_ref: wa,
          p_body: body,
          p_request_id: sid,
          p_name: (form.get("ProfileName") || "").slice(0, 150) || null,
          p_phone: identity.phone,
          p_media: media,
        }),
      );
      if (!result.duplicate) background(kickWorker());
      return twiml();
    }
    if (kind === "gdp-chat-worker") {
      if (
        !equalSecret(
          req.headers.get("x-gdp-secret") || "",
          env("GDP_INTERNAL_SECRET"),
        )
      )
        return json({ error: "Unauthorized" }, 401);
      const raw = await req.text();
      const operation = raw ? JSON.parse(raw) : {};
      if (operation.action === "health") {
        const key = Deno.env.get("RESEND_API_KEY");
        const result = key
          ? await fetch("https://api.resend.com/domains", {
              headers: { Authorization: `Bearer ${key}` },
              signal: AbortSignal.timeout(5000),
            })
          : null;
        const domains = result?.ok ? await result.json() : { data: [] };
        return json({
          email_provider: !!key,
          verified_domains: domains.data
            .filter((d: { status: string }) => d.status === "verified")
            .map((d: { name: string }) => d.name),
        });
      }
      if (operation.action === "test_alert") {
        const result = await report("deployment_check", "test_alert");
        return json({ ok: true, result });
      }
      background(
        processJobs().catch(() => report("worker", "unhandled_failure")),
      );
      background(
        processEmailNotifications().catch(() => report("message_email", "unhandled_failure")),
      );
      return json({ accepted: true }, 202);
    }
    if (kind === "gdp-web-chat") {
      if (
        !equalSecret(
          req.headers.get("x-gdp-secret") || "",
          env("GDP_INTERNAL_SECRET"),
        )
      )
        return json({ error: "Unauthorized" }, 401);
      const input = await req.json();
      if (
        typeof input.session !== "string" ||
        !/^[a-f0-9]{64}$/.test(input.session)
      )
        return json({ error: "Invalid session" }, 400);
      const c = checked(
        await db
          .from("gdp_chat_conversations")
          .select("id,mode")
          .eq("channel", "web")
          .eq("external_ref", input.session)
          .maybeSingle(),
      );
      if (input.action === "history") {
        const messages = c
          ? checked(
              await db
                .from("gdp_chat_messages")
                .select("id,body,author,status,created_at")
                .eq("conversation_id", c.id)
                .order("created_at", { ascending: false })
                .limit(100),
            )?.reverse() || []
          : [];
        return json({ messages, mode: c?.mode || "ai" });
      }
      if (
        input.action !== "send" ||
        typeof input.text !== "string" ||
        !input.text.trim() ||
        input.text.length > 4000 ||
        !uuid(input.request_id)
      )
        return json({ error: "Invalid message" }, 400);
      const allowed = checked(
        await db.rpc("gdp_chat_rate", {
          p_key: `web:${input.ip_hash}`,
          p_limit: 20,
          p_seconds: 60,
        }),
      );
      if (!allowed)
        return json(
          { error: "Please wait a minute before sending more messages." },
          429,
        );
      checked(
        await db.rpc("gdp_chat_ingest", {
          p_channel: "web",
          p_external_ref: input.session,
          p_body: input.text.trim(),
          p_request_id: `web:${input.session}:${input.request_id}`,
        }),
      );
      background(kickWorker());
      return json({ accepted: true }, 202);
    }
    // Admin endpoint: JWT verification at gateway AND verified user + dedicated admin allowlist.
    if (kind !== "whatsapp-send")
      return json({ error: "Not found" }, 404, cors);
    if (origin && !origins().includes(origin))
      return json({ error: "Origin not allowed" }, 403);
    const auth = req.headers.get("authorization") || "";
    const client = createClient(env("SUPABASE_URL"), env("SUPABASE_ANON_KEY"), {
      global: { headers: { Authorization: auth } },
      auth: { persistSession: false },
    });
    const {
      data: { user },
      error,
    } = await client.auth.getUser();
    if (error || !user) return json({ error: "Unauthorized" }, 401, cors);
    const { data: admin } = await db
      .from("gdp_chat_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!admin)
      return json({ error: "GDP administrator access required" }, 403, cors);
    const input = await req.json();
    if (input.action === "templates")
      return json({ templates: await templates() }, 200, cors);
    if (!uuid(input.conversation_id))
      return json({ error: "Invalid conversation" }, 400, cors);
    const c = await conversation(input.conversation_id);
    if (input.action === "set_mode") {
      if (!["ai", "human"].includes(input.mode))
        return json({ error: "Invalid mode" }, 400, cors);
      checked(
        await db.rpc("gdp_chat_set_mode", { p_id: c.id, p_mode: input.mode }),
      );
      return json({ ok: true }, 200, cors);
    }
    if (input.action === "mark_read") {
      checked(
        await db
          .from("gdp_chat_conversations")
          .update({ unread_count: 0 })
          .eq("id", c.id),
      );
      return json({ ok: true }, 200, cors);
    }
    if (input.action === "contact") {
      const name =
        typeof input.name === "string" ? input.name.trim().slice(0, 150) : null;
      const email =
        typeof input.email === "string"
          ? input.email.trim().toLowerCase()
          : null;
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return json({ error: "Invalid email" }, 400, cors);
      checked(
        await db
          .from("gdp_chat_contacts")
          .update({ name, email })
          .eq("id", c.contact_id),
      );
      return json({ ok: true }, 200, cors);
    }
    if (!uuid(input.request_id))
      return json({ error: "Request ID required" }, 400, cors);
    if (input.action === "reply") {
      if (
        typeof input.text !== "string" ||
        !input.text.trim() ||
        input.text.length > 4000
      )
        return json({ error: "Enter 1–4000 characters" }, 400, cors);
      checked(
        await db.rpc("gdp_chat_set_mode", { p_id: c.id, p_mode: "human" }),
      );
      return json(
        await sendMessage(
          c,
          input.text,
          "human",
          `human:${c.id}:${input.request_id}`,
        ),
        200,
        cors,
      );
    }
    if (input.action === "send_template" && c.channel === "whatsapp") {
      const available = await templates();
      const t = available.find((x) => x.sid === input.content_sid);
      if (!t)
        return json({ error: "Template is not approved for GDP" }, 400, cors);
      const vars = input.variables;
      if (
        !vars ||
        typeof vars !== "object" ||
        Array.isArray(vars) ||
        Object.values(vars).some(
          (v) => typeof v !== "string" || v.length > 1000,
        )
      )
        return json({ error: "Invalid variables" }, 400, cors);
      checked(
        await db.rpc("gdp_chat_set_mode", { p_id: c.id, p_mode: "human" }),
      );
      return json(
        await sendMessage(
          c,
          `[Template: ${t.name}] ${JSON.stringify(vars)}`,
          "human",
          `human:${c.id}:${input.request_id}`,
          { sid: t.sid, variables: vars },
        ),
        200,
        cors,
      );
    }
    return json({ error: "Unknown action" }, 400, cors);
  } catch (err) {
    if (err instanceof WindowClosed)
      return json({ error: err.message }, 409, cors);
    if (err instanceof SyntaxError)
      return json({ error: "Invalid JSON" }, 400, cors);
    await report(kind, "request_failed");
    return json(
      { error: "Unable to complete the request. Check the inbox error panel." },
      500,
      cors,
    );
  }
}
async function templates(): Promise<{ sid: string; name: string }[]> {
  const configured = [
    {
      sid: Deno.env.get("TWILIO_CONTENT_SID_GDP_WELCOME"),
      name: "gdp_welcome",
    },
    { sid: Deno.env.get("TWILIO_CONTENT_SID_GDP_UPDATE"), name: "gdp_update" },
  ].filter((t) => t.sid);
  const out = [];
  for (const t of configured) {
    const r = await fetch(
      `https://content.twilio.com/v1/Content/${t.sid}/ApprovalRequests`,
      {
        headers: {
          Authorization:
            "Basic " +
            btoa(`${env("TWILIO_ACCOUNT_SID")}:${env("TWILIO_AUTH_TOKEN")}`),
        },
        signal: AbortSignal.timeout(7000),
      },
    );
    if (r.ok) {
      const d = await r.json();
      if (d.whatsapp?.status === "approved")
        out.push({ sid: t.sid!, name: t.name });
    }
  }
  return out;
}
