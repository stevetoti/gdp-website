import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import ProductCard from '@/components/site/ProductCard'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { SITE_URL, liveProducts } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

const title = 'Products | Global Digital Prime'
const description =
  'VisaReadyPro, DigiAssist AI, EduSmartAssist, VanuWay, Vanu Connect and AI assistants in local languages, built by Global Digital Prime.'

export const metadata: Metadata = pageMetadata({ path: '/products', title, description })

const productsLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Digital Prime products',
  itemListElement: liveProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: p.externalUrl,
      image: `${SITE_URL}${p.image}`,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  })),
}

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }])} />
      <JsonLd data={productsLd} />
      <PageHero
        eyebrow={`Products · ${liveProducts.length} live`}
        title="Products we built and run"
        intro="From an AI visa assistant to a school platform, a super app for Vanuatu and AI assistants that speak Bislama, Ga, Ewe and Twi: these are the products Global Digital Prime has shipped and runs today."
      />
      <section className="bg-white py-20">
        <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {liveProducts.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 3} />
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-br from-orange-50 via-white to-sky-50 py-20">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">Want something like this for your business?</h2>
          <p className="mt-4 text-lg text-gray-700">
            We build websites, software, mobile apps and AI assistants for clients on the same foundation as our own products.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services" className="btn-primary inline-flex items-center justify-center">
              See our services <ArrowRight className="ml-2 h-5 w-5" />
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
