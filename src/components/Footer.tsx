'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Send
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Website Design', href: '/services#website-design' },
    { name: 'Video Production', href: '/services#video-production' },
    { name: 'Email Marketing', href: '/services#email-marketing' },
    { name: 'SEO Strategies', href: '/services#seo' },
    { name: 'PPC Advertising', href: '/services#ppc' },
    { name: 'Social Media', href: '/services#social-media' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  industries: [
    { name: 'E-Commerce', href: '/industries#ecommerce' },
    { name: 'Healthcare', href: '/industries#healthcare' },
    { name: 'Real Estate', href: '/industries#real-estate' },
    { name: 'Education', href: '/industries#education' },
    { name: 'Technology', href: '/industries#technology' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/globaldigitalprime' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/globaldigitalprime' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/globaldigitalprime' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/globaldigitalprime' },
]

export default function Footer() {
  return (
    <footer className="bg-deep-blue text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest insights on digital marketing delivered straight to your inbox.
              </p>
            </div>
            <form className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-vibrant-orange transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-2"
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
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-white.svg"
                alt="Global Digital Prime"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              We are dedicated to helping businesses unlock their full potential in the digital world. 
              Business Growth Is What We Do.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-vibrant-orange transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-vibrant-orange transition-colors inline-flex items-center group"
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
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-vibrant-orange transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-bold text-lg mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-vibrant-orange transition-colors inline-flex items-center group"
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
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-vibrant-orange" />
                <span>New York, USA</span>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-3 text-gray-400 hover:text-vibrant-orange transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 text-vibrant-orange" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@globaldigitalprime.com" 
                  className="flex items-center gap-3 text-gray-400 hover:text-vibrant-orange transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 text-vibrant-orange" />
                  <span>hello@globaldigitalprime.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Global Digital Prime Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-vibrant-orange transition-colors"
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
