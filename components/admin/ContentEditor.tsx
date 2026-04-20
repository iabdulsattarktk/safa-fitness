"use client"

import { useState, useRef, useTransition } from "react"
import ArrayImageEditor from "./ArrayImageEditor"

type ContentItem = { key: string; value: string; label: string; type: string; isDefault: boolean }
type ImageItem = { src: string; alt: string }

// ── Page groups ───────────────────────────────────────────────────────────────
const PAGE_GROUPS = [
  {
    page: "Settings",
    icon: "⚙️",
    sections: [
      {
        title: "Pricing",
        keys: ["price_gym_monthly","price_gym_original","price_pool_monthly","price_pool_original","price_combo_monthly","price_combo_original","price_day_pass"],
      },
      {
        title: "Contact Info",
        keys: ["contact_phone","contact_whatsapp","contact_address","contact_email"],
      },
      {
        title: "Opening Hours",
        keys: ["hours_weekday","hours_weekend"],
      },
      {
        title: "Hero Text",
        keys: ["hero_tagline"],
      },
    ],
  },
  {
    page: "Home Page",
    icon: "🏠",
    sections: [
      {
        title: "Hero & Banners",
        keys: ["img_hero","img_parallax_boxing","img_parallax_running"],
      },
      {
        title: "Facility Card Images",
        keys: ["img_gym","img_pool","img_boxing","img_spa","img_sauna","img_salon","img_lockers","img_snooker","img_bar"],
      },
    ],
  },
  {
    page: "Gallery Page",
    icon: "🖼️",
    sections: [
      { title: "Gym & Fitness",          keys: ["gallery_gym"] },
      { title: "Swimming Pool",          keys: ["gallery_pool"] },
      { title: "Boxing Ring",            keys: ["gallery_boxing"] },
      { title: "Steam, Sauna & Jacuzzi", keys: ["gallery_sauna"] },
      { title: "Massage & Spa",          keys: ["gallery_spa"] },
      { title: "Snooker Lounge",         keys: ["gallery_snooker"] },
      { title: "Beauty Salon – Men",     keys: ["gallery_salon"] },
      { title: "VIP Lockers & Shower",   keys: ["gallery_lockers"] },
      { title: "Safa Bar",               keys: ["gallery_bar"] },
      { title: "Our Team",               keys: ["gallery_team"] },
    ],
  },
  {
    page: "Trainers Page",
    icon: "👤",
    sections: [
      {
        title: "Page Banner",
        keys: ["img_trainers_banner"],
      },
      {
        title: "Trainer Photos",
        keys: ["img_trainer_rahila","img_trainer_huma","img_trainer_kishwar","img_trainer_danish","img_trainer_sohail"],
      },
    ],
  },
  {
    page: "About Page",
    icon: "ℹ️",
    sections: [
      {
        title: "Page Images",
        keys: ["img_about_banner","img_about_us"],
      },
    ],
  },
]

