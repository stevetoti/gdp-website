import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageCircle, Globe2, UserCheck, GraduationCap, Briefcase, Plane, FileWarning } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { SITE_URL, company, visaReadyPro } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

const title = 'VisaReadyPro | AI Visa Assistant on Web and WhatsApp'
const description =
  "Get visa questions answered in seconds. VisaReadyPro's AI assistant replies first and a specialist can step in."

export const metadata: Metadata = pageMetadata({ path: '/products/visareadypro', title, description })

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VisaReadyPro',
  description:
    'AI visa application assistant that answers applicants on website chat and WhatsApp, helps prepare documents and interviews, and lets a specialist take over.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: visaReadyPro.url,
  publisher: { '@id': `${SITE_URL}/#organization` },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free plan available' },
}

const audiences = [
  { icon: GraduationCap, title: 'Students', text: 'Study permits, admissions, scholarships and funding evidence.' },
  { icon: Briefcase, title: 'Workers', text: 'Work routes, sponsorship and employment evidence.' },
  { icon: Plane, title: 'Visitors', text: 'Trip purpose, finances, home ties and itinerary.' },
  { icon: FileWarning, title: 'Refused applicants', text: 'Understanding refusal reasons and the options that follow.' },
]

const steps = [
  {
    icon: MessageCircle,
    title: 'Ask on the website or WhatsApp',
    text: `Start a chat on visareadypro.com or message ${visaReadyPro.whatsappDisplay} on WhatsApp.`,
  },
  {
    icon: Globe2,
    title: 'The assistant answers, powered by Claude',
    text: 'It replies in seconds using up-to-date visa guidance, and links applicants to the official sources.',
  },
  {
    icon: UserCheck,
    title: 'A specialist steps in when needed',
    text: 'When a case needs a person, a specialist reviews the conversation and takes over.',
  },
]

export default function VisaReadyProPage() {
  return (
    <>
      <JsonLd data={softwareLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'VisaReadyPro', path: '/products/visareadypro' },
        ])}
      />
      <PageHero
        eyebrow="VisaReadyPro · Live"
        title="Visa questions answered in seconds, on web and WhatsApp."
        intro="VisaReadyPro helps applicants understand requirements, prepare documents and get answers at any hour. An AI assistant replies first, and a specialist can step into any conversation."
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a href={visaReadyPro.url} target="_blank" rel="noopener" className="btn-primary inline-flex items-center justify-center">
            Visit VisaReadyPro <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a href={visaReadyPro.whatsappLink} target="_blank" rel="noopener" className="btn-outline inline-flex items-center justify-center">
            WhatsApp {visaReadyPro.whatsappDisplay}
          </a>
        </div>
      </PageHero>

      {/* What it does */}
      <section className="bg-white py-20" aria-labelledby="what-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 id="what-heading" className="section-title">What VisaReadyPro does</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              VisaReadyPro is an AI visa application assistant. It brings research, document preparation and interview practice
              together for student, work and tourist visas, and helps applicants understand visa refusals.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Answers visa requirement questions on web chat and WhatsApp',
                'Builds purpose-specific document checklists',
                'Interview practice for visa and job interviews',
                'Optional consultations when a case needs a professional',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-vibrant-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              VisaReadyPro provides preparation support only. It does not guarantee any visa outcome.
            </p>
          </div>
          <Image
            src="/images/products/visareadypro-home.webp"
            alt="VisaReadyPro homepage: Prepare your visa application with clarity"
            width={1440}
            height={900}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-2xl shadow-2xl ring-1 ring-gray-200"
          />
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-soft-gray py-20" aria-labelledby="who-heading">
        <div className="container-custom">
          <h2 id="who-heading" className="section-title text-center">Who it is for</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <a.icon className="h-8 w-8 text-vibrant-orange" />
                <h3 className="mt-4 text-lg font-bold text-deep-blue">{a.title}</h3>
                <p className="mt-2 text-gray-600">{a.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-600">
            VisaReadyPro also includes an agency workspace for managing applicant cases, consent and team work in one place.
          </p>
        </div>
      </section>

      {/* How it works + role of Claude */}
      <section className="bg-white py-20" aria-labelledby="how-heading">
        <div className="container-custom grid lg:grid-cols-[1fr_380px] gap-14 items-start">
          <div>
            <h2 id="how-heading" className="section-title">How it works</h2>
            <ol className="mt-8 space-y-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-deep-blue text-lg font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-deep-blue">{step.title}</h3>
                    <p className="mt-1 text-gray-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 rounded-2xl bg-orange-50 p-8">
              <h2 className="text-2xl font-bold text-deep-blue">The role of Claude</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                VisaReadyPro uses Anthropic&apos;s Claude API to understand applicants&apos; questions in their own words and
                language, and to draft clear, accurate answers about visa requirements and supporting documents. The AI
                replies first; when a case needs judgement, the conversation is handed to a specialist.
              </p>
            </div>
          </div>
          <figure>
            <Image
              src="/images/products/visareadypro-chat-panel.webp"
              alt="VisaReadyPro's assistant answering: what documents do I usually need for a UK student visa?"
              width={400}
              height={620}
              sizes="380px"
              className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-200"
            />
            <figcaption className="mt-3 text-center text-sm text-gray-500">A real answer from the VisaReadyPro website assistant.</figcaption>
          </figure>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#0a1628] py-20 text-white">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold">Try VisaReadyPro</h2>
          <p className="mt-4 text-lg text-white/80">
            Ask a question on the website, message {visaReadyPro.whatsappDisplay} on WhatsApp, or contact{' '}
            {company.legalName} about the product.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href={visaReadyPro.url} target="_blank" rel="noopener" className="btn-primary inline-flex items-center justify-center">
              Open visareadypro.com
            </a>
            <a href={visaReadyPro.whatsappLink} target="_blank" rel="noopener" className="btn-outline inline-flex items-center justify-center">
              Message on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline inline-flex items-center justify-center">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
