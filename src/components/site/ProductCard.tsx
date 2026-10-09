import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/site'

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const host = new URL(product.externalUrl).hostname.replace(/^www\./, '')
  const internal = product.href.startsWith('/')
  return (
    <article id={product.slug} className="scroll-mt-28 group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-deep-blue/5 ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl">
      <a href={product.externalUrl} target="_blank" rel="noopener" aria-label={`Visit ${product.name} at ${host}`} className="block overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name}: ${product.category} — ${product.features.slice(0, 3).join(', ')}`}
          width={1024}
          height={688}
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="w-full transition duration-500 group-hover:scale-[1.03]"
        />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">{product.status}</span>
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-deep-blue">{product.market}</span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-deep-blue">{product.name}</h3>
        <p className="text-sm font-medium text-vibrant-orange">{product.category}</p>
        <p className="mt-3 text-gray-600 leading-relaxed">{product.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.features.map((f) => (
            <li key={f} className="rounded-lg bg-soft-gray px-2.5 py-1 text-xs font-medium text-gray-700">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-lg bg-deep-blue px-4 py-2 text-sm font-semibold text-white hover:bg-dark-navy"
          >
            Visit {host} <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </a>
          {internal && (
            <Link href={product.href} className="inline-flex items-center text-sm font-semibold text-vibrant-orange">
              Product details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
