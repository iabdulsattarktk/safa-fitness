"use client"

import { useState } from "react"
import AdminMembersTable from "./AdminMembersTable"
import PageEditor from "./PageEditor"
import MediaLibrary from "./MediaLibrary"
import BlogEditor from "./BlogEditor"

type Member = {
  id: string
  name: string | null
  email: string
  image: string | null
  phone: string | null
  createdAt: string
  membership: { plan: string; status: string; endDate: string | null } | null
}

type ContentItem = {
  key: string
  value: string
  label: string
  type: string
  isDefault: boolean
}

type Section = { heading: string; paragraphs: string[] }
type FAQ = { q: string; a: string }

type Post = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  img: string
  author: string
  sections: Section[]
  faqs: FAQ[]
  published: boolean
  order: number
}

const TABS = [
  { id: "members", label: "Members",      icon: "👥" },
  { id: "media",   label: "Media Library", icon: "🖼️" },
  { id: "pages",   label: "Page Editor",  icon: "✏️" },
  { id: "blog",    label: "Blog",         icon: "📝" },
]

export default function AdminTabs({
  membersData,
  initialContent,
  initialPosts,
}: {
  membersData: Member[]
  initialContent: ContentItem[]
  initialPosts: Post[]
}) {
  const [tab, setTab] = useState("members")

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 mb-5 bg-[#141414] border border-[#2a2a2a] rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-[#f5a623] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "members" && <AdminMembersTable members={membersData} />}
      {tab === "media"   && <MediaLibrary />}
      {tab === "pages"   && <PageEditor initialContent={initialContent} />}
      {tab === "blog"    && <BlogEditor initialPosts={initialPosts} />}
    </div>
  )
}
