import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import CountUp from "@/components/ui/CountUp"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Safa Fitness Club – Islamabad's Premier Gym",
  description:
    "Learn about Safa Fitness Club's 8+ year journey of transforming lives in F-7 Markaz, Islamabad. Meet our expert trainers and explore our world-class facilities.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

const values = [
  {
    title: "Excellence",
    desc: "State-of-the-art equipment and world-class facilities that match international fitness standards.",
    img: "/images/facilities/gym.webp",
  },
  {
    title: "Community",
    desc: "A welcoming environment where members of all fitness levels feel motivated and supported.",
    img: "/images/team-banner2.webp",
  },
  {
    title: "Expertise",
    desc: "Certified trainers with decades of combined experience delivering personalized programs.",
    img: "/images/trainers/kishwar-trainer.webp",
  },
  {
    title: "Wellness",
    desc: "Holistic approach to health — from gym and pool to spa, sauna, and nutrition guidance.",
    img: "/images/facilities/sauna.webp",
  },
]

const trainers = [
  {
    name: "Rahila Sher",
    role: "Professional Boxer",
    exp: "6+ years",
    cert: "2 Gold, 1 Silver, 1 Bronze medals",
    bio: "A champion boxer who brings professional-level boxing and kickboxing training to Safa Fitness Club.",
    img: "/images/trainers/trainer-1.webp",
  },
  {
    name: "Huma Mumtaz",
    role: "Transformation Expert",
    exp: "10+ years",
    cert: "ISSA Certified – USA",
    bio: "Internationally certified transformation specialist helping hundreds achieve their body and health goals.",
    img: "/images/trainers/trainer-2.webp",
  },
  {
    name: "Kishwar Ali",
    role: "Combat Trainer & Floor In-Charge",
    exp: "28+ years",
    cert: "Senior Fitness Specialist",
    bio: "With nearly three decades of experience, Kishwar is the backbone of Safa Fitness Club's training floor.",
    img: "/images/trainers/kishwar-ali.webp",
  },
  {
    name: "Danish Masih Gill",
    role: "Personal Trainer",
    exp: "8+ years",
    cert: "200+ Clients Transformed",
    bio: "A dedicated personal trainer with a proven track record of helping clients achieve consistent, lasting results.",
    img: "/images/trainers/trainer-3.webp",
  },
  {
    name: "Muhammad Sohail",
    role: "Swimming Coach",
    exp: "8+ years",
    cert: "BLS Certified",
    bio: "Expert swimming coach offering structured aquatic fitness programs for beginners to advanced swimmers.",
    img: "/images/trainers/trainer-4.webp",
  },
]

const facilities = [
  { id: "gym", img: "/images/facilities/gym.webp", title: "Gym & Fitness", desc: "Fully equipped with premium machines and free weights for strength, cardio, and functional training." },
  { id: "pool", img: "/images/facilities/swimming-pool.webp", title: "Swimming Pool", desc: "A heated indoor pool for lap swimming, aqua fitness, and relaxation." },
  { id: "boxing", img: "/images/facilities/boxing.webp", title: "Boxing Ring", desc: "Professional-grade boxing ring for combat training, sparring, and kickboxing sessions." },
  { id: "spa", img: "/images/facilities/massage-spa.webp", title: "Massage & Spa", desc: "Therapeutic massages and rejuvenating spa treatments to help you recover and relax." },
  { id: "sauna", img: "/images/facilities/sauna.webp", title: "Steam, Sauna & Jacuzzi", desc: "Detox and unwind with our dedicated heat therapy and hydrotherapy zone." },
  { id: "salon", img: "/images/facilities/salon.webp", title: "Beauty Salon – Men", desc: "Premium grooming and styling services for the modern gentleman." },
  { id: "lockers", img: "/images/facilities/lockers.webp", title: "VIP Lockers & Shower", desc: "Spacious private lockers and premium shower facilities for your comfort." },
  { id: "snooker", img: "/images/facilities/snooker.webp", title: "Snooker Lounge", desc: "A relaxed lounge space to unwind and enjoy a game of snooker after your workout." },
  { id: "bar", img: "/images/facilities/safa-bar.webp", title: "Safa Bar", desc: "Healthy smoothies, protein shakes, and premium refreshments to fuel your fitness journey." },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/team-banner.webp"
          alt="Safa Fitness Club Team"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Who We Are</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About <span className="text-[#f5a623]">Us</span>
          </h1>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <div data-reveal>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Story</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                8 Years of Transforming<br />
                <span className="text-[#f5a623]">Lives in Islamabad</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Safa Fitness Club was founded with a single vision — to bring world-class fitness and wellness to Islamabad. Located at the 5th Floor of Safa Gold Mall in F-7 Markaz, we have spent 8+ years building a community of health-conscious individuals who refuse to settle for less.
                </p>
                <p>
                  From our state-of-the-art gym floor to our heated indoor swimming pool, professional boxing ring, spa, sauna, and more — every corner of Safa Fitness Club is designed for one purpose: your transformation.
                </p>
                <p>
                  We believe fitness is not just physical. It is mental strength, discipline, and community. Our certified trainers, premium facilities, and welcoming environment make us Islamabad's most complete fitness destination.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { val: "8+", label: "Years Open" },
                  { val: "9", label: "Facilities" },
                  { val: "5", label: "Expert Trainers" },
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
            {/* Image */}
            <div className="relative h-80 sm:h-[480px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-us.webp"
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">What Drives Us</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Core <span className="text-[#f5a623]">Values</span>
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
                  <Image
                    src={v.img}
                    alt={v.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">The Safa Elite Team</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Meet Our <span className="text-[#f5a623]">Experts</span>
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
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
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
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Explore the Club</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our <span className="text-[#f5a623]">Facilities</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every facility is maintained to the highest standards of cleanliness, safety, and performance.
            </p>
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
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
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
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">Find Us</p>
              <h2
                className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Visit the <span className="text-[#f5a623]">Club</span>
              </h2>
              <ul className="space-y-5 text-gray-400">
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Address</p>
                    <p className="text-sm leading-relaxed">Safa Gold Mall, 5th Floor, College Road,<br />F-7 Markaz, Islamabad</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Opening Hours</p>
                    <p className="text-sm">Monday – Saturday: 7:00 AM – 11:00 PM</p>
                    <p className="text-sm">Sunday: 12:00 PM – 10:00 PM</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Phone</p>
                    <a href="tel:+923115156949" className="text-sm hover:text-[#f5a623] transition-colors block">+92-311-5156949</a>
                    <a href="tel:+923300007232" className="text-sm hover:text-[#f5a623] transition-colors block">+92-330-0007232</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <svg className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Email</p>
                    <a href="mailto:contact@safafitnessclub.com" className="text-sm hover:text-[#f5a623] transition-colors">
                      contact@safafitnessclub.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            {/* Map embed */}
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
        heading="Ready to Start Your Journey?"
        subheading="Join Islamabad's most complete fitness club. Walk-ins welcome at Safa Gold Mall, F-7 Markaz."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Contact Us", href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
