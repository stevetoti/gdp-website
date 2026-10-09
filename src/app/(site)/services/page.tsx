import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import { services } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/services',
  title: 'AI and Software Development Services | Global Digital Prime',
  description: 'Custom AI assistants, software, cloud and mobile development for growing businesses.',
})

const servicesLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.description,
      url: `${SITE_URL}/services#${s.id}`,
      provider: { '@id': `${SITE_URL}/#organization` },
    },
  })),
}

const process = [
  { title: 'Discover', text: 'We learn how your customers reach you today and what slows your team down.' },
  { title: 'Build', text: 'We build in short iterations, so you see working software early.' },
  { title: 'Launch', text: 'We deploy, monitor and hand over, with your team in control.' },
  { title: 'Improve', text: 'We review real conversations and usage, then refine.' },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <JsonLd data={servicesLd} />
      <PageHero
        eyebrow="Services"
        title="AI and software development services"
        intro="We build AI assistants for website chat and WhatsApp, custom software, cloud systems and mobile apps for growing businesses, using the same stack we use for our own products."
        image="/images/gdp/developer-ai-chat.webp"
      />

      <section className="bg-white py-20">
        <div className="container-custom space-y-20">
          {services.map((service, index) => (
            <article id={service.id} key={service.id} className="scroll-mt-28 grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="section-title">{service.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-vibrant-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={800}
                height={603}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`w-full rounded-3xl shadow-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-soft-gray py-20" aria-labelledby="process-heading">
        <div className="container-custom">
          <h2 id="process-heading" className="section-title text-center">How we work</h2>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <span className="text-sm font-bold text-vibrant-orange">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold text-deep-blue">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#0a1628] py-20 text-white">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold">See what we have built</h2>
          <p className="mt-4 text-lg text-white/80">VisaReadyPro is our own AI assistant, live on web chat and WhatsApp.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products/visareadypro" className="btn-primary inline-flex items-center justify-center">
              See VisaReadyPro <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn-outline inline-flex items-center justify-center">
              Work with us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
