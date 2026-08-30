# Changelog — Global Digital Prime Website

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
