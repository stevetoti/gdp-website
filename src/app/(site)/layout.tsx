import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, company, published, socialLinks } from '@/lib/site'

const title = 'Global Digital Prime | Web, Software, Mobile Apps and AI'
const description =
  'Global Digital Prime builds websites, custom software, mobile apps and AI assistants powered by Claude. Delaware C-Corp, founded 2025, 10 products live.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s | Global Digital Prime' },
  description,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: company.name,
    title,
    description,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Global Digital Prime' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/og-image.jpg'] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
}

const address = published(company.usAddress)
const generalEmail = published(company.generalEmail)

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/gdp-logo.jpg`,
  foundingDate: company.foundingDate,
  founder: { '@type': 'Person', name: company.founder.name, jobTitle: company.founder.role },
  telephone: company.phone.tel,
  email: company.email,
  description:
    'Global Digital Prime, Inc. builds websites, custom software, mobile apps and AI assistants powered by Claude, and runs products including VisaReadyPro, DigiAssist AI, EduSmartAssist and VanuWay.',
  ...(address ? { address: { '@type': 'PostalAddress', streetAddress: address, addressCountry: 'US' } } : {}),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: company.phone.tel,
      email: generalEmail ?? company.email,
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  ],
  ...(socialLinks().length ? { sameAs: socialLinks().map((s) => s.href) } : {}),
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <JsonLd data={organizationLd} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
