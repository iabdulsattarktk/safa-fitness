import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Fitness Tools | Safa Fitness Club – Islamabad",
  description:
    "Free online fitness calculators — BMI, Calorie Needs, Body Fat %, Macro Planner, One Rep Max, and Ideal Weight. Calculate your stats and start your journey at Safa Fitness Club.",
}

const tools = [
  {
    href: "/tools/bmi",
    title: "BMI Calculator",
    desc: "Find out your Body Mass Index and see which weight category you fall into. Takes less than 30 seconds.",
    img: "/images/facilities/gym.webp",
    badge: "Most Used",
    inputs: "Height · Weight",
  },
  {
    href: "/tools/calories",
    title: "Calorie Calculator",
    desc: "Calculate your daily calorie needs based on your age, gender, activity level, and fitness goal.",
    img: "/images/facilities/run-banner.webp",
    badge: null,
    inputs: "Age · Gender · Activity",
  },
  {
    href: "/tools/body-fat",
    title: "Body Fat % Estimator",
    desc: "Estimate your body fat percentage using the US Navy method — no equipment needed, just measurements.",
    img: "/images/trainers/kishwar-trainer.webp",
    badge: null,
    inputs: "Height · Waist · Neck",
  },
  {
    href: "/tools/macros",
    title: "Macro Planner",
    desc: "Get your daily protein, carb, and fat targets based on your calorie goal and fitness objective.",
    img: "/images/facilities/safa-bar.webp",
    badge: null,
    inputs: "Calories · Goal",
  },
  {
    href: "/tools/one-rep-max",
    title: "One Rep Max",
    desc: "Estimate the maximum weight you can lift for one rep using your recent training weights and reps.",
    img: "/images/facilities/boxing.webp",
    badge: null,
    inputs: "Weight · Reps",
  },
  {
    href: "/tools/ideal-weight",
    title: "Ideal Weight",
    desc: "Calculate your ideal body weight range based on your height and gender using four proven formulas.",
    img: "/images/trainers/trainer-2.webp",
    badge: null,
    inputs: "Height · Gender",
  },
]

export default function ToolsPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/facilities/run-banner.webp"
          alt="Free Fitness Tools"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">100% Free</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fitness <span className="text-[#f5a623]">Tools</span>
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-[#141414] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Six science-based calculators to help you understand your body and set smarter goals. All free — no signup required. Used by Safa Fitness Club members and trainers every day.
          </p>
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Know Your Numbers</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Choose a <span className="text-[#f5a623]">Calculator</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/60 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tool.img}
                    alt={tool.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  {tool.badge && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider rounded">
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-white font-bold text-xl uppercase mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{tool.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                    <span className="text-gray-600 text-xs">{tool.inputs}</span>
                    <span className="flex items-center gap-1 text-[#f5a623] text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                      Open
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
