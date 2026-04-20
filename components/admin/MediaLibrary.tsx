"use client"

import { useState, useEffect, useRef, useCallback } from "react"

type MediaFile = {
  name: string
  path: string
  folder: string
  size: number
  ext: string
  type: "image" | "video" | "audio" | "other"
}

// Which pages use which folders
const FOLDER_PAGES: Record<string, string> = {
  "images":           "Multiple pages",
  "images/gallery":   "Gallery page",
  "images/facilities":"Home · About · Classes · Pricing · Contact",
  "images/classes":   "Home · Classes page",
  "images/trainers":  "Home · Trainers · About page",
  "uploads":          "Admin uploads",
  "videos":           "Home hero video",
}

const FOLDER_LABELS: Record<string, string> = {
  "images":           "Root Images",
  "images/gallery":   "Gallery",
  "images/facilities":"Facilities",
  "images/classes":   "Classes",
  "images/trainers":  "Trainers",
  "uploads":          "Uploads",
  "videos":           "Videos",
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function MediaCard({
  file,
  onDelete,
  onReplace,
}: {
  file: MediaFile
  onDelete: (path: string) => void
  onReplace: (path: string, newFile: File) => void
}) {
  const [preview, setPreview] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className="group relative bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#f5a623]/30 transition-all duration-200">
        {/* Thumbnail */}
        <div className="relative bg-[#1a1a1a] cursor-pointer" style={{ aspectRatio: "4/3" }}
          onClick={() => setPreview(true)}>
          {file.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={file.path} alt={file.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : file.type === "video" ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <svg className="w-10 h-10 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-gray-500 text-xs">{file.ext}</span>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-2xl">📄</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">Preview</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <p className="text-white text-xs font-medium truncate" title={file.name}>{file.name}</p>
          <p className="text-gray-600 text-[10px] mt-0.5">{formatSize(file.size)}</p>
        </div>

        {/* Action bar */}
        <div className="px-2.5 pb-2.5 flex gap-1.5">
          {/* Download */}
          <a href={file.path} download={file.name} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-gray-400 hover:text-white text-[10px] font-medium rounded-lg transition-colors"
            title="Download">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>

          {/* Replace */}
          <button onClick={() => fileRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#1a1a1a] hover:bg-[#f5a623]/10 text-gray-400 hover:text-[#f5a623] text-[10px] font-medium rounded-lg transition-colors"
            title="Replace with new file">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Replace
          </button>
          <input ref={fileRef} type="file" accept="image/*,video/*,audio/*" className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onReplace(file.path, f)
              e.target.value = ""
            }} />

          {/* Delete */}
          {confirming ? (
            <button onClick={() => { onDelete(file.path); setConfirming(false) }}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded-lg transition-colors">
              Confirm
            </button>
          ) : (
            <button onClick={() => setConfirming(true)}
              className="px-2 py-1.5 bg-[#1a1a1a] hover:bg-red-500/10 text-gray-500 hover:text-red-400 text-[10px] rounded-lg transition-colors"
              title="Delete">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox preview */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreview(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition-colors"
            onClick={() => setPreview(false)}>✕</button>
          {file.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={file.path} alt={file.name}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} />
          ) : file.type === "video" ? (
            <video src={file.path} controls autoPlay
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} />
          ) : null}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {file.name} · {formatSize(file.size)}
          </div>
        </div>
      )}
    </>
  )
}

