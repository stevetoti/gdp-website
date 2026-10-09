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
  title: 'Web, Software, Mobile & AI Services | Global Digital Prime',
  description: 'Website development, custom software, iOS and Android apps, UI/UX, e-commerce, cloud and AI assistants for growing businesses.',
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
        title="Web, software, mobile and AI development services"
        intro="Website development, web apps and custom software, iOS and Android apps, UI/UX design, e-commerce, cloud and AI assistants for growing businesses, built with the same stack behind our own ten products."
        image="/images/gdp/devices-desk-bright.webp"
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
                <p className="mt-5 text-sm text-gray-500">
                  <span className="font-semibold text-deep-blue">Built with:</span> {service.stack.join(' · ')}
                </p>
              </div>
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={800}
                height={600}
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

      <section className="bg-gradient-to-br from-orange-50 via-white to-sky-50 py-20">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">See what we have built</h2>
          <p className="mt-4 text-lg text-gray-700">Ten live products, from VisaReadyPro to VanuWay, built by the same team.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="btn-primary inline-flex items-center justify-center">
              See our products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn-outline-dark inline-flex items-center justify-center">
              Work with us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
