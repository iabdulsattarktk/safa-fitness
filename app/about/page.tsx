import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import CountUp from "@/components/ui/CountUp"
import type { Metadata } from "next"
import { getSiteContent } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "About Us | Safa Fitness Club – Islamabad's Premier Gym",
  description:
    "Learn about Safa Fitness Club's 8+ year journey of transforming lives in F-7 Markaz, Islamabad. Meet our expert trainers and explore our world-class facilities.",
}

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const c = await getSiteContent()

  const values = [
    { title: c.about_val_0_title, desc: c.about_val_0_desc, img: c.about_val_0_img || "/images/facilities/gym.webp" },
    { title: c.about_val_1_title, desc: c.about_val_1_desc, img: c.about_val_1_img || "/images/team-banner2.webp" },
    { title: c.about_val_2_title, desc: c.about_val_2_desc, img: c.about_val_2_img || "/images/trainers/kishwar-trainer.webp" },
    { title: c.about_val_3_title, desc: c.about_val_3_desc, img: c.about_val_3_img || "/images/facilities/sauna.webp" },
  ]

  const trainers = [
    { name: c.about_tr_0_name, role: c.about_tr_0_role, exp: "6+ years",  cert: c.about_tr_0_cert, bio: c.about_tr_0_bio, img: c.img_trainer_rahila  || "/images/trainers/trainer-1.webp" },
    { name: c.about_tr_1_name, role: c.about_tr_1_role, exp: "10+ years", cert: c.about_tr_1_cert, bio: c.about_tr_1_bio, img: c.img_trainer_huma    || "/images/trainers/trainer-2.webp" },
    { name: c.about_tr_2_name, role: c.about_tr_2_role, exp: "28+ years", cert: c.about_tr_2_cert, bio: c.about_tr_2_bio, img: c.img_trainer_kishwar || "/images/trainers/kishwar-ali.webp" },
    { name: c.about_tr_3_name, role: c.about_tr_3_role, exp: "8+ years",  cert: c.about_tr_3_cert, bio: c.about_tr_3_bio, img: c.img_trainer_danish  || "/images/trainers/trainer-3.webp" },
    { name: c.about_tr_4_name, role: c.about_tr_4_role, exp: "8+ years",  cert: c.about_tr_4_cert, bio: c.about_tr_4_bio, img: c.img_trainer_sohail  || "/images/trainers/trainer-4.webp" },
  ]

  const facilities = [
    { id: "gym",     img: c.img_gym     || "/images/facilities/gym.webp",          title: c.about_fac_0_title, desc: c.about_fac_0_desc },
    { id: "pool",    img: c.img_pool    || "/images/facilities/swimming-pool.webp", title: c.about_fac_1_title, desc: c.about_fac_1_desc },
    { id: "boxing",  img: c.img_boxing  || "/images/facilities/boxing.webp",        title: c.about_fac_2_title, desc: c.about_fac_2_desc },
    { id: "spa",     img: c.img_spa     || "/images/facilities/massage-spa.webp",   title: c.about_fac_3_title, desc: c.about_fac_3_desc },
    { id: "sauna",   img: c.img_sauna   || "/images/facilities/sauna.webp",         title: c.about_fac_4_title, desc: c.about_fac_4_desc },
    { id: "salon",   img: c.img_salon   || "/images/facilities/salon.webp",         title: c.about_fac_5_title, desc: c.about_fac_5_desc },
    { id: "lockers", img: c.img_lockers || "/images/facilities/lockers.webp",       title: c.about_fac_6_title, desc: c.about_fac_6_desc },
    { id: "snooker", img: c.img_snooker || "/images/facilities/snooker.webp",       title: c.about_fac_7_title, desc: c.about_fac_7_desc },
    { id: "bar",     img: c.img_bar     || "/images/facilities/safa-bar.webp",      title: c.about_fac_8_title, desc: c.about_fac_8_desc },
  ]

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src={c.img_about_banner || "/images/team-banner.webp"}
          alt="Safa Fitness Club Team"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">{c.about_hero_badge}</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {c.about_hero_h1} <span className="text-[#f5a623]">{c.about_hero_h1_orange}</span>
          </h1>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div data-reveal>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">{c.about_story_tag}</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.about_story_h2a}<br />
                <span className="text-[#f5a623]">{c.about_story_h2b}</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{c.about_story_p1}</p>
                <p>{c.about_story_p2}</p>
                <p>{c.about_story_p3}</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { val: "8+", label: "Years Open" },
                  { val: "9",  label: "Facilities" },
                  { val: "5",  label: "Expert Trainers" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 bg-[#141414] border border-[#2a2a2a] rounded-lg">
                    <CountUp
                      value={s.val}
                      className="text-5xl font-bold text-[#f5a623]"
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 sm:h-[480px] rounded-lg overflow-hidden">
              <Image
                src={c.img_about_us || "/images/about-us.webp"}
                alt="Safa Fitness Club interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.about_values_tag}</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.about_values_h2}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                data-reveal data-delay={String(i + 1)}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={v.img} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3
                      className="text-white font-bold text-xl uppercase group-hover:text-[#f5a623] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {v.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.about_team_tag}</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.about_team_h2}
              </h2>
            </div>
            <Link
              href="/trainers"
              className="text-sm font-bold text-[#f5a623] border border-[#f5a623] px-5 py-2 rounded hover:bg-[#f5a623] hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap"
            >
              View All Trainers
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {trainers.map((t, i) => (
              <Link
                key={t.name}
                data-reveal data-delay={String((i % 5) + 1)}
                href="/trainers"
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={t.img} alt={t.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-0.5 group-hover:text-[#f5a623] transition-colors">{t.name}</h3>
                  <p className="text-[#f5a623] text-xs font-medium mb-2">{t.role}</p>
                  <p className="text-gray-500 text-xs">{t.exp} · {t.cert}</p>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed line-clamp-2">{t.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITY TOUR ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.about_fac_tag}</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.about_fac_h2}
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">{c.about_fac_sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <div
                key={f.id}
                id={f.id}
                data-reveal data-delay={String((i % 3) + 1)}
                className="group overflow-hidden bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT US ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">{c.about_visit_tag}</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.about_visit_h2}
              </h2>
              <ul className="space-y-5 text-gray-400">
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Address</p>
                    <p className="text-sm leading-relaxed">{c.contact_address}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Opening Hours</p>
                    <p className="text-sm">Mon–Fri: {c.hours_weekday}</p>
                    <p className="text-sm">Sat–Sun: {c.hours_weekend}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Phone</p>
                    <a href={`tel:${c.contact_phone}`} className="text-sm hover:text-[#f5a623] transition-colors block">{c.contact_phone}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Email</p>
                    <a href={`mailto:${c.contact_email}`} className="text-sm hover:text-[#f5a623] transition-colors">{c.contact_email}</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden border border-[#2a2a2a]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.8!2d73.0479!3d33.7294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6789f3d5a9187bdb!2sSafa%20Fitness%20Club!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Safa Fitness Club Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading={c.about_cta_heading}
        subheading={c.about_cta_sub}
        primaryBtn={{ label: c.about_cta_btn1, href: "/pricing" }}
        secondaryBtn={{ label: c.about_cta_btn2, href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
