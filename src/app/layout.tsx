import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import VoiceWidget from '@/components/VoiceWidget'

export const metadata: Metadata = {
  metadataBase: new URL('https://globaldigitalprime.com'),
  title: {
    default: 'Global Digital Prime | Enterprise Digital Solutions Worldwide',
    template: '%s | Global Digital Prime',
  },
  description: 'Enterprise-grade digital transformation, AI solutions, and software development serving the United States and Indonesia. Transforming businesses through innovative technology.',
  keywords: ['enterprise software', 'digital transformation', 'AI solutions', 'cloud infrastructure', 'cybersecurity', 'data analytics', 'USA', 'Indonesia', 'software development'],
  authors: [{ name: 'Global Digital Prime' }],
  creator: 'Global Digital Prime',
  publisher: 'Global Digital Prime',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://globaldigitalprime.com',
    siteName: 'Global Digital Prime',
    title: 'Global Digital Prime | Enterprise Digital Solutions Worldwide',
    description: 'Enterprise-grade digital transformation, AI solutions, and software development serving the United States and Indonesia.',
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
    title: 'Global Digital Prime | Enterprise Digital Solutions Worldwide',
    description: 'Enterprise-grade digital transformation, AI solutions, and software development.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <ChatWidget />
        <VoiceWidget />
      </body>
    </html>
  )
}
