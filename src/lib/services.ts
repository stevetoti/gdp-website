// Shared service catalogue for the homepage and /services.
// Images are Higgsfield-generated bright 3D illustrations (800×600 WebP).

export interface Service {
  id: string
  title: string
  short: string
  description: string
  image: string
  imageAlt: string
  features: string[]
  stack: string[]
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Website Development',
    short: 'Fast, search-friendly websites that turn visitors into customers.',
    description:
      'Company websites, landing pages and content-managed sites built to load fast, support search discovery and be practical for your team to update. Responsive layouts, accessibility checks and measurement requirements are agreed in your project scope.',
    image: '/images/gdp/service-web-development.webp',
    imageAlt: '3D illustration of a website layout in a browser window',
    features: ['Business & company websites', 'Landing pages', 'Blog & CMS', 'SEO-ready structure', 'Analytics & Search Console setup', 'Hosting & maintenance'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'custom-software',
    title: 'Web Apps & Custom Software',
    short: 'Software built around how your business actually works.',
    description:
      'Customer portals, booking systems, dashboards, internal tools and SaaS platforms engineered to fit your processes exactly, with secure logins, roles and payments.',
    image: '/images/gdp/service-custom-software.webp',
    imageAlt: '3D illustration of code panels and a dashboard',
    features: ['SaaS platforms', 'Customer & staff portals', 'Booking & scheduling systems', 'Admin dashboards & reporting', 'Payments & subscriptions', 'Legacy system modernization'],
    stack: ['TypeScript', 'Next.js', 'Supabase / Postgres', 'Stripe'],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    short: 'iOS and Android apps your customers will keep using.',
    description:
      'Cross-platform mobile apps and progressive web apps with offline support, push notifications and app-store releases handled for you, from first prototype to launch and updates.',
    image: '/images/gdp/service-mobile.webp',
    imageAlt: '3D illustration of two smartphones showing mobile apps',
    features: ['iOS & Android apps', 'Progressive web apps', 'Push notifications', 'Offline-first features', 'App Store & Google Play releases', 'Super apps & marketplaces'],
    stack: ['React Native', 'Expo', 'PWA', 'Supabase'],
  },
  {
    id: 'ai-ml',
    title: 'AI Assistants & Chatbots',
    short: 'AI that answers your customers on your website and WhatsApp.',
    description:
      'AI chat and voice assistants built on large language models like Claude, grounded in approved business information, with supported languages, response limits and human handover agreed and tested for your workflow.',
    image: '/images/gdp/service-ai-ml.webp',
    imageAlt: '3D illustration of an AI assistant connected to chat bubbles and a phone',
    features: ['Website AI chatbots', 'WhatsApp AI assistants', 'Voice assistants', 'Local-language AI', 'Human takeover inbox', 'Claude API integration'],
    stack: ['Claude API', 'WhatsApp Business API', 'Supabase Edge Functions'],
  },
  {
    id: 'design',
    title: 'UI/UX & Product Design',
    short: 'Clear, attractive interfaces people understand at first glance.',
    description:
      'User research, wireframes, interactive prototypes and polished visual design for websites and apps, with a design system your developers can build from.',
    image: '/images/gdp/service-design.webp',
    imageAlt: '3D illustration of a design canvas with wireframes and colour swatches',
    features: ['Wireframes & prototypes', 'Visual & brand design', 'Design systems', 'Usability reviews'],
    stack: ['Figma', 'Design tokens', 'Accessibility (WCAG)'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Online Stores',
    short: 'Sell online with stores that are simple to run.',
    description:
      'Online stores and marketplaces with product catalogues, secure checkout, local and international payments, order tracking and delivery workflows.',
    image: '/images/gdp/service-ecommerce.webp',
    imageAlt: '3D illustration of an online store with a shopping bag and payment card',
    features: ['Online stores', 'Marketplaces', 'Payments & checkout', 'Orders & delivery tracking'],
    stack: ['Next.js', 'Stripe', 'Supabase'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    short: 'Reliable hosting, security and deployments.',
    description:
      'Secure cloud infrastructure designed to grow with you: databases, authentication, automated deployments, backups and production monitoring.',
    image: '/images/gdp/service-cloud.webp',
    imageAlt: '3D illustration of a cloud above secure servers',
    features: ['Serverless & edge functions', 'Databases & authentication', 'CI/CD pipelines', 'Backups & monitoring'],
    stack: ['Vercel', 'Supabase', 'Cloudflare'],
  },
  {
    id: 'integration',
    title: 'Integrations & Automation',
    short: 'Connect your tools and stop copying data by hand.',
    description:
      'Connect CRMs, payments, email, SMS and WhatsApp messaging and the systems you already use, then automate the repetitive steps between them.',
    image: '/images/gdp/service-integration.webp',
    imageAlt: '3D illustration of puzzle blocks connecting apps, SMS and chat',
    features: ['API integrations', 'SMS & WhatsApp messaging', 'Email automation', 'Workflow automation'],
    stack: ['REST & webhooks', 'Twilio', 'Resend'],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    short: 'A clear plan from paper processes to modern systems.',
    description:
      'A practical roadmap from manual processes to modern digital operations: we map how work happens today, choose the right tools, build what is missing and help your team adopt it.',
    image: '/images/gdp/service-digital-transformation.webp',
    imageAlt: '3D illustration of a paper document turning into a digital dashboard',
    features: ['Process mapping', 'Digital strategy', 'Build & rollout', 'Team training'],
    stack: ['Workshops', 'Roadmaps', 'Training'],
  },
]
