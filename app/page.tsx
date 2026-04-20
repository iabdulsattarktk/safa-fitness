import Link from "next/link"
import Image from "next/image"
import CTABanner from "@/components/layout/CTABanner"
import CountUp from "@/components/ui/CountUp"
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel"
import ParallaxBreak from "@/components/ui/ParallaxBreak"
import HeroVideo from "@/components/ui/HeroVideo"
import { getSiteContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const c = await getSiteContent()

  const facilities = [
    { img: c.img_gym     || "/images/facilities/gym.webp",          title: c.home_fac_0_title, desc: c.home_fac_0_desc, href: "/about#gym",     badge: c.home_fac_0_badge || null, featured: true  },
    { img: c.img_pool    || "/images/facilities/swimming-pool.webp", title: c.home_fac_1_title, desc: c.home_fac_1_desc, href: "/about#pool",    badge: c.home_fac_1_badge || null, featured: false },
    { img: c.img_boxing  || "/images/facilities/boxing.webp",        title: c.home_fac_2_title, desc: c.home_fac_2_desc, href: "/about#boxing",  badge: c.home_fac_2_badge || null, featured: false },
    { img: c.img_spa     || "/images/facilities/massage-spa.webp",   title: c.home_fac_3_title, desc: c.home_fac_3_desc, href: "/about#spa",     badge: c.home_fac_3_badge || null, featured: false },
    { img: c.img_sauna   || "/images/facilities/sauna.webp",         title: c.home_fac_4_title, desc: c.home_fac_4_desc, href: "/about#sauna",   badge: c.home_fac_4_badge || null, featured: false },
    { img: c.img_salon   || "/images/facilities/salon.webp",         title: c.home_fac_5_title, desc: c.home_fac_5_desc, href: "/about#salon",   badge: c.home_fac_5_badge || null, featured: false },
    { img: c.img_lockers || "/images/facilities/lockers.webp",       title: c.home_fac_6_title, desc: c.home_fac_6_desc, href: "/about#lockers", badge: c.home_fac_6_badge || null, featured: false },
    { img: c.img_snooker || "/images/facilities/snooker.webp",       title: c.home_fac_7_title, desc: c.home_fac_7_desc, href: "/about#snooker", badge: c.home_fac_7_badge || null, featured: false },
    { img: c.img_bar     || "/images/facilities/safa-bar.webp",      title: c.home_fac_8_title, desc: c.home_fac_8_desc, href: "/about#bar",     badge: c.home_fac_8_badge || null, featured: false },
  ]

  const splitFeatures = [
    { img: c.img_pool   || "/images/facilities/swimming-pool.webp", tag: c.home_split_0_tag, title: c.home_split_0_title, body: c.home_split_0_body, cta: { label: "Learn More", href: "/about#pool" }, flip: false },
    { img: c.img_boxing || "/images/facilities/boxing.webp",        tag: c.home_split_1_tag, title: c.home_split_1_title, body: c.home_split_1_body, cta: { label: "Meet the Coach", href: "/trainers" }, flip: true },
    { img: c.img_sauna  || "/images/facilities/sauna.webp",         tag: c.home_split_2_tag, title: c.home_split_2_title, body: c.home_split_2_body, cta: { label: "Explore Facilities", href: "/about#sauna" }, flip: false },
  ]

  const classes = [
    { name: c.home_cls_0_name, category: "Gym",      trainer: c.home_cls_0_trainer, level: c.home_cls_0_level, img: "/images/classes/strength-training.jpg", popular: false, proof: c.home_cls_0_proof },
    { name: c.home_cls_1_name, category: "Combat",   trainer: c.home_cls_1_trainer, level: c.home_cls_1_level, img: "/images/classes/boxing.jpg",            popular: true,  proof: c.home_cls_1_proof },
    { name: c.home_cls_2_name, category: "Fitness",  trainer: c.home_cls_2_trainer, level: c.home_cls_2_level, img: "/images/classes/transformation.jpg",    popular: false, proof: c.home_cls_2_proof },
    { name: c.home_cls_3_name, category: "Cardio",   trainer: c.home_cls_3_trainer, level: c.home_cls_3_level, img: "/images/classes/hiit.jpg",              popular: false, proof: c.home_cls_3_proof },
    { name: c.home_cls_4_name, category: "Aquatics", trainer: c.home_cls_4_trainer, level: c.home_cls_4_level, img: "/images/classes/swimming.jpg",          popular: false, proof: c.home_cls_4_proof },
    { name: c.home_cls_5_name, category: "Combat",   trainer: c.home_cls_5_trainer, level: c.home_cls_5_level, img: "/images/classes/combat.jpg",            popular: false, proof: c.home_cls_5_proof },
  ]

  const trainers = [
    { name: "Rahila Sher",     role: "Professional Boxer",       exp: "6+ years",  medals: "2 Gold, 1 Silver, 1 Bronze", img: c.img_trainer_rahila  || "/images/trainers/trainer-1.webp" },
    { name: "Huma Mumtaz",     role: "Transformation Expert",    exp: "10+ years", medals: "ISSA Certified USA",         img: c.img_trainer_huma    || "/images/trainers/trainer-2.webp" },
    { name: "Kishwar Ali",     role: "Combat Trainer",           exp: "28+ years", medals: "Floor In-Charge",            img: c.img_trainer_kishwar || "/images/trainers/kishwar-ali.webp" },
    { name: "Danish Masih Gill", role: "Personal Trainer",       exp: "8+ years",  medals: "200+ Clients",               img: c.img_trainer_danish  || "/images/trainers/trainer-3.webp" },
    { name: "Muhammad Sohail", role: "Swimming Coach",           exp: "8+ years",  medals: "BLS Certified",              img: c.img_trainer_sohail  || "/images/trainers/trainer-4.webp" },
  ]

  const plans = [
    {
      name: "Swimming Pool",
      price: c.price_pool_monthly,
      originalPrice: c.price_pool_original,
      savingsTag: "Save PKR 36,000/year",
      reg: "18,000",
      color: "border-gray-700",
      badge: "Aquatics",
      features: ["Pool access", "Steam/Sauna/Jacuzzi", "2 free gym sessions"],
      popular: false,
      proof: "Heated indoor · Year-round access",
    },
    {
      name: "Gym Only",
      price: c.price_gym_monthly,
      originalPrice: c.price_gym_original,
      savingsTag: "Save PKR 24,000/year",
      reg: "18,000",
      color: "border-[#f5a623]",
      badge: "Most Popular",
      features: ["Full gym access", "Premium facilities", "2 free sauna sessions", "Expert trainers"],
      popular: true,
      proof: "Most chosen by solo athletes",
    },
    {
      name: "Gym + Pool",
      price: c.price_combo_monthly,
      originalPrice: c.price_combo_original,
      savingsTag: "Save PKR 24,000/year",
      reg: "18,000",
      color: "border-gray-700",
      badge: "Best Value",
      features: ["Gym + Pool access", "Steam/Sauna/Jacuzzi", "1 personal training session", "All amenities"],
      popular: false,
      proof: "Most complete package",
    },
  ]

  const testimonials = [
    { name: c.home_test_0_name, since: c.home_test_0_since, text: c.home_test_0_text },
    { name: c.home_test_1_name, since: c.home_test_1_since, text: c.home_test_1_text },
    { name: c.home_test_2_name, since: c.home_test_2_since, text: c.home_test_2_text },
    { name: c.home_test_3_name, since: c.home_test_3_since, text: c.home_test_3_text },
  ]

  const steps = [
    { num: "01", title: c.home_step_0_title, desc: c.home_step_0_desc, img: "/images/step-movement.webp" },
    { num: "02", title: c.home_step_1_title, desc: c.home_step_1_desc, img: "/images/step-time.webp" },
    { num: "03", title: c.home_step_2_title, desc: c.home_step_2_desc, img: "/images/step-practice.webp" },
    { num: "04", title: c.home_step_3_title, desc: c.home_step_3_desc, img: "/images/step-results.webp" },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <HeroVideo />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 20% 60%, rgba(245,166,35,0.15) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(180,20,20,0.10) 0%, transparent 50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-[#f5a623] text-sm font-bold uppercase tracking-[0.3em] mb-6">
            {c.home_hero_badge}
          </p>
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6 text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {c.home_hero_title1}
            <span className="block text-[#f5a623]">{c.home_hero_title2}</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {c.home_hero_sub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing"
              className="w-full sm:w-auto px-10 py-4 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold uppercase tracking-wider rounded transition-colors text-sm">
              {c.home_hero_btn1}
            </Link>
            <Link href="/about"
              className="w-full sm:w-auto px-10 py-4 border-2 border-white/30 hover:border-[#f5a623] text-white hover:text-[#f5a623] font-bold uppercase tracking-wider rounded transition-colors text-sm">
              {c.home_hero_btn2}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { val: "8+", label: "Years of Excellence" },
              { val: "9",  label: "Premium Facilities" },
              { val: "5",  label: "Expert Trainers" },
              { val: "F-7",label: "Markaz, Islamabad" },
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.home_fac_tag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              {c.home_fac_h2}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <Link key={f.title} href={f.href}
                data-reveal data-delay={String((i % 6) + 1)}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                  f.featured
                    ? "bg-[#141414] border border-[#f5a623] shadow-[0_0_28px_rgba(245,166,35,0.18)]"
                    : "bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50"
                }`}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {f.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded ${
                      f.featured ? "bg-[#f5a623] text-black" : "bg-black/60 text-[#f5a623] border border-[#f5a623]/40 backdrop-blur-sm"
                    }`}>
                      {f.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
                    <span className="text-gray-600 text-xs">Included in all gym plans</span>
                    <span className="text-[#f5a623] text-xs font-bold group-hover:gap-2 transition-all">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT FEATURES ── */}
      {splitFeatures.map((f) => (
        <section key={f.tag} className="bg-[#0a0a0a] overflow-hidden">
          <div className={`flex flex-col ${f.flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-auto lg:min-h-[480px] overflow-hidden">
              <Image src={f.img} alt={f.title} fill className="object-cover" />
            </div>
            <div className="w-full lg:w-1/2 flex items-center px-8 sm:px-12 lg:px-16 py-14 lg:py-20" data-reveal>
              <div className="max-w-lg">
                <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">{f.tag}</p>
                <h2
                  className="text-4xl sm:text-5xl font-bold uppercase text-white leading-tight mb-5"
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
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.home_cls_tag}</p>
              <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}>
                {c.home_cls_h2}
              </h2>
            </div>
            <Link href="/classes"
              className="text-sm font-bold text-[#f5a623] border border-[#f5a623] px-5 py-2 rounded hover:bg-[#f5a623] hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap">
              View All Classes
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((cls, i) => (
              <Link key={cls.name} href="/classes"
                data-reveal data-delay={String(i + 1)}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                  cls.popular
                    ? "bg-[#141414] border border-[#f5a623] shadow-[0_0_28px_rgba(245,166,35,0.18)]"
                    : "bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50"
                }`}>
                {cls.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-block px-4 py-1 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-widest rounded-b-lg">
                      ★ Most Popular
                    </span>
                  </div>
                )}
                <div className={`relative h-48 overflow-hidden ${cls.popular ? "mt-4" : ""}`}>
                  <Image src={cls.img} alt={cls.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider rounded">
                    {cls.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}>{cls.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">Trainer: <span className="text-gray-300">{cls.trainer}</span></p>
                  <p className="text-gray-500 text-sm">Level: <span className="text-gray-300">{cls.level}</span></p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg className="w-3 h-3 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-gray-500 text-xs">{cls.proof}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
                    <span className="text-[#f5a623] text-sm font-bold">Join this class →</span>
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.home_steps_tag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              {c.home_steps_h2}
            </h2>
            <p className="text-gray-400 mt-3 text-lg">{c.home_steps_sub}</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#f5a623]/40 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.num} data-reveal data-delay={String(i + 1)} className="group flex flex-col">
                  <div className="flex justify-center mb-5">
                    <div className="relative w-20 h-20 rounded-full bg-[#141414] border-2 border-[#2a2a2a] group-hover:border-[#f5a623] transition-colors duration-300 flex items-center justify-center z-10">
                      <span className="text-3xl font-bold text-[#f5a623]" style={{ fontFamily: "var(--font-display)" }}>
                        {s.num}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-white font-bold text-xl uppercase mb-2 group-hover:text-[#f5a623] transition-colors text-center"
                    style={{ fontFamily: "var(--font-display)" }}>
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
        src={c.img_parallax_boxing || "/images/gallery/boxing.webp"}
        quote={c.home_para1_quote}
        sub={c.home_para1_sub}
      />

      {/* ── TRAINERS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4" data-reveal>
            <div>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.home_tr_tag}</p>
              <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}>
                {c.home_tr_h2}
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.home_pricing_tag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              {c.home_pricing_h2}
            </h2>
            <p className="text-gray-400 mt-3">All plans include PKR 18,000 one-time registration fee</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((p, i) => (
              <div key={p.name}
                data-reveal data-delay={String(i + 1)}
                className={`relative flex flex-col rounded-xl transition-all duration-300 ${
                  p.popular
                    ? "bg-[#141414] border-2 border-[#f5a623] shadow-[0_0_36px_rgba(245,166,35,0.2)] scale-105"
                    : "bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/40 hover:-translate-y-1"
                }`}>
                {p.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <span className="inline-block px-5 py-1.5 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-widest rounded-b-lg shadow">
                      ★ {p.badge}
                    </span>
                  </div>
                )}
                {!p.popular && p.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2.5 py-1 bg-[#2a2a2a] text-[#f5a623] border border-[#f5a623]/30 text-[10px] font-bold uppercase tracking-wider rounded">
                      {p.badge}
                    </span>
                  </div>
                )}
                <div className={`p-6 flex flex-col flex-1 ${p.popular ? "pt-9" : ""}`}>
                  <h3 className="text-white font-bold text-xl mb-3"
                    style={{ fontFamily: "var(--font-display)" }}>{p.name}</h3>
                  {p.originalPrice && (
                    <p className="text-gray-500 text-xs line-through mb-0.5">PKR {p.originalPrice}/mo</p>
                  )}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-gray-400 text-sm">PKR</span>
                    <span className={`text-4xl font-bold ${p.popular ? "text-[#f5a623]" : "text-white"}`}
                      style={{ fontFamily: "var(--font-display)" }}>{p.price}</span>
                    <span className="text-gray-500 text-sm">/mo</span>
                  </div>
                  {p.savingsTag && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3 bg-green-500/10 border border-green-500/30 w-fit">
                      <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-green-400 text-xs font-semibold">{p.savingsTag}</span>
                    </div>
                  )}
                  {p.proof && (
                    <p className="text-gray-500 text-xs mb-3 italic">{p.proof}</p>
                  )}
                  <ul className="space-y-3 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-[#f5a623] mt-0.5 flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing"
                    className={`block text-center py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors ${
                      p.popular
                        ? "bg-[#f5a623] text-black hover:bg-[#e09410] shadow-lg shadow-[#f5a623]/25"
                        : "border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black"
                    }`}>
                    See Full Details
                  </Link>
                  <p className="text-gray-600 text-xs text-center mt-2">Save more with multi-month plans →</p>
                </div>
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
        src={c.img_parallax_running || "/images/gallery/running.webp"}
        quote={c.home_para2_quote}
      />

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.home_test_tag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              {c.home_test_h2}
            </h2>
          </div>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="bg-[#0a0a0a] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6" data-reveal>
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">{c.home_gal_tag}</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}>
              {c.home_gal_h2}
            </h2>
            <Link href="/gallery"
              className="hidden sm:inline-flex items-center gap-2 text-[#f5a623] font-bold text-xs uppercase tracking-wider hover:gap-4 transition-all duration-300">
              Full Gallery
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
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
            <Link key={src} href="/gallery"
              className="relative shrink-0 w-64 h-44 rounded-lg overflow-hidden snap-start group">
              <Image src={src} alt={`Safa Fitness Club facility ${i + 1}`} fill
                className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </Link>
          ))}
          <Link href="/gallery"
            className="relative shrink-0 w-64 h-44 rounded-lg overflow-hidden snap-start bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 flex flex-col items-center justify-center gap-2 transition-colors">
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
        heading={c.home_cta_heading}
        subheading={c.home_cta_sub}
        primaryBtn={{ label: c.home_cta_btn1, href: "/pricing" }}
        secondaryBtn={{ label: c.home_cta_btn2, href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
