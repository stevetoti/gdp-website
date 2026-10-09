declare const EdgeRuntime: { waitUntil(task: Promise<unknown>): void };
import { createClient } from "npm:@supabase/supabase-js@2.97.0";
export function env(key: string): string {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Missing configuration: ${key}`);
  return value;
}
export const db = createClient(
  env("SUPABASE_URL"),
  env("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false, autoRefreshToken: false } },
);
export function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}
export function checked<T>(result: {
  data: T;
  error: { message: string } | null;
}): T {
  if (result.error) throw new Error("Database operation failed");
  return result.data;
}
export async function report(
  service: string,
  code: string,
  conversationId?: string,
) {
  console.error(
    JSON.stringify({
      service,
      code,
      conversationId,
      time: new Date().toISOString(),
    }),
  );
  try {
    const allowed = checked(
      await db.rpc("gdp_chat_rate", {
        p_key: `error:${service}:${code}`,
        p_limit: 1,
        p_seconds: 300,
      }),
    );
    if (!allowed) return;
    await db
      .from("gdp_chat_errors")
      .insert({ service, code, conversation_id: conversationId });
    const key = Deno.env.get("RESEND_API_KEY"),
      to = Deno.env.get("GDP_ERROR_NOTIFICATION_EMAILS"),
      from = Deno.env.get("GDP_ERROR_NOTIFICATION_FROM");
    if (key && to && from) {
      const delivery = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: to.split(",").map((x) => x.trim()),
          subject: "GDP chat needs attention",
          text: `Service: ${service}\nError: ${code}\nConversation: ${conversationId || "unknown"}\nReview the GDP admin inbox.`,
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (!delivery.ok) console.error("Alert email rejected", delivery.status);
      return { email_sent: delivery.ok };
    }
    return { email_sent: false };
  } catch {
    console.error("Error reporting failed");
  }
}
export async function kickWorker() {
  try {
    await fetch(`${env("SUPABASE_URL")}/functions/v1/gdp-chat-worker`, {
      method: "POST",
      headers: { "x-gdp-secret": env("GDP_INTERNAL_SECRET") },
      signal: AbortSignal.timeout(1500),
    });
  } catch {
    /* The durable cron worker will retry. */
  }
}
export function background(task: Promise<unknown>) {
  EdgeRuntime.waitUntil(task);
}
export type Conversation = {
  id: string;
  channel: "web" | "whatsapp";
  mode: "ai" | "human";
  mode_version: number;
  external_ref: string;
  last_inbound_at: string | null;
  contact_id: string;
};
export async function conversation(id: string): Promise<Conversation> {
  return checked(
    await db.from("gdp_chat_conversations").select("*").eq("id", id).single(),
  ) as Conversation;
}
