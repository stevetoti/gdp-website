import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageSquare, Smartphone, UserCheck, CheckCircle2 } from 'lucide-react'
import ScrollHero from '@/components/home/ScrollHero'
import BeforeAfter from '@/components/home/BeforeAfter'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, company, liveProducts } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'
import { services } from '@/lib/services'

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Global Digital Prime | AI Assistants for Web and WhatsApp',
  description:
    'Global Digital Prime builds AI assistants powered by Claude that answer customers on websites and WhatsApp. Delaware C-Corp, founded 2025.',
})

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.name,
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
}

const facts = [
  { label: 'Founded', value: '2025' },
  { label: 'Incorporated', value: 'Delaware C-Corp' },
  { label: 'Products live', value: String(liveProducts.length) },
  { label: 'Channels', value: 'Web chat + WhatsApp' },
]

const claudeSteps = [
  { icon: MessageSquare, title: 'Understands the question', text: 'Customers write the way they talk, in any language, on your website or WhatsApp.' },
  { icon: Smartphone, title: 'Drafts an accurate reply', text: 'Claude answers from your own guidance and knowledge, in seconds, at any hour.' },
  { icon: UserCheck, title: 'Hands over to a person', text: 'When a case needs judgement, your team takes over the same conversation.' },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteLd} />
      <ScrollHero />

      {/* Products band */}
      <section className="relative bg-[#0a1628] pb-24 pt-8 text-white" aria-labelledby="products-heading">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Our products</p>
              <h2 id="products-heading" className="text-3xl md:text-5xl font-bold">
                AI assistants for website chat and WhatsApp
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center text-white/80 hover:text-vibrant-orange font-semibold">
              All products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {liveProducts.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="group grid lg:grid-cols-2 gap-10 items-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10 hover:border-vibrant-orange/50 transition-colors"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  {product.status}
                </span>
                <h3 className="mt-4 text-3xl md:text-4xl font-bold group-hover:text-vibrant-orange transition-colors">{product.name}</h3>
                <p className="mt-4 text-lg text-white/75 leading-relaxed">{product.tagline}</p>
                <ul className="mt-6 space-y-2 text-white/80">
                  {['Answers visa questions on web chat and WhatsApp', 'Helps applicants prepare documents and interviews', 'A specialist can step into any conversation'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-vibrant-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center font-semibold text-vibrant-orange">
                  Explore {product.name} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative">
                <Image
                  src="/images/products/visareadypro-home.webp"
                  alt="VisaReadyPro homepage: Prepare your visa application with clarity"
                  width={1440}
                  height={900}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="rounded-2xl shadow-2xl ring-1 ring-white/10"
                />
                <Image
                  src="/images/products/visareadypro-chat-panel.webp"
                  alt="VisaReadyPro assistant answering a question about UK student visa documents"
                  width={400}
                  height={620}
                  sizes="200px"
                  className="absolute -bottom-8 -right-2 md:-right-6 w-36 md:w-48 rounded-2xl shadow-2xl ring-1 ring-white/20"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Built on Claude band */}
      <section className="bg-white py-24" aria-labelledby="claude-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Built on Claude</p>
            <h2 id="claude-heading" className="section-title">How our AI customer service assistants work</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our products use Anthropic&apos;s Claude API to understand questions, draft accurate replies and hand
              conversations to a person when needed. In VisaReadyPro, Claude answers applicants&apos; visa questions on the
              website and on WhatsApp, and a specialist can take over any conversation.
            </p>
            <div className="mt-10 space-y-6">
              {claudeSteps.map((step) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-orange-50 text-vibrant-orange">
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
            src="/images/gdp/ai-conversation-engine.webp"
            alt="Illustration: an AI engine connecting website chat and WhatsApp conversations, with hand-off to a person"
            width={1400}
            height={783}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* True facts band */}
      <section className="bg-soft-gray border-y border-gray-100" aria-label="Company facts">
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

      {/* Before / after */}
      <section className="bg-white py-24" aria-labelledby="before-after-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <BeforeAfter />
          <div>
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Before and after</p>
            <h2 id="before-after-heading" className="section-title">From missed messages to answered customers</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Without an assistant, questions wait until someone is free, and some customers never get a reply. With an AI
              chatbot on your website and a WhatsApp AI assistant, every message gets an answer straight away, and your team
              only steps in where a person adds value.
            </p>
            <Link href="/contact" className="btn-secondary mt-8 inline-flex items-center">
              Talk to us about your business <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-soft-gray py-24" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Services</p>
            <h2 id="services-heading" className="section-title">We also build custom AI and software for clients</h2>
            <p className="section-subtitle">The same team that builds our products designs and ships custom systems for growing businesses.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 card-hover"
              >
                <Image src={service.image} alt={service.imageAlt} width={800} height={603} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="w-full" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-blue group-hover:text-vibrant-orange transition-colors">{service.title}</h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a1628] py-24 text-white">
        <Image src="/images/gdp/ai-assistant-globe.webp" alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        <div className="relative container-custom max-w-3xl mr-auto">
          <h2 className="text-3xl md:text-5xl font-bold">Want an AI assistant that answers your customers?</h2>
          <p className="mt-4 text-lg text-white/80">
            Tell us about your business. Call {company.phone.display} or send a message and the founder will reply.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
              Work with us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/products" className="btn-outline inline-flex items-center justify-center">
              See our products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
