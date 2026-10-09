import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 pt-40 pb-32">
      <div className="container-custom max-w-2xl text-center">
        <p className="text-id-red font-semibold uppercase tracking-widest text-sm">404</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-deep-blue">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-lg text-gray-700">Halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
        <Link href="/id" className="mt-8 inline-block rounded-lg bg-id-red px-8 py-3 font-semibold text-white hover:bg-red-700">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  )
}
