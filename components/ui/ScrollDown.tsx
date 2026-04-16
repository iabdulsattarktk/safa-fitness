"use client"

export default function ScrollDown({ targetId }: { targetId: string }) {
  return (
    <button
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer group"
      aria-label="Scroll down"
    >
      <span className="text-gray-500 group-hover:text-gray-300 text-xs uppercase tracking-widest transition-colors">Scroll</span>
      <svg className="w-4 h-4 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}
