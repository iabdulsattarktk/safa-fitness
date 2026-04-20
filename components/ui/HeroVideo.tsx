"use client"

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "56.25vw",
          minHeight: "100vh",
          minWidth: "177.78vh",
          objectFit: "cover",
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
