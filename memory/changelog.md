# Changelog — Global Digital Prime Website

## 2026-09-30 — [Claude Code] Contact form made real + bot defence (form-bot-defence skill)

Findings: the contact page only *simulated* a send (1.5 s timer, nothing delivered) and
the project wizard inserted into the shared `project_submissions` table straight from the
browser with the anon key (0 GDP rows exist, so those inserts were failing silently too);
`/api/notify-submission` only console.logged. Nobody was receiving GDP website enquiries.

Now: new `/api/contact` (server-side, same-origin) runs the shared guard — honeypot,
3 s fill time, digit/link-only refusal, server-verified Turnstile (fail-closed) — then calls
new `public.gdp_form_ingest` (migration `20260930120000`, applied to rndegttgwtpkbjtvjgnc):
creates/updates a `gdp_chat_contacts` row, a `web` conversation `form:<email>` in **human**
mode (no AI job), inserts the customer message, and the existing
`gdp_chat_email_notifications` queue emails GDP_MESSAGE_NOTIFICATION_EMAIL via the chat
worker. Enquiries therefore land in the unified inbox with the chat threads. Review flags
are appended to the message body. Both forms post there (contact → kind contact; wizard →
kind project with the generated summary) and render the Turnstile widget; the wizard shows
it on the final step. Templates in `src/lib/security` + `src/components/security`.
Turnstile keys (shared PWD widget) added to Vercel production by stdin pipe.
Local build/typecheck clean. Deploy + live probes follow once `globaldigitalprime.com` and
`www.globaldigitalprime.com` are on the shared Turnstile widget.

## 2026-08-30 — [Claude Code] SEO front door: GA4, Search Console verification, dynamic sitemap

- `src/components/GoogleAnalytics.tsx` (new): env-driven GA4 loader via
  next/script (`afterInteractive`). Renders nothing unless
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Rendered in root layout.
- `src/app/layout.tsx`: added `verification.google` metadata from
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (no-op until env set) and mounted
  `<GoogleAnalytics />`.
- `src/app/sitemap.ts`: now async — fetches published posts from the shared
  agency `blog_posts` table via `getPublishedPosts()` (`src/lib/blog.ts`,
  `site_id=gdp`) and emits `/blog/<slug>` entries with `lastModified` from
  `published_at`. Static entries unchanged; falls back to static-only on
  fetch failure.
