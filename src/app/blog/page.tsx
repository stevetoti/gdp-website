import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPublishedPosts, formatPostDate } from '@/lib/blog'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, trends, and thought leadership on enterprise technology, digital transformation, AI, cloud computing, and cybersecurity from Global Digital Prime.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const [featuredPost, ...restPosts] = posts

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom text-center">
          <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Insights &amp; Thought Leadership
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the latest trends, best practices, and expert perspectives on enterprise technology and digital transformation.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        /* Empty state */
        <section className="py-24 bg-white">
          <div className="container-custom text-center">
            <div className="max-w-xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-vibrant-orange/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-vibrant-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                New Articles Coming Soon
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We&apos;re working on fresh insights covering enterprise technology, AI, cloud, and digital transformation. Check back shortly.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          <section className="py-20 bg-white">
            <div className="container-custom">
              <div className="bg-soft-gray rounded-3xl overflow-hidden card-hover">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    {featuredPost.image_url && (
                      <Image
                        src={featuredPost.image_url}
                        alt={featuredPost.image_alt || featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-vibrant-orange/10 text-vibrant-orange text-xs font-semibold rounded-full">
                        Featured
                      </span>
                      {featuredPost.category && (
                        <span className="px-3 py-1 bg-light-blue text-deep-blue text-xs font-medium rounded-full">
                          {featuredPost.category}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <span>{formatPostDate(featuredPost.published_at)}</span>
                      {featuredPost.read_time && (
                        <>
                          <span>•</span>
                          <span>{featuredPost.read_time}</span>
                        </>
                      )}
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`} className="btn-primary inline-block w-fit">
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          {restPosts.length > 0 && (
            <section className="py-20 bg-soft-gray">
              <div className="container-custom">
                <h2 className="section-title mb-12">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {restPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="bg-white rounded-2xl overflow-hidden card-hover group"
                    >
                      <div className="relative h-48 bg-light-blue">
                        {post.image_url && (
                          <Image
                            src={post.image_url}
                            alt={post.image_alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-deep-blue text-xs font-medium rounded-full">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-deep-blue mb-2 group-hover:text-vibrant-orange transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span>{formatPostDate(post.published_at)}</span>
                          {post.read_time && (
                            <>
                              <span>•</span>
                              <span>{post.read_time}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Ahead of the Curve
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for monthly insights on enterprise technology trends and digital transformation strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-orange"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
