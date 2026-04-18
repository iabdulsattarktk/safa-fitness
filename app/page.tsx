import Link from "next/link"
import Image from "next/image"
import CTABanner from "@/components/layout/CTABanner"
import CountUp from "@/components/ui/CountUp"
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel"
import ParallaxBreak from "@/components/ui/ParallaxBreak"

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
  {
    name: "Ayesha Tariq",
    since: "Member since 2021",
    text: "The swimming pool and sauna facilities are absolutely top notch. Staff is very professional and the trainers are extremely knowledgeable. Best investment I have made for my health.",
  },
  {
    name: "Bilal Hussain",
    since: "Member since 2020",
    text: "Came for the gym, stayed for everything else. The boxing ring, steam room, and jacuzzi make this far more than just a gym. Kishwar sir's training completely transformed my fitness.",
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
        {/* Hero background image */}
        <Image
          src="/images/gallery/gym-strength.webp"
          alt="Safa Fitness Club"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Overlay — subtle dark tint only, keeps image clear */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 20% 60%, rgba(245,166,35,0.18) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(180,20,20,0.12) 0%, transparent 50%)" }} />

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
                <CountUp
                  value={s.val}
                  className="text-5xl font-bold text-[#f5a623]"
                  style={{ fontFamily: "var(--font-display)" }}
                />
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── FACILITIES ── */}
      <section id="facilities" className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Offer</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              Premium Fitness<br />
              <span className="text-[#f5a623]">Amenities</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <Link key={f.title} href={f.href}
                data-reveal data-delay={String((i % 6) + 1)}
                className="group overflow-hidden bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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

      {/* ── SPLIT FEATURES ── */}
      {[
        {
          img: "/images/facilities/swimming-pool.webp",
          tag: "Premium Facility",
          title: "Heated Indoor\nSwimming Pool",
          body: "Islamabad's finest indoor heated pool — open year-round. Perfect for lap swimming, aqua fitness, or simply unwinding. Professional swim coaching available for all levels.",
          cta: { label: "Learn More", href: "/about#pool" },
          flip: false,
        },
        {
          img: "/images/facilities/boxing.webp",
          tag: "Combat Zone",
          title: "Professional\nBoxing Ring",
          body: "A full-size boxing ring with professional coaching from Rahila Sher — Pakistan Army veteran and national medal winner. Open to complete beginners and competitive athletes alike.",
          cta: { label: "Meet the Coach", href: "/trainers" },
          flip: true,
        },
        {
          img: "/images/facilities/sauna.webp",
          tag: "Recovery & Wellness",
          title: "Steam · Sauna\n· Jacuzzi",
          body: "Recover faster, sleep deeper, and de-stress completely. Our wellness zone combines dry sauna, steam room, and a heated jacuzzi — the ideal post-workout ritual.",
          cta: { label: "Explore Facilities", href: "/about#sauna" },
          flip: false,
        },
      ].map((f) => (
        <section key={f.tag} className="bg-[#0a0a0a] overflow-hidden">
          <div className={`flex flex-col ${f.flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            {/* Image */}
            <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-auto lg:min-h-[480px] overflow-hidden">
              <Image src={f.img} alt={f.title.replace("\n", " ")} fill className="object-cover" />
            </div>
            {/* Text */}
            <div className="w-full lg:w-1/2 flex items-center px-8 sm:px-12 lg:px-16 py-14 lg:py-20" data-reveal>
              <div className="max-w-lg">
                <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">{f.tag}</p>
                <h2
                  className="text-4xl sm:text-5xl font-bold uppercase text-white leading-tight mb-5 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">{f.body}</p>
                <Link
                  href={f.cta.href}
                  className="inline-flex items-center gap-2 text-[#f5a623] font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all duration-300"
                >
                  {f.cta.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CLASSES ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4" data-reveal>
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
            {classes.map((c, i) => (
              <Link key={c.name} href="/classes"
                data-reveal data-delay={String(i + 1)}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={c.img} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
          <div className="text-center mb-14" data-reveal>
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Your Path to Success</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              Stop Wishing.<span className="text-[#f5a623]"> Start Doing.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-lg">Your transformation journey in 4 simple steps</p>
          </div>
          {/* Connecting line — desktop only */}
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#f5a623]/40 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.num} data-reveal data-delay={String(i + 1)} className="group flex flex-col">
                  {/* Step circle */}
                  <div className="flex justify-center mb-5">
                    <div className="relative w-20 h-20 rounded-full bg-[#141414] border-2 border-[#2a2a2a] group-hover:border-[#f5a623] transition-colors duration-300 flex items-center justify-center z-10">
                      <span
                        className="text-3xl font-bold text-[#f5a623]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {s.num}
                      </span>
                    </div>
                  </div>
                  {/* Image */}
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  {/* Text */}
                  <h3
                    className="text-white font-bold text-xl uppercase mb-2 group-hover:text-[#f5a623] transition-colors text-center"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX BREAK 1 ── */}
      <ParallaxBreak
        src="/images/gallery/boxing.webp"
        quote="Push Your Limits Every Single Day"
        sub="Safa Fitness Club — Islamabad"
      />

      {/* ── TRAINERS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4" data-reveal>
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
            {trainers.map((t, i) => (
              <Link key={t.name} href="/trainers"
                data-reveal data-delay={String(i + 1)}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden text-center transition-all duration-300 hover:-translate-y-1">
                {t.img ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image src={t.img} alt={t.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
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
          <div className="text-center mb-14" data-reveal>
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Choose Your Level</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              Membership<span className="text-[#f5a623]"> Plans</span>
            </h2>
            <p className="text-gray-400 mt-3">All plans include PKR 18,000 one-time registration fee</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((p, i) => (
              <div key={p.name}
                data-reveal data-delay={String(i + 1)}
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

      {/* ── PARALLAX BREAK 2 ── */}
      <ParallaxBreak
        src="/images/gallery/running.webp"
        quote="Your Only Competition Is Who You Were Yesterday"
        overlay="rgba(0,0,0,0.65)"
      />

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Real Members</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              What They<span className="text-[#f5a623]"> Say</span>
            </h2>
          </div>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="bg-[#0a0a0a] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6" data-reveal>
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Inside Safa Fitness</p>
          <div className="flex items-end justify-between">
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              See Our <span className="text-[#f5a623]">World</span>
            </h2>
            <Link
              href="/gallery"
              className="hidden sm:inline-flex items-center gap-2 text-[#f5a623] font-bold text-xs uppercase tracking-wider hover:gap-4 transition-all duration-300"
            >
              Full Gallery
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Scrollable strip */}
        <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-3 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            "/images/gallery/gym-floor.webp",
            "/images/gallery/swimming-pool.webp",
            "/images/gallery/boxing.webp",
            "/images/gallery/sauna.webp",
            "/images/gallery/massage.webp",
            "/images/gallery/gym-strength.webp",
            "/images/gallery/team-1.webp",
            "/images/gallery/safa-bar.webp",
            "/images/gallery/snooker.webp",
          ].map((src, i) => (
            <Link
              key={src}
              href="/gallery"
              className="relative shrink-0 w-64 h-44 rounded-lg overflow-hidden snap-start group"
            >
              <Image
                src={src}
                alt={`Safa Fitness Club facility ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </Link>
          ))}
          {/* View all tile */}
          <Link
            href="/gallery"
            className="relative shrink-0 w-64 h-44 rounded-lg overflow-hidden snap-start bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 flex flex-col items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-8 h-8 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">View All</span>
            <span className="text-gray-500 text-xs">Full Gallery</span>
          </Link>
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
