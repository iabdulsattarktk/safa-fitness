"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/components/ui/ThemeToggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/classes", label: "Classes" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Membership & Pricing" },
  { href: "/tools", label: "Free Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-sm shadow-lg shadow-black/50" : "bg-[#0a0a0a]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Safa Fitness Club"
              width={160}
              height={46}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return active ? (
                <span
                  key={link.href}
                  className="px-3 py-2 text-sm font-medium rounded whitespace-nowrap text-[#f5a623] cursor-default"
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium rounded transition-colors duration-200 whitespace-nowrap text-gray-300 hover:text-white"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA + Toggle + Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black text-sm font-bold rounded transition-colors duration-200 whitespace-nowrap"
            >
              Join Now
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
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
                    className="px-4 py-3 text-sm font-medium rounded transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/pricing"
                className="mt-3 mx-4 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black text-sm font-bold rounded text-center transition-colors duration-200"
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
