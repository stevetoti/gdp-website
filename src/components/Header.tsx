'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, Code2, Brain, Cloud, Smartphone, Rocket, Cog } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Services', 
    href: '/services',
    children: [
      { name: 'Custom Software Development', href: '/services#custom-software', icon: Code2 },
      { name: 'AI & Machine Learning', href: '/services#ai-ml', icon: Brain },
      { name: 'Cloud Architecture', href: '/services#cloud', icon: Cloud },
      { name: 'Mobile App Development', href: '/services#mobile', icon: Smartphone },
      { name: 'Digital Transformation', href: '/services#digital-transformation', icon: Rocket },
      { name: 'Enterprise Integration', href: '/services#integration', icon: Cog },
    ]
  },
  { name: 'Solutions', href: '/solutions' },
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
      {/* Main header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5' 
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
                className="flex items-center gap-3"
              >
                {/* Logo icon - actual logo image */}
                <Image
                  src="/images/logos/gdp-logo.jpg"
                  alt="Global Digital Prime"
                  width={44}
                  height={44}
                  className="rounded-lg"
                />
                <div className={`hidden sm:block ${scrolled ? 'text-deep-blue' : 'text-white'}`}>
                  <span className="font-bold text-xl">Global Digital</span>
                  <span className="font-bold text-xl text-vibrant-orange"> Prime</span>
                </div>
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-vibrant-orange hover:bg-orange-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                  
                  {/* Mega dropdown menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-vibrant-orange rounded-xl transition-all group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-vibrant-orange/10 flex items-center justify-center transition-colors">
                              <child.icon className="w-5 h-5 text-gray-500 group-hover:text-vibrant-orange transition-colors" />
                            </div>
                            <span className="font-medium">{child.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link 
                href="/get-started"
                className="group relative overflow-hidden bg-vibrant-orange text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-vibrant-orange/30"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logos/gdp-logo.jpg"
                    alt="Global Digital Prime"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="font-bold text-deep-blue">GDP</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-2 py-2 text-gray-600 hover:text-vibrant-orange transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <child.icon className="w-4 h-4" />
                            <span className="text-sm">{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <Link 
                    href="/get-started"
                    className="btn-primary w-full text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/contact"
                    className="btn-outline-dark w-full text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
