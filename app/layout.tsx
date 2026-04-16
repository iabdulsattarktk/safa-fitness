import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp"
import ScrollToTop from "@/components/ui/ScrollToTop"

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Safa Fitness Club — Best Gym in Islamabad F-7",
    template: "%s | Safa Fitness Club",
  },
  description:
    "Safa Fitness Club — Islamabad's premier fitness destination at F-7 Markaz. State-of-the-art gym, heated swimming pool, boxing, spa, sauna & expert trainers. Join now!",
  keywords: [
    "gym islamabad",
    "fitness club islamabad",
    "safa fitness",
    "gym f-7 islamabad",
    "swimming pool islamabad",
    "boxing gym islamabad",
    "personal trainer islamabad",
  ],
  authors: [{ name: "Safa Fitness Club" }],
  creator: "Safa Fitness Club",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safafitnessclub.com",
    siteName: "Safa Fitness Club",
    title: "Safa Fitness Club — Best Gym in Islamabad F-7",
    description:
      "Premier fitness destination in Islamabad. Gym, pool, boxing, spa & expert trainers.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@safafitnessclub",
    creator: "@safafitnessclub",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white antialiased">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
