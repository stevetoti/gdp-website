import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { indonesia, published } from '@/lib/site'

export default function IdFooter() {
  const legalName = published(indonesia.legalName)
  const address = published(indonesia.address)
  const phone = published(indonesia.phone)
  const email = published(indonesia.email)

  return (
    <footer className="bg-[#1a0f12] text-white">
      <div className="container-custom grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logos/gdp-logo.jpg" alt="Logo Global Digital Prime Indonesia" width={40} height={40} className="rounded-lg" />
            <span className="font-bold">Global Digital Prime Indonesia</span>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Chatbot AI untuk website dan WhatsApp, pembuatan website, aplikasi dan software custom untuk bisnis di Indonesia.
          </p>
        </div>
        <div>
          <h2 className="font-bold mb-4">Halaman</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/id" className="hover:text-white">Beranda</Link></li>
            <li><Link href="/id/layanan" className="hover:text-white">Layanan</Link></li>
            <li><Link href="/id/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
            <li><Link href="/id/kontak" className="hover:text-white">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-4">Kontak</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {address && (
              <li className="flex gap-2"><MapPin className="h-4 w-4 flex-none text-id-red" />{address}</li>
            )}
            {phone && (
              <li className="flex gap-2"><Phone className="h-4 w-4 flex-none text-id-red" /><a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a></li>
            )}
            {email && (
              <li className="flex gap-2"><Mail className="h-4 w-4 flex-none text-id-red" /><a href={`mailto:${email}`}>{email}</a></li>
            )}
            <li><Link href="/id/kontak" className="font-semibold text-white hover:text-red-300">Kirim pesan melalui formulir kontak</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} {legalName ?? 'Global Digital Prime Indonesia'}</p>
          <p>
            <a href="/" hrefLang="en" className="hover:text-white">Global</a>
            <span className="mx-2">/</span>
            <span className="text-white">Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
