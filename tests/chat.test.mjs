import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import {
  withinWindow,
  wantsHuman,
  twilioSignature,
  equalSecret,
  plainText,
  whatsappIdentity,
  whatsappAddress,
} from "../supabase/functions/_shared/security.ts";
import { generateReply } from "../supabase/functions/_shared/reply-engine.ts";
test("WhatsApp phone and private user IDs roundtrip without inventing phone numbers", () => {
  for (const address of ["whatsapp:+12025550123", "whatsapp:GH.1234567890123456", "whatsapp:US.ENT.Abc123"]) {
    const identity = whatsappIdentity(address);
    assert.ok(identity);
    assert.equal(whatsappAddress(identity.ref), address);
    assert.equal(identity.phone, address.includes("+") ? "+12025550123" : null);
  }
  for (const address of ["whatsapp:stephen", "whatsapp:+GH.123", "sms:+12025550123", "whatsapp:GH.a/b", "whatsapp:GH." + "a".repeat(129)])
    assert.equal(whatsappIdentity(address), null);
  assert.throws(() => whatsappAddress("GH.a/b"));
});
test("24-hour window is strict and rejects missing, invalid, and future timestamps", () => {
  const now = Date.now();
  assert.equal(withinWindow(new Date(now - 86399999).toISOString(), now), true);
  for (const t of [
    null,
    "bad",
    new Date(now - 86400000).toISOString(),
    new Date(now + 1).toISOString(),
  ])
    assert.equal(withinWindow(t, now), false);
});
test("handoff recognizes direct and natural requests without matching agent in unrelated words", () => {
  for (const t of [
    "agent",
    "HUMAN",
    "Can I speak to Stephen?",
    "I want to talk to a person",
  ])
    assert.equal(wantsHuman(t, ["agent", "human"]), true);
  assert.equal(
    wantsHuman("Build an agentic workflow", ["agent", "human"]),
    false,
  );
});
test("Twilio signatures use exact URL and sorted parameters, rejecting tampering", async () => {
  const url = "https://example.com/functions/v1/whatsapp-inbound";
  const f = new URLSearchParams({
    To: "whatsapp:+16068067748",
    Body: "Hello",
    From: "whatsapp:+12025550123",
  });
  const expected = createHmac("sha1", "test-token")
    .update(url + "BodyHelloFromwhatsapp:+12025550123Towhatsapp:+16068067748")
    .digest("base64");
  assert.equal(await twilioSignature(url, f, "test-token"), expected);
  f.set("Body", "tampered");
  assert.equal(
    equalSecret(expected, await twilioSignature(url, f, "test-token")),
    false,
  );
  assert.equal(equalSecret("", ""), false);
});
test("WhatsApp output strips unsupported markdown and retains links", () =>
  assert.equal(
    plainText("**Hello** [site](https://example.com)"),
    "Hello site (https://example.com)",
  ));
test("web and WhatsApp use the same agent and approved knowledge", async () => {
  const calls = [];
  const contexts = [];
  class Socket {
    onopen;
    onmessage;
    onclose;
    onerror;
    constructor() {
      setTimeout(() => this.onopen?.(), 0);
    }
    send(raw) {
      const d = JSON.parse(raw);
      if (d.type === "conversation_initiation_client_data")
        setTimeout(
          () =>
            this.onmessage?.({
              data: JSON.stringify({
                type: "agent_response",
                agent_response_event: { agent_response: "Welcome" },
              }),
            }),
          0,
        );
      if (d.type === "contextual_update") contexts.push(d.text);
      if (d.type === "user_message")
        setTimeout(
          () =>
            this.onmessage?.({
              data: JSON.stringify({
                type: "agent_response",
                agent_response_event: {
                  agent_response: "GDP provides approved cloud services.",
                },
              }),
            }),
          0,
        );
    }
    close() {}
  }
  const fetcher = async (url) => {
    calls.push(url);
    return Response.json({ signed_url: "wss://example.com" });
  };
  const answers = [];
  for (const channel of ["web", "whatsapp"])
    answers.push(
      await generateReply(
        {
          channel,
          history: [{ author: "customer", body: "What do you do?" }],
          knowledge: "GDP provides approved cloud services.",
        },
        { apiKey: "test", agentId: "same-agent" },
        fetcher,
        Socket,
      ),
    );
  assert.deepEqual(answers, [
    "GDP provides approved cloud services.",
    "GDP provides approved cloud services.",
  ]);
  assert.equal(calls[0], calls[1]);
  assert.ok(
    contexts.every((x) => x.includes("GDP provides approved cloud services.")),
  );
});