- Env vars Stephen must set in Vercel: `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Typecheck + production build pass.

## 2026-09-19 — [Codex] WhatsApp integration discovery

- Read the supplied Twilio WhatsApp brief and traced the website chat to ElevenLabs agent `agent_4501kgqzyj13fjav2d5yw54fs4m5` in `src/components/ChatWidget.tsx`. No local Claude/RAG chat handler or chat schema exists.
- `/admin/transcripts` is demonstration data held in component state; it is not a connected conversation inbox.
- Existing blog references Supabase project `rndegttgwtpkbjtvjgnc`; live chat database/project and schema remain unverified.
- Restored the required documentation structure: preserved prior project instructions in CLAUDE.md, reduced AGENTS.md to a pointer, and created missing decisions/todo notes.
- Asked Stephen whether to share the ElevenLabs agent or locate a newer Supabase/Claude backend. No runtime changes, migrations, deployments, or Twilio configuration changes made.
- Persistent-memory CLI could not run because its Python environment lacks numpy; shared markdown notes remain the handoff record.

## 2026-09-19 — [Codex] Confirmed existing Supabase project identity

- Authenticated Supabase dashboard lists `rndegttgwtpkbjtvjgnc` as **PWD and Toti Room**, under **Global Skills Prime**. This is the project's shared agency blog source. `src/lib/blog.ts` explicitly describes it as separate from the site CMS environment configuration.
- Website chat still points directly to the ElevenLabs agent; its private model/prompt/knowledge/tools configuration has not been inspected. Do not assert there is no Supabase connection inside that agent.
- Supabase CLI lacks an access token. Browser access reached the existing project, but native accessibility became stuck on a sidebar; ElevenLabs configuration was not readable. No backend changes made.
- Stephen is open to reusing an existing Supabase project or creating one if needed. Prefer inspecting existing configuration before provisioning.

## 2026-09-19 — [Codex] Local environment template

- Created gitignored `.env.local` at Stephen's request with blank secret values, known ElevenLabs/Twilio identifiers, and sections for existing website settings and planned WhatsApp/shared-brain configuration.
- Left CMS project URL/key and Claude model unset pending verification. Documented the existing blog project as a candidate, not a confirmed chat backend.
- Checked Git exclusion and duplicate variable names. No credentials added, runtime wiring changed, or deployment performed.

## 2026-09-19 — [Codex] Validated supplied Supabase credentials

- Read `.env.local` without printing secrets. Anon and service-role JWT project references match the configured server URL.
- Filled previously blank NEXT_PUBLIC_SUPABASE_URL and SUPABASE_PROJECT_REF from SUPABASE_URL.
- Read-only live checks succeeded (HTTP 200): anon Auth settings, service-role PostgREST schema, and Supabase Management project lookup. Confirmed project is PWD and Toti Room.
- Live schema exposes contacts, conversations, knowledge_base, search_knowledge and other shared-project tables. Their ownership, columns, RLS and suitability for GDP still need inspection; do not assume they are GDP chat tables.
- Twilio auth token, ElevenLabs API key, Anthropic key/model, template SIDs and webhook URLs remain empty. No messages sent or deployments performed.

## 2026-09-19 — [Codex] Twilio and ElevenLabs credentials verified

- Read-only Twilio account request returned HTTP 200; account is active. ElevenLabs GET agent returned HTTP 200 for the configured website agent. No messages sent.
- Confirmed current brain: **Global Digital Prime Assistant**, model `gemini-2.5-flash`, with a configured system prompt. Agent configuration returns an empty knowledge_base, RAG disabled, empty tool IDs, and no custom LLM URL. Prompt does not mention Supabase.
- Current integration therefore has no configured Supabase knowledge retrieval in the inspected agent settings. Reuse the existing agent/prompt or explicitly migrate both channels together; do not assume Claude is the existing model.
- Twilio/ElevenLabs secrets were not printed or stored in tracked files. WhatsApp sender status and end-to-end delivery remain unverified.

## 2026-09-19 — [Codex] Upgraded GDP assistant model and instructions

- Stephen requested a more capable, professional assistant. Verified ElevenLabs model catalog supports `claude-sonnet-5`, then upgraded the existing website agent from Gemini 2.5 Flash to Claude Sonnet 5 with low reasoning effort. PATCH and subsequent GET both succeeded; model and prompt readback matched.
- Added canonical instruction source `config/ai/gdp-assistant-prompt.txt`: concise discovery, factual boundaries, no fabricated quotes or action claims, contact capture guidance, honest human-assistance behavior, channel formatting and privacy.
- Preserved pre-change agent configuration in ignored `.local/ai-backups/elevenlabs-before-upgrade.json`; added `.local/` to Git ignore. Set local CLAUDE_MODEL to the verified model ID.
- Agent identity remains unchanged. This is an ElevenLabs-hosted model; direct Anthropic credentials remain unset. No real customer messages, simulation tests or WhatsApp deployment performed. Knowledge retrieval and actual human takeover still need implementation.

## 2026-09-19 — [Codex] Shared chat implementation and initial deployment

- Inspected live schema: existing `conversations` is another application's message log, not GDP threads. Created isolated `gdp_chat_*` tables shared by website and WhatsApp; existing application tables unchanged.
- Applied migration `202609190001_gdp_chat.sql` after validating it inside a rolled-back transaction. One existing Stephen admin was seeded into a dedicated inbox allowlist. Browser table access is read-only and RLS-protected.
- Deployed five Edge Functions with signature validation, destination filtering, durable jobs, strict window checks, private web bridge, and verified-user admin authorization. Cron worker credential is in Vault.
- Shared reply engine calls the existing ElevenLabs agent; website widget now routes through the shared store. Added `/admin/inbox` with Realtime, author/status labels, takeover, template gating, contact editing and error panel.
- Unit checks and Next.js production build passed. Deployed preview `https://gdp-website-l2jwjhmbx-pacificwaveprojects.vercel.app`; browser test confirmed a persisted AI reply. Twilio sender is ONLINE but webhook activation is still pending final checks.

