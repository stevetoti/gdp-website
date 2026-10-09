import Image from 'next/image'

export default function IdHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: string; intro: string; image: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-red-50 pt-36 pb-20">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
      <div className="relative container-custom max-w-4xl mr-auto">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-id-red">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-deep-blue">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-gray-700">{intro}</p>
        {children}
      </div>
    </section>
  )
}
