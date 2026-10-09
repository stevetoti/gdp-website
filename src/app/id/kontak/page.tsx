import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import IdHero from '@/components/id/IdHero'
import ContactForm from '@/components/site/ContactForm'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { indonesia, published } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/id/kontak',
  locale: 'id',
  siteName: 'Global Digital Prime Indonesia',
  title: 'Kontak | Global Digital Prime Indonesia',
  description:
    'Hubungi Global Digital Prime Indonesia untuk konsultasi chatbot WhatsApp, asisten AI, website, atau aplikasi bisnis Anda.',
})

export default function KontakPage() {
  const address = published(indonesia.address)
  const phone = published(indonesia.phone)
  const whatsapp = published(indonesia.whatsapp)
  const email = published(indonesia.email)
  const details = [
    ...(address ? [{ icon: MapPin, label: 'Alamat', value: address, href: undefined }] : []),
    ...(phone ? [{ icon: Phone, label: 'Telepon', value: phone, href: `tel:${phone.replace(/[^+\d]/g, '')}` }] : []),
    ...(whatsapp ? [{ icon: MessageCircle, label: 'WhatsApp', value: phone ?? whatsapp, href: `https://wa.me/${whatsapp}` }] : []),
    ...(email ? [{ icon: Mail, label: 'Email', value: email, href: `mailto:${email}` }] : []),
  ]

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Beranda', path: '/id' }, { name: 'Kontak', path: '/id/kontak' }])} />
      <IdHero
        eyebrow="Kontak"
        title="Hubungi Kami"
        intro="Ceritakan kebutuhan chatbot WhatsApp, asisten AI, website atau aplikasi Anda. Kami akan membalas melalui email."
        image="/images/gdp/developer-ai-chat.webp"
      />
      <section className="bg-white py-20">
        <div className={`container-custom grid gap-14 ${details.length ? 'lg:grid-cols-[1fr_1.2fr]' : 'max-w-3xl'}`}>
          {details.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-deep-blue mb-8">Kontak langsung</h2>
              <ul className="space-y-6">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-red-50 text-id-red">
                      <d.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="text-lg font-semibold text-deep-blue hover:text-id-red">{d.value}</a>
                      ) : (
                        <p className="text-lg font-semibold text-deep-blue">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-3xl bg-soft-gray p-8 md:p-10">
            <h2 className="text-3xl font-bold text-deep-blue mb-2">Kirim pesan kepada tim kami</h2>
            <p className="text-gray-600 mb-8">Isi formulir di bawah ini dan kami akan menghubungi Anda.</p>
            <ContactForm locale="id" />
          </div>
        </div>
      </section>
    </>
  )
}
