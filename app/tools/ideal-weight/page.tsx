"use client"

import { useState } from "react"
import Link from "next/link"

export default function IdealWeightPage() {
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("male")
  const [result, setResult] = useState<{ devine: number; robinson: number; miller: number; hamwi: number } | null>(null)

  function calculate() {
    const h = parseFloat(height)
    if (!h || h < 140) return
    const inchesOver5ft = (h / 2.54) - 60
    let devine: number, robinson: number, miller: number, hamwi: number

    if (gender === "male") {
      devine   = 50.0 + 2.3  * inchesOver5ft
      robinson = 52.0 + 1.9  * inchesOver5ft
      miller   = 56.2 + 1.41 * inchesOver5ft
      hamwi    = 48.0 + 2.7  * inchesOver5ft
    } else {
      devine   = 45.5 + 2.3  * inchesOver5ft
      robinson = 49.0 + 1.7  * inchesOver5ft
      miller   = 53.1 + 1.36 * inchesOver5ft
      hamwi    = 45.5 + 2.2  * inchesOver5ft
    }

    setResult({
      devine:   Math.round(devine  * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      miller:   Math.round(miller  * 10) / 10,
      hamwi:    Math.round(hamwi   * 10) / 10,
    })
  }

  const avg = result ? Math.round(((result.devine + result.robinson + result.miller + result.hamwi) / 4) * 10) / 10 : null

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
            Ideal <span className="text-[#f5a623]">Weight</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">See your ideal weight range based on four well-established medical formulas.</p>
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 mb-6">
          <div className="mb-5">
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Gender</label>
            <div className="flex bg-[#1a1a1a] rounded p-1 w-fit">
              {["male", "female"].map((g) => (
                <button key={g} onClick={() => { setGender(g); setResult(null) }}
                  className={`px-6 py-2.5 text-sm font-bold uppercase rounded transition-colors ${gender === g ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}
                >{g}</button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => { setHeight(e.target.value); setResult(null) }}
              placeholder="e.g. 175"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors"
            />
          </div>

          <button onClick={calculate} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">
            Calculate Ideal Weight
          </button>
        </div>

        {result && avg !== null && (
          <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-6 sm:p-8 mb-6">
            {/* Average highlight */}
            <div className="text-center mb-6 pb-6 border-b border-[#2a2a2a]">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Average Ideal Weight</p>
              <span className="text-6xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{avg}</span>
              <span className="text-xl text-[#f5a623] font-bold ml-2">kg</span>
              <p className="text-gray-500 text-xs mt-2">Average of four formulas below</p>
            </div>

            {/* Formula breakdown */}
            <p className="text-white font-bold text-sm uppercase mb-3" style={{ fontFamily: "var(--font-display)" }}>By Formula</p>
            <div className="space-y-2 mb-6">
              {[
                { name: "Devine Formula", val: result.devine, note: "Most widely used in clinical settings" },
                { name: "Robinson Formula", val: result.robinson, note: "Modified version of Devine" },
                { name: "Miller Formula", val: result.miller, note: "Tends to suggest lower weights" },
                { name: "Hamwi Formula", val: result.hamwi, note: "Used in nutritional assessments" },
              ].map((f) => (
                <div key={f.name} className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <p className="text-white text-sm font-semibold">{f.name}</p>
                    <p className="text-gray-500 text-xs">{f.note}</p>
                  </div>
                  <span className="text-[#f5a623] font-bold text-lg">{f.val} kg</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-white font-bold text-sm mb-1">Build a plan to reach your ideal weight</p>
              <p className="text-gray-400 text-xs mb-3">Our trainers at Safa Fitness Club can create a personalised program to help you reach and maintain your goal weight safely.</p>
              <div className="flex gap-3">
                <Link href="/pricing" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Join Now</Link>
                <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
          <p className="text-white font-bold text-sm uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>Important Note</p>
          <p className="text-gray-400 text-xs leading-relaxed">These formulas were developed for general population averages and do not account for muscle mass, frame size, or ethnicity. They are useful reference points, not definitive targets. Athletes, bodybuilders, and highly muscular individuals will naturally exceed these ranges without any health concern.</p>
        </div>
      </div>
    </div>
  )
}
