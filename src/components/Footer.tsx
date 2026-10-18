import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, ArrowRight, Linkedin, Github, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { company, groupCompanies, liveProducts, published, socialLinks } from '@/lib/site'

const footerLinks = {
  products: [{ name: 'All products', href: '/products' }, ...liveProducts.slice(0, 6).map((p) => ({ name: p.name, href: p.href.startsWith('/') ? p.href : `/products#${p.slug}` }))],
  services: [
    { name: 'Website Development', href: '/services/web-development' },
    { name: 'Web Apps & Custom Software', href: '/services/custom-software-development' },
    { name: 'Mobile App Development', href: '/services/mobile-app-development' },
    { name: 'AI Assistants & Chatbots', href: '/services/ai-chatbot-development' },
    { name: 'UI/UX & Product Design', href: '/services#design' },
    { name: 'Cloud & DevOps', href: '/services#cloud' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialIcons: Record<string, LucideIcon> = { LinkedIn: Linkedin, X: Twitter, GitHub: Github }

function LinkColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-5">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
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
  )
}

export default function Footer() {
  const socials = socialLinks()
  const generalEmail = published(company.generalEmail)

  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image src="/images/logos/gdp-logo.jpg" alt="Global Digital Prime logo" width={44} height={44} className="rounded-lg" />
              <div>
                <span className="font-bold text-xl text-white">Global Digital</span>
                <span className="font-bold text-xl text-vibrant-orange"> Prime</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              We design and build websites, custom software, mobile apps and AI assistants, and run ten of our own
              products, from VisaReadyPro to VanuWay.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${company.phone.tel}`} className="flex items-center gap-2 text-gray-300 hover:text-vibrant-orange transition-colors">
                <Phone className="w-4 h-4 text-vibrant-orange" />
                {company.phone.display}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-gray-300 hover:text-vibrant-orange transition-colors">
                <Mail className="w-4 h-4 text-vibrant-orange" />
                {company.email}
              </a>
              {generalEmail && (
                <a href={`mailto:${generalEmail}`} className="flex items-center gap-2 text-gray-300 hover:text-vibrant-orange transition-colors">
                  <Mail className="w-4 h-4 text-vibrant-orange" />
                  {generalEmail}
                </a>
              )}
            </div>
            {socials.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socials.map((social) => {
                  const Icon = socialIcons[social.name]
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Global Digital Prime on ${social.name}`}
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-vibrant-orange hover:border-vibrant-orange transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <LinkColumn title="Products" links={footerLinks.products} />
          <LinkColumn title="Services" links={footerLinks.services} />
          <LinkColumn title="Company" links={footerLinks.company} />

          <div>
            <h2 className="font-bold text-lg mb-5">Group</h2>
            <ul className="space-y-3 text-sm mb-8">
              {groupCompanies.map((g) => (
                <li key={g.name}>
                  <a href={g.url} target="_blank" rel="noopener" className="text-gray-400 hover:text-vibrant-orange transition-colors">
                    {g.name} <span className="text-gray-600">· {g.country}</span>
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="font-bold text-lg mb-5">Region</h2>
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">Global</span>
              <span className="mx-2 text-gray-600">/</span>
              <a href="/id" hrefLang="id" className="hover:text-vibrant-orange transition-colors">
                Indonesia
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {company.legalName} · {company.entityType} · Founded 2025
            </p>
            <div className="flex items-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-500 hover:text-vibrant-orange transition-colors">
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
