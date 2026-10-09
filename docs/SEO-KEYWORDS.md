# SEO Keyword Map — globaldigitalprime.com

**Date:** 2026-10-10 · **Prepared by:** Claude Code (subagent)
**Data source:** Qualitative only. Built from WebSearch results (US-only search index, standard mode, 7 queries) and a review of the routes in this repo.
**Numbers:** Search volume, keyword difficulty (KD) and CPC are **not measured**. The DataForSEO credentials (`DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD`) in `.env.local` are blank, so every API call returned 40100 Unauthorized. **API cost: $0.**
Difficulty ratings below (High/Med/Low) are judgements based on the type of pages that compete. They are not KD scores.

---

## 1. Current visibility (proxy for "already ranking")

| Check | Finding |
|---|---|
| `site:globaldigitalprime.com` | **No pages from the domain were returned.** All results were for the unrelated forex broker Global Prime (globalprime.com). The search tool's index may lag Google's, so confirm in Google Search Console (Coverage / Pages report). |
| Brand query "Global Digital Prime" | **The site does not appear.** Results: UN "Global Digital Compact" (Wikipedia), "Global Digital Director" job ads (Omnicom, Amazon Prime Video) and Gartner's digital-agency category. |
| Brand query "globaldigitalprime" | **The site does not appear.** Competing names: Global Prime (forex broker, AU/Vanuatu/Seychelles), Global Prime Partners Ltd (London), Digital Prime Technologies (US digital-asset prime broker). |
| Repo routes today | `/`, `/about`, `/services`, `/solutions`, `/industries`, `/contact`, `/blog`, `/blog/[slug]`, `/careers`, `/get-started`, `/privacy`, `/terms`. **`/products`, `/products/visareadypro` and all `/id/*` pages do not exist yet.** They are mapped below for the planned build. |

**Conclusion:** the domain has no measurable organic footprint. Even the brand query is weak, and "Prime" collides with finance and forex brands. Quick wins:
1. Verify indexing in Google Search Console and submit the sitemap.
2. Add `Organization` JSON-LD (name, legalName, url, logo, sameAs → LinkedIn, VisaReadyPro, socials).
3. Use the exact phrase "Global Digital Prime" in the H1 or opening paragraph of `/` and `/about`.
4. Link to globaldigitalprime.com from visareadypro.com and from the Pacific Wave Digital site.

## 2. Target keyword difficulty (qualitative)

| Keyword | Market | Volume / KD / CPC | Difficulty | Reason |
|---|---|---|---|---|
| whatsapp ai chatbot for business | US/EN | not measured — DataForSEO credentials blank | **High** | SaaS vendors (Chat-Data, REVE Chat, Vonage, eesel.ai, Wassenger) plus G2 and Contra hold the SERP. These are strong commercial domains. |
| ai chatbot for website small business | US/EN | not measured — DataForSEO credentials blank | **High** (head) / **Med** (long-tail) | Results are a mix of vendors (WhisperChat), Fiverr gigs, WallStreetMojo, and some low-quality spam pages. The spam suggests long-tail variants are beatable. |
| jasa pembuatan chatbot whatsapp | ID | not measured — DataForSEO credentials blank | **Low–Med** | The (US-index) SERP is mostly thin auto-translated pages (messengerbot.app) and a YCloud blog post. There are few real service pages, so this is an opening. |
| software house bali | ID/EN | not measured — DataForSEO credentials blank | **Med** | Directories (DesignRush, GoodFirms, Sortlist), Mitrais, and small local studios. To compete, get listed in those directories and publish a dedicated local page. |
| ai chatbot for website | US/EN | not measured — DataForSEO credentials blank | High | Inferred. It is the head term for the same vendor set. |
| whatsapp business ai / ai whatsapp chatbot for business | US/EN | not measured — DataForSEO credentials blank | High | Same vendor set as above. |
| claude ai integration | US/EN | not measured — DataForSEO credentials blank | Med | Inferred. The term is newer, and Anthropic docs and dev agencies dominate. A "Claude-powered" angle is a differentiator. |
| custom ai development / ai agent development company | US/EN | not measured — DataForSEO credentials blank | High | Inferred. Large agencies and listicles compete. |
| custom software development company | US/EN | not measured — DataForSEO credentials blank | Very High | Inferred. Clutch and enterprise agencies compete. Treat it as a secondary term only. |
| jasa pembuatan website bali / pembuatan aplikasi android bali | ID | not measured — DataForSEO credentials blank | Med | Inferred. Local studios compete. The geo modifier lowers the bar. |
| chatbot whatsapp bisnis / jasa pembuatan chatbot ai | ID | not measured — DataForSEO credentials blank | Low–Med | Inferred from the "jasa pembuatan chatbot whatsapp" SERP. |

