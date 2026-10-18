'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { trackEnquiryEvent } from '@/lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
      const href = anchor?.getAttribute('href')
      if (!href) return
      if (href.startsWith('tel:')) trackEnquiryEvent('phone_click', { page_path: window.location.pathname })
      else {
        try {
          const url = new URL(href, window.location.origin)
          if (['wa.me', 'api.whatsapp.com'].includes(url.hostname)) trackEnquiryEvent('whatsapp_click', { page_path: window.location.pathname })
        } catch { /* Invalid links do not create Analytics events. */ }
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
