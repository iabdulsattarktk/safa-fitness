import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Classes | Safa Fitness Club – Islamabad",
  description:
    "Explore Safa Fitness Club's expert-led classes — boxing, strength training, swimming, HIIT, body transformation, and combat training. All levels welcome.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

const classes = [
  {
    name: "Strength Training",
    category: "Gym",
    categoryColor: "bg-orange-500",
    trainer: "Kishwar Ali",
    level: "All Levels",
    duration: "60 min",
    img: "/images/facilities/gym.webp",
    desc: "Build raw strength and muscle with our progressive training system. Suitable for beginners and advanced athletes alike, with expert guidance on form and technique.",
  },
  {
    name: "Boxing & Kickboxing",
    category: "Combat",
    categoryColor: "bg-red-600",
    trainer: "Rahila Sher",
    level: "Beginner – Advanced",
    duration: "60 min",
    img: "/images/facilities/boxing.webp",
    desc: "Train with a 2-time gold medal boxer. Learn proper footwork, combinations, and defensive techniques in Safa's professional-grade boxing ring.",
  },
  {
    name: "Body Transformation",
    category: "Fitness",
    categoryColor: "bg-purple-600",
    trainer: "Huma Mumtaz",
    level: "All Levels",
    duration: "60 min",
    img: "/images/classes/transformation.jpg",
    desc: "A results-focused program designed by ISSA-certified trainer Huma Mumtaz. Combines resistance training, cardio, and nutrition guidance for visible transformation.",
  },
  {
    name: "HIIT & CrossFit",
    category: "Cardio",
    categoryColor: "bg-yellow-500",
    trainer: "Huma Mumtaz",
    level: "Intermediate",
    duration: "45 min",
    img: "/images/classes/hiit.jpg",
    desc: "High-intensity interval training that torches calories and builds endurance. Each session is different — keeping you challenged and your body adapting.",
  },
  {
    name: "Swimming",
    category: "Aquatics",
    categoryColor: "bg-blue-500",
    trainer: "Muhammad Sohail",
    level: "All Levels",
    duration: "60 min",
    img: "/images/facilities/swimming-pool.webp",
    desc: "Structured swimming programs from beginner stroke mechanics to advanced lap training. BLS-certified coach Muhammad Sohail ensures safe and effective sessions.",
  },
  {
    name: "Combat Training",
    category: "Combat",
    categoryColor: "bg-red-600",
    trainer: "Kishwar Ali",
    level: "All Levels",
    duration: "60 min",
    img: "/images/trainers/kamran-mma.webp",
    desc: "28+ years of martial arts expertise condensed into focused combat sessions. MMA fundamentals, self-defense, and conditioning for all levels.",
  },
]