**Strategy for a young domain:** target long-tail plus a modifier ("Claude", "for clinics/hotels/agencies", "Bali", "with human handover") instead of head terms. Indonesian service terms have the weakest competition.

## 3. Per-page keyword map

Volume, KD and CPC for every keyword below are **not measured — DataForSEO credentials blank**.

English titles and meta descriptions are fixed by the existing brief. Only H2s and body phrases are suggested for those pages.

### English pages

| Page | Primary keyword | Secondary keywords | Suggested H2s / body phrases |
|---|---|---|---|
| `/` | AI assistant for website and WhatsApp | ai chatbot for website; whatsapp ai chatbot for business; ai customer service assistant; claude ai assistant; ai assistant for small business | H2 "AI assistants for your website and WhatsApp" · H2 "One assistant, every channel: website chat and WhatsApp" · H2 "Powered by Claude, with a human handover when it matters" · body: "Global Digital Prime builds AI customer service assistants…" (brand name early) |
| `/products` | AI assistant products | whatsapp ai chatbot; ai chatbot for website; visa application assistant; ai customer support software | H2 "Ready-to-deploy AI assistants" · H2 "VisaReadyPro: AI visa application assistant" · body: "website chat and WhatsApp in one inbox" |
| `/products/visareadypro` | AI visa application assistant | visa application help; visa document checklist; student visa checklist; visa assistant ai | H2 "Prepare your visa application with an AI assistant" · H2 "Personalised document checklists" · H2 "Built for students, workers and travellers" · link out to visareadypro.com as the canonical product site |
| `/services` | custom AI development services | ai agent development company; claude ai integration; whatsapp business api integration; custom software development; mobile app development | H2 "Custom AI assistant and agent development" · H2 "Claude AI integration for your business systems" · H2 "WhatsApp Business API integration" · H2 "Web, cloud and mobile development" |
| `/about` | Global Digital Prime (brand) | AI development company; Claude AI development partner; Global Digital Prime Inc | H2 "About Global Digital Prime" · H2 "Our team across the US, Indonesia and the Pacific" · body: "Global Digital Prime, Inc. is a Delaware company building AI assistants powered by Claude…" |
| `/contact` | contact Global Digital Prime | AI chatbot consultation; WhatsApp chatbot quote; book an AI demo | H2 "Talk to us about your AI assistant" · H2 "Message us on WhatsApp" · body: "free consultation", "demo" |

### Indonesian pages (`/id/`)

All meta descriptions are under 155 characters (counts verified). They use neutral wording with no legal name or address claims.

