# Decisions

## 2026-09-19 — [Codex] One brain across channels

- Stephen requires WhatsApp to share the website chat brain; do not create an independent knowledge base or prompt.
- Preserve the Twilio WhatsApp sender +16068067748 and strictly route by destination; do not modify SMS/Voice webhooks or VisaReadyPro routing.
- Resolve the brief-versus-checkout backend mismatch before choosing the shared reply engine or modifying live tables.

## 2026-09-19 — [Codex] Shared deployed channel architecture

- Keep the existing hosted ElevenLabs agent as the single model/prompt authority; do not create an independent Claude endpoint for WhatsApp. Both text channels call the same backend reply engine and supply one shared approved knowledge record.
- GDP had no existing chat tables. The shared project's generic conversations table belongs to another application, so isolate new cross-channel chat in gdp_chat_* tables instead of altering other brands' data structures.
- Human takeover is enforced by stored mode/version, not by prompt instructions. Unknown Twilio send outcomes require operator review rather than automatic duplicate sends.
- Capture volunteered contact details but do not merge people solely by an unverified typed email.

## 2026-09-19 — [Codex] WhatsApp private identities

Accept Twilio's documented `whatsapp:CC.BSUID` and `whatsapp:CC.ENT.BSUID` alongside E.164. Store opaque IDs unchanged in external_ref/wa_id, keep phone_e164 null when undisclosed, and never add a '+' to BSUID outbound addresses. Existing digit-only phone refs retain their routing. Do not merge phone and private identities without a verified mapping. Source: https://www.twilio.com/docs/whatsapp/key-concepts#whatsapp-usernames

## 2026-09-20 — [Codex] All incoming messages notify staff

Send one email per incoming customer message on both web and WhatsApp to notifications@pacificwavedigital.com, irrespective of takeover/AI mode. Notifications are separate from handoff/error handling and must not block AI replies. Do not notify for outgoing AI/human/system messages. Start with new messages only; no historical mail flood. Notification emails direct staff to the admin inbox to reply.
