'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const nav = [
  { name: 'Beranda', href: '/id' },
  { name: 'Layanan', href: '/id/layanan' },
  { name: 'Tentang Kami', href: '/id/tentang-kami' },
  { name: 'Kontak', href: '/id/kontak' },
]

export default function IdHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
      <nav className="container-custom flex h-20 items-center justify-between" aria-label="Navigasi utama">
        <Link href="/id" className="flex items-center gap-3">
          <Image src="/images/logos/gdp-logo.jpg" alt="Logo Global Digital Prime Indonesia" width={40} height={40} className="rounded-lg" />
          <span className="leading-tight">
            <span className="block font-bold text-deep-blue">Global Digital Prime</span>
            <span className="inline-block rounded bg-id-red px-1.5 text-[11px] font-bold uppercase tracking-wider text-white">Indonesia</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-red-50 hover:text-id-red">
              {item.name}
            </Link>
          ))}
          <Link href="/id/kontak" className="ml-4 rounded-lg bg-id-red px-5 py-2.5 font-semibold text-white hover:bg-red-700">
            Konsultasi
          </Link>
        </div>
        <button type="button" className="lg:hidden p-2" aria-label="Buka menu" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6 text-deep-blue" />
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="mb-6 p-2" aria-label="Tutup menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-deep-blue" />
            </button>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium text-deep-blue">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
