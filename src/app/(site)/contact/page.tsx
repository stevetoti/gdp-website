import type { Metadata } from 'next'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import ContactForm from '@/components/site/ContactForm'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { company, published, visaReadyPro } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/contact',
  title: 'Contact Global Digital Prime',
  description: 'Call +1 959 949 1242 or email steve@globaldigitalprime.com.',
})

export default function ContactPage() {
  const generalEmail = published(company.generalEmail)
  const address = published(company.usAddress)

  const methods = [
    { icon: Phone, label: 'Phone', value: company.phone.display, href: `tel:${company.phone.tel}` },
    { icon: Mail, label: 'Founder and CEO', value: company.email, href: `mailto:${company.email}` },
    ...(generalEmail ? [{ icon: Mail, label: 'General enquiries', value: generalEmail, href: `mailto:${generalEmail}` }] : []),
    ...(address ? [{ icon: MapPin, label: 'US address', value: address, href: undefined }] : []),
    {
      icon: MessageCircle,
      label: 'VisaReadyPro on WhatsApp',
      value: visaReadyPro.whatsappDisplay,
      href: visaReadyPro.whatsappLink,
    },
  ]

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <PageHero
        eyebrow="Contact"
        title="Contact Global Digital Prime"
        intro="Want an AI assistant for your website or WhatsApp, or a question about VisaReadyPro? Call, email or send the form and the founder will reply."
      />
      <section className="bg-white py-20">
        <div className="container-custom grid lg:grid-cols-[1fr_1.2fr] gap-14">
          <div>
            <h2 className="text-3xl font-bold text-deep-blue mb-8">Reach us directly</h2>
            <ul className="space-y-6">
              {methods.map((m) => (
                <li key={m.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-orange-50 text-vibrant-orange">
                    <m.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{m.label}</p>
                    {m.href ? (
                      <a
                        href={m.href}
                        {...(m.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                        className="text-lg font-semibold text-deep-blue hover:text-vibrant-orange break-words"
                      >
                        {m.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-deep-blue">{m.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-gray-500">
              {company.legalName} · {company.entityType} · Incorporated {company.foundedLabel}
            </p>
          </div>
          <div className="rounded-3xl bg-soft-gray p-8 md:p-10">
            <h2 className="text-3xl font-bold text-deep-blue mb-2">Send a message</h2>
            <p className="text-gray-600 mb-8">Tell us what you need and we will reply by email.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
