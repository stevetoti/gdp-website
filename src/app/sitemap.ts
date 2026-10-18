import { serviceDetails } from '@/lib/service-detail'
import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/blog'
import { SITE_URL, liveProducts, pagePairs } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

const url = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // Each en/id page pair lists both versions as hreflang alternates.
  const paired: Entry[] = Object.entries(pagePairs).flatMap(([en, id]) => {
    const alternates = { languages: { en: url(en), id: url(id), 'x-default': url(en) } }
    const priority = en === '/' ? 1 : 0.8
    return [
      { url: url(en), changeFrequency: 'monthly' as const, priority, alternates },
      { url: url(id), changeFrequency: 'monthly' as const, priority: priority - 0.1, alternates },
    ]
  })

  const single: Entry[] = [
    { url: url('/products'), changeFrequency: 'monthly', priority: 0.9 },
    ...liveProducts.map((p) => ({ url: url(p.href), changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: url('/blog'), changeFrequency: 'weekly', priority: 0.6 },
    { url: url('/get-started'), changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms'), changeFrequency: 'yearly', priority: 0.2 },
  ]

  // getPublishedPosts() already returns [] on fetch failure, but guard anyway
  // so a thrown error can never break sitemap generation.
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await getPublishedPosts()
    blogEntries = posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      ...(post.published_at ? { lastModified: new Date(post.published_at) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    blogEntries = []
  }

  return [...paired, ...single, ...serviceDetails.map(d => ({ url: url(`/services/${d.slug}`), lastModified: new Date("2026-10-19"), changeFrequency: "monthly" as const, priority: 0.8 })), ...blogEntries]
}
