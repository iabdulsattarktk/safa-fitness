import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import CountUp from "@/components/ui/CountUp"
import { getSiteContent } from "@/lib/site-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trainers | Safa Fitness Club – Expert Coaches in Islamabad",
  description:
    "Meet Safa Fitness Club's certified trainers — Kishwar Ali (28+ yrs), Huma Mumtaz (ISSA USA), Rahila Sher (National Boxer), Danish Masih Gill, and Muhammad Sohail.",
}

export const dynamic = "force-dynamic"

export default async function TrainersPage() {
  const c = await getSiteContent()

  const trainers = [
    {
      name:            c.about_tr_2_name,
      role:            c.about_tr_2_role,
      exp:             c.tr_kishwar_exp,
      img:             c.img_trainer_kishwar  || "/images/trainers/kishwar-ali.webp",
      quote:           c.tr_kishwar_quote,
      certs:           c.tr_kishwar_certs.split("\n").filter(Boolean),
      specializations: c.tr_kishwar_specs.split("\n").filter(Boolean),
      bio:             c.about_tr_2_bio,
    },
    {
      name:            c.about_tr_1_name,
      role:            c.about_tr_1_role,
      exp:             c.tr_huma_exp,
      img:             c.img_trainer_huma     || "/images/trainers/trainer-2.webp",
      quote:           c.tr_huma_quote,
      certs:           c.tr_huma_certs.split("\n").filter(Boolean),
      specializations: c.tr_huma_specs.split("\n").filter(Boolean),
      bio:             c.about_tr_1_bio,
    },
    {
      name:            c.about_tr_0_name,
      role:            c.about_tr_0_role,
      exp:             c.tr_rahila_exp,
      img:             c.img_trainer_rahila   || "/images/trainers/trainer-1.webp",
      quote:           c.tr_rahila_quote,
      certs:           c.tr_rahila_certs.split("\n").filter(Boolean),
      specializations: c.tr_rahila_specs.split("\n").filter(Boolean),
      bio:             c.about_tr_0_bio,
    },
    {
      name:            c.about_tr_3_name,
      role:            c.about_tr_3_role,
      exp:             c.tr_danish_exp,
      img:             c.img_trainer_danish   || "/images/trainers/trainer-3.webp",
      quote:           c.tr_danish_quote,
      certs:           c.tr_danish_certs.split("\n").filter(Boolean),
      specializations: c.tr_danish_specs.split("\n").filter(Boolean),
      bio:             c.about_tr_3_bio,
    },
    {
      name:            c.about_tr_4_name,
      role:            c.about_tr_4_role,
      exp:             c.tr_sohail_exp,
      img:             c.img_trainer_sohail   || "/images/trainers/trainer-4.webp",
      quote:           c.tr_sohail_quote,
      certs:           c.tr_sohail_certs.split("\n").filter(Boolean),
      specializations: c.tr_sohail_specs.split("\n").filter(Boolean),
      bio:             c.about_tr_4_bio,
    },
  ]

  const stats = [
    { val: c.trainers_stat_0_val, label: c.trainers_stat_0_label },
    { val: c.trainers_stat_1_val, label: c.trainers_stat_1_label },
    { val: c.trainers_stat_2_val, label: c.trainers_stat_2_label },
    { val: c.trainers_stat_3_val, label: c.trainers_stat_3_label },
  ]

  const ptBullets = c.trainers_pt_bullets.split("\n").filter(Boolean)

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src={c.img_trainers_banner || "/images/team-banner2.webp"}
          alt="Safa Fitness Club Trainers"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">{c.trainers_hero_badge}</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {c.trainers_hero_h1} <span className="text-[#f5a623]">{c.trainers_hero_h1_orange}</span>
          </h1>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#f5a623] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <CountUp
                  value={s.val}
                  className="text-5xl font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                />
                <p className="text-black/70 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINER CARDS ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">{c.trainers_section_tag}</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.trainers_section_h2a} <span className="text-[#f5a623]">{c.trainers_section_h2b}</span>
            </h2>
          </div>

          <div className="space-y-10">
            {trainers.map((t, i) => (
              <div
                key={t.name}
                data-reveal data-delay="1"
                className={`grid grid-cols-1 lg:grid-cols-3 gap-0 bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Photo */}
                <div className="relative h-72 lg:h-auto lg:[direction:ltr]">
                  <Image src={t.img} alt={t.name} fill className="object-cover object-top" />
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

                  <blockquote className="border-l-2 border-[#f5a623] pl-4 mb-6">
                    <p className="text-gray-300 text-sm italic">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">Certifications</p>
                      <ul className="space-y-1.5">
                        {t.certs.map((cert) => (
                          <li key={cert} className="flex items-start gap-2 text-gray-400 text-xs">
                            <span className="text-[#f5a623] mt-0.5 flex-shrink-0">✓</span>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
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
            <div data-reveal>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">{c.trainers_pt_tag}</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.trainers_pt_h2a} <span className="text-[#f5a623]">{c.trainers_pt_h2b}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">{c.trainers_pt_desc}</p>
              <ul className="space-y-3 mb-8">
                {ptBullets.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="text-[#f5a623] mt-0.5 flex-shrink-0">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${c.contact_phone}`}
                  className="px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors text-center"
                >
                  {c.trainers_pt_btn1}
                </a>
                <Link
                  href="/pricing"
                  className="px-8 py-3 border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black font-bold text-sm uppercase tracking-wider rounded transition-colors text-center"
                >
                  {c.trainers_pt_btn2}
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={c.trainers_pt_img || "/images/trainers/kishwar-trainer.webp"}
                alt="Personal Training at Safa Fitness Club"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading={c.trainers_cta_heading}
        subheading={c.trainers_cta_sub}
        primaryBtn={{ label: c.trainers_cta_btn1, href: "/pricing" }}
        secondaryBtn={{ label: c.trainers_cta_btn2, href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
