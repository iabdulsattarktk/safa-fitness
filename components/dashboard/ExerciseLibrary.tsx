"use client"

import { useState, useTransition, type ReactElement } from "react"
import { EXERCISES, BODY_PARTS, type BodyPart } from "@/lib/exercises"

// ── SVG Illustrations (one per exercise) ─────────────────────────────────────
function ExerciseSVG({ id, color }: { id: string; color: string }) {
  const c = color   // accent color
  const g = "#2a2a2a" // gray lines

  const svgs: Record<string, ReactElement> = {
    // CHEST
    "bench-press": (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="48" width="60" height="6" rx="3" fill={g}/>
        <rect x="5" y="42" width="70" height="4" rx="2" fill={c}/>
        <circle cx="40" cy="28" r="7" fill={g}/>
        <rect x="33" y="35" width="14" height="14" rx="2" fill={g}/>
        <line x1="20" y1="44" x2="33" y2="40" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="44" x2="47" y2="40" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    "push-up": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="58" cy="28" r="6" fill={g}/>
        <line x1="52" y1="34" x2="30" y2="46" stroke={g} strokeWidth="8" strokeLinecap="round"/>
        <line x1="30" y1="46" x2="14" y2="54" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="30" y1="46" x2="22" y2="58" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="52" y1="34" x2="60" y2="46" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <rect x="10" y="57" width="60" height="4" rx="2" fill={c} opacity="0.4"/>
        <line x1="52" y1="34" x2="30" y2="46" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    "incline-press": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="12" y="52" width="56" height="5" rx="2.5" fill={g}/>
        <rect x="8" y="38" width="64" height="4" rx="2" fill={c}/>
        <line x1="8" y1="40" x2="30" y2="52" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="40" cy="26" r="7" fill={g}/>
        <line x1="40" y1="33" x2="40" y2="48" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="42" x2="32" y2="52" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "chest-fly": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="24" r="7" fill={g}/>
        <rect x="34" y="31" width="12" height="14" rx="2" fill={g}/>
        <line x1="34" y1="36" x2="14" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="46" y1="36" x2="66" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="13" cy="29" r="4" fill={c}/>
        <circle cx="67" cy="29" r="4" fill={c}/>
        <path d="M20 36 Q40 48 60 36" stroke={c} strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
      </svg>
    ),
    "cable-crossover": (
      <svg viewBox="0 0 80 80" fill="none">
        <line x1="10" y1="15" x2="10" y2="65" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="70" y1="15" x2="70" y2="65" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="40" cy="28" r="6" fill={g}/>
        <line x1="10" y1="25" x2="36" y2="38" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="25" x2="44" y2="38" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <rect x="34" y="34" width="12" height="16" rx="2" fill={g}/>
        <circle cx="40" cy="55" r="3" fill={c}/>
      </svg>
    ),
    "dips": (
      <svg viewBox="0 0 80 80" fill="none">
        <line x1="20" y1="25" x2="20" y2="65" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="25" x2="60" y2="65" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="14" y1="38" x2="66" y2="38" stroke={c} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="40" cy="26" r="6" fill={g}/>
        <line x1="40" y1="32" x2="40" y2="48" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="24" y2="38" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="56" y2="38" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="34" y2="58" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="46" y2="58" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    // BACK
    "deadlift": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="56" width="64" height="6" rx="3" fill={c}/>
        <circle cx="40" cy="18" r="7" fill={g}/>
        <line x1="40" y1="25" x2="40" y2="44" stroke={g} strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="30" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="50" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="28" y2="56" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="52" y2="56" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "pull-up": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="14" width="64" height="5" rx="2.5" fill={c}/>
        <line x1="28" y1="19" x2="28" y2="10" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="52" y1="19" x2="52" y2="10" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="40" cy="32" r="7" fill={g}/>
        <line x1="40" y1="39" x2="40" y2="54" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="42" x2="28" y2="24" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="42" x2="52" y2="24" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="54" x2="34" y2="66" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="54" x2="46" y2="66" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "bent-over-row": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="56" cy="22" r="6" fill={g}/>
        <line x1="50" y1="28" x2="26" y2="40" stroke={g} strokeWidth="7" strokeLinecap="round"/>
        <line x1="26" y1="40" x2="18" y2="54" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="26" y1="40" x2="50" y2="34" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <rect x="8" y="42" width="46" height="4" rx="2" fill={c}/>
        <circle cx="8" cy="44" r="5" fill={c} opacity="0.7"/>
        <circle cx="54" cy="44" r="5" fill={c} opacity="0.7"/>
      </svg>
    ),
    "lat-pulldown": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="14" width="64" height="4" rx="2" fill={g}/>
        <line x1="16" y1="18" x2="30" y2="30" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <line x1="64" y1="18" x2="50" y2="30" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <rect x="28" y="28" width="24" height="4" rx="2" fill={c}/>
        <circle cx="40" cy="20" r="6" fill={g}/>
        <line x1="40" y1="26" x2="40" y2="42" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="42" x2="32" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="42" x2="48" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="54" x2="32" y2="66" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="48" y1="54" x2="48" y2="66" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "seated-row": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="54" width="28" height="6" rx="3" fill={g}/>
        <circle cx="26" cy="26" r="6" fill={g}/>
        <line x1="26" y1="32" x2="26" y2="50" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="26" y1="50" x2="14" y2="60" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="26" y1="50" x2="38" y2="60" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="26" y1="38" x2="52" y2="38" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <rect x="52" y="34" width="20" height="8" rx="2" fill={c}/>
        <line x1="38" y1="60" x2="38" y2="68" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "face-pull": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="60" y="12" width="8" height="56" rx="4" fill={g}/>
        <line x1="60" y1="30" x2="46" y2="34" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="30" x2="46" y2="26" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="30" r="7" fill={g}/>
        <line x1="32" y1="37" x2="32" y2="52" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="32" y1="42" x2="18" y2="52" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="42" x2="46" y2="32" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="32" y1="52" x2="26" y2="64" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="52" x2="38" y2="64" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    // LEGS
    "squat": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="10" y="24" width="60" height="4" rx="2" fill={c}/>
        <circle cx="40" cy="18" r="6" fill={g}/>
        <line x1="40" y1="24" x2="40" y2="28" stroke={g} strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="24" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="56" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="26" y2="38" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="54" y2="38" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="24" y1="56" x2="20" y2="66" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="56" y1="56" x2="60" y2="66" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "lunge": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="36" cy="14" r="6" fill={g}/>
        <line x1="36" y1="20" x2="36" y2="38" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="36" y1="38" x2="22" y2="52" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="36" y1="38" x2="54" y2="44" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="22" y1="52" x2="18" y2="66" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="54" y1="44" x2="58" y2="58" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="36" y1="28" x2="50" y2="26" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <rect x="10" y="64" width="60" height="3" rx="1.5" fill={c} opacity="0.5"/>
      </svg>
    ),
    "leg-press": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="54" width="30" height="8" rx="4" fill={g}/>
        <circle cx="22" cy="32" r="6" fill={g}/>
        <line x1="22" y1="38" x2="22" y2="52" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="22" y1="44" x2="10" y2="60" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="22" y1="44" x2="38" y2="52" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <rect x="42" y="28" width="28" height="36" rx="4" fill={g} opacity="0.5"/>
        <line x1="42" y1="44" x2="56" y2="36" stroke={c} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="66" cy="32" r="4" fill={c}/>
      </svg>
    ),
    "rdl": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="54" width="64" height="5" rx="2.5" fill={c}/>
        <circle cx="50" cy="16" r="6" fill={g}/>
        <line x1="50" y1="22" x2="40" y2="38" stroke={g} strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="30" y2="54" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="52" y2="54" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="30" x2="16" y2="54" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="30" x2="30" y2="54" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "leg-curl": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="30" width="50" height="8" rx="4" fill={g}/>
        <rect x="52" y="28" width="18" height="12" rx="4" fill={g} opacity="0.5"/>
        <circle cx="22" cy="20" r="6" fill={g}/>
        <line x1="22" y1="26" x2="22" y2="36" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="22" y1="36" x2="14" y2="46" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="22" y1="36" x2="38" y2="44" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="38" y1="44" x2="44" y2="36" stroke={c} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="46" cy="34" r="4" fill={c}/>
      </svg>
    ),
    "calf-raise": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="14" r="6" fill={g}/>
        <line x1="40" y1="20" x2="40" y2="40" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="28" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="52" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="28" y1="56" x2="24" y2="64" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="52" y1="56" x2="56" y2="64" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="18" y1="68" x2="62" y2="68" stroke={c} strokeWidth="3" strokeLinecap="round"/>
        <line x1="24" y1="64" x2="26" y2="68" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="56" y1="64" x2="54" y2="68" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    // ARMS
    "bicep-curl": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="14" r="6" fill={g}/>
        <line x1="40" y1="20" x2="40" y2="40" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="30" x2="54" y2="22" stroke={g} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M54 22 Q62 20 58 38" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="57" cy="40" r="5" fill={c}/>
        <line x1="40" y1="40" x2="32" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="48" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "hammer-curl": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="14" r="6" fill={g}/>
        <line x1="40" y1="20" x2="40" y2="40" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="30" x2="56" y2="30" stroke={g} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="56" y1="30" x2="56" y2="46" stroke={c} strokeWidth="3" strokeLinecap="round"/>
        <rect x="50" y="46" width="12" height="6" rx="3" fill={c}/>
        <line x1="40" y1="40" x2="32" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="48" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "preacher-curl": (
      <svg viewBox="0 0 80 80" fill="none">
        <path d="M20 60 L50 28 L64 60" stroke={g} strokeWidth="4" fill="none" strokeLinecap="round"/>
        <circle cx="38" cy="18" r="6" fill={g}/>
        <line x1="38" y1="24" x2="38" y2="36" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="32" x2="50" y2="28" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="38" y1="32" x2="28" y2="40" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <rect x="22" y="38" width="16" height="4" rx="2" fill={c}/>
      </svg>
    ),
    "tricep-pushdown": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="34" y="8" width="12" height="24" rx="3" fill={g}/>
        <circle cx="40" cy="20" r="5" fill={c} opacity="0.4"/>
        <line x1="36" y1="32" x2="30" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <line x1="44" y1="32" x2="50" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="36" r="5" fill={g}/>
        <line x1="26" y1="41" x2="26" y2="56" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="26" y1="56" x2="18" y2="68" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="26" y1="56" x2="34" y2="68" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="26" y1="46" x2="38" y2="32" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <rect x="32" y="44" width="16" height="4" rx="2" fill={c}/>
      </svg>
    ),
    "skull-crusher": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="52" r="6" fill={g}/>
        <line x1="40" y1="46" x2="40" y2="34" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="54" y2="34" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="26" y2="34" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <rect x="8" y="46" width="64" height="5" rx="2.5" fill={g}/>
        <rect x="14" y="30" width="52" height="4" rx="2" fill={c}/>
        <line x1="40" y1="32" x2="40" y2="16" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <rect x="28" y="12" width="24" height="8" rx="2" fill={c} opacity="0.7"/>
      </svg>
    ),
    "close-grip-bench": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="10" y="50" width="60" height="6" rx="3" fill={g}/>
        <rect x="10" y="40" width="60" height="4" rx="2" fill={c}/>
        <circle cx="40" cy="28" r="7" fill={g}/>
        <line x1="40" y1="35" x2="40" y2="46" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="36" y1="40" x2="28" y2="40" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="44" y1="40" x2="52" y2="40" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    // SHOULDERS
    "ohp": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="18" width="64" height="4" rx="2" fill={c}/>
        <circle cx="40" cy="32" r="6" fill={g}/>
        <line x1="40" y1="38" x2="40" y2="56" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="26" y2="22" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="54" y2="22" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="56" x2="30" y2="68" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="56" x2="50" y2="68" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "lateral-raise": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="20" r="6" fill={g}/>
        <line x1="40" y1="26" x2="40" y2="46" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="14" y2="34" stroke={g} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="66" y2="34" stroke={g} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="12" cy="34" r="5" fill={c}/>
        <circle cx="68" cy="34" r="5" fill={c}/>
        <line x1="40" y1="46" x2="30" y2="60" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="46" x2="50" y2="60" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "front-raise": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="22" r="6" fill={g}/>
        <line x1="40" y1="28" x2="40" y2="48" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="38" x2="60" y2="46" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="20" y2="16" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="18" cy="14" r="5" fill={c}/>
        <circle cx="62" cy="48" r="5" fill={c} opacity="0.5"/>
        <line x1="40" y1="48" x2="30" y2="62" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="50" y2="62" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "rear-delt-fly": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="46" cy="20" r="6" fill={g}/>
        <line x1="46" y1="26" x2="34" y2="38" stroke={g} strokeWidth="7" strokeLinecap="round"/>
        <line x1="34" y1="38" x2="34" y2="56" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="34" y1="42" x2="14" y2="32" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="34" y1="42" x2="60" y2="28" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="12" cy="30" r="5" fill={c}/>
        <circle cx="62" cy="26" r="5" fill={c}/>
      </svg>
    ),
    "arnold-press": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="22" r="6" fill={g}/>
        <line x1="40" y1="28" x2="40" y2="48" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="24" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="56" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="22" cy="28" r="5" fill={c}/>
        <circle cx="58" cy="28" r="5" fill={c}/>
        <path d="M22 28 Q22 14 40 14 Q58 14 58 28" stroke={c} strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
        <line x1="40" y1="48" x2="30" y2="62" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="50" y2="62" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    // CORE
    "plank": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="62" cy="26" r="6" fill={g}/>
        <line x1="56" y1="32" x2="16" y2="42" stroke={g} strokeWidth="8" strokeLinecap="round"/>
        <line x1="16" y1="42" x2="10" y2="54" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="16" y1="42" x2="26" y2="54" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="56" y1="32" x2="62" y2="46" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="56" y1="32" x2="70" y2="44" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <rect x="8" y="56" width="64" height="3" rx="1.5" fill={c} opacity="0.4"/>
        <line x1="56" y1="32" x2="16" y2="42" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
    "crunch": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="58" width="64" height="4" rx="2" fill={g}/>
        <circle cx="40" cy="24" r="6" fill={g}/>
        <path d="M40 30 Q30 44 18 58" stroke={g} strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M40 30 Q50 44 62 58" stroke={g} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="30" y2="44" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="50" y2="44" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <path d="M34 36 Q40 28 46 36" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    "leg-raise": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="12" width="64" height="5" rx="2.5" fill={c}/>
        <line x1="36" y1="17" x2="36" y2="10" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="44" y1="17" x2="44" y2="10" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="40" cy="26" r="6" fill={g}/>
        <line x1="40" y1="32" x2="40" y2="48" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="26" y2="36" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="54" y2="36" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <path d="M26 36 Q20 28 26 20" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M54 36 Q60 28 54 20" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    "russian-twist": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="8" y="58" width="64" height="4" rx="2" fill={g}/>
        <circle cx="40" cy="22" r="6" fill={g}/>
        <path d="M40 28 Q30 40 22 56" stroke={g} strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M40 28 Q50 40 58 56" stroke={g} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="62" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="64" cy="28" r="5" fill={c}/>
        <path d="M38 32 L62 26" stroke={c} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
      </svg>
    ),
    "mountain-climber": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="60" cy="20" r="6" fill={g}/>
        <line x1="54" y1="26" x2="16" y2="38" stroke={g} strokeWidth="7" strokeLinecap="round"/>
        <line x1="16" y1="38" x2="10" y2="52" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="54" y1="26" x2="60" y2="40" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="54" y1="26" x2="70" y2="36" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="16" y1="38" x2="32" y2="28" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <circle cx="34" cy="26" r="4" fill={c}/>
        <rect x="8" y="54" width="64" height="3" rx="1.5" fill={c} opacity="0.3"/>
      </svg>
    ),
    "ab-wheel": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="52" r="14" stroke={c} strokeWidth="3" fill="none"/>
        <circle cx="40" cy="52" r="4" fill={c}/>
        <line x1="26" y1="52" x2="54" y2="52" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="56" cy="22" r="6" fill={g}/>
        <line x1="56" y1="28" x2="50" y2="40" stroke={g} strokeWidth="6" strokeLinecap="round"/>
        <line x1="50" y1="40" x2="36" y2="44" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="50" y1="40" x2="60" y2="44" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    // CARDIO
    "treadmill": (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="10" y="54" width="60" height="8" rx="4" fill={g}/>
        <rect x="14" y="50" width="52" height="6" rx="3" fill={c} opacity="0.6"/>
        <circle cx="44" cy="24" r="6" fill={g}/>
        <line x1="44" y1="30" x2="40" y2="48" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="28" y2="32" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="52" y2="34" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="32" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="48" x2="50" y2="52" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "cycling": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="22" cy="56" r="12" stroke={g} strokeWidth="3" fill="none"/>
        <circle cx="58" cy="56" r="12" stroke={g} strokeWidth="3" fill="none"/>
        <circle cx="22" cy="56" r="3" fill={c}/>
        <circle cx="58" cy="56" r="3" fill={c}/>
        <line x1="22" y1="56" x2="40" y2="44" stroke={g} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="58" y2="56" stroke={g} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="46" cy="24" r="5" fill={g}/>
        <line x1="46" y1="29" x2="42" y2="38" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="42" y1="38" x2="34" y2="44" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="42" y1="38" x2="50" y2="44" stroke={g} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "jump-rope": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="18" r="6" fill={g}/>
        <line x1="40" y1="24" x2="40" y2="44" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="28" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="52" y2="30" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="30" y2="56" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="50" y2="56" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <path d="M28 30 Q10 52 28 64 Q40 70 52 64 Q70 52 52 30" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="28" cy="30" r="3" fill={c}/>
        <circle cx="52" cy="30" r="3" fill={c}/>
      </svg>
    ),
    "rowing": (
      <svg viewBox="0 0 80 80" fill="none">
        <path d="M8 62 Q20 52 40 54 Q60 56 72 48" stroke={g} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="36" cy="28" r="6" fill={g}/>
        <line x1="36" y1="34" x2="36" y2="50" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="36" y1="40" x2="22" y2="46" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="36" y1="40" x2="52" y2="34" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="52" y1="34" x2="68" y2="40" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="50" x2="26" y2="62" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="36" y1="50" x2="46" y2="62" stroke={g} strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "hiit": (
      <svg viewBox="0 0 80 80" fill="none">
        <circle cx="50" cy="14" r="6" fill={g}/>
        <line x1="50" y1="20" x2="44" y2="38" stroke={g} strokeWidth="5" strokeLinecap="round"/>
        <line x1="44" y1="28" x2="30" y2="24" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="44" y1="28" x2="56" y2="22" stroke={g} strokeWidth="3" strokeLinecap="round"/>
        <line x1="44" y1="38" x2="32" y2="54" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <line x1="44" y1="38" x2="56" y2="52" stroke={g} strokeWidth="4" strokeLinecap="round"/>
        <path d="M16 44 L24 36 L30 44 L38 28" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="38" cy="28" r="3" fill={c}/>
      </svg>
    ),
  }

  return svgs[id] ?? (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="24" stroke={c} strokeWidth="3" fill="none"/>
      <circle cx="40" cy="40" r="8" fill={c} opacity="0.4"/>
    </svg>
  )
}

