import type { MetadataRoute } from "next"
import { posts } from "@/lib/blog"

const BASE_URL = "https://safafitnessclub.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL,              priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: `${BASE_URL}/about`,   priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/classes`, priority: 0.8,  changeFrequency: "weekly"  as const },
    { url: `${BASE_URL}/trainers`,priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/gallery`, priority: 0.7,  changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/pricing`, priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: `${BASE_URL}/tools`,   priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/blog`,    priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: `${BASE_URL}/contact`, priority: 0.7,  changeFrequency: "yearly"  as const },
    { url: `${BASE_URL}/tools/bmi`,          priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/tools/calories`,     priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/tools/body-fat`,     priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/tools/macros`,       priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/tools/one-rep-max`,  priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/tools/ideal-weight`, priority: 0.7, changeFrequency: "yearly" as const },
  ]

  const blogPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
    lastModified: new Date(post.date),
  }))

  return [...staticPages, ...blogPages]
}
