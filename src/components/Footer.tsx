'use client'

import Link from 'next/link'
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

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/globaldigitalprime' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/globaldigitalprime' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/globaldigitalprime' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vibrant-orange to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
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
            <h4 className="font-bold text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-vibrant-orange" />
                <span>New York, NY<br />United States</span>
              </li>
              <li>
                <a 
                  href="mailto:hello@globaldigitalprime.com" 
                  className="flex items-center gap-3 text-gray-400 hover:text-vibrant-orange transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 text-vibrant-orange" />
                  <span>hello@globaldigitalprime.com</span>
                </a>
              </li>
            </ul>
            
            {/* Sister company badge */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-500 mb-2">Part of the</p>
              <a 
                href="https://pacificwavedigital.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-vibrant-orange transition-colors group"
              >
                <span className="font-semibold">Pacific Wave Digital</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-xs text-gray-500 mt-1">Network</p>
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
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-vibrant-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
