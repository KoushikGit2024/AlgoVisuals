"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// ─── Constants ────────────────────────────────────────────────────────────────
const BARS = [42, 18, 67, 31, 85, 24, 58, 73, 12, 90, 47, 36, 61, 79, 28]

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="10" width="3" height="8" fill="currentColor" />
        <rect x="7" y="6" width="3" height="12" fill="currentColor" />
        <rect x="12" y="2" width="3" height="16" fill="currentColor" />
        <rect x="17" y="8" width="3" height="10" fill="currentColor" />
      </svg>
    ),
    title: "Step-by-Step Execution",
    desc: "Pause, rewind, and advance through each operation. Full control over execution speed.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Complexity Analysis",
    desc: "Real-time Big-O notation display. Time and space complexity for every algorithm.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 3h14v14H3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8h14M8 3v14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Custom Input",
    desc: "Load your own arrays and graphs. Test edge cases and pathological inputs instantly.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="4" cy="4" r="2" fill="currentColor" />
        <circle cx="16" cy="4" r="2" fill="currentColor" />
        <circle cx="4" cy="16" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
        <path d="M4 4l6 6M16 4l-6 6M4 16l6-6M16 16l-6-6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    title: "Graph Traversals",
    desc: "Visualize DFS, BFS, Dijkstra, and more on interactive, editable graph canvases.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 18l4-8 4 4 4-6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
      </svg>
    ),
    title: "Side-by-Side Compare",
    desc: "Run two algorithms simultaneously. Compare performance on identical datasets.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12v12H4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h6M7 12h4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Annotated Code",
    desc: "Each visual step highlights the corresponding code line. Learn by seeing and reading.",
  },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

function SortingBars() {
  const [bars, setBars] = useState(BARS)
  const [active, setActive] = useState<[number, number]>([-1, -1])
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!)

  useEffect(() => {
    let arr = [...BARS]
    let steps: { arr: number[]; a: number; b: number }[] = []

    const tmp = [...arr]
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp.length - i - 1; j++) {
        steps.push({ arr: [...tmp], a: j, b: j + 1 })
        if (tmp[j] > tmp[j + 1]) {
          ;[tmp[j], tmp[j + 1]] = [tmp[j + 1], tmp[j]]
        }
      }
    }
    steps.push({ arr: [...tmp], a: -1, b: -1 })

    let idx = 0
    const run = () => {
      if (idx >= steps.length) {
        timeoutRef.current = setTimeout(() => {
          setBars(BARS)
          setActive([-1, -1])
          idx = 0
          timeoutRef.current = setTimeout(run, 800)
        }, 1200)
        return
      }
      const s = steps[idx++]
      setBars(s.arr)
      setActive([s.a, s.b])
      timeoutRef.current = setTimeout(run, 38)
    }

    timeoutRef.current = setTimeout(run, 600)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const max = Math.max(...bars)

  return (
    <div className="flex items-end gap-[3px] h-28" aria-hidden>
      {bars.map((h, i) => {
        const isActive = i === active[0] || i === active[1]
        return (
          <motion.div
            key={i}
            animate={{ height: `${(h / max) * 100}%` }}
            transition={{ type: "spring", stiffness: 900, damping: 40 }}
            className="w-[14px] flex-shrink-0"
            style={{ background: isActive ? "var(--accent)" : "var(--bar)" }}
          />
        )
      })}
    </div>
  )
}

