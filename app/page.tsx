import Link from "next/link"
import Image from "next/image"
import CTABanner from "@/components/layout/CTABanner"
import ScrollDown from "@/components/ui/ScrollDown"

// ─── Data ────────────────────────────────────────────────────────────────────

const facilities = [
  { img: "/images/facilities/gym.webp", title: "Gym & Fitness", desc: "Boost your strength and endurance with expert-guided training in a premium environment.", href: "/about#gym" },
  { img: "/images/facilities/swimming-pool.webp", title: "Swimming Pool", desc: "Enjoy a luxurious heated indoor pool for fitness, strength, relaxation, and swim classes.", href: "/about#pool" },
  { img: "/images/facilities/boxing.webp", title: "Boxing Ring", desc: "Step into the ring for professional-level boxing, kickboxing, and combat training.", href: "/about#boxing" },
  { img: "/images/facilities/massage-spa.webp", title: "Massage & Spa", desc: "Unwind with therapeutic massages and rejuvenating spa treatments.", href: "/about#spa" },
  { img: "/images/facilities/sauna.webp", title: "Steam, Sauna & Jacuzzi", desc: "Detox and relax with our wellness-focused heat and hydrotherapy zone.", href: "/about#sauna" },
  { img: "/images/facilities/salon.webp", title: "Beauty Salon – Men", desc: "Modern grooming and styling services tailored for the modern gentleman.", href: "/about#salon" },
  { img: "/images/facilities/lockers.webp", title: "VIP Lockers & Shower", desc: "Spacious private lockers and premium showers for your comfort and security.", href: "/about#lockers" },
  { img: "/images/facilities/snooker.webp", title: "Snooker Lounge", desc: "Chill and compete in a lounge designed for snooker lovers.", href: "/about#snooker" },
  { img: "/images/facilities/safa-bar.webp", title: "Safa Bar", desc: "Refuel with healthy drinks, smoothies, and premium refreshments in style.", href: "/about#bar" },
]

const classes = [
  { name: "Strength Training", category: "Gym", trainer: "Kishwar Ali", level: "All Levels", img: "/images/classes/strength-training.jpg" },
  { name: "Boxing & Kickboxing", category: "Combat", trainer: "Rahila Sher", level: "Beginner–Advanced", img: "/images/classes/boxing.jpg" },
  { name: "Body Transformation", category: "Fitness", trainer: "Huma Mumtaz", level: "All Levels", img: "/images/classes/transformation.jpg" },
  { name: "HIIT & CrossFit", category: "Cardio", trainer: "Huma Mumtaz", level: "Intermediate", img: "/images/classes/hiit.jpg" },
  { name: "Swimming", category: "Aquatics", trainer: "Muhammad Sohail", level: "All Levels", img: "/images/classes/swimming.jpg" },
  { name: "Combat Training", category: "Combat", trainer: "Kishwar Ali", level: "All Levels", img: "/images/classes/combat.jpg" },
]

const trainers = [
  { name: "Rahila Sher", role: "Professional Boxer", exp: "6+ years", medals: "2 Gold, 1 Silver, 1 Bronze", img: "/images/trainers/trainer-1.webp" },
  { name: "Huma Mumtaz", role: "Transformation Expert", exp: "10+ years", medals: "ISSA Certified USA", img: "/images/trainers/trainer-2.webp" },
  { name: "Kishwar Ali", role: "Combat Trainer", exp: "28+ years", medals: "Floor In-Charge", img: "/images/trainers/kishwar-ali.webp" },
  { name: "Danish Masih Gill", role: "Personal Trainer", exp: "8+ years", medals: "200+ Clients", img: "/images/trainers/trainer-3.webp" },
  { name: "Muhammad Sohail", role: "Swimming Coach", exp: "8+ years", medals: "BLS Certified", img: "/images/trainers/trainer-4.webp" },
]

const plans = [
  {
    name: "Swimming Pool",
    price: "12,000",
    reg: "18,000",
    color: "border-gray-700",
    features: ["Pool access", "Steam/Sauna/Jacuzzi", "2 free gym sessions"],
    popular: false,
  },
  {
    name: "Gym Only",
    price: "18,000",
    reg: "18,000",
    color: "border-[#f5a623]",
    features: ["Full gym access", "Premium facilities", "2 free sauna sessions", "Expert trainers"],
    popular: true,
  },
  {
    name: "Gym + Pool",
    price: "28,000",
    reg: "18,000",
    color: "border-gray-700",
    features: ["Gym + Pool access", "Steam/Sauna/Jacuzzi", "1 personal training session", "All amenities"],
    popular: false,
  },
]

const testimonials = [
  {
    name: "Rana Samreen",
    since: "Member since 2016",
    text: "Now it is the best gym of Islamabad having best hygiene, latest and advanced equipment, experienced trainers with decent secure environment.",
  },
  {
    name: "Umer AbdurRehman",
    since: "6 months member",
    text: "This place is just love. It offers lockers, towels, shower, swimming pool, jacuzzi, weight area, cardio area, exceptional trainers, sauna, steam, massage, and many more.",
  },
]

