"use client"

import { useState } from "react"
import Link from "next/link"

const maleCats = [
  { label: "Essential Fat", min: 2, max: 6, color: "text-blue-400" },
  { label: "Athletic", min: 6, max: 14, color: "text-green-400" },
  { label: "Fitness", min: 14, max: 18, color: "text-yellow-400" },
  { label: "Average", min: 18, max: 25, color: "text-orange-400" },
  { label: "Obese", min: 25, max: Infinity, color: "text-red-400" },
]
const femaleCats = [
  { label: "Essential Fat", min: 10, max: 14, color: "text-blue-400" },
  { label: "Athletic", min: 14, max: 21, color: "text-green-400" },
  { label: "Fitness", min: 21, max: 25, color: "text-yellow-400" },
  { label: "Average", min: 25, max: 32, color: "text-orange-400" },
  { label: "Obese", min: 32, max: Infinity, color: "text-red-400" },
]

function getBodyFatCategory(bf: number, gender: string) {
  const cats = gender === "male" ? maleCats : femaleCats
  return cats.find((c) => bf >= c.min && bf < c.max) ?? cats[cats.length - 1]
}

export default function BodyFatPage() {
  const [gender, setGender] = useState("male")
  const [form, setForm] = useState({ height: "", waist: "", neck: "", hip: "" })
  const [result, setResult] = useState<number | null>(null)

  function set(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }))
    setResult(null)
  }

  function calculate() {
    const h = parseFloat(form.height)
    const waist = parseFloat(form.waist)
    const neck = parseFloat(form.neck)
    if (!h || !waist || !neck) return
    let bf: number
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450
    } else {
      const hip = parseFloat(form.hip)
      if (!hip) return
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450
    }
    setResult(Math.round(bf * 10) / 10)
  }

  const inputClass = "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors"
  const labelClass = "block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
  const cat = result !== null ? getBodyFatCategory(result, gender) : null

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
            Body Fat <span className="text-[#f5a623]">Estimator</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">US Navy method — accurate to within 3–4% using only a tape measure.</p>
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8 mb-6">

          <div className="mb-5">
            <label className={labelClass}>Gender</label>
            <div className="flex bg-[#1a1a1a] rounded p-1 w-fit">
              {["male", "female"].map((g) => (
                <button key={g} onClick={() => { setGender(g); setResult(null) }}
                  className={`px-6 py-2.5 text-sm font-bold uppercase rounded transition-colors ${gender === g ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}
                >{g}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Height (cm)</label>
              <input type="number" value={form.height} onChange={(e) => set("height", e.target.value)} placeholder="e.g. 175" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Neck circumference (cm)</label>
              <input type="number" value={form.neck} onChange={(e) => set("neck", e.target.value)} placeholder="e.g. 38" className={inputClass} />
            </div>
          </div>

          <div className={`grid gap-4 mb-6 ${gender === "female" ? "grid-cols-2" : "grid-cols-1"}`}>
            <div>
              <label className={labelClass}>Waist circumference (cm)</label>
              <input type="number" value={form.waist} onChange={(e) => set("waist", e.target.value)} placeholder={gender === "male" ? "Measured at navel" : "Narrowest point"} className={inputClass} />
            </div>
            {gender === "female" && (
              <div>
                <label className={labelClass}>Hip circumference (cm)</label>
                <input type="number" value={form.hip} onChange={(e) => set("hip", e.target.value)} placeholder="Widest point" className={inputClass} />
              </div>
            )}
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-3 mb-5 text-xs text-gray-500">
            <strong className="text-gray-400">Measurement tips:</strong> Use a flexible tape measure. Measure waist at the navel (men) or narrowest point (women). Keep the tape horizontal and snug but not tight. Measure neck just below the larynx.
          </div>

          <button onClick={calculate} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">
            Estimate Body Fat
          </button>
        </div>

        {result !== null && cat && (
          <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-6 sm:p-8 mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Estimated Body Fat</p>
            <div className="flex items-end gap-3 mb-5">
              <span className="text-6xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result}%</span>
              <span className={`text-xl font-bold uppercase mb-1 ${cat.color}`}>{cat.label}</span>
            </div>

            <div className="space-y-1.5 mb-6">
              {(gender === "male" ? maleCats : femaleCats).map((c) => (
                <div key={c.label} className={`flex justify-between items-center px-3 py-2 rounded text-xs ${cat.label === c.label ? "bg-[#f5a623] text-black font-bold" : "bg-[#1a1a1a] text-gray-500"}`}>
                  <span>{c.label}</span>
                  <span>{c.max === Infinity ? `${c.min}%+` : `${c.min}–${c.max}%`}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-white font-bold text-sm mb-1">Want to improve your body composition?</p>
              <p className="text-gray-400 text-xs mb-3">Our trainers at Safa Fitness Club specialise in body transformation and fat loss programs tailored to your current stats.</p>
              <div className="flex gap-3">
                <Link href="/trainers" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Meet Trainers</Link>
                <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
          <p className="text-white font-bold text-sm uppercase mb-2" style={{ fontFamily: "var(--font-display)" }}>About This Method</p>
          <p className="text-gray-400 text-xs leading-relaxed">The US Navy circumference method has a margin of error of approximately 3–4%. It is a validated estimation technique used widely in fitness and military contexts. For precise measurement, DEXA scans or hydrostatic weighing are more accurate alternatives.</p>
        </div>
      </div>
    </div>
  )
}
