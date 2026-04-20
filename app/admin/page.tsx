import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { CONTENT_DEFAULTS } from "@/lib/site-content"
import SignOutButton from "@/components/auth/SignOutButton"
import AdminTabs from "@/components/admin/AdminTabs"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel | Safa Fitness Club",
}

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect("/login")
  if (session.user.role !== "ADMIN") redirect("/dashboard")

  const members = await db.user.findMany({
    where: { role: "MEMBER" },
    include: { membership: true },
    orderBy: { createdAt: "desc" },
  })

  const totalMembers = members.length
  const activeMembers = members.filter((m) => m.membership?.status === "ACTIVE").length
  const expiredMembers = members.filter((m) => m.membership?.status === "EXPIRED").length
  const noMembership = members.filter((m) => !m.membership).length
  const basicCount = members.filter((m) => m.membership?.plan === "BASIC").length
  const championCount = members.filter((m) => m.membership?.plan === "CHAMPION").length
  const eliteCount = members.filter((m) => m.membership?.plan === "ELITE").length

  // Serialize dates — client components receive plain JSON
  const membersData = members.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    image: m.image,
    phone: m.phone,
    createdAt: m.createdAt.toISOString(),
    membership: m.membership
      ? {
          plan: m.membership.plan as string,
          status: m.membership.status as string,
          endDate: m.membership.endDate?.toISOString() ?? null,
        }
      : null,
  }))

  // Content for editor
  const contentRows = await db.siteContent.findMany()
  const overrideMap = Object.fromEntries(contentRows.map((r) => [r.key, r.value]))
  const initialContent = Object.entries(CONTENT_DEFAULTS).map(([key, meta]) => ({
    key,
    value: overrideMap[key] ?? meta.value,
    label: meta.label,
    type: meta.type,
    isDefault: !overrideMap[key],
  }))

  // Blog posts for editor
  const blogPosts = await db.blogPost.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] })
  const initialPosts = blogPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    category: p.category,
    categoryColor: p.categoryColor,
    date: p.date,
    readTime: p.readTime,
    img: p.img,
    author: p.author,
    sections: p.sections as { heading: string; paragraphs: string[] }[],
    faqs: p.faqs as { q: string; a: string }[],
    published: p.published,
    order: p.order,
  }))

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Admin"
                width={44}
                height={44}
                className="rounded-full border-2 border-[#f5a623]/40"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
                Admin <span className="text-[#f5a623]">Panel</span>
              </h1>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: "Total Members",  value: totalMembers,   color: "text-white" },
            { label: "Active",         value: activeMembers,  color: "text-green-400" },
            { label: "Expired",        value: expiredMembers, color: "text-red-400" },
            { label: "No Membership",  value: noMembership,   color: "text-gray-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-center">
              <p className={`text-3xl font-bold ${stat.color}`} style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
              <p className="text-gray-600 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Plan breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Basic",    value: basicCount,    color: "text-blue-400" },
            { label: "Champion", value: championCount, color: "text-[#f5a623]" },
            { label: "Elite",    value: eliteCount,    color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center justify-between">
              <p className="text-gray-500 text-xs">{stat.label}</p>
              <p className={`font-bold text-lg ${stat.color}`} style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <AdminTabs membersData={membersData} initialContent={initialContent} initialPosts={initialPosts} />
      </div>
    </main>
  )
}