// ── Body Part icon SVGs ───────────────────────────────────────────────────────
function BodyPartIcon({ id }: { id: BodyPart }) {
  const icons: Record<BodyPart, ReactElement> = {
    chest: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6 10 Q16 6 26 10 Q28 18 26 24 Q16 28 6 24 Q4 18 6 10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M16 10 L16 24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 14 Q12 16 16 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M24 14 Q20 16 16 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    back: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M10 6 Q16 4 22 6 L22 26 Q16 28 10 26 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <line x1="10" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
    legs: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M12 6 L14 18 L10 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 6 L18 18 L22 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 6 L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    arms: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 10 Q6 16 8 22 Q14 26 18 22 Q22 18 20 14 Q18 10 14 10 Q10 8 8 10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M18 22 L24 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    shoulders: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M6 16 Q10 12 16 14 Q22 12 26 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="6" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="26" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    core: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="10" y="8" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="16" y1="8" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1"/>
        <line x1="10" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    cardio: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 26 L6 16 Q4 10 10 8 Q14 7 16 12 Q18 7 22 8 Q28 10 26 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M10 17 L13 14 L16 19 L19 11 L22 17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }
  return icons[id]
}

// ── Difficulty badge ──────────────────────────────────────────────────────────
const DIFF_COLOR: Record<string, string> = {
  Beginner:     "text-green-400 bg-green-400/10",
  Intermediate: "text-yellow-400 bg-yellow-400/10",
  Advanced:     "text-red-400 bg-red-400/10",
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ExerciseLibrary({
  savedIds,
  userName,
}: {
  savedIds: string[]
  userName: string
}) {
  const [activeTab, setActiveTab] = useState<BodyPart>("chest")
  const [saved, setSaved] = useState<Set<string>>(new Set(savedIds))
  const [isPending, startTransition] = useTransition()
  const [showMine, setShowMine] = useState(false)

  const filtered = showMine
    ? EXERCISES.filter((e) => saved.has(e.id))
    : EXERCISES.filter((e) => e.bodyPart === activeTab)

  const activeColor = BODY_PARTS.find((b) => b.id === activeTab)?.color ?? "#f5a623"

  const toggle = (exerciseId: string) => {
    startTransition(async () => {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId }),
      })
      if (res.ok) {
        const { saved: isSaved } = await res.json()
        setSaved((prev) => {
          const next = new Set(prev)
          isSaved ? next.add(exerciseId) : next.delete(exerciseId)
          return next
        })
      }
    })
  }

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
            Exercise <span className="text-[#f5a623]">Library</span>
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Select exercises for your personal routine, {userName.split(" ")[0]}
          </p>
        </div>
        <button
          onClick={() => setShowMine(!showMine)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
            showMine
              ? "bg-[#f5a623] text-black border-[#f5a623]"
              : "text-gray-400 border-[#2a2a2a] hover:border-[#f5a623]/40 hover:text-white"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          My Routine ({saved.size})
        </button>
      </div>

      {/* ── Body Part Tabs ── */}
      {!showMine && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {BODY_PARTS.map((bp) => (
            <button
              key={bp.id}
              onClick={() => setActiveTab(bp.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                activeTab === bp.id
                  ? "border-transparent text-black"
                  : "border-[#2a2a2a] text-gray-400 hover:text-white hover:border-[#3a3a3a] bg-[#141414]"
              }`}
              style={activeTab === bp.id ? { backgroundColor: bp.color, borderColor: bp.color } : {}}
            >
              <span
                className="w-5 h-5"
                style={{ color: activeTab === bp.id ? "black" : bp.color }}
              >
                <BodyPartIcon id={bp.id} />
              </span>
              {bp.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Exercise Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl py-16 text-center">
          <p className="text-4xl mb-3">💪</p>
          <p className="text-gray-400 font-semibold">No exercises selected yet</p>
          <p className="text-gray-600 text-sm mt-1">Browse by body part and add exercises to your routine</p>
          <button
            onClick={() => setShowMine(false)}
            className="mt-4 px-5 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black text-sm font-bold rounded-lg transition-colors"
          >
            Browse Exercises
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((ex) => {
            const isSaved = saved.has(ex.id)
            const bpColor = BODY_PARTS.find((b) => b.id === ex.bodyPart)?.color ?? "#f5a623"
            return (
              <div
                key={ex.id}
                className={`bg-[#141414] rounded-xl border transition-all duration-200 overflow-hidden group ${
                  isSaved ? "border-[#f5a623]/40 shadow-lg shadow-[#f5a623]/5" : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                }`}
              >
                {/* SVG illustration */}
                <div
                  className="relative h-32 flex items-center justify-center"
                  style={{ backgroundColor: bpColor + "0d" }}
                >
                  <div className="w-20 h-20">
                    <ExerciseSVG id={ex.id} color={bpColor} />
                  </div>
                  {/* Difficulty badge */}
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${DIFF_COLOR[ex.difficulty]}`}>
                    {ex.difficulty}
                  </span>
                  {/* Saved indicator */}
                  {isSaved && (
                    <span className="absolute top-2 right-2 w-6 h-6 bg-[#f5a623] rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3.5">
                  <h3 className="text-white font-bold text-sm leading-tight">{ex.name}</h3>
                  <p style={{ color: bpColor }} className="text-xs mt-0.5 font-medium">{ex.muscle}</p>

                  <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
                    <span>{ex.sets} sets</span>
                    <span className="text-[#2a2a2a]">•</span>
                    <span>{ex.reps}</span>
                  </div>

                  <p className="text-gray-600 text-[11px] mt-2 leading-relaxed line-clamp-2">{ex.tip}</p>

                  {/* Add/Remove button */}
                  <button
                    onClick={() => toggle(ex.id)}
                    disabled={isPending}
                    className={`mt-3 w-full py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isSaved
                        ? "bg-[#f5a623]/10 text-[#f5a623] border border-[#f5a623]/30 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30"
                        : "bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:bg-[#f5a623]/10 hover:text-[#f5a623] hover:border-[#f5a623]/30"
                    }`}
                  >
                    {isSaved ? "✓ Added to Routine" : "+ Add to My Routine"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
