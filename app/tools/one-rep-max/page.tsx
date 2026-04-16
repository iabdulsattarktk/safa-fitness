"use client"

import { useState } from "react"
import Link from "next/link"

const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50]

export default function OneRepMaxPage() {
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [unit, setUnit] = useState<"kg" | "lbs">("kg")
  const [result, setResult] = useState<number | null>(null)

  function calculate() {
    const w = parseFloat(weight)
    const r = parseFloat(reps)
    if (!w || !r || r < 1) return
    // Epley formula
    const orm = r === 1 ? w : w * (1 + r / 30)
    setResult(Math.round(orm * 10) / 10)
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
            One Rep <span className="text-[#f5a623]">Max</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Estimate your maximum single-rep strength using the Epley formula.</p>
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 mb-6">

          <div className="flex bg-[#1a1a1a] rounded p-1 mb-5 w-fit">
            {(["kg", "lbs"] as const).map((u) => (
              <button key={u} onClick={() => { setUnit(u); setResult(null) }}
                className={`px-5 py-2 text-sm font-bold uppercase rounded transition-colors ${unit === u ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}
              >{u}</button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className={labelClass}>Weight lifted ({unit})</label>
              <input type="number" value={weight} onChange={(e) => { setWeight(e.target.value); setResult(null) }} placeholder={unit === "kg" ? "e.g. 100" : "e.g. 225"} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Reps performed</label>
              <input type="number" value={reps} onChange={(e) => { setReps(e.target.value); setResult(null) }} placeholder="e.g. 5" min={1} max={20} className={inputClass} />
              <p className="text-gray-600 text-xs mt-1">Most accurate at 1–10 reps</p>
            </div>
          </div>

          <button onClick={calculate} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">
            Calculate 1RM
          </button>
        </div>

        {result !== null && (
          <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-6 sm:p-8 mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Estimated 1 Rep Max</p>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-6xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result}</span>
              <span className="text-xl text-[#f5a623] font-bold mb-1">{unit}</span>
            </div>

            <p className="text-white font-bold text-sm uppercase mb-3" style={{ fontFamily: "var(--font-display)" }}>Training Percentages</p>
            <div className="overflow-hidden rounded-lg border border-[#2a2a2a] mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase tracking-wider font-semibold">% of 1RM</th>
                    <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase tracking-wider font-semibold">Weight ({unit})</th>
                    <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase tracking-wider font-semibold">Rep Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {percentages.map((pct) => {
                    const repRanges: Record<number, string> = { 100: "1", 95: "2", 90: "3", 85: "4–5", 80: "6", 75: "8–10", 70: "10–12", 65: "12–15", 60: "15–20", 55: "20–25", 50: "25+" }
                    return (
                      <tr key={pct} className={pct === 100 ? "bg-[#f5a623]/10" : ""}>
                        <td className={`px-4 py-2.5 font-bold text-sm ${pct === 100 ? "text-[#f5a623]" : "text-white"}`}>{pct}%</td>
                        <td className="px-4 py-2.5 text-gray-300">{Math.round(result * pct / 100 * 10) / 10}</td>
                        <td className="px-4 py-2.5 text-gray-400 text-xs">{repRanges[pct]} reps</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-white font-bold text-sm mb-1">Train smarter with a certified coach</p>
              <p className="text-gray-400 text-xs mb-3">Safa Fitness Club's strength trainers design progressive programs built around your 1RM and goals.</p>
              <div className="flex gap-3">
                <Link href="/pricing" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Join Now</Link>
                <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
          <p className="text-white font-bold text-sm uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>About the Epley Formula</p>
          <p className="text-gray-400 text-xs leading-relaxed">Formula: 1RM = Weight × (1 + Reps ÷ 30). Most accurate when the rep count is between 1 and 10. Beyond 10 reps, accuracy decreases. Never attempt a true 1RM without a spotter and proper warm-up.</p>
        </div>
      </div>
    </div>
  )
}
