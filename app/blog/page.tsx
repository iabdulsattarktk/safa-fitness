import Image from "next/image"
import Link from "next/link"
import CTABanner from "@/components/layout/CTABanner"
import { posts } from "@/lib/blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Safa Fitness Club – Fitness Tips & Guides",
  description:
    "Expert fitness articles from Safa Fitness Club Islamabad — gym guides, nutrition science, boxing tips, swimming benefits, BMI, calorie needs, and more.",
}

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/team-banner2.webp"
          alt="Safa Fitness Club Blog"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">Expert Guides</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fitness <span className="text-[#f5a623]">Blog</span>
          </h1>
        </div>
      </section>

      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── FEATURED POST ── */}
          <div className="mb-14">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-6">Featured Article</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300"
            >
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141414]" />
                <span className={`absolute top-4 left-4 px-3 py-1 ${featured.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded`}>
                  {featured.category}
                </span>
              </div>
              <div className="p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2
                  className="text-white font-bold text-2xl sm:text-3xl uppercase mb-3 group-hover:text-[#f5a623] transition-colors leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featured.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{featured.subtitle}</p>
                <span className="flex items-center gap-2 text-[#f5a623] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          {/* ── REST OF POSTS ── */}
          <div className="mb-6">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-8">All Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                    <span className={`absolute top-3 left-3 px-2 py-1 ${post.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3
                      className="text-white font-bold text-lg uppercase mb-2 group-hover:text-[#f5a623] transition-colors leading-tight flex-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{post.subtitle}</p>
                    <span className="flex items-center gap-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all mt-auto">
                      Read More
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Train Smarter, Not Just Harder"
        subheading="Apply what you have learned with Safa Fitness Club's certified trainers in Islamabad."
        primaryBtn={{ label: "View Memberships", href: "/pricing" }}
        secondaryBtn={{ label: "Meet the Trainers", href: "/trainers" }}
        variant="orange"
      />
    </>
  )
}
