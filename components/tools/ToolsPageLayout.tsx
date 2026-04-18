"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// ─── Shared styles ────────────────────────────────────────────────────────────
const inp = "w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white text-sm rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors"
const lbl = "block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
const selectBtn = (active: boolean) =>
  `px-4 py-2 text-xs font-bold uppercase tracking-wide rounded transition-all ${
    active ? "bg-[#f5a623] text-black" : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]"
  }`

function ReportCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-[#f5a623]/30 rounded-xl p-5 mt-5">
      {children}
    </div>
  )
}

function CTABlock() {
  return (
    <div className="mt-6 p-5 bg-[#141414] rounded-xl border border-[#2a2a2a]">
      <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Ready to act on your results?</p>
      <p className="text-white font-bold text-base mb-1">Train with Safa Fitness Club experts</p>
      <p className="text-gray-400 text-sm mb-4">Our certified trainers build personalised programs around your exact stats and goals.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/pricing" className="px-5 py-2.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">
          View Memberships
        </Link>
        <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">
          WhatsApp Us
        </a>
      </div>
    </div>
  )
}

// ─── 1. BMI Calculator ────────────────────────────────────────────────────────
const bmiFormulas = [
  { key: "standard", label: "Standard BMI", desc: "WHO Standard — weight(kg) / height(m)²" },
  { key: "prime",    label: "BMI Prime",    desc: "Ratio to upper healthy limit (25)" },
]
const bmiCats = [
  { label: "Severe Underweight", range: "< 16",     min: 0,    max: 16,   color: "text-purple-400", risk: "Very High Risk" },
  { label: "Underweight",        range: "16 – 18.4", min: 16,   max: 18.5, color: "text-blue-400",   risk: "Elevated Risk" },
  { label: "Normal",             range: "18.5 – 24.9",min:18.5, max: 25,   color: "text-green-400",  risk: "Lowest Risk" },
  { label: "Overweight",         range: "25 – 29.9", min: 25,   max: 30,   color: "text-yellow-400", risk: "Elevated Risk" },
  { label: "Obese Class I",      range: "30 – 34.9", min: 30,   max: 35,   color: "text-orange-400", risk: "High Risk" },
  { label: "Obese Class II",     range: "35 – 39.9", min: 35,   max: 40,   color: "text-red-400",    risk: "Very High Risk" },
  { label: "Obese Class III",    range: "≥ 40",      min: 40,   max: Infinity, color: "text-red-600",risk: "Extreme Risk" },
]
function getBmiCat(bmi: number) { return bmiCats.find(c => bmi >= c.min && bmi < c.max) ?? bmiCats[bmiCats.length - 1] }

