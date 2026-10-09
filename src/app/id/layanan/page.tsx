import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import IdHero from '@/components/id/IdHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { layanan } from '@/lib/services-id'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/id/layanan',
  locale: 'id',
  siteName: 'Global Digital Prime Indonesia',
  title: 'Layanan | Global Digital Prime Indonesia',
  description:
    'Jasa pembuatan chatbot AI WhatsApp, website, aplikasi Android dan software custom untuk bisnis di Bali. Konsultasikan kebutuhan Anda.',
})

export default function LayananPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Beranda', path: '/id' }, { name: 'Layanan', path: '/id/layanan' }])} />
      <IdHero
        eyebrow="Layanan"
        title="Layanan Pengembangan AI dan Software"
        intro="Jasa pembuatan chatbot AI, website, aplikasi dan software custom untuk bisnis yang ingin melayani pelanggan lebih cepat."
        image="/images/gdp/studio-bright.webp"
      />
      <section className="bg-white py-20">
        <div className="container-custom space-y-20">
          {layanan.map((l, i) => (
            <article id={l.id} key={l.id} className="scroll-mt-28 grid lg:grid-cols-2 gap-12 items-center">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="section-title">{l.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{l.description}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {l.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-id-red" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Image src={l.image} alt={l.imageAlt} width={800} height={600} sizes="(min-width: 1024px) 50vw, 100vw" className={`w-full rounded-3xl shadow-xl ${i % 2 === 1 ? 'lg:order-1' : ''}`} />
            </article>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">Ceritakan kebutuhan bisnis Anda</h2>
          <Link href="/id/kontak" className="mt-8 inline-flex items-center rounded-lg bg-id-red px-8 py-3 font-semibold text-white hover:bg-red-700">
            Hubungi kami <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
