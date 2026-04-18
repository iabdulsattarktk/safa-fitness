import Image from "next/image"
import CTABanner from "@/components/layout/CTABanner"
import SocialLinks from "@/components/ui/SocialLinks"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Safa Fitness Club – Islamabad",
  description:
    "Explore Safa Fitness Club's world-class facilities — gym, swimming pool, boxing ring, massage & spa, sauna, snooker lounge, salon, lockers, and Safa Bar.",
}

// ─── Category data ────────────────────────────────────────────────────────────

const categories = [
  {
    id: "gym",
    label: "Gym & Fitness",
    images: [
      { src: "/images/gallery/gym-floor.webp",    alt: "Gym Floor" },
      { src: "/images/gallery/gym-strength.webp", alt: "Strength Training" },
      { src: "/images/gallery/gym-amenity.webp",  alt: "Gym Equipment" },
      { src: "/images/gallery/gym-2.webp",        alt: "Gym Interior" },
      { src: "/images/gallery/running.webp",      alt: "Run With Us" },
      { src: "/images/gallery/kishwar-pose.webp", alt: "Trainer – Kishwar Ali" },
    ],
  },
  {
    id: "pool",
    label: "Swimming Pool",
    images: [
      { src: "/images/gallery/pool-1.webp", alt: "Swimming Pool Banner" },
      { src: "/images/gallery/pool-2.webp", alt: "Pool Amenity" },
      { src: "/images/gallery/pool-3.webp", alt: "Swimming Pool" },
      { src: "/images/gallery/pool-4.webp", alt: "Swimming Pool" },
    ],
  },
  {
    id: "boxing",
    label: "Boxing Ring",
    images: [
      { src: "/images/gallery/boxing-1.webp", alt: "Boxing Ring" },
      { src: "/images/gallery/boxing.webp",   alt: "Boxing Training" },
    ],
  },
  {
    id: "sauna",
    label: "Steam, Sauna & Jacuzzi",
    images: [
      { src: "/images/gallery/sauna-1.webp", alt: "Sauna" },
      { src: "/images/gallery/sauna-2.webp", alt: "Sauna Amenity" },
      { src: "/images/gallery/sauna-3.webp", alt: "Steam Sauna Jacuzzi" },
    ],
  },
  {
    id: "spa",
    label: "Massage & Spa",
    images: [
      { src: "/images/gallery/spa-1.webp",  alt: "Massage & Spa" },
      { src: "/images/gallery/spa-2.webp",  alt: "Massage Amenity" },
    ],
  },
  {
    id: "snooker",
    label: "Snooker Lounge",
    images: [
      { src: "/images/gallery/snooker-1.webp", alt: "Snooker Lounge" },
      { src: "/images/gallery/snooker-2.webp", alt: "Snooker Amenity" },
      { src: "/images/gallery/snooker-3.webp", alt: "Snooker Lounge Banner" },
    ],
  },
  {
    id: "salon",
    label: "Beauty Salon – Men",
    images: [
      { src: "/images/gallery/salon-1.webp",        alt: "Men's Beauty Salon" },
      { src: "/images/facilities/salon.webp",        alt: "Salon Interior" },
    ],
  },
  {
    id: "lockers",
    label: "VIP Lockers & Shower",
    images: [
      { src: "/images/gallery/locker-1.webp", alt: "VIP Lockers & Showers" },
      { src: "/images/gallery/locker-2.webp", alt: "Lockers Banner" },
      { src: "/images/gallery/locker-3.webp", alt: "VIP Lockers" },
    ],
  },
  {
    id: "bar",
    label: "Safa Bar",
    images: [
      { src: "/images/gallery/bar-1.webp", alt: "Safa Bar" },
      { src: "/images/gallery/bar-2.webp", alt: "Safa Bar Amenity" },
      { src: "/images/gallery/bar-3.webp", alt: "Safa Bar Banner" },
    ],
  },
  {
    id: "team",
    label: "Our Team",
    images: [
      { src: "/images/gallery/team-1.webp",          alt: "Safa Elite Team" },
      { src: "/images/gallery/team-2.webp",          alt: "Meet Our Team" },
      { src: "/images/trainers/kishwar-ali.webp",    alt: "Kishwar Ali" },
      { src: "/images/trainers/trainer-1.webp",      alt: "Trainer" },
      { src: "/images/trainers/trainer-2.webp",      alt: "Trainer" },
      { src: "/images/trainers/kishwar-trainer.webp", alt: "Trainer in Action" },
    ],
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/gallery/gym-floor.webp"
          alt="Safa Fitness Club"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
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

      {/* ── CATEGORY SECTIONS ── */}
      {categories.map((cat, catIndex) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`section-padding ${catIndex % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#0d0d0d]"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div data-reveal className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-[#2a2a2a]" />
              <h2
                className="text-2xl sm:text-3xl font-bold uppercase text-white whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[#f5a623]">#</span> {cat.label}
              </h2>
              <div className="h-px flex-1 bg-[#2a2a2a]" />
            </div>

            {/* Photo grid */}
            <div className={`grid gap-3 ${
              cat.images.length === 1 ? "grid-cols-1 max-w-lg mx-auto" :
              cat.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
              cat.images.length <= 4  ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4" :
                                        "grid-cols-2 sm:grid-cols-3"
            }`}>
              {cat.images.map((img, i) => (
                <div
                  key={img.src}
                  data-reveal data-delay={String((i % 4) + 1)}
                  className={`group relative overflow-hidden rounded-lg ${
                    cat.images.length >= 5 && i === 0 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── FOLLOW ON SOCIAL ── */}
      <section className="section-padding bg-[#0a0a0a] border-t border-[#2a2a2a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-4">Stay Connected</p>
          <h2
            className="text-3xl sm:text-4xl font-bold uppercase text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We Are <span className="text-[#f5a623]">Everywhere</span>
          </h2>
          <p className="text-gray-400 text-sm mb-2 leading-relaxed">
            Follow Safa Fitness Club across all platforms for daily workout content, member transformation stories, facility tours, trainer tips, and exclusive offers — wherever you spend your time online.
          </p>
          <p className="text-gray-500 text-xs mb-6">
            Instagram &bull; Facebook &bull; YouTube &bull; X &bull; Pinterest &bull; LinkedIn
          </p>
          <div className="flex justify-center mb-7">
            <SocialLinks layout="row" />
          </div>
          <p className="text-gray-500 text-xs">
            Handle: <span className="text-[#f5a623] font-semibold">@safafitnessclubofficial</span> on Instagram &amp; Facebook
          </p>
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