## 2026-09-19 — [Codex] Production chat rollout

- GDP WhatsApp sender is ONLINE and incoming/status webhook URLs were set and read back. Other sender webhooks unchanged; SMS/voice APIs untouched.
- Production website deployment `dpl_Er9Pw5zRw4ECXRpGxpgA8Yhbwk59` is READY and aliased to www.globaldigitalprime.com. Inbox URL: `/admin/inbox`.
- Created/submitted `gdp_welcome` and `gdp_update` templates; approval remains pending. Only approved configured templates are usable.
- Added volunteered-email capture and media-to-human routing in migration `202609190002_gdp_media_contact.sql`. Media uses a placeholder because the former website widget had no attachment store.
- Unit tests (5), Deno check, Next.js typecheck/build, rollback-only database behavior/RLS tests and live API smoke checks passed. Browser verified AI reply and “agent” handoff. Live admin API verified takeover, human reply, hand-back and expired-window block.
- Configured rate-limited error emails to Stephen's approved admin email using the existing Resend provider and verified Pacific Wave Digital domain; test alert accepted.
- Awaiting the user's real WhatsApp test message. Do not claim handset delivery/read verification or full authenticated inbox screenshots yet.
- Unrelated root files `Estuary Treasures Logo 1.png` and `Estuary Treasures Logo 2.png` appeared during work; do not modify or commit them as part of chat work.

## 2026-09-19 — [Codex] Handset failure diagnosed

Stephen's real inbound message reached Twilio but failed webhook validation (11200 / HTTP 400 Invalid message). From was a WhatsApp business-scoped user ID, not E.164. Added validated BSUID/parent-BSUID support to inbound identity and outbound routing; missing phone remains null. Six tests pass including roundtrip and malformed ID rejection. Deploying fix and applying exact GDP Logo/gdp-logo.jpg (identical to deployed public/images/logos/gdp-logo.jpg).

## 2026-09-19 — [Codex] WhatsApp delivery and logo confirmed

Deployed BSUID fix to all five functions. Recovered Stephen's authenticated failed inbound from Twilio logs after checking original message, destination and age; webhook returned 200 and AI job completed first attempt. Reply SMcecc743b6815baf13524f2c1688c01ae reached delivered status via callback. GDP sender ONLINE with profile logo_url set to the exact provided logo hosted at https://www.globaldigitalprime.com/images/logos/gdp-logo.jpg. No other sender changed. Initial reply to typo "Ji" was Indonesian; updated the shared ElevenLabs prompt to default to English for ambiguous greetings, retaining claude-sonnet-5. Six regression tests pass. Profile update must send only logo_url: echoing existing empty email field causes Twilio validation failure.

## 2026-09-20 — [Codex] Every-message email notifications

Stephen requested notifications@pacificwavedigital.com receive every incoming customer message from web and WhatsApp, including AI and human mode. Implementing separate durable notification outbox triggered on customer inserts, independent of AI jobs, with frozen Resend payload/idempotency keys and retries. No old-message backfill. Persistent-memory CLI remains unavailable (numpy missing); shared markdown is updated.

## 2026-09-20 — [Codex] Every-message emails deployed and tested

