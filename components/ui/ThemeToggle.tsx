"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-16 h-8" />

  const isLight = theme === "light"

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
      className="relative flex items-center w-16 h-8 rounded-full flex-shrink-0 transition-all duration-300 border"
      style={{
        backgroundColor: isLight ? "#f0e8d8" : "#1a1a1a",
        borderColor: isLight ? "#d4a843" : "#3a3a3a",
        boxShadow: isLight
          ? "0 0 0 1px rgba(212,168,67,0.3), inset 0 1px 3px rgba(0,0,0,0.1)"
          : "0 0 0 1px rgba(245,166,35,0.15), inset 0 1px 3px rgba(0,0,0,0.5)",
      }}
    >
      {/* Track icons — moon (left/dark side) */}
      <svg className="absolute left-1.5 w-3 h-3 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
      </svg>
      {/* Track icons — sun (right/light side) */}
      <svg className="absolute right-1.5 w-3 h-3 text-[#d4a843]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>

      {/* Sliding knob */}
      <span
        className="absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-md z-10"
        style={{
          left: isLight ? "calc(100% - 26px)" : "2px",
          backgroundColor: isLight ? "#f5a623" : "#2a2a2a",
          boxShadow: isLight
            ? "0 2px 8px rgba(245,166,35,0.5)"
            : "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        {isLight ? (
          /* Sun icon */
          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17a5 5 0 100-10 5 5 0 000 10zm0-13a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm9-9h-1a1 1 0 110-2h1a1 1 0 110 2zM4 12H3a1 1 0 110-2h1a1 1 0 110 2zm13.657-6.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 16.95a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm9.9 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414zM5.636 6.364l-.707-.707A1 1 0 016.343 4.243l.707.707A1 1 0 015.636 6.364z" />
          </svg>
        ) : (
          /* Moon icon */
          <svg className="w-3 h-3 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        )}
      </span>
    </button>
  )
}
