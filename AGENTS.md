# AGENTS.md — Global Digital Prime Website

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
