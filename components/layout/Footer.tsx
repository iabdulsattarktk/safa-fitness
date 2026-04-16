import Link from "next/link"
import Image from "next/image"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/classes", label: "Classes" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Membership & Pricing" },
  { href: "/tools", label: "Free Fitness Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
]

const services = [
  { href: "/about#gym", label: "Gym & Fitness" },
  { href: "/about#pool", label: "Swimming Pool" },
  { href: "/about#boxing", label: "Boxing Ring" },
  { href: "/about#spa", label: "Massage & Spa" },
  { href: "/about#sauna", label: "Steam, Sauna & Jacuzzi" },
  { href: "/about#salon", label: "Beauty Salon – Men" },
  { href: "/about#lockers", label: "VIP Lockers & Shower" },
  { href: "/about#snooker", label: "Snooker Lounge" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/logo.webp"
                alt="Safa Fitness Club"
                width={160}
                height={46}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Where Wellness meets Elegance in the Heart of Islamabad. Transforming lives for 8+ years.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/safafitnessclubofficial/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded bg-[#1a1a1a] text-gray-400 hover:text-[#f5a623] hover:bg-[#2a2a2a] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/safafitnessclubofficial/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded bg-[#1a1a1a] text-gray-400 hover:text-[#f5a623] hover:bg-[#2a2a2a] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://x.com/safafitnessclub" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded bg-[#1a1a1a] text-gray-400 hover:text-[#f5a623] hover:bg-[#2a2a2a] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCPwHxr3QGFufw9RAicmZW8Q" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded bg-[#1a1a1a] text-gray-400 hover:text-[#f5a623] hover:bg-[#2a2a2a] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-display)" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 hover:text-[#f5a623] text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="text-[#f5a623] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-display)" }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-[#f5a623] mt-0.5 flex-shrink-0">📍</span>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Safa Gold Mall, 5th Floor, College Road, F-7 Markaz, Islamabad
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f5a623] flex-shrink-0">📞</span>
                <div className="flex flex-col gap-1">
                  <a href="tel:+923115156949" className="text-gray-400 hover:text-[#f5a623] text-sm transition-colors">+92-311-5156949</a>
                  <a href="tel:+923300007232" className="text-gray-400 hover:text-[#f5a623] text-sm transition-colors">+92-330-0007232</a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#f5a623] flex-shrink-0">✉️</span>
                <a href="mailto:contact@safafitnessclub.com"
                  className="text-gray-400 hover:text-[#f5a623] text-sm transition-colors break-all">
                  contact@safafitnessclub.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Hours */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-display)" }}>
              Opening Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between gap-4">
                <span className="text-gray-400 text-sm">Monday – Saturday</span>
                <span className="text-[#f5a623] text-sm font-medium whitespace-nowrap">7AM – 11PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-gray-400 text-sm">Sunday</span>
                <span className="text-[#f5a623] text-sm font-medium whitespace-nowrap">12PM – 10PM</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <p className="text-gray-400 text-xs leading-relaxed">
                📍 Walk-ins welcome. Bring a valid ID for first-time registration.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Safa+Fitness+Club,Safa+Gold+Mall,F-7+Markaz,Islamabad"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center py-2.5 border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black text-sm font-bold rounded transition-colors duration-200"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Safa Fitness Club. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
