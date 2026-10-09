import Image from 'next/image'

export default function PageHero({
  eyebrow,
  title,
  intro,
  image = '/images/gdp/devices-3d-bright.webp',
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  image?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-sky-50 pt-36 pb-20">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
      <div className="relative container-custom max-w-4xl mr-auto">
        <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-deep-blue">{title}</h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">{intro}</p>
        {children}
      </div>
    </section>
  )
}
