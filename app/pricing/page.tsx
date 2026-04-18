import Image from "next/image"
import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Membership & Pricing | Safa Fitness Club – Islamabad",
  description:
    "Explore Safa Fitness Club membership plans — Gym, Swimming Pool, Gym + VIP Lockers, Gym + Pool, Kids, and Day Pass. PKR pricing with 3, 6 & 12-month discounts available.",
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ─── Data ────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "day-pass",
    name: "Day Pass",
    price: "2,500",
    period: "per visit",
    registration: null,
    badge: null,
    highlight: false,
    img: "/images/facilities/gym.webp",
    features: [
      "Full gym access for 1 day",
      "Boxing ring access",
      "Snooker lounge",
      "Safa Bar (beverages)",
      "Standard locker use",
      "No commitment required",
    ],
    cta: "Walk In Today",
    ctaNote: "No booking required — bring valid ID",
  },
  {
    id: "swimming",
    name: "Swimming Pool",
    price: "12,000",
    period: "per month",
    registration: "18,000",
    badge: null,
    highlight: false,
    img: "/images/facilities/swimming-pool.webp",
    features: [
      "Heated indoor pool access",
      "Professional swimming coach",
      "Beginner to advanced programs",
      "Aquatic fitness sessions",
      "Locker & shower access",
      "BLS-certified lifeguard on duty",
    ],
    cta: "Join Now",
    ctaNote: "One-time registration: PKR 18,000",
  },
  {
    id: "gym",
    name: "Gym Only",
    price: "18,000",
    period: "per month",
    registration: "18,000",
    badge: null,
    highlight: false,
    img: "/images/facilities/gym.webp",
    features: [
      "Full gym & fitness floor",
      "Boxing ring access",
      "Snooker lounge",
      "Safa Bar (beverages)",
      "Standard locker & shower",
      "Certified trainer guidance",
    ],
    cta: "Join Now",
    ctaNote: "One-time registration: PKR 18,000",
  },
  {
    id: "gym-vip",
    name: "Gym + VIP Lockers",
    price: "24,000",
    period: "per month",
    registration: "18,000",
    badge: "Enhanced",
    highlight: false,
    img: "/images/gallery/locker-1.webp",
    features: [
      "Everything in Gym Only",
      "Dedicated VIP locker",
      "Premium shower facilities",
      "Secure personal storage",
      "Priority locker room access",
      "Certified trainer guidance",
    ],
    cta: "Join Now",
    ctaNote: "One-time registration: PKR 18,000",
  },
  {
    id: "gym-pool",
    name: "Gym + Pool",
    price: "28,000",
    period: "per month",
    registration: "18,000",
    badge: "Most Popular",
    highlight: true,
    img: "/images/facilities/swimming-pool.webp",
    features: [
      "Full gym & fitness floor",
      "Heated indoor swimming pool",
      "Boxing ring access",
      "Steam, Sauna & Jacuzzi",
      "VIP lockers & premium showers",
      "Snooker lounge & Safa Bar",
    ],
    cta: "Join Now",
    ctaNote: "One-time registration: PKR 18,000",
  },
  {
    id: "kids",
    name: "Kids",
    price: "18,000",
    period: "per month",
    registration: "10,000",
    badge: "Ages 6–16",
    highlight: false,
    img: "/images/facilities/swimming-pool.webp",
    features: [
      "Supervised gym access",
      "Swimming pool sessions",
      "Age-appropriate training",
      "Professional coach guidance",
      "Safe and structured environment",
      "Lower one-time registration",
    ],
    cta: "Enroll Now",
    ctaNote: "One-time registration: PKR 10,000",
  },
]

