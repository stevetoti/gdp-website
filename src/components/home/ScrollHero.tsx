'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

// Frames are a Higgsfield-generated camera move (aerial → studio → screen → product),
// exported as WebP sequences in /public/hero/{d,m}/NNN.webp.
const FRAME_COUNT = 150
const frameUrl = (set: 'd' | 'm', i: number) => `/hero/${set}/${String(i + 1).padStart(3, '0')}.webp`

// Load coarse frames first so scrubbing works early, then fill in the gaps.
function loadOrder(count: number): number[] {
  const order: number[] = []
  const seen = new Set<number>()
  for (const stride of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += stride) {
      if (!seen.has(i)) {
        seen.add(i)
        order.push(i)
      }
    }
  }
  return order
}

function Chapter({
  progress,
  range,
  children,
  className = '',
}: {
  progress: MotionValue<number>
  range: [number, number, number, number]
  children: React.ReactNode
  className?: string
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [40, 0, 0, -40])
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? 'hidden' : 'visible'))
  return (
    <motion.div style={{ opacity, y, visibility }} className={`absolute inset-0 flex items-center pointer-events-none ${className}`}>
      <div className="container-custom w-full">{children}</div>
    </motion.div>
  )
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>([])
  const currentRef = useRef(0)
  const [ready, setReady] = useState(false)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const introOpacity = useTransform(scrollYProgress, [0, 0.14, 0.2], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -60])
  const introVisibility = useTransform(introOpacity, (v) => (v < 0.02 ? 'hidden' : 'visible'))
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  const draw = (index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    // Nearest loaded frame at or before the target, else after it.
    let img: HTMLImageElement | null = null
    for (let d = 0; d < FRAME_COUNT && !img; d++) {
      img = framesRef.current[index - d] ?? framesRef.current[index + d] ?? null
    }
    if (!img) return
    const { width: cw, height: ch } = canvas
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
  }

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      draw(currentRef.current)
    }
    resize()
    window.addEventListener('resize', resize)

    const set = window.innerWidth < 768 ? 'm' : 'd'
    framesRef.current = new Array(FRAME_COUNT).fill(null)
    let cancelled = false
    const order = loadOrder(FRAME_COUNT)
    let cursor = 0
    // A few parallel loaders keep the network busy without flooding it.
    const loadNext = () => {
      if (cancelled || cursor >= order.length) return
      const i = order[cursor++]
      const img = new window.Image()
      img.decoding = 'async'
      img.src = frameUrl(set, i)
      img.onload = () => {
        if (cancelled) return
        framesRef.current[i] = img
        if (i === 0) setReady(true)
        if (Math.abs(i - currentRef.current) <= 16) draw(currentRef.current)
        loadNext()
      }
      img.onerror = loadNext
    }
    for (let k = 0; k < 4; k++) loadNext()

    return () => {
      cancelled = true
      window.removeEventListener('resize', resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))))
    if (index !== currentRef.current) {
      currentRef.current = index
      requestAnimationFrame(() => draw(index))
    }
  })

  const intro = (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md mb-6">
        <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
        Global Digital Prime · Founded 2025 · Delaware C-Corp
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
        AI assistants that handle real conversations for{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-orange to-amber-300">growing businesses.</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl">
        Global Digital Prime builds AI products that answer customers on websites and WhatsApp, powered by Claude. Founded in
        2025 and incorporated in Delaware, we also build custom AI systems for clients.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto">
        <Link href="/products" className="btn-primary inline-flex items-center justify-center text-lg">
          See our products <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link href="/contact" className="btn-outline inline-flex items-center justify-center text-lg">
          Work with us
        </Link>
      </div>
    </div>
  )

  if (reduceMotion) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1628] pt-24 pb-16">
        <Image src="/images/gdp/hero-poster.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/70 to-transparent" />
        <div className="relative container-custom">{intro}</div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative h-[300vh] md:h-[400vh] bg-[#0a1628]" aria-label="Introduction">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* First frame doubles as the LCP image until the canvas is ready */}
        <Image
          src="/images/gdp/hero-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a1628] to-transparent" />

        <motion.div style={{ opacity: introOpacity, y: introY, visibility: introVisibility }} className="absolute inset-0 flex items-center pt-20">
          <div className="container-custom w-full">{intro}</div>
        </motion.div>

        <Chapter progress={scrollYProgress} range={[0.22, 0.3, 0.42, 0.5]}>
          <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Design · Code · AI</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
            Web development, software and AI engineering, built end to end.
          </h2>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.52, 0.6, 0.7, 0.78]}>
          <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Website chat + WhatsApp</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
            Every customer question answered, at any hour.
          </h2>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.8, 0.88, 1, 1.01]}>
          <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Powered by Claude</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
            The AI replies first. A person can step in at any time.
          </h2>
          <div className="mt-8 pointer-events-auto">
            <Link href="/products/visareadypro" className="btn-primary inline-flex items-center">
              Meet VisaReadyPro <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </Chapter>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 text-xs tracking-widest uppercase"
          aria-hidden
        >
          Scroll
          <ChevronDown className="mt-1 h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
