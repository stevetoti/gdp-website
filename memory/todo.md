# Todo

## 2026-09-30 — [Claude Code] Website forms

- [x] Contact + wizard deliver to the GDP inbox/email through a bot-guarded server route.
- [x] Hostnames added; production `gdp-website-psfuqzu4y` live; probes pass. — [Claude Code] 2026-10-01
- [ ] **Codex:** commit the uncommitted chat-inbox work in this tree (admin inbox, `src/app/api/chat`, ChatWidget, permissions, config/, docs/, scripts/, supabase/config.toml); exclude `.DS_Store`, the logo PNGs and `supabase/.temp`. Production already runs it; an uncommitted release source is how the PWD LMS was lost on 21 Sep.
- [ ] **Stephen:** send one real enquiry from https://www.globaldigitalprime.com/contact and confirm it appears in the GDP inbox and the notification email arrives.
- [ ] After Rapid Entrepreneurs is migrated off browser inserts, drop the anon `Enable insert for everyone` policy on `project_submissions` (shared project).

## 2026-09-19 — [Codex] WhatsApp integration

- [ ] Confirm whether the intended shared brain is the embedded ElevenLabs agent or another Supabase/Claude backend.
- [ ] Inspect authenticated backend configuration, live chat schema, model, prompt, knowledge retrieval, and admin access rules. Do not assume the blog project is the chat backend.
- [ ] Implement one shared reply path and conversation store, Twilio signature verification, strict destination routing, durable ingestion with MessageSid deduplication, and asynchronous processing.
- [ ] Implement human takeover with a pre-send mode recheck, 24-hour enforcement on every free-text send, approved templates, and delivery callbacks.
- [ ] Build a real unified admin inbox with Realtime and server-enforced GDP admin authorization.
- [ ] Store secrets through Supabase secrets; obtain Twilio token and approved template SIDs when the backend is confirmed.
- [ ] Run shared-knowledge parity and webhook/security/handoff/window tests, deploy, then verify real inbound/AI/human/hand-back flows and capture evidence.
- [ ] Provide final verified webhook URLs only after confirming the deployment project.

## 2026-09-19 — [Codex] Current rollout status

Earlier discovery items are superseded by the deployed implementation documented in docs/WHATSAPP-SETUP.md.

- [x] Verify Supabase, ElevenLabs and Twilio credentials. — [Codex] 2026-09-19
- [x] Deploy shared reply engine, channel store, queue, webhook verification and GDP-only sender routing. — [Codex] 2026-09-19
- [x] Deploy website chat and admin inbox; verify API takeover, human reply, hand-back, window enforcement and admin isolation. — [Codex] 2026-09-19
- [x] Submit GDP templates, configure SIDs and validate approved-only selection. — [Codex] 2026-09-19: Meta approval pending.
- [x] Configure and test rate-limited internal error alerts. — [Codex] 2026-09-19
- [x] Verify real WhatsApp inbound → AI reply → delivery/read using Stephen's handset message. — [Codex] 2026-09-19: Fixed BSUID rejection, recovered original message, confirmed AI reply delivered (read not required).
- [ ] Verify real WhatsApp human reply/hand-back and capture authenticated inbox screenshots.
- [ ] Confirm Meta approves gdp_welcome and gdp_update; handle rejection if necessary.

## 2026-09-20 — [Codex] Message email notifications

- [x] Configure all new customer-message emails to notifications@pacificwavedigital.com on both channels, including human mode; deploy and verify provider acceptance and deduplication. — [Codex] 2026-09-20
