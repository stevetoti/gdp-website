import { db, checked, env, report } from "./runtime.ts";

export async function processEmailNotifications() {
  for (let n = 0; n < 10; n++) {
    const job = checked(await db.rpc("gdp_chat_claim_email"))?.[0];
    if (!job) return;
    try {
      // Stop uncertain deliveries before Resend's 24h deduplication expires.
      if (Date.now() - Date.parse(job.first_attempt_at) >= 23 * 3600000)
        throw new Error("retry_window_expired");
      let payload = job.payload;
      if (!payload) {
        const message = checked(
          await db
            .from("gdp_chat_messages")
            .select("conversation_id,channel,body,created_at,media")
            .eq("id", job.message_id)
            .single(),
        );
        if (!message) throw new Error("Message missing");
        const c = checked(
          await db
            .from("gdp_chat_conversations")
            .select("contact_id")
            .eq("id", message.conversation_id)
            .single(),
        );
        if (!c) throw new Error("Conversation missing");
        const contact = checked(
          await db
            .from("gdp_chat_contacts")
            .select("name,email,phone_e164")
            .eq("id", c.contact_id)
            .single(),
        );
        if (!contact) throw new Error("Contact missing");
        payload = {
          from: env("GDP_MESSAGE_NOTIFICATION_FROM"),
          to: [env("GDP_MESSAGE_NOTIFICATION_EMAIL")],
          subject: `GDP: New ${message.channel === "whatsapp" ? "WhatsApp" : "website chat"} message`,
          text: [
            `Customer: ${contact.name || "Website visitor"}`,
            `Phone: ${contact.phone_e164 || "Not shared"}`,
            `Email: ${contact.email || "Not shared"}`,
            `Received: ${message.created_at}`,
            "",
            message.body,
            "",
            `Attachments: ${Array.isArray(message.media) ? message.media.length : 0}`,
            `Conversation: ${message.conversation_id}`,
            "Reply in the customer inbox: https://www.globaldigitalprime.com/admin/inbox",
            "This email is a notification. Reply to the customer from the inbox.",
          ].join("\n"),
        };
        // Freeze the complete request so retries use the same idempotency payload.
        checked(
          await db
            .from("gdp_chat_email_notifications")
            .update({ payload })
            .eq("message_id", job.message_id),
        );
      }
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env("RESEND_API_KEY")}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `gdp-inbound/${job.message_id}`,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`provider_http_${res.status}`);
      const result = await res.json();
      if (!result.id) throw new Error("provider_missing_id");
      checked(
        await db
          .from("gdp_chat_email_notifications")
          .update({ state: "sent", provider_id: result.id, last_error: null })
          .eq("message_id", job.message_id),
      );
    } catch (error) {
      const expired =
        Date.now() - Date.parse(job.first_attempt_at) >= 23 * 3600000;
      const failed = job.attempts >= 12 || expired;
      const code =
        error instanceof Error &&
        /^(provider_http_\d+|provider_missing_id|retry_window_expired)$/.test(
          error.message,
        )
          ? error.message
          : "email_delivery_failed";
      checked(
        await db
          .from("gdp_chat_email_notifications")
          .update({
            state: failed ? "failed" : "pending",
            last_error: code,
            available_at: new Date(
              Date.now() +
                Math.min(3600000, 60000 * 2 ** Math.min(job.attempts, 6)),
            ).toISOString(),
          })
          .eq("message_id", job.message_id),
      );
      await report("message_email", code);
    }
  }
}
