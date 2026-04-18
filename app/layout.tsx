import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp"
import ScrollToTop from "@/components/ui/ScrollToTop"
import BackToTop from "@/components/ui/BackToTop"
import ScrollRevealInit from "@/components/ui/ScrollRevealInit"
import Providers from "@/components/providers"
import PageDecorations from "@/components/ui/PageDecorations"

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
    description: "Premier fitness destination in Islamabad. Gym, pool, boxing, spa & expert trainers.",
    images: [
      {
        url: "https://safafitnessclub.com/images/team-banner2.webp",
        width: 1200,
        height: 630,
        alt: "Safa Fitness Club — Best Gym in Islamabad F-7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@safafitnessclub",
    creator: "@safafitnessclub",
    images: ["https://safafitnessclub.com/images/team-banner2.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "Safa Fitness Club",
  description: "Premium fitness club in Islamabad offering gym, swimming pool, boxing, sauna, steam room and expert trainers.",
  url: "https://safafitnessclub.com",
  telephone: "+923115156949",
  email: "info@safafitnessclub.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5th Floor, Safa Gold Mall, College Road",
    addressLocality: "F-7 Markaz",
    addressRegion: "Islamabad",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.7215,
    longitude: 73.0433,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "12:00",
      closes: "22:00",
    },
  ],
  priceRange: "PKR 2,500 – 28,000",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Boxing Ring", value: true },
    { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
    { "@type": "LocationFeatureSpecification", name: "Steam Room", value: true },
    { "@type": "LocationFeatureSpecification", name: "Personal Training", value: true },
  ],
  sameAs: [
    "https://www.facebook.com/safafitnessclub",
    "https://www.instagram.com/safafitnessclub",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf7f2] text-[#1a1505] antialiased">
        <Providers>
          <PageDecorations />
          <ScrollRevealInit />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}
