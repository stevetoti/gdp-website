# CLAUDE.md — Global Digital Prime Website

## Project Overview

| Field | Value |
|-------|-------|
| **Name** | GDP Website |
| **Purpose** | Corporate website for Global Digital Prime |
| **Company** | Global Digital Prime |
| **Status** | Production |
| **Type** | Marketing/Corporate website |

## Tech Stack

- **Framework:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (for dynamic content/CMS)
- **Rich Text:** Tiptap editor
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel

## Deployment

- **Platform:** Vercel
- **Deploy Token:** `$VERCEL_TOKEN`
- **Deploy:** Push to `main` auto-deploys

## Key Directories

```
src/
├── app/            # Next.js App Router pages
├── components/     # React components
├── lib/            # Utilities
└── styles/         # CSS

public/             # Static assets (images, logos)
```

## Key Features

- Corporate homepage
- Services showcase
- About/Team pages
- Contact forms
- Blog/News section (Tiptap CMS)
- Responsive design
- Animated sections (Framer Motion)

## Key Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind theme |
| `src/app/page.tsx` | Homepage |

## Content Management

Uses Supabase for dynamic content:
- Blog posts
- Team members
- Services
- Testimonials

## Tiptap Editor

Rich text editing for CMS features:
- Image upload
- Links
- Placeholder text

## Special Instructions

1. **SEO:** Ensure proper meta tags and Open Graph
2. **Performance:** Optimize images, use Next.js Image component
3. **Responsive:** Test on mobile devices
4. **Brand Consistency:** Match Global Digital Prime brand guidelines

---

*Last updated: March 2026*


## Shared agent workflow

Read this file first and then `memory/changelog.md`, `memory/decisions.md`, and `memory/todo.md`. Keep project instructions here; AGENTS.md is only a pointer. Tag memory entries with date and agent name.

## Resume here — 2026-09-19 [Codex]

WhatsApp discovery found that `src/components/ChatWidget.tsx` embeds ElevenLabs agent `agent_4501kgqzyj13fjav2d5yw54fs4m5`. No Claude reply engine, chat API, Supabase function source, or chat migrations are present in this checkout. The transcripts admin page is demo data in React state. The WhatsApp brief assumes a Supabase/Claude chat implementation; confirm the actual backend with Stephen before implementing migrations or a replacement brain. See `memory/todo.md`.


### Verified configuration — 2026-09-19 [Codex]

Read-only API checks now pass for Supabase, Twilio (active account), and ElevenLabs. The website agent is **Global Digital Prime Assistant**, using `gemini-2.5-flash` with a system prompt, no knowledge documents, RAG disabled, no tools, and no custom LLM URL. Supabase project PWD and Toti Room is available but is not configured as this agent's knowledge source. Credentials remain only in ignored `.env.local`; no WhatsApp integration has been deployed.


### Latest agent upgrade — 2026-09-19 [Codex]

The existing website agent now uses `claude-sonnet-5` with low reasoning effort and the instructions in `config/ai/gdp-assistant-prompt.txt`. Model and prompt were verified through API readback. This supersedes the Gemini snapshot above. The prior configuration is in ignored `.local/ai-backups/`. WhatsApp, shared Supabase knowledge retrieval and human takeover are still pending; prompt guidance alone does not implement them.


## Resume here — deployed chat, 2026-09-19 [Codex]

- Website and WhatsApp share the same ElevenLabs Claude Sonnet 5 agent through `supabase/functions/_shared/reply-engine.ts`, plus one GDP knowledge record and conversation store. Website chat is now text-based and stored centrally.
- Production inbox: https://www.globaldigitalprime.com/admin/inbox. Live project: PWD and Toti Room (`rndegttgwtpkbjtvjgnc`). Existing generic conversations/contacts tables belong to other systems, so chat uses the new `gdp_chat_*` tables.
- GDP WhatsApp sender is ONLINE and its inbound/status webhooks are configured. Five functions are deployed, with a durable retry schedule and admin-only RLS. SMS/voice and other WhatsApp senders were untouched.
- See `docs/WHATSAPP-SETUP.md` for operations, secrets, migrations, verification, and limitations. Local secrets and backups are ignored.
- Both GDP templates are pending Meta approval. Real handset delivery/read and full inbox screenshot evidence are not yet verified: Stephen was asked to send “Hi” to +16068067748. Do not claim these steps passed without checking.
- Code is uncommitted. Do not include unrelated Estuary Treasures logo files in any chat commit.

### 2026-09-19 — [Codex] Latest handset verification

WhatsApp handset test exposed BSUID sender format (`whatsapp:GH.…`) rejected by phone-only validation. Fixed in shared security/handlers/send, deployed all five functions, and recovered original inbound through the webhook. AI reply confirmed delivered by callback. GDP logo applied to Twilio sender profile; status ONLINE. Shared ElevenLabs prompt now defaults to English on ambiguous greetings. See memory/changelog.md and docs/WHATSAPP-SETUP.md. Six unit tests pass. No schema migration needed for BSUID; never coerce private IDs into phone numbers.

### 2026-09-20 — [Codex] Every-message notifications

All new customer messages on WhatsApp/web now queue emails to notifications@pacificwavedigital.com, independent of AI/human mode. Separate private outbox in migration 20260920030914, processed by existing worker and cron; current secrets use GDP_MESSAGE_NOTIFICATION_EMAIL/FROM and existing Resend key. Live test emails accepted once per message. No historical backfill. Details and recovery behavior in docs/WHATSAPP-SETUP.md.
