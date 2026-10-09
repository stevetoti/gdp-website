import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-sky-50 pt-40 pb-32">
      <div className="container-custom max-w-2xl text-center">
        <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm">404</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-deep-blue">Page not found</h1>
        <p className="mt-4 text-lg text-gray-700">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="btn-primary">Go to the homepage</Link>
          <Link href="/products" className="btn-outline-dark">See our products</Link>
        </div>
      </div>
    </section>
  )
}
