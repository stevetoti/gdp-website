import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Linkedin } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { company, published, indonesia } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About Global Digital Prime, Inc. | Founded 2025',
  description: 'Global Digital Prime, Inc. is a Delaware C-Corporation founded in 2025 by Stephen Totimeh.',
})

export default function AboutPage() {
  const linkedin = published(company.founder.linkedin)
  const fileNumber = published(company.delawareFileNumber)
  const indonesianEntity = published(indonesia.legalName)

  const facts: { label: string; value: string }[] = [
    { label: 'Legal name', value: company.legalName },
    { label: 'Entity type', value: company.entityType },
    { label: 'Incorporated', value: company.foundedLabel },
    { label: 'Founder and CEO', value: company.founder.name },
    ...(fileNumber ? [{ label: 'Delaware file number', value: fileNumber }] : []),
    { label: 'Phone', value: company.phone.display },
    { label: 'Email', value: company.email },
  ]

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageHero
        eyebrow="About"
        title="About Global Digital Prime"
        intro={`${company.legalName} is a Delaware C-Corporation founded in December 2025 by Stephen Totimeh. We build AI assistants that help businesses answer customers instantly, starting with VisaReadyPro for visa applicants. Our products run on the Claude API and work across website chat and WhatsApp.`}
        image="/images/gdp/software-studio.webp"
      />

      {/* Company facts */}
      <section className="bg-white py-20" aria-labelledby="facts-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 id="facts-heading" className="section-title">Company facts</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a young product company. We build and run our own AI products, and we also build custom AI assistants and
              software for clients.
            </p>
            <Link href="/products" className="mt-6 inline-flex items-center font-semibold text-vibrant-orange">
              See our products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <dl className="divide-y divide-gray-100 rounded-2xl bg-soft-gray p-2 ring-1 ring-gray-100">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[150px_1fr] gap-4 px-5 py-4 sm:grid-cols-[200px_1fr]">
                <dt className="text-sm font-medium text-gray-500">{fact.label}</dt>
                <dd className="font-semibold text-deep-blue break-words">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-soft-gray py-20" aria-labelledby="founder-heading">
        <div className="container-custom grid md:grid-cols-[320px_1fr] gap-12 items-center">
          <Image
            src={company.founder.photo}
            alt="Stephen Totimeh, Founder and CEO of Global Digital Prime"
            width={799}
            height={800}
            sizes="320px"
            className="w-full max-w-xs mx-auto rounded-3xl shadow-xl"
          />
          <div>
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Founder</p>
            <h2 id="founder-heading" className="section-title">Stephen Totimeh</h2>
            <p className="text-lg font-medium text-gray-500">{company.founder.role}</p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Stephen Totimeh is the founder and CEO of Global Digital Prime. He has built software and AI automation for
              clients across the Pacific, West Africa and Southeast Asia.
            </p>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-deep-blue hover:text-vibrant-orange"
              >
                <Linkedin className="h-5 w-5" /> Stephen on LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Related entity (brief: mention Indonesia once, neutrally) */}
      {indonesianEntity && (
        <section className="bg-white py-12">
          <div className="container-custom">
            <p className="text-gray-600">
              Related company: {indonesianEntity} serves clients in Indonesia.{' '}
              <a href="/id" hrefLang="id" className="font-semibold text-deep-blue hover:text-vibrant-orange">
                Visit the Indonesian site
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <section className="bg-[#0a1628] py-20 text-white">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold">Talk to the founder</h2>
          <p className="mt-4 text-lg text-white/80">
            Call {company.phone.display} or email {company.email}.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex items-center">
            Contact us <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
