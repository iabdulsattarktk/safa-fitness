import Image from "next/image"
import CTABanner from "@/components/layout/CTABanner"
import ContactForm from "./ContactForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Safa Fitness Club – Islamabad",
  description:
    "Get in touch with Safa Fitness Club. Visit us at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad. Call, WhatsApp, or email us for membership enquiries.",
}

const contactItems = [
  {
    label: "Address",
    value: "Safa Gold Mall, 5th Floor, College Road, F-7 Markaz, Islamabad",
    href: "https://maps.google.com/?q=Safa+Fitness+Club,Safa+Gold+Mall,F-7+Markaz,Islamabad",
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp / Call",
    value: "+92-311-5156949",
    href: "https://wa.me/923115156949",
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+92-330-0007232",
    href: "tel:+923300007232",
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "contact@safafitnessclub.com",
    href: "mailto:contact@safafitnessclub.com",
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const hours = [
  { day: "Monday", time: "7:00 AM – 11:00 PM" },
  { day: "Tuesday", time: "7:00 AM – 11:00 PM" },
  { day: "Wednesday", time: "7:00 AM – 11:00 PM" },
  { day: "Thursday", time: "7:00 AM – 11:00 PM" },
  { day: "Friday", time: "7:00 AM – 11:00 PM" },
  { day: "Saturday", time: "7:00 AM – 11:00 PM" },
  { day: "Sunday", time: "12:00 PM – 10:00 PM" },
]

export default function ContactPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/facilities/contact-banner.webp"
          alt="Contact Safa Fitness Club"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">We Are Here for You</p>
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact <span className="text-[#f5a623]">Us</span>
          </h1>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── LEFT: Form ── */}
            <div data-reveal>
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Send a Message</p>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get in <span className="text-[#f5a623]">Touch</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Fill in the form below and your message will be sent directly to us on WhatsApp. We typically reply within a few hours.
              </p>
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>

            {/* ── RIGHT: Info ── */}
            <div data-reveal data-delay="2" className="flex flex-col gap-6">
              {/* Contact details */}
              <div>
                <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-3">Find Us</p>
                <h2
                  className="text-3xl sm:text-4xl font-bold uppercase text-white mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Contact <span className="text-[#f5a623]">Info</span>
                </h2>
                <div className="space-y-4">
                  {contactItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-start gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-lg hover:border-[#f5a623]/50 transition-colors group"
                    >
                      <span className="text-[#f5a623] mt-0.5 flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-white text-sm font-medium group-hover:text-[#f5a623] transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden">
                <div className="px-5 py-4 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    Opening Hours
                  </h3>
                </div>
                <div className="divide-y divide-[#2a2a2a]">
                  {hours.map((row) => (
                    <div key={row.day} className="flex justify-between items-center px-5 py-3">
                      <span className="text-gray-400 text-sm">{row.day}</span>
                      <span className="text-[#f5a623] font-bold text-sm">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div data-reveal className="text-center mb-8">
            <p className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.3em] mb-2">5th Floor, Safa Gold Mall</p>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              F-7 Markaz, <span className="text-[#f5a623]">Islamabad</span>
            </h2>
          </div>

          {/* Map embed */}
          <div className="relative rounded-lg overflow-hidden border border-[#2a2a2a]" style={{ height: "420px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.0!2d73.0479!3d33.7295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbef7b6f76b4f%3A0x4b7f2e6d44d45d4a!2sSafa%20Gold%20Mall%2C%20F-7%20Markaz%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Safa Fitness Club Location"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="https://maps.google.com/?q=Safa+Fitness+Club,Safa+Gold+Mall,F-7+Markaz,Islamabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
            <a
              href="https://wa.me/923115156949"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 border border-[#2a2a2a] hover:border-[#25D366] text-gray-300 hover:text-[#25D366] font-bold text-sm uppercase tracking-wider rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── VISIT STRIP ── */}
      <section className="bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                img: "/images/facilities/gym.webp",
                title: "Walk-ins Welcome",
                desc: "No appointment needed. Visit us any time during opening hours and our team will be happy to show you around.",
              },
              {
                img: "/images/facilities/services-banner.webp",
                title: "Bring Valid ID",
                desc: "First-time visitors need a valid CNIC or ID card for registration. The process takes just a few minutes.",
              },
              {
                img: "/images/trainers/kishwar-trainer.webp",
                title: "Free Tour",
                desc: "Ask for a free facility tour on your first visit. Our team will walk you through everything and match you with the right plan.",
              },
            ].map((item, i) => (
              <div key={item.title} data-reveal data-delay={String(i + 1)} className="group bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/50 rounded-lg overflow-hidden transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <h3
                      className="text-white font-bold text-base uppercase group-hover:text-[#f5a623] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        heading="Ready to Join?"
        subheading="Walk in to Safa Fitness Club today at Safa Gold Mall, 5th Floor, F-7 Markaz, Islamabad."
        primaryBtn={{ label: "WhatsApp Us", href: "https://wa.me/923115156949" }}
        secondaryBtn={{ label: "View Memberships", href: "/pricing" }}
        variant="orange"
      />
    </>
  )
}
