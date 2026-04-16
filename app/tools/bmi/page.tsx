"use client"

import { useState } from "react"
import Link from "next/link"
import type { Metadata } from "next"

const categories = [
  { label: "Underweight", range: "Below 18.5", min: 0, max: 18.5, color: "text-blue-400" },
  { label: "Normal Weight", range: "18.5 – 24.9", min: 18.5, max: 25, color: "text-green-400" },
  { label: "Overweight", range: "25 – 29.9", min: 25, max: 30, color: "text-yellow-400" },
  { label: "Obese", range: "30 and above", min: 30, max: Infinity, color: "text-red-400" },
]

function getCategory(bmi: number) {
  return categories.find((c) => bmi >= c.min && bmi < c.max) ?? categories[3]
}

export default function BMIPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [height, setHeight] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [weightLbs, setWeightLbs] = useState("")
  const [result, setResult] = useState<number | null>(null)

  function calculate() {
    let bmi: number
    if (unit === "metric") {
      const h = parseFloat(height) / 100
      const w = parseFloat(weightKg)
      if (!h || !w) return
      bmi = w / (h * h)
    } else {
      const totalIn = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0")
      const w = parseFloat(weightLbs)
      if (!totalIn || !w) return
      bmi = (w / (totalIn * totalIn)) * 703
    }
    setResult(Math.round(bmi * 10) / 10)
  }

  const cat = result !== null ? getCategory(result) : null

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Back */}
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#f5a623] text-sm mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Free Calculator</p>
          <h1 className="text-4xl sm:text-5xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
            BMI <span className="text-[#f5a623]">Calculator</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Body Mass Index — a simple measure of weight relative to height.</p>
        </div>

        {/* Calculator */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 mb-6">

          {/* Unit toggle */}
          <div className="flex bg-[#1a1a1a] rounded p-1 mb-6 w-fit">
            {(["metric", "imperial"] as const).map((u) => (
              <button
                key={u}
                onClick={() => { setUnit(u); setResult(null) }}
                className={`px-5 py-2 text-sm font-bold uppercase rounded transition-colors ${unit === u ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}
              >
                {u === "metric" ? "Metric (cm/kg)" : "Imperial (ft/lbs)"}
              </button>
            ))}
          </div>

          {unit === "metric" ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Weight (kg)</label>
                <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="e.g. 70" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Feet</label>
                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="5" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Inches</label>
                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="9" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Weight (lbs)</label>
                <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="154" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors" />
              </div>
            </div>
          )}

          <button onClick={calculate} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">
            Calculate BMI
          </button>
        </div>

        {/* Results */}
        {result !== null && cat && (
          <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-6 sm:p-8 mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Your BMI</p>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-6xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result}</span>
              <span className={`text-xl font-bold uppercase mb-1 ${cat.color}`}>{cat.label}</span>
            </div>

            {/* Scale */}
            <div className="grid grid-cols-4 gap-1 mb-5">
              {categories.map((c) => (
                <div key={c.label} className={`rounded p-2 text-center text-xs ${getCategory(result).label === c.label ? "bg-[#f5a623] text-black font-bold" : "bg-[#1a1a1a] text-gray-500"}`}>
                  <div className="font-bold">{c.range}</div>
                  <div className="text-xs opacity-80">{c.label}</div>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {cat.label === "Normal Weight" && "Great — you are within a healthy weight range. Focus on maintaining and building fitness."}
              {cat.label === "Underweight" && "You may benefit from increasing lean mass. A strength training program and nutrition plan can help."}
              {cat.label === "Overweight" && "A combination of cardio, strength training, and diet adjustment can help you reach a healthy range."}
              {cat.label === "Obese" && "Working with a certified trainer and following a structured program will help you make safe, sustainable progress."}
            </p>

            {/* CTA */}
            <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-white font-bold text-sm mb-1">Want a plan built around your results?</p>
              <p className="text-gray-400 text-xs mb-3">Safa Fitness Club's certified trainers in Islamabad design programs based on your exact stats and goals.</p>
              <div className="flex gap-3">
                <Link href="/pricing" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Join Now</Link>
                <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
          <p className="text-white font-bold text-sm uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>About BMI</p>
          <p className="text-gray-400 text-xs leading-relaxed">BMI is a screening tool, not a diagnostic measure. It does not account for muscle mass, bone density, or fat distribution. Athletes often have a high BMI despite low body fat. Use it as a starting point alongside other measurements.</p>
        </div>
      </div>
    </div>
  )
}
