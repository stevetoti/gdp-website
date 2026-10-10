import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Linkedin } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { company, published, indonesia, groupCompanies } from '@/lib/site'
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
        intro={`${company.legalName} is a Delaware C-Corporation founded in December 2025 by Stephen Totimeh. We design and build websites, custom software, mobile apps and AI assistants, and we run ten of our own products, from VisaReadyPro for visa applicants to EduSmartAssist for schools and VanuWay for Vanuatu.`}
        image="/images/gdp/studio-bright.webp"
      />

      {/* Company facts */}
      <section className="bg-white py-20" aria-labelledby="facts-heading">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 id="facts-heading" className="section-title">Company facts</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a young product company. We build and run our own products, and we build websites, software, mobile apps
              and AI assistants for clients.
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

      {/* Group */}
      <section className="bg-white py-20" aria-labelledby="group-heading">
        <div className="container-custom">
          <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Our group</p>
          <h2 id="group-heading" className="section-title">Global Digital Prime and its group companies</h2>
          <p className="max-w-3xl text-lg text-gray-600 leading-relaxed">
            {company.legalName}, incorporated in Delaware, USA, is our main company and the company behind our products.
            Two other companies in our group work closely with it in their regions.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white p-6 ring-2 ring-vibrant-orange/30">
              <p className="text-sm font-semibold text-vibrant-orange">Main company · United States</p>
              <h3 className="mt-2 text-xl font-bold text-deep-blue">{company.legalName}</h3>
              <p className="mt-2 text-gray-600">Products, software, mobile and AI development. Delaware C-Corporation.</p>
            </div>
            {groupCompanies.map((g) => (
              <a
                key={g.name}
                href={g.url}
                target="_blank"
                rel="noopener"
                className="rounded-2xl bg-soft-gray p-6 ring-1 ring-gray-100 hover:ring-vibrant-orange/40 transition"
              >
                <p className="text-sm font-semibold text-gray-500">Group company · {g.country}</p>
                <h3 className="mt-2 text-xl font-bold text-deep-blue">{g.name}</h3>
                <p className="mt-2 text-gray-600">{g.focus}</p>
                <p className="mt-3 text-sm font-semibold text-vibrant-orange">{new URL(g.url).hostname} ↗</p>
              </a>
            ))}
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

      <section className="bg-gradient-to-br from-orange-50 via-white to-sky-50 py-20">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">Talk to the founder</h2>
          <p className="mt-4 text-lg text-gray-700">
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
