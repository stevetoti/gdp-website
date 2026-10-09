/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        // Blog cover images generated via fal.ai
        protocol: 'https',
        hostname: '**.fal.media',
      },
    ],
  },
  async redirects() {
    // Pages removed in the Oct 2026 verification update (unverifiable claims).
    return [
      { source: '/careers', destination: '/about', statusCode: 301 },
      { source: '/industries', destination: '/services', statusCode: 301 },
      { source: '/solutions', destination: '/services', statusCode: 301 },
    ]
  },
  async headers() {
    return [
      {
        source: '/hero/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig
