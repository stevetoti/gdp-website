import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageSquare, Code2, Users } from 'lucide-react'
import IdHero from '@/components/id/IdHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { indonesia, published } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/id/tentang-kami',
  locale: 'id',
  siteName: 'Global Digital Prime Indonesia',
  title: 'Tentang Kami | Global Digital Prime Indonesia',
  description:
    'Kenali Global Digital Prime Indonesia: pengembang asisten AI dan software untuk bisnis di Indonesia, dari chatbot WhatsApp hingga aplikasi custom.',
})

const alasan = [
  { icon: MessageSquare, title: 'Fokus pada percakapan pelanggan', text: 'Kami membangun asisten AI yang menjawab pelanggan di website dan WhatsApp, dengan admin manusia tetap memegang kendali.' },
  { icon: Code2, title: 'Dibangun dari awal hingga peluncuran', text: 'Desain, pengembangan, peluncuran dan perawatan ditangani oleh satu tim.' },
  { icon: Users, title: 'Komunikasi yang jelas', text: 'Kami bekerja dalam Bahasa Indonesia dan bahasa Inggris, dengan progres yang bisa Anda lihat sejak awal.' },
]

export default function TentangKamiPage() {
  const legalName = published(indonesia.legalName)
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Beranda', path: '/id' }, { name: 'Tentang Kami', path: '/id/tentang-kami' }])} />
      <IdHero
        eyebrow="Tentang Kami"
        title="Tentang Global Digital Prime Indonesia"
        intro={`${legalName ?? 'Global Digital Prime Indonesia'} membantu bisnis di Indonesia melayani pelanggan lebih cepat dengan asisten AI, website, aplikasi dan software custom.`}
        image="/images/gdp/studio-bright.webp"
      />
      <section className="bg-white py-20">
        <div className="container-custom">
          <h2 className="section-title">Tim pengembang AI dan software untuk bisnis Indonesia</h2>
          <p className="max-w-3xl text-lg text-gray-600 leading-relaxed">
            Kami membuat chatbot WhatsApp dan chat website bertenaga AI, serta website dan aplikasi untuk bisnis yang sedang
            berkembang. Setiap proyek dimulai dari cara pelanggan Anda menghubungi bisnis Anda hari ini.
          </p>
          <h2 className="section-title mt-16">Mengapa memilih kami</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {alasan.map((a) => (
              <div key={a.title} className="rounded-2xl bg-soft-gray p-6">
                <a.icon className="h-8 w-8 text-id-red" />
                <h3 className="mt-4 text-xl font-bold text-deep-blue">{a.title}</h3>
                <p className="mt-2 text-gray-600">{a.text}</p>
              </div>
            ))}
          </div>
          <Link href="/id/kontak" className="mt-12 inline-flex items-center font-semibold text-id-red">
            Hubungi kami <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
