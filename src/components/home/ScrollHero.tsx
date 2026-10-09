'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

// Frames are a Higgsfield-generated daylight camera move (aerial → studio → devices → 3D),
// exported as WebP sequences in /public/hero/v2/{d,m}/NNN.webp (new folder per version: /hero is cached immutable).
const FRAME_COUNT = 150
const frameUrl = (set: 'd' | 'm', i: number) => `/hero/v2/${set}/${String(i + 1).padStart(3, '0')}.webp`

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
    <div className="max-w-2xl rounded-3xl bg-white/80 p-6 sm:p-10 shadow-2xl shadow-deep-blue/10 ring-1 ring-white/60 backdrop-blur-xl">
      <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-semibold text-vibrant-orange mb-5">
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        Global Digital Prime · Founded 2025 · Delaware C-Corp
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-deep-blue">
        Websites, software, mobile apps and AI for{' '}
        <span className="text-vibrant-orange">growing businesses.</span>
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-gray-700 leading-relaxed">
        Global Digital Prime designs and builds websites, custom software and mobile apps, and creates AI assistants that
        answer customers on websites and WhatsApp, powered by Claude. Founded in 2025 and incorporated in Delaware.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto">
        <Link href="/products" className="btn-primary inline-flex items-center justify-center text-lg">
          See our products <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link href="/contact" className="btn-outline-dark inline-flex items-center justify-center text-lg">
          Work with us
        </Link>
      </div>
    </div>
  )

  if (reduceMotion) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-sky-50 pt-24 pb-16">
        <Image src="/images/gdp/hero-poster-bright.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="relative container-custom">{intro}</div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative h-[300vh] md:h-[400vh] bg-sky-50" aria-label="Introduction">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* First frame doubles as the LCP image until the canvas is ready */}
        <Image
          src="/images/gdp/hero-poster-bright.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        {/* Light veil only behind the text side; the footage stays bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <motion.div style={{ opacity: introOpacity, y: introY, visibility: introVisibility }} className="absolute inset-0 flex items-center pt-24">
          <div className="container-custom w-full">{intro}</div>
        </motion.div>

        <Chapter progress={scrollYProgress} range={[0.22, 0.3, 0.42, 0.5]}>
          <div className="max-w-xl rounded-3xl bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Web · Software · Mobile · AI</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-deep-blue leading-tight">
              Design and engineering, built end to end.
            </h2>
            <p className="mt-3 text-gray-700">Websites, web apps, mobile apps and AI, from first sketch to launch.</p>
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.52, 0.6, 0.7, 0.78]}>
          <div className="max-w-xl rounded-3xl bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">Every screen</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-deep-blue leading-tight">
              One product, on the web, on phones and in chat.
            </h2>
            <p className="mt-3 text-gray-700">Responsive websites, native-feel apps and dashboards that work together.</p>
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.8, 0.88, 1, 1.01]}>
          <div className="max-w-xl rounded-3xl bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            <p className="text-vibrant-orange font-semibold uppercase tracking-widest text-sm mb-3">10 products live</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-deep-blue leading-tight">
              We build our own products, and yours.
            </h2>
            <p className="mt-3 text-gray-700">From VisaReadyPro to VanuWay, see what we have shipped.</p>
            <div className="mt-6 pointer-events-auto">
              <Link href="/products" className="btn-primary inline-flex items-center">
                Explore our products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </Chapter>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-deep-blue/70 text-xs font-semibold tracking-widest uppercase"
          aria-hidden
        >
          Scroll
          <ChevronDown className="mt-1 h-5 w-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
