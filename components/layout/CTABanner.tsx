import Link from "next/link"

interface CTABannerProps {
  heading?: string
  subheading?: string
  primaryBtn?: { label: string; href: string }
  secondaryBtn?: { label: string; href: string }
  variant?: "orange" | "dark"
}

function isExternal(href: string) {
  return href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")
}

export default function CTABanner({
  heading = "Ready to Transform?",
  subheading = "Join Islamabad's most complete fitness club. Your journey starts today.",
  primaryBtn = { label: "View Memberships", href: "/pricing" },
  secondaryBtn = { label: "Contact Us", href: "/contact" },
  variant = "orange",
}: CTABannerProps) {
  const isOrange = variant === "orange"

  const primaryClass = `w-full sm:w-auto px-8 py-3 text-sm font-bold uppercase tracking-wider rounded transition-colors duration-200 ${
    isOrange ? "bg-black text-white hover:bg-[#1a1a1a]" : "bg-[#f5a623] text-black hover:bg-[#e09410]"
  }`
  const secondaryClass = `w-full sm:w-auto px-8 py-3 text-sm font-bold uppercase tracking-wider rounded border-2 transition-colors duration-200 ${
    isOrange
      ? "border-black text-black hover:bg-black hover:text-white"
      : "border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black"
  }`

  return (
    <section
      className={`py-16 px-4 ${
        isOrange ? "bg-[#f5a623]" : "bg-[#141414] border-y border-[#2a2a2a]"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4 ${
            isOrange ? "text-black" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {heading}
        </h2>
        <p className={`text-base sm:text-lg mb-8 ${isOrange ? "text-black/80" : "text-gray-400"}`}>
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isExternal(primaryBtn.href) ? (
            <a href={primaryBtn.href} className={primaryClass}>{primaryBtn.label}</a>
          ) : (
            <Link href={primaryBtn.href} className={primaryClass}>{primaryBtn.label}</Link>
          )}
          {isExternal(secondaryBtn.href) ? (
            <a href={secondaryBtn.href} className={secondaryClass}>{secondaryBtn.label}</a>
          ) : (
            <Link href={secondaryBtn.href} className={secondaryClass}>{secondaryBtn.label}</Link>
          )}
        </div>
      </div>
    </section>
  )
}