| Page | Primary keyword | Secondary keywords | Meta description (chars) | H1 / H2 |
|---|---|---|---|---|
| `/id/` | chatbot whatsapp bisnis | asisten AI untuk bisnis; chatbot AI website; jasa pembuatan website bali; software house bali | "Asisten AI untuk chat website dan WhatsApp, plus jasa pembuatan website dan aplikasi untuk bisnis di Bali dan seluruh Indonesia." (128) | H1 "Asisten AI untuk Website dan WhatsApp Bisnis Anda" · H2 "Chatbot WhatsApp yang menjawab pelanggan 24 jam" · H2 "Software house untuk bisnis di Bali" |
| `/id/layanan` | jasa pembuatan chatbot AI | jasa pembuatan chatbot whatsapp; jasa pembuatan website; jasa pembuatan aplikasi; pembuatan aplikasi android bali | "Jasa pembuatan chatbot AI WhatsApp, website, aplikasi Android dan software custom untuk bisnis di Bali. Konsultasikan kebutuhan Anda." (133) | H1 "Layanan Pengembangan AI dan Software" · H2 "Jasa Pembuatan Chatbot WhatsApp dan AI" · H2 "Jasa Pembuatan Website" · H2 "Pembuatan Aplikasi Android dan iOS" · H2 "Integrasi WhatsApp Business API" |
| `/id/tentang-kami` | software house bali | perusahaan pengembang AI; tim developer Bali; Global Digital Prime Indonesia | "Kenali Global Digital Prime: tim pengembang asisten AI dan software untuk bisnis di Indonesia, dari chatbot WhatsApp hingga aplikasi custom." (140) | H1 "Tentang Global Digital Prime" · H2 "Tim pengembang AI dan software untuk bisnis Indonesia" · H2 "Mengapa memilih kami" |
| `/id/kontak` | konsultasi chatbot whatsapp | hubungi software house bali; konsultasi pembuatan aplikasi; konsultasi website | "Hubungi Global Digital Prime untuk konsultasi chatbot WhatsApp, asisten AI, website, atau aplikasi bisnis Anda via WhatsApp atau email." (135) | H1 "Hubungi Kami" · H2 "Konsultasi gratis via WhatsApp" · H2 "Kirim pesan kepada tim kami" |

Note: "konsultasi gratis" in the `/id/kontak` H2 should only be used if Stephen confirms consultations are free.

## 4. Blog topics (informational, likely low competition)

The volume and KD for these topics are not measured. Each one targets a long-tail informational query where vendor pages are thin.

| # | Working title | Target query | Why |
|---|---|---|---|
| 1 | WhatsApp Business App vs WhatsApp Business API: which do you need for an AI chatbot? | whatsapp business app vs api for chatbot | The SERP shows confusion about this, and a vendor guide flags it as a red flag. GDP's Twilio/Meta experience is relevant. |
| 2 | How to hand a WhatsApp chatbot conversation to a human (without losing the customer) | whatsapp chatbot human handover | Lean SERP. This showcases the GDP inbox and its human-takeover feature. |
| 3 | Claude vs ChatGPT for customer service chatbots: what small businesses should know | claude vs chatgpt for customer service | Low-competition comparison and a natural fit with the "powered by Claude" positioning. |
| 4 | How much does a WhatsApp AI chatbot cost in 2026? (Meta fees, build and running costs) | whatsapp ai chatbot cost | High-intent informational query. The SERP is fragmented across vendor pricing pages. |
| 5 | Cara membuat chatbot WhatsApp untuk bisnis di Indonesia (panduan 2026) | cara membuat chatbot whatsapp bisnis | ID SERP is dominated by thin auto-translated pages. Publish it on the `/id/` blog. |
| 6 | 7 questions your website chatbot should answer before a customer calls you | ai chatbot faq examples small business | Long-tail. Useful for clinics, hotels and agencies, and links naturally to `/products`. |

## 5. To get real numbers

1. Add the DataForSEO API login and password (from https://app.dataforseo.com/api-access) to `.env.local` as `DATAFORSEO_LOGIN=` and `DATAFORSEO_PASSWORD=`. They are currently blank.
2. Re-run these calls, at roughly $0.30–0.60 in total:
   - `dataforseo_labs/google/ranked_keywords/live` and `domain_rank_overview/live` (2840 en; 2360 id and en)
   - `serp/google/organic/live/regular` for "Global Digital Prime" (US en, ID id)
   - `dataforseo_labs/google/keyword_overview/live` for every keyword in sections 2–4, then `keyword_suggestions/live` for the best seeds
3. Replace each "not measured" cell with volume/KD/CPC and swap any keyword with KD > 40 for a longer-tail variant.
4. In parallel, connect Google Search Console (verification already shipped per commit 909394f) for real impressions and queries.