const faqs = [
  {
    q: "Is there a one-time registration fee?",
    a: "Yes. All plans (except the Day Pass) require a one-time registration fee of PKR 18,000. The Kids plan has a reduced registration fee of PKR 10,000. This is a one-time payment per member.",
  },
  {
    q: "Can I pay for 3, 6, or 12 months at once?",
    a: "Yes — discounts are available when you pay for 3, 6, or 12 months upfront on all monthly plans. Contact us directly on +92-311-5156949 or +92-330-0007232 to get the current discount rates.",
  },
  {
    q: "Do you offer day passes for visitors?",
    a: "Yes. A Day Pass is available for PKR 2,500 per visit and gives you full access to the gym for that day. No booking required — just walk in with a valid ID.",
  },
  {
    q: "What facilities are shared across all memberships?",
    a: "The Snooker Lounge and Safa Bar (fresh juices, smoothies, and beverages) are accessible to all members. The Boxing Ring is also available to all gym plan members.",
  },
  {
    q: "Is the Massage & Spa included in memberships?",
    a: "Massage & Spa services are available at the club but are charged separately from memberships. Please speak to our front desk staff for session pricing.",
  },
  {
    q: "How do I sign up or upgrade my membership?",
    a: "Walk in to Safa Fitness Club at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad, and bring a valid ID. You can also call us at +92-311-5156949 to enquire or arrange a visit.",
  },
  {
    q: "Are there female-only gym hours?",
    a: "Yes — dedicated hours are available for female members. Contact us directly for the current schedule as timings may vary.",
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/facilities/pricing-banner.webp"
          alt="Safa Fitness Club Membership Plans"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Join the Club</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Membership <span className="text-[#f5a623]">Plans</span>
          </h1>
        </div>
      </section>

      {/* ── REGISTRATION FEE NOTICE ── */}
      <section className="bg-[#141414] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[#f5a623] flex-shrink-0"><InfoIcon /></span>
            <p className="text-gray-300 text-sm">
              All plans require a <span className="text-white font-semibold">one-time registration fee of PKR 18,000</span> (Kids: PKR 10,000). Monthly rates shown below.
            </p>
          </div>
          <a
            href="https://wa.me/923115156949"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap text-[#f5a623] font-bold text-sm hover:text-[#e09410] transition-colors"
          >
            <PhoneIcon /> +92-311-5156949
          </a>
        </div>
      </section>

      {/* ── PLANS GRID ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Choose Your Plan</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Membership <span className="text-[#f5a623]">Options</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
              Flexible plans to match your goals. All prices in PKR. Discounts available for 3, 6 &amp; 12-month commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                data-reveal data-delay={String((i % 3) + 1)}
                className={`relative flex flex-col rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-[#f5a623] bg-[#141414] shadow-[0_0_30px_rgba(245,166,35,0.15)]"
                    : "border-[#2a2a2a] bg-[#141414] hover:border-[#f5a623]/40"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-3 right-3 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded ${
                    plan.highlight ? "bg-[#f5a623] text-black" : "bg-[#2a2a2a] text-[#f5a623] border border-[#f5a623]/30"
                  }`}>
                    {plan.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image src={plan.img} alt={plan.name} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-white font-bold text-2xl uppercase mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-end gap-2">
                      <span className="text-[#f5a623] text-xs font-bold uppercase">PKR</span>
                      <span
                        className="text-4xl font-bold text-white leading-none"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{plan.period}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-[#f5a623]"><CheckIcon /></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div>
                    <a
                      href="https://wa.me/923115156949"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center py-3 px-6 font-bold text-sm uppercase tracking-wider rounded transition-colors ${
                        plan.highlight
                          ? "bg-[#f5a623] hover:bg-[#e09410] text-black"
                          : "bg-[#1a1a1a] hover:bg-[#222] text-white border border-[#2a2a2a] hover:border-[#f5a623]/50"
                      }`}
                    >
                      {plan.cta}
                    </a>
                    {plan.ctaNote && (
                      <p className="text-gray-600 text-xs text-center mt-2">{plan.ctaNote}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOUNT BANNER ── */}
      <section className="bg-[#0d0d0d] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Save More</p>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                3, 6 &amp; 12 Month <span className="text-[#f5a623]">Discounts</span>
              </h2>
              <p className="text-gray-400 mt-2 text-sm max-w-lg">
                Pay upfront for 3, 6, or 12 months on any monthly plan and receive a discount. Contact us to get the current rates before signing up.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
              <a
                href="https://wa.me/923115156949"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
              <a
                href="mailto:contact@safafitnessclub.com"
                className="flex items-center justify-center gap-2 px-8 py-3 border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
              >
                <MailIcon /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">The Full Experience</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Member <span className="text-[#f5a623]">Gets</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
              Regardless of your plan, you have access to world-class facilities and a team that is invested in your results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/images/trainers/kishwar-trainer.webp",
                title: "Certified Trainers",
                desc: "5 internationally certified trainers on the floor. Expert guidance, form correction, and personalized programming.",
              },
              {
                img: "/images/facilities/gym.webp",
                title: "Premium Equipment",
                desc: "State-of-the-art gym machines and free weights maintained to the highest standards for optimal performance.",
              },
              {
                img: "/images/facilities/safa-bar.webp",
                title: "Safa Bar",
                desc: "Fresh juices, smoothies, protein shakes, and beverages available at our in-house Safa Bar after every session.",
              },
              {
                img: "/images/facilities/snooker.webp",
                title: "Snooker Lounge",
                desc: "Unwind after your workout at our premium snooker lounge — exclusive to Safa Fitness Club members.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                data-reveal data-delay={String(i + 1)}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3
                      className="text-white font-bold text-lg uppercase group-hover:text-[#f5a623] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO JOIN ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Simple Process</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How to <span className="text-[#f5a623]">Join</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Walk In",
                desc: "Visit us at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad. No appointment needed — walk in any time during opening hours.",
                img: "/images/facilities/services-banner.webp",
              },
              {
                step: "02",
                title: "Choose a Plan",
                desc: "Our staff will walk you through all available membership plans and help you choose the one that fits your goals and budget.",
                img: "/images/facilities/pricing-banner.webp",
              },
              {
                step: "03",
                title: "Start Training",
                desc: "Complete your registration with a valid ID, pay the one-time fee, and start your fitness journey the same day.",
                img: "/images/facilities/gym.webp",
              },
            ].map((s, i) => (
              <div key={s.step} data-reveal data-delay={String(i + 1)} className="group relative bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Step number overlay */}
                  <span
                    className="absolute top-4 left-4 text-6xl font-bold text-white/10 select-none pointer-events-none leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.step}
                  </span>
                  {/* Step badge */}
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider rounded">
                    Step {s.step}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-white font-bold text-2xl uppercase mb-3 group-hover:text-[#f5a623] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Got Questions?</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequently Asked <span className="text-[#f5a623]">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                data-reveal data-delay={String((i % 4) + 1)}
                key={faq.q}
                className="group bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden open:border-[#f5a623]/40"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none text-white font-semibold text-sm hover:text-[#f5a623] transition-colors">
                  {faq.q}
                  <span className="text-[#f5a623] flex-shrink-0 text-lg transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 pt-1 border-t border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-4">Still have questions? We are happy to help.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/923115156949"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
              <a
                href="mailto:contact@safafitnessclub.com"
                className="flex items-center justify-center gap-2 px-8 py-3 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-sm uppercase tracking-wider rounded transition-colors"
              >
                <MailIcon /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION STRIP ── */}
      <section className="py-10 bg-[#0d0d0d] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <span className="text-[#f5a623] mt-0.5 flex-shrink-0"><LocationIcon /></span>
            <div>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad
              </p>
              <p className="text-gray-400 text-sm mt-1">Mon–Sat: 7:00 AM – 11:00 PM &nbsp;|&nbsp; Sun: 12:00 PM – 10:00 PM</p>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Safa+Fitness+Club,Safa+Gold+Mall,F-7+Markaz,Islamabad"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
          >
            Get Directions
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading="Ready to Join the Club?"
        subheading="Walk in to Safa Fitness Club today. Our team will help you find the right plan and get you started immediately."
        primaryBtn={{ label: "WhatsApp Us", href: "https://wa.me/923115156949" }}
        secondaryBtn={{ label: "Contact Us", href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
