import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { liveProducts } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

const title = 'Products | Global Digital Prime'
const description =
  'AI products by Global Digital Prime, including VisaReadyPro, an AI visa assistant for web chat and WhatsApp.'

export const metadata: Metadata = pageMetadata({ path: '/products', title, description })

const productImages: Record<string, { src: string; alt: string }> = {
  visareadypro: { src: '/images/products/visareadypro-home.webp', alt: 'VisaReadyPro homepage screenshot' },
}

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }])} />
      <PageHero
        eyebrow="Products"
        title="AI assistant products for web chat and WhatsApp"
        intro="We build AI assistants that answer customers instantly and hand conversations to a person when it matters. Each product runs on the Claude API."
      />
      <section className="bg-white py-20">
        <div className="container-custom grid gap-8 md:grid-cols-2">
          {liveProducts.map((product) => (
            <article key={product.slug} className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-100">
              <Image
                src={productImages[product.slug].src}
                alt={productImages[product.slug].alt}
                width={1440}
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full"
              />
              <div className="p-8">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-deep-blue">{product.name}</h2>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{product.status}</span>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">{product.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href={product.href} className="btn-primary inline-flex items-center">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <a href={product.externalUrl} target="_blank" rel="noopener" className="btn-outline-dark inline-flex items-center">
                    Visit {product.externalUrl.replace('https://www.', '')}
                  </a>
                </div>
              </div>
            </article>
          ))}
          <article className="flex flex-col justify-center rounded-3xl border-2 border-dashed border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-deep-blue">Need an assistant for your business?</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              We build custom AI assistants on the same foundation for other industries: answering customers on your website
              and WhatsApp, with your team in control.
            </p>
            <Link href="/services#ai-ml" className="mt-6 inline-flex items-center font-semibold text-vibrant-orange">
              See AI assistant services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}