// Weekly timetable — days × time slots
const timetable = [
  {
    time: "7:00 AM",
    mon: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    tue: { name: "Boxing", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    wed: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    thu: { name: "Boxing", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    fri: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    sat: { name: "Combat", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    sun: null,
  },
  {
    time: "9:00 AM",
    mon: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    tue: { name: "Body Transform", color: "bg-purple-600/20 text-purple-400 border-purple-500/30" },
    wed: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    thu: { name: "Body Transform", color: "bg-purple-600/20 text-purple-400 border-purple-500/30" },
    fri: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    sat: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    sun: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  },
  {
    time: "11:00 AM",
    mon: { name: "HIIT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    tue: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    wed: { name: "HIIT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    thu: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    fri: { name: "HIIT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    sat: { name: "Body Transform", color: "bg-purple-600/20 text-purple-400 border-purple-500/30" },
    sun: null,
  },
  {
    time: "5:00 PM",
    mon: { name: "Boxing", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    tue: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    wed: { name: "Boxing", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    thu: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    fri: { name: "Combat", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    sat: { name: "HIIT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    sun: { name: "Boxing", color: "bg-red-600/20 text-red-400 border-red-500/30" },
  },
  {
    time: "7:00 PM",
    mon: { name: "Body Transform", color: "bg-purple-600/20 text-purple-400 border-purple-500/30" },
    tue: { name: "Combat", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    wed: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    thu: { name: "Boxing", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    fri: { name: "Body Transform", color: "bg-purple-600/20 text-purple-400 border-purple-500/30" },
    sat: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    sun: { name: "Swimming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  },
  {
    time: "9:00 PM",
    mon: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    tue: { name: "HIIT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    wed: { name: "Combat", color: "bg-red-600/20 text-red-400 border-red-500/30" },
    thu: { name: "HIIT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    fri: { name: "Strength", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    sat: null,
    sun: null,
  },
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
const dayKeys: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ClassesPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/facilities/boxing.webp"
          alt="Safa Fitness Club Classes"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Train With The Best</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our <span className="text-[#f5a623]">Classes</span>
          </h1>
        </div>
      </section>

      {/* ── CLASSES GRID ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Expert-Led Sessions</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Master <span className="text-[#f5a623]">Classes</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
              Every class is led by a certified expert. Whether you are a beginner or a seasoned athlete, there is a program for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c) => (
              <div
                key={c.name}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 px-2 py-1 ${c.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded`}>
                    {c.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3
                    className="text-white font-bold text-xl mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {c.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-[#2a2a2a]">
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <span className="text-[#f5a623]">👤</span> {c.trainer}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <span className="text-[#f5a623]">📊</span> {c.level}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <span className="text-[#f5a623]">⏱</span> {c.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEEKLY TIMETABLE ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Plan Your Week</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Weekly <span className="text-[#f5a623]">Schedule</span>
            </h2>
            <p className="text-gray-500 text-sm mt-3">Open Monday – Saturday 7AM–11PM · Sunday 12PM–10PM</p>
          </div>

          {/* Timetable — scrollable on mobile */}
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a]">
                  <th className="p-4 text-left text-gray-500 text-xs uppercase tracking-wider font-medium w-24">Time</th>
                  {days.map((d) => (
                    <th key={d} className="p-4 text-center text-white text-xs uppercase tracking-wider font-bold">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((row, i) => (
                  <tr key={row.time} className={i % 2 === 0 ? "bg-[#141414]" : "bg-[#111]"}>
                    <td className="p-4 text-[#f5a623] text-xs font-bold whitespace-nowrap">{row.time}</td>
                    {dayKeys.map((dk) => {
                      const cell = row[dk]
                      return (
                        <td key={dk} className="p-2 text-center">
                          {cell ? (
                            <span className={`inline-block px-2 py-1.5 rounded border text-xs font-medium whitespace-nowrap ${cell.color}`}>
                              {cell.name}
                            </span>
                          ) : (
                            <span className="text-gray-700 text-xs">—</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex items-start gap-3 p-4 bg-[#1a1a1a] border border-yellow-500/30 rounded-lg">
            <span className="text-yellow-400 text-lg flex-shrink-0">⚠️</span>
            <p className="text-yellow-300 text-sm leading-relaxed">
              <span className="font-bold">Note:</span> Ye schedule approximate hai — real website par class timetable available nahi tha.
              Confirm karne ke liye call karain: <a href="tel:+923115156949" className="underline hover:text-yellow-200">+92-311-5156949</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY OUR CLASSES ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">What Sets Us Apart</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Train <span className="text-[#f5a623]">With Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Certified Trainers", desc: "All coaches are internationally certified with years of real-world experience.", img: "/images/trainers/kishwar-trainer.webp" },
              { title: "Premium Equipment", desc: "State-of-the-art machines and equipment maintained to the highest standards.", img: "/images/facilities/gym.webp" },
              { title: "All Levels Welcome", desc: "From complete beginners to competitive athletes — every class adapts to you.", img: "/images/team-banner2.webp" },
              { title: "Personalized Plans", desc: "Your trainer builds a program around your specific goals and fitness level.", img: "/images/trainers/trainer-2.webp" },
            ].map((f) => (
              <div key={f.title} className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3
                      className="text-white font-bold text-lg uppercase group-hover:text-[#f5a623] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {f.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINERS STRIP ── */}
      <section className="py-10 bg-[#0d0d0d] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
              Want 1-on-1 Personal Training?
            </p>
            <p className="text-gray-400 text-sm mt-1">Our trainers offer private sessions tailored entirely to your goals.</p>
          </div>
          <Link
            href="/trainers"
            className="whitespace-nowrap px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
          >
            Meet Our Trainers
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading="Ready to Start Training?"
        subheading="Join Safa Fitness Club and attend your first class today. Walk-ins welcome."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Contact Us", href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