// ── Image upload field ────────────────────────────────────────────────────────
function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [tab, setTab] = useState<"url" | "upload">("url")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setUploadError("")
    try {
      const fd = new FormData(); fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      onChange(data.url); setTab("url")
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  return (
    <div className="flex-1 space-y-2">
      <div className="flex rounded-lg overflow-hidden border border-[#2a2a2a] w-fit text-xs">
        {(["url","upload"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 font-medium transition-colors capitalize ${
              tab === t ? "bg-[#f5a623] text-black" : "bg-[#1a1a1a] text-gray-400 hover:text-white"
            }`}>
            {t === "url" ? "Paste URL" : "Upload from PC"}
          </button>
        ))}
      </div>
      {tab === "url" ? (
        <input type="url" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL (leave blank for default)"
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#f5a623]/40" />
      ) : (
        <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
          uploading ? "border-[#f5a623]/40 bg-[#f5a623]/5" : "border-[#2a2a2a] hover:border-[#f5a623]/40 bg-[#1a1a1a]"
        }`}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={handleFileChange} disabled={uploading} />
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="text-sm text-gray-400">{uploading ? "Uploading…" : "Click to choose image"}</span>
          <span className="text-xs text-gray-600 ml-auto">Max 5 MB</span>
        </label>
      )}
      {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}
      {value && (
        <div className="relative w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="h-20 w-auto rounded-lg object-cover border border-[#2a2a2a]" />
          <button onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-400">×</button>
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContentEditor({ initialContent }: { initialContent: ContentItem[] }) {
  const [content, setContent] = useState<Record<string, string>>(
    Object.fromEntries(initialContent.map((c) => [c.key, c.value]))
  )
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [activePage, setActivePage] = useState(0)
  const [, startTransition] = useTransition()

  const itemMap = Object.fromEntries(initialContent.map((c) => [c.key, c]))

  const save = async (key: string) => {
    setSaving(key)
    try {
      await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: content[key] }),
      })
      startTransition(() => {
        setSaved((prev) => new Set([...prev, key]))
        setTimeout(() => setSaved((prev) => { const n = new Set(prev); n.delete(key); return n }), 2000)
      })
    } finally { setSaving(null) }
  }

  const saveArray = async (key: string, items: ImageItem[]) => {
    const value = JSON.stringify(items)
    setContent((p) => ({ ...p, [key]: value }))
    setSaving(key)
    try {
      await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      })
      startTransition(() => {
        setSaved((prev) => new Set([...prev, key]))
        setTimeout(() => setSaved((prev) => { const n = new Set(prev); n.delete(key); return n }), 2500)
      })
    } finally { setSaving(null) }
  }

  const parseImages = (val: string): ImageItem[] => {
    try { return JSON.parse(val) } catch { return [] }
  }

  const currentPage = PAGE_GROUPS[activePage]

  return (
    <div className="space-y-4">
      {/* Page tabs */}
      <div className="flex flex-wrap gap-1 bg-[#141414] border border-[#2a2a2a] rounded-xl p-1">
        {PAGE_GROUPS.map((pg, i) => (
          <button key={pg.page} onClick={() => setActivePage(i)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activePage === i ? "bg-[#f5a623] text-black" : "text-gray-400 hover:text-white"
            }`}>
            <span>{pg.icon}</span> {pg.page}
          </button>
        ))}
      </div>

      {/* Sections for active page */}
      {currentPage.sections.map((section) => (
        <div key={section.title} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2a2a2a] bg-gradient-to-r from-[#f5a623]/5 to-transparent">
            <h3 className="text-white font-bold uppercase text-sm" style={{ fontFamily: "var(--font-display)" }}>
              {section.title}
            </h3>
          </div>

          <div className="divide-y divide-[#1e1e1e]">
            {section.keys.map((key) => {
              const item = itemMap[key]
              if (!item) return null
              const isImage = item.type === "IMAGE_URL"
              const isJson = item.type === "JSON"
              const isSaving = saving === key
              const isSaved = saved.has(key)

              return (
                <div key={key} className="px-5 py-4">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <label className="text-gray-400 text-xs">{item.label}</label>
                    {!isJson && (
                      <button onClick={() => save(key)} disabled={isSaving}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                          isSaved ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-[#f5a623] hover:bg-[#e09410] text-black"
                        } disabled:opacity-50`}>
                        {isSaving ? "Saving…" : isSaved ? "✓ Saved" : "Save"}
                      </button>
                    )}
                  </div>

                  {isJson ? (
                    <div className="space-y-3">
                      <ArrayImageEditor
                        value={parseImages(content[key])}
                        onChange={(items) => saveArray(key, items)}
                      />
                      <div className="flex items-center gap-2">
                        {isSaving && <span className="text-[#f5a623] text-xs">Saving…</span>}
                        {isSaved && <span className="text-green-400 text-xs">✓ Saved</span>}
                      </div>
                    </div>
                  ) : isImage ? (
                    <ImageField
                      value={content[key]}
                      onChange={(val) => setContent((p) => ({ ...p, [key]: val }))}
                    />
                  ) : (
                    <input type="text" value={content[key]}
                      onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f5a623]/40" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <p className="text-gray-600 text-xs text-center pb-4">
        Gallery changes apply immediately. Single image changes — click Save first.
      </p>
    </div>
  )
}