const steps = [
  { num: "01", title: "Movement", desc: "Every great journey begins with a single step. Lace up and get moving — walk, run, or hit the gym.", img: "/images/step-movement.webp" },
  { num: "02", title: "Time", desc: "Consistency is key. Make time for your fitness, even if it's just a few minutes a day — it all adds up!", img: "/images/step-time.webp" },
  { num: "03", title: "Practise", desc: "Push your limits, challenge yourself, and improve every day. Progress comes with persistence.", img: "/images/step-practice.webp" },
  { num: "04", title: "Results", desc: "Stay dedicated and the results will follow. A healthier, stronger you is just around the corner.", img: "/images/step-results.webp" },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* YouTube background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/-nteQqHD754?autoplay=1&mute=1&loop=1&playlist=-nteQqHD754&controls=0&rel=0&modestbranding=1&playsinline=1"
            title="Safa Fitness Club"
            allow="autoplay; encrypted-media"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              height: "56.25vw",
              minWidth: "177.78vh",
              minHeight: "100vh",
              border: 0,
              pointerEvents: "none",
            }}
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/45" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f5a623 0%, transparent 50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-[#f5a623] text-sm font-bold uppercase tracking-[0.3em] mb-6">
            Islamabad's Premier Fitness Destination
          </p>
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6 text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Elite
            <span className="block text-[#f5a623]">Performance</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Where Wellness meets Elegance in the Heart of Islamabad. Transforming lives for 8+ years with state-of-the-art facilities and expert trainers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing"
              className="w-full sm:w-auto px-10 py-4 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold uppercase tracking-wider rounded transition-colors text-sm">
              Join Now
            </Link>
            <Link href="/about"
              className="w-full sm:w-auto px-10 py-4 border-2 border-white/30 hover:border-[#f5a623] text-white hover:text-[#f5a623] font-bold uppercase tracking-wider rounded transition-colors text-sm">
              Explore Club
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { val: "8+", label: "Years of Excellence" },
              { val: "9", label: "Premium Facilities" },
              { val: "5", label: "Expert Trainers" },
              { val: "F-7", label: "Markaz, Islamabad" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-[#f5a623]"
                  style={{ fontFamily: "var(--font-display)" }}>{s.val}</p>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <ScrollDown targetId="facilities" />
      </section>

      {/* ── FACILITIES ── */}
      <section id="facilities" className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Offer</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              Premium Fitness<br />
              <span className="text-[#f5a623]">Amenities</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f) => (
              <Link key={f.title} href={f.href}
                className="group overflow-hidden bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLASSES ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Train With The Best</p>
              <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}>
                Our Master<span className="text-[#f5a623]">Classes</span>
              </h2>
            </div>
            <Link href="/classes"
              className="text-sm font-bold text-[#f5a623] border border-[#f5a623] px-5 py-2 rounded hover:bg-[#f5a623] hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap">
              View All Classes
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((c) => (
              <Link key={c.name} href="/classes"
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={c.img} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider rounded">
                    {c.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}>{c.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">Trainer: <span className="text-gray-300">{c.trainer}</span></p>
                  <p className="text-gray-500 text-sm">Level: <span className="text-gray-300">{c.level}</span></p>
                  <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
                    <span className="text-[#f5a623] text-sm font-medium">Learn more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-STEP JOURNEY ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Your Path to Success</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              Stop Wishing.<span className="text-[#f5a623]"> Start Doing.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-lg">Your transformation journey in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-5xl font-bold text-white/20 leading-none"
                    style={{ fontFamily: "var(--font-display)" }}>{s.num}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-xl uppercase mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINERS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">The Safa Elite Team</p>
              <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}>
                Meet Your<br /><span className="text-[#f5a623]">Trainers</span>
              </h2>
            </div>
            <Link href="/trainers"
              className="text-sm font-bold text-[#f5a623] border border-[#f5a623] px-5 py-2 rounded hover:bg-[#f5a623] hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap">
              All Trainers
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {trainers.map((t) => (
              <Link key={t.name} href="/trainers"
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden text-center transition-all duration-300 hover:-translate-y-1">
                {t.img ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image src={t.img} alt={t.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-48 bg-[#1a1a1a] flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#f5a623]/20 border-2 border-[#f5a623]/30 flex items-center justify-center">
                      <span className="text-[#f5a623] text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                        {t.name[0]}
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-white font-bold text-sm mb-1">{t.name}</h3>
                  <p className="text-[#f5a623] text-xs font-medium mb-2">{t.role}</p>
                  <p className="text-gray-500 text-xs">{t.exp}</p>
                  <p className="text-gray-600 text-xs mt-1">{t.medals}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Choose Your Level</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              Membership<span className="text-[#f5a623]"> Plans</span>
            </h2>
            <p className="text-gray-400 mt-3">All plans include PKR 18,000 one-time registration fee</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((p) => (
              <div key={p.name}
                className={`relative p-8 bg-[#141414] border-2 ${p.color} rounded-lg ${p.popular ? "scale-105" : ""}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-white font-bold text-xl mb-1"
                  style={{ fontFamily: "var(--font-display)" }}>{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-6 mt-4">
                  <span className="text-gray-400 text-sm">PKR</span>
                  <span className={`text-4xl font-bold ${p.popular ? "text-[#f5a623]" : "text-white"}`}
                    style={{ fontFamily: "var(--font-display)" }}>{p.price}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-[#f5a623] mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing"
                  className={`block text-center py-3 rounded font-bold text-sm uppercase tracking-wider transition-colors ${
                    p.popular
                      ? "bg-[#f5a623] text-black hover:bg-[#e09410]"
                      : "border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black"
                  }`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            Also available: Day Pass (PKR 2,500) · Kids Membership · 3/6/12 month discounts
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Real Members</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              What They<span className="text-[#f5a623]"> Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 bg-[#141414] border border-[#2a2a2a] rounded-lg">
                <p className="text-[#f5a623] text-3xl mb-4">"</p>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.since}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading="Ready to Join the Elite?"
        subheading="Visit us at Safa Gold Mall, F-7 Markaz, Islamabad. Walk-ins welcome."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Contact Us", href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