export default function MediaLibrary() {
  const [grouped, setGrouped] = useState<Record<string, MediaFile[]>>({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [uploadingTo, setUploadingTo] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const uploadRef = useRef<HTMLInputElement>(null)
  const uploadTarget = useRef<string>("")

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch("/api/admin/media")
    const data = await res.json()
    setGrouped(data.grouped ?? {})
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const handleDelete = async (path: string) => {
    const res = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    })
    if (res.ok) { showToast("File deleted."); load() }
    else { const d = await res.json(); showToast(d.error ?? "Delete failed") }
  }

  const handleReplace = async (targetPath: string, file: File) => {
    setUploadingTo(targetPath)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("path", targetPath)
    const res = await fetch("/api/admin/media", { method: "POST", body: fd })
    setUploadingTo(null)
    if (res.ok) { showToast("File replaced successfully!"); load() }
    else { const d = await res.json(); showToast(d.error ?? "Replace failed") }
  }

  const handleUploadToFolder = async (folder: string, file: File) => {
    setUploadingTo(folder)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("path", `/${folder}/${file.name}`)
    const res = await fetch("/api/admin/media", { method: "POST", body: fd })
    setUploadingTo(null)
    if (res.ok) { showToast("File uploaded!"); load() }
    else { const d = await res.json(); showToast(d.error ?? "Upload failed") }
  }

  const toggleCollapse = (folder: string) => {
    setCollapsed((prev) => {
      const n = new Set(prev)
      n.has(folder) ? n.delete(folder) : n.add(folder)
      return n
    })
  }

  const totalFiles = Object.values(grouped).reduce((a, b) => a + b.length, 0)

  // Filter files by search
  const filteredGrouped: Record<string, MediaFile[]> = {}
  for (const [folder, files] of Object.entries(grouped)) {
    const filtered = search
      ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
      : files
    if (filtered.length > 0) filteredGrouped[folder] = filtered
  }

  const FOLDER_ORDER = ["images", "images/facilities", "images/gallery", "images/classes", "images/trainers", "uploads", "videos"]
  const sortedFolders = [
    ...FOLDER_ORDER.filter((f) => filteredGrouped[f]),
    ...Object.keys(filteredGrouped).filter((f) => !FOLDER_ORDER.includes(f)),
  ]

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a2a1a] border border-green-500/40 text-green-300 px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h2 className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Media Library
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {loading ? "Loading…" : `${totalFiles} files across ${Object.keys(grouped).length} folders`}
          </p>
        </div>
        <div className="sm:ml-auto flex gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search files…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#f5a623]/40 w-48" />
          </div>
          {/* Refresh */}
          <button onClick={load}
            className="px-3 py-2 bg-[#141414] border border-[#2a2a2a] hover:border-[#f5a623]/30 text-gray-400 hover:text-white rounded-xl text-xs transition-colors">
            ↻ Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading media files…</div>
      ) : (
        <div className="space-y-3">
          {sortedFolders.map((folder) => {
            const files = filteredGrouped[folder]
            const isCollapsed = collapsed.has(folder)
            const label = FOLDER_LABELS[folder] ?? folder
            const pages = FOLDER_PAGES[folder] ?? ""

            return (
              <div key={folder} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
                {/* Folder header */}
                <div className="flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-[#1a1a1a] transition-colors select-none"
                  onClick={() => toggleCollapse(folder)}>
                  <span className="text-[#f5a623] text-sm">{isCollapsed ? "▶" : "▼"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
                        {label}
                      </span>
                      <span className="bg-[#f5a623]/15 text-[#f5a623] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {files.length}
                      </span>
                    </div>
                    {pages && <p className="text-gray-600 text-[10px] mt-0.5">Used on: {pages}</p>}
                  </div>
                  {/* Upload to folder */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      uploadTarget.current = folder
                      uploadRef.current?.click()
                    }}
                    disabled={!!uploadingTo}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5a623]/10 hover:bg-[#f5a623]/20 border border-[#f5a623]/20 text-[#f5a623] text-[11px] font-bold rounded-lg transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {uploadingTo === folder ? "Uploading…" : "Add Image"}
                  </button>
                </div>

                {/* Files grid */}
                {!isCollapsed && (
                  <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 border-t border-[#2a2a2a] pt-4">
                    {files.map((file) => (
                      <MediaCard
                        key={file.path}
                        file={file}
                        onDelete={handleDelete}
                        onReplace={handleReplace}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {sortedFolders.length === 0 && (
            <div className="text-center py-12 text-gray-500">No files match your search.</div>
          )}
        </div>
      )}

      {/* Hidden upload input for folder uploads */}
      <input ref={uploadRef} type="file" accept="image/*,video/*,audio/*" className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f && uploadTarget.current) handleUploadToFolder(uploadTarget.current, f)
          e.target.value = ""
        }} />

      {uploadingTo && (
        <div className="fixed bottom-6 right-6 bg-[#1a2a1a] border border-[#f5a623]/30 text-[#f5a623] px-4 py-3 rounded-xl text-sm shadow-2xl">
          Uploading…
        </div>
      )}
    </div>
  )
}
