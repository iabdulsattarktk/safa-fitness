import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, getPost } from "@/lib/blog"
import CTABanner from "@/components/layout/CTABanner"
import type { Metadata } from "next"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Safa Fitness Club Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.img }],
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  // Related posts: up to 3 other posts (exclude current)
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src={post.img}
          alt={post.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <span
            className={`inline-block px-3 py-1 ${post.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded mb-3`}
          >
            {post.category}
          </span>
          <h1
            className="text-3xl sm:text-5xl font-bold uppercase text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="bg-[#0a0a0a] section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link + meta */}
          <div data-reveal className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#2a2a2a]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#f5a623] text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Articles
            </Link>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg leading-relaxed mb-10">{post.subtitle}</p>

          {/* Sections */}
          <div className="space-y-8">
            {post.sections.map((section, i) => (
              <div key={i} data-reveal data-delay="1">
                {section.heading && (
                  <h2
                    className="text-white font-bold text-xl sm:text-2xl uppercase mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.paragraphs.map((para, j) => (
                    <p key={j} className="text-gray-400 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── FAQ ── */}
          {post.faqs.length > 0 && (
            <div className="mt-14">
              <h2
                className="text-white font-bold text-2xl uppercase mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently Asked <span className="text-[#f5a623]">Questions</span>
              </h2>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none">
                      <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                      <svg
                        className="w-4 h-4 text-[#f5a623] shrink-0 transition-transform group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* ── JOIN CTA ── */}
          <div data-reveal className="mt-14 bg-[#141414] border border-[#f5a623]/30 rounded-lg p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p
                className="text-white font-bold text-xl sm:text-2xl uppercase mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to put this into practice?
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Train with certified coaches at Safa Fitness Club — Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad. State-of-the-art gym, heated pool, boxing ring, steam room, and more.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/pricing"
                className="px-6 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors text-center"
              >
                View Memberships
              </Link>
              <a
                href="https://wa.me/923115156949"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-sm uppercase tracking-wider rounded transition-colors text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      <section className="bg-[#0a0a0a] pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-6">More Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                data-reveal data-delay={String(i + 1)}
                className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2 py-1 ${p.categoryColor} text-white text-xs font-bold uppercase tracking-wider rounded`}
                  >
                    {p.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3
                    className="text-white font-bold text-sm uppercase mb-auto group-hover:text-[#f5a623] transition-colors leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.title}
                  </h3>
                  <span className="flex items-center gap-1.5 text-[#f5a623] text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all mt-3">
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
