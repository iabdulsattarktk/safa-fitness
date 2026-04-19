interface Props {
  src: string
  quote: string
  sub?: string
  /** dark overlay strength — default "rgba(0,0,0,0.60)" */
  overlay?: string
}

/**
 * Full-width cinematic break between page sections.
 * Uses CSS background-attachment:fixed for the parallax effect on desktop.
 * On iOS Safari the image scrolls normally (graceful degradation).
 */
export default function ParallaxBreak({
  src,
  quote,
  sub,
  overlay = "rgba(0,0,0,0.38)",
}: Props) {
  return (
    <div
      className="relative h-56 sm:h-72 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#111",
        backgroundImage: `url(${src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: overlay }} />

      {/* Quote */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p
          className="text-[#f5a623] text-5xl sm:text-6xl leading-none mb-3 select-none"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          "
        </p>
        <p
          className="text-white text-2xl sm:text-4xl font-bold uppercase leading-tight tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {quote}
        </p>
        {sub && (
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mt-4">
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}
