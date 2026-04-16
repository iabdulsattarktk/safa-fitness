import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import SocialLinks from "@/components/ui/SocialLinks"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Safa Fitness Club – Islamabad",
  description:
    "Explore Safa Fitness Club's world-class facilities — gym floor, swimming pool, boxing ring, massage & spa, sauna, and more. Located at Safa Gold Mall, F-7 Markaz, Islamabad.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

// Bento grid items — mix of sizes for visual interest
const grid = [
  { img: "/images/gallery/gym-floor.webp",    alt: "Gym Floor",          label: "Gym & Fitness",       span: "col-span-2 row-span-2" },
  { img: "/images/gallery/swimming-pool.webp", alt: "Swimming Pool",      label: "Swimming Pool",       span: "col-span-1 row-span-1" },
  { img: "/images/gallery/boxing.webp",        alt: "Boxing Ring",        label: "Boxing Ring",         span: "col-span-1 row-span-1" },
  { img: "/images/gallery/sauna.webp",         alt: "Steam & Sauna",      label: "Steam & Sauna",       span: "col-span-1 row-span-1" },
  { img: "/images/gallery/massage.webp",       alt: "Massage & Spa",      label: "Massage & Spa",       span: "col-span-1 row-span-1" },
  { img: "/images/gallery/team-1.webp",        alt: "Safa Elite Team",    label: "Our Team",            span: "col-span-2 row-span-1" },
  { img: "/images/gallery/safa-bar.webp",      alt: "Safa Bar",           label: "Safa Bar",            span: "col-span-1 row-span-1" },
  { img: "/images/gallery/gym-strength.webp",  alt: "Strength Training",  label: "Strength Training",   span: "col-span-1 row-span-1" },
  { img: "/images/gallery/running.webp",       alt: "Run With Us",        label: "Run With Us",         span: "col-span-1 row-span-1" },
  { img: "/images/gallery/kishwar-pose.webp",  alt: "Expert Trainer",     label: "Expert Trainers",     span: "col-span-1 row-span-1" },
  { img: "/images/gallery/snooker.webp",       alt: "Snooker Lounge",     label: "Snooker Lounge",      span: "col-span-1 row-span-1" },
  { img: "/images/gallery/services.webp",      alt: "Our Services",       label: "Our Services",        span: "col-span-2 row-span-1" },
]

// Simple uniform grid for the second section
const morePhotos = [
  { img: "/images/gallery/gym-2.webp",         alt: "Gym Interior" },
  { img: "/images/gallery/gym-amenity.webp",   alt: "Gym Equipment" },
  { img: "/images/gallery/team-2.webp",        alt: "Team at Safa" },
  { img: "/images/facilities/lockers.webp",    alt: "VIP Lockers" },
  { img: "/images/facilities/salon.webp",      alt: "Beauty Salon" },
  { img: "/images/trainers/kishwar-ali.webp",  alt: "Kishwar Ali" },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/gallery/gym-floor.webp"
          alt="Safa Fitness Club Gallery"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Our Sanctuary</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The <span className="text-[#f5a623]">Gallery</span>
          </h1>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Explore the Club</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Inside <span className="text-[#f5a623]">Safa Fitness</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">
              Premium facilities across 9 zones — all maintained to the highest standards of cleanliness and performance.
            </p>
          </div>

          {/* Bento grid — 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
            {grid.map((item) => (
              <div
                key={item.img}
                className={`group relative overflow-hidden rounded-lg ${item.span}`}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span
                    className="text-white font-bold text-sm uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MORE PHOTOS ── */}
      <section className="section-padding bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">More From the Club</p>
            <h2
              className="text-4xl sm:text-5xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A Closer <span className="text-[#f5a623]">Look</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {morePhotos.map((p) => (
              <div key={p.img} className="group relative h-56 sm:h-64 overflow-hidden rounded-lg">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOLLOW ON SOCIAL ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">Stay Connected</p>
          <h2
            className="text-4xl sm:text-5xl font-bold uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Follow <span className="text-[#f5a623]">@safafitnessclubofficial</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            See the latest from our gym floor, events, member transformations, and team moments. Follow us on social media for daily updates.
          </p>
          <div className="flex justify-center mb-8">
            <SocialLinks />
          </div>
          <a
            href="https://www.instagram.com/safafitnessclubofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading="Come See It in Person"
        subheading="Walk-ins welcome at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad. Bring a valid ID."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Contact Us", href: "/contact" }}
        variant="orange"
      />
    </>
  )
}
