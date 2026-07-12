import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  metadataBase: new URL('https://globaldigitalprime.com'),
  title: {
    default: 'Global Digital Prime | Custom Software, AI & Cloud Development Company',
    template: '%s | Global Digital Prime',
  },
  description: 'Custom software development, AI & machine learning solutions, cloud architecture, and mobile apps — engineered end-to-end. US-registered (Delaware) with Asia-Pacific delivery for 24/7 global coverage.',
  keywords: ['custom software development', 'AI solutions company', 'machine learning development', 'cloud architecture services', 'mobile app development', 'digital transformation', 'enterprise software', 'AI development company USA', 'software development Indonesia', 'offshore software development'],
  authors: [{ name: 'Global Digital Prime' }],
  creator: 'Global Digital Prime',
  publisher: 'Global Digital Prime',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://globaldigitalprime.com',
    siteName: 'Global Digital Prime',
    title: 'Global Digital Prime | Custom Software, AI & Cloud Development Company',
    description: 'Custom software development, AI & machine learning solutions, cloud architecture, and mobile apps — engineered end-to-end with 24/7 US + Asia-Pacific delivery.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Global Digital Prime - Enterprise Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Digital Prime | Custom Software, AI & Cloud Development Company',
    description: 'Custom software development, AI & machine learning, cloud architecture, and mobile apps — 24/7 US + Asia-Pacific delivery.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Global Digital Prime',
  url: 'https://globaldigitalprime.com',
  logo: 'https://globaldigitalprime.com/images/logo.png',
  description: 'Enterprise-grade digital transformation, AI solutions, and software development serving the United States and Indonesia.',
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID',
    },
  ],
  sameAs: [
    'https://linkedin.com/company/globaldigitalprime',
    'https://twitter.com/globaldigitalprime',
    'https://github.com/stevetoti',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@globaldigitalprime.com',
    contactType: 'customer service',
    availableLanguage: ['English', 'Indonesian'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
