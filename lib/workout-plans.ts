export type Exercise = {
  name: string
  sets: number
  reps: string
  rest: string
  muscle: string
  tip?: string
}

export type WorkoutDay = {
  day: string
  focus: string
  color: string
  icon: string
  duration: string
  exercises: Exercise[]
}

export type WorkoutPlan = {
  id: string
  title: string
  level: "Beginner" | "Intermediate" | "Advanced"
  goal: string
  daysPerWeek: number
  description: string
  days: WorkoutDay[]
}

export const WORKOUT_PLANS: WorkoutPlan[] = [
  // ── 1. Push / Pull / Legs ─────────────────────────────────────────────────
  {
    id: "ppl",
    title: "Push / Pull / Legs",
    level: "Intermediate",
    goal: "Muscle & Strength",
    daysPerWeek: 6,
    description: "Classic 3-day split repeated twice per week. Push (chest/shoulders/triceps), Pull (back/biceps), Legs (quads/hamstrings/glutes). Ideal for building overall muscle with high weekly frequency.",
    days: [
      {
        day: "Day 1 — Push",
        focus: "Chest · Shoulders · Triceps",
        color: "#f5a623",
        icon: "💪",
        duration: "60–70 min",
        exercises: [
          { name: "Flat Barbell Bench Press", sets: 4, reps: "6–8", rest: "2–3 min", muscle: "Chest", tip: "Keep shoulder blades retracted throughout the lift." },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8–12", rest: "90 s", muscle: "Upper Chest" },
          { name: "Cable Flye (Low → High)", sets: 3, reps: "12–15", rest: "60 s", muscle: "Chest", tip: "Feel the stretch at the bottom, squeeze at the top." },
          { name: "Overhead Press (Barbell)", sets: 4, reps: "6–10", rest: "2 min", muscle: "Shoulders" },
          { name: "Lateral Raises (Dumbbell)", sets: 3, reps: "15–20", rest: "60 s", muscle: "Side Delts", tip: "Lead with your elbows, not your wrists." },
          { name: "Tricep Pushdown (Cable)", sets: 3, reps: "12–15", rest: "60 s", muscle: "Triceps" },
          { name: "Overhead Tricep Extension", sets: 3, reps: "10–12", rest: "60 s", muscle: "Triceps Long Head" },
        ],
      },
      {
        day: "Day 2 — Pull",
        focus: "Back · Biceps · Rear Delts",
        color: "#8b5cf6",
        icon: "🏋️",
        duration: "60–70 min",
        exercises: [
          { name: "Deadlift", sets: 4, reps: "4–6", rest: "3 min", muscle: "Full Back / Hamstrings", tip: "Brace your core like you're about to get punched." },
          { name: "Barbell Row", sets: 4, reps: "6–8", rest: "2 min", muscle: "Mid Back" },
          { name: "Pull-Ups / Lat Pulldown", sets: 3, reps: "8–12", rest: "90 s", muscle: "Lats", tip: "Pull your elbows to your hips, not your chin to the bar." },
          { name: "Seated Cable Row", sets: 3, reps: "10–12", rest: "90 s", muscle: "Mid Back / Rhomboids" },
          { name: "Face Pulls (Cable)", sets: 3, reps: "15–20", rest: "60 s", muscle: "Rear Delts / Rotator Cuff" },
          { name: "Barbell Curl", sets: 3, reps: "8–12", rest: "60 s", muscle: "Biceps" },
          { name: "Hammer Curl", sets: 2, reps: "12–15", rest: "60 s", muscle: "Brachialis / Forearms" },
        ],
      },
      {
        day: "Day 3 — Legs",
        focus: "Quads · Hamstrings · Glutes · Calves",
        color: "#22c55e",
        icon: "🦵",
        duration: "65–75 min",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "6–8", rest: "3 min", muscle: "Quads / Glutes", tip: "Knees track over toes, chest stays tall." },
          { name: "Romanian Deadlift", sets: 3, reps: "8–10", rest: "2 min", muscle: "Hamstrings / Glutes" },
          { name: "Leg Press", sets: 3, reps: "10–15", rest: "90 s", muscle: "Quads / Glutes" },
          { name: "Leg Curl (Machine)", sets: 3, reps: "12–15", rest: "60 s", muscle: "Hamstrings" },
          { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "90 s", muscle: "Quads / Glutes" },
          { name: "Standing Calf Raise", sets: 4, reps: "15–20", rest: "60 s", muscle: "Calves", tip: "Full range — pause at top and bottom." },
          { name: "Leg Extension (Machine)", sets: 2, reps: "15–20", rest: "60 s", muscle: "Quads (Isolation)" },
        ],
      },
    ],
  },

  // ── 2. 5-Day Body Part Split ──────────────────────────────────────────────
  {
    id: "bro-split",
    title: "5-Day Body Part Split",
    level: "Intermediate",
    goal: "Maximum Hypertrophy",
    daysPerWeek: 5,
    description: "One major muscle group per day — the classic bodybuilder split. High volume per muscle group maximizes growth stimulus. Each muscle gets 48–72 hours of recovery before being trained again.",
    days: [
      {
        day: "Monday — Chest",
        focus: "Upper · Mid · Lower Chest",
        color: "#ef4444",
        icon: "🏆",
        duration: "55–65 min",
        exercises: [
          { name: "Flat Barbell Bench Press", sets: 4, reps: "6–10", rest: "2–3 min", muscle: "Mid Chest", tip: "Touch the bar to your lower chest — don't bounce." },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: "90 s", muscle: "Upper Chest" },
          { name: "Decline Barbell Press", sets: 3, reps: "8–12", rest: "90 s", muscle: "Lower Chest" },
          { name: "Cable Flye (Mid)", sets: 3, reps: "12–15", rest: "60 s", muscle: "Mid Chest", tip: "Slow and controlled — 3 seconds on the way down." },
          { name: "Pec Deck / Machine Flye", sets: 3, reps: "15–20", rest: "60 s", muscle: "Inner Chest" },
          { name: "Push-Ups (Wide Grip)", sets: 2, reps: "Failure", rest: "60 s", muscle: "Chest / Triceps" },
        ],
      },
      {
        day: "Tuesday — Back",
        focus: "Lats · Mid Back · Traps · Rear Delts",
        color: "#3b82f6",
        icon: "🏋️",
        duration: "65–75 min",
        exercises: [
          { name: "Deadlift", sets: 4, reps: "4–6", rest: "3 min", muscle: "Full Back / Hamstrings", tip: "Bar stays in contact with your legs throughout." },
          { name: "Weighted Pull-Ups", sets: 4, reps: "6–10", rest: "2 min", muscle: "Lats / Biceps" },
          { name: "Barbell Row (Overhand)", sets: 4, reps: "6–10", rest: "2 min", muscle: "Mid Back / Rhomboids" },
          { name: "Lat Pulldown (Wide Grip)", sets: 3, reps: "10–12", rest: "90 s", muscle: "Lats", tip: "Lean back slightly, pull to the upper chest." },
          { name: "Seated Cable Row (Close Grip)", sets: 3, reps: "10–12", rest: "90 s", muscle: "Mid Back" },
          { name: "Face Pulls", sets: 3, reps: "15–20", rest: "60 s", muscle: "Rear Delts / Rotator Cuff" },
          { name: "Dumbbell Shrug", sets: 3, reps: "12–15", rest: "60 s", muscle: "Traps", tip: "Hold the top contraction for 2 seconds." },
        ],
      },
      {
        day: "Wednesday — Shoulders",
        focus: "Front · Side · Rear Delts",
        color: "#f59e0b",
        icon: "🔝",
        duration: "55–65 min",
        exercises: [
          { name: "Seated Overhead Press (DB)", sets: 4, reps: "8–12", rest: "2 min", muscle: "Front / Side Delts" },
          { name: "Arnold Press", sets: 3, reps: "10–12", rest: "90 s", muscle: "All Three Delt Heads", tip: "Rotate from palms facing you to palms away at the top." },
          { name: "Lateral Raises (Cable)", sets: 4, reps: "15–20", rest: "60 s", muscle: "Side Delts", tip: "Cable keeps tension throughout — better than dumbbells." },
          { name: "Rear Delt Flye (Pec Deck Reverse)", sets: 3, reps: "15–20", rest: "60 s", muscle: "Rear Delts" },
          { name: "Upright Row (Cable)", sets: 3, reps: "10–12", rest: "60 s", muscle: "Side Delts / Traps" },
          { name: "Front Raise (Plate)", sets: 2, reps: "12–15", rest: "60 s", muscle: "Front Delts" },
        ],
      },
      {
        day: "Thursday — Arms",
        focus: "Biceps · Triceps · Forearms",
        color: "#8b5cf6",
        icon: "💪",
        duration: "50–60 min",
        exercises: [
          { name: "Barbell Curl", sets: 4, reps: "8–12", rest: "90 s", muscle: "Biceps", tip: "No swinging — keep your elbows pinned at your sides." },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "10–12", rest: "60 s", muscle: "Biceps Long Head" },
          { name: "Preacher Curl (EZ Bar)", sets: 3, reps: "10–12", rest: "60 s", muscle: "Biceps Short Head" },
          { name: "Close-Grip Bench Press", sets: 4, reps: "8–12", rest: "90 s", muscle: "Triceps All Heads" },
          { name: "Rope Pushdown (Cable)", sets: 3, reps: "12–15", rest: "60 s", muscle: "Triceps", tip: "Spread the rope at the bottom — full contraction." },
          { name: "Skull Crushers (EZ Bar)", sets: 3, reps: "10–12", rest: "60 s", muscle: "Triceps Long Head" },
          { name: "Hammer Curl", sets: 2, reps: "12–15", rest: "45 s", muscle: "Brachialis / Forearms" },
          { name: "Reverse Barbell Curl", sets: 2, reps: "12–15", rest: "45 s", muscle: "Forearms / Brachioradialis" },
        ],
      },
      {
        day: "Friday — Legs",
        focus: "Quads · Hamstrings · Glutes · Calves",
        color: "#22c55e",
        icon: "🦵",
        duration: "70–80 min",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "6–10", rest: "3 min", muscle: "Quads / Glutes", tip: "Hit parallel or below — partial reps don't build full legs." },
          { name: "Romanian Deadlift", sets: 4, reps: "8–10", rest: "2 min", muscle: "Hamstrings / Glutes" },
          { name: "Leg Press (Feet High)", sets: 3, reps: "10–15", rest: "90 s", muscle: "Glutes / Hamstrings" },
          { name: "Hack Squat", sets: 3, reps: "10–12", rest: "90 s", muscle: "Quads" },
          { name: "Lying Leg Curl", sets: 3, reps: "12–15", rest: "60 s", muscle: "Hamstrings" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10 each leg", rest: "90 s", muscle: "Quads / Glutes", tip: "Most demanding leg exercise — use light weight first." },
          { name: "Standing Calf Raise", sets: 5, reps: "15–20", rest: "60 s", muscle: "Gastrocnemius", tip: "Pause at peak contraction for 1 second." },
          { name: "Seated Calf Raise", sets: 3, reps: "20–25", rest: "45 s", muscle: "Soleus" },
        ],
      },
    ],
  },

  // ── 3. Arnold Split (Classic) ─────────────────────────────────────────────
  {
    id: "arnold-split",
    title: "Arnold Split",
    level: "Advanced",
    goal: "Size & Symmetry",
    daysPerWeek: 6,
    description: "Arnold Schwarzenegger's personal training split. Chest+Back trained together using antagonist supersets — pre-exhausting one while recovering the other. Massive pump, efficient sessions.",
    days: [
      {
        day: "Day 1 & 4 — Chest + Back",
        focus: "Chest · Back (Superset Style)",
        color: "#ef4444",
        icon: "🔥",
        duration: "75–90 min",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "6–10", rest: "90 s", muscle: "Chest", tip: "Superset with Pull-Ups — rest after both." },
          { name: "Wide-Grip Pull-Ups", sets: 4, reps: "6–10", rest: "90 s", muscle: "Back" },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: "90 s", muscle: "Upper Chest" },
          { name: "Barbell Row", sets: 4, reps: "8–12", rest: "90 s", muscle: "Mid Back" },
          { name: "Cable Flye", sets: 3, reps: "12–15", rest: "60 s", muscle: "Inner Chest" },
          { name: "Lat Pulldown", sets: 3, reps: "12–15", rest: "60 s", muscle: "Lats" },
          { name: "Pec Deck", sets: 3, reps: "15–20", rest: "60 s", muscle: "Chest" },
          { name: "Seated Cable Row", sets: 3, reps: "15–20", rest: "60 s", muscle: "Mid Back" },
        ],
      },
      {
        day: "Day 2 & 5 — Shoulders + Arms",
        focus: "Delts · Biceps · Triceps",
        color: "#8b5cf6",
        icon: "💪",
        duration: "65–75 min",
        exercises: [
          { name: "Seated Barbell Press (Behind Neck)", sets: 4, reps: "8–12", rest: "90 s", muscle: "Front/Side Delts", tip: "Use moderate weight — this is a high-injury movement." },
          { name: "Lateral Raises", sets: 4, reps: "12–15", rest: "60 s", muscle: "Side Delts" },
          { name: "Barbell Curl", sets: 4, reps: "8–12", rest: "90 s", muscle: "Biceps" },
          { name: "Overhead Tricep Extension (Cable)", sets: 4, reps: "10–12", rest: "90 s", muscle: "Triceps Long Head" },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "10–12", rest: "60 s", muscle: "Biceps" },
          { name: "Tricep Dip", sets: 3, reps: "10–15", rest: "60 s", muscle: "Triceps" },
          { name: "Concentration Curl", sets: 2, reps: "12–15", rest: "45 s", muscle: "Biceps Peak" },
          { name: "Rope Pushdown", sets: 2, reps: "15–20", rest: "45 s", muscle: "Triceps" },
        ],
      },
      {
        day: "Day 3 & 6 — Legs + Core",
        focus: "Quads · Hamstrings · Glutes · Abs",
        color: "#22c55e",
        icon: "🦵",
        duration: "70–80 min",
        exercises: [
          { name: "Barbell Back Squat", sets: 5, reps: "6–10", rest: "3 min", muscle: "Quads / Glutes" },
          { name: "Leg Press", sets: 4, reps: "10–15", rest: "90 s", muscle: "Quads / Glutes" },
          { name: "Romanian Deadlift", sets: 4, reps: "8–10", rest: "2 min", muscle: "Hamstrings / Glutes" },
          { name: "Leg Extension", sets: 3, reps: "15–20", rest: "60 s", muscle: "Quads" },
          { name: "Leg Curl", sets: 3, reps: "12–15", rest: "60 s", muscle: "Hamstrings" },
          { name: "Calf Raise", sets: 5, reps: "15–20", rest: "60 s", muscle: "Calves" },
          { name: "Cable Crunch", sets: 4, reps: "15–20", rest: "45 s", muscle: "Upper Abs" },
          { name: "Hanging Leg Raise", sets: 3, reps: "12–15", rest: "60 s", muscle: "Lower Abs" },
        ],
      },
    ],
  },

  // ── 4. Advanced Powerbuilding ─────────────────────────────────────────────
  {
    id: "powerbuilding",
    title: "Powerbuilding",
    level: "Advanced",
    goal: "Strength + Size",
    daysPerWeek: 4,
    description: "Combines powerlifting (low-rep heavy compounds) with bodybuilding (moderate-rep isolation work). Build real strength on squat, bench, and deadlift while adding muscle mass simultaneously.",
    days: [
      {
        day: "Day 1 — Squat Focus",
        focus: "Quads · Glutes · Core · Shoulders",
        color: "#f5a623",
        icon: "🏆",
        duration: "70–85 min",
        exercises: [
          { name: "Barbell Back Squat (Heavy)", sets: 5, reps: "3–5", rest: "3–4 min", muscle: "Quads / Glutes", tip: "Work up to a top set, then do 2–3 back-off sets at 80%." },
          { name: "Front Squat", sets: 3, reps: "6–8", rest: "2 min", muscle: "Quads" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "8–10 each", rest: "90 s", muscle: "Quads / Glutes" },
          { name: "Overhead Press", sets: 4, reps: "6–8", rest: "2 min", muscle: "Shoulders" },
          { name: "Lateral Raises", sets: 3, reps: "15–20", rest: "60 s", muscle: "Side Delts" },
          { name: "Ab Wheel Rollout", sets: 4, reps: "8–12", rest: "60 s", muscle: "Core" },
        ],
      },
      {
        day: "Day 2 — Bench Focus",
        focus: "Chest · Triceps · Side Delts",
        color: "#ef4444",
        icon: "🔥",
        duration: "65–75 min",
        exercises: [
          { name: "Flat Barbell Bench Press (Heavy)", sets: 5, reps: "3–5", rest: "3–4 min", muscle: "Chest", tip: "Tuck elbows 45°, leg drive, arch your back slightly." },
          { name: "Paused Bench Press", sets: 3, reps: "6–8", rest: "2–3 min", muscle: "Chest", tip: "2-second pause at the bottom — builds explosive strength." },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: "90 s", muscle: "Upper Chest" },
          { name: "Cable Flye", sets: 3, reps: "12–15", rest: "60 s", muscle: "Chest" },
          { name: "Skull Crushers", sets: 4, reps: "8–12", rest: "90 s", muscle: "Triceps" },
          { name: "Tricep Pushdown", sets: 3, reps: "12–15", rest: "60 s", muscle: "Triceps" },
        ],
      },
      {
        day: "Day 3 — Deadlift Focus",
        focus: "Back · Hamstrings · Biceps",
        color: "#3b82f6",
        icon: "🏋️",
        duration: "70–85 min",
        exercises: [
          { name: "Conventional Deadlift (Heavy)", sets: 5, reps: "2–4", rest: "4–5 min", muscle: "Full Posterior Chain", tip: "Your heaviest lift. Never rush setup — breath and brace." },
          { name: "Sumo Deadlift", sets: 3, reps: "6–8", rest: "2–3 min", muscle: "Glutes / Inner Thighs" },
          { name: "Barbell Row", sets: 4, reps: "6–8", rest: "2 min", muscle: "Mid Back" },
          { name: "Weighted Pull-Ups", sets: 4, reps: "6–10", rest: "2 min", muscle: "Lats" },
          { name: "Seated Cable Row", sets: 3, reps: "10–12", rest: "90 s", muscle: "Mid Back" },
          { name: "Barbell Curl", sets: 4, reps: "8–12", rest: "60 s", muscle: "Biceps" },
          { name: "Hammer Curl", sets: 3, reps: "12–15", rest: "60 s", muscle: "Brachialis" },
        ],
      },
      {
        day: "Day 4 — Hypertrophy / Weak Points",
        focus: "Full Body · Accessories · Core",
        color: "#8b5cf6",
        icon: "✨",
        duration: "60–70 min",
        exercises: [
          { name: "Romanian Deadlift", sets: 4, reps: "8–10", rest: "90 s", muscle: "Hamstrings / Glutes" },
          { name: "Leg Press", sets: 4, reps: "12–15", rest: "90 s", muscle: "Quads" },
          { name: "Dumbbell Press (Incline)", sets: 4, reps: "10–12", rest: "90 s", muscle: "Upper Chest" },
          { name: "Face Pulls", sets: 4, reps: "15–20", rest: "60 s", muscle: "Rear Delts / Rotator Cuff" },
          { name: "Preacher Curl", sets: 3, reps: "10–12", rest: "60 s", muscle: "Biceps" },
          { name: "Overhead Extension (Cable)", sets: 3, reps: "10–12", rest: "60 s", muscle: "Triceps" },
          { name: "Cable Crunch", sets: 4, reps: "15–20", rest: "45 s", muscle: "Abs" },
          { name: "Hanging Leg Raise", sets: 3, reps: "12–15", rest: "60 s", muscle: "Lower Abs" },
        ],
      },
    ],
  },

  // ── 5. Upper / Lower Split ────────────────────────────────────────────────
  {
    id: "upper-lower",
    title: "Upper / Lower Split",
    level: "Intermediate",
    goal: "Balanced Physique",
    daysPerWeek: 4,
    description: "4 days per week. Alternate upper and lower body sessions. Great balance of volume, frequency, and recovery — ideal for intermediate lifters wanting steady progress on both strength and size.",
    days: [
      {
        day: "Upper A — Strength",
        focus: "Chest · Back · Shoulders · Arms",
        color: "#ef4444",
        icon: "🔝",
        duration: "55–65 min",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "4–6", rest: "2–3 min", muscle: "Chest" },
          { name: "Barbell Row", sets: 4, reps: "4–6", rest: "2–3 min", muscle: "Back" },
          { name: "Overhead Press", sets: 3, reps: "6–8", rest: "2 min", muscle: "Shoulders" },
          { name: "Pull-Ups", sets: 3, reps: "6–8", rest: "2 min", muscle: "Lats" },
          { name: "Barbell Curl", sets: 3, reps: "8–10", rest: "60 s", muscle: "Biceps" },
          { name: "Skull Crushers", sets: 3, reps: "8–10", rest: "60 s", muscle: "Triceps" },
        ],
      },
      {
        day: "Lower A — Strength",
        focus: "Quads · Hamstrings · Glutes · Calves",
        color: "#10b981",
        icon: "⬇️",
        duration: "55–65 min",
        exercises: [
          { name: "Barbell Squat", sets: 4, reps: "4–6", rest: "3 min", muscle: "Quads / Glutes" },
          { name: "Romanian Deadlift", sets: 3, reps: "6–8", rest: "2 min", muscle: "Hamstrings / Glutes" },
          { name: "Leg Press", sets: 3, reps: "8–12", rest: "90 s", muscle: "Quads" },
          { name: "Leg Curl", sets: 3, reps: "10–12", rest: "60 s", muscle: "Hamstrings" },
          { name: "Calf Raise", sets: 4, reps: "15–20", rest: "60 s", muscle: "Calves" },
        ],
      },
      {
        day: "Upper B — Hypertrophy",
        focus: "Chest · Back · Shoulders · Arms",
        color: "#ef4444",
        icon: "🔝",
        duration: "55–65 min",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: "90 s", muscle: "Upper Chest" },
          { name: "Cable Row (Seated)", sets: 4, reps: "10–12", rest: "90 s", muscle: "Mid Back" },
          { name: "Lateral Raises", sets: 4, reps: "12–15", rest: "60 s", muscle: "Side Delts" },
          { name: "Lat Pulldown", sets: 3, reps: "10–12", rest: "90 s", muscle: "Lats" },
          { name: "Preacher Curl", sets: 3, reps: "10–12", rest: "60 s", muscle: "Biceps" },
          { name: "Rope Pushdown", sets: 3, reps: "12–15", rest: "60 s", muscle: "Triceps" },
        ],
      },
      {
        day: "Lower B — Hypertrophy",
        focus: "Quads · Hamstrings · Glutes · Core",
        color: "#10b981",
        icon: "⬇️",
        duration: "55–65 min",
        exercises: [
          { name: "Hack Squat / Front Squat", sets: 4, reps: "8–10", rest: "2 min", muscle: "Quads" },
          { name: "Deadlift (Conventional)", sets: 3, reps: "6–8", rest: "2–3 min", muscle: "Posterior Chain" },
          { name: "Walking Lunges", sets: 3, reps: "12 each", rest: "90 s", muscle: "Quads / Glutes" },
          { name: "Leg Extension", sets: 3, reps: "15–20", rest: "60 s", muscle: "Quads" },
          { name: "Seated Calf Raise", sets: 4, reps: "15–20", rest: "60 s", muscle: "Calves" },
          { name: "Cable Crunch", sets: 3, reps: "15–20", rest: "60 s", muscle: "Core" },
        ],
      },
    ],
  },

  // ── 6. Full Body Beginner ─────────────────────────────────────────────────
  {
    id: "full-body-beginner",
    title: "Full Body Beginner",
    level: "Beginner",
    goal: "Strength Foundation",
    daysPerWeek: 3,
    description: "3 days per week (Mon/Wed/Fri). Each session works the whole body with compound movements. Perfect for someone new to the gym — build the base before adding volume.",
    days: [
      {
        day: "Day A",
        focus: "Squat · Press · Row",
        color: "#3b82f6",
        icon: "🌟",
        duration: "45–55 min",
        exercises: [
          { name: "Barbell Squat", sets: 3, reps: "5", rest: "2 min", muscle: "Legs / Glutes" },
          { name: "Bench Press", sets: 3, reps: "5", rest: "2 min", muscle: "Chest / Triceps" },
          { name: "Barbell Row", sets: 3, reps: "5", rest: "2 min", muscle: "Back / Biceps" },
          { name: "Plank", sets: 3, reps: "30–45 s", rest: "60 s", muscle: "Core" },
        ],
      },
      {
        day: "Day B",
        focus: "Squat · Press · Deadlift",
        color: "#3b82f6",
        icon: "🌟",
        duration: "45–55 min",
        exercises: [
          { name: "Barbell Squat", sets: 3, reps: "5", rest: "2 min", muscle: "Legs / Glutes" },
          { name: "Overhead Press", sets: 3, reps: "5", rest: "2 min", muscle: "Shoulders / Triceps" },
          { name: "Deadlift", sets: 1, reps: "5", rest: "3 min", muscle: "Full Posterior Chain", tip: "1 working set — add weight every session." },
          { name: "Dumbbell Curl", sets: 2, reps: "10–12", rest: "60 s", muscle: "Biceps" },
        ],
      },
    ],
  },

  // ── 7. Core & Abs Finisher ────────────────────────────────────────────────
  {
    id: "abs-core",
    title: "Core & Abs Finisher",
    level: "Beginner",
    goal: "Core Strength",
    daysPerWeek: 3,
    description: "Dedicated core session — add this at the end of any training day or as a standalone finisher. Targets all areas: upper abs, lower abs, obliques, and deep core stabilisers.",
    days: [
      {
        day: "Core Session",
        focus: "Abs · Obliques · Lower Back · Stability",
        color: "#f97316",
        icon: "🔥",
        duration: "20–30 min",
        exercises: [
          { name: "Plank (Standard)", sets: 3, reps: "45–60 s", rest: "30 s", muscle: "Deep Core", tip: "Squeeze glutes and breathe normally." },
          { name: "Cable Crunch", sets: 3, reps: "15–20", rest: "60 s", muscle: "Upper Abs" },
          { name: "Hanging Leg Raise", sets: 3, reps: "10–15", rest: "60 s", muscle: "Lower Abs", tip: "Control the descent — don't swing." },
          { name: "Russian Twist (Weighted)", sets: 3, reps: "20 total", rest: "45 s", muscle: "Obliques" },
          { name: "Ab Wheel Rollout", sets: 3, reps: "8–12", rest: "60 s", muscle: "Full Core" },
          { name: "Dead Bug", sets: 3, reps: "10 each side", rest: "45 s", muscle: "Deep Core / Anti-rotation" },
          { name: "Side Plank", sets: 2, reps: "30–45 s each", rest: "30 s", muscle: "Obliques / Hip Stabilisers" },
        ],
      },
    ],
  },
]
