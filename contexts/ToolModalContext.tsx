"use client"

import { createContext, useContext, useState } from "react"

type ToolModalCtx = {
  activeTool: string | null
  openTool: (slug: string) => void
  closeTool: () => void
}

const ToolModalContext = createContext<ToolModalCtx>({
  activeTool: null,
  openTool: () => {},
  closeTool: () => {},
})

export function ToolModalProvider({ children }: { children: React.ReactNode }) {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  return (
    <ToolModalContext.Provider value={{
      activeTool,
      openTool: (slug) => setActiveTool(slug),
      closeTool: () => setActiveTool(null),
    }}>
      {children}
    </ToolModalContext.Provider>
  )
}

export function useToolModal() {
  return useContext(ToolModalContext)
}
