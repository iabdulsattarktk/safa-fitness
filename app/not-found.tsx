import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Safa Fitness Club",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.4em] mb-4">Error 404</p>
        <h1
          className="text-8xl sm:text-[10rem] font-bold text-white leading-none mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <p className="text-gray-400 text-lg mb-2">Page not found</p>
        <p className="text-gray-600 text-sm mb-10">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-[#2a2a2a] hover:border-[#f5a623] text-gray-300 hover:text-[#f5a623] font-bold text-sm uppercase tracking-wider rounded transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
