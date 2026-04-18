"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollRevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    // Small timeout to ensure DOM is painted after navigation
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>("[data-reveal]")

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
      )

      els.forEach((el) => {
        // Reset state on navigation (new page)
        el.classList.remove("is-revealed")
        observer.observe(el)
      })

      return () => observer.disconnect()
    }, 80)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