function BmiCalc() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [formula, setFormula] = useState("standard")
  const [h, setH] = useState(""); const [w, setW] = useState("")
  const [ft, setFt] = useState(""); const [inch, setInch] = useState(""); const [lbs, setLbs] = useState("")
  const [result, setResult] = useState<{ bmi: number; prime: number; heightM: number; weightKg: number } | null>(null)

  function calc() {
    let heightM: number, weightKg: number
    if (unit === "metric") {
      heightM = parseFloat(h) / 100; weightKg = parseFloat(w)
    } else {
      heightM = (parseFloat(ft) * 12 + parseFloat(inch || "0")) * 0.0254
      weightKg = parseFloat(lbs) * 0.453592
    }
    if (!heightM || !weightKg || heightM < 0.5) return
    const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10
    setResult({ bmi, prime: Math.round((bmi / 25) * 100) / 100, heightM, weightKg })
  }

  const cat = result ? getBmiCat(result.bmi) : null
  const loWt = result ? Math.round(18.5 * result.heightM * result.heightM * 10) / 10 : 0
  const hiWt = result ? Math.round(24.9 * result.heightM * result.heightM * 10) / 10 : 0

  return (
    <div className="space-y-6">
      {/* Formula selector */}
      <div>
        <p className={lbl}>Formula</p>
        <div className="flex flex-wrap gap-2">
          {bmiFormulas.map(f => (
            <button key={f.key} onClick={() => setFormula(f.key)} className={selectBtn(formula === f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-2">{bmiFormulas.find(f => f.key === formula)?.desc}</p>
      </div>

      {/* Unit toggle */}
      <div className="flex bg-[#1a1a1a] rounded-lg p-1 w-fit border border-[#2a2a2a]">
        {(["metric", "imperial"] as const).map(u => (
          <button key={u} onClick={() => { setUnit(u); setResult(null) }}
            className={`px-5 py-2 text-sm font-bold uppercase rounded-md transition-colors ${unit === u ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}>
            {u === "metric" ? "Metric" : "Imperial"}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-4">
        {unit === "metric" ? (
          <>
            <div><label className={lbl}>Height (cm)</label><input type="number" value={h} onChange={e => { setH(e.target.value); setResult(null) }} placeholder="e.g. 175" className={inp} /></div>
            <div><label className={lbl}>Weight (kg)</label><input type="number" value={w} onChange={e => { setW(e.target.value); setResult(null) }} placeholder="e.g. 70" className={inp} /></div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lbl}>Feet</label><input type="number" value={ft} onChange={e => { setFt(e.target.value); setResult(null) }} placeholder="5" className={inp} /></div>
              <div><label className={lbl}>Inches</label><input type="number" value={inch} onChange={e => { setInch(e.target.value); setResult(null) }} placeholder="9" className={inp} /></div>
            </div>
            <div><label className={lbl}>Weight (lbs)</label><input type="number" value={lbs} onChange={e => { setLbs(e.target.value); setResult(null) }} placeholder="154" className={inp} /></div>
          </>
        )}
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate BMI
      </button>

      {/* Result */}
      {result && cat && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">BMI Score</p>
              <p className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{result.bmi}</p>
              <p className={`text-sm font-bold uppercase ${cat.color}`}>{cat.label}</p>
              <p className="text-gray-500 text-xs mt-1">{cat.risk}</p>
            </div>
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">BMI Prime</p>
              <p className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{result.prime}</p>
              <p className="text-gray-400 text-sm">{result.prime < 1 ? "Below" : result.prime === 1 ? "At" : "Above"} healthy upper limit</p>
              <p className="text-gray-500 text-xs mt-1">Healthy range: 0.74 – 1.00</p>
            </div>
          </div>

          {/* Category bar */}
          <div className="mb-5">
            <p className={lbl}>WHO Classifications</p>
            <div className="space-y-1.5">
              {bmiCats.map(c => (
                <div key={c.label} className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs transition-all ${cat.label === c.label ? "bg-[#f5a623] text-black font-bold scale-[1.01]" : "bg-[#141414] text-gray-500 border border-[#2a2a2a]"}`}>
                  <span>{c.label}</span>
                  <span className="font-mono">{c.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Healthy weight range */}
          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a] mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Your Healthy Weight Range</p>
            <p className="text-white font-bold text-lg">
              {loWt} – {hiWt} kg <span className="text-gray-500 text-sm font-normal">for your height</span>
            </p>
            {result.weightKg < loWt && <p className="text-blue-400 text-xs mt-1">You are {Math.round((loWt - result.weightKg) * 10) / 10} kg below the healthy range.</p>}
            {result.weightKg > hiWt && <p className="text-orange-400 text-xs mt-1">You are {Math.round((result.weightKg - hiWt) * 10) / 10} kg above the healthy range.</p>}
            {result.weightKg >= loWt && result.weightKg <= hiWt && <p className="text-green-400 text-xs mt-1">You are within a healthy weight range.</p>}
          </div>

          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Important Note</p>
            <p className="text-gray-400 text-sm">BMI does not account for muscle mass, bone density, or fat distribution. Athletes and highly muscular individuals may have high BMI scores without excess body fat.</p>
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 2. Calorie Calculator ────────────────────────────────────────────────────
const calorieFormulas = [
  { key: "mifflin", label: "Mifflin-St Jeor", desc: "Most accurate for most people (1990)" },
  { key: "harris",  label: "Harris-Benedict", desc: "Classic formula, revised 1984 (Roza-Shizgal)" },
  { key: "katch",   label: "Katch-McArdle",   desc: "Most accurate if you know your body fat %" },
]
const activityLevels = [
  { label: "Sedentary",         desc: "Little or no exercise",              multiplier: 1.2   },
  { label: "Lightly Active",    desc: "Light exercise 1–3 days/week",       multiplier: 1.375 },
  { label: "Moderately Active", desc: "Moderate exercise 3–5 days/week",    multiplier: 1.55  },
  { label: "Very Active",       desc: "Hard exercise 6–7 days/week",        multiplier: 1.725 },
  { label: "Extra Active",      desc: "Very hard exercise + physical job",   multiplier: 1.9   },
]

function CalorieCalc() {
  const [formula, setFormula] = useState("mifflin")
  const [form, setForm] = useState({ age: "", gender: "male", height: "", weight: "", bodyFat: "", activity: 1.55 })
  const [result, setResult] = useState<{ bmr: number; tdee: number; formulaName: string } | null>(null)
  function set(k: string, v: string | number) { setForm(p => ({ ...p, [k]: v })); setResult(null) }

  function calc() {
    const age = parseFloat(form.age), h = parseFloat(form.height), w = parseFloat(form.weight)
    let bmr: number
    if (formula === "mifflin") {
      if (!age || !h || !w) return
      bmr = form.gender === "male" ? 10 * w + 6.25 * h - 5 * age + 5 : 10 * w + 6.25 * h - 5 * age - 161
    } else if (formula === "harris") {
      if (!age || !h || !w) return
      bmr = form.gender === "male"
        ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * age
        : 447.593 + 9.247 * w + 3.098 * h - 4.330 * age
    } else {
      const bf = parseFloat(form.bodyFat)
      if (!w || !bf) return
      const lbm = w * (1 - bf / 100)
      bmr = 370 + 21.6 * lbm
    }
    setResult({ bmr: Math.round(bmr), tdee: Math.round(bmr * form.activity), formulaName: calorieFormulas.find(f => f.key === formula)?.label ?? "" })
  }

  return (
    <div className="space-y-6">
      {/* Formula */}
      <div>
        <p className={lbl}>Formula</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {calorieFormulas.map(f => (
            <button key={f.key} onClick={() => { setFormula(f.key); setResult(null) }} className={selectBtn(formula === f.key)}>{f.label}</button>
          ))}
        </div>
        <p className="text-gray-600 text-xs">{calorieFormulas.find(f => f.key === formula)?.desc}</p>
      </div>

      {/* Inputs */}
      {formula !== "katch" ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Age (years)</label><input type="number" value={form.age} onChange={e => set("age", e.target.value)} placeholder="28" className={inp} /></div>
          <div>
            <label className={lbl}>Gender</label>
            <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#2a2a2a]">
              {["male", "female"].map(g => (
                <button key={g} onClick={() => set("gender", g)} className={`flex-1 py-2.5 text-sm font-bold uppercase rounded-md transition-colors ${form.gender === g ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div><label className={lbl}>Height (cm)</label><input type="number" value={form.height} onChange={e => set("height", e.target.value)} placeholder="175" className={inp} /></div>
          <div><label className={lbl}>Weight (kg)</label><input type="number" value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="70" className={inp} /></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Weight (kg)</label><input type="number" value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="70" className={inp} /></div>
          <div>
            <label className={lbl}>Body Fat %</label>
            <input type="number" value={form.bodyFat} onChange={e => set("bodyFat", e.target.value)} placeholder="15" className={inp} />
            <p className="text-gray-600 text-xs mt-1">Use the Body Fat Estimator above</p>
          </div>
        </div>
      )}

      {/* Activity */}
      <div>
        <label className={lbl}>Activity Level</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {activityLevels.map(a => (
            <button key={a.multiplier} onClick={() => set("activity", a.multiplier)}
              className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${form.activity === a.multiplier ? "border-[#f5a623] bg-[#f5a623]/10 text-white" : "border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}>
              <p className="font-semibold">{a.label}</p>
              <p className="text-xs opacity-60 mt-0.5">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate Calories
      </button>

      {/* Result */}
      {result && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report — {result.formulaName}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Basal Metabolic Rate</p>
              <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.bmr}</p>
              <p className="text-gray-500 text-xs mt-1">kcal/day at complete rest</p>
            </div>
            <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Maintenance Calories</p>
              <p className="text-4xl font-bold text-[#f5a623]" style={{ fontFamily: "var(--font-display)" }}>{result.tdee}</p>
              <p className="text-gray-500 text-xs mt-1">kcal/day for current weight</p>
            </div>
          </div>

          <p className={lbl}>Goal-Based Targets</p>
          <div className="space-y-2 mb-5">
            {[
              { label: "Aggressive Fat Loss", kcal: result.tdee - 700, note: "−700 kcal · Not recommended long-term", color: "text-red-400" },
              { label: "Moderate Fat Loss",   kcal: result.tdee - 400, note: "−400 kcal · ~1.6 kg/month",             color: "text-yellow-400" },
              { label: "Slow Fat Loss",       kcal: result.tdee - 200, note: "−200 kcal · Easiest to sustain",        color: "text-blue-400" },
              { label: "Maintenance",          kcal: result.tdee,       note: "Keep current weight",                  color: "text-green-400" },
              { label: "Lean Bulk",            kcal: result.tdee + 250, note: "+250 kcal · Minimal fat gain",         color: "text-orange-400" },
              { label: "Aggressive Bulk",      kcal: result.tdee + 500, note: "+500 kcal · Faster muscle gain",       color: "text-purple-400" },
            ].map(g => (
              <div key={g.label} className="flex items-center justify-between px-4 py-3 bg-[#141414] rounded-lg border border-[#2a2a2a]">
                <div>
                  <p className="text-white text-sm font-semibold">{g.label}</p>
                  <p className="text-gray-500 text-xs">{g.note}</p>
                </div>
                <span className={`font-bold text-base ${g.color}`}>{g.kcal} kcal</span>
              </div>
            ))}
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 3. Body Fat Estimator ────────────────────────────────────────────────────
const bfMethods = [
  { key: "navy",    label: "US Navy",        desc: "Tape measure method — accurate to ±3–4%." },
  { key: "bmi",     label: "BMI-Based",      desc: "Uses BMI to estimate body fat % (Deurenberg formula)." },
]
const maleBfCats = [
  { label: "Essential Fat", min: 2,  max: 6,        color: "text-blue-400",   risk: "Minimum for survival" },
  { label: "Athletic",      min: 6,  max: 14,       color: "text-green-400",  risk: "Elite athlete range" },
  { label: "Fitness",       min: 14, max: 18,       color: "text-teal-400",   risk: "Excellent condition" },
  { label: "Average",       min: 18, max: 25,       color: "text-yellow-400", risk: "Acceptable range" },
  { label: "Above Average", min: 25, max: 32,       color: "text-orange-400", risk: "Elevated health risk" },
  { label: "Obese",         min: 32, max: Infinity, color: "text-red-400",    risk: "High health risk" },
]
const femaleBfCats = [
  { label: "Essential Fat", min: 10, max: 14,       color: "text-blue-400",   risk: "Minimum for survival" },
  { label: "Athletic",      min: 14, max: 21,       color: "text-green-400",  risk: "Elite athlete range" },
  { label: "Fitness",       min: 21, max: 25,       color: "text-teal-400",   risk: "Excellent condition" },
  { label: "Average",       min: 25, max: 32,       color: "text-yellow-400", risk: "Acceptable range" },
  { label: "Above Average", min: 32, max: 38,       color: "text-orange-400", risk: "Elevated health risk" },
  { label: "Obese",         min: 38, max: Infinity, color: "text-red-400",    risk: "High health risk" },
]
function getBfCat(bf: number, g: string) {
  const cats = g === "male" ? maleBfCats : femaleBfCats
  return cats.find(c => bf >= c.min && bf < c.max) ?? cats[cats.length - 1]
}

function BodyFatCalc() {
  const [method, setMethod] = useState("navy")
  const [gender, setGender] = useState("male")
  const [form, setForm] = useState({ height: "", waist: "", neck: "", hip: "", weight: "", age: "" })
  const [result, setResult] = useState<{ bf: number; lbm: number; fatMass: number } | null>(null)
  function setF(k: string, v: string) { setForm(p => ({ ...p, [k]: v })); setResult(null) }

  function calc() {
    const h = parseFloat(form.height)
    let bf: number
    if (method === "navy") {
      const waist = parseFloat(form.waist), neck = parseFloat(form.neck)
      if (!h || !waist || !neck) return
      if (gender === "male") {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450
      } else {
        const hip = parseFloat(form.hip); if (!hip) return
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450
      }
    } else {
      const w = parseFloat(form.weight), age = parseFloat(form.age)
      if (!h || !w || !age) return
      const bmi = w / ((h / 100) ** 2)
      bf = 1.2 * bmi + 0.23 * age - 10.8 * (gender === "male" ? 1 : 0) - 5.4
    }
    const w = parseFloat(form.weight) || 0
    const bfRound = Math.round(bf * 10) / 10
    setResult({ bf: bfRound, lbm: w ? Math.round((w * (1 - bf / 100)) * 10) / 10 : 0, fatMass: w ? Math.round((w * bf / 100) * 10) / 10 : 0 })
  }

  const cat = result ? getBfCat(result.bf, gender) : null

  return (
    <div className="space-y-6">
      <div>
        <p className={lbl}>Method</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {bfMethods.map(m => (
            <button key={m.key} onClick={() => { setMethod(m.key); setResult(null) }} className={selectBtn(method === m.key)}>{m.label}</button>
          ))}
        </div>
        <p className="text-gray-600 text-xs">{bfMethods.find(m => m.key === method)?.desc}</p>
      </div>

      <div>
        <label className={lbl}>Gender</label>
        <div className="flex bg-[#1a1a1a] rounded-lg p-1 w-fit border border-[#2a2a2a]">
          {["male", "female"].map(g => (
            <button key={g} onClick={() => { setGender(g); setResult(null) }}
              className={`px-6 py-2 text-sm font-bold uppercase rounded-md transition-colors ${gender === g ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}>{g}</button>
          ))}
        </div>
      </div>

      {method === "navy" ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lbl}>Height (cm)</label><input type="number" value={form.height} onChange={e => setF("height", e.target.value)} placeholder="175" className={inp} /></div>
          <div><label className={lbl}>Neck (cm)</label><input type="number" value={form.neck} onChange={e => setF("neck", e.target.value)} placeholder="38" className={inp} /></div>
          <div>
            <label className={lbl}>Waist (cm)</label>
            <input type="number" value={form.waist} onChange={e => setF("waist", e.target.value)} placeholder={gender === "male" ? "At navel" : "Narrowest point"} className={inp} />
          </div>
          {gender === "female" && (
            <div><label className={lbl}>Hip (cm)</label><input type="number" value={form.hip} onChange={e => setF("hip", e.target.value)} placeholder="Widest point" className={inp} /></div>
          )}
          <div className="sm:col-span-2"><label className={lbl}>Body Weight (kg) <span className="text-gray-600 normal-case">(optional — for LBM)</span></label><input type="number" value={form.weight} onChange={e => setF("weight", e.target.value)} placeholder="70" className={inp} /></div>
          <div className="bg-[#141414] rounded-lg p-3 sm:col-span-2 border border-[#2a2a2a]">
            <p className="text-gray-500 text-xs"><strong className="text-gray-400">Measurement tips:</strong> Waist = at navel (men) or narrowest point (women). Neck = just below the larynx. Keep tape horizontal and snug.</p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className={lbl}>Height (cm)</label><input type="number" value={form.height} onChange={e => setF("height", e.target.value)} placeholder="175" className={inp} /></div>
          <div><label className={lbl}>Weight (kg)</label><input type="number" value={form.weight} onChange={e => setF("weight", e.target.value)} placeholder="70" className={inp} /></div>
          <div><label className={lbl}>Age (years)</label><input type="number" value={form.age} onChange={e => setF("age", e.target.value)} placeholder="28" className={inp} /></div>
        </div>
      )}

      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Estimate Body Fat
      </button>

      {result && cat && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Body Fat %</p>
              <p className={`text-4xl font-bold ${cat.color}`} style={{ fontFamily: "var(--font-display)" }}>{result.bf}%</p>
              <p className={`text-xs font-bold uppercase mt-1 ${cat.color}`}>{cat.label}</p>
            </div>
            {result.lbm > 0 && (
              <>
                <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Lean Body Mass</p>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.lbm}</p>
                  <p className="text-gray-500 text-xs mt-1">kg of muscle, bone & organs</p>
                </div>
                <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Fat Mass</p>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.fatMass}</p>
                  <p className="text-gray-500 text-xs mt-1">kg of body fat</p>
                </div>
              </>
            )}
          </div>

          <p className={lbl}>Body Fat Categories ({gender})</p>
          <div className="space-y-1.5 mb-4">
            {(gender === "male" ? maleBfCats : femaleBfCats).map(c => (
              <div key={c.label} className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs ${cat.label === c.label ? "bg-[#f5a623] text-black font-bold" : "bg-[#141414] text-gray-500 border border-[#2a2a2a]"}`}>
                <span>{c.label}</span>
                <span className="font-mono">{c.max === Infinity ? `${c.min}%+` : `${c.min}–${c.max}%`}</span>
                <span className="hidden sm:block opacity-70">{c.risk}</span>
              </div>
            ))}
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 4. Macro Planner ─────────────────────────────────────────────────────────
const macroSplits = [
  { key: "fat-loss",  label: "Fat Loss",    p: 40, c: 35, f: 25, desc: "High protein preserves muscle in a deficit." },
  { key: "maintain",  label: "Maintenance", p: 30, c: 40, f: 30, desc: "Balanced split for sustaining current weight." },
  { key: "muscle",    label: "Muscle Gain", p: 30, c: 50, f: 20, desc: "Higher carbs fuel training and recovery." },
  { key: "keto",      label: "Keto",        p: 35, c: 5,  f: 60, desc: "Very low carb, high fat — ketogenic approach." },
  { key: "low-carb",  label: "Low Carb",    p: 35, c: 25, f: 40, desc: "Reduced carbs with moderate fat." },
  { key: "custom",    label: "Custom %",    p: 0,  c: 0,  f: 0,  desc: "Set your own protein / carb / fat percentages." },
]

function MacroCalc() {
  const [split, setSplit] = useState("fat-loss")
  const [calories, setCalories] = useState("")
  const [weight, setWeight] = useState("")
  const [custom, setCustom] = useState({ p: "40", c: "35", f: "25" })
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number; totalKcal: number } | null>(null)

  function calc() {
    const kcal = parseFloat(calories)
    if (!kcal) return
    const s = macroSplits.find(x => x.key === split)!
    let pPct = s.p, cPct = s.c, fPct = s.f
    if (split === "custom") {
      pPct = parseFloat(custom.p) || 0; cPct = parseFloat(custom.c) || 0; fPct = parseFloat(custom.f) || 0
      if (Math.abs(pPct + cPct + fPct - 100) > 1) return
    }
    const protein = Math.round(kcal * pPct / 100 / 4)
    const carbs = Math.round(kcal * cPct / 100 / 4)
    const fat = Math.round(kcal * fPct / 100 / 9)
    setResult({ protein, carbs, fat, totalKcal: protein * 4 + carbs * 4 + fat * 9 })
  }

  const activeSplit = macroSplits.find(s => s.key === split)!

  return (
    <div className="space-y-6">
      <div>
        <p className={lbl}>Macro Split</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
          {macroSplits.map(s => (
            <button key={s.key} onClick={() => { setSplit(s.key); setResult(null) }}
              className={`text-left px-3 py-2.5 rounded-lg border text-xs transition-colors ${split === s.key ? "border-[#f5a623] bg-[#f5a623]/10 text-white" : "border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}>
              <p className="font-bold">{s.label}</p>
              {s.key !== "custom" && <p className="opacity-60 text-[10px] mt-0.5">{s.p}P · {s.c}C · {s.f}F</p>}
            </button>
          ))}
        </div>
        {split !== "custom" && <p className="text-gray-600 text-xs">{activeSplit.desc}</p>}
      </div>

      {split === "custom" && (
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]">
          <div>
            <label className={lbl}>Protein %</label>
            <input type="number" value={custom.p} onChange={e => setCustom(p => ({ ...p, p: e.target.value }))} className={inp} placeholder="40" />
          </div>
          <div>
            <label className={lbl}>Carbs %</label>
            <input type="number" value={custom.c} onChange={e => setCustom(p => ({ ...p, c: e.target.value }))} className={inp} placeholder="35" />
          </div>
          <div>
            <label className={lbl}>Fat %</label>
            <input type="number" value={custom.f} onChange={e => setCustom(p => ({ ...p, f: e.target.value }))} className={inp} placeholder="25" />
          </div>
          <p className="col-span-3 text-gray-600 text-xs">Must total 100%. Current total: {(parseFloat(custom.p) || 0) + (parseFloat(custom.c) || 0) + (parseFloat(custom.f) || 0)}%</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Daily Calories (kcal)</label>
          <input type="number" value={calories} onChange={e => { setCalories(e.target.value); setResult(null) }} placeholder="2200" className={inp} />
          <p className="text-gray-600 text-xs mt-1">Use the Calorie Calculator to find yours</p>
        </div>
        <div>
          <label className={lbl}>Body Weight (kg) <span className="text-gray-600 normal-case">(optional)</span></label>
          <input type="number" value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} placeholder="75" className={inp} />
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate Macros
      </button>

      {result && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report — {activeSplit.label}</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Protein", val: result.protein, kcal: result.protein * 4, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30", note: "4 kcal/g" },
              { label: "Carbs",   val: result.carbs,   kcal: result.carbs * 4,   color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", note: "4 kcal/g" },
              { label: "Fat",     val: result.fat,     kcal: result.fat * 9,     color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30", note: "9 kcal/g" },
            ].map(m => (
              <div key={m.label} className={`rounded-xl p-4 text-center border ${m.bg}`}>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-3xl font-bold ${m.color}`} style={{ fontFamily: "var(--font-display)" }}>{m.val}g</p>
                <p className="text-gray-500 text-xs mt-1">{m.kcal} kcal</p>
              </div>
            ))}
          </div>

          {/* Calorie bar */}
          <div className="flex rounded-full overflow-hidden h-3 mb-2">
            <div className="bg-blue-400 transition-all" style={{ width: `${(result.protein * 4 / result.totalKcal) * 100}%` }} />
            <div className="bg-yellow-400 transition-all" style={{ width: `${(result.carbs * 4 / result.totalKcal) * 100}%` }} />
            <div className="bg-orange-400 transition-all" style={{ width: `${(result.fat * 9 / result.totalKcal) * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-5">
            <span>Protein {Math.round(result.protein * 4 / result.totalKcal * 100)}%</span>
            <span>Carbs {Math.round(result.carbs * 4 / result.totalKcal * 100)}%</span>
            <span>Fat {Math.round(result.fat * 9 / result.totalKcal * 100)}%</span>
          </div>

          {/* Per-meal breakdown */}
          <p className={lbl}>Per-Meal Breakdown (3 meals / day)</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Protein", val: Math.round(result.protein / 3), color: "text-blue-400" },
              { label: "Carbs",   val: Math.round(result.carbs / 3),   color: "text-yellow-400" },
              { label: "Fat",     val: Math.round(result.fat / 3),     color: "text-orange-400" },
            ].map(m => (
              <div key={m.label} className="bg-[#141414] rounded-lg p-3 text-center border border-[#2a2a2a]">
                <p className="text-gray-500 text-xs">{m.label}</p>
                <p className={`text-xl font-bold ${m.color}`}>{m.val}g</p>
                <p className="text-gray-600 text-xs">per meal</p>
              </div>
            ))}
          </div>
          {weight && (
            <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a] mb-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Per kg of body weight</p>
              <div className="flex gap-6 text-sm">
                <span className="text-blue-400 font-bold">{Math.round(result.protein / parseFloat(weight) * 10) / 10}g protein/kg</span>
                <span className="text-yellow-400 font-bold">{Math.round(result.carbs / parseFloat(weight) * 10) / 10}g carbs/kg</span>
                <span className="text-orange-400 font-bold">{Math.round(result.fat / parseFloat(weight) * 10) / 10}g fat/kg</span>
              </div>
            </div>
          )}
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 5. One Rep Max ───────────────────────────────────────────────────────────
const ormFormulas = [
  { key: "epley",    label: "Epley",    fn: (w: number, r: number) => r === 1 ? w : w * (1 + r / 30),                      desc: "Most common formula worldwide." },
  { key: "brzycki",  label: "Brzycki",  fn: (w: number, r: number) => r === 1 ? w : w * (36 / (37 - r)),                    desc: "Very accurate for 2–10 reps." },
  { key: "lander",   label: "Lander",   fn: (w: number, r: number) => r === 1 ? w : (100 * w) / (101.3 - 2.67123 * r),     desc: "Popular in powerlifting." },
  { key: "lombardi", label: "Lombardi", fn: (w: number, r: number) => r === 1 ? w : w * Math.pow(r, 0.1),                   desc: "Tends to be conservative." },
  { key: "mayhew",   label: "Mayhew",   fn: (w: number, r: number) => r === 1 ? w : (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r)), desc: "Research-backed for bench press." },
]
const pcts = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50]
const repRanges: Record<number, string> = { 100: "1", 95: "2", 90: "3", 85: "4–5", 80: "6", 75: "8", 70: "10–12", 65: "12–15", 60: "15–20", 55: "20–25", 50: "25+" }

function OneRepMaxCalc() {
  const [formula, setFormula] = useState("all")
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [unit, setUnit] = useState<"kg" | "lbs">("kg")
  const [result, setResult] = useState<{ values: { key: string; label: string; val: number }[]; avg: number } | null>(null)

  function calc() {
    const w = parseFloat(weight), r = parseFloat(reps)
    if (!w || !r || r < 1 || r > 30) return
    const values = ormFormulas.map(f => ({ key: f.key, label: f.label, val: Math.round(f.fn(w, r) * 10) / 10 }))
    const avg = Math.round(values.reduce((s, v) => s + v.val, 0) / values.length * 10) / 10
    setResult({ values, avg })
  }

  const display1RM = result ? (formula === "all" ? result.avg : result.values.find(v => v.key === formula)?.val ?? result.avg) : null

  return (
    <div className="space-y-6">
      <div>
        <p className={lbl}>Formula</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <button onClick={() => setFormula("all")} className={selectBtn(formula === "all")}>Show All</button>
          {ormFormulas.map(f => (
            <button key={f.key} onClick={() => setFormula(f.key)} className={selectBtn(formula === f.key)}>{f.label}</button>
          ))}
        </div>
        <p className="text-gray-600 text-xs">
          {formula === "all" ? "Calculates all 5 formulas and shows the average." : ormFormulas.find(f => f.key === formula)?.desc}
        </p>
      </div>

      <div className="flex bg-[#1a1a1a] rounded-lg p-1 w-fit border border-[#2a2a2a]">
        {(["kg", "lbs"] as const).map(u => (
          <button key={u} onClick={() => { setUnit(u); setResult(null) }}
            className={`px-6 py-2 text-sm font-bold uppercase rounded-md transition-colors ${unit === u ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}>{u}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Weight Lifted ({unit})</label>
          <input type="number" value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} placeholder={unit === "kg" ? "100" : "225"} className={inp} />
        </div>
        <div>
          <label className={lbl}>Reps Performed</label>
          <input type="number" value={reps} onChange={e => { setReps(e.target.value); setResult(null) }} placeholder="5" min={1} max={30} className={inp} />
          <p className="text-gray-600 text-xs mt-1">Most accurate at 1–10 reps</p>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate 1RM
      </button>

      {result && display1RM !== null && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>

          {/* Main result */}
          <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a] mb-5">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              {formula === "all" ? "Average 1RM (all formulas)" : `${ormFormulas.find(f => f.key === formula)?.label} Formula`}
            </p>
            <div className="flex items-end justify-center gap-2">
              <span className="text-6xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{display1RM}</span>
              <span className="text-2xl text-[#f5a623] font-bold mb-1">{unit}</span>
            </div>
          </div>

          {/* All formula results */}
          {formula === "all" && (
            <div className="mb-5">
              <p className={lbl}>Formula Comparison</p>
              <div className="space-y-2">
                {result.values.map(v => (
                  <div key={v.key} className="flex items-center justify-between px-4 py-3 bg-[#141414] rounded-lg border border-[#2a2a2a]">
                    <p className="text-white text-sm font-semibold">{v.label}</p>
                    <span className="text-[#f5a623] font-bold">{v.val} {unit}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-[#f5a623]/10 rounded-lg border border-[#f5a623]/30">
                  <p className="text-[#f5a623] text-sm font-bold">Average</p>
                  <span className="text-[#f5a623] font-bold text-lg">{result.avg} {unit}</span>
                </div>
              </div>
            </div>
          )}

          {/* Training percentage table */}
          <p className={lbl}>Training Load Table</p>
          <div className="overflow-hidden rounded-xl border border-[#2a2a2a]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#141414]">
                  <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase font-semibold">% 1RM</th>
                  <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase font-semibold">Load ({unit})</th>
                  <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase font-semibold">Rep Range</th>
                  <th className="text-left px-4 py-2.5 text-gray-400 text-xs uppercase font-semibold hidden sm:table-cell">Training Zone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {pcts.map(pct => {
                  const zones: Record<number, string> = { 100: "Max Effort", 95: "Near-Max", 90: "Heavy Strength", 85: "Strength", 80: "Strength-Hypertrophy", 75: "Hypertrophy", 70: "Hypertrophy", 65: "Hypertrophy-Endurance", 60: "Muscular Endurance", 55: "Endurance", 50: "Warm-Up/Recovery" }
                  return (
                    <tr key={pct} className={pct === 100 ? "bg-[#f5a623]/10" : "hover:bg-[#141414]/50"}>
                      <td className={`px-4 py-2.5 font-bold text-sm ${pct === 100 ? "text-[#f5a623]" : "text-white"}`}>{pct}%</td>
                      <td className="px-4 py-2.5 text-gray-300 font-mono">{Math.round(display1RM * pct / 100 * 10) / 10}</td>
                      <td className="px-4 py-2.5 text-gray-400 text-xs">{repRanges[pct]}</td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs hidden sm:table-cell">{zones[pct]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 6. Ideal Weight ──────────────────────────────────────────────────────────
const idealFormulas = [
  { key: "all",      label: "All Formulas", desc: "Compare all four medical formulas side by side." },
  { key: "devine",   label: "Devine",       desc: "Most widely used in clinical settings (1974)." },
  { key: "robinson", label: "Robinson",     desc: "Modified Devine for greater accuracy (1983)." },
  { key: "miller",   label: "Miller",       desc: "Suggests lower ideal weights (1983)." },
  { key: "hamwi",    label: "Hamwi",        desc: "Used in nutritional and clinical assessments." },
]

function IdealWeightCalc() {
  const [formula, setFormula] = useState("all")
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("male")
  const [result, setResult] = useState<{ devine: number; robinson: number; miller: number; hamwi: number; loRange: number; hiRange: number } | null>(null)

  function calc() {
    const h = parseFloat(height); if (!h || h < 130) return
    const over = h / 2.54 - 60
    const vals = gender === "male"
      ? { devine: 50.0 + 2.3 * over, robinson: 52.0 + 1.9 * over, miller: 56.2 + 1.41 * over, hamwi: 48.0 + 2.7 * over }
      : { devine: 45.5 + 2.3 * over, robinson: 49.0 + 1.7 * over, miller: 53.1 + 1.36 * over, hamwi: 45.5 + 2.2 * over }
    const hM = h / 100
    setResult({
      devine: Math.round(vals.devine * 10) / 10,
      robinson: Math.round(vals.robinson * 10) / 10,
      miller: Math.round(vals.miller * 10) / 10,
      hamwi: Math.round(vals.hamwi * 10) / 10,
      loRange: Math.round(18.5 * hM * hM * 10) / 10,
      hiRange: Math.round(24.9 * hM * hM * 10) / 10,
    })
  }

  const avg = result ? Math.round(((result.devine + result.robinson + result.miller + result.hamwi) / 4) * 10) / 10 : null
  const displayVal = result ? (formula === "all" ? avg : result[formula as keyof typeof result]) : null

  const formulaDetails = [
    { key: "devine",   name: "Devine",   note: "Most widely used in clinical settings" },
    { key: "robinson", name: "Robinson", note: "Modified version of Devine (1983)" },
    { key: "miller",   name: "Miller",   note: "Tends to suggest lower weights" },
    { key: "hamwi",    name: "Hamwi",    note: "Used in nutritional assessments" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className={lbl}>Formula</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {idealFormulas.map(f => (
            <button key={f.key} onClick={() => { setFormula(f.key); setResult(null) }} className={selectBtn(formula === f.key)}>{f.label}</button>
          ))}
        </div>
        <p className="text-gray-600 text-xs">{idealFormulas.find(f => f.key === formula)?.desc}</p>
      </div>

      <div>
        <label className={lbl}>Gender</label>
        <div className="flex bg-[#1a1a1a] rounded-lg p-1 w-fit border border-[#2a2a2a]">
          {["male", "female"].map(g => (
            <button key={g} onClick={() => { setGender(g); setResult(null) }}
              className={`px-6 py-2 text-sm font-bold uppercase rounded-md transition-colors ${gender === g ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}>{g}</button>
          ))}
        </div>
      </div>

      <div>
        <label className={lbl}>Height (cm)</label>
        <input type="number" value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} placeholder="175" className={inp} />
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate Ideal Weight
      </button>

      {result && displayVal !== null && avg !== null && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                {formula === "all" ? "Average (all formulas)" : `${idealFormulas.find(f => f.key === formula)?.label} Formula`}
              </p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{displayVal}</span>
                <span className="text-xl text-[#f5a623] font-bold mb-1">kg</span>
              </div>
            </div>
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Healthy BMI Range</p>
              <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{result.loRange}–{result.hiRange}</p>
              <p className="text-gray-500 text-xs">kg · BMI 18.5–24.9</p>
            </div>
          </div>

          {/* All formulas comparison */}
          <p className={lbl}>Formula Comparison</p>
          <div className="space-y-2 mb-5">
            {formulaDetails.map(f => (
              <div key={f.key} className="flex items-center justify-between px-4 py-3 bg-[#141414] rounded-lg border border-[#2a2a2a]">
                <div>
                  <p className="text-white text-sm font-semibold">{f.name}</p>
                  <p className="text-gray-500 text-xs">{f.note}</p>
                </div>
                <span className="text-[#f5a623] font-bold text-lg">{result[f.key as keyof typeof result]} kg</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 bg-[#f5a623]/10 rounded-lg border border-[#f5a623]/30">
              <p className="text-[#f5a623] text-sm font-bold">Average</p>
              <span className="text-[#f5a623] font-bold text-lg">{avg} kg</span>
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a] mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Range Breakdown</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Lowest estimate <span className="text-white font-bold">{Math.min(result.devine, result.robinson, result.miller, result.hamwi)} kg</span></span>
              <span className="text-gray-400">Highest estimate <span className="text-white font-bold">{Math.max(result.devine, result.robinson, result.miller, result.hamwi)} kg</span></span>
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Keep in Mind</p>
            <p className="text-gray-400 text-sm">These formulas were developed for average body frames and don&apos;t account for muscle mass, bone density, or athletic build. Athletes may have a healthy &quot;ideal weight&quot; above these estimates.</p>
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── Tool Definitions ─────────────────────────────────────────────────────────
const TOOLS = [
  {
    slug: "bmi",
    title: "BMI Calculator",
    sub: "Body Mass Index",
    desc: "Find your BMI using WHO standards. Includes BMI Prime, healthy weight range, and detailed risk classification.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    component: <BmiCalc />,
  },
  {
    slug: "calories",
    title: "Calorie Calculator",
    sub: "Daily Energy Needs",
    desc: "Calculate your TDEE using 3 formulas — Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle. 6 goal targets included.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    component: <CalorieCalc />,
  },
  {
    slug: "body-fat",
    title: "Body Fat %",
    sub: "Body Composition",
    desc: "Estimate body fat using US Navy or BMI-based method. Get lean body mass, fat mass, and category breakdown.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    component: <BodyFatCalc />,
  },
  {
    slug: "macros",
    title: "Macro Planner",
    sub: "Protein · Carbs · Fat",
    desc: "Plan your daily macros with 5 preset splits (Fat Loss, Muscle, Keto, Low-Carb, Maintenance) or go fully custom.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    component: <MacroCalc />,
  },
  {
    slug: "one-rep-max",
    title: "One Rep Max",
    sub: "Strength Estimator",
    desc: "Estimate your 1RM using 5 formulas (Epley, Brzycki, Lander, Lombardi, Mayhew). Full training load table included.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    component: <OneRepMaxCalc />,
  },
  {
    slug: "ideal-weight",
    title: "Ideal Weight",
    sub: "4 Medical Formulas",
    desc: "Compare Devine, Robinson, Miller and Hamwi formulas. Includes BMI-based healthy weight range for your height.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    component: <IdealWeightCalc />,
  },
  {
    slug: "water",
    title: "Water Intake",
    sub: "Daily Hydration",
    desc: "Calculate your exact daily water needs based on weight, activity level, and climate. Includes a timed drinking schedule.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 9 2 14a10 10 0 0020 0c0-5-4.48-12-10-12z" />
      </svg>
    ),
    component: <WaterCalc />,
  },
  {
    slug: "protein",
    title: "Protein Calculator",
    sub: "Daily Protein Needs",
    desc: "Find your exact protein target for fat loss, muscle building, maintenance, or athletic performance. Per-meal breakdown included.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    component: <ProteinCalc />,
  },
  {
    slug: "heart-rate",
    title: "Heart Rate Zones",
    sub: "Cardio Training Zones",
    desc: "Calculate your 5 heart rate training zones using Fox, Tanaka, or Karvonen formula. Know exactly how hard to push for each goal.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h2l2-6 4 12 3-8 2 4h5" />
      </svg>
    ),
    component: <HeartRateCalc />,
  },
  {
    slug: "goal-weight",
    title: "Goal Planner",
    sub: "Weight Goal Timeline",
    desc: "Set a target weight and weekly rate, and get an exact date, daily calorie adjustment, and month-by-month progress plan.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    component: <GoalWeightCalc />,
  },
  {
    slug: "waist-height",
    title: "Waist-Height Ratio",
    sub: "Central Obesity Risk",
    desc: "Waist-to-height ratio is more predictive of heart disease than BMI. Check if your waist is within the safe half-of-height threshold.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16M9 12h6" />
      </svg>
    ),
    component: <WaistHeightCalc />,
  },
  {
    slug: "ffmi",
    title: "FFMI Calculator",
    sub: "Fat Free Mass Index",
    desc: "Measure your muscular development relative to height. See where you sit on the scale from average to natural genetic ceiling.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    component: <FfmiCalc />,
  },
]

// ─── 7. Water Intake Calculator ───────────────────────────────────────────────
const waterActivity = [
  { key: "sedentary",  label: "Sedentary",        extra: 0 },
  { key: "light",      label: "Light Exercise",   extra: 0.35 },
  { key: "moderate",   label: "Moderate (3–5×/wk)",extra: 0.6 },
  { key: "active",     label: "Very Active (6–7×/wk)",extra: 0.9 },
  { key: "athlete",    label: "Elite / Athlete",   extra: 1.2 },
]
const waterClimate = [
  { key: "temperate", label: "Temperate / AC",    extra: 0 },
  { key: "hot",       label: "Hot Climate",       extra: 0.35 },
  { key: "very-hot",  label: "Very Hot / Humid",  extra: 0.6 },
]

function WaterCalc() {
  const [weight, setWeight] = useState("")
  const [activity, setActivity] = useState("moderate")
  const [climate, setClimate] = useState("temperate")
  const [result, setResult] = useState<{ liters: number; glasses: number; bottles: number } | null>(null)

  function calc() {
    const w = parseFloat(weight); if (!w) return
    const base = w * 0.033
    const act = waterActivity.find(a => a.key === activity)!.extra
    const cli = waterClimate.find(c => c.key === climate)!.extra
    const total = Math.round((base + act + cli) * 10) / 10
    setResult({ liters: total, glasses: Math.round(total / 0.25), bottles: Math.round(total / 0.5 * 10) / 10 })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className={lbl}>Body Weight (kg)</label>
        <input type="number" value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} placeholder="70" className={inp} />
      </div>
      <div>
        <label className={lbl}>Activity Level</label>
        <div className="grid grid-cols-1 gap-2">
          {waterActivity.map(a => (
            <button key={a.key} onClick={() => { setActivity(a.key); setResult(null) }}
              className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${activity === a.key ? "border-[#f5a623] bg-[#f5a623]/10 text-white" : "border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className={lbl}>Climate</label>
        <div className="flex flex-wrap gap-2">
          {waterClimate.map(c => (
            <button key={c.key} onClick={() => { setClimate(c.key); setResult(null) }} className={selectBtn(climate === c.key)}>{c.label}</button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate Water Intake
      </button>

      {result && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Daily Hydration Target</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Litres / Day", val: `${result.liters}L`, color: "text-blue-400" },
              { label: "250ml Glasses", val: result.glasses, color: "text-cyan-400" },
              { label: "500ml Bottles", val: result.bottles, color: "text-teal-400" },
            ].map(s => (
              <div key={s.label} className="bg-[#141414] rounded-xl p-4 text-center border border-[#2a2a2a]">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{s.label}</p>
                <p className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "var(--font-display)" }}>{s.val}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 mb-4">
            {[
              { time: "Wake up", amount: "500ml", tip: "Rehydrate after overnight fast" },
              { time: "Before workout", amount: "500ml", tip: "Pre-hydration improves performance by up to 10%" },
              { time: "During workout", amount: "250ml / 20 min", tip: "Sip consistently, don't gulp" },
              { time: "Post workout", amount: "500–750ml", tip: "Replace sweat losses" },
              { time: "With meals", amount: "250ml each", tip: "Aids digestion and satiety" },
            ].map(t => (
              <div key={t.time} className="flex items-start gap-3 px-4 py-3 bg-[#141414] rounded-lg border border-[#2a2a2a]">
                <div className="w-2 h-2 rounded-full bg-[#f5a623] mt-1.5 flex-shrink-0" />
                <div>
                  <span className="text-white text-sm font-semibold">{t.time}: </span>
                  <span className="text-blue-400 font-bold text-sm">{t.amount}</span>
                  <p className="text-gray-500 text-xs mt-0.5">{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 8. Protein Intake Calculator ─────────────────────────────────────────────
const proteinGoals = [
  { key: "loss",     label: "Fat Loss",          min: 1.8, max: 2.4, desc: "High protein preserves muscle while in a calorie deficit." },
  { key: "maintain", label: "Maintenance",        min: 1.4, max: 1.8, desc: "Enough to maintain muscle mass and support recovery." },
  { key: "muscle",   label: "Muscle Building",    min: 1.6, max: 2.2, desc: "Supports muscle protein synthesis during a calorie surplus." },
  { key: "athlete",  label: "Endurance Athlete",  min: 1.2, max: 1.6, desc: "Fuels endurance performance and repair — lower than strength athletes." },
  { key: "strength", label: "Strength / Power",   min: 1.8, max: 2.6, desc: "High demands from heavy compound lifts and frequent sessions." },
]

function ProteinCalc() {
  const [weight, setWeight] = useState("")
  const [goal, setGoal] = useState("muscle")
  const [result, setResult] = useState<{ min: number; max: number; mid: number } | null>(null)

  function calc() {
    const w = parseFloat(weight); if (!w) return
    const g = proteinGoals.find(x => x.key === goal)!
    setResult({ min: Math.round(w * g.min), max: Math.round(w * g.max), mid: Math.round(w * (g.min + g.max) / 2) })
  }

  const selected = proteinGoals.find(g => g.key === goal)!

  return (
    <div className="space-y-6">
      <div>
        <label className={lbl}>Body Weight (kg)</label>
        <input type="number" value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} placeholder="70" className={inp} />
      </div>
      <div>
        <label className={lbl}>Goal</label>
        <div className="space-y-2">
          {proteinGoals.map(g => (
            <button key={g.key} onClick={() => { setGoal(g.key); setResult(null) }}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${goal === g.key ? "border-[#f5a623] bg-[#f5a623]/10 text-white" : "border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}>
              <span className="font-bold">{g.label}</span>
              <span className="text-xs ml-2 opacity-60">— {g.min}–{g.max}g/kg</span>
              {goal === g.key && <p className="text-gray-400 text-xs mt-1">{g.desc}</p>}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate Protein Needs
      </button>

      {result && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report — {selected.label}</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-[#141414] rounded-xl p-4 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Minimum</p>
              <p className="text-3xl font-bold text-blue-400" style={{ fontFamily: "var(--font-display)" }}>{result.min}g</p>
              <p className="text-gray-500 text-xs mt-1">{selected.min}g/kg</p>
            </div>
            <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Target</p>
              <p className="text-3xl font-bold text-[#f5a623]" style={{ fontFamily: "var(--font-display)" }}>{result.mid}g</p>
              <p className="text-gray-500 text-xs mt-1">midpoint</p>
            </div>
            <div className="bg-[#141414] rounded-xl p-4 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Maximum</p>
              <p className="text-3xl font-bold text-green-400" style={{ fontFamily: "var(--font-display)" }}>{result.max}g</p>
              <p className="text-gray-500 text-xs mt-1">{selected.max}g/kg</p>
            </div>
          </div>
          <p className={lbl}>Per-Meal Breakdown</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[3, 4, 5, 6].map(meals => (
              <div key={meals} className="bg-[#141414] rounded-lg p-3 text-center border border-[#2a2a2a]">
                <p className="text-gray-500 text-xs">{meals} meals / day</p>
                <p className="text-white font-bold text-lg">{Math.round(result.mid / meals)}g</p>
                <p className="text-gray-600 text-xs">per meal</p>
              </div>
            ))}
          </div>
          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a] mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Calories from Protein</p>
            <p className="text-white text-sm">{result.min * 4}–{result.max * 4} kcal/day <span className="text-gray-500">(protein = 4 kcal/g)</span></p>
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 9. Heart Rate Zone Calculator ────────────────────────────────────────────
const hrFormulas = [
  { key: "fox",    label: "Fox (220 − age)",     desc: "Most commonly used formula — quick and simple." },
  { key: "tanaka", label: "Tanaka (208 − 0.7×age)", desc: "More accurate for older adults — validated in 2001." },
  { key: "karvonen",label:"Karvonen (HRR)",      desc: "Uses resting HR for personalised zones — most precise." },
]
const hrZones = [
  { zone: "Z1", name: "Recovery",       pct: [50, 60], color: "text-blue-400",   bg: "bg-blue-400",   purpose: "Active recovery, warm-up, cool-down" },
  { zone: "Z2", name: "Fat Burn",       pct: [60, 70], color: "text-green-400",  bg: "bg-green-400",  purpose: "Base aerobic fitness, fat oxidation" },
  { zone: "Z3", name: "Aerobic",        pct: [70, 80], color: "text-yellow-400", bg: "bg-yellow-400", purpose: "Cardiovascular endurance, tempo training" },
  { zone: "Z4", name: "Threshold",      pct: [80, 90], color: "text-orange-400", bg: "bg-orange-400", purpose: "Lactate threshold, race pace, intervals" },
  { zone: "Z5", name: "Max / Sprint",   pct: [90, 100],color: "text-red-400",    bg: "bg-red-400",    purpose: "Max power output, short all-out efforts" },
]

function HeartRateCalc() {
  const [age, setAge] = useState("")
  const [restHR, setRestHR] = useState("")
  const [formula, setFormula] = useState("tanaka")
  const [result, setResult] = useState<{ maxHR: number; zones: { zone: string; name: string; lo: number; hi: number; color: string; bg: string; purpose: string }[] } | null>(null)

  function calc() {
    const a = parseFloat(age); if (!a || a < 10 || a > 100) return
    let maxHR: number
    if (formula === "fox") maxHR = Math.round(220 - a)
    else if (formula === "tanaka") maxHR = Math.round(208 - 0.7 * a)
    else {
      const rhr = parseFloat(restHR); if (!rhr) return
      maxHR = Math.round(208 - 0.7 * a)
      const hrr = maxHR - rhr
      const zones = hrZones.map(z => ({
        ...z,
        lo: Math.round(rhr + hrr * z.pct[0] / 100),
        hi: Math.round(rhr + hrr * z.pct[1] / 100),
      }))
      setResult({ maxHR, zones }); return
    }
    setResult({
      maxHR,
      zones: hrZones.map(z => ({ ...z, lo: Math.round(maxHR * z.pct[0] / 100), hi: Math.round(maxHR * z.pct[1] / 100) })),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <p className={lbl}>Formula</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {hrFormulas.map(f => (
            <button key={f.key} onClick={() => { setFormula(f.key); setResult(null) }} className={selectBtn(formula === f.key)}>{f.label}</button>
          ))}
        </div>
        <p className="text-gray-600 text-xs">{hrFormulas.find(f => f.key === formula)?.desc}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Age (years)</label><input type="number" value={age} onChange={e => { setAge(e.target.value); setResult(null) }} placeholder="28" className={inp} /></div>
        {formula === "karvonen" && (
          <div>
            <label className={lbl}>Resting Heart Rate (bpm)</label>
            <input type="number" value={restHR} onChange={e => { setRestHR(e.target.value); setResult(null) }} placeholder="60" className={inp} />
            <p className="text-gray-600 text-xs mt-1">Measure first thing in the morning before getting up</p>
          </div>
        )}
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate Heart Rate Zones
      </button>

      {result && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>
          <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a] mb-5">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Maximum Heart Rate</p>
            <p className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.maxHR} <span className="text-2xl text-gray-500">bpm</span></p>
          </div>
          <p className={lbl}>Training Zones</p>
          <div className="space-y-2 mb-4">
            {result.zones.map(z => (
              <div key={z.zone} className="bg-[#141414] rounded-xl border border-[#2a2a2a] overflow-hidden">
                <div className="flex items-center gap-4 px-4 py-3">
                  <div className={`w-2 self-stretch rounded-full ${z.bg} opacity-80`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-gray-500 text-[10px] font-bold uppercase">{z.zone}</span>
                      <span className={`font-bold text-base ${z.color}`}>{z.lo}–{z.hi} bpm</span>
                    </div>
                    <p className="text-white text-sm font-bold">{z.name}</p>
                    <p className="text-gray-500 text-xs">{z.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-[10px]">max HR</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 10. Goal Weight Planner ──────────────────────────────────────────────────
function GoalWeightCalc() {
  const [current, setCurrent] = useState("")
  const [target, setTarget] = useState("")
  const [ratePerWeek, setRatePerWeek] = useState("0.5")
  const [result, setResult] = useState<{ weeks: number; date: string; dailyDiff: number; direction: string } | null>(null)

  function calc() {
    const c = parseFloat(current), t = parseFloat(target), r = parseFloat(ratePerWeek)
    if (!c || !t || !r || c === t) return
    const diff = Math.abs(c - t)
    const weeks = Math.ceil(diff / r)
    const date = new Date()
    date.setDate(date.getDate() + weeks * 7)
    const dailyDiff = Math.round(r * 7700 / 7)
    setResult({
      weeks,
      date: date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      dailyDiff,
      direction: t < c ? "deficit" : "surplus",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Current Weight (kg)</label><input type="number" value={current} onChange={e => { setCurrent(e.target.value); setResult(null) }} placeholder="80" className={inp} /></div>
        <div><label className={lbl}>Target Weight (kg)</label><input type="number" value={target} onChange={e => { setTarget(e.target.value); setResult(null) }} placeholder="70" className={inp} /></div>
      </div>
      <div>
        <label className={lbl}>Weekly Rate (kg/week)</label>
        <div className="flex flex-wrap gap-2">
          {["0.25", "0.5", "0.75", "1.0"].map(r => (
            <button key={r} onClick={() => { setRatePerWeek(r); setResult(null) }} className={selectBtn(ratePerWeek === r)}>
              {r} kg/wk
            </button>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-2">0.5 kg/week is the recommended sustainable rate for most people</p>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Plan My Goal
      </button>

      {result && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Goal Plan</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Estimated Duration</p>
              <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.weeks}</p>
              <p className="text-gray-500 text-xs mt-1">weeks</p>
            </div>
            <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Target Date</p>
              <p className="text-lg font-bold text-[#f5a623]" style={{ fontFamily: "var(--font-display)" }}>{result.date}</p>
            </div>
          </div>
          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a] mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Required Daily Calorie {result.direction === "deficit" ? "Deficit" : "Surplus"}</p>
            <p className="text-white font-bold text-2xl">{result.dailyDiff} kcal/day
              <span className="text-gray-500 text-sm font-normal ml-2">{result.direction === "deficit" ? "below" : "above"} maintenance</span>
            </p>
            <p className="text-gray-500 text-xs mt-2">1 kg of fat ≈ 7,700 kcal. This is your required daily adjustment to hit your rate.</p>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { label: "Total weight to " + (result.direction === "deficit" ? "lose" : "gain"), val: `${Math.abs(parseFloat(current) - parseFloat(target))} kg` },
              { label: "Monthly progress", val: `≈ ${Math.round(parseFloat(ratePerWeek) * 4.3 * 10) / 10} kg` },
              { label: "Check-in recommendation", val: "Every 2 weeks" },
            ].map(s => (
              <div key={s.label} className="flex justify-between px-4 py-3 bg-[#141414] rounded-lg border border-[#2a2a2a]">
                <span className="text-gray-400 text-sm">{s.label}</span>
                <span className="text-white font-bold text-sm">{s.val}</span>
              </div>
            ))}
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 11. Waist-to-Height Ratio ────────────────────────────────────────────────
const whtCats = [
  { label: "Very Slim",    min: 0,    max: 0.40, color: "text-blue-400",   risk: "May indicate underweight" },
  { label: "Healthy",      min: 0.40, max: 0.50, color: "text-green-400",  risk: "Lowest health risk" },
  { label: "Overweight",   min: 0.50, max: 0.60, color: "text-yellow-400", risk: "Elevated risk" },
  { label: "Obese",        min: 0.60, max: 0.70, color: "text-orange-400", risk: "High health risk" },
  { label: "Severely Obese",min:0.70, max: Infinity, color: "text-red-400",risk: "Very high health risk" },
]
function getWhtCat(r: number) { return whtCats.find(c => r >= c.min && r < c.max) ?? whtCats[whtCats.length - 1] }

function WaistHeightCalc() {
  const [waist, setWaist] = useState("")
  const [height, setHeight] = useState("")
  const [unit, setUnit] = useState<"cm" | "inches">("cm")
  const [result, setResult] = useState<number | null>(null)

  function calc() {
    let w = parseFloat(waist), h = parseFloat(height)
    if (!w || !h) return
    if (unit === "inches") { w *= 2.54; h *= 2.54 }
    setResult(Math.round((w / h) * 1000) / 1000)
  }

  const cat = result !== null ? getWhtCat(result) : null

  return (
    <div className="space-y-6">
      <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Why WHtR?</p>
        <p className="text-gray-400 text-sm">Waist-to-height ratio is considered a better predictor of heart disease and metabolic risk than BMI alone. A general rule: your waist should be less than half your height.</p>
      </div>
      <div className="flex bg-[#1a1a1a] rounded-lg p-1 w-fit border border-[#2a2a2a]">
        {(["cm", "inches"] as const).map(u => (
          <button key={u} onClick={() => { setUnit(u); setResult(null) }}
            className={`px-5 py-2 text-sm font-bold uppercase rounded-md transition-colors ${unit === u ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"}`}>{u}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Waist Circumference ({unit})</label><input type="number" value={waist} onChange={e => { setWaist(e.target.value); setResult(null) }} placeholder={unit === "cm" ? "At navel, e.g. 85" : "e.g. 33"} className={inp} /></div>
        <div><label className={lbl}>Height ({unit})</label><input type="number" value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} placeholder={unit === "cm" ? "e.g. 175" : "e.g. 69"} className={inp} /></div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate WHtR
      </button>

      {result !== null && cat && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Your WHtR</p>
              <p className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result}</p>
              <p className={`text-sm font-bold uppercase mt-1 ${cat.color}`}>{cat.label}</p>
            </div>
            <div className="bg-[#141414] rounded-xl p-5 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">The Golden Rule</p>
              <p className="text-lg font-bold text-white mt-2">Keep waist &lt; 50%<br/>of your height</p>
              <p className={`text-xs mt-2 ${result < 0.50 ? "text-green-400" : "text-orange-400"}`}>
                {result < 0.50 ? "You meet this goal" : `Target: < ${Math.round(parseFloat(height || "170") * 0.5)} ${unit}`}
              </p>
            </div>
          </div>
          <div className="space-y-1.5 mb-4">
            {whtCats.map(c => (
              <div key={c.label} className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs ${cat.label === c.label ? "bg-[#f5a623] text-black font-bold" : "bg-[#141414] text-gray-500 border border-[#2a2a2a]"}`}>
                <span>{c.label}</span>
                <span className="font-mono">{c.max === Infinity ? `> ${c.min}` : `${c.min}–${c.max}`}</span>
                <span className="hidden sm:block opacity-70">{c.risk}</span>
              </div>
            ))}
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── 12. FFMI Calculator ──────────────────────────────────────────────────────
const ffmiCats = [
  { label: "Below Average", min: 0,    max: 18,   color: "text-blue-400",   desc: "Below average muscle mass for height." },
  { label: "Average",       min: 18,   max: 20,   color: "text-green-400",  desc: "Average muscle development for an active person." },
  { label: "Above Average", min: 20,   max: 22,   color: "text-teal-400",   desc: "Noticeably developed physique — consistent training." },
  { label: "Excellent",     min: 22,   max: 23,   color: "text-yellow-400", desc: "Impressive muscular development." },
  { label: "Superior",      min: 23,   max: 26,   color: "text-orange-400", desc: "Approaching natural genetic ceiling for most people." },
  { label: "Exceptional",   min: 26,   max: Infinity, color: "text-red-400",desc: "Extremely rare naturally. Likely enhanced." },
]
function getFfmiCat(n: number) { return ffmiCats.find(c => n >= c.min && n < c.max) ?? ffmiCats[ffmiCats.length - 1] }

function FfmiCalc() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [bodyFat, setBodyFat] = useState("")
  const [result, setResult] = useState<{ ffmi: number; normalised: number; lbm: number } | null>(null)

  function calc() {
    const w = parseFloat(weight), h = parseFloat(height), bf = parseFloat(bodyFat)
    if (!w || !h || !bf) return
    const hM = h / 100
    const lbm = w * (1 - bf / 100)
    const ffmi = Math.round((lbm / (hM * hM)) * 10) / 10
    const normalised = Math.round((ffmi + 6.1 * (1.8 - hM)) * 10) / 10
    setResult({ ffmi, normalised, lbm: Math.round(lbm * 10) / 10 })
  }

  const cat = result ? getFfmiCat(result.normalised) : null

  return (
    <div className="space-y-6">
      <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">What is FFMI?</p>
        <p className="text-gray-400 text-sm">Fat Free Mass Index measures muscle development relative to height — like BMI but for lean mass only. Natural bodybuilding limits are generally considered to be around 25 FFMI.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className={lbl}>Weight (kg)</label><input type="number" value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} placeholder="80" className={inp} /></div>
        <div><label className={lbl}>Height (cm)</label><input type="number" value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} placeholder="175" className={inp} /></div>
        <div>
          <label className={lbl}>Body Fat %</label>
          <input type="number" value={bodyFat} onChange={e => { setBodyFat(e.target.value); setResult(null) }} placeholder="15" className={inp} />
          <p className="text-gray-600 text-xs mt-1">Use Body Fat tool above</p>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors">
        Calculate FFMI
      </button>

      {result && cat && (
        <ReportCard>
          <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Your Report</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-[#141414] rounded-xl p-4 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">FFMI</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.ffmi}</p>
            </div>
            <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Normalised</p>
              <p className="text-3xl font-bold text-[#f5a623]" style={{ fontFamily: "var(--font-display)" }}>{result.normalised}</p>
              <p className="text-gray-500 text-[10px] mt-1">adj. to 1.8m</p>
            </div>
            <div className="bg-[#141414] rounded-xl p-4 text-center border border-[#2a2a2a]">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Lean Mass</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{result.lbm}kg</p>
            </div>
          </div>
          <div className={`rounded-xl p-4 border mb-5 ${cat.color.replace("text-", "border-")}/30 bg-[#141414]`}>
            <p className={`font-bold text-lg uppercase mb-1 ${cat.color}`} style={{ fontFamily: "var(--font-display)" }}>{cat.label}</p>
            <p className="text-gray-400 text-sm">{cat.desc}</p>
          </div>
          <div className="space-y-1.5 mb-4">
            {ffmiCats.map(c => (
              <div key={c.label} className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs ${cat.label === c.label ? "bg-[#f5a623] text-black font-bold" : "bg-[#141414] text-gray-500 border border-[#2a2a2a]"}`}>
                <span>{c.label}</span>
                <span className="font-mono">{c.max === Infinity ? `> ${c.min}` : `${c.min}–${c.max}`}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Natural Ceiling Context</p>
            <p className="text-gray-400 text-sm">Research suggests the natural (drug-free) FFMI ceiling for most men is around 24–25. For women it is approximately 20–21. Values above these thresholds in elite athletes often indicate performance enhancement.</p>
          </div>
          <CTABlock />
        </ReportCard>
      )}
    </div>
  )
}

// ─── Tool info content shown above each calculator ───────────────────────────
const TOOL_INFO: Record<string, { why: string; facts: { label: string; value: string }[] }> = {
  bmi: {
    why: "BMI is the most widely used screening tool by doctors and health organisations worldwide. It gives you an instant snapshot of whether your weight is appropriate for your height — and flags early if you are at risk.",
    facts: [
      { label: "Used by", value: "WHO, NHS, CDC" },
      { label: "Standard since", value: "1832" },
      { label: "Accuracy", value: "General population" },
      { label: "Best for", value: "Quick health screening" },
    ],
  },
  calories: {
    why: "Knowing your daily calorie needs is the foundation of any fitness goal — fat loss, muscle gain, or maintenance. Without this number, dieting and training is guesswork. Calculate it once and use it forever.",
    facts: [
      { label: "Formula options", value: "3 (Mifflin, Harris, Katch)" },
      { label: "Accuracy", value: "±10% of actual needs" },
      { label: "BMR accounts for", value: "60–75% of total burn" },
      { label: "Updates needed", value: "Every 3–6 months" },
    ],
  },
  "body-fat": {
    why: "Body fat % is far more meaningful than BMI alone. Two people can have identical BMI but very different body compositions. Tracking body fat tells you whether you are losing fat or muscle during a diet.",
    facts: [
      { label: "Method", value: "US Navy / BMI-based" },
      { label: "Navy accuracy", value: "±3–4% vs DEXA scan" },
      { label: "Essential fat (men)", value: "2–5%" },
      { label: "Essential fat (women)", value: "10–13%" },
    ],
  },
  macros: {
    why: "Hitting your calorie target is step one — but what those calories are made of determines whether you build muscle, lose fat, or feel energised. Macro planning is what separates good diets from great ones.",
    facts: [
      { label: "Protein", value: "4 kcal per gram" },
      { label: "Carbohydrates", value: "4 kcal per gram" },
      { label: "Fat", value: "9 kcal per gram" },
      { label: "Splits available", value: "5 presets + custom" },
    ],
  },
  "one-rep-max": {
    why: "Your 1RM is the gold standard of strength measurement. Knowing it lets you train at scientifically-proven intensities — not guessing what weight to use. Every serious strength programme is built around 1RM percentages.",
    facts: [
      { label: "Formulas compared", value: "5 (Epley, Brzycki…)" },
      { label: "Most accurate range", value: "1–10 reps" },
      { label: "Used in", value: "Powerlifting, strength sports" },
      { label: "Training table", value: "50–100% breakdown" },
    ],
  },
  "ideal-weight": {
    why: "No single number defines ideal weight — that is why we show you four different medical formulas plus a BMI-based healthy range. Together they give you a realistic target range rather than a misleading single number.",
    facts: [
      { label: "Formulas", value: "Devine, Robinson, Miller, Hamwi" },
      { label: "Also shows", value: "BMI-based healthy range" },
      { label: "Frame types", value: "Not accounted for" },
      { label: "Best used as", value: "A reference range" },
    ],
  },
  water: {
    why: "Dehydration of just 2% of body weight reduces physical performance by up to 10% and impairs cognitive function. Most gym-goers are chronically under-hydrated without knowing it. Knowing your exact daily target removes the guesswork.",
    facts: [
      { label: "Base formula", value: "33ml × body weight (kg)" },
      { label: "Exercise addition", value: "+350–1200ml/day" },
      { label: "Performance drop", value: "−10% at 2% dehydration" },
      { label: "Includes", value: "Timing recommendations" },
    ],
  },
  protein: {
    why: "Protein is the most critical macronutrient for anyone exercising. It is the building block of muscle tissue, supports fat loss by increasing satiety, and has the highest thermic effect of any food (30% of its calories are burned during digestion).",
    facts: [
      { label: "Goal-based ranges", value: "1.2–2.6g/kg" },
      { label: "Thermic effect", value: "25–30% of protein kcal" },
      { label: "Sources", value: "Chicken, eggs, dairy, legumes" },
      { label: "Per-meal breakdown", value: "3, 4, 5, 6 meals" },
    ],
  },
  "heart-rate": {
    why: "Training in the right heart rate zone is what separates productive exercise from wasted effort. Zone 2 builds your aerobic base and burns fat. Zone 4–5 builds speed and power. Without knowing your zones you are guessing at intensity.",
    facts: [
      { label: "Formulas", value: "Fox, Tanaka, Karvonen" },
      { label: "Zones", value: "5 (Recovery to Max)" },
      { label: "Karvonen accuracy", value: "Uses resting HR for personalisation" },
      { label: "Used by", value: "Coaches, cardiologists worldwide" },
    ],
  },
  "goal-weight": {
    why: "Most people set a weight goal without ever calculating when or how they will reach it. This planner converts your goal into a concrete timeline and a daily calorie target — making your goal specific, measurable, and achievable.",
    facts: [
      { label: "Calculation basis", value: "1 kg fat ≈ 7,700 kcal" },
      { label: "Recommended rate", value: "0.5 kg/week for most" },
      { label: "Shows", value: "Target date + daily deficit/surplus" },
      { label: "Pairs with", value: "Calorie Calculator" },
    ],
  },
  "waist-height": {
    why: "Waist-to-height ratio (WHtR) is increasingly considered the most powerful single measure of cardiometabolic health risk — more predictive than BMI, waist circumference alone, or waist-to-hip ratio. A WHtR above 0.5 significantly increases risk of heart disease.",
    facts: [
      { label: "Healthy threshold", value: "< 0.5 (waist < half height)" },
      { label: "Better than BMI for", value: "Central obesity detection" },
      { label: "Supported by", value: "WHO, British Heart Foundation" },
      { label: "No gender difference", value: "Same 0.5 threshold for all" },
    ],
  },
  ffmi: {
    why: "FFMI tells you how muscularly developed you are relative to your height — independently of body fat. It is the standard measure for assessing natural muscle building progress and is used by researchers to study training and performance enhancement.",
    facts: [
      { label: "Natural ceiling", value: "~24–25 for men" },
      { label: "Women's ceiling", value: "~20–21" },
      { label: "Normalised to", value: "1.80m height" },
      { label: "Requires", value: "Weight, height, body fat %" },
    ],
  },
}

// ─── Main Page Layout ─────────────────────────────────────────────────────────
export default function ToolsPageLayout() {
  const [activeTool, setActiveTool] = useState<string>("bmi")
  const searchParams = useSearchParams()

  // Read ?tool= from URL (e.g. from navbar dropdown links)
  useEffect(() => {
    const p = searchParams.get("tool")
    if (p && TOOLS.some(t => t.slug === p)) setActiveTool(p)
  }, [searchParams])

  const active = TOOLS.find(t => t.slug === activeTool)!
  const info = TOOL_INFO[activeTool]

  return (
    <section className="bg-[#0a0a0a] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-10">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Science-Based</p>
          <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Your Fitness <span className="text-[#f5a623]">Calculators</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Six professional calculators with world-standard formulas. Click any tool — it opens instantly below, no page change.
          </p>
        </div>

        {/* ── Carousel of tool cards (always visible) ── */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-2 scrollbar-hide snap-x snap-mandatory">
          {TOOLS.map(tool => {
            const isActive = activeTool === tool.slug
            return (
              <button
                key={tool.slug}
                onClick={() => setActiveTool(tool.slug)}
                className={`snap-start flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "border-[#f5a623] bg-[#f5a623]/8 shadow-lg shadow-[#f5a623]/15"
                    : "border-[#2a2a2a] bg-[#141414] hover:border-[#f5a623]/40"
                }`}
                style={{ minWidth: "175px" }}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-[#f5a623] text-black" : "bg-[#1a1a1a] text-[#f5a623]"}`}>
                  {tool.icon}
                </div>
                <div className="text-left">
                  <p className={`font-bold text-[13px] uppercase leading-tight ${isActive ? "text-[#f5a623]" : "text-white"}`} style={{ fontFamily: "var(--font-display)" }}>
                    {tool.title}
                  </p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{tool.sub}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Scroll hint on mobile */}
        <p className="text-gray-700 text-[10px] text-center mb-6 sm:hidden">← Swipe to see all tools →</p>

        {/* ── Active tool — opens below carousel, no page jump ── */}
        <div className="border border-[#f5a623]/25 rounded-2xl overflow-hidden">

          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 bg-[#111] border-b border-[#2a2a2a]">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#f5a623] flex items-center justify-center text-black flex-shrink-0">
                {active.icon}
              </div>
              <div>
                <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.25em]">{active.sub}</p>
                <h3 className="text-white font-bold text-xl sm:text-2xl uppercase leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {active.title}
                </h3>
              </div>
            </div>
            {/* Nav arrows for quick switching */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const idx = TOOLS.findIndex(t => t.slug === activeTool)
                  setActiveTool(TOOLS[(idx - 1 + TOOLS.length) % TOOLS.length].slug)
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-gray-500 hover:text-white hover:border-[#f5a623]/40 transition-colors"
                aria-label="Previous tool"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const idx = TOOLS.findIndex(t => t.slug === activeTool)
                  setActiveTool(TOOLS[(idx + 1) % TOOLS.length].slug)
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-gray-500 hover:text-white hover:border-[#f5a623]/40 transition-colors"
                aria-label="Next tool"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] divide-y lg:divide-y-0 lg:divide-x divide-[#2a2a2a] bg-[#0d0d0d]">

            {/* Left: info + why use this */}
            <div className="p-6 lg:p-8 space-y-6">
              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">{active.desc}</p>

              {/* Why use this */}
              {info && (
                <>
                  <div>
                    <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Why use this?</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{info.why}</p>
                  </div>

                  {/* Fact grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {info.facts.map(f => (
                      <div key={f.label} className="bg-[#141414] rounded-xl p-4 border border-[#2a2a2a]">
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{f.label}</p>
                        <p className="text-white font-bold text-sm">{f.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Other tools quick access */}
              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-3">Other Tools</p>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.filter(t => t.slug !== activeTool).map(t => (
                    <button
                      key={t.slug}
                      onClick={() => setActiveTool(t.slug)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/40 text-gray-400 hover:text-white rounded-lg text-xs transition-colors"
                    >
                      <span className="text-[#f5a623]">{t.icon}</span>
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: calculator */}
            <div className="p-6 lg:p-8 bg-[#0a0a0a]" key={activeTool}>
              {active.component}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