Applied migration 20260920030914 after rollback validation; deployed notification worker alongside existing independent reply jobs. Configured notifications@pacificwavedigital.com for all new inbound customer messages. Two labeled live tests (web/WhatsApp in human mode) each accepted by Resend on first attempt; duplicated ingests created no extra notifications. Six existing unit tests and Deno typecheck passed. SQL tests cover both channels/modes, outbound exclusion and private table/RPC privileges. Existing error alerts untouched; no old messages backfilled. Email queue is service-role-only with frozen payloads, idempotency keys, backoff, and a 23h uncertainty cutoff. Local test IDs are in ignored .local/email-notification-tests.json.

## 2026-09-25 — [Codex] Student video agent discovery

Stephen requested Anam onboarding tutor, class student assistant, and coaching recommendations, reusing Digiassist AI configuration. Read-only source review found reusable Anam helper, course-stage personalized prompts, memory and populated persona environment settings (no secrets printed; live validity not checked). GDP has no course/student routes. Asked which destination course project to implement in; pending answer. Prepared docs/STUDENT-VIDEO-AGENTS.md. No production personas, credentials or student data changed.

## 2026-09-25 — [Codex] Video agents completed in PWD Training Centre

User clarified destination is Pacific Wave Digital Training Centre for October, all future courses/cohorts and one-on-one mentorship. Implemented and released four Anam video roles in PWD canonical `.deployment/training-recovery` checkout (not GDP): onboarding, class assistant, business and branding. PWD main 5821edd includes application fe3e6d2; verified promoted deployment dpl_hrAquD7amYg2fmtGyYigk83kaLsR. Production context/token checks and eight live browser tests passed; local real-video personalization/transcript checks passed. See PWD docs/STUDENT-VIDEO-COACHES.md and CLAUDE.md. Earlier destination-pending note is superseded; GDP chat application unchanged.

## 2026-09-25 — [Codex] All recommended PWD coaches added

Owner authorized Sales Practice Coach, Marketing & Content Coach and Project Review Tutor. Released in PWD Training Centre (seven total roles) at application 6be80a8, handoff/main 6019061, promoted dpl_H9qHeZNugrB2Y43k5mMYbt6YiJFv. Three live session checks and eight live desktop/mobile checks passed; fixtures removed. Work remains in PWD canonical recovery checkout; GDP application unchanged.

## 2026-09-26 — [Codex] PWD coaching orientation and meeting upgrade

User requested fixed timetable orientation, natural 3–5 pm speech, role guidance, distinct meeting artwork, one-time onboarding and a 50/50 conference window. Implemented in PWD canonical training-recovery checkout, application d2f2162 and handoff 99685d5; verified promoted dpl_9d75LYBQnc2oXNUgu9UUQTn3q5bq. Real Anam response confirmed fixed timetable; camera/fullscreen, completion persistence, expiry/privacy and all live images checked. 52 tests and eight live browser checks pass. Student camera is local-only; completion requires explicit Complete onboarding, allowing retries and corrected orientation for prior users. See PWD CLAUDE.md and docs/STUDENT-VIDEO-COACHES.md. GDP app unchanged.


## 2026-09-27 — [Codex] PWD coaching learning hub released (cross-project)

User's training-centre request was implemented in `/Users/stephentotimeh/Projects/Pacific Wave Digital/PWD Home/pacific-wave-website/.deployment/training-recovery`, not GDP application code. PWD application `1bc7246`, recovery migration `c6e86f2`, handoff `004318c`; verified deployment `dpl_AEkNSt6dUMawBjWqAaD7wiBJDZXu` promoted. Saved approval, voice/video-only meetings, live research, private renamed session reports/PDFs/student emails, visual course navigation/twelve thumbnails and secure cohort video uploads. Fifty-five tests, real Anam voice/research/report flow, production private PDF checks and eight live browser checks pass. Zero synthetic users/courses remain. Continue in that PWD checkout and its CLAUDE/memory; GDP app/keys unchanged.

Final PWD main build `dpl_BhLf8nvf1Z1CekSAkAtfjsTNx4Lj` (`004318c`) is READY and owns pacificwavedigital.com — [Codex] 2026-09-27.
