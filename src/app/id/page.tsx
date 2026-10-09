import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import IdHero from '@/components/id/IdHero'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import { layanan } from '@/lib/services-id'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/id',
  locale: 'id',
  siteName: 'Global Digital Prime Indonesia',
  title: 'Global Digital Prime Indonesia | Solusi Software dan AI',
  description:
    'Asisten AI untuk chat website dan WhatsApp, plus jasa pembuatan website dan aplikasi untuk bisnis di Bali dan seluruh Indonesia.',
})

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Global Digital Prime Indonesia',
  url: `${SITE_URL}/id`,
  inLanguage: 'id',
}

export default function BerandaPage() {
  return (
    <>
      <JsonLd data={websiteLd} />
      <IdHero
        eyebrow="Global Digital Prime Indonesia"
        title="Asisten AI untuk Website dan WhatsApp Bisnis Anda"
        intro="Kami membangun chatbot AI yang menjawab pelanggan Anda di website dan WhatsApp, serta website, aplikasi dan software custom untuk bisnis di Bali dan seluruh Indonesia."
        image="/images/gdp/devices-desk-bright.webp"
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/id/kontak" className="inline-flex items-center justify-center rounded-lg bg-id-red px-8 py-3 font-semibold text-white hover:bg-red-700">
            Konsultasi sekarang <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/id/layanan" className="btn-outline-dark inline-flex items-center justify-center">
            Lihat layanan
          </Link>
        </div>
      </IdHero>

      <section className="bg-white py-20">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="section-title">Chatbot WhatsApp yang menjawab pelanggan kapan saja</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Pelanggan tidak suka menunggu. Asisten AI kami membalas pertanyaan di website dan WhatsApp dalam hitungan detik,
              dalam bahasa pelanggan, dan menyerahkan percakapan ke tim Anda saat perlu sentuhan manusia.
            </p>
            <ul className="mt-6 space-y-3">
              {['Menjawab pertanyaan umum secara otomatis', 'Bahasa Indonesia dan bahasa Inggris', 'Admin bisa mengambil alih percakapan kapan saja'].map((t) => (
                <li key={t} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-id-red" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Image
            src="/images/gdp/ai-engine-bright.webp"
            alt="Ilustrasi asisten AI yang menghubungkan chat website dan WhatsApp dengan admin manusia"
            width={1400}
            height={783}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      <section className="bg-soft-gray py-20">
        <div className="container-custom">
          <h2 className="section-title text-center">Software house untuk bisnis di Bali</h2>
          <p className="section-subtitle text-center">Dari chatbot AI hingga aplikasi mobile, kami membangun solusi yang sesuai kebutuhan bisnis Anda.</p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {layanan.slice(0, 3).map((l) => (
              <Link key={l.id} href={`/id/layanan#${l.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 card-hover">
                <Image src={l.image} alt={l.imageAlt} width={800} height={600} sizes="(min-width: 1024px) 400px, 100vw" className="w-full" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-blue group-hover:text-id-red">{l.title}</h3>
                  <p className="mt-2 text-gray-600">{l.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/id/layanan" className="inline-flex items-center font-semibold text-id-red">
              Semua layanan <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
