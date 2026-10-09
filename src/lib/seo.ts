import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/site'

const OG_IMAGE = { url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Global Digital Prime' }

// Full per-page metadata. Next.js replaces (not merges) openGraph/twitter
// objects from the layout, so every page must carry the complete set.
export function pageMetadata({
  path,
  title,
  description,
  locale = 'en',
  siteName = 'Global Digital Prime',
}: {
  path: string
  title: string
  description: string
  locale?: 'en' | 'id'
  siteName?: string
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(path),
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: path,
      siteName,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  }
}
