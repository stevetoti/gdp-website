'use client'

import { useState } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<'US' | 'ID'>('US')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="container-custom flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-deep-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-deep-blue font-bold text-xl leading-tight">Global Digital Prime</span>
            <span className="text-vibrant-orange text-xs font-medium tracking-wider uppercase">Enterprise Solutions</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-vibrant-orange transition-colors rounded-lg hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side: Region + CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Region Selector */}
          <div className="relative">
            <button
              onClick={() => setRegionOpen(!regionOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-deep-blue border border-gray-200 rounded-lg hover:border-deep-blue transition-colors"
            >
              <span>{selectedRegion === 'US' ? '🇺🇸' : '🇮🇩'}</span>
              <span>{selectedRegion === 'US' ? 'United States' : 'Indonesia'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {regionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                <button
                  onClick={() => { setSelectedRegion('US'); setRegionOpen(false) }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <span>🇺🇸</span><span>United States</span>
                </button>
                <button
                  onClick={() => { setSelectedRegion('ID'); setRegionOpen(false) }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <span>🇮🇩</span><span>Indonesia</span>
                </button>
              </div>
            )}
          </div>
          <Link href="/contact" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container-custom py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-vibrant-orange hover:bg-gray-50 rounded-lg font-medium"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3 px-4 pt-4 border-t border-gray-100 mt-2">
              <button
                onClick={() => setSelectedRegion('US')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${selectedRegion === 'US' ? 'bg-deep-blue text-white' : 'bg-gray-100'}`}
              >
                <span>🇺🇸</span><span>US</span>
              </button>
              <button
                onClick={() => setSelectedRegion('ID')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${selectedRegion === 'ID' ? 'bg-deep-blue text-white' : 'bg-gray-100'}`}
              >
                <span>🇮🇩</span><span>ID</span>
              </button>
            </div>
            <div className="px-4 pt-2">
              <Link href="/contact" className="btn-primary block text-center text-sm" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
