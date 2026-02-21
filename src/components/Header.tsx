'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Services', 
    href: '/services',
    children: [
      { name: 'Website Design', href: '/services#website-design' },
      { name: 'Video Production', href: '/services#video-production' },
      { name: 'Email Marketing', href: '/services#email-marketing' },
      { name: 'SEO Strategies', href: '/services#seo' },
      { name: 'PPC Advertising', href: '/services#ppc' },
      { name: 'Social Media', href: '/services#social-media' },
    ]
  },
  { name: 'Industries', href: '/industries' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-deep-blue text-white py-2">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-vibrant-orange transition-colors">
              <Phone className="w-4 h-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:hello@globaldigitalprime.com" className="flex items-center gap-2 hover:text-vibrant-orange transition-colors">
              <Mail className="w-4 h-4" />
              <span>hello@globaldigitalprime.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header 
        className={`fixed top-0 lg:top-10 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg lg:top-0' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Global Digital Prime"
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-vibrant-orange hover:bg-soft-gray' 
                        : 'text-white hover:text-vibrant-orange hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-soft-gray hover:text-vibrant-orange transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link 
                href="/contact"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  scrolled 
                    ? 'text-gray-700 hover:text-vibrant-orange' 
                    : 'text-white hover:text-vibrant-orange'
                }`}
              >
                Contact
              </Link>
              <Link 
                href="/get-started"
                className="btn-primary inline-flex items-center group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className={`w-6 h-6 ${scrolled ? 'text-deep-blue' : 'text-white'}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <Image
                  src="/images/logo.svg"
                  alt="Global Digital Prime"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-soft-gray transition-colors"
                >
                  <X className="w-6 h-6 text-deep-blue" />
                </button>
              </div>
              
              <div className="p-6">
                {navigation.map((item) => (
                  <div key={item.name} className="mb-2">
                    <Link
                      href={item.href}
                      className="block py-3 text-lg font-medium text-deep-blue hover:text-vibrant-orange transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block py-2 text-gray-600 hover:text-vibrant-orange transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mt-8 pt-6 border-t space-y-3">
                  <Link 
                    href="/get-started"
                    className="btn-primary w-full text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    href="/contact"
                    className="btn-outline-dark w-full text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
                
                <div className="mt-8 space-y-4 text-sm text-gray-600">
                  <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-vibrant-orange">
                    <Phone className="w-4 h-4" />
                    +1 (234) 567-890
                  </a>
                  <a href="mailto:hello@globaldigitalprime.com" className="flex items-center gap-2 hover:text-vibrant-orange">
                    <Mail className="w-4 h-4" />
                    hello@globaldigitalprime.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
