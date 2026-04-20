import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { readdir, stat, unlink, writeFile, mkdir } from "fs/promises"
import { join, extname, relative } from "path"

const PUBLIC_DIR = join(process.cwd(), "public")
const MEDIA_ROOTS = ["images", "uploads", "videos"]
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"])
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".avi"])
const AUDIO_EXTS = new Set([".mp3", ".wav", ".ogg"])

type MediaFile = {
  name: string
  path: string   // URL path e.g. /images/gallery/gym.webp
  folder: string // e.g. images/gallery
  size: number
  ext: string
  type: "image" | "video" | "audio" | "other"
}

async function scanDir(dir: string, baseUrl: string): Promise<MediaFile[]> {
  const files: MediaFile[] = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        const sub = await scanDir(fullPath, `${baseUrl}/${entry.name}`)
        files.push(...sub)
      } else {
        const ext = extname(entry.name).toLowerCase()
        const s = await stat(fullPath)
        const relFolder = relative(PUBLIC_DIR, dir).replace(/\\/g, "/")
        files.push({
          name: entry.name,
          path: `${baseUrl}/${entry.name}`,
          folder: relFolder,
          size: s.size,
          ext,
          type: IMAGE_EXTS.has(ext) ? "image"
              : VIDEO_EXTS.has(ext) ? "video"
              : AUDIO_EXTS.has(ext) ? "audio"
              : "other",
        })
      }
    }
  } catch { /* folder may not exist */ }
  return files
}

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const allFiles: MediaFile[] = []
  for (const root of MEDIA_ROOTS) {
    const dir = join(PUBLIC_DIR, root)
    const files = await scanDir(dir, `/${root}`)
    allFiles.push(...files)
  }

  // Group by folder
  const grouped: Record<string, MediaFile[]> = {}
  for (const f of allFiles) {
    if (!grouped[f.folder]) grouped[f.folder] = []
    grouped[f.folder].push(f)
  }

  return NextResponse.json({ grouped })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { path } = await req.json()
  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "Path required" }, { status: 400 })
  }

  // Security: only allow deleting within public dir, not logo or site-icon
  const PROTECTED = ["/images/logo.webp", "/images/site-icon.webp"]
  if (PROTECTED.includes(path)) {
    return NextResponse.json({ error: "This file is protected and cannot be deleted." }, { status: 403 })
  }

  const fullPath = join(PUBLIC_DIR, path)
  // Ensure path stays within public dir
  if (!fullPath.startsWith(PUBLIC_DIR)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  try {
    await unlink(fullPath)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "File not found or could not be deleted" }, { status: 404 })
  }
}

export async function POST(req: NextRequest) {
  // Replace file at a specific path
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const targetPath = formData.get("path") as string | null

  if (!file || !targetPath) {
    return NextResponse.json({ error: "File and path required" }, { status: 400 })
  }

  const fullPath = join(PUBLIC_DIR, targetPath)
  if (!fullPath.startsWith(PUBLIC_DIR)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  await mkdir(join(fullPath, ".."), { recursive: true })
  await writeFile(fullPath, Buffer.from(bytes))

  return NextResponse.json({ success: true, url: targetPath })
}
