import Image from 'next/image'

export default function PageHero({
  eyebrow,
  title,
  intro,
  image = '/images/gdp/ai-assistant-globe.webp',
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  image?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] pt-36 pb-20 text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/85 to-[#0a1628]/30" />
      <div className="relative container-custom max-w-4xl mr-auto">
        <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{title}</h1>
        <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">{intro}</p>
        {children}
      </div>
    </section>
  )
}
