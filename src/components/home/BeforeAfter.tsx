'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { MoveHorizontal } from 'lucide-react'

export default function BeforeAfter() {
  const [position, setPosition] = useState(50)
  const frameRef = useRef<HTMLDivElement>(null)

  const updateFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div>
      <div
        ref={frameRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl select-none touch-pan-y cursor-ew-resize"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          updateFromPointer(e.clientX)
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === 'touch') updateFromPointer(e.clientX)
        }}
      >
        <Image
          src="/images/gdp/after-ai-answers.webp"
          alt="After: a business owner relaxed in the morning while an AI assistant has answered every customer message"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src="/images/gdp/before-missed-messages.webp"
            alt="Before: a business owner at 2am overwhelmed by unanswered customer messages"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-vibrant-orange px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          After
        </span>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" style={{ left: `${position}%` }} aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-deep-blue shadow-lg">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>
      <label className="mt-4 block">
        <span className="sr-only">Compare before and after</span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="w-full accent-vibrant-orange"
        />
      </label>
    </div>
  )
}
