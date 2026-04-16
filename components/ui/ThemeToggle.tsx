"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-14 h-7" />

  const isLight = theme === "light"

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="relative w-14 h-7 rounded-full flex-shrink-0 transition-all duration-300"
      style={{
        background: isLight
          ? "linear-gradient(145deg, #d0d0d0, #ebebeb)"
          : "linear-gradient(145deg, #0d0d0d, #1c1c1c)",
        boxShadow: isLight
          ? "inset 3px 3px 7px #aaaaaa, inset -3px -3px 7px #ffffff"
          : "inset 3px 3px 7px #050505, inset -3px -3px 7px #272727",
      }}
    >
      {/* Knob */}
      <span
        className="absolute top-[4px] w-[19px] h-[19px] rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          left: isLight ? "calc(100% - 23px)" : "4px",
          background: isLight
            ? "linear-gradient(145deg, #efefef, #d8d8d8)"
            : "linear-gradient(145deg, #1e1e1e, #0e0e0e)",
          boxShadow: isLight
            ? "3px 3px 6px #aaaaaa, -2px -2px 5px #ffffff"
            : "3px 3px 6px #040404, -2px -2px 5px #2a2a2a",
        }}
      >
        {isLight && (
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)]" />
        )}
      </span>
    </button>
  )
}
