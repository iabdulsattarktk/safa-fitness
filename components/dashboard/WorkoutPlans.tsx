"use client"

import { useState } from "react"
import { WORKOUT_PLANS, type WorkoutPlan, type WorkoutDay } from "@/lib/workout-plans"

const LEVEL_COLORS = {
  Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
}

function DayCard({ day }: { day: WorkoutDay }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#2a2a2a] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1a1a1a] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ backgroundColor: `${day.color}18` }}
          >
            {day.icon}
          </span>
          <div>
            <p className="text-white text-sm font-semibold">{day.day}</p>
            <p className="text-gray-500 text-xs">{day.focus}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-xs hidden sm:block">{day.duration}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-[#2a2a2a]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2a2a2a] text-gray-600 uppercase tracking-wider">
                  <th className="text-left px-4 py-2">Exercise</th>
                  <th className="text-center px-3 py-2">Sets</th>
                  <th className="text-center px-3 py-2">Reps</th>
                  <th className="text-center px-3 py-2">Rest</th>
                  <th className="text-left px-4 py-2 hidden md:table-cell">Muscle</th>
                </tr>
              </thead>
              <tbody>
                {day.exercises.map((ex, i) => (
                  <tr key={i} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{ex.name}</p>
                      {ex.tip && <p className="text-gray-600 mt-0.5 text-[10px] italic">{ex.tip}</p>}
                    </td>
                    <td className="px-3 py-3 text-center text-[#f5a623] font-bold">{ex.sets}</td>
                    <td className="px-3 py-3 text-center text-gray-300">{ex.reps}</td>
                    <td className="px-3 py-3 text-center text-gray-500">{ex.rest}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{ex.muscle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function PlanCard({ plan, active, onClick }: { plan: WorkoutPlan; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-xl border transition-all ${
        active
          ? "border-[#f5a623]/50 bg-[#f5a623]/5"
          : "border-[#2a2a2a] bg-[#141414] hover:border-[#2a2a2a] hover:bg-[#1a1a1a]"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-white font-semibold text-sm leading-snug">{plan.title}</p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${LEVEL_COLORS[plan.level]}`}
        >
          {plan.level}
        </span>
      </div>
      <p className="text-gray-500 text-xs mb-2">{plan.goal}</p>
      <div className="flex gap-3 text-[10px] text-gray-600">
        <span>📅 {plan.daysPerWeek}×/week</span>
        <span>🏋️ {plan.days.length} sessions</span>
      </div>
    </button>
  )
}

export default function WorkoutPlans() {
  const [activePlan, setActivePlan] = useState(WORKOUT_PLANS[0])

  return (
    <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#2a2a2a] bg-gradient-to-r from-[#f5a623]/8 to-transparent">
        <h2
          className="text-white font-bold uppercase text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Workout <span className="text-[#f5a623]">Plans</span>
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">Professional programs curated by Safa Fitness trainers</p>
      </div>

      <div className="p-5 grid lg:grid-cols-[280px_1fr] gap-5">
        {/* Plan selector */}
        <div className="space-y-2">
          <p className="text-gray-600 text-xs uppercase tracking-wider mb-3">Choose a Program</p>
          {WORKOUT_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              active={activePlan.id === plan.id}
              onClick={() => setActivePlan(plan)}
            />
          ))}
        </div>

        {/* Plan detail */}
        <div>
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h3
                className="text-white font-bold text-xl uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {activePlan.title}
              </h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[activePlan.level]}`}>
                {activePlan.level}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{activePlan.description}</p>
          </div>

          <div className="space-y-3">
            {activePlan.days.map((day, i) => (
              <DayCard key={i} day={day} />
            ))}
          </div>

          <p className="text-gray-600 text-xs mt-4 text-center">
            Tip: Rest 1–2 days between sessions. Progressive overload is key — increase weight when you hit the top of the rep range.
          </p>
        </div>
      </div>
    </div>
  )
}
