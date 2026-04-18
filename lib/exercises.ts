export type BodyPart = "chest" | "back" | "legs" | "arms" | "shoulders" | "core" | "cardio"

export interface Exercise {
  id: string
  name: string
  bodyPart: BodyPart
  muscle: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  sets: string
  reps: string
  tip: string
}

export const BODY_PARTS: { id: BodyPart; label: string; color: string }[] = [
  { id: "chest",     label: "Chest",     color: "#ef4444" },
  { id: "back",      label: "Back",      color: "#3b82f6" },
  { id: "legs",      label: "Legs",      color: "#22c55e" },
  { id: "arms",      label: "Arms",      color: "#f5a623" },
  { id: "shoulders", label: "Shoulders", color: "#a855f7" },
  { id: "core",      label: "Core",      color: "#06b6d4" },
  { id: "cardio",    label: "Cardio",    color: "#ec4899" },
]

export const EXERCISES: Exercise[] = [
  // ── CHEST ──
  { id: "bench-press",     name: "Bench Press",        bodyPart: "chest",     muscle: "Pectorals",       difficulty: "Intermediate", sets: "4", reps: "8–12", tip: "Keep shoulder blades retracted throughout the movement." },
  { id: "push-up",         name: "Push Up",            bodyPart: "chest",     muscle: "Pectorals",       difficulty: "Beginner",     sets: "3", reps: "15–20", tip: "Body should form a straight line from head to heels." },
  { id: "incline-press",   name: "Incline Dumbbell Press", bodyPart: "chest", muscle: "Upper Chest",     difficulty: "Intermediate", sets: "3", reps: "10–12", tip: "Set bench at 30–45°, don't flare elbows." },
  { id: "chest-fly",       name: "Chest Fly",          bodyPart: "chest",     muscle: "Pectorals",       difficulty: "Intermediate", sets: "3", reps: "12–15", tip: "Slight bend in elbows, focus on the stretch." },
  { id: "cable-crossover", name: "Cable Crossover",    bodyPart: "chest",     muscle: "Inner Chest",     difficulty: "Intermediate", sets: "3", reps: "12–15", tip: "Squeeze at the bottom for maximum contraction." },
  { id: "dips",            name: "Chest Dips",         bodyPart: "chest",     muscle: "Lower Chest",     difficulty: "Intermediate", sets: "3", reps: "10–15", tip: "Lean forward slightly to target chest over triceps." },

  // ── BACK ──
  { id: "deadlift",        name: "Deadlift",           bodyPart: "back",      muscle: "Erector Spinae",  difficulty: "Advanced",     sets: "4", reps: "5–8",  tip: "Keep the bar close to your body throughout the lift." },
  { id: "pull-up",         name: "Pull Up",            bodyPart: "back",      muscle: "Latissimus Dorsi",difficulty: "Intermediate", sets: "4", reps: "6–10", tip: "Full hang at the bottom, chin above bar at top." },
  { id: "bent-over-row",   name: "Bent Over Row",      bodyPart: "back",      muscle: "Rhomboids",       difficulty: "Intermediate", sets: "4", reps: "8–12", tip: "Keep back parallel to floor, pull to lower chest." },
  { id: "lat-pulldown",    name: "Lat Pulldown",       bodyPart: "back",      muscle: "Latissimus Dorsi",difficulty: "Beginner",     sets: "3", reps: "10–12", tip: "Pull to upper chest, don't lean back too far." },
  { id: "seated-row",      name: "Seated Cable Row",   bodyPart: "back",      muscle: "Middle Back",     difficulty: "Beginner",     sets: "3", reps: "12–15", tip: "Keep torso upright, squeeze shoulder blades." },
  { id: "face-pull",       name: "Face Pull",          bodyPart: "back",      muscle: "Rear Deltoids",   difficulty: "Beginner",     sets: "3", reps: "15–20", tip: "Pull to face level, elbows high." },

  // ── LEGS ──
  { id: "squat",           name: "Barbell Squat",      bodyPart: "legs",      muscle: "Quadriceps",      difficulty: "Advanced",     sets: "4", reps: "6–10", tip: "Knees track over toes, chest tall throughout." },
  { id: "lunge",           name: "Walking Lunges",     bodyPart: "legs",      muscle: "Quadriceps",      difficulty: "Beginner",     sets: "3", reps: "12/leg", tip: "Keep front knee above ankle, not past toes." },
  { id: "leg-press",       name: "Leg Press",          bodyPart: "legs",      muscle: "Quadriceps",      difficulty: "Beginner",     sets: "4", reps: "10–12", tip: "Don't lock out knees at the top." },
  { id: "rdl",             name: "Romanian Deadlift",  bodyPart: "legs",      muscle: "Hamstrings",      difficulty: "Intermediate", sets: "3", reps: "10–12", tip: "Push hips back, feel the stretch in hamstrings." },
  { id: "leg-curl",        name: "Leg Curl",           bodyPart: "legs",      muscle: "Hamstrings",      difficulty: "Beginner",     sets: "3", reps: "12–15", tip: "Curl fully, pause at top for 1 second." },
  { id: "calf-raise",      name: "Calf Raise",         bodyPart: "legs",      muscle: "Calves",          difficulty: "Beginner",     sets: "4", reps: "15–20", tip: "Full range of motion — full stretch at bottom." },

  // ── ARMS ──
  { id: "bicep-curl",      name: "Barbell Bicep Curl", bodyPart: "arms",      muscle: "Biceps",          difficulty: "Beginner",     sets: "3", reps: "10–12", tip: "Keep elbows stationary, don't swing." },
  { id: "hammer-curl",     name: "Hammer Curl",        bodyPart: "arms",      muscle: "Brachialis",      difficulty: "Beginner",     sets: "3", reps: "12–15", tip: "Neutral grip, slow and controlled." },
  { id: "preacher-curl",   name: "Preacher Curl",      bodyPart: "arms",      muscle: "Biceps",          difficulty: "Intermediate", sets: "3", reps: "10–12", tip: "Don't fully extend — keep slight bend at bottom." },
  { id: "tricep-pushdown", name: "Tricep Pushdown",    bodyPart: "arms",      muscle: "Triceps",         difficulty: "Beginner",     sets: "3", reps: "12–15", tip: "Elbows fixed at sides, squeeze at bottom." },
  { id: "skull-crusher",   name: "Skull Crusher",      bodyPart: "arms",      muscle: "Triceps",         difficulty: "Intermediate", sets: "3", reps: "10–12", tip: "Only forearms move, upper arms stay vertical." },
  { id: "close-grip-bench",name: "Close Grip Bench",   bodyPart: "arms",      muscle: "Triceps",         difficulty: "Intermediate", sets: "3", reps: "8–12",  tip: "Hands shoulder-width, elbows close to body." },

  // ── SHOULDERS ──
  { id: "ohp",             name: "Overhead Press",     bodyPart: "shoulders", muscle: "Front Deltoids",  difficulty: "Intermediate", sets: "4", reps: "8–10", tip: "Press straight up, core tight, don't arch back." },
  { id: "lateral-raise",   name: "Lateral Raise",      bodyPart: "shoulders", muscle: "Side Deltoids",   difficulty: "Beginner",     sets: "3", reps: "12–15", tip: "Lead with elbows, raise to shoulder height only." },
  { id: "front-raise",     name: "Front Raise",        bodyPart: "shoulders", muscle: "Front Deltoids",  difficulty: "Beginner",     sets: "3", reps: "12–15", tip: "Controlled movement, don't use momentum." },
  { id: "rear-delt-fly",   name: "Rear Delt Fly",      bodyPart: "shoulders", muscle: "Rear Deltoids",   difficulty: "Beginner",     sets: "3", reps: "15–20", tip: "Bent at 90°, arms straight out to sides." },
  { id: "arnold-press",    name: "Arnold Press",       bodyPart: "shoulders", muscle: "All Deltoids",    difficulty: "Intermediate", sets: "3", reps: "10–12", tip: "Rotate palms outward as you press up." },

  // ── CORE ──
  { id: "plank",           name: "Plank",              bodyPart: "core",      muscle: "Transverse Abs",  difficulty: "Beginner",     sets: "3", reps: "30–60s", tip: "Neutral spine, don't let hips sag or rise." },
  { id: "crunch",          name: "Crunches",           bodyPart: "core",      muscle: "Rectus Abdominis",difficulty: "Beginner",     sets: "3", reps: "20–25", tip: "Curl shoulders off floor, don't pull on neck." },
  { id: "leg-raise",       name: "Hanging Leg Raise",  bodyPart: "core",      muscle: "Lower Abs",       difficulty: "Intermediate", sets: "3", reps: "12–15", tip: "Control the descent, avoid swinging." },
  { id: "russian-twist",   name: "Russian Twist",      bodyPart: "core",      muscle: "Obliques",        difficulty: "Beginner",     sets: "3", reps: "20/side", tip: "Feet off floor for more challenge." },
  { id: "mountain-climber",name: "Mountain Climbers",  bodyPart: "core",      muscle: "Full Core",       difficulty: "Intermediate", sets: "3", reps: "30s",   tip: "Hips level, drive knees fast for cardio effect." },
  { id: "ab-wheel",        name: "Ab Wheel Rollout",   bodyPart: "core",      muscle: "Full Core",       difficulty: "Advanced",     sets: "3", reps: "8–12",  tip: "Keep core braced — don't let back arch." },

  // ── CARDIO ──
  { id: "treadmill",       name: "Treadmill Run",      bodyPart: "cardio",    muscle: "Full Body",       difficulty: "Beginner",     sets: "1", reps: "20–30 min", tip: "Stay in 65–75% max heart rate for fat burn." },
  { id: "cycling",         name: "Stationary Cycling", bodyPart: "cardio",    muscle: "Legs & Cardio",   difficulty: "Beginner",     sets: "1", reps: "20–30 min", tip: "Adjust resistance — moderate effort, steady pace." },
  { id: "jump-rope",       name: "Jump Rope",          bodyPart: "cardio",    muscle: "Full Body",       difficulty: "Intermediate", sets: "5", reps: "1 min on/30s off", tip: "Land softly on balls of feet." },
  { id: "rowing",          name: "Rowing Machine",     bodyPart: "cardio",    muscle: "Full Body",       difficulty: "Intermediate", sets: "1", reps: "15–20 min", tip: "Drive with legs first, then lean back, then pull arms." },
  { id: "hiit",            name: "HIIT Sprints",       bodyPart: "cardio",    muscle: "Full Body",       difficulty: "Advanced",     sets: "8", reps: "30s sprint / 30s rest", tip: "All-out effort on sprint intervals." },
]
