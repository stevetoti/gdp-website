'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter,
  Github,
  ArrowRight,
  Send,
  ExternalLink
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Custom Software Development', href: '/services#custom-software' },
    { name: 'AI & Machine Learning', href: '/services#ai-ml' },
    { name: 'Cloud Architecture', href: '/services#cloud' },
    { name: 'Mobile App Development', href: '/services#mobile' },
    { name: 'Digital Transformation', href: '/services#digital-transformation' },
    { name: 'Enterprise Integration', href: '/services#integration' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Case Studies', href: '/solutions' },
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const globalNetwork = [
  { 
    flag: '🇻🇺', 
    name: 'Pacific Wave Digital', 
    location: 'Vanuatu', 
    url: 'https://pacificwavedigital.com', 
    tagline: 'Digital Innovation for the Pacific', 
    logo: '/images/logos/pwd-logo.jpg' 
  },
  { 
    flag: '🇺🇸', 
    name: 'Global Digital Prime', 
    location: 'USA', 
    url: 'https://globaldigitalprime.com', 
    tagline: 'Enterprise Digital Solutions', 
    logo: '/images/logos/gdp-logo.jpg' 
  },
  { 
    flag: '🇬🇭', 
    name: 'Rapid Entrepreneurs', 
    location: 'Ghana', 
    url: 'https://rapidentrepreneurs.com', 
    tagline: 'Empowering African Business', 
    logo: '/images/logos/rapid-logo.jpg' 
  },
  { 
    flag: '🇮🇩', 
    name: 'Global Digital Prime', 
    location: 'Indonesia', 
    url: 'https://globaldigitalprime.com', 
    tagline: 'Southeast Asia Operations', 
    logo: '/images/logos/gdp-logo.jpg' 
  },
]

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/globaldigitalprime' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/globaldigitalprime' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/globaldigitalprime' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Global Network Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Our Global Network</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A connected ecosystem of digital innovation companies spanning the Pacific, Americas, Southeast Asia, and Africa.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {globalNetwork.map((company) => (
              <motion.a
                key={`${company.name}-${company.location}`}
                variants={itemVariants}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-vibrant-orange/30"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  </motion.div>
                  <span className="text-2xl">{company.flag}</span>
                </div>
                <h4 className="font-bold text-lg mb-1 group-hover:text-vibrant-orange transition-colors">
                  {company.name}
                </h4>
                <p className="text-gray-400 text-sm mb-2">{company.location}</p>
                <p className="text-gray-500 text-xs italic">{company.tagline}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Stay Ahead of the Curve
              </h3>
              <p className="text-gray-400">
                Get insights on AI, cloud architecture, and digital transformation delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-vibrant-orange focus:ring-1 focus:ring-vibrant-orange transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-vibrant-orange text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src="/images/logos/gdp-logo.jpg"
                alt="Global Digital Prime"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div>
                <span className="font-bold text-xl text-white">Global Digital</span>
                <span className="font-bold text-xl text-vibrant-orange"> Prime</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Enterprise-grade software solutions, AI innovation, and digital transformation 
              for organizations ready to lead their industries.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-vibrant-orange hover:border-vibrant-orange transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-vibrant-orange transition-colors inline-flex items-center group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-vibrant-orange transition-colors inline-flex items-center group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-5">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-vibrant-orange transition-colors inline-flex items-center group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5">Offices</h4>
            <div className="space-y-4">
              {/* USA Office */}
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="text-xl">🇺🇸</span>
                <div>
                  <p className="font-semibold text-white">New York</p>
                  <a href="mailto:usa@globaldigitalprime.com" className="hover:text-vibrant-orange transition-colors text-xs">
                    usa@globaldigitalprime.com
                  </a>
                </div>
              </div>
              {/* Indonesia Office */}
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="text-xl">🇮🇩</span>
                <div>
                  <p className="font-semibold text-white">Jakarta</p>
                  <a href="mailto:indonesia@globaldigitalprime.com" className="hover:text-vibrant-orange transition-colors text-xs">
                    indonesia@globaldigitalprime.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <a 
                href="mailto:hello@globaldigitalprime.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-vibrant-orange transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-vibrant-orange" />
                <span>hello@globaldigitalprime.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Global Digital Prime Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-vibrant-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <span className="text-gray-600">|</span>
              <span className="text-gray-500 flex items-center gap-1">
                Part of <span className="text-vibrant-orange">Pacific Wave Digital</span> Network
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