function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden  bg-amber-400 mb-55"
      // style={{ minHeight: "calc(100vh - 56px) !important" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />

      {/* Content */}
      <div className="relative w-full px-6 pt-16 pb-12 md:pt-24 md:pb-20 
                      flex flex-col lg:flex-row items-start gap-10 md:gap-16">
        {/* Left text block */}
        <div className="flex-1 w-full min-w-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36 }}
            className="inline-flex items-center gap-2 border px-3 py-1.5 mb-8"
            style={{
              borderColor: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            <span className="w-1.5 h-1.5" style={{ background: "var(--accent)" }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              Interactive Learning
            </span>
          </motion.div>

          {/* Headline – responsive font sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.94] tracking-[-0.03em] mb-6"
            style={{ color: "var(--text)" }}
          >
            See
            <br />
            Algorithms
            <br />
            <span style={{ color: "var(--accent)" }}>Evolve.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.14 }}
            className="text-base leading-relaxed mb-10"
            style={{ color: "var(--muted)" }}
          >
            Experience algorithms as they execute—not just as code, but as dynamic systems. Step through sorting, searching, and graph traversals interactively, control the pace of execution, and watch how every operation transforms the data. Gain intuitive insights into performance, efficiency, and complexity through clear, real-time visual feedback.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.22 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-all border group"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                borderColor: "var(--accent)",
                fontFamily: "var(--font-mono)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "transparent"
                ;(e.currentTarget as HTMLElement).style.color = "var(--accent)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "var(--accent)"
                ;(e.currentTarget as HTMLElement).style.color = "var(--bg)"
              }}
            >
              Start Visualizing
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-all border"
              style={{
                color: "var(--text)",
                borderColor: "var(--border)",
                background: "transparent",
                fontFamily: "var(--font-mono)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"
                ;(e.currentTarget as HTMLElement).style.color = "var(--accent)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
                ;(e.currentTarget as HTMLElement).style.color = "var(--text)"
              }}
            >
              View Demo
            </a>
          </motion.div>

          {/* Stats – wraps on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.34 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { val: "40+", label: "Algorithms" },
              { val: "6", label: "Categories" },
              { val: "60fps", label: "Animation" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black" style={{ color: "var(--text)" }}>{s.val}</div>
                <div className="text-xs uppercase tracking-[0.14em] mt-0.5" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual card – now visible from md+, full width on mobile, side-by-side on lg */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.48, delay: 0.18 }}
          className="flex flex-col w-full md:w-[380px] lg:w-[420px] flex-shrink-0 border mt-8 md:mt-0"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                bubble_sort.ts
              </span>
            </div>
            <div className="flex gap-1.5">
              {["#EF4444", "#EAB308", "#22C55E"].map((c) => (
                <span key={c} className="w-2.5 h-2.5" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Sorting bars */}
          <div className="px-5 pt-6 pb-2">
            <SortingBars />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
            {["⏮", "⏸", "⏭"].map((icon) => (
              <button
                key={icon}
                className="w-8 h-8 flex items-center justify-center border text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--muted)", background: "transparent" }}
              >
                {icon}
              </button>
            ))}
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs font-mono" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
              O(n²)
            </span>
          </div>

          {/* Code snippet */}
          <div
            className="px-5 py-4 font-mono text-xs leading-relaxed border-t"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              background: "color-mix(in srgb, var(--bg) 50%, transparent)",
            }}
          >
            <span style={{ color: "var(--accent)" }}>for</span> (i = 0; i &lt; n; i++) {"{"}
            <br />
            &nbsp;&nbsp;<span style={{ color: "var(--accent)" }}>for</span> (j = 0; j &lt; n-i; j++) {"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#22C55E" }}>swap</span>(arr[j], arr[j+1])
            <br />
            &nbsp;&nbsp;{"}"}
            <br />
            {"}"}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="w-full px-6 py-24">
      {/* Section header */}
      <div className="border-b pb-10 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4" style={{ borderColor: "var(--border)" }}>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            — Capabilities
          </div>
          <h2 className="text-4xl font-black tracking-[-0.02em]" style={{ color: "var(--text)" }}>
            Built for clarity.
          </h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Every feature designed around one goal: making algorithmic thinking visible and intuitive.
        </p>
      </div>

      {/* Feature grid – clean gap on mobile, seamless border gap on larger screens */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px"
        style={{ background: "var(--border)" }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.32, delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="group p-8 flex flex-col gap-4 transition-colors cursor-default"
            style={{ background: "var(--surface)" }}
          >
            <div className="w-10 h-10 flex items-center justify-center border transition-colors" style={{ borderColor: "var(--border)", color: "var(--accent)" }}>
              {f.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </div>
            <div className="mt-auto h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: "var(--accent)" }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CTABanner() {
  return (
    <section className="w-full px-6 pb-24">
      <div
        className="border px-6 sm:px-10 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 6%, transparent)" }}
      >
        <div>
          <h2 className="text-3xl font-black tracking-[-0.02em] mb-2" style={{ color: "var(--text)" }}>
            Ready to visualize?
          </h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            No account required. Open in your browser. Free forever.
          </p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] border flex-shrink-0 transition-all group"
          style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "var(--bg)", fontFamily: "var(--font-mono)" }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = "transparent"
            ;(e.currentTarget as HTMLElement).style.color = "var(--accent)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = "var(--accent)"
            ;(e.currentTarget as HTMLElement).style.color = "var(--bg)"
          }}
        >
          Launch AlgoVisuals
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M2 7h10M8 4l4 3-4 3" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="w-full px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          AlgoVisuals — See Algorithms Think
        </div>
        <div className="flex gap-6">
          {["GitHub", "Twitter", "Discord", "Docs"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs uppercase tracking-[0.1em] transition-colors"
              style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-xs" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} AlgoVisuals
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page Export ─────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="relative w-full" style={{ background: "var(--bg)", minHeight: "100%" }}>
      <Hero />
      <Features />
      <CTABanner />
      <Footer />
    </div>
  )
}