import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/blog"
import { NextResponse } from "next/server"

export async function POST() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const existing = await db.blogPost.count()
  if (existing > 0) return NextResponse.json({ message: "Already seeded", count: existing })

  const created = await Promise.all(
    posts.map((p, i) =>
      db.blogPost.create({
        data: {
          slug:          p.slug,
          title:         p.title,
          subtitle:      p.subtitle,
          description:   p.description,
          category:      p.category,
          categoryColor: p.categoryColor,
          date:          p.date,
          readTime:      p.readTime,
          img:           p.img,
          author:        p.author,
          sections:      p.sections as object[],
          faqs:          p.faqs as object[],
          published:     true,
          order:         i,
        },
      })
    )
  )

  return NextResponse.json({ message: "Seeded", count: created.length })
}
