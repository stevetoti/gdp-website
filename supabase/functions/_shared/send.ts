import {
  db,
  env,
  checked,
  conversation,
  report,
  type Conversation,
} from "./runtime.ts";
import { withinWindow, plainText, whatsappAddress } from "./security.ts";
export class WindowClosed extends Error {}
export async function sendMessage(
  c: Conversation,
  body: string,
  author: "ai" | "human" | "system",
  requestId: string,
  template?: { sid: string; variables: Record<string, string> },
  expectedVersion?: number,
) {
  // Reserve before contacting Twilio: a timeout cannot cause a duplicate automatic send.
  const fresh = await conversation(c.id);
  if (
    expectedVersion !== undefined &&
    (fresh.mode !== "ai" || fresh.mode_version !== expectedVersion)
  )
    return { skipped: true };
  if (
    c.channel === "whatsapp" &&
    !template &&
    !withinWindow(fresh.last_inbound_at)
  )
    throw new WindowClosed(
      "Outside the 24-hour window. Send an approved template.",
    );
  const text = plainText(body);
  const { data: row, error } = await db
    .from("gdp_chat_messages")
    .insert({
      conversation_id: c.id,
      channel: c.channel,
      direction: "out",
      author,
      body: text,
      request_id: requestId,
      status: c.channel === "web" ? "sent" : "sending",
    })
    .select("id")
    .single();
  if (error?.code === "23505") {
    const existing = checked(
      await db
        .from("gdp_chat_messages")
        .select("status")
        .eq("request_id", requestId)
        .single(),
    );
    if (!existing || /^(sending|unknown|failed)/.test(existing.status))
      throw new Error(
        "Previous delivery failed or is uncertain; review Twilio before retrying",
      );
    return { duplicate: true };
  }
  if (error || !row) throw new Error("Outbox insert failed");
  if (c.channel === "web") {
    checked(
      await db
        .from("gdp_chat_conversations")
        .update({
          last_outbound_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", c.id),
    );
    return { ok: true };
  }
  // Recheck takeover immediately before dispatch, after reserving the outbox.
  const latest = await conversation(c.id);
  if (
    expectedVersion !== undefined &&
    (latest.mode !== "ai" || latest.mode_version !== expectedVersion)
  ) {
    checked(
      await db
        .from("gdp_chat_messages")
        .update({ status: "cancelled" })
        .eq("id", row.id),
    );
    return { skipped: true };
  }
  if (!template && !withinWindow(latest.last_inbound_at)) {
    checked(
      await db
        .from("gdp_chat_messages")
        .update({ status: "failed:window" })
        .eq("id", row.id),
    );
    throw new WindowClosed("Outside the 24-hour window.");
  }
  const params = new URLSearchParams({
    From: env("TWILIO_WHATSAPP_FROM"),
    To: whatsappAddress(c.external_ref),
    StatusCallback: `${env("SUPABASE_URL")}/functions/v1/whatsapp-status`,
  });
  if (template) {
    params.set("ContentSid", template.sid);
    params.set("ContentVariables", JSON.stringify(template.variables));
  } else params.set("Body", text);
  let res: Response;
  try {
    res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${env("TWILIO_ACCOUNT_SID")}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            btoa(`${env("TWILIO_ACCOUNT_SID")}:${env("TWILIO_AUTH_TOKEN")}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        signal: AbortSignal.timeout(15000),
      },
    );
  } catch {
    checked(
      await db
        .from("gdp_chat_messages")
        .update({ status: "unknown:check_twilio" })
        .eq("id", row.id),
    );
    await report("send", "provider_timeout", c.id);
    throw new Error("Delivery uncertain; check Twilio before resending");
  }
  const data = await res.json();
  checked(
    await db
      .from("gdp_chat_messages")
      .update({
        provider_sid: data.sid || null,
        status: res.ok
          ? data.status || "queued"
          : `failed:${data.code || res.status}`,
      })
      .eq("id", row.id),
  );
  if (!res.ok)
    throw new Error(`Twilio send rejected (${data.code || res.status})`);
  // Reconcile callbacks that arrived before the REST response.
  const event = checked(
    await db
      .from("gdp_chat_status_events")
      .select("status")
      .eq("provider_sid", data.sid)
      .maybeSingle(),
  );
  if (event)
    checked(
      await db
        .from("gdp_chat_messages")
        .update({ status: event.status })
        .eq("id", row.id),
    );
  checked(
    await db
      .from("gdp_chat_conversations")
      .update({
        last_outbound_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", c.id),
  );
  return { ok: true, sid: data.sid };
}
