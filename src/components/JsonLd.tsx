import { SITE_URL } from '@/lib/site'

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output escaped so a "</script>" in content cannot break out
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export function breadcrumbLd(items: { name: string; path: string }[]): Record<string, JsonValue> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}
