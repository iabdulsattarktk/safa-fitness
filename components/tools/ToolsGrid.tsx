"use client"

import Image from "next/image"
import { useToolModal } from "@/contexts/ToolModalContext"

const tools = [
  { slug: "bmi",         title: "BMI Calculator",       desc: "Find out your Body Mass Index and see which weight category you fall into. Takes less than 30 seconds.", img: "/images/facilities/gym.webp",           badge: "Most Used", inputs: "Height · Weight" },
  { slug: "calories",    title: "Calorie Calculator",    desc: "Calculate your daily calorie needs based on your age, gender, activity level, and fitness goal.",        img: "/images/facilities/run-banner.webp",    badge: null,        inputs: "Age · Gender · Activity" },
  { slug: "body-fat",    title: "Body Fat % Estimator",  desc: "Estimate your body fat percentage using the US Navy method — no equipment needed, just measurements.",   img: "/images/trainers/kishwar-trainer.webp", badge: null,        inputs: "Height · Waist · Neck" },
  { slug: "macros",      title: "Macro Planner",          desc: "Get your daily protein, carb, and fat targets based on your calorie goal and fitness objective.",        img: "/images/facilities/safa-bar.webp",      badge: null,        inputs: "Calories · Goal" },
  { slug: "one-rep-max", title: "One Rep Max",            desc: "Estimate the maximum weight you can lift for one rep using your recent training weights and reps.",      img: "/images/facilities/boxing.webp",        badge: null,        inputs: "Weight · Reps" },
  { slug: "ideal-weight","title": "Ideal Weight",         desc: "Calculate your ideal body weight range based on your height and gender using four proven formulas.",     img: "/images/trainers/trainer-2.webp",       badge: null,        inputs: "Height · Gender" },
]

export default function ToolsGrid() {
  const { openTool } = useToolModal()

  return (
    <section className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="text-center mb-14">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Know Your Numbers</p>
          <h2
            className="text-4xl sm:text-5xl font-bold uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose a <span className="text-[#f5a623]">Calculator</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <button
              key={tool.slug}
              onClick={() => openTool(tool.slug)}
              data-reveal data-delay={String((i % 3) + 1)}
              className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/60 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 text-left w-full"
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
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
