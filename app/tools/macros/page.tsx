"use client"

import { useState } from "react"
import Link from "next/link"

const goals = [
  { key: "lose", label: "Lose Fat", protein: 2.2, fat: 0.8, desc: "High protein to preserve muscle while in a calorie deficit." },
  { key: "maintain", label: "Maintain", protein: 1.8, fat: 0.9, desc: "Balanced macros to sustain current weight and composition." },
  { key: "muscle", label: "Build Muscle", protein: 2.0, fat: 1.0, desc: "Surplus calories with high protein to support muscle growth." },
]

export default function MacrosPage() {
  const [calories, setCalories] = useState("")
  const [weight, setWeight] = useState("")
  const [goal, setGoal] = useState("maintain")
  const [result, setResult] = useState<{ protein: number; fat: number; carbs: number } | null>(null)

  function calculate() {
    const kcal = parseFloat(calories)
    const w = parseFloat(weight)
    if (!kcal || !w) return
    const g = goals.find((x) => x.key === goal)!
    const protein = Math.round(w * g.protein)
    const fat = Math.round(w * g.fat)
    const proteinKcal = protein * 4
    const fatKcal = fat * 9
    const carbs = Math.round((kcal - proteinKcal - fatKcal) / 4)
    setResult({ protein, fat, carbs: Math.max(carbs, 0) })
  }

  const inputClass = "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors"
  const labelClass = "block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
  const selectedGoal = goals.find((g) => g.key === goal)!

  const totalKcal = result ? result.protein * 4 + result.fat * 9 + result.carbs * 4 : 0

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
            Macro <span className="text-[#f5a623]">Planner</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Get your daily protein, carb, and fat targets based on your calorie goal and body weight.</p>
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 mb-6">

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>Daily Calories (kcal)</label>
              <input type="number" value={calories} onChange={(e) => { setCalories(e.target.value); setResult(null) }} placeholder="e.g. 2200" className={inputClass} />
              <p className="text-gray-600 text-xs mt-1">Use the Calorie Calculator to find yours</p>
            </div>
            <div>
              <label className={labelClass}>Body Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => { setWeight(e.target.value); setResult(null) }} placeholder="e.g. 75" className={inputClass} />
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass}>Your Goal</label>
            <div className="space-y-2">
              {goals.map((g) => (
                <button key={g.key} onClick={() => { setGoal(g.key); setResult(null) }}
                  className={`w-full text-left px-4 py-3 rounded border transition-colors ${goal === g.key ? "border-[#f5a623] bg-[#f5a623]/10 text-white" : "border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}
                >
                  <span className="font-bold text-sm">{g.label}</span>
                  <span className="text-xs ml-2 opacity-70">— {g.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">
            Calculate Macros
          </button>
        </div>

        {result && (
          <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-6 sm:p-8 mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">Daily Macro Targets — {selectedGoal.label}</p>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Protein", val: result.protein, kcal: result.protein * 4, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
                { label: "Carbs", val: result.carbs, kcal: result.carbs * 4, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
                { label: "Fat", val: result.fat, kcal: result.fat * 9, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
              ].map((m) => (
                <div key={m.label} className={`rounded-lg p-4 text-center border ${m.bg}`}>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{m.label}</p>
                  <p className={`text-3xl font-bold ${m.color}`} style={{ fontFamily: "var(--font-display)" }}>{m.val}g</p>
                  <p className="text-gray-500 text-xs mt-1">{m.kcal} kcal</p>
                </div>
              ))}
            </div>

            {/* Visual bar */}
            <div className="mb-5">
              <div className="flex rounded overflow-hidden h-3">
                <div className="bg-blue-400 transition-all" style={{ width: `${(result.protein * 4 / totalKcal) * 100}%` }} />
                <div className="bg-yellow-400 transition-all" style={{ width: `${(result.carbs * 4 / totalKcal) * 100}%` }} />
                <div className="bg-orange-400 transition-all" style={{ width: `${(result.fat * 9 / totalKcal) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Protein {Math.round((result.protein * 4 / totalKcal) * 100)}%</span>
                <span>Carbs {Math.round((result.carbs * 4 / totalKcal) * 100)}%</span>
                <span>Fat {Math.round((result.fat * 9 / totalKcal) * 100)}%</span>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-white font-bold text-sm mb-1">Need help hitting your macros?</p>
              <p className="text-gray-400 text-xs mb-3">Our nutrition-certified trainers at Safa Fitness Club can create a complete meal plan around your targets.</p>
              <div className="flex gap-3">
                <Link href="/pricing" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Join Now</Link>
                <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
          <p className="text-white font-bold text-sm uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>How It Works</p>
          <p className="text-gray-400 text-xs leading-relaxed">Protein and fat are calculated per kg of body weight based on your goal. Remaining calories are filled with carbohydrates. Protein: 4 kcal/g · Carbs: 4 kcal/g · Fat: 9 kcal/g. These are evidence-based starting points — adjust based on how your body responds over 2–4 weeks.</p>
        </div>
      </div>
    </div>
  )
}
