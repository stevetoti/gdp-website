import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/blog'
import { SITE_URL, liveProducts, pagePairs } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

const url = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Each en/id page pair lists both versions as hreflang alternates.
  const paired: Entry[] = Object.entries(pagePairs).flatMap(([en, id]) => {
    const alternates = { languages: { en: url(en), id: url(id), 'x-default': url(en) } }
    const priority = en === '/' ? 1 : 0.8
    return [
      { url: url(en), lastModified: now, changeFrequency: 'monthly' as const, priority, alternates },
      { url: url(id), lastModified: now, changeFrequency: 'monthly' as const, priority: priority - 0.1, alternates },
    ]
  })

  const single: Entry[] = [
    { url: url('/products'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...liveProducts.map((p) => ({ url: url(p.href), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: url('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: url('/get-started'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // getPublishedPosts() already returns [] on fetch failure, but guard anyway
  // so a thrown error can never break sitemap generation.
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await getPublishedPosts()
    blogEntries = posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.published_at ? new Date(post.published_at) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    blogEntries = []
  }

  return [...paired, ...single, ...blogEntries]
}
