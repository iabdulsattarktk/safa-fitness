"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useToolModal } from "@/contexts/ToolModalContext"

// ─── Shared styles ────────────────────────────────────────────────────────────
const inp = "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm rounded px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors"
const lbl = "block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"

function CTA({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] mt-6">
      <p className="text-white font-bold text-sm mb-1">{line1}</p>
      <p className="text-gray-400 text-xs mb-3">{line2}</p>
      <div className="flex gap-3">
        <Link href="/pricing" className="px-4 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors">Join Now</Link>
        <a href="https://wa.me/923115156949" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-xs uppercase tracking-wider rounded transition-colors">WhatsApp Us</a>
      </div>
    </div>
  )
}

// ─── BMI ──────────────────────────────────────────────────────────────────────
const bmiCats = [
  { label: "Underweight", range: "Below 18.5", min: 0,    max: 18.5,    color: "text-blue-400"   },
  { label: "Normal",      range: "18.5 – 24.9", min: 18.5, max: 25,     color: "text-green-400"  },
  { label: "Overweight",  range: "25 – 29.9",   min: 25,   max: 30,     color: "text-yellow-400" },
  { label: "Obese",       range: "30+",          min: 30,   max: Infinity, color: "text-red-400"  },
]
function getBmiCat(bmi: number) { return bmiCats.find(c => bmi >= c.min && bmi < c.max) ?? bmiCats[3] }

