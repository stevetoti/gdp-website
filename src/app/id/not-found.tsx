import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-[#1a0f12] pt-40 pb-32 text-white">
      <div className="container-custom max-w-2xl text-center">
        <p className="text-red-300 font-semibold uppercase tracking-widest text-sm">404</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-lg text-white/75">Halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
        <Link href="/id" className="mt-8 inline-block rounded-lg bg-id-red px-8 py-3 font-semibold text-white hover:bg-red-700">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  )
}
