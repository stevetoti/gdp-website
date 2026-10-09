import type { Metadata } from 'next'
import '../globals.css'
import IdHeader from '@/components/id/IdHeader'
import IdFooter from '@/components/id/IdFooter'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, indonesia, published } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Global Digital Prime Indonesia | Solusi Software dan AI', template: '%s | Global Digital Prime Indonesia' },
  applicationName: indonesia.brand,
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
}

const legalName = published(indonesia.legalName)
const address = published(indonesia.address)
const phone = published(indonesia.phone)
const email = published(indonesia.email)

// Brief: Organization for the Indonesian entity with its exact legal name, Bali
// address and phone — each field appears only once Stephen confirms it.
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/id#organization`,
  name: indonesia.brand,
  url: `${SITE_URL}/id`,
  logo: `${SITE_URL}/images/logos/gdp-logo.jpg`,
  ...(legalName ? { legalName } : {}),
  ...(address ? { address: { '@type': 'PostalAddress', streetAddress: address, addressRegion: 'Bali', addressCountry: 'ID' } } : {}),
  ...(phone ? { telephone: phone } : {}),
  ...(email ? { email } : {}),
}

export default function IndonesiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <JsonLd data={organizationLd} />
      </head>
      <body className="min-h-screen flex flex-col">
        <IdHeader />
        <main className="flex-grow">{children}</main>
        <IdFooter />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
