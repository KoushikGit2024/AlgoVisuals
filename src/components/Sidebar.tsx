"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { NAV } from "@/lib/docsNav"

// ─── Types ────────────────────────────────────────────────────────────────────
type NavGroup = (typeof NAV)[keyof typeof NAV]

// ─── Highlight ────────────────────────────────────────────────────────────────
function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx < 0) return <>{text}</>

  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200/60 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-200 rounded-[2px] px-[2px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

// ─── Group Section ────────────────────────────────────────────────────────────
function GroupSection({
  group,
  isOpen,
  onToggle,
  pathname,
  query,
  sidebarCollapsed,
}: {
  group: NavGroup
  isOpen: boolean
  onToggle: () => void
  pathname: string
  query: string
  sidebarCollapsed: boolean
}) {
  const filtered = useMemo(() => {
    if (!query) return group.items
    const q = query.toLowerCase()
    return group.items.filter((i) =>
      i.label.toLowerCase().includes(q)
    )
  }, [group.items, query])

  if (query && filtered.length === 0) return null

  const isExpanded = (!sidebarCollapsed && isOpen) || query.length > 0

  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      {/* Group Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-3 transition-colors duration-200 outline-none focus-visible:ring-2 ring-inset ring-[var(--accent)]",
          sidebarCollapsed ? "justify-center px-0 py-4" : "px-5 py-3",
          "hover:bg-black/5 dark:hover:bg-white/5"
        )}
        title={sidebarCollapsed ? group.label : undefined}
      >
        <span style={{ color: group.color }} className="shrink-0 transition-transform duration-200 hover:scale-110">
          {group.icon}
        </span>

        {!sidebarCollapsed && (
          <>
            <span
              className="text-[14px] font-semibold uppercase tracking-[0.08em] flex-1 truncate text-left"
              style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
            >
              {group.label}
            </span>

            <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5" style={{ color: "var(--muted)" }}>
              {filtered.length}
            </span>

            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-[var(--muted)]"
            >
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </>
        )}
      </button>

      {/* Items (Smooth Height Accordion) */}
      <AnimatePresence initial={false}>
        {isExpanded && !sidebarCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Smooth ease-out
            className="overflow-hidden"
          >
            <div className="pb-3 pt-1 px-3 flex flex-col gap-0.5">
              {filtered.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 rounded-md outline-none group focus-visible:ring-2 ring-[var(--accent)]"
                  >
                    {/* Liquid active background */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="inset-0 rounded-md"
                        style={{ background: "var(--accent-soft)" }}
                        transition={{
                          type: "spring",
                          bounce: 0.15, // Less bouncy, more liquid
                          duration: 0.5,
                        }}
                      />
                    )}

                    <div className="flex items-center gap-3 z-10 w-full transition-transform duration-200 group-hover:translate-x-1 group-active:scale-[0.98]">
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? "var(--accent)" : "var(--muted)",
                          opacity: isActive ? 1 : 0.4,
                          transform: isActive ? "scale(1.2)" : "scale(1)",
                        }}
                      />

                      <span
                        className="truncate text-[14px] transition-colors duration-200"
                        style={{
                          color: isActive ? "var(--text)" : "var(--muted)",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        <Highlighted text={item.label} query={query} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState("")

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (pathname.startsWith("/algorithms")) initial.add("algorithms")
    else if (pathname.startsWith("/documentation")) initial.add("documentation")
    else if (pathname.startsWith("/visualizer")) initial.add("visualizers")
    else initial.add("algorithms")
    return initial
  })

  const isSidebarPage =
    pathname.startsWith("/algorithms") ||
    pathname.startsWith("/documentation") ||
    pathname.startsWith("/visualizer")

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleGroupClick = (id: string) => {
    if (collapsed) setCollapsed(false)
    toggleGroup(id)
  }

  if (!isSidebarPage) return null

  const activeKey = pathname.split("/")[1] as keyof typeof NAV
  const activeGroup = NAV[activeKey]

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 280 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="shrink-0 flex flex-col h-full border-r bg-(--surface) border-(--border)"
    >
      {/* Search Header */}
      <div className={cn("p-3 w-full border-b flex items-center justify-between transition-all duration-300 border-(--border)", collapsed && "justify-center")}>
        {!collapsed ? (
          <div className="flex items-center justify-between">
            {/* Search Icon */}
            <div className="left-2 aspect-square h-9 flex items-center justify-center text-(--muted)">
              <svg className="h-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Topics"
              className="w-full bg-blue-800 h-9 pl-8 text-sm rounded-md outline-none transition-all duration-200"
              style={{ background: "var(--bg)", color: "var(--text)" }}
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className=" text-(--muted) h-9 aspect-square hover:text-(--text) transition-colors flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        ) : null}

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-full  aspect-square flex items-center justify-center rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5 text-(--muted) hover:text-(--text)",
            collapsed && "w-10 h-10" // slightly larger tap target when collapsed
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn("transition-transform duration-300", collapsed && "rotate-180")}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Nav Content */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide custom-scrollbar">
        {activeGroup && (
          <GroupSection
            group={activeGroup}
            isOpen={openGroups.has(activeGroup.id)}
            onToggle={() => handleGroupClick(activeGroup.id)}
            pathname={pathname}
            query={query}
            sidebarCollapsed={collapsed}
          />
        )}
      </nav>
    </motion.aside>
  )
}