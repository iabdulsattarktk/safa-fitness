"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  value: string             // e.g. "8+", "300+", "F-7", "5"
  className?: string
  style?: React.CSSProperties
  duration?: number         // ms — default 1800
}

/**
 * Animates a numeric string from 0 to its value when it enters the viewport.
 * Non-numeric values (e.g. "F-7") are rendered as-is with no animation.
 */
export default function CountUp({ value, className, style, duration = 1800 }: CountUpProps) {
  // Parse leading digits + optional suffix ("+", " yrs", etc.)
  const match = value.match(/^(\d+)(.*)$/)

  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!match) return            // non-numeric — nothing to animate
    const target = parseInt(match[1], 10)
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          function tick(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Non-numeric value — render as plain span
  if (!match) {
    return <span className={className} style={style}>{value}</span>
  }

  const suffix = match[2]

  return (
    <span ref={ref} className={className} style={style}>
      {count}{suffix}
    </span>
  )
}
