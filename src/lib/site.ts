// Single source of truth for every company fact shown on the website.
// Brief rule (10 Oct 2026): only publish verified facts. Items the brief marks
// CONFIRM stay `confirmed: false` and are never rendered until Stephen confirms
// them — flip the flag (and fill the value) to publish.

export const SITE_URL = 'https://www.globaldigitalprime.com'

export interface PendingFact {
  value: string
  confirmed: boolean
}

export const company = {
  name: 'Global Digital Prime',
  legalName: 'Global Digital Prime, Inc.',
  entityType: 'Delaware C-Corporation',
  foundingDate: '2025-12-05',
  foundedLabel: 'December 2025',
  founder: {
    name: 'Stephen Totimeh',
    role: 'Founder and CEO',
    // Linked from stevetoti.com; brief marks it CONFIRM before publishing.
    linkedin: { value: 'https://www.linkedin.com/in/stevetoti', confirmed: false } as PendingFact,
    photo: '/images/founder/stephen-totimeh.webp',
  },
  phone: { display: '+1 959 949 1242', tel: '+19599491242' },
  email: 'steve@globaldigitalprime.com',
  generalEmail: { value: 'info@globaldigitalprime.com', confirmed: false } as PendingFact,
  // Brief: registered-agent or real business address — CONFIRM before publishing.
  usAddress: {
    value: '1111B S Governors Ave STE 99244, Dover, DE 19904, United States',
    confirmed: false,
  } as PendingFact,
  delawareFileNumber: { value: '', confirmed: false } as PendingFact,
  social: {
    linkedin: { value: 'https://www.linkedin.com/company/globaldigitalprime', confirmed: false } as PendingFact,
    x: { value: 'https://x.com/globaldigitalprime', confirmed: false } as PendingFact,
    github: { value: 'https://github.com/globaldigitalprime', confirmed: false } as PendingFact,
  },
}

export const indonesia = {
  brand: 'Global Digital Prime Indonesia',
  // Exact name on the PT registration — CONFIRM.
  legalName: { value: '', confirmed: false } as PendingFact,
  address: { value: 'Jl. Dewi Sri No. 20, Legian, Kuta, Bali 80361', confirmed: false } as PendingFact,
  phone: { value: '+62 895-0883-6095', confirmed: false } as PendingFact,
  whatsapp: { value: '6289508836095', confirmed: false } as PendingFact,
  email: { value: 'indonesia@globaldigitalprime.com', confirmed: false } as PendingFact,
}

export type ProductStatus = 'Live' | 'Beta'

export interface Product {
  slug: string
  name: string
  tagline: string
  status: ProductStatus
  href: string
  externalUrl: string
  live: boolean
}

// Only products confirmed live are listed. EduSmartAssist and DigiAssistAI
// stay off the site until Stephen confirms they are live.
export const products: Product[] = [
  {
    slug: 'visareadypro',
    name: 'VisaReadyPro',
    tagline: 'An AI visa assistant that answers applicants on website chat and WhatsApp, with a specialist ready to take over.',
    status: 'Live',
    href: '/products/visareadypro',
    externalUrl: 'https://www.visareadypro.com',
    live: true,
  },
]

export const liveProducts = products.filter((p) => p.live)

export const visaReadyPro = {
  whatsappDisplay: '+1 737 371 9225',
  whatsappLink: 'https://wa.me/17373719225',
  url: 'https://www.visareadypro.com',
}

export function published(fact: PendingFact): string | null {
  return fact.confirmed && fact.value ? fact.value : null
}

export function socialLinks(): { name: string; href: string }[] {
  const candidates: [string, PendingFact][] = [
    ['LinkedIn', company.social.linkedin],
    ['X', company.social.x],
    ['GitHub', company.social.github],
  ]
  return candidates.flatMap(([name, fact]) => {
    const href = published(fact)
    return href ? [{ name, href }] : []
  })
}

// hreflang page pairs (brief: reciprocal en / id / x-default on each pair).
export const pagePairs: Record<string, string> = {
  '/': '/id',
  '/services': '/id/layanan',
  '/about': '/id/tentang-kami',
  '/contact': '/id/kontak',
}

const idToEn = Object.fromEntries(Object.entries(pagePairs).map(([en, id]) => [id, en]))

export function alternatesFor(path: string) {
  const enPath = pagePairs[path] ? path : idToEn[path]
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
  if (!enPath) {
    return { canonical, languages: { en: canonical, 'x-default': canonical } }
  }
  const en = `${SITE_URL}${enPath === '/' ? '/' : enPath}`
  const id = `${SITE_URL}${pagePairs[enPath]}`
  return { canonical, languages: { en, id, 'x-default': en } }
}
