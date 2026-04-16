import Link from "next/link"
import Image from "next/image"
import SocialLinks from "@/components/ui/SocialLinks"

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
            <SocialLinks />
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
                <svg className="w-4 h-4 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Safa Gold Mall, 5th Floor, College Road, F-7 Markaz, Islamabad
                </span>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div className="flex flex-col gap-1">
                  <a href="tel:+923115156949" className="text-gray-400 hover:text-[#f5a623] text-sm transition-colors">+92-311-5156949</a>
                  <a href="tel:+923300007232" className="text-gray-400 hover:text-[#f5a623] text-sm transition-colors">+92-330-0007232</a>
                </div>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-[#f5a623] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
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
                Walk-ins welcome. Bring a valid ID for first-time registration.
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
