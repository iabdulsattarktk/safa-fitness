"use client"

import { useRef, useState } from "react"

type ImageItem = { src: string; alt: string }

export default function ArrayImageEditor({
  value,
  onChange,
}: {
  value: ImageItem[]
  onChange: (items: ImageItem[]) => void
}) {
  const [addMode, setAddMode] = useState<"url" | "upload" | null>(null)
  const [newSrc, setNewSrc] = useState("")
  const [newAlt, setNewAlt] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError("")
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      setNewSrc(data.url)
      setAddMode("url")
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const addImage = () => {
    if (!newSrc.trim()) return
    onChange([...value, { src: newSrc.trim(), alt: newAlt.trim() || "Image" }])
    setNewSrc("")
    setNewAlt("")
    setAddMode(null)
  }

  const removeImage = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i))
  }

  const moveUp = (i: number) => {
    if (i === 0) return
    const next = [...value]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
  }

  const moveDown = (i: number) => {
    if (i === value.length - 1) return
    const next = [...value]
    ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
    onChange(next)
  }

  const updateAlt = (i: number, alt: string) => {
    const next = [...value]
    next[i] = { ...next[i], alt }
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {/* Existing images grid */}
      {value.length === 0 && (
        <p className="text-gray-600 text-xs italic py-2">No images yet. Add one below.</p>
      )}

      <div className="space-y-2">
        {value.map((img, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-2.5">
            {/* Preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt}
              className="w-16 h-12 object-cover rounded-lg flex-shrink-0 bg-[#1a1a1a]" />

            {/* Alt text */}
            <input
              type="text"
              value={img.alt}
              onChange={(e) => updateAlt(i, e.target.value)}
              placeholder="Image description"
              className="flex-1 bg-transparent text-xs text-gray-300 border-none outline-none placeholder-gray-600 min-w-0"
            />

            {/* Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => moveUp(i)} disabled={i === 0}
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-300 disabled:opacity-30 transition-colors" title="Move up">
                ▲
              </button>
              <button onClick={() => moveDown(i)} disabled={i === value.length - 1}
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-300 disabled:opacity-30 transition-colors" title="Move down">
                ▼
              </button>
              <button onClick={() => removeImage(i)}
                className="w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-400 transition-colors ml-1" title="Remove">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add image panel */}
      {addMode === "url" ? (
        <div className="bg-[#0d0d0d] border border-[#f5a623]/20 rounded-xl p-3 space-y-2">
          <input
            type="url"
            value={newSrc}
            onChange={(e) => setNewSrc(e.target.value)}
            placeholder="Paste image URL"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#f5a623]/40"
            autoFocus
          />
          <input
            type="text"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            placeholder="Description (e.g. Boxing Ring)"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#f5a623]/40"
          />
          <div className="flex gap-2">
            <button onClick={addImage}
              className="px-4 py-1.5 bg-[#f5a623] hover:bg-[#e09410] text-black text-xs font-bold rounded-lg transition-colors">
              Add
            </button>
            <button onClick={() => { setAddMode(null); setNewSrc(""); setNewAlt("") }}
              className="px-4 py-1.5 bg-[#1a1a1a] text-gray-400 text-xs rounded-lg hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : addMode === "upload" ? (
        <div className="bg-[#0d0d0d] border border-[#f5a623]/20 rounded-xl p-3 space-y-2">
          <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
            uploading ? "border-[#f5a623]/40 bg-[#f5a623]/5" : "border-[#2a2a2a] hover:border-[#f5a623]/40"
          }`}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={handleUpload} disabled={uploading} />
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-sm text-gray-400">{uploading ? "Uploading…" : "Click to choose image from PC"}</span>
          </label>
          {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}
          <button onClick={() => setAddMode(null)}
            className="px-4 py-1.5 bg-[#1a1a1a] text-gray-400 text-xs rounded-lg hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => setAddMode("url")}
            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f5a623]/40 text-gray-400 hover:text-white text-xs rounded-lg transition-colors">
            <span className="text-[#f5a623]">+</span> Add via URL
          </button>
          <button onClick={() => setAddMode("upload")}
            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f5a623]/40 text-gray-400 hover:text-white text-xs rounded-lg transition-colors">
            <span className="text-[#f5a623]">↑</span> Upload from PC
          </button>
        </div>
      )}
    </div>
  )
}
