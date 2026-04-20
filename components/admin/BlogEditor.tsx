"use client"

import { useState, useRef, useEffect } from "react"

type Section  = { heading: string; paragraphs: string[] }
type FAQ      = { q: string; a: string }

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

const COLOR_OPTIONS = [
  { label: "Orange",  value: "bg-orange-500" },
  { label: "Red",     value: "bg-red-600" },
  { label: "Blue",    value: "bg-blue-500" },
  { label: "Green",   value: "bg-green-600" },
  { label: "Purple",  value: "bg-purple-600" },
  { label: "Yellow",  value: "bg-yellow-500" },
]

const EMPTY_POST: Omit<Post, "id"> = {
  slug: "", title: "", subtitle: "", description: "",
  category: "Fitness", categoryColor: "bg-orange-500",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read", img: "", author: "Safa Fitness Club",
  sections: [{ heading: "", paragraphs: [""] }],
  faqs: [],
  published: true, order: 0,
}

export default function BlogEditor({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts]           = useState<Post[]>(initialPosts)
  const [editing, setEditing]       = useState<Post | null>(null)
  const [isNew, setIsNew]           = useState(false)
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState<string | null>(null)
  const [seeding, setSeeding]       = useState(false)
  const [seedMsg, setSeedMsg]       = useState("")
  const [uploading, setUploading]   = useState(false)
  const fileRef                     = useRef<HTMLInputElement>(null)

  // ── Seed from static data ────────────────────────────────────────────────
  const seedPosts = async () => {
    setSeeding(true)
    const res = await fetch("/api/admin/blog/seed", { method: "POST" })
    const data = await res.json()
    setSeedMsg(data.message)
    if (data.count && data.message !== "Already seeded") {
      const refreshed = await fetch("/api/admin/blog")
      const fresh = await refreshed.json()
      setPosts(fresh)
    }
    setSeeding(false)
  }

  // ── Image upload ─────────────────────────────────────────────────────────
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    setUploading(true)
    const fd = new FormData(); fd.append("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
    const data = await res.json()
    if (res.ok) setEditing({ ...editing, img: data.url })
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ""
  }

  // ── Save post ────────────────────────────────────────────────────────────
  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      if (isNew) {
        const { id, ...body } = editing
        void id
        const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        const created = await res.json()
        setPosts((p) => [created, ...p])
      } else {
        const { id, ...body } = editing
        const res = await fetch(`/api/admin/blog/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        const updated = await res.json()
        setPosts((p) => p.map((x) => x.id === updated.id ? updated : x))
      }
      setEditing(null)
    } finally { setSaving(false) }
  }

  // ── Delete post ──────────────────────────────────────────────────────────
  const deletePost = async (id: string) => {
    setDeleting(id)
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
    setPosts((p) => p.filter((x) => x.id !== id))
    setDeleting(null)
    if (editing?.id === id) setEditing(null)
  }

  // ── Toggle published ─────────────────────────────────────────────────────
  const togglePublished = async (post: Post) => {
    const updated = { ...post, published: !post.published }
    await fetch(`/api/admin/blog/${post.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: updated.published }) })
    setPosts((p) => p.map((x) => x.id === post.id ? updated : x))
  }

  // ── Section helpers ──────────────────────────────────────────────────────
  const updateSection = (i: number, field: "heading" | "content", value: string) => {
    if (!editing) return
    const sections = editing.sections.map((s, idx) =>
      idx === i ? { ...s, ...(field === "heading" ? { heading: value } : { paragraphs: value.split("\n\n").filter(Boolean) || [""] }) } : s
    )
    setEditing({ ...editing, sections })
  }

  const addSection    = () => editing && setEditing({ ...editing, sections: [...editing.sections, { heading: "", paragraphs: [""] }] })
  const removeSection = (i: number) => editing && setEditing({ ...editing, sections: editing.sections.filter((_, idx) => idx !== i) })

  // ── FAQ helpers ──────────────────────────────────────────────────────────
  const updateFaq    = (i: number, field: "q" | "a", value: string) => {
    if (!editing) return
    setEditing({ ...editing, faqs: editing.faqs.map((f, idx) => idx === i ? { ...f, [field]: value } : f) })
  }
  const addFaq    = () => editing && setEditing({ ...editing, faqs: [...editing.faqs, { q: "", a: "" }] })
  const removeFaq = (i: number) => editing && setEditing({ ...editing, faqs: editing.faqs.filter((_, idx) => idx !== i) })

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">

      {/* ── Seed banner (only when no posts) ── */}
      {posts.length === 0 && (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-4">No blog posts yet. Import the existing articles from the static library?</p>
          <button
            onClick={seedPosts}
            disabled={seeding}
            className="px-6 py-2 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-sm uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
          >
            {seeding ? "Importing…" : "Import Existing Posts"}
          </button>
          {seedMsg && <p className="text-green-400 text-xs mt-3">{seedMsg}</p>}
        </div>
      )}

      {/* ── Post list + New button ── */}
      {!editing && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
            <div className="flex gap-2">
              {posts.length > 0 && (
                <button
                  onClick={seedPosts}
                  disabled={seeding}
                  className="px-3 py-1.5 text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {seeding ? "…" : "Re-seed"}
                </button>
              )}
              <button
                onClick={() => { setIsNew(true); setEditing({ id: "", ...EMPTY_POST, order: posts.length }) }}
                className="px-4 py-1.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                + New Post
              </button>
            </div>
          </div>

          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#f5a623]/30 transition-colors">
              {/* Thumbnail */}
              {post.img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.img} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-[#2a2a2a]" />
              )}
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{post.title || <span className="text-gray-600">Untitled</span>}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`px-1.5 py-0.5 ${post.categoryColor} text-white text-[10px] font-bold uppercase rounded`}>{post.category}</span>
                  <span className="text-gray-600 text-xs">{post.date}</span>
                  <span className="text-gray-600 text-xs">·</span>
                  <span className="text-gray-600 text-xs">{post.readTime}</span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublished(post)}
                  className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-colors ${
                    post.published ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-[#2a2a2a] text-gray-500 border border-[#333]"
                  }`}
                >
                  {post.published ? "Live" : "Draft"}
                </button>
                <button
                  onClick={() => { setIsNew(false); setEditing(post) }}
                  className="px-3 py-1.5 bg-[#f5a623] hover:bg-[#e09410] text-black font-bold text-xs rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => { if (confirm(`Delete "${post.title}"?`)) deletePost(post.id) }}
                  disabled={deleting === post.id}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-lg border border-red-500/20 transition-colors disabled:opacity-50"
                >
                  {deleting === post.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Edit / New form ── */}
      {editing && (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
          {/* Form header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-gradient-to-r from-[#f5a623]/5 to-transparent">
            <h3 className="text-white font-bold uppercase text-sm" style={{ fontFamily: "var(--font-display)" }}>
              {isNew ? "New Blog Post" : "Edit Post"}
            </h3>
            <div className="flex gap-2">
              <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={save} disabled={saving} className="px-4 py-1.5 text-xs font-bold bg-[#f5a623] hover:bg-[#e09410] text-black uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50">
                {saving ? "Saving…" : "Save Post"}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6 max-h-[calc(100vh-280px)] overflow-y-auto">

            {/* ── Basic info ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Title *">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} placeholder="Best Gym in Islamabad…" />
              </Field>
              <Field label="Slug (URL) *">
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} className={inputCls} placeholder="best-gym-islamabad" />
              </Field>
              <Field label="Subtitle / Excerpt">
                <input value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className={inputCls} placeholder="A short description…" />
              </Field>
              <Field label="SEO Description">
                <input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputCls} placeholder="Meta description for Google…" />
              </Field>
              <Field label="Category">
                <input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputCls} placeholder="Fitness" />
              </Field>
              <Field label="Category Colour">
                <select value={editing.categoryColor} onChange={(e) => setEditing({ ...editing, categoryColor: e.target.value })} className={inputCls}>
                  {COLOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </Field>
              <Field label="Date">
                <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Read Time">
                <input value={editing.readTime} onChange={(e) => setEditing({ ...editing, readTime: e.target.value })} className={inputCls} placeholder="5 min read" />
              </Field>
              <Field label="Author">
                <input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={inputCls} placeholder="Safa Fitness Club" />
              </Field>
              <Field label="Published">
                <button
                  onClick={() => setEditing({ ...editing, published: !editing.published })}
                  className={`px-4 py-2 text-xs font-bold uppercase rounded-lg border transition-colors ${
                    editing.published ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-[#1a1a1a] text-gray-500 border-[#2a2a2a]"
                  }`}
                >
                  {editing.published ? "Published (Live)" : "Draft (Hidden)"}
                </button>
              </Field>
            </div>

            {/* ── Cover image ── */}
            <div>
              <label className="text-gray-400 text-xs mb-2 block">Cover Image</label>
              <div className="flex gap-3 items-start">
                <input value={editing.img} onChange={(e) => setEditing({ ...editing, img: e.target.value })} className={`${inputCls} flex-1`} placeholder="Paste image URL or upload below" />
                <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed cursor-pointer transition-colors flex-shrink-0 ${uploading ? "border-[#f5a623]/40 bg-[#f5a623]/5" : "border-[#2a2a2a] hover:border-[#f5a623]/40 bg-[#1a1a1a]"}`}>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} disabled={uploading} />
                  <span className="text-xs text-gray-400 whitespace-nowrap">{uploading ? "Uploading…" : "Upload"}</span>
                </label>
              </div>
              {editing.img && (
                <div className="relative w-fit mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editing.img} alt="preview" className="h-20 w-auto rounded-lg object-cover border border-[#2a2a2a]" />
                  <button onClick={() => setEditing({ ...editing, img: "" })} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-400">×</button>
                </div>
              )}
            </div>

            {/* ── Article sections ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-400 text-xs">Article Sections</label>
                <button onClick={addSection} className="text-[#f5a623] text-xs font-bold hover:underline">+ Add Section</button>
              </div>
              <div className="space-y-4">
                {editing.sections.map((sec, i) => (
                  <div key={i} className="bg-[#0e0e0e] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        value={sec.heading}
                        onChange={(e) => updateSection(i, "heading", e.target.value)}
                        className={`${inputCls} flex-1`}
                        placeholder={i === 0 ? "No heading (intro section)" : "Section heading…"}
                      />
                      {editing.sections.length > 1 && (
                        <button onClick={() => removeSection(i)} className="text-red-400 text-xs hover:text-red-300 flex-shrink-0">Remove</button>
                      )}
                    </div>
                    <textarea
                      value={sec.paragraphs.join("\n\n")}
                      onChange={(e) => updateSection(i, "content", e.target.value)}
                      rows={5}
                      placeholder="Write paragraphs here. Separate paragraphs with a blank line (double Enter)."
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f5a623]/40 resize-y font-mono leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── FAQs ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-400 text-xs">FAQs (optional)</label>
                <button onClick={addFaq} className="text-[#f5a623] text-xs font-bold hover:underline">+ Add FAQ</button>
              </div>
              {editing.faqs.length === 0 && (
                <p className="text-gray-600 text-xs">No FAQs yet. Click "+ Add FAQ" to add one.</p>
              )}
              <div className="space-y-3">
                {editing.faqs.map((faq, i) => (
                  <div key={i} className="bg-[#0e0e0e] border border-[#2a2a2a] rounded-lg p-4 space-y-2">
                    <div className="flex gap-2">
                      <input value={faq.q} onChange={(e) => updateFaq(i, "q", e.target.value)} className={`${inputCls} flex-1`} placeholder="Question…" />
                      <button onClick={() => removeFaq(i)} className="text-red-400 text-xs hover:text-red-300 flex-shrink-0">Remove</button>
                    </div>
                    <textarea value={faq.a} onChange={(e) => updateFaq(i, "a", e.target.value)} rows={3} placeholder="Answer…" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f5a623]/40 resize-y" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const inputCls = "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f5a623]/40"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
