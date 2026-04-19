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
    popular: false,
    proof: "28+ years experience · 200+ clients",
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
    popular: true,
    proof: "National Boxer · 2 Gold, 1 Silver, 1 Bronze",
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
    popular: false,
    proof: "ISSA Certified USA · 10+ years",
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
    popular: false,
    proof: "Burns up to 600 kcal/session",
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
    popular: false,
    proof: "BLS Certified · Heated indoor pool",
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
    popular: false,
    proof: "IFA & ISSA Certified · All levels",
  },
]


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
          <div data-reveal className="text-center mb-14">
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
            {classes.map((c, i) => (
              <div
                key={c.name}
                data-reveal data-delay={String((i % 3) + 1)}
                className={`group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  c.popular
                    ? "bg-[#141414] border border-[#f5a623] shadow-[0_0_32px_rgba(245,166,35,0.2)]"
                    : "bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50"
                }`}
              >
                {/* Social proof badge top */}
                {c.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-block px-4 py-1.5 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-widest rounded-b-lg shadow">
                      ★ Most Popular
                    </span>
                  </div>
                )}
                <div className={`relative h-52 overflow-hidden ${c.popular ? "mt-4" : ""}`}>
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 px-2 py-1 ${c.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded`}>
                    {c.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-white font-bold text-xl mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {c.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{c.desc}</p>

                  {/* Social proof line */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg className="w-3 h-3 text-[#f5a623] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-gray-500 text-xs">{c.proof}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-3 border-t border-[#2a2a2a] mt-auto">
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg className="w-3.5 h-3.5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {c.trainer}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg className="w-3.5 h-3.5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      {c.level}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg className="w-3.5 h-3.5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {c.duration}
                    </span>
                  </div>
                  {/* CTA */}
                  <a
                    href="https://wa.me/923115156949"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 block text-center py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors ${
                      c.popular
                        ? "bg-[#f5a623] text-black hover:bg-[#e09410]"
                        : "border border-[#2a2a2a] text-gray-300 hover:border-[#f5a623]/50 hover:text-[#f5a623]"
                    }`}
                  >
                    {c.popular ? "Join This Class Now" : "Book a Session"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLASS TIMINGS ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Plan Your Visit</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Club <span className="text-[#f5a623]">Hours</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Opening hours */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  Opening Hours
                </h3>
              </div>
              <div className="divide-y divide-[#2a2a2a]">
                {[
                  { day: "Monday", hours: "7:00 AM – 11:00 PM" },
                  { day: "Tuesday", hours: "7:00 AM – 11:00 PM" },
                  { day: "Wednesday", hours: "7:00 AM – 11:00 PM" },
                  { day: "Thursday", hours: "7:00 AM – 11:00 PM" },
                  { day: "Friday", hours: "7:00 AM – 11:00 PM" },
                  { day: "Saturday", hours: "7:00 AM – 11:00 PM" },
                  { day: "Sunday", hours: "12:00 PM – 10:00 PM" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center px-6 py-3.5">
                    <span className="text-gray-300 text-sm">{row.day}</span>
                    <span className="text-[#f5a623] font-bold text-sm">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book a session */}
            <div className="flex flex-col gap-5">
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6">
                <h3 className="text-white font-bold uppercase text-lg mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Book a Class
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  To find out class timings, book a personal training session, or enquire about any program — contact us directly. Walk-ins are always welcome.
                </p>
                <div className="space-y-3">
                  <a href="tel:+923115156949" className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors">
                    <svg className="w-4 h-4 text-[#f5a623] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span className="text-gray-300 text-sm">+92-311-5156949</span>
                  </a>
                  <a href="tel:+923300007232" className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors">
                    <svg className="w-4 h-4 text-[#f5a623] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span className="text-gray-300 text-sm">+92-330-0007232</span>
                  </a>
                  <a href="mailto:contact@safafitnessclub.com" className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors">
                    <svg className="w-4 h-4 text-[#f5a623] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="text-gray-300 text-sm">contact@safafitnessclub.com</span>
                  </a>
                </div>
              </div>
              <div className="bg-[#f5a623] rounded-lg p-6 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-black font-bold uppercase text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Walk-ins Welcome
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed">
                    Bring a valid ID for first-time registration. Our team will guide you through the facilities and match you with the right class.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Safa+Fitness+Club,Safa+Gold+Mall,F-7+Markaz,Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center bg-black text-white text-sm font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-[#111] transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY OUR CLASSES ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
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
            ].map((f, i) => (
              <div key={f.title} data-reveal data-delay={String(i + 1)} className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
