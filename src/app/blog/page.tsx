import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, trends, and thought leadership on enterprise technology, digital transformation, AI, cloud computing, and cybersecurity from Global Digital Prime.',
}

const featuredPost = {
  title: 'The Future of Enterprise AI: 5 Trends Shaping 2025 and Beyond',
  excerpt: 'Artificial intelligence is no longer a futuristic concept — it\'s a present-day business imperative. We explore the five key AI trends that enterprise leaders need to watch and prepare for.',
  date: 'January 15, 2025',
  readTime: '8 min read',
  category: 'AI & Machine Learning',
  image: '/images/ai-technology.jpg',
}

const posts = [
  {
    title: 'Migrating to the Cloud: A Step-by-Step Enterprise Guide',
    excerpt: 'Moving enterprise workloads to the cloud requires careful planning. Here\'s our proven framework for a seamless migration.',
    date: 'January 8, 2025',
    readTime: '6 min read',
    category: 'Cloud',
    image: '/images/data-center.jpg',
  },
  {
    title: 'Zero Trust Architecture: Securing the Modern Enterprise',
    excerpt: 'Traditional perimeter security is dead. Learn how Zero Trust Architecture provides comprehensive protection for distributed enterprises.',
    date: 'December 28, 2024',
    readTime: '7 min read',
    category: 'Cybersecurity',
    image: '/images/cybersecurity.jpg',
  },
  {
    title: 'Digital Transformation in Indonesian Healthcare',
    excerpt: 'How Indonesia\'s healthcare sector is leveraging technology to improve patient outcomes and operational efficiency.',
    date: 'December 20, 2024',
    readTime: '5 min read',
    category: 'Healthcare',
    image: '/images/healthcare.jpg',
  },
  {
    title: 'Building Scalable E-Commerce Platforms for Southeast Asia',
    excerpt: 'Lessons learned from building marketplace platforms that handle millions of transactions in the world\'s fastest-growing digital economy.',
    date: 'December 12, 2024',
    readTime: '6 min read',
    category: 'E-Commerce',
    image: '/images/ecommerce.jpg',
  },
  {
    title: 'The ROI of Digital Transformation: Measuring What Matters',
    excerpt: 'Quantifying the returns on digital transformation investments — metrics, frameworks, and real-world case studies.',
    date: 'December 5, 2024',
    readTime: '7 min read',
    category: 'Strategy',
    image: '/images/digital-transformation.jpg',
  },
  {
    title: 'Data Analytics for Manufacturing: From Reactive to Predictive',
    excerpt: 'How manufacturers are using data analytics and IoT to predict equipment failures, optimize production, and reduce waste.',
    date: 'November 28, 2024',
    readTime: '5 min read',
    category: 'Manufacturing',
    image: '/images/manufacturing.jpg',
  },
]

export default function BlogPage() {
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

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-soft-gray rounded-3xl overflow-hidden card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-vibrant-orange/10 text-vibrant-orange text-xs font-semibold rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-light-blue text-deep-blue text-xs font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link href="/blog#" className="btn-primary inline-block w-fit">
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <h2 className="section-title mb-12">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.title}
                href="/blog#"
                className="bg-white rounded-2xl overflow-hidden card-hover group"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-deep-blue text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-deep-blue mb-2 group-hover:text-vibrant-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
