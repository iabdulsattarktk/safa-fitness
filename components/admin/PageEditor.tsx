"use client"

import { useState, useRef, useTransition } from "react"
import ArrayImageEditor from "./ArrayImageEditor"

type ContentItem = { key: string; value: string; label: string; type: string; isDefault: boolean }
type ImageItem = { src: string; alt: string }

// ── Page schema ───────────────────────────────────────────────────────────────
const PAGE_SCHEMA = [
  {
    page: "Home",
    icon: "🏠",
    sections: [
      {
        title: "Hero Section",
        keys: ["home_hero_badge","home_hero_title1","home_hero_title2","home_hero_sub","home_hero_btn1","home_hero_btn2","img_hero"],
      },
      {
        title: "Facility Cards",
        keys: [
          "home_fac_tag","home_fac_h2",
          "img_gym",    "home_fac_0_title","home_fac_0_desc","home_fac_0_badge",
          "img_pool",   "home_fac_1_title","home_fac_1_desc","home_fac_1_badge",
          "img_boxing", "home_fac_2_title","home_fac_2_desc","home_fac_2_badge",
          "img_spa",    "home_fac_3_title","home_fac_3_desc","home_fac_3_badge",
          "img_sauna",  "home_fac_4_title","home_fac_4_desc","home_fac_4_badge",
          "img_salon",  "home_fac_5_title","home_fac_5_desc","home_fac_5_badge",
          "img_lockers","home_fac_6_title","home_fac_6_desc","home_fac_6_badge",
          "img_snooker","home_fac_7_title","home_fac_7_desc","home_fac_7_badge",
          "img_bar",    "home_fac_8_title","home_fac_8_desc","home_fac_8_badge",
        ],
      },
      {
        title: "Featured Sections",
        keys: [
          "home_split_0_tag","home_split_0_title","home_split_0_body",
          "home_split_1_tag","home_split_1_title","home_split_1_body",
          "home_split_2_tag","home_split_2_title","home_split_2_body",
        ],
      },
      {
        title: "Classes Section",
        keys: [
          "home_cls_tag","home_cls_h2",
          "home_cls_0_name","home_cls_0_trainer","home_cls_0_level","home_cls_0_proof",
          "home_cls_1_name","home_cls_1_trainer","home_cls_1_level","home_cls_1_proof",
          "home_cls_2_name","home_cls_2_trainer","home_cls_2_level","home_cls_2_proof",
          "home_cls_3_name","home_cls_3_trainer","home_cls_3_level","home_cls_3_proof",
          "home_cls_4_name","home_cls_4_trainer","home_cls_4_level","home_cls_4_proof",
          "home_cls_5_name","home_cls_5_trainer","home_cls_5_level","home_cls_5_proof",
        ],
      },
      {
        title: "Journey Steps",
        keys: [
          "home_steps_tag","home_steps_h2","home_steps_sub",
          "home_step_0_title","home_step_0_desc",
          "home_step_1_title","home_step_1_desc",
          "home_step_2_title","home_step_2_desc",
          "home_step_3_title","home_step_3_desc",
        ],
      },
      {
        title: "Parallax Quotes",
        keys: ["home_para1_quote","home_para1_sub","img_parallax_boxing","home_para2_quote","img_parallax_running"],
      },
      {
        title: "Trainers Section",
        keys: ["home_tr_tag","home_tr_h2","img_trainer_rahila","img_trainer_huma","img_trainer_kishwar","img_trainer_danish","img_trainer_sohail"],
      },
      {
        title: "Pricing Section",
        keys: ["home_pricing_tag","home_pricing_h2","price_gym_monthly","price_gym_original","price_pool_monthly","price_pool_original","price_combo_monthly","price_combo_original","price_day_pass"],
      },
      {
        title: "Testimonials",
        keys: [
          "home_test_tag","home_test_h2",
          "home_test_0_name","home_test_0_since","home_test_0_text",
          "home_test_1_name","home_test_1_since","home_test_1_text",
          "home_test_2_name","home_test_2_since","home_test_2_text",
          "home_test_3_name","home_test_3_since","home_test_3_text",
        ],
      },
      {
        title: "Gallery Strip & CTA",
        keys: ["home_gal_tag","home_gal_h2","home_cta_heading","home_cta_sub","home_cta_btn1","home_cta_btn2"],
      },
    ],
  },
  {
    page: "About",
    icon: "ℹ️",
    sections: [
      {
        title: "Page Hero",
        keys: ["about_hero_badge","about_hero_h1","about_hero_h1_orange","img_about_banner"],
      },
      {
        title: "Our Story Section",
        keys: [
          "about_story_tag","about_story_h2a","about_story_h2b",
          "about_story_p1","about_story_p2","about_story_p3",
          "img_about_us",
        ],
      },
      {
        title: "Core Values",
        keys: [
          "about_values_tag","about_values_h2",
          "about_val_0_img","about_val_0_title","about_val_0_desc",
          "about_val_1_img","about_val_1_title","about_val_1_desc",
          "about_val_2_img","about_val_2_title","about_val_2_desc",
          "about_val_3_img","about_val_3_title","about_val_3_desc",
        ],
      },
      {
        title: "Meet the Team",
        keys: [
          "about_team_tag","about_team_h2",
          "img_trainer_rahila","about_tr_0_name","about_tr_0_role","about_tr_0_cert","about_tr_0_bio",
          "img_trainer_huma",  "about_tr_1_name","about_tr_1_role","about_tr_1_cert","about_tr_1_bio",
          "img_trainer_kishwar","about_tr_2_name","about_tr_2_role","about_tr_2_cert","about_tr_2_bio",
          "img_trainer_danish","about_tr_3_name","about_tr_3_role","about_tr_3_cert","about_tr_3_bio",
          "img_trainer_sohail","about_tr_4_name","about_tr_4_role","about_tr_4_cert","about_tr_4_bio",
        ],
      },
      {
        title: "Facilities Tour",
        keys: [
          "about_fac_tag","about_fac_h2","about_fac_sub",
          "img_gym",    "about_fac_0_title","about_fac_0_desc",
          "img_pool",   "about_fac_1_title","about_fac_1_desc",
          "img_boxing", "about_fac_2_title","about_fac_2_desc",
          "img_spa",    "about_fac_3_title","about_fac_3_desc",
          "img_sauna",  "about_fac_4_title","about_fac_4_desc",
          "img_salon",  "about_fac_5_title","about_fac_5_desc",
          "img_lockers","about_fac_6_title","about_fac_6_desc",
          "img_snooker","about_fac_7_title","about_fac_7_desc",
          "img_bar",    "about_fac_8_title","about_fac_8_desc",
        ],
      },
      {
        title: "Visit Us & CTA",
        keys: ["about_visit_tag","about_visit_h2","about_cta_heading","about_cta_sub","about_cta_btn1","about_cta_btn2"],
      },
    ],
  },
  {
    page: "Classes",
    icon: "🥊",
    sections: [
      {
        title: "Page Hero",
        keys: ["classes_hero_badge","classes_hero_h1","classes_hero_h1_orange","classes_hero_img"],
      },
      {
        title: "Classes Grid",
        keys: ["classes_grid_tag","classes_grid_h2","classes_grid_sub"],
      },
      {
        title: "Class Cards (1–6)",
        keys: [
          "classes_0_img","classes_0_name","classes_0_category","classes_0_trainer","classes_0_level","classes_0_duration","classes_0_desc","classes_0_proof",
          "classes_1_img","classes_1_name","classes_1_category","classes_1_trainer","classes_1_level","classes_1_duration","classes_1_desc","classes_1_proof",
          "classes_2_img","classes_2_name","classes_2_category","classes_2_trainer","classes_2_level","classes_2_duration","classes_2_desc","classes_2_proof",
          "classes_3_img","classes_3_name","classes_3_category","classes_3_trainer","classes_3_level","classes_3_duration","classes_3_desc","classes_3_proof",
          "classes_4_img","classes_4_name","classes_4_category","classes_4_trainer","classes_4_level","classes_4_duration","classes_4_desc","classes_4_proof",
          "classes_5_img","classes_5_name","classes_5_category","classes_5_trainer","classes_5_level","classes_5_duration","classes_5_desc","classes_5_proof",
        ],
      },
      {
        title: "Club Hours",
        keys: [
          "classes_hours_tag","classes_hours_h2",
          "classes_hours_mon","classes_hours_tue","classes_hours_wed",
          "classes_hours_thu","classes_hours_fri","classes_hours_sat","classes_hours_sun",
        ],
      },
      {
        title: "Book a Class & Walk-ins",
        keys: ["classes_book_title","classes_book_desc","classes_walkin_title","classes_walkin_desc"],
      },
      {
        title: "Why Train With Us",
        keys: [
          "classes_why_tag","classes_why_h2",
          "classes_why_0_img","classes_why_0_title","classes_why_0_desc",
          "classes_why_1_img","classes_why_1_title","classes_why_1_desc",
          "classes_why_2_img","classes_why_2_title","classes_why_2_desc",
          "classes_why_3_img","classes_why_3_title","classes_why_3_desc",
        ],
      },
      {
        title: "Personal Training Strip & CTA",
        keys: ["classes_pt_title","classes_pt_desc","classes_cta_heading","classes_cta_sub","classes_cta_btn1","classes_cta_btn2"],
      },
    ],
  },
  {
    page: "Trainers",
    icon: "👤",
    sections: [
      {
        title: "Page Hero",
        keys: ["trainers_hero_badge","trainers_hero_h1","trainers_hero_h1_orange","img_trainers_banner"],
      },
      {
        title: "Stats Bar",
        keys: [
          "trainers_stat_0_val","trainers_stat_0_label",
          "trainers_stat_1_val","trainers_stat_1_label",
          "trainers_stat_2_val","trainers_stat_2_label",
          "trainers_stat_3_val","trainers_stat_3_label",
        ],
      },
      {
        title: "Trainer Cards — Section Header",
        keys: ["trainers_section_tag","trainers_section_h2a","trainers_section_h2b"],
      },
      {
        title: "Trainer 1 — Kishwar Ali",
        keys: ["img_trainer_kishwar","about_tr_2_name","about_tr_2_role","about_tr_2_bio","tr_kishwar_exp","tr_kishwar_quote","tr_kishwar_certs","tr_kishwar_specs"],
      },
      {
        title: "Trainer 2 — Huma Mumtaz",
        keys: ["img_trainer_huma","about_tr_1_name","about_tr_1_role","about_tr_1_bio","tr_huma_exp","tr_huma_quote","tr_huma_certs","tr_huma_specs"],
      },
      {
        title: "Trainer 3 — Rahila Sher",
        keys: ["img_trainer_rahila","about_tr_0_name","about_tr_0_role","about_tr_0_bio","tr_rahila_exp","tr_rahila_quote","tr_rahila_certs","tr_rahila_specs"],
      },
      {
        title: "Trainer 4 — Danish Masih Gill",
        keys: ["img_trainer_danish","about_tr_3_name","about_tr_3_role","about_tr_3_bio","tr_danish_exp","tr_danish_quote","tr_danish_certs","tr_danish_specs"],
      },
      {
        title: "Trainer 5 — Muhammad Sohail",
        keys: ["img_trainer_sohail","about_tr_4_name","about_tr_4_role","about_tr_4_bio","tr_sohail_exp","tr_sohail_quote","tr_sohail_certs","tr_sohail_specs"],
      },
      {
        title: "Personal Training Section",
        keys: ["trainers_pt_tag","trainers_pt_h2a","trainers_pt_h2b","trainers_pt_desc","trainers_pt_bullets","trainers_pt_img","trainers_pt_btn1","trainers_pt_btn2"],
      },
      {
        title: "CTA Banner",
        keys: ["trainers_cta_heading","trainers_cta_sub","trainers_cta_btn1","trainers_cta_btn2"],
      },
    ],
  },
  {
    page: "Contact",
    icon: "📞",
    sections: [
      {
        title: "Page Hero",
        keys: ["contact_hero_badge","contact_hero_h1","contact_hero_h1_orange","contact_hero_img"],
      },
      {
        title: "Form Section",
        keys: ["contact_form_tag","contact_form_h2a","contact_form_h2b","contact_form_desc"],
      },
      {
        title: "Contact Info (shared with Settings)",
        keys: ["contact_info_tag","contact_info_h2a","contact_info_h2b","contact_address","contact_phone","contact_phone2","contact_whatsapp","contact_email"],
      },
      {
        title: "Opening Hours (shared with Classes)",
        keys: ["classes_hours_mon","classes_hours_tue","classes_hours_wed","classes_hours_thu","classes_hours_fri","classes_hours_sat","classes_hours_sun"],
      },
      {
        title: "Map Section",
        keys: ["contact_map_tag","contact_map_h2a","contact_map_h2b"],
      },
      {
        title: "Visit Strip (3 Cards)",
        keys: [
          "contact_visit_0_img","contact_visit_0_title","contact_visit_0_desc",
          "contact_visit_1_img","contact_visit_1_title","contact_visit_1_desc",
          "contact_visit_2_img","contact_visit_2_title","contact_visit_2_desc",
        ],
      },
      {
        title: "CTA Banner",
        keys: ["contact_cta_heading","contact_cta_sub","contact_cta_btn1","contact_cta_btn2"],
      },
    ],
  },
  {
    page: "Pricing",
    icon: "💰",
    sections: [
      {
        title: "Page Hero",
        keys: ["pricing_hero_badge","pricing_hero_h1","pricing_hero_h1_orange","pricing_hero_img"],
      },
      {
        title: "Plans Section Header",
        keys: ["pricing_plans_tag","pricing_plans_h2a","pricing_plans_h2b","pricing_plans_sub","pricing_reg_notice"],
      },
      {
        title: "Plan 1 — Day Pass",
        keys: ["pricing_p0_img","pricing_p0_name","pricing_p0_badge","price_day_pass","pricing_p0_period","pricing_p0_features","pricing_p0_cta","pricing_p0_note"],
      },
      {
        title: "Plan 2 — Swimming Pool",
        keys: ["pricing_p1_img","pricing_p1_name","pricing_p1_badge","price_pool_monthly","price_pool_original","pricing_p1_savings","pricing_p1_reg","pricing_p1_features","pricing_p1_cta","pricing_p1_note"],
      },
      {
        title: "Plan 3 — Gym Only",
        keys: ["pricing_p2_img","pricing_p2_name","pricing_p2_badge","price_gym_monthly","price_gym_original","pricing_p2_savings","pricing_p2_reg","pricing_p2_features","pricing_p2_cta","pricing_p2_note"],
      },
      {
        title: "Plan 4 — Gym + VIP Lockers",
        keys: ["pricing_p3_img","pricing_p3_name","pricing_p3_badge","price_gym_vip_monthly","price_gym_vip_original","pricing_p3_savings","pricing_p3_reg","pricing_p3_features","pricing_p3_cta","pricing_p3_note"],
      },
      {
        title: "Plan 5 — Gym + Pool (Most Popular)",
        keys: ["pricing_p4_img","pricing_p4_name","pricing_p4_badge","price_combo_monthly","price_combo_original","pricing_p4_savings","pricing_p4_proof","pricing_p4_reg","pricing_p4_features","pricing_p4_cta","pricing_p4_note"],
      },
      {
        title: "Plan 6 — Kids",
        keys: ["pricing_p5_img","pricing_p5_name","pricing_p5_badge","price_kids_monthly","price_kids_reg","pricing_p5_features","pricing_p5_cta","pricing_p5_note"],
      },
      {
        title: "Discount Banner",
        keys: ["pricing_disc_tag","pricing_disc_h2a","pricing_disc_h2b","pricing_disc_desc"],
      },
      {
        title: "FAQ",
        keys: [
          "pricing_faq_tag","pricing_faq_h2a","pricing_faq_h2b",
          "pricing_faq_0_q","pricing_faq_0_a",
          "pricing_faq_1_q","pricing_faq_1_a",
          "pricing_faq_2_q","pricing_faq_2_a",
          "pricing_faq_3_q","pricing_faq_3_a",
          "pricing_faq_4_q","pricing_faq_4_a",
          "pricing_faq_5_q","pricing_faq_5_a",
          "pricing_faq_6_q","pricing_faq_6_a",
        ],
      },
      {
        title: "CTA Banner",
        keys: ["pricing_cta_heading","pricing_cta_sub","pricing_cta_btn1","pricing_cta_btn2"],
      },
    ],
  },
  {
    page: "Gallery",
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
    page: "Settings",
    icon: "⚙️",
    sections: [
      {
        title: "Pricing",
        keys: [
          "price_gym_monthly","price_gym_original",
          "price_pool_monthly","price_pool_original",
          "price_combo_monthly","price_combo_original",
          "price_gym_vip_monthly","price_gym_vip_original",
          "price_kids_monthly","price_kids_reg",
          "price_day_pass",
        ],
      },
      {
        title: "Contact Info",
        keys: ["contact_phone","contact_phone2","contact_whatsapp","contact_address","contact_email"],
      },
      {
        title: "Opening Hours",
        keys: ["hours_weekday","hours_weekend"],
      },
      {
        title: "Hero Tagline",
        keys: ["hero_tagline"],
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
export default function PageEditor({ initialContent }: { initialContent: ContentItem[] }) {
  const [content, setContent] = useState<Record<string, string>>(
    Object.fromEntries(initialContent.map((c) => [c.key, c.value]))
  )
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [activePage, setActivePage] = useState(0)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [, startTransition] = useTransition()

  const itemMap = Object.fromEntries(initialContent.map((c) => [c.key, c]))

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections((prev) => {
      const n = new Set(prev)
      if (n.has(sectionTitle)) n.delete(sectionTitle)
      else n.add(sectionTitle)
      return n
    })
  }

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

  const currentPage = PAGE_SCHEMA[activePage]

  return (
    <div className="flex gap-0 bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden min-h-[600px]">
      {/* ── Sidebar ── */}
      <div className="w-44 shrink-0 border-r border-[#2a2a2a] bg-[#0e0e0e] py-3">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest px-4 mb-2">Pages</p>
        {PAGE_SCHEMA.map((pg, i) => (
          <button
            key={pg.page}
            onClick={() => setActivePage(i)}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-all ${
              activePage === i
                ? "bg-[#f5a623]/10 text-[#f5a623] border-r-2 border-[#f5a623] font-semibold"
                : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            <span className="text-base leading-none">{pg.icon}</span>
            <span>{pg.page}</span>
          </button>
        ))}
      </div>

      {/* ── Sections ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(100vh-300px)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{currentPage.icon}</span>
          <h2 className="text-white font-bold uppercase text-base" style={{ fontFamily: "var(--font-display)" }}>
            {currentPage.page} Page
          </h2>
          {currentPage.page === "Home" && (
            <span className="ml-auto text-gray-600 text-xs">Changes apply after clicking Save</span>
          )}
          {currentPage.page === "Gallery" && (
            <span className="ml-auto text-gray-600 text-xs">Gallery changes apply immediately</span>
          )}
        </div>

        {currentPage.sections.map((section) => {
          const isCollapsed = collapsedSections.has(section.title)
          const validKeys = section.keys.filter((k) => itemMap[k])

          return (
            <div key={section.title} className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a] bg-gradient-to-r from-[#f5a623]/5 to-transparent hover:from-[#f5a623]/10 transition-colors"
              >
                <h3 className="text-white font-bold uppercase text-xs tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                  {section.title}
                  <span className="text-gray-600 font-normal ml-2 normal-case tracking-normal">
                    {validKeys.length} field{validKeys.length !== 1 ? "s" : ""}
                  </span>
                </h3>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Section fields */}
              {!isCollapsed && (
                <div className="divide-y divide-[#1e1e1e]">
                  {validKeys.map((key) => {
                    const item = itemMap[key]
                    const isImage = item.type === "IMAGE_URL"
                    const isJson  = item.type === "JSON"
                    const isSaving = saving === key
                    const isSaved  = saved.has(key)

                    return (
                      <div key={key} className="px-5 py-3.5">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <label className="text-gray-400 text-xs leading-tight">{item.label}</label>
                          {!isJson && (
                            <button
                              onClick={() => save(key)}
                              disabled={isSaving}
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                                isSaved
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-[#f5a623] hover:bg-[#e09410] text-black"
                              } disabled:opacity-50`}
                            >
                              {isSaving ? "Saving…" : isSaved ? "✓ Saved" : "Save"}
                            </button>
                          )}
                        </div>

                        {isJson ? (
                          <div className="space-y-2">
                            <ArrayImageEditor
                              value={parseImages(content[key])}
                              onChange={(items) => saveArray(key, items)}
                            />
                            <div className="flex items-center gap-2">
                              {isSaving && <span className="text-[#f5a623] text-xs">Saving…</span>}
                              {isSaved  && <span className="text-green-400 text-xs">✓ Saved</span>}
                            </div>
                          </div>
                        ) : isImage ? (
                          <ImageField
                            value={content[key]}
                            onChange={(val) => setContent((p) => ({ ...p, [key]: val }))}
                          />
                        ) : item.type === "TEXTAREA" ? (
                          <textarea
                            value={content[key]}
                            onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                            rows={4}
                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f5a623]/40 resize-y font-mono leading-relaxed"
                          />
                        ) : (
                          <input
                            type="text"
                            value={content[key]}
                            onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f5a623]/40"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        <p className="text-gray-700 text-xs text-center pb-2">
          Text changes — click Save per field. Gallery images auto-save on change.
        </p>
      </div>
    </div>
  )
}
