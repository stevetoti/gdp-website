import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, formatPostDate } from '@/lib/blog'

export const revalidate = 300

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return { title: 'Article Not Found' }
  }
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    keywords: post.keywords ?? undefined,
    alternates: {
      canonical: `https://globaldigitalprime.com/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://globaldigitalprime.com/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      images: post.image_url
        ? [{ url: post.image_url, alt: post.image_alt || post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.image_url ? [post.image_url] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  return (
    <article>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            {post.category && (
              <span className="px-3 py-1 bg-vibrant-orange/10 text-vibrant-orange text-xs font-semibold rounded-full">
                {post.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
            {post.published_at && <span>{formatPostDate(post.published_at)}</span>}
            {post.read_time && (
              <>
                <span>•</span>
                <span>{post.read_time}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {post.image_url && (
        <section className="bg-white pt-12">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.image_alt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-gray-700 leading-relaxed [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-deep-blue [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:text-deep-blue [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-deep-blue [&>h4]:mt-6 [&>h4]:mb-2 [&>p]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-vibrant-orange [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6 [&_a]:text-vibrant-orange [&_a]:underline [&_a:hover]:text-deep-blue [&_strong]:text-deep-blue [&_code]:bg-soft-gray [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&>pre]:bg-deep-blue [&>pre]:text-white [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-5 [&>pre_code]:bg-transparent [&>pre_code]:p-0 [&_table]:w-full [&_table]:mb-5 [&_table]:border-collapse [&_th]:border [&_th]:border-gray-200 [&_th]:bg-soft-gray [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_img]:rounded-xl [&_img]:my-6 [&>hr]:my-8 [&>hr]:border-gray-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content ?? ''}
            </ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="inline-flex items-center text-vibrant-orange font-semibold hover:text-deep-blue transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Talk to our team about custom software, AI, and cloud solutions engineered for your goals.
          </p>
          <Link href="/get-started" className="btn-primary inline-block">
            Get Started
          </Link>
        </div>
      </section>
    </article>
  )
}
