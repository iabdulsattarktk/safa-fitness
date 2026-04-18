"use client"

/**
 * PageDecorations — animated sidebar patterns for wide screens
 * Shows on xl+ screens (1280px+) in the blank space beside max-w-7xl content.
 * Four pattern types available: orbs, grid, dots, lines.
 * Usage: <PageDecorations /> inside any section or globally in layout.
 */

import { useEffect, useRef } from "react"

/* ─── 1. FLOATING ORBS ────────────────────────────────────────────────────── */
export function OrbPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      {/* Left orb */}
      <div
        className="absolute -left-40 top-1/4 w-80 h-80 rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #f5a623 0%, transparent 70%)",
          animation: "orbFloat 8s ease-in-out infinite",
          animationDelay: "0s",
        }}
      />
      {/* Left orb 2 */}
      <div
        className="absolute -left-20 top-2/3 w-48 h-48 rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #f5a623 0%, transparent 70%)",
          animation: "orbFloat 11s ease-in-out infinite",
          animationDelay: "-4s",
        }}
      />
      {/* Right orb */}
      <div
        className="absolute -right-40 top-1/3 w-96 h-96 rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #f5a623 0%, transparent 70%)",
          animation: "orbFloat 9s ease-in-out infinite",
          animationDelay: "-2s",
        }}
      />
      {/* Right orb 2 */}
      <div
        className="absolute -right-24 top-3/4 w-56 h-56 rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          animation: "orbFloat 13s ease-in-out infinite",
          animationDelay: "-6s",
        }}
      />
    </div>
  )
}

/* ─── 2. DOT MATRIX ───────────────────────────────────────────────────────── */
export function DotPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Left side dots */}
      <svg
        className="absolute left-0 top-0 h-full opacity-[0.06]"
        style={{ width: "max(calc((100vw - 80rem) / 2), 0px)", animation: "fadeShift 6s ease-in-out infinite" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots-left" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#f5a623" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-left)" />
      </svg>
      {/* Right side dots */}
      <svg
        className="absolute right-0 top-0 h-full opacity-[0.06]"
        style={{ width: "max(calc((100vw - 80rem) / 2), 0px)", animation: "fadeShift 6s ease-in-out infinite", animationDelay: "-3s" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots-right" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#f5a623" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-right)" />
      </svg>
    </div>
  )
}

/* ─── 3. GRID LINES ───────────────────────────────────────────────────────── */
export function GridPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Left grid */}
      <svg
        className="absolute left-0 top-0 h-full opacity-[0.04]"
        style={{ width: "max(calc((100vw - 80rem) / 2), 0px)" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-left" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="grid-fade-l" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id="grid-mask-l">
            <rect width="100%" height="100%" fill="url(#grid-fade-l)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-left)" mask="url(#grid-mask-l)" />
      </svg>
      {/* Right grid */}
      <svg
        className="absolute right-0 top-0 h-full opacity-[0.04]"
        style={{ width: "max(calc((100vw - 80rem) / 2), 0px)" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-right" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="grid-fade-r" x1="1" x2="0" y1="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id="grid-mask-r">
            <rect width="100%" height="100%" fill="url(#grid-fade-r)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-right)" mask="url(#grid-mask-r)" />
      </svg>
    </div>
  )
}

/* ─── 4. DIAGONAL LINES ───────────────────────────────────────────────────── */
export function DiagonalPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Left diagonal */}
      <svg
        className="absolute left-0 top-0 h-full opacity-[0.04]"
        style={{ width: "max(calc((100vw - 80rem) / 2), 0px)", animation: "slideDown 20s linear infinite" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diag-left" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" y1="30" x2="30" y2="0" stroke="#f5a623" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="200%" fill="url(#diag-left)" />
      </svg>
      {/* Right diagonal */}
      <svg
        className="absolute right-0 top-0 h-full opacity-[0.04]"
        style={{ width: "max(calc((100vw - 80rem) / 2), 0px)", animation: "slideDown 20s linear infinite", animationDelay: "-10s" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diag-right" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" y1="30" x2="30" y2="0" stroke="#f5a623" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="200%" fill="url(#diag-right)" />
      </svg>
    </div>
  )
}

/* ─── DEFAULT EXPORT: Orbs + Dots combined (recommended) ─────────────────── */
export default function PageDecorations() {
  return (
    <>
      <OrbPattern />
      <DotPattern />
    </>
  )
}
