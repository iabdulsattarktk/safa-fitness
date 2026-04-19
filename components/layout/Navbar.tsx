"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { useSession } from "next-auth/react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const toolsMenu = [
  { slug: "bmi",          label: "BMI Calculator",        hint: "Height · Weight",          icon: "⚖️", color: "#f5a623" },
  { slug: "calories",     label: "Calorie Calculator",     hint: "Age · Gender · Activity",  icon: "🔥", color: "#ef4444" },
  { slug: "body-fat",     label: "Body Fat % Estimator",   hint: "Height · Waist · Neck",    icon: "📏", color: "#8b5cf6" },
  { slug: "macros",       label: "Macro Planner",          hint: "Calories · Goal",          icon: "🥗", color: "#22c55e" },
  { slug: "one-rep-max",  label: "One Rep Max",            hint: "Weight · Reps",            icon: "💪", color: "#f97316" },
  { slug: "ideal-weight", label: "Ideal Weight",           hint: "Height · Gender",          icon: "⭐", color: "#eab308" },
  { slug: "water",        label: "Water Intake",           hint: "Weight · Activity",        icon: "💧", color: "#3b82f6" },
  { slug: "heart-rate",   label: "Heart Rate Zones",       hint: "Age",                      icon: "❤️", color: "#ef4444" },
  { slug: "lean-mass",    label: "Lean Body Mass",         hint: "Weight · Height · Gender", icon: "🏋️", color: "#f5a623" },
  { slug: "protein",      label: "Protein Calculator",     hint: "Weight · Goal",            icon: "🥩", color: "#e11d48" },
  { slug: "running-pace", label: "Running Pace",           hint: "Distance · Time",          icon: "🏃", color: "#10b981" },
  { slug: "waist-height", label: "Waist-Height Ratio",     hint: "Waist · Height",           icon: "📐", color: "#6366f1" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const toolsLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const portalHref = session
    ? session.user?.role === "ADMIN" ? "/admin" : "/dashboard"
    : "/login"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setToolsOpen(false) }, [pathname])

  // Close tools dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Hover handlers with delay so dropdown doesn't close when crossing the gap
  const handleToolsEnter = () => {
    if (toolsLeaveTimer.current) clearTimeout(toolsLeaveTimer.current)
    setToolsOpen(true)
  }
  const handleToolsLeave = () => {
    toolsLeaveTimer.current = setTimeout(() => setToolsOpen(false), 200)
  }

  const isToolsActive = pathname.startsWith("/tools")

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30 transition-all duration-500"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between h-14 pb-2">

          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-2">
            {/* Hamburger — mobile only, LEFT side */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1.5 text-gray-300 hover:text-white -ml-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Safa Fitness Club"
                width={130}
                height={38}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return active ? (
                <span
                  key={link.href}
                  className="px-2.5 py-1.5 text-[13px] font-medium rounded whitespace-nowrap text-[#f5a623] cursor-default"
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  className="px-2.5 py-1.5 text-[13px] font-medium rounded transition-colors duration-200 whitespace-nowrap text-gray-400 hover:text-white"
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Fitness Tools Dropdown */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleToolsEnter}
              onMouseLeave={handleToolsLeave}
            >
              {/* "Fitness Tools" text → navigates to /tools page */}
              <div className="flex items-center">
                <Link
                  href="/tools"
                  className={`px-2.5 py-1.5 text-[13px] font-medium rounded-l transition-colors duration-200 whitespace-nowrap ${
                    isToolsActive ? "text-[#f5a623]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Fitness Tools
                </Link>
                {/* Chevron toggles dropdown only */}
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`px-1 py-1.5 rounded-r transition-colors duration-200 ${
                    isToolsActive ? "text-[#f5a623]" : "text-gray-400 hover:text-white"
                  }`}
                  aria-label="Open tools menu"
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Dropdown Panel */}
              {toolsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] dropdown-animate"
                  onMouseEnter={handleToolsEnter}
                  onMouseLeave={handleToolsLeave}
                >
                  <div className="bg-[#141414]/97 backdrop-blur-xl border border-[#2a2a2a] rounded-xl shadow-2xl shadow-black/70 overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-3 border-b border-[#2a2a2a] flex items-center justify-between bg-gradient-to-r from-[#f5a623]/8 to-transparent">
                      <p className="text-[#f5a623] text-[11px] font-bold uppercase tracking-[0.25em]">Health &amp; Fitness Tools</p>
                      <span className="text-gray-600 text-[10px]">12 calculators</span>
                    </div>
                    {/* Tools Grid */}
                    <div className="grid grid-cols-2">
                      {toolsMenu.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools?tool=${tool.slug}`}
                          onClick={() => setToolsOpen(false)}
                          className="group flex items-center gap-3 px-4 py-3 border-b border-r border-[#1e1e1e] hover:bg-[#1a1a1a] transition-all duration-150 text-left w-full last:border-b-0"
                          style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        >
                          {/* Colored icon bubble */}
                          <span
                            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform duration-150 group-hover:scale-110"
                            style={{ backgroundColor: `${tool.color}18` }}
                          >
                            {tool.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-white group-hover:text-[#f5a623] text-[12.5px] font-semibold transition-colors leading-snug truncate">
                              {tool.label}
                            </p>
                            <p className="text-gray-600 text-[10.5px] mt-0.5 group-hover:text-gray-500 transition-colors">{tool.hint}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* Footer CTA */}
                    <div className="px-5 py-2.5 border-t border-[#2a2a2a] bg-[#111] flex items-center justify-between">
                      <span className="text-gray-600 text-[10px]">All tools are free · No signup needed</span>
                      <Link href="/tools" onClick={() => setToolsOpen(false)} className="text-[#f5a623] text-[10.5px] font-bold uppercase tracking-wider hover:text-[#e09410] transition-colors">
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Theme Toggle + Member icon + Join Now */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Member login / portal icon button */}
            <Link
              href={portalHref}
              title={session ? (session.user?.role === "ADMIN" ? "Admin Panel" : "My Portal") : "Member Login"}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-[#f5a623]/50 transition-colors duration-200 overflow-hidden"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </Link>

            {/* Join Now — always visible */}
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black text-[13px] font-bold rounded transition-colors duration-200 whitespace-nowrap"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#2a2a2a] py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return active ? (
                  <span
                    key={link.href}
                    className="px-4 py-3 text-sm font-medium rounded text-[#f5a623] bg-[#1a1a1a] cursor-default"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    scroll={false}
                    className="px-4 py-3 text-sm font-medium rounded transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Fitness Tools in mobile — expand/collapse */}
              <div>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded transition-colors duration-200 ${
                    isToolsActive ? "text-[#f5a623] bg-[#1a1a1a]" : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  Fitness Tools
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {toolsOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5">
                    {toolsMenu.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools?tool=${tool.slug}`}
                        onClick={() => { setMenuOpen(false); setToolsOpen(false) }}
                        className="px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded transition-colors duration-150 text-left w-full block"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {session ? (
                <Link
                  href={portalHref}
                  className="mt-3 mx-4 py-2.5 border border-[#2a2a2a] text-gray-300 text-sm font-medium rounded text-center transition-colors hover:border-[#f5a623]/40 hover:text-white block"
                >
                  {session.user?.role === "ADMIN" ? "Admin Panel" : "My Portal"}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="mt-3 mx-4 py-2.5 border border-[#2a2a2a] text-gray-300 text-sm font-medium rounded text-center transition-colors hover:border-[#f5a623]/40 hover:text-white block"
                >
                  Member Login
                </Link>
              )}
              <Link
                href="/pricing"
                className="mt-2 mx-4 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black text-sm font-bold rounded text-center transition-colors duration-200 block"
              >
                Join Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
