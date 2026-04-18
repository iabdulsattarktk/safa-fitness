import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"
import ToolsPageLayout from "@/components/tools/ToolsPageLayout"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Free Fitness Calculators | Safa Fitness Club – Islamabad",
  description:
    "Free online fitness calculators — BMI, Calorie Needs, Body Fat %, Macro Planner, One Rep Max, and Ideal Weight. Multiple science-based formulas. Calculate your stats and start your journey.",
}

export default function ToolsPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/facilities/run-banner.webp"
          alt="Fitness Calculators"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Science-Based Formulas</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fitness <span className="text-[#f5a623]">Tools</span>
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-[#0d0d0d] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Six professional-grade calculators with multiple world-standard formulas. Click any tool to open it right here — no page switching, results and full report on the same page.
          </p>
        </div>
      </section>

      {/* ── CALCULATORS (all inline, single page) ── */}
      <Suspense>
        <ToolsPageLayout />
      </Suspense>

      {/* ── CTA ── */}
      <CTABanner
        heading="Know Your Numbers. Now Train With Experts."
        subheading="Safa Fitness Club's certified trainers will build a program around your exact stats and goals."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Meet the Trainers", href: "/trainers" }}
        variant="orange"
      />
    </>
  )
}
