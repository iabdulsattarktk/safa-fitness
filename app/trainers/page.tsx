import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trainers | Safa Fitness Club – Expert Coaches in Islamabad",
  description:
    "Meet Safa Fitness Club's certified trainers — Kishwar Ali (28+ yrs), Huma Mumtaz (ISSA USA), Rahila Sher (National Boxer), Danish Masih Gill, and Muhammad Sohail.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

const trainers = [
  {
    name: "Kishwar Ali",
    role: "Floor In-Charge & Combat Trainer",
    exp: "28+ Years",
    img: "/images/trainers/kishwar-ali.webp",
    quote: "Strength is sculpted through discipline. Control the mind, master the body.",
    certs: ["IFA Level 01 & 02 Certified – Pakistan", "ISSA Level 03 Certified – USA", "ISSA Nutrition Certified – USA", "IFPA Sports & Nutrition Certified", "First Aid & CPR/AED Certified", "B.Com Graduate"],
    specializations: ["Body Transformation (Fat Loss, Muscle Gain, Toning)", "Strength & Conditioning", "Age-Specific Training (Youth to 40+)", "HIIT, CrossFit, Circuit & Resistance Training", "Yoga & Core Strength Development", "Functional Fitness & Flexibility"],
    bio: "With over 28 years as a professional fitness trainer and Floor In-Charge at Safa Fitness Club, Kishwar Ali is the cornerstone of our training team. He has trained multiple title-winning clients in competitive and lifestyle fitness, and is recognized for delivering visible body sculpting and strength-building results.",
  },
  {
    name: "Huma Mumtaz",
    role: "Transformation Expert",
    exp: "10+ Years",
    img: "/images/trainers/trainer-2.webp",
    quote: "Control your mind, not just your body. Train like a pro, live like a champion.",
    certs: ["IFA Level 01 & 02 Certified – Pakistan", "ISSA Level 03 Certified – USA", "ISSA Nutrition Training – USA", "IFPA Sports & Nutrition (PS Certified)", "First Aid with CPR/AED Certified"],
    specializations: ["Body Transformation (Weight Loss, Fat Loss, Toning & Shaping)", "Strength Training & Bodybuilding", "Aerobic & Anaerobic Conditioning", "Flexibility & Mobility Training", "HIIT, CrossFit, Yoga & Functional Training", "Group & Circuit Classes"],
    bio: "Huma Mumtaz has been transforming bodies and lives since 2014. One of the most certified trainers at Safa Fitness Club, she holds international qualifications from the USA (ISSA Level 03) and brings a science-backed, results-driven approach to every client she works with.",
  },
  {
    name: "Rahila Sher",
    role: "Professional Boxer & Personal Trainer",
    exp: "6+ Years",
    img: "/images/trainers/trainer-1.webp",
    quote: "Boxer strong, train smart.",
    certs: ["Level 1 & Level 2 Certified Personal Trainer", "National-Level Boxer – Certified & Recognized", "Pakistan Army – Physical Instructor"],
    specializations: ["Boxing & Kickboxing (Combat Sports)", "Weight Loss & Fat Reduction", "Strength & Conditioning", "Athletic Performance & Functional Training", "Military-Grade Endurance Training"],
    bio: "A professional boxer and Pakistan Army veteran, Rahila Sher brings an unmatched level of discipline and athletic expertise to Safa Fitness Club. Competing in 5+ National Games with 2 Gold, 1 Silver, and 1 Bronze medals, she has coached over 100+ clients in fitness, strength, and professional-level boxing.",
  },
  {
    name: "Danish Masih Gill",
    role: "Certified Personal Trainer",
    exp: "8+ Years",
    img: "/images/trainers/trainer-3.webp",
    quote: "You are what you eat. Discipline in the kitchen reflects results in the mirror.",
    certs: ["IFA Certified Personal Trainer – Level 2", "Continuing Professional Development – Exercise Science"],
    specializations: ["Fat Loss & Muscle Hypertrophy", "Personalized Training Programs", "Nutrition Guidance for Body Composition", "Functional & Resistance Training"],
    bio: "Danish Masih Gill has worked with over 200+ clients across diverse fitness goals — from body transformation and weight management to strength development. With 8+ years of hands-on experience, he is known for building customized programs that deliver consistent, lasting results.",
  },
  {
    name: "Muhammad Sohail",
    role: "Swimming Coach & Lifeguard",
    exp: "8+ Years",
    img: "/images/trainers/trainer-4.webp",
    quote: "Health is Wealth.",
    certs: ["BLS (Basic Life Support) Certified", "Certified Swimming Personal Trainer", "Certified Lifeguard"],
    specializations: ["Swimming Instruction – Beginner to Advanced", "Aquatic Fitness & Water Safety", "Stroke Mechanics & Lap Training", "Emergency Life Support Protocols"],
    bio: "Muhammad Sohail is Safa Fitness Club's dedicated swimming coach and BLS-certified lifeguard. With nearly a decade of professional experience, he offers structured aquatic programs for all skill levels — from learning basic strokes to advanced competitive training — with a strong focus on safety.",
  },
]

