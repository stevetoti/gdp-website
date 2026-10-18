import { serviceHref } from '@/lib/service-detail'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  UserCheck,
  GraduationCap,
  Plane,
  Store,
  Languages,
  Building2,
  Send,
} from 'lucide-react'
import ScrollHero from '@/components/home/ScrollHero'
import BeforeAfter from '@/components/home/BeforeAfter'
import ProductCard from '@/components/site/ProductCard'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, company, liveProducts } from '@/lib/site'
import { services } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Global Digital Prime | Web, Software, Mobile Apps and AI',
  description:
    'Global Digital Prime builds websites, custom software, mobile apps and AI assistants powered by Claude. Delaware C-Corp, founded 2025, 10 products live.',
})

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.name,
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
}

const faqs = [
  {
    q: 'What does Global Digital Prime build?',
    a: 'We design and build websites, web apps and custom software, iOS and Android mobile apps, and AI assistants that answer customers on websites and WhatsApp. We also run our own products, including VisaReadyPro, DigiAssist AI, EduSmartAssist and VanuWay.',
  },
  {
    q: 'Can you build an AI chatbot for my website and WhatsApp?',
    a: 'Yes. We build AI assistants on large language models like Claude, grounded in approved business information. We scope supported languages, response limits and handover to your team, and test the workflow before launch.',
  },
  {
    q: 'Do you build mobile apps for iOS and Android?',
    a: 'Yes. We build cross-platform mobile apps and progressive web apps, and handle App Store and Google Play releases, push notifications and updates.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'Mostly TypeScript, Next.js and React for the web, React Native for mobile, Supabase and Postgres for data and authentication, Vercel and Cloudflare for hosting, Stripe for payments and the Claude API for AI features.',
  },
  {
    q: 'Can my assistant speak local languages?',
    a: 'Yes. Our language products already work in Bislama, Ga, Ewe and Asante Twi, and Local Language Lab builds customer-service assistants with native local voices.',
  },
  {
    q: 'How do we start a project?',
    a: `Call ${company.phone.display}, email ${company.email} or send the contact form. Tell us what you need and the founder will reply with next steps.`,
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const facts = [
  { label: 'Founded', value: '2025' },
  { label: 'Incorporated', value: 'Delaware C-Corp' },
  { label: 'Products live', value: String(liveProducts.length) },
  { label: 'We build', value: 'Web · Mobile · AI' },
]

const aiSteps = [
  { icon: MessageSquare, title: 'Understands the question', text: 'Customers write the way they talk, in their own language, on your website or WhatsApp.' },
  { icon: Sparkles, title: 'Drafts a supported reply', text: 'The assistant uses approved business information, with limits and review paths for uncertain answers.' },
  { icon: UserCheck, title: 'Hands over to a person', text: 'When a case needs judgement, your team takes over the same conversation.' },
]

const process = [
  { title: 'Discover', text: 'A short call to understand your customers, your goals and what slows your team down.' },
  { title: 'Design', text: 'Wireframes and clickable prototypes so you see the product before we build it.' },
  { title: 'Build', text: 'Short iterations with working software you can try every step of the way.' },
  { title: 'Launch & grow', text: 'We deploy, monitor and keep improving based on real usage.' },
]

const stack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'React Native', 'Supabase', 'Postgres', 'Vercel', 'Cloudflare', 'Stripe', 'Claude API', 'WhatsApp Business API', 'Twilio']

const sectors = [
  { icon: GraduationCap, title: 'Education', text: 'School management, learning and family apps.', example: 'EduSmartAssist' },
  { icon: Plane, title: 'Travel & immigration', text: 'Visa preparation, bookings and tourism.', example: 'VisaReadyPro, VanuWay' },
  { icon: Store, title: 'Small business', text: 'Websites, stores, CRM and automation.', example: 'DigiAssist AI' },
  { icon: Languages, title: 'Local languages', text: 'AI that speaks Bislama, Ga, Ewe and Twi.', example: 'Storian, Onukpa, Sena, Akwaaba' },
  { icon: Send, title: 'Messaging', text: 'Bulk SMS, WhatsApp and notifications.', example: 'Vanu Connect' },
  { icon: Building2, title: 'Service businesses', text: 'AI customer service on web and WhatsApp.', example: 'Local Language Lab' },
]

export default function HomePage() {
  const [featured, ...others] = liveProducts

  return (
    <>
      <JsonLd data={websiteLd} />
      <JsonLd data={faqLd} />
      <ScrollHero />

      {/* Facts */}
      <section className="bg-white border-b border-gray-100" aria-label="Company facts">
        <div className="container-custom py-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm uppercase tracking-wider text-gray-500">{fact.label}</dt>
                <dd className="mt-1 text-xl md:text-2xl font-bold text-deep-blue">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-white to-sky-50 py-24" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="max-w-3xl mb-14">
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">What we do</p>
            <h2 id="services-heading" className="section-title">Web development, software, mobile apps and AI</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              One team for the whole product: we design it, build it, launch it and keep it running. Whether you need a
              website that brings in customers, software that runs your operations, an app for your customers&apos; phones
              or an AI assistant that answers them, we build it with the same stack we use for our own products.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={serviceHref(service.id)}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 card-hover"
              >
                <Image src={service.image} alt={service.imageAlt} width={800} height={600} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-deep-blue group-hover:text-vibrant-orange transition-colors">{service.title}</h3>
                  <p className="mt-2 text-gray-600">{service.short}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-vibrant-orange" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-5 inline-flex items-center text-sm font-semibold text-vibrant-orange">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-white py-24" aria-labelledby="products-heading">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Our products</p>
              <h2 id="products-heading" className="section-title">{liveProducts.length} products we built and run</h2>
              <p className="text-lg text-gray-600">
                Business platforms, school software, a super app, messaging and AI assistants in local languages, live today
                across the Pacific, Africa and beyond.
              </p>
            </div>
            <Link href="/products" className="inline-flex items-center font-semibold text-vibrant-orange">
              All products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Featured: VisaReadyPro */}
          <div className="grid lg:grid-cols-2 gap-10 items-center rounded-3xl bg-gradient-to-br from-sky-50 via-white to-orange-50 p-6 md:p-10 ring-1 ring-gray-100 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden /> Flagship · {featured.status}
              </span>
              <h3 className="mt-4 text-3xl md:text-4xl font-bold text-deep-blue">{featured.name}</h3>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">{featured.tagline}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-gray-700">
                {featured.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-vibrant-orange" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={featured.href} className="btn-primary inline-flex items-center">
                  Explore {featured.name} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a href={featured.externalUrl} target="_blank" rel="noopener" className="btn-outline-dark inline-flex items-center">
                  Visit visareadypro.com
                </a>
              </div>
            </div>
            <Image
              src="/images/products/visareadypro-home.webp"
              alt="VisaReadyPro homepage: Prepare your visa application with clarity"
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="rounded-2xl shadow-2xl ring-1 ring-gray-200"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* AI band */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-sky-50 py-24" aria-labelledby="ai-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Built on Claude</p>
            <h2 id="ai-heading" className="section-title">How our AI customer service assistants work</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our AI products use Anthropic&apos;s Claude API to understand questions, draft accurate replies and hand
              conversations to a person when needed. In VisaReadyPro, Claude answers applicants&apos; visa questions on the
              website and on WhatsApp, and a specialist can take over any conversation.
            </p>
            <div className="mt-10 space-y-6">
              {aiSteps.map((step) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white text-vibrant-orange shadow-sm ring-1 ring-orange-100">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-deep-blue">{step.title}</h3>
                    <p className="text-gray-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Image
            src="/images/gdp/ai-engine-bright.webp"
            alt="Illustration: an AI engine connecting website chat and WhatsApp conversations, with hand-off to a person"
            width={1400}
            height={783}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-white py-24" aria-labelledby="before-after-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <BeforeAfter />
          <div>
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Before and after</p>
            <h2 id="before-after-heading" className="section-title">From missed messages to answered customers</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Without an assistant, questions wait until someone is free, and some customers never get a reply. With an AI
              chatbot on your website and a WhatsApp AI assistant, routine questions can receive an automated response, while your team
              handles exceptions and reviews the information the assistant uses.
            </p>
            <Link href="/contact" className="btn-secondary mt-8 inline-flex items-center">
              Talk to us about your business <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-sky-50 py-24" aria-labelledby="sectors-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Who we build for</p>
            <h2 id="sectors-heading" className="section-title">Software for the way your sector works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <s.icon className="h-8 w-8 text-vibrant-orange" />
                <h3 className="mt-4 text-xl font-bold text-deep-blue">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.text}</p>
                <p className="mt-3 text-sm font-medium text-deep-blue/70">Our products: {s.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process + stack */}
      <section className="bg-white py-24" aria-labelledby="process-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14">
            <div>
              <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">How we work</p>
              <h2 id="process-heading" className="section-title">From idea to launch, without surprises</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                You talk directly with the people building your product. You see progress early, and you own the code and
                data when we are done.
              </p>
              <h3 className="mt-10 font-bold text-deep-blue">Technology we use</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li key={t} className="rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-deep-blue ring-1 ring-sky-100">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <ol className="grid sm:grid-cols-2 gap-6">
              {process.map((step, i) => (
                <li key={step.title} className="rounded-2xl bg-gradient-to-br from-orange-50 to-white p-6 ring-1 ring-orange-100">
                  <span className="text-sm font-bold text-vibrant-orange">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-bold text-deep-blue">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft-gray py-24" aria-labelledby="faq-heading">
        <div className="container-custom max-w-4xl">
          <h2 id="faq-heading" className="section-title text-center">Frequently asked questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-deep-blue">
                  {f.q}
                  <span className="text-2xl text-vibrant-orange transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-sky-50 py-24">
        <Image src="/images/gdp/devices-3d-bright.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
        <div className="relative container-custom max-w-3xl mr-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-deep-blue">Have a website, app or AI project in mind?</h2>
          <p className="mt-4 text-lg text-gray-700">
            Tell us about it. Call {company.phone.display} or send a message and the founder will reply.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
              Work with us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/products" className="btn-outline-dark inline-flex items-center justify-center">
              See our products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
