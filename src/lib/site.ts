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

// Group structure (Stephen, 10 Oct 2026): Global Digital Prime, Inc. (USA) is the
// main company; these are other companies in the same group. Legal ownership
// between the entities is not stated, so no parentOrganization schema is used.
export interface GroupCompany {
  name: string
  country: string
  url: string
  focus: string
}

export const groupCompanies: GroupCompany[] = [
  { name: 'Pacific Wave Digital', country: 'Vanuatu', url: 'https://pacificwavedigital.com', focus: 'Digital services and training for the Pacific' },
  { name: 'Rapid Entrepreneurs', country: 'Ghana', url: 'https://rapidentrepreneurs.com', focus: 'Business and digital services for West Africa' },
]

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
  category: string
  tagline: string
  description: string
  features: string[]
  market: string
  status: ProductStatus
  // Internal detail page when we have one, otherwise the product's own site.
  href: string
  externalUrl: string
  image: string
  live: boolean
}

// Stephen confirmed on 10 Oct 2026 that all of these are Global Digital Prime
// products; each site was checked live (HTTP 200) the same day. Descriptions
// come from each product's own public site.
export const products: Product[] = [
  {
    slug: 'visareadypro',
    name: 'VisaReadyPro',
    category: 'AI visa assistant',
    tagline: 'An AI visa assistant that answers applicants on website chat and WhatsApp, with a specialist ready to take over.',
    description:
      'Research, document preparation and interview practice for student, work and tourist visas, plus help understanding visa refusals.',
    features: ['Web chat + WhatsApp assistant', 'Document checklists', 'Interview practice', 'Specialist handover'],
    market: 'Global',
    status: 'Live',
    href: '/products/visareadypro',
    externalUrl: 'https://www.visareadypro.com',
    image: '/images/products/visareadypro-home.webp',
    live: true,
  },
  {
    slug: 'digiassistai',
    name: 'DigiAssist AI',
    category: 'All-in-one business platform',
    tagline: 'One platform to replace your whole business software stack.',
    description:
      'Website builder, online store, AI chatbot, bookings, invoices, CRM, campaigns, automation and an AI business coach in one subscription.',
    features: ['Website & online store', 'AI chatbot', 'Bookings & invoices', 'CRM & campaigns', 'AI business coach'],
    market: 'Global',
    status: 'Live',
    href: 'https://digiassistai.com',
    externalUrl: 'https://digiassistai.com',
    image: '/images/products/digiassistai.webp',
    live: true,
  },
  {
    slug: 'edusmartassist',
    name: 'EduSmartAssist',
    category: 'School management platform',
    tagline: 'Run your whole school with confidence, wherever you teach.',
    description:
      'One secure platform for school operations, learning, staff, students and families, configured for each country\'s curriculum, currency and school day.',
    features: ['Admissions & enrolment', 'Attendance & timetables', 'Exams & report cards', 'Fees & school finance', 'Family experience'],
    market: 'Ghana · Nigeria · Vanuatu · Global',
    status: 'Live',
    href: 'https://edusmartassist.com',
    externalUrl: 'https://edusmartassist.com',
    image: '/images/products/edusmartassist.webp',
    live: true,
  },
  {
    slug: 'locallanguagelab',
    name: 'Local Language Lab',
    category: 'Native-language AI customer service',
    tagline: 'Customer service that speaks home.',
    description:
      'Create multilingual AI customer-service assistants with native local voices, grounded in your own business information, for your website.',
    features: ['Voices from native speakers', 'Voice + video assistant', 'Answers from your business info', 'Website widget or link'],
    market: 'Pacific · Africa · Global',
    status: 'Live',
    href: 'https://locallanguagelab.com',
    externalUrl: 'https://locallanguagelab.com',
    image: '/images/products/locallanguagelab.webp',
    live: true,
  },
  {
    slug: 'storianai',
    name: 'Storian AI',
    category: 'AI assistant in Bislama',
    tagline: 'An everyday AI companion for Vanuatu, in Bislama.',
    description: 'Write, learn and get things done in Bislama, English or French: chat, voice calls, read-aloud and transcription.',
    features: ['Chat in Bislama', 'Voice conversations', 'Text to speech', 'Transcription'],
    market: 'Vanuatu',
    status: 'Live',
    href: 'https://www.storianai.com',
    externalUrl: 'https://www.storianai.com',
    image: '/images/products/storianai.webp',
    live: true,
  },
  {
    slug: 'onukpaai',
    name: 'Onukpa AI',
    category: 'AI assistant in Ga',
    tagline: 'Big ideas, in your language: an AI assistant in Ga.',
    description: 'Write letters and CVs, read text aloud, transcribe speech and chat, all in Ga, with English available too.',
    features: ['Chat in Ga', 'Read aloud (MP3)', 'Transcribe speech', 'Projects'],
    market: 'Ghana',
    status: 'Live',
    href: 'https://www.onukpaai.com',
    externalUrl: 'https://www.onukpaai.com',
    image: '/images/products/onukpaai.webp',
    live: true,
  },
  {
    slug: 'asksena',
    name: 'Sena AI',
    category: 'AI assistant in Ewe',
    tagline: 'Ask Sena: an AI assistant in Ewe.',
    description: 'Write letters and CVs, read text aloud, transcribe speech and chat, all in Ewe, for Ghana and Togo.',
    features: ['Chat in Ewe', 'Read aloud (MP3)', 'Transcribe speech', 'Projects'],
    market: 'Ghana · Togo',
    status: 'Live',
    href: 'https://www.asksena.com',
    externalUrl: 'https://www.asksena.com',
    image: '/images/products/asksena.webp',
    live: true,
  },
  {
    slug: 'akwaabaai',
    name: 'Akwaaba AI',
    category: 'AI assistant in Asante Twi',
    tagline: 'An AI assistant in Asante Twi.',
    description: 'Write letters, CVs and business plans, read text aloud, transcribe speech and chat, all in Asante Twi.',
    features: ['Chat in Twi', 'Read aloud (MP3)', 'Transcribe speech', 'Projects'],
    market: 'Ghana',
    status: 'Live',
    href: 'https://www.akwaabaai.com',
    externalUrl: 'https://www.akwaabaai.com',
    image: '/images/products/akwaabaai.webp',
    live: true,
  },
  {
    slug: 'vanuway',
    name: 'VanuWay',
    category: 'Super app',
    tagline: 'Everything you need in Vanuatu, all in one app.',
    description:
      'Ride-hailing, food delivery, hotels, tours, marketplace, real estate, health services and jobs in one platform.',
    features: ['Ride-hailing & delivery', 'Food & shopping', 'Hotels & tours', 'Real estate', 'Jobs & health'],
    market: 'Vanuatu',
    status: 'Live',
    href: 'https://vanuway.com',
    externalUrl: 'https://vanuway.com',
    image: '/images/products/vanuway.webp',
    live: true,
  },
  {
    slug: 'vanuconnect',
    name: 'Vanu Connect',
    category: 'Bulk SMS & business messaging',
    tagline: 'Bulk SMS and business messaging for Vanuatu.',
    description:
      'Send marketing campaigns, appointment reminders and notifications to any mobile number in Vanuatu, with an API and live delivery reports.',
    features: ['Bulk SMS campaigns', 'Appointment reminders', 'REST API', 'Real-time analytics'],
    market: 'Vanuatu',
    status: 'Live',
    href: 'https://vanuconnect.com',
    externalUrl: 'https://vanuconnect.com',
    image: '/images/products/vanuconnect.webp',
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
