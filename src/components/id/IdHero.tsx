import Image from 'next/image'

export default function IdHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: string; intro: string; image: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#1a0f12] pt-36 pb-20 text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f12] via-[#1a0f12]/80 to-transparent" />
      <div className="relative container-custom max-w-4xl mr-auto">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-300">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-white/85">{intro}</p>
        {children}
      </div>
    </section>
  )
}