const stats = [
  { val: "5", label: "Expert Trainers" },
  { val: "28+", label: "Years Combined (Kishwar alone)" },
  { val: "300+", label: "Clients Transformed" },
  { val: "10+", label: "International Certifications" },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TrainersPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/team-banner2.webp"
          alt="Safa Fitness Club Trainers"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">The Safa Elite Team</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our <span className="text-[#f5a623]">Trainers</span>
          </h1>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#f5a623] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>{s.val}</p>
                <p className="text-black/70 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINER CARDS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Certified Professionals</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meet the <span className="text-[#f5a623]">Team</span>
            </h2>
          </div>

          <div className="space-y-10">
            {trainers.map((t, i) => (
              <div
                key={t.name}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-0 bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Photo */}
                <div className="relative h-72 lg:h-auto lg:[direction:ltr]">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141414]" />
                </div>

                {/* Content */}
                <div className="lg:col-span-2 p-7 lg:p-10 lg:[direction:ltr] flex flex-col justify-center">
                  <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">{t.exp} Experience</p>
                  <h3
                    className="text-white font-bold text-3xl sm:text-4xl uppercase mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.name}
                  </h3>
                  <p className="text-[#f5a623] font-medium mb-4">{t.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.bio}</p>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-[#f5a623] pl-4 mb-6">
                    <p className="text-gray-300 text-sm italic">"{t.quote}"</p>
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Certifications */}
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">Certifications</p>
                      <ul className="space-y-1.5">
                        {t.certs.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-gray-400 text-xs">
                            <span className="text-[#f5a623] mt-0.5 flex-shrink-0">✓</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Specializations */}
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">Specializations</p>
                      <ul className="space-y-1.5">
                        {t.specializations.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-gray-400 text-xs">
                            <span className="text-[#f5a623] mt-0.5 flex-shrink-0">›</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONAL TRAINING ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">One-on-One</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Personal <span className="text-[#f5a623]">Training</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Get a fully customized program built around your body, goals, and schedule. Our trainers work with you one-on-one to maximize results — whether you want to lose weight, build muscle, improve performance, or learn a skill like boxing or swimming.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Program tailored specifically to your goals",
                  "Expert form correction and injury prevention",
                  "Nutrition guidance included",
                  "Progress tracking every session",
                  "Flexible scheduling — morning, evening, or weekend",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="text-[#f5a623] mt-0.5 flex-shrink-0">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+923115156949"
                  className="px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors text-center"
                >
                  Book a Session
                </a>
                <Link
                  href="/pricing"
                  className="px-8 py-3 border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black font-bold text-sm uppercase tracking-wider rounded transition-colors text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/trainers/kishwar-trainer.webp"
                alt="Personal Training at Safa Fitness Club"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading="Ready to Train With the Best?"
        subheading="Join Safa Fitness Club and start your transformation journey with Islamabad's most certified training team."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Contact Us", href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
