# GDP website and WhatsApp chat

## Live routing

- Inbox: https://www.globaldigitalprime.com/admin/inbox
- WhatsApp: +1 606 806 7748
- Incoming webhook (POST): https://rndegttgwtpkbjtvjgnc.supabase.co/functions/v1/whatsapp-inbound
- Delivery callback (POST): https://rndegttgwtpkbjtvjgnc.supabase.co/functions/v1/whatsapp-status
- Authenticated admin actions: https://rndegttgwtpkbjtvjgnc.supabase.co/functions/v1/whatsapp-send

Only the GDP WhatsApp sender's webhooks were changed. SMS/voice configuration and other WhatsApp senders were not modified.

## Shared brain and storage

Both website and WhatsApp messages use `_shared/reply-engine.ts`, the same ElevenLabs agent `agent_4501kgqzyj13fjav2d5yw54fs4m5`, its hosted Claude Sonnet 5 model and system prompt, and the single `gdp_chat_config.knowledge` field. The agent prompt source is `config/ai/gdp-assistant-prompt.txt`. No independent WhatsApp prompt or knowledge base exists.

The engine opens a text-only agent connection for each reply and supplies the latest 20 stored messages as context. The configured agent greeting must remain non-empty. The provider greeting is discarded, and the customer's message gets one agent response. This approach adds session overhead; it does not retain a long-lived provider socket between WhatsApp messages.

The previous website widget called ElevenLabs directly without a shared conversation store. It is replaced with a text widget using `/api/chat`, a secure HTTP-only session cookie, and the server-only `gdp-web-chat` bridge. Phone and WhatsApp links are provided; the prior embedded voice widget is no longer mounted.

Existing `public.conversations` contains another application's individual message records. It and the shared contacts/knowledge tables were not repurposed. New GDP-scoped tables serve both channels:

- `gdp_chat_contacts`, `gdp_chat_conversations`, `gdp_chat_messages`
- `gdp_chat_config`, `gdp_chat_jobs`, `gdp_chat_errors`
- `gdp_chat_admins`, `gdp_chat_status_events`, `gdp_chat_rate_limits`

Migrations: `supabase/migrations/202609190001_gdp_chat.sql` and `202609190002_gdp_media_contact.sql`. These were applied using the Supabase Management API; do not blindly reapply or run a database reset on this shared project.

## Operator workflow

1. Sign into GDP admin with Stephen's existing admin account and open Customer Inbox.
2. New messages show their channel, unread count, and AI/human mode.
3. Take over pauses AI. Sending a human reply also pauses AI. Hand back to AI enables replies to subsequent inbound messages; it does not replay old messages.
4. A customer's human request immediately changes mode. Attachments also request human review. Until authenticated media previews are implemented, the inbox shows the attachment type and a placeholder; files remain at Twilio.
5. Outside 24 hours, free-text is disabled and the server rejects it. Only configured, provider-approved templates are listed. A customer reply opens a new window.
6. Supplied email addresses are captured; names/emails can be corrected in Contact details. Automatic cross-channel identity merging is intentionally absent because a typed email does not prove ownership.

Twilio template definitions `gdp_welcome` and `gdp_update` have been submitted for approval. Their SIDs are in local configuration and Edge Function secrets. Approval is controlled by Meta; pending/rejected templates cannot be sent from the inbox.

## Reliability and security

Inbound webhook requests require a valid Twilio HMAC signature over the exact configured public URL, matching account and destination. A transaction records the incoming message and creates its job before the TwiML acknowledgement. MessageSid deduplication prevents repeat messages and jobs. Transient persistence failures return a non-2xx response so the webhook is not falsely acknowledged.

An immediate worker kick handles normal replies. A once-per-minute pg_cron/pg_net schedule recovers queued work, with its credential in Supabase Vault. Queue claims serialize and prevent overlapping processing within a conversation. Stalled jobs are recoverable. The outbound outbox reserves an idempotency key before contacting Twilio. Unknown send outcomes are not automatically resent; review them in Twilio. AI mode/version is rechecked immediately before dispatch; a message already accepted by Twilio cannot be recalled by a later takeover.

Admin JWTs are verified by Supabase and the function checks the dedicated `gdp_chat_admins` allowlist. Realtime tables permit admin reads only. Browser clients cannot directly mutate chat tables. Anonymous website conversations are accessible only through their private session cookie.

Internal error notifications are stored in the inbox and rate-limited. Email alerts use the existing Resend key and a verified Pacific Wave Digital sender. A deployment test alert was accepted by Resend. Secrets never go in browser-prefixed variables or tracked files.

## Deployment and checks

- `node --experimental-strip-types --test tests/chat.test.mjs` (Node 22+)
- `npx deno check supabase/functions/whatsapp-inbound/index.ts`
- `npx tsc --noEmit` and `npm run build`
- `tests/chat-database.sql` tests database behavior inside a rolled-back transaction.
- `scripts/chat-smoke.cjs` tests the deployed API, live AI response and an isolated admin conversation. It creates a temporary login session for the existing approved admin and signs out only that test session; it sends no WhatsApp messages.
- `scripts/deploy-chat.cjs` uploads only required secrets and deploys functions without pruning unrelated functions.
- `scripts/configure-chat-cron.cjs` configures the recovery schedule. If rotating GDP_INTERNAL_SECRET, update its Vault entry too.
- `scripts/configure-whatsapp.cjs` restricts routing changes to the exact GDP sender.
- `scripts/deploy-website.cjs` creates a preview; `--prod` deploys production.

The live website AI reply and human-request UI have been browser-tested, including a mobile viewport. API tests verify takeover, human website replies, hand-back, invalid signatures, access restrictions and expiry blocking. A real WhatsApp handset exchange, real delivery/read status and screenshots of the authenticated inbox still require completing the final user test.

### Verified handset fix — 2026-09-19

Twilio can supply a privacy-protected business-scoped user ID instead of a phone number. Inbound and outbound now support `whatsapp:CC.BSUID` and parent `whatsapp:CC.ENT.BSUID`, preserving the identifier and leaving the phone blank. Existing phone routing is unchanged. A real incoming message was recovered and its AI reply confirmed **delivered** by the status callback. The GDP profile is ONLINE with the supplied 500×500 logo at https://www.globaldigitalprime.com/images/logos/gdp-logo.jpg. Shared AI defaults to English for ambiguous greetings.

### Every-message emails — 2026-09-20

Every new inbound customer message (web or WhatsApp, AI or human mode) queues one notification to notifications@pacificwavedigital.com. The email includes message text, available customer contact details, attachment count and an inbox link. Reply through the inbox, not to the notification email. Existing error alerts remain separate. Historical messages are not backfilled.

Migration `20260920030914_gdp_inbound_email_notifications.sql` adds a private RLS-protected outbox and customer-message insert trigger. The existing private worker/cron drains this independently of AI replies. Duplicate ingestion does not duplicate email; requests are frozen and use Resend idempotency keys. Retry failures back off (up to 12 attempts), and uncertain requests stop before the provider's 24-hour deduplication expiry. Failed deliveries report through existing operational alerts and retain state for investigation.

Secrets: `GDP_MESSAGE_NOTIFICATION_EMAIL`, `GDP_MESSAGE_NOTIFICATION_FROM`, existing `RESEND_API_KEY`. No frontend redeploy needed. Tests: rollback SQL covers both channels/modes, deduplication, outbound exclusion and private privileges. Two labeled live tests were accepted by Resend, each first attempt. `sent` means provider acceptance, not proof of mailbox delivery.