function BmiCalc() {
  const [unit, setUnit] = useState<"metric"|"imperial">("metric")
  const [h, setH] = useState(""); const [w, setW] = useState("")
  const [ft, setFt] = useState(""); const [inch, setInch] = useState(""); const [lbs, setLbs] = useState("")
  const [result, setResult] = useState<number|null>(null)

  function calc() {
    let bmi: number
    if (unit === "metric") {
      const hm = parseFloat(h)/100; const wk = parseFloat(w)
      if (!hm||!wk) return; bmi = wk/(hm*hm)
    } else {
      const totalIn = parseFloat(ft)*12+parseFloat(inch||"0"); const wl = parseFloat(lbs)
      if (!totalIn||!wl) return; bmi = (wl/(totalIn*totalIn))*703
    }
    setResult(Math.round(bmi*10)/10)
  }

  const cat = result !== null ? getBmiCat(result) : null
  return (
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Body Mass Index — a simple measure of weight relative to height.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <div className="flex bg-[#1a1a1a] rounded p-1 mb-5 w-fit">
          {(["metric","imperial"] as const).map(u=>(
            <button key={u} onClick={()=>{setUnit(u);setResult(null)}}
              className={`px-4 py-2 text-sm font-bold uppercase rounded transition-colors ${unit===u?"bg-[#f5a623] text-black":"text-gray-400 hover:text-white"}`}>
              {u==="metric"?"Metric (cm/kg)":"Imperial (ft/lbs)"}
            </button>
          ))}
        </div>
        {unit==="metric" ? (
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div><label className={lbl}>Height (cm)</label><input type="number" value={h} onChange={e=>setH(e.target.value)} placeholder="e.g. 175" className={inp}/></div>
            <div><label className={lbl}>Weight (kg)</label><input type="number" value={w} onChange={e=>setW(e.target.value)} placeholder="e.g. 70" className={inp}/></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div><label className={lbl}>Feet</label><input type="number" value={ft} onChange={e=>setFt(e.target.value)} placeholder="5" className={inp}/></div>
            <div><label className={lbl}>Inches</label><input type="number" value={inch} onChange={e=>setInch(e.target.value)} placeholder="9" className={inp}/></div>
            <div><label className={lbl}>Weight (lbs)</label><input type="number" value={lbs} onChange={e=>setLbs(e.target.value)} placeholder="154" className={inp}/></div>
          </div>
        )}
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate BMI</button>
      </div>
      {result!==null&&cat&&(
        <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Your BMI</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}</span>
            <span className={`text-lg font-bold uppercase mb-0.5 ${cat.color}`}>{cat.label}</span>
          </div>
          <div className="grid grid-cols-4 gap-1 mb-4">
            {bmiCats.map(c=>(
              <div key={c.label} className={`rounded p-2 text-center text-xs ${getBmiCat(result).label===c.label?"bg-[#f5a623] text-black font-bold":"bg-[#1a1a1a] text-gray-500"}`}>
                <div className="font-bold">{c.range}</div><div className="opacity-80">{c.label}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            {cat.label==="Normal"&&"Great — you are within a healthy weight range."}
            {cat.label==="Underweight"&&"You may benefit from increasing lean mass through strength training."}
            {cat.label==="Overweight"&&"Cardio, strength training, and diet adjustment can help."}
            {cat.label==="Obese"&&"A structured program with a certified trainer will help you progress safely."}
          </p>
          <CTA line1="Want a plan built around your results?" line2="Safa Fitness Club's certified trainers design programs based on your exact stats and goals." />
        </div>
      )}
    </div>
  )
}

// ─── Calories ─────────────────────────────────────────────────────────────────
const activityLevels = [
  { label: "Sedentary",        desc: "Little or no exercise",           multiplier: 1.2   },
  { label: "Lightly Active",   desc: "Exercise 1–3 days/week",          multiplier: 1.375 },
  { label: "Moderately Active",desc: "Exercise 3–5 days/week",          multiplier: 1.55  },
  { label: "Very Active",      desc: "Hard exercise 6–7 days/week",     multiplier: 1.725 },
  { label: "Extra Active",     desc: "Very hard exercise + physical job",multiplier: 1.9   },
]

function CalorieCalc() {
  const [form, setForm] = useState({age:"",gender:"male",height:"",weight:"",activity:1.55})
  const [result, setResult] = useState<{bmr:number;tdee:number}|null>(null)
  function set(k:string,v:string|number){setForm(p=>({...p,[k]:v}));setResult(null)}
  function calc(){
    const age=parseFloat(form.age),h=parseFloat(form.height),w=parseFloat(form.weight)
    if(!age||!h||!w)return
    const bmr=form.gender==="male"?10*w+6.25*h-5*age+5:10*w+6.25*h-5*age-161
    setResult({bmr:Math.round(bmr),tdee:Math.round(bmr*form.activity)})
  }
  return (
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Daily calorie needs via the Mifflin-St Jeor formula — most accurate for most people.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className={lbl}>Age (years)</label><input type="number" value={form.age} onChange={e=>set("age",e.target.value)} placeholder="28" className={inp}/></div>
          <div>
            <label className={lbl}>Gender</label>
            <div className="flex bg-[#1a1a1a] rounded p-1">
              {["male","female"].map(g=>(
                <button key={g} onClick={()=>set("gender",g)} className={`flex-1 py-2.5 text-sm font-bold uppercase rounded transition-colors ${form.gender===g?"bg-[#f5a623] text-black":"text-gray-400 hover:text-white"}`}>{g}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className={lbl}>Height (cm)</label><input type="number" value={form.height} onChange={e=>set("height",e.target.value)} placeholder="175" className={inp}/></div>
          <div><label className={lbl}>Weight (kg)</label><input type="number" value={form.weight} onChange={e=>set("weight",e.target.value)} placeholder="70" className={inp}/></div>
        </div>
        <div className="mb-5">
          <label className={lbl}>Activity Level</label>
          <div className="space-y-2">
            {activityLevels.map(a=>(
              <button key={a.multiplier} onClick={()=>set("activity",a.multiplier)}
                className={`w-full text-left px-4 py-2.5 rounded border text-sm transition-colors ${form.activity===a.multiplier?"border-[#f5a623] bg-[#f5a623]/10 text-white":"border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}>
                <span className="font-semibold">{a.label}</span><span className="text-xs ml-2 opacity-70">— {a.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Calories</button>
      </div>
      {result&&(
        <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-[#1a1a1a] rounded-lg p-4 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">BMR</p>
              <p className="text-3xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result.bmr}</p>
              <p className="text-gray-500 text-xs mt-1">kcal/day at rest</p>
            </div>
            <div className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Daily Needs</p>
              <p className="text-3xl font-bold text-[#f5a623]" style={{fontFamily:"var(--font-display)"}}>{result.tdee}</p>
              <p className="text-gray-500 text-xs mt-1">kcal/day to maintain</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              {label:"Lose Weight (−500 kcal)",val:result.tdee-500,color:"text-blue-400"},
              {label:"Maintain Weight",val:result.tdee,color:"text-green-400"},
              {label:"Gain Muscle (+300 kcal)",val:result.tdee+300,color:"text-orange-400"},
            ].map(g=>(
              <div key={g.label} className="flex justify-between items-center px-4 py-3 bg-[#1a1a1a] rounded-lg">
                <span className="text-gray-400 text-sm">{g.label}</span>
                <span className={`font-bold text-sm ${g.color}`}>{g.val} kcal</span>
              </div>
            ))}
          </div>
          <CTA line1="Get a personalised nutrition plan" line2="Our ISSA-certified trainers at Safa Fitness Club can build a complete diet and training plan around your numbers." />
        </div>
      )}
    </div>
  )
}

// ─── Body Fat ────────────────────────────────────────────────────────────────
const maleCats2 = [
  {label:"Essential Fat",min:2, max:6,  color:"text-blue-400"},
  {label:"Athletic",    min:6, max:14, color:"text-green-400"},
  {label:"Fitness",     min:14,max:18, color:"text-yellow-400"},
  {label:"Average",     min:18,max:25, color:"text-orange-400"},
  {label:"Obese",       min:25,max:Infinity,color:"text-red-400"},
]
const femaleCats2 = [
  {label:"Essential Fat",min:10,max:14, color:"text-blue-400"},
  {label:"Athletic",    min:14,max:21, color:"text-green-400"},
  {label:"Fitness",     min:21,max:25, color:"text-yellow-400"},
  {label:"Average",     min:25,max:32, color:"text-orange-400"},
  {label:"Obese",       min:32,max:Infinity,color:"text-red-400"},
]
function getBfCat(bf:number,g:string){const cats=g==="male"?maleCats2:femaleCats2;return cats.find(c=>bf>=c.min&&bf<c.max)??cats[cats.length-1]}

function BodyFatCalc() {
  const [gender,setGender]=useState("male")
  const [form,setForm]=useState({height:"",waist:"",neck:"",hip:""})
  const [result,setResult]=useState<number|null>(null)
  function set(k:string,v:string){setForm(p=>({...p,[k]:v}));setResult(null)}
  function calc(){
    const h=parseFloat(form.height),waist=parseFloat(form.waist),neck=parseFloat(form.neck)
    if(!h||!waist||!neck)return
    let bf:number
    if(gender==="male"){
      bf=495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(h))-450
    }else{
      const hip=parseFloat(form.hip);if(!hip)return
      bf=495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(h))-450
    }
    setResult(Math.round(bf*10)/10)
  }
  const cat=result!==null?getBfCat(result,gender):null
  return (
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">US Navy method — accurate to within 3–4% using only a tape measure.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <div className="mb-4">
          <label className={lbl}>Gender</label>
          <div className="flex bg-[#1a1a1a] rounded p-1 w-fit">
            {["male","female"].map(g=>(
              <button key={g} onClick={()=>{setGender(g);setResult(null)}}
                className={`px-6 py-2 text-sm font-bold uppercase rounded transition-colors ${gender===g?"bg-[#f5a623] text-black":"text-gray-400 hover:text-white"}`}>{g}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className={lbl}>Height (cm)</label><input type="number" value={form.height} onChange={e=>set("height",e.target.value)} placeholder="175" className={inp}/></div>
          <div><label className={lbl}>Neck (cm)</label><input type="number" value={form.neck} onChange={e=>set("neck",e.target.value)} placeholder="38" className={inp}/></div>
        </div>
        <div className={`grid gap-4 mb-4 ${gender==="female"?"grid-cols-2":"grid-cols-1"}`}>
          <div><label className={lbl}>Waist (cm)</label><input type="number" value={form.waist} onChange={e=>set("waist",e.target.value)} placeholder={gender==="male"?"At navel":"Narrowest point"} className={inp}/></div>
          {gender==="female"&&<div><label className={lbl}>Hip (cm)</label><input type="number" value={form.hip} onChange={e=>set("hip",e.target.value)} placeholder="Widest point" className={inp}/></div>}
        </div>
        <div className="bg-[#1a1a1a] rounded p-3 mb-4 text-xs text-gray-500">
          <strong className="text-gray-400">Tips:</strong> Measure waist at navel (men) or narrowest point (women). Keep tape horizontal and snug.
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Estimate Body Fat</button>
      </div>
      {result!==null&&cat&&(
        <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Estimated Body Fat</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}%</span>
            <span className={`text-lg font-bold uppercase mb-0.5 ${cat.color}`}>{cat.label}</span>
          </div>
          <div className="space-y-1.5 mb-2">
            {(gender==="male"?maleCats2:femaleCats2).map(c=>(
              <div key={c.label} className={`flex justify-between items-center px-3 py-2 rounded text-xs ${cat.label===c.label?"bg-[#f5a623] text-black font-bold":"bg-[#1a1a1a] text-gray-500"}`}>
                <span>{c.label}</span><span>{c.max===Infinity?`${c.min}%+`:`${c.min}–${c.max}%`}</span>
              </div>
            ))}
          </div>
          <CTA line1="Want to improve your body composition?" line2="Our trainers at Safa Fitness Club specialise in body transformation programs tailored to your current stats." />
        </div>
      )}
    </div>
  )
}

// ─── Macros ───────────────────────────────────────────────────────────────────
const goals2 = [
  {key:"lose",   label:"Lose Fat",     protein:2.2, fat:0.8, desc:"High protein to preserve muscle in a calorie deficit."},
  {key:"maintain",label:"Maintain",   protein:1.8, fat:0.9, desc:"Balanced macros to sustain current weight."},
  {key:"muscle", label:"Build Muscle", protein:2.0, fat:1.0, desc:"Surplus calories with high protein for muscle growth."},
]

function MacroCalc() {
  const [calories,setCalories]=useState("")
  const [weight,setWeight]=useState("")
  const [goal,setGoal]=useState("maintain")
  const [result,setResult]=useState<{protein:number;fat:number;carbs:number}|null>(null)
  function calc(){
    const kcal=parseFloat(calories),w=parseFloat(weight)
    if(!kcal||!w)return
    const g=goals2.find(x=>x.key===goal)!
    const protein=Math.round(w*g.protein),fat=Math.round(w*g.fat)
    const carbs=Math.round((kcal-protein*4-fat*9)/4)
    setResult({protein,fat,carbs:Math.max(carbs,0)})
  }
  const totalKcal=result?result.protein*4+result.fat*9+result.carbs*4:0
  return (
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Daily protein, carb, and fat targets based on your calorie goal and body weight.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={lbl}>Daily Calories (kcal)</label>
            <input type="number" value={calories} onChange={e=>{setCalories(e.target.value);setResult(null)}} placeholder="2200" className={inp}/>
            <p className="text-gray-600 text-xs mt-1">Use the Calorie Calculator to find yours</p>
          </div>
          <div><label className={lbl}>Body Weight (kg)</label><input type="number" value={weight} onChange={e=>{setWeight(e.target.value);setResult(null)}} placeholder="75" className={inp}/></div>
        </div>
        <div className="mb-5">
          <label className={lbl}>Your Goal</label>
          <div className="space-y-2">
            {goals2.map(g=>(
              <button key={g.key} onClick={()=>{setGoal(g.key);setResult(null)}}
                className={`w-full text-left px-4 py-2.5 rounded border text-sm transition-colors ${goal===g.key?"border-[#f5a623] bg-[#f5a623]/10 text-white":"border-[#2a2a2a] bg-[#1a1a1a] text-gray-400 hover:border-[#f5a623]/40"}`}>
                <span className="font-bold">{g.label}</span><span className="text-xs ml-2 opacity-70">— {g.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Macros</button>
      </div>
      {result&&(
        <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              {label:"Protein",val:result.protein,kcal:result.protein*4,color:"text-blue-400",bg:"bg-blue-400/10 border-blue-400/30"},
              {label:"Carbs",  val:result.carbs,  kcal:result.carbs*4,  color:"text-yellow-400",bg:"bg-yellow-400/10 border-yellow-400/30"},
              {label:"Fat",    val:result.fat,    kcal:result.fat*9,    color:"text-orange-400",bg:"bg-orange-400/10 border-orange-400/30"},
            ].map(m=>(
              <div key={m.label} className={`rounded-lg p-4 text-center border ${m.bg}`}>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-3xl font-bold ${m.color}`} style={{fontFamily:"var(--font-display)"}}>{m.val}g</p>
                <p className="text-gray-500 text-xs mt-1">{m.kcal} kcal</p>
              </div>
            ))}
          </div>
          <div className="flex rounded overflow-hidden h-3 mb-4">
            <div className="bg-blue-400"   style={{width:`${(result.protein*4/totalKcal)*100}%`}}/>
            <div className="bg-yellow-400" style={{width:`${(result.carbs*4/totalKcal)*100}%`}}/>
            <div className="bg-orange-400" style={{width:`${(result.fat*9/totalKcal)*100}%`}}/>
          </div>
          <CTA line1="Need help hitting your macros?" line2="Our nutrition-certified trainers at Safa Fitness Club can create a complete meal plan around your targets." />
        </div>
      )}
    </div>
  )
}

// ─── One Rep Max ──────────────────────────────────────────────────────────────
const pcts = [100,95,90,85,80,75,70,65,60,55,50]
const repRanges: Record<number,string> = {100:"1",95:"2",90:"3",85:"4–5",80:"6",75:"8–10",70:"10–12",65:"12–15",60:"15–20",55:"20–25",50:"25+"}

function OneRepMaxCalc() {
  const [weight,setWeight]=useState("")
  const [reps,setReps]=useState("")
  const [unit,setUnit]=useState<"kg"|"lbs">("kg")
  const [result,setResult]=useState<number|null>(null)
  function calc(){
    const w=parseFloat(weight),r=parseFloat(reps)
    if(!w||!r||r<1)return
    setResult(Math.round((r===1?w:w*(1+r/30))*10)/10)
  }
  return (
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Estimate your maximum single-rep strength using the Epley formula.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <div className="flex bg-[#1a1a1a] rounded p-1 mb-5 w-fit">
          {(["kg","lbs"] as const).map(u=>(
            <button key={u} onClick={()=>{setUnit(u);setResult(null)}}
              className={`px-5 py-2 text-sm font-bold uppercase rounded transition-colors ${unit===u?"bg-[#f5a623] text-black":"text-gray-400 hover:text-white"}`}>{u}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div><label className={lbl}>Weight lifted ({unit})</label><input type="number" value={weight} onChange={e=>{setWeight(e.target.value);setResult(null)}} placeholder={unit==="kg"?"100":"225"} className={inp}/></div>
          <div>
            <label className={lbl}>Reps performed</label>
            <input type="number" value={reps} onChange={e=>{setReps(e.target.value);setResult(null)}} placeholder="5" min={1} max={20} className={inp}/>
            <p className="text-gray-600 text-xs mt-1">Most accurate at 1–10 reps</p>
          </div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate 1RM</button>
      </div>
      {result!==null&&(
        <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Estimated 1 Rep Max</p>
          <div className="flex items-end gap-2 mb-5">
            <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}</span>
            <span className="text-xl text-[#f5a623] font-bold mb-0.5">{unit}</span>
          </div>
          <p className="text-white font-bold text-sm uppercase mb-3" style={{fontFamily:"var(--font-display)"}}>Training Percentages</p>
          <div className="overflow-hidden rounded-lg border border-[#2a2a2a] mb-2">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#1a1a1a]">
                <th className="text-left px-4 py-2 text-gray-400 text-xs uppercase font-semibold">% of 1RM</th>
                <th className="text-left px-4 py-2 text-gray-400 text-xs uppercase font-semibold">Weight ({unit})</th>
                <th className="text-left px-4 py-2 text-gray-400 text-xs uppercase font-semibold">Reps</th>
              </tr></thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {pcts.map(pct=>(
                  <tr key={pct} className={pct===100?"bg-[#f5a623]/10":""}>
                    <td className={`px-4 py-2 font-bold text-sm ${pct===100?"text-[#f5a623]":"text-white"}`}>{pct}%</td>
                    <td className="px-4 py-2 text-gray-300">{Math.round(result*pct/100*10)/10}</td>
                    <td className="px-4 py-2 text-gray-400 text-xs">{repRanges[pct]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CTA line1="Train smarter with a certified coach" line2="Safa Fitness Club's strength trainers design progressive programs built around your 1RM and goals." />
        </div>
      )}
    </div>
  )
}

// ─── Ideal Weight ────────────────────────────────────────────────────────────
function IdealWeightCalc() {
  const [height,setHeight]=useState("")
  const [gender,setGender]=useState("male")
  const [result,setResult]=useState<{devine:number;robinson:number;miller:number;hamwi:number}|null>(null)
  function calc(){
    const h=parseFloat(height);if(!h||h<140)return
    const over=h/2.54-60
    setResult(gender==="male"
      ?{devine:Math.round((50.0+2.3*over)*10)/10, robinson:Math.round((52.0+1.9*over)*10)/10, miller:Math.round((56.2+1.41*over)*10)/10, hamwi:Math.round((48.0+2.7*over)*10)/10}
      :{devine:Math.round((45.5+2.3*over)*10)/10, robinson:Math.round((49.0+1.7*over)*10)/10, miller:Math.round((53.1+1.36*over)*10)/10, hamwi:Math.round((45.5+2.2*over)*10)/10}
    )
  }
  const avg=result?Math.round(((result.devine+result.robinson+result.miller+result.hamwi)/4)*10)/10:null
  return (
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Ideal weight range based on four well-established medical formulas.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <div className="mb-4">
          <label className={lbl}>Gender</label>
          <div className="flex bg-[#1a1a1a] rounded p-1 w-fit">
            {["male","female"].map(g=>(
              <button key={g} onClick={()=>{setGender(g);setResult(null)}}
                className={`px-6 py-2 text-sm font-bold uppercase rounded transition-colors ${gender===g?"bg-[#f5a623] text-black":"text-gray-400 hover:text-white"}`}>{g}</button>
            ))}
          </div>
        </div>
        <div className="mb-5"><label className={lbl}>Height (cm)</label><input type="number" value={height} onChange={e=>{setHeight(e.target.value);setResult(null)}} placeholder="175" className={inp}/></div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Ideal Weight</button>
      </div>
      {result&&avg!==null&&(
        <div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
          <div className="text-center mb-5 pb-5 border-b border-[#2a2a2a]">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Average Ideal Weight</p>
            <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{avg}</span>
            <span className="text-xl text-[#f5a623] font-bold ml-2">kg</span>
            <p className="text-gray-500 text-xs mt-2">Average of four formulas</p>
          </div>
          <div className="space-y-2 mb-2">
            {[
              {name:"Devine Formula",    val:result.devine,   note:"Most widely used in clinical settings"},
              {name:"Robinson Formula",  val:result.robinson, note:"Modified version of Devine"},
              {name:"Miller Formula",    val:result.miller,   note:"Tends to suggest lower weights"},
              {name:"Hamwi Formula",     val:result.hamwi,    note:"Used in nutritional assessments"},
            ].map(f=>(
              <div key={f.name} className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] rounded-lg">
                <div><p className="text-white text-sm font-semibold">{f.name}</p><p className="text-gray-500 text-xs">{f.note}</p></div>
                <span className="text-[#f5a623] font-bold text-lg">{f.val} kg</span>
              </div>
            ))}
          </div>
          <CTA line1="Build a plan to reach your ideal weight" line2="Our trainers at Safa Fitness Club can create a personalised program to help you reach and maintain your goal weight." />
        </div>
      )}
    </div>
  )
}

// ─── Water Intake ─────────────────────────────────────────────────────────────
function WaterCalc() {
  const [weight,setWeight]=useState("")
  const [activity,setActivity]=useState("moderate")
  const [result,setResult]=useState<number|null>(null)
  const levels=[
    {key:"sedentary",  label:"Sedentary",   mult:35},
    {key:"moderate",   label:"Moderate",    mult:40},
    {key:"active",     label:"Very Active", mult:45},
  ]
  function calc(){const w=parseFloat(weight);if(!w||w<20)return;const m=levels.find(l=>l.key===activity)!.mult;setResult(Math.round(w*m/100)/10)}
  return(
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Calculate your recommended daily water intake based on body weight and activity level.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 space-y-4">
        <div><label className={lbl}>Body Weight (kg)</label><input type="number" value={weight} onChange={e=>{setWeight(e.target.value);setResult(null)}} placeholder="70" className={inp}/></div>
        <div><label className={lbl}>Activity Level</label>
          <div className="flex gap-2">{levels.map(l=>(
            <button key={l.key} onClick={()=>{setActivity(l.key);setResult(null)}} className={`flex-1 py-2.5 text-xs font-bold uppercase rounded transition-colors ${activity===l.key?"bg-[#f5a623] text-black":"bg-[#1a1a1a] text-gray-400 hover:text-white"}`}>{l.label}</button>
          ))}</div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Water Intake</button>
      </div>
      {result&&(<div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Daily Water Intake</p>
        <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}</span>
        <span className="text-xl text-[#f5a623] font-bold ml-2">L / day</span>
        <p className="text-gray-500 text-xs mt-2">{Math.round(result*1000)} ml · approx {Math.round(result*4)} glasses (250ml each)</p>
        <CTA line1="Stay hydrated. Train harder." line2="Our coaches at Safa Fitness Club track your hydration and recovery as part of your personalised program." />
      </div>)}
    </div>
  )
}

// ─── Max Heart Rate ────────────────────────────────────────────────────────────
function HeartRateCalc() {
  const [age,setAge]=useState("")
  const [result,setResult]=useState<{max:number;zones:{name:string;min:number;max:number;desc:string}[]}|null>(null)
  function calc(){
    const a=parseInt(age);if(!a||a<10||a>100)return
    const max=Math.round(208-0.7*a)
    setResult({max,zones:[
      {name:"Fat Burn",    min:Math.round(max*0.5),  max:Math.round(max*0.6),  desc:"Light activity, fat oxidation"},
      {name:"Aerobic",     min:Math.round(max*0.6),  max:Math.round(max*0.7),  desc:"Builds endurance & cardio base"},
      {name:"Cardio",      min:Math.round(max*0.7),  max:Math.round(max*0.85), desc:"Improves cardiovascular fitness"},
      {name:"Peak",        min:Math.round(max*0.85), max:max,                  desc:"Maximum effort, short bursts"},
    ]})
  }
  return(
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Calculate your maximum heart rate and target training zones using the Tanaka formula (208 − 0.7 × age).</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 space-y-4">
        <div><label className={lbl}>Age (years)</label><input type="number" value={age} onChange={e=>{setAge(e.target.value);setResult(null)}} placeholder="30" className={inp}/></div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Heart Rate Zones</button>
      </div>
      {result&&(<div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
        <div className="text-center mb-5 pb-5 border-b border-[#2a2a2a]">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Max Heart Rate</p>
          <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result.max}</span>
          <span className="text-xl text-[#f5a623] font-bold ml-2">BPM</span>
        </div>
        <div className="space-y-2">
          {result.zones.map((z,i)=>(
            <div key={z.name} className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] rounded-lg">
              <div><p className="text-white text-sm font-semibold">{z.name} Zone</p><p className="text-gray-500 text-xs">{z.desc}</p></div>
              <span className="text-[#f5a623] font-bold">{z.min}–{z.max} bpm</span>
            </div>
          ))}
        </div>
        <CTA line1="Train in the right zone with expert coaching" line2="Safa Fitness Club trainers design zone-specific cardio programs for fat loss, endurance, and peak performance." />
      </div>)}
    </div>
  )
}

// ─── Lean Body Mass ────────────────────────────────────────────────────────────
function LeanMassCalc() {
  const [weight,setWeight]=useState("")
  const [height,setHeight]=useState("")
  const [gender,setGender]=useState("male")
  const [result,setResult]=useState<number|null>(null)
  function calc(){
    const w=parseFloat(weight),h=parseFloat(height)
    if(!w||!h||h<100)return
    setResult(gender==="male"
      ?Math.round((0.407*w+0.267*h-19.2)*10)/10
      :Math.round((0.252*w+0.473*h-48.3)*10)/10)
  }
  return(
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Estimate your lean body mass (muscle, bone, organs — excluding fat) using the Boer formula.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 space-y-4">
        <div><label className={lbl}>Gender</label>
          <div className="flex bg-[#1a1a1a] rounded p-1 w-fit">
            {["male","female"].map(g=>(
              <button key={g} onClick={()=>{setGender(g);setResult(null)}} className={`px-6 py-2 text-sm font-bold uppercase rounded transition-colors ${gender===g?"bg-[#f5a623] text-black":"text-gray-400 hover:text-white"}`}>{g}</button>
            ))}
          </div>
        </div>
        <div><label className={lbl}>Weight (kg)</label><input type="number" value={weight} onChange={e=>{setWeight(e.target.value);setResult(null)}} placeholder="75" className={inp}/></div>
        <div><label className={lbl}>Height (cm)</label><input type="number" value={height} onChange={e=>{setHeight(e.target.value);setResult(null)}} placeholder="175" className={inp}/></div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Lean Mass</button>
      </div>
      {result&&(<div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Lean Body Mass</p>
        <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}</span>
        <span className="text-xl text-[#f5a623] font-bold ml-2">kg</span>
        <p className="text-gray-500 text-xs mt-2">Fat mass ≈ {Math.round((parseFloat(weight)-result)*10)/10} kg</p>
        <CTA line1="Build more lean muscle at Safa Fitness Club" line2="Our strength coaches will design a program to increase your lean mass and reduce body fat." />
      </div>)}
    </div>
  )
}

// ─── Protein Calculator ────────────────────────────────────────────────────────
function ProteinCalc() {
  const [weight,setWeight]=useState("")
  const [goal,setGoal]=useState("maintain")
  const goals=[
    {key:"lose",     label:"Lose Fat",      mult:1.8, note:"High protein to preserve muscle during a cut"},
    {key:"maintain", label:"Maintain",      mult:1.6, note:"General health & muscle maintenance"},
    {key:"gain",     label:"Build Muscle",  mult:2.2, note:"Higher intake to support muscle synthesis"},
    {key:"athlete",  label:"Athlete",       mult:2.5, note:"For intense daily training"},
  ]
  const [result,setResult]=useState<number|null>(null)
  function calc(){const w=parseFloat(weight);if(!w||w<20)return;const g=goals.find(g=>g.key===goal)!;setResult(Math.round(w*g.mult))}
  const sel=goals.find(g=>g.key===goal)!
  return(
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Calculate your daily protein requirement based on body weight and fitness goal.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 space-y-4">
        <div><label className={lbl}>Body Weight (kg)</label><input type="number" value={weight} onChange={e=>{setWeight(e.target.value);setResult(null)}} placeholder="75" className={inp}/></div>
        <div><label className={lbl}>Goal</label>
          <div className="grid grid-cols-2 gap-2">{goals.map(g=>(
            <button key={g.key} onClick={()=>{setGoal(g.key);setResult(null)}} className={`py-2.5 text-xs font-bold uppercase rounded transition-colors ${goal===g.key?"bg-[#f5a623] text-black":"bg-[#1a1a1a] text-gray-400 hover:text-white"}`}>{g.label}</button>
          ))}</div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Protein</button>
      </div>
      {result&&(<div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Daily Protein Target</p>
        <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}</span>
        <span className="text-xl text-[#f5a623] font-bold ml-2">g / day</span>
        <p className="text-gray-500 text-xs mt-2">{sel.note}</p>
        <p className="text-gray-500 text-xs">{Math.round(result/parseFloat(weight)*10)/10} g per kg of body weight</p>
        <CTA line1="Hit your protein goals with expert guidance" line2="Safa Fitness Club nutrition coaches can help you plan meals to meet your daily protein target." />
      </div>)}
    </div>
  )
}

// ─── Running Pace ─────────────────────────────────────────────────────────────
function RunningPaceCalc() {
  const [dist,setDist]=useState("")
  const [mins,setMins]=useState("")
  const [secs,setSecs]=useState("")
  const [result,setResult]=useState<{paceMpk:string;paceKph:number;cal:number}|null>(null)
  function calc(){
    const d=parseFloat(dist),m=parseInt(mins)||0,s=parseInt(secs)||0
    if(!d||d<=0||(m===0&&s===0))return
    const totalSec=m*60+s
    const secPerKm=totalSec/d
    const paceMin=Math.floor(secPerKm/60)
    const paceSec=Math.round(secPerKm%60)
    const kph=Math.round((3600/secPerKm)*10)/10
    const cal=Math.round(d*65)
    setResult({paceMpk:`${paceMin}:${paceSec.toString().padStart(2,"0")}`,paceKph:kph,cal})
  }
  return(
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Calculate your running pace, speed, and estimated calories burned from your distance and time.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 space-y-4">
        <div><label className={lbl}>Distance (km)</label><input type="number" value={dist} onChange={e=>{setDist(e.target.value);setResult(null)}} placeholder="5" className={inp}/></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lbl}>Minutes</label><input type="number" value={mins} onChange={e=>{setMins(e.target.value);setResult(null)}} placeholder="25" className={inp}/></div>
          <div><label className={lbl}>Seconds</label><input type="number" value={secs} onChange={e=>{setSecs(e.target.value);setResult(null)}} placeholder="30" className={inp}/></div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Pace</button>
      </div>
      {result&&(<div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Pace</p><p className="text-2xl font-bold text-white">{result.paceMpk}</p><p className="text-gray-500 text-xs">min/km</p></div>
          <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Speed</p><p className="text-2xl font-bold text-[#f5a623]">{result.paceKph}</p><p className="text-gray-500 text-xs">km/h</p></div>
          <div><p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Calories</p><p className="text-2xl font-bold text-white">~{result.cal}</p><p className="text-gray-500 text-xs">kcal</p></div>
        </div>
        <CTA line1="Improve your running with expert coaching" line2="Safa Fitness Club's cardio coaches design structured running programs to improve your pace and endurance." />
      </div>)}
    </div>
  )
}

// ─── Waist-to-Height Ratio ────────────────────────────────────────────────────
function WaistHeightCalc() {
  const [waist,setWaist]=useState("")
  const [height,setHeight]=useState("")
  const [result,setResult]=useState<number|null>(null)
  function getCategory(r:number){
    if(r<0.4)  return{label:"Underweight",color:"text-blue-400",  desc:"Waist may be too small relative to height"}
    if(r<0.5)  return{label:"Healthy",    color:"text-green-400", desc:"Healthy waist-to-height ratio"}
    if(r<0.6)  return{label:"Overweight", color:"text-yellow-400",desc:"Increased health risk, consider lifestyle changes"}
    return       {label:"Obese",         color:"text-red-400",   desc:"High health risk — consult a professional"}
  }
  function calc(){const w=parseFloat(waist),h=parseFloat(height);if(!w||!h||h<100)return;setResult(Math.round(w/h*100)/100)}
  const cat=result?getCategory(result):null
  return(
    <div className="space-y-5">
      <p className="text-gray-400 text-sm">Waist-to-height ratio is a strong predictor of cardiovascular risk. A ratio below 0.5 is considered healthy.</p>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 space-y-4">
        <div><label className={lbl}>Waist Circumference (cm)</label><input type="number" value={waist} onChange={e=>{setWaist(e.target.value);setResult(null)}} placeholder="80" className={inp}/></div>
        <div><label className={lbl}>Height (cm)</label><input type="number" value={height} onChange={e=>{setHeight(e.target.value);setResult(null)}} placeholder="175" className={inp}/></div>
        <button onClick={calc} className="w-full py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors">Calculate Ratio</button>
      </div>
      {result&&cat&&(<div className="bg-[#141414] border border-[#f5a623]/40 rounded-lg p-5 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Waist-to-Height Ratio</p>
        <span className="text-5xl font-bold text-white" style={{fontFamily:"var(--font-display)"}}>{result}</span>
        <p className={`text-lg font-bold uppercase mt-2 mb-1 ${cat.color}`}>{cat.label}</p>
        <p className="text-gray-500 text-xs">{cat.desc}</p>
        <CTA line1="Reduce your waist with targeted training" line2="Safa Fitness Club's trainers can help you reduce visceral fat through structured cardio and strength programs." />
      </div>)}
    </div>
  )
}

// ─── Tool registry ────────────────────────────────────────────────────────────
const TOOLS: Record<string, { title: string; sub: string; component: React.ReactNode }> = {
  "bmi":          { title: "BMI Calculator",       sub: "Body Mass Index",        component: <BmiCalc /> },
  "calories":     { title: "Calorie Calculator",    sub: "Daily Energy Needs",     component: <CalorieCalc /> },
  "body-fat":     { title: "Body Fat Estimator",    sub: "US Navy Method",         component: <BodyFatCalc /> },
  "macros":       { title: "Macro Planner",          sub: "Protein · Carbs · Fat", component: <MacroCalc /> },
  "one-rep-max":  { title: "One Rep Max",            sub: "Epley Formula",          component: <OneRepMaxCalc /> },
  "ideal-weight": { title: "Ideal Weight",           sub: "4 Medical Formulas",     component: <IdealWeightCalc /> },
  "water":        { title: "Water Intake",           sub: "Daily Hydration",        component: <WaterCalc /> },
  "heart-rate":   { title: "Heart Rate Zones",       sub: "Tanaka Formula",         component: <HeartRateCalc /> },
  "lean-mass":    { title: "Lean Body Mass",         sub: "Boer Formula",           component: <LeanMassCalc /> },
  "protein":      { title: "Protein Calculator",     sub: "Daily Requirements",     component: <ProteinCalc /> },
  "running-pace": { title: "Running Pace",           sub: "Speed & Calories",       component: <RunningPaceCalc /> },
  "waist-height": { title: "Waist-Height Ratio",     sub: "Cardiovascular Risk",    component: <WaistHeightCalc /> },
}

// ─── Modal shell ──────────────────────────────────────────────────────────────
export default function ToolModal() {
  const { activeTool, closeTool } = useToolModal()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeTool() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [closeTool])

  useEffect(() => {
    if (activeTool) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [activeTool])

  if (!activeTool) return null
  const tool = TOOLS[activeTool]
  if (!tool) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={closeTool}
      />
      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl shadow-2xl shadow-black/80">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
          <div>
            <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-[0.25em]">{tool.sub}</p>
            <h2 className="text-white font-bold text-xl uppercase leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {tool.title}
            </h2>
          </div>
          <button
            onClick={closeTool}
            className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-[#1a1a1a] flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="px-6 py-6">
          {tool.component}
        </div>
      </div>
    </div>
  )
}
