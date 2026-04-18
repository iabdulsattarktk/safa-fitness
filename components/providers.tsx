"use client"

import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { ToolModalProvider } from "@/contexts/ToolModalContext"
import ToolModal from "@/components/tools/ToolModal"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
        <ToolModalProvider>
          {children}
          <ToolModal />
        </ToolModalProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
