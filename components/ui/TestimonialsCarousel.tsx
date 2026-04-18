"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Testimonial {
  name: string
  since: string
  text: string
}

interface Props {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const go = useCallback(
    (index: number) => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(index)
        setVisible(true)
      }, 280)
    },
    []
  )

  // Auto-advance every 5 s — resets whenever current changes
  useEffect(() => {
    const timer = setTimeout(() => {
      go((current + 1) % testimonials.length)
    }, 5000)
    return () => clearTimeout(timer)
  }, [current, testimonials.length, go])

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length)
  const next = () => go((current + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <div className="relative max-w-3xl mx-auto px-8 sm:px-0">

      {/* ── CARD ── */}
      <div
        className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 sm:p-12 text-center transition-opacity duration-[280ms]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Quote mark */}
        <div
          className="text-[#f5a623] text-8xl font-bold leading-none mb-2 select-none"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          "
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-4 h-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review text */}
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {t.text}
        </p>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623] font-bold text-lg shrink-0">
            {t.name[0]}
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm">{t.name}</p>
            <p className="text-gray-500 text-xs">{t.since}</p>
          </div>
        </div>
      </div>

      {/* ── ARROWS (hidden on mobile) ── */}
      <button
        onClick={prev}
        aria-label="Previous testimonial"
        className="hidden sm:flex absolute left-0 top-[calc(50%-2.5rem)] -translate-x-6 w-10 h-10 bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623] rounded-full items-center justify-center text-gray-400 hover:text-[#f5a623] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next testimonial"
        className="hidden sm:flex absolute right-0 top-[calc(50%-2.5rem)] translate-x-6 w-10 h-10 bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623] rounded-full items-center justify-center text-gray-400 hover:text-[#f5a623] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── DOTS ── */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-[#f5a623]"
                : "w-2 h-2 bg-[#3a3a3a] hover:bg-[#f5a623]/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
