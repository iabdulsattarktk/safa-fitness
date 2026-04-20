import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"
import { getSiteContent } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Classes | Safa Fitness Club – Islamabad",
  description:
    "Explore Safa Fitness Club's expert-led classes — boxing, strength training, swimming, HIIT, body transformation, and combat training. All levels welcome.",
}

export const dynamic = "force-dynamic"

export default async function ClassesPage() {
  const c = await getSiteContent()

  const classes = [
    { name: c.classes_0_name, category: c.classes_0_category, categoryColor: "bg-orange-500", trainer: c.classes_0_trainer, level: c.classes_0_level, duration: c.classes_0_duration, img: c.classes_0_img, desc: c.classes_0_desc, popular: false, proof: c.classes_0_proof },
    { name: c.classes_1_name, category: c.classes_1_category, categoryColor: "bg-red-600",    trainer: c.classes_1_trainer, level: c.classes_1_level, duration: c.classes_1_duration, img: c.classes_1_img, desc: c.classes_1_desc, popular: true,  proof: c.classes_1_proof },
    { name: c.classes_2_name, category: c.classes_2_category, categoryColor: "bg-purple-600", trainer: c.classes_2_trainer, level: c.classes_2_level, duration: c.classes_2_duration, img: c.classes_2_img, desc: c.classes_2_desc, popular: false, proof: c.classes_2_proof },
    { name: c.classes_3_name, category: c.classes_3_category, categoryColor: "bg-yellow-500", trainer: c.classes_3_trainer, level: c.classes_3_level, duration: c.classes_3_duration, img: c.classes_3_img, desc: c.classes_3_desc, popular: false, proof: c.classes_3_proof },
    { name: c.classes_4_name, category: c.classes_4_category, categoryColor: "bg-blue-500",   trainer: c.classes_4_trainer, level: c.classes_4_level, duration: c.classes_4_duration, img: c.classes_4_img, desc: c.classes_4_desc, popular: false, proof: c.classes_4_proof },
    { name: c.classes_5_name, category: c.classes_5_category, categoryColor: "bg-red-600",    trainer: c.classes_5_trainer, level: c.classes_5_level, duration: c.classes_5_duration, img: c.classes_5_img, desc: c.classes_5_desc, popular: false, proof: c.classes_5_proof },
  ]

  const whyCards = [
    { title: c.classes_why_0_title, desc: c.classes_why_0_desc, img: c.classes_why_0_img },
    { title: c.classes_why_1_title, desc: c.classes_why_1_desc, img: c.classes_why_1_img },
    { title: c.classes_why_2_title, desc: c.classes_why_2_desc, img: c.classes_why_2_img },
    { title: c.classes_why_3_title, desc: c.classes_why_3_desc, img: c.classes_why_3_img },
  ]

  const hours = [
    { day: "Monday",    hours: c.classes_hours_mon },
    { day: "Tuesday",   hours: c.classes_hours_tue },
    { day: "Wednesday", hours: c.classes_hours_wed },
    { day: "Thursday",  hours: c.classes_hours_thu },
    { day: "Friday",    hours: c.classes_hours_fri },
    { day: "Saturday",  hours: c.classes_hours_sat },
    { day: "Sunday",    hours: c.classes_hours_sun },
  ]

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src={c.classes_hero_img}
          alt="Safa Fitness Club Classes"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">{c.classes_hero_badge}</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {c.classes_hero_h1} <span className="text-[#f5a623]">{c.classes_hero_h1_orange}</span>
          </h1>
        </div>
      </section>

      {/* ── CLASSES GRID ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.classes_grid_tag}</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.classes_grid_h2}
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">{c.classes_grid_sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, i) => (
              <div
                key={cls.name}
                data-reveal data-delay={String((i % 3) + 1)}
                className={`group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  cls.popular
                    ? "bg-[#141414] border border-[#f5a623] shadow-[0_0_32px_rgba(245,166,35,0.2)]"
                    : "bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50"
                }`}
              >
                {cls.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-block px-4 py-1.5 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-widest rounded-b-lg shadow">
                      ★ Most Popular
                    </span>
                  </div>
                )}
                <div className={`relative h-52 overflow-hidden ${cls.popular ? "mt-4" : ""}`}>
                  <Image src={cls.img} alt={cls.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 px-2 py-1 ${cls.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded`}>
                    {cls.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-white font-bold text-xl mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {cls.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{cls.desc}</p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg className="w-3 h-3 text-[#f5a623] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-gray-500 text-xs">{cls.proof}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-[#2a2a2a] mt-auto">
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg className="w-3.5 h-3.5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {cls.trainer}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg className="w-3.5 h-3.5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      {cls.level}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <svg className="w-3.5 h-3.5 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {cls.duration}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${c.contact_whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 block text-center py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors ${
                      cls.popular
                        ? "bg-[#f5a623] text-black hover:bg-[#e09410]"
                        : "border border-[#2a2a2a] text-gray-300 hover:border-[#f5a623]/50 hover:text-[#f5a623]"
                    }`}
                  >
                    {cls.popular ? "Join This Class Now" : "Book a Session"}
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.classes_hours_tag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
              {c.classes_hours_h2}
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
                {hours.map((row) => (
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
                  {c.classes_book_title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{c.classes_book_desc}</p>
                <div className="space-y-3">
                  <a href={`tel:${c.contact_phone}`} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors">
                    <svg className="w-4 h-4 text-[#f5a623] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span className="text-gray-300 text-sm">{c.contact_phone}</span>
                  </a>
                  <a href={`mailto:${c.contact_email}`} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors">
                    <svg className="w-4 h-4 text-[#f5a623] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="text-gray-300 text-sm">{c.contact_email}</span>
                  </a>
                </div>
              </div>
              <div className="bg-[#f5a623] rounded-lg p-6 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-black font-bold uppercase text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {c.classes_walkin_title}
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed">{c.classes_walkin_desc}</p>
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.classes_why_tag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
              {c.classes_why_h2}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((f, i) => (
              <div key={f.title} data-reveal data-delay={String(i + 1)} className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3 className="text-white font-bold text-lg uppercase group-hover:text-[#f5a623] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
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
            <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>{c.classes_pt_title}</p>
            <p className="text-gray-400 text-sm mt-1">{c.classes_pt_desc}</p>
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
        heading={c.classes_cta_heading}
        subheading={c.classes_cta_sub}
        primaryBtn={{ label: c.classes_cta_btn1, href: "/pricing" }}
        secondaryBtn={{ label: c.classes_cta_btn2, href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
