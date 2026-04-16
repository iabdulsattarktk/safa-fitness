"use client"

import { useState } from "react"
import Link from "next/link"

const activityLevels = [
  { label: "Sedentary", desc: "Little or no exercise", multiplier: 1.2 },
  { label: "Lightly Active", desc: "Exercise 1–3 days/week", multiplier: 1.375 },
  { label: "Moderately Active", desc: "Exercise 3–5 days/week", multiplier: 1.55 },
  { label: "Very Active", desc: "Hard exercise 6–7 days/week", multiplier: 1.725 },
  { label: "Extra Active", desc: "Very hard exercise + physical job", multiplier: 1.9 },
]

export default function CaloriesPage() {
  const [form, setForm] = useState({ age: "", gender: "male", height: "", weight: "", activity: 1.55 })
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null)

  function set(key: string, val: string | number) {
    setForm((p) => ({ ...p, [key]: val }))
    setResult(null)
  }

  function calculate() {
    const age = parseFloat(form.age)
    const h = parseFloat(form.height)
    const w = parseFloat(form.weight)
    if (!age || !h || !w) return
    const bmr = form.gender === "male"
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161
    const tdee = Math.round(bmr * form.activity)
    setResult({ bmr: Math.round(bmr), tdee })
  }

  const inputClass = "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors"
  const labelClass = "block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#f5a623] text-sm mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Tools
        </Link>

        <div className="mb-8">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Free Calculator</p>
          <h1 className="text-4xl sm:text-5xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
            Calorie <span className="text-[#f5a623]">Calculator</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Find your daily calorie needs using the Mifflin-St Jeor formula — the most accurate method for most people.</p>
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 mb-6">

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Age (years)</label>
              <input type="number" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="e.g. 28" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <div className="flex bg-[#1a1a1a] rounded p-1">
                {["male", "female"].map((g) => (
                  <button key={g} onClick={() => set("gender", g)}
                    className={`flex-1 py-2.5 text-sm font-bold uppercase rounded transition-colors ${form.gender === g ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}
                  >{g}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Height (cm)</label>
              <input type="number" value={form.height} onChange={(e) => set("height", e.target.value)} placeholder="e.g. 175" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Weight (kg)</label>
              <input type="number" value={form.weight} onChange={(e) => set("weight", e.target.value)} placeholder="e.g. 70" className={inputClass} />
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass}>Activity Level</label>
            <div className="space-y-2">
              {activityLevels.map((a) => (
                <button key={a.multiplier} onClick={() => set("activity", a.multiplier)}
                  className={`w-full text-left px-4 py-3 rounded border transition-colors ${form.activity === a.multiplier ? "border-[#f5a623] bg-[#f5a623]/10 text-white" : "border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}
                >
                  <span className="font-semibold text-sm">{a.label}</span>
                  <span className="text-xs ml-2 opacity-70">— {a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">
            Calculate Calories
          </button>
        </div>

        {result && (
          <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Basal Metabolic Rate</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.bmr}</p>
                <p className="text-gray-500 text-xs mt-1">kcal/day at rest</p>
              </div>
              <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Daily Calorie Needs</p>
                <p className="text-3xl font-bold text-[#f5a623]" style={{ fontFamily: "var(--font-display)" }}>{result.tdee}</p>
                <p className="text-gray-500 text-xs mt-1">kcal/day to maintain</p>
              </div>
            </div>

            <p className="text-white font-bold text-sm uppercase mb-3" style={{ fontFamily: "var(--font-display)" }}>Based on Your Goal</p>
            <div className="space-y-2 mb-6">
              {[
                { label: "Lose Weight (−500 kcal)", val: result.tdee - 500, color: "text-blue-400" },
                { label: "Maintain Weight", val: result.tdee, color: "text-green-400" },
                { label: "Gain Muscle (+300 kcal)", val: result.tdee + 300, color: "text-orange-400" },
              ].map((g) => (
                <div key={g.label} className="flex justify-between items-center px-4 py-3 bg-[#1a1a1a] rounded-lg">
                  <span className="text-gray-400 text-sm">{g.label}</span>
                  <span className={`font-bold text-sm ${g.color}`}>{g.val} kcal</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-white font-bold text-sm mb-1">Get a personalised nutrition plan</p>
              <p className="text-gray-400 text-xs mb-3">Our ISSA-certified trainers at Safa Fitness Club can build a complete diet and training plan around your numbers.</p>
              <div className="flex gap-3">
                <Link href="/pricing" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Join Now</Link>
                <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
          <p className="text-white font-bold text-sm uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>How It Works</p>
          <p className="text-gray-400 text-xs leading-relaxed">Uses the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR), then multiplies by your activity level to find your Total Daily Energy Expenditure (TDEE). These are estimates — individual metabolism varies.</p>
        </div>
      </div>
    </div>
  )
}
