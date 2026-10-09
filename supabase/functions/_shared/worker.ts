import { db, checked, conversation, env, report } from "./runtime.ts";
import { generateReply } from "./reply-engine.ts";
import { sendMessage, WindowClosed } from "./send.ts";
export async function processJobs() {
  for (let n = 0; n < 4; n++) {
    const jobs = checked(await db.rpc("gdp_chat_claim"));
    const job = jobs?.[0];
    if (!job) return;
    try {
      const c = await conversation(job.conversation_id);
      if (job.handoff) {
        await sendMessage(
          c,
          "Your conversation has been marked for our team. A person can reply here. For urgent enquiries, email info@globaldigitalprime.com.",
          "system",
          `handoff:${job.message_id}`,
        );
      } else if (c.mode === "ai") {
        const cfg = checked(
          await db.from("gdp_chat_config").select("*").eq("id", true).single(),
        );
        if (cfg.ai_enabled) {
          const current = checked(
            await db
              .from("gdp_chat_messages")
              .select("created_at")
              .eq("id", job.message_id)
              .single(),
          );
          if (!current) throw new Error("Message not found");
          const history =
            checked(
              await db
                .from("gdp_chat_messages")
                .select("author,body")
                .eq("conversation_id", c.id)
                .lte("created_at", current.created_at)
                .not("status", "like", "failed%")
                .order("created_at", { ascending: false })
                .limit(20),
            )?.reverse() || [];
          const reply = await generateReply(
            { channel: c.channel, history, knowledge: cfg.knowledge },
            {
              apiKey: env("ELEVENLABS_API_KEY"),
              agentId: env("ELEVENLABS_AGENT_ID"),
            },
          );
          await sendMessage(
            c,
            reply,
            "ai",
            `ai:${job.message_id}`,
            undefined,
            c.mode_version,
          );
        }
      }
      checked(
        await db
          .from("gdp_chat_jobs")
          .update({ state: "done", last_error: null })
          .eq("id", job.id),
      );
    } catch (err) {
      const code =
        err instanceof WindowClosed ? "window_closed" : "reply_failed";
      const final = job.attempts >= 3 || err instanceof WindowClosed;
      checked(
        await db
          .from("gdp_chat_jobs")
          .update({
            state: final ? "failed" : "pending",
            last_error: code,
            available_at: new Date(
              Date.now() + 30000 * job.attempts,
            ).toISOString(),
          })
          .eq("id", job.id),
      );
      await report("worker", code, job.conversation_id);
      if (final)
        await db.rpc("gdp_chat_set_mode", {
          p_id: job.conversation_id,
          p_mode: "human",
        });
    }
  }
}
