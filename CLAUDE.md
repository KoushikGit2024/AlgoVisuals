# AlgoVisuals — CLAUDE.md

> **AI Agent Context File** — Read this before touching any file.
> This document describes the full project state, conventions, active bugs, design migration plan, and task roadmap for the AlgoVisuals codebase.

---

## 0. Project Identity

| Field | Value |
|---|---|
| **Name** | AlgoVisuals |
| **Tagline** | See Algorithms Evolve |
| **Purpose** | Interactive DSA (Data Structures & Algorithms) visualization platform |
| **Audience** | Students, developers learning CS fundamentals |
| **Status** | Active development — early stage, many pages are stubs |

---

## 1. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.2.4 |
| UI Library | **React** | 19.2.4 |
| Language | **TypeScript** | ^5 |
| Styling | **Tailwind CSS v4** | ^4.2.4 |
| Animation | **Framer Motion** | ^12.38.0 |
| Icons | **Lucide React** | ^1.14.0 |
| Utilities | `clsx`, `tailwind-merge` | latest |
| Fonts | Geist Sans, Geist Mono (via `next/font/google`) | — |
| Build | Next.js built-in (Turbopack) | — |
| Linting | ESLint + `eslint-config-next` | — |

> ⚠️ **Tailwind v4 uses a completely different config model.** There is NO `tailwind.config.js`. All theme tokens live inside `@theme {}` blocks in `globals.css`. Do NOT attempt to create a `tailwind.config.js`.

---

## 2. File & Folder Structure

```
AlgoVisuals/
├── CLAUDE.md                          ← This file
├── AGENTS.md                          ← Agent rules (references this file)
├── README.md
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.js
├── eslint.config.mjs
│
├── public/
│   └── algologo.txt                   ← ASCII logo placeholder
│
└── src/
    ├── app/
    │   ├── layout.tsx                 ← Root layout: Navbar + Sidebar + <main>
    │   ├── page.tsx                   ← Landing page (Hero, Features, CTABanner, Footer)
    │   ├── globals.css                ← Global styles + Tailwind v4 theme + CSS tokens
    │   ├── page.module.css            ← (currently unused — can be deleted)
    │   ├── error.tsx                  ← Global error boundary
    │   ├── not-found.tsx              ← 404 page
    │   │
    │   ├── algorithms/
    │   │   ├── layout.tsx             ← Algorithms layout wrapper
    │   │   ├── page.tsx               ← Algorithms directory (grid of DemoCards)
    │   │   ├── arrays/page.tsx
    │   │   ├── bit_manipulation/page.tsx
    │   │   ├── dynamic_programming/page.tsx
    │   │   ├── graphs/page.tsx
    │   │   ├── greedy/page.tsx
    │   │   ├── hash_maps/page.tsx
    │   │   ├── heap/page.tsx
    │   │   ├── linked_lists/page.tsx
    │   │   ├── queues/page.tsx
    │   │   ├── range_structures/page.tsx
    │   │   ├── recursion/page.tsx
    │   │   ├── sorting/page.tsx
    │   │   ├── stacks/page.tsx
    │   │   ├── strings/page.tsx
    │   │   ├── trees/page.tsx
    │   │   └── tries/page.tsx
    │   │
    │   ├── documentation/
    │   │   ├── page.tsx
    │   │   ├── javascript/page.tsx
    │   │   ├── postgre/page.tsx        ← ⚠️ Route is /postgre but NAV says /postgresql — MISMATCH
    │   │   ├── react/page.tsx
    │   │   └── tailwind/page.tsx       ← ⚠️ Route is /tailwind but NAV says /tailwind_css — MISMATCH
    │   │
    │   └── visualizer/
    │       ├── page.tsx               ← ⚠️ Links to /visualizers/* but routes are /visualizer/* — MISMATCH
    │       ├── codechef/
    │       │   ├── data.ts
    │       │   └── page.tsx
    │       ├── codeforces/
    │       │   ├── data.ts
    │       │   └── page.tsx
    │       └── leetcode/
    │           ├── data.ts
    │           └── page.tsx
    │
    ├── components/
    │   ├── Navbar.tsx                 ← Theme toggle, nav links, logo SVG
    │   ├── Sidebar.tsx                ← Collapsible sidebar with search + accordion
    │   ├── PanelLayout.tsx            ← Drag-resizable 3-panel layout
    │   └── SortingVisualizer.tsx      ← Frame-based sorting engine + playback hook
    │
    └── lib/
        ├── docsNav.js                 ← NAV data object — ⚠️ exports `docsNav` but never defines it
        └── utils.js                   ← `cn()` utility (clsx + tailwind-merge)
```

---

## 3. CSS Design Token System

All theme values are CSS custom properties toggled via `data-theme` attribute on `<html>`.

### Current Tokens (in `globals.css`)

```css
/* Light mode */
--bg: #F8FAFC
--surface: #FFFFFF
--text: #0F172A
--muted: #64748B
--border: #787878
--accent: #3B82F6
--bar: #CBD5E1
--grid-line: rgba(148, 163, 184, 0.18)

/* Dark mode */
--bg: #0B0F14
--surface: #111827
--text: #E5E7EB
--muted: #9CA3AF
--border: #f3e1f5      ← ⚠️ Light purple border in dark mode — looks off
--accent: #22D3EE
--bar: #1E293B
--grid-line: rgba(148, 163, 184, 0.07)
```

### Theme Management
- Theme stored in `localStorage` as `"light"` | `"dark"`
- Applied via `document.documentElement.setAttribute('data-theme', theme)` in `Navbar.tsx`
- Default: `"dark"`
- SSR-safe: Navbar uses `mounted` state to defer hydration

---

## 4. Active Bugs (Fix These First)

### BUG-01 — `docsNav.js` exports undefined variable
**File:** `src/lib/docsNav.js`
**Issue:** `export { NAV, docsNav }` — `docsNav` is never declared. Will throw at runtime.
**Fix:** Either remove `docsNav` from the export, or define the variable.

### BUG-02 — Navbar has debug `bg-red-400` color
**File:** `src/components/Navbar.tsx`
**Line:** `<div className="flex w-3/4 max-w-2xl bg-red-400 h-full items-center justify-end px-2">`
**Fix:** Remove `bg-red-400` from the className.

### BUG-03 — Sidebar search input has debug `bg-blue-800` color
**File:** `src/components/Sidebar.tsx`
**Line:** `<input ... className="w-full bg-blue-800 h-9 pl-8 ..." />`
**Fix:** Remove `bg-blue-800`. The input already has `style={{ background: "var(--bg)" }}`.

### BUG-04 — Visualizer page uses wrong route prefix
**File:** `src/app/visualizer/page.tsx`
**Issue:** Links go to `/visualizers/leetcode` but the actual routes are `/visualizer/leetcode`.
**Fix:** Change all `/visualizers/` to `/visualizer/`.

### BUG-05 — Documentation NAV hrefs mismatch actual folder routes
**File:** `src/lib/docsNav.js`
**Issue:**
- NAV says `/documentation/postgresql` but folder is `postgre/`
- NAV says `/documentation/tailwind_css` but folder is `tailwind/`
**Fix:** Either rename the folders or update NAV hrefs to match.

### BUG-06 — Algorithms page DemoCard routes don't match actual routes
**File:** `src/app/algorithms/page.tsx`
**Issue:** Cards link to `/algorithms/graph`, `/algorithms/linked_list` etc. (singular) but actual routes are `/algorithms/graphs`, `/algorithms/linked_lists` (plural).
**Fix:** Update all redirect paths in the `algorithms` array to match actual folder names.

### BUG-07 — `PanelLayout.tsx` uses `localStorage` directly (SSR crash risk)
**File:** `src/components/PanelLayout.tsx`
**Issue:** `localStorage.getItem(key)` inside `useEffect` — this is fine. But the initial `useState` doesn't guard against server-side execution.
**Fix:** Already wrapped in `useEffect` — this is actually OK. Mark as verified.

### BUG-08 — Navbar hamburger `<Menu>` has no mobile functionality
**File:** `src/components/Navbar.tsx`
**Issue:** `<Menu size={24}/>` renders but has no `onClick` or mobile drawer.
**Fix:** Wire up a mobile drawer state, or hide the icon until mobile drawer is built.

### BUG-09 — Hero section has `mb-55` (non-standard Tailwind class)
**File:** `src/app/page.tsx`
**Issue:** `className="... mb-55"` — Tailwind v4 may not generate this class by default.
**Fix:** Use `mb-56` or a custom style. Also remove the commented-out `minHeight` inline style.

### BUG-10 — `SortingVisualizer.tsx` exists but is never used
**File:** `src/components/SortingVisualizer.tsx`
**Issue:** Fully implemented frame-based bubble sort visualizer commented out in `algorithms/page.tsx`.
**Fix:** Wire up to `src/app/algorithms/sorting/page.tsx`.

---

## 5. Design Migration: Brutalism → Smooth Aesthetic

### What to Remove (Brutalist Signatures)

```css
/* DELETE THIS BLOCK from globals.css — it is the core of brutalism */
*, *::before, *::after {
  border-radius: 0 !important;   /* ← kills ALL rounding globally */
}
```

- Remove all `border-radius: 0 !important` from the global reset
- Remove the hero's `bg-amber-400` (hardcoded yellow brutalist background)
- Replace `uppercase tracking-[0.18em]` mono labels with normal-weight labels where appropriate
- Soften sharp border-only buttons into rounded pill/subtle buttons
- Remove `UPPER_SNAKE_CASE` text labeling everywhere (keep only code/mono contexts)

### New Design System — "Luminous Dark"

High-aesthetic, smooth, modern. Inspired by Linear, Vercel, and Resend — but with more color personality.

#### Color Palette

```css
/* === LIGHT MODE === */
--bg:        #F5F4FF;    /* Warm lavender white */
--surface:   #FFFFFF;
--surface-2: #F0EFFE;    /* Card/panel tint */
--text:      #1A1523;    /* Near-black with purple warmth */
--muted:     #6B6787;    /* Purple-grey muted */
--border:    #E2DEFF;    /* Soft lavender border */
--accent:    #6366F1;    /* Indigo primary */
--accent-2:  #8B5CF6;    /* Violet secondary */
--accent-3:  #EC4899;    /* Pink highlight */
--success:   #10B981;    /* Emerald */
--bar:       #C4BFFF;    /* Lavender bar */
--glow:      rgba(99, 102, 241, 0.15);

/* === DARK MODE === */
--bg:        #0D0B14;    /* Deep purple-black */
--surface:   #13101F;    /* Dark surface */
--surface-2: #1A1630;    /* Panel / card bg */
--text:      #EDE9FF;    /* Warm white */
--muted:     #8878B0;    /* Purple-grey */
--border:    #2A2445;    /* Dark lavender border */
--accent:    #818CF8;    /* Soft indigo (lighter for dark mode) */
--accent-2:  #A78BFA;    /* Soft violet */
--accent-3:  #F472B6;    /* Soft pink */
--success:   #34D399;
--bar:       #3730A3;    /* Deep indigo bar */
--glow:      rgba(129, 140, 248, 0.2);
```

#### Typography

```css
/* Keep Geist Sans + Geist Mono — they're excellent */
/* Font hierarchy: */
--font-display: 'Geist', sans-serif;
--font-mono:    'Geist Mono', monospace;

/* Font scale guidance: */
/* Hero h1:    text-5xl → text-7xl, font-bold (not black), tracking-tight */
/* Section h2: text-3xl, font-semibold */
/* Body:       text-base, leading-relaxed, font-normal */
/* Label/tag:  text-xs, font-medium, tracking-wide (NOT uppercase) */
/* Code/mono:  font-mono, text-sm */
```

#### Spacing & Shape

```css
/* Border radius scale (replaces 0-everywhere) */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;  /* pills */

/* Shadows */
--shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
--shadow-md:  0 4px 16px rgba(13,11,20,0.12);
--shadow-glow: 0 0 24px var(--glow);
```

#### Component Redesign Guide

**Buttons:**
```tsx
// Primary — solid with glow on hover
className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-medium
           shadow-[0_0_0_0_var(--glow)] hover:shadow-[0_0_20px_4px_var(--glow)]
           transition-all duration-300"

// Secondary — ghost with border
className="px-5 py-2.5 rounded-full border border-[var(--border)] text-[var(--text)]
           text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]
           transition-colors duration-200"
```

**Cards/Feature Boxes:**
```tsx
// Replace sharp grid with rounded cards
className="rounded-[var(--radius-lg)] border border-[var(--border)]
           bg-[var(--surface-2)] p-6 backdrop-blur-sm
           hover:border-[var(--accent)] hover:shadow-[var(--shadow-glow)]
           transition-all duration-300"
```

**Navbar:**
```tsx
// Frosted glass navbar
className="w-full h-14 sticky top-0 z-50 px-6
           backdrop-blur-xl bg-[var(--bg)]/80
           border-b border-[var(--border)]"

// Nav links — pill indicator (not full-height block)
// Active: rounded-full bg with accent color, not dark/light swap
```

**Hero Section:**
```tsx
// Replace amber-400 flat background with gradient mesh
background: "radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow), transparent)"

// Keep the grid lines — they look great — just soften them
// Keep SortingBars card — add rounded corners + glow shadow
```

**Sidebar:**
```tsx
// Smooth sidebar — add backdrop blur, rounded active pills
// Remove sharp borders between sections, use subtle dividers
```

---

## 6. Component Architecture Notes

### Root Layout (`src/app/layout.tsx`)
- Renders: `<Navbar>` at top, then `<Sidebar>` + `<main>` side by side
- Sidebar only renders on `/algorithms/*`, `/documentation/*`, `/visualizer/*` paths
- Landing page (`/`) shows no sidebar — full width

### Navbar (`src/components/Navbar.tsx`)
- Handles theme (light/dark) — stores in `localStorage`, applies `data-theme` to `<html>`
- Uses `useId()` for stable SVG gradient IDs (avoids SSR hydration mismatch)
- `mounted` state prevents hydration flash on theme icon
- **Known issues:** Mobile hamburger is non-functional; nav container has debug `bg-red-400`

### Sidebar (`src/components/Sidebar.tsx`)
- Collapsible (animates width via Framer Motion spring)
- Search filters nav items in real time
- Accordion groups from `NAV` in `src/lib/docsNav.js`
- Shows only the group relevant to current route section

### PanelLayout (`src/components/PanelLayout.tsx`)
- Drag-resizable left + optional right panels around a main content area
- Uses `requestAnimationFrame` for 60fps dragging
- Snap points: `[60, 260, 420]` px
- Velocity-based snap on release
- **Not yet used** in any page — designed for future algorithm detail pages

### SortingVisualizer (`src/components/SortingVisualizer.tsx`)
- Frame-based architecture: algorithm engine generates all frames upfront
- `useVisualizer` hook handles playback (play/pause/speed)
- Currently only implements Bubble Sort frames
- **Extend by:** adding `getMergeSortFrames`, `getQuickSortFrames` etc.

---

## 7. Planned Features / Roadmap

### Phase 1 — Foundation Fixes (Do This Now)
- [ ] Fix all BUG-01 through BUG-10 above
- [ ] Implement design migration (remove brutalist global reset, apply new tokens)
- [ ] Fix Navbar mobile hamburger (mobile drawer)
- [ ] Make all algorithm sub-pages use `PanelLayout` with code + visualizer panels

### Phase 2 — Algorithm Pages
- [ ] Wire `SortingVisualizer` into `/algorithms/sorting`
- [ ] Build array visualizer for `/algorithms/arrays`
- [ ] Build linked list visualizer
- [ ] Build BST/tree visualizer
- [ ] Build graph traversal (BFS/DFS) visualizer
- [ ] Each page should have: description panel (left), visualizer (center), code panel (right)

### Phase 3 — Competitive Visualizer
- [ ] LeetCode page: show problem stats, heatmap, submission data
- [ ] Codeforces page: rating graph, contest history
- [ ] CodeChef page: similar to above
- [ ] All use data from `data.ts` files in each visualizer subfolder

### Phase 4 — Documentation Pages
- [ ] JavaScript reference page
- [ ] PostgreSQL reference page
- [ ] React reference page
- [ ] Tailwind CSS reference page
- [ ] Use a consistent layout: search at top, content with anchored headings

---

## 8. Conventions & Rules

### Imports
```ts
// Always use path aliases
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
// NOT: import Navbar from '../../components/Navbar'
```

### CSS / Styling
- **Theme colors ALWAYS via CSS variables:** `style={{ color: "var(--accent)" }}` or `text-[var(--accent)]`
- **Never hardcode hex colors** in component files (exceptions: the Navbar SVG gradients)
- **Never use Tailwind dark: prefix** — theme switching is via `data-theme` attribute, not `prefers-color-scheme`
- **Tailwind v4:** No `theme()` function in CSS. Use `var(--color-*)` instead.

### Components
- All interactive components must be `"use client"`
- Page components that are purely static can omit the directive (RSC default)
- Always use `framer-motion` for animated transitions, never CSS `@keyframes` directly
- Use `cn()` from `@/lib/utils` for conditional classNames

### File Naming
- Pages: `page.tsx` (Next.js App Router convention)
- Components: `PascalCase.tsx`
- Utilities/data: `camelCase.ts` or `camelCase.js`
- Route segments: `snake_case` folders (follow existing pattern)

---

## 9. Color Palette Quick Reference

```
Indigo Primary:  #6366F1  (light) / #818CF8  (dark)
Violet Accent:   #8B5CF6  (light) / #A78BFA  (dark)
Pink Highlight:  #EC4899  (light) / #F472B6  (dark)
Emerald Success: #10B981  (light) / #34D399  (dark)
Background:      #F5F4FF  (light) / #0D0B14  (dark)
Surface:         #FFFFFF  (light) / #13101F  (dark)
Card BG:         #F0EFFE  (light) / #1A1630  (dark)
Text:            #1A1523  (light) / #EDE9FF  (dark)
Muted:           #6B6787  (light) / #8878B0  (dark)
Border:          #E2DEFF  (light) / #2A2445  (dark)
```

---

## 10. Running the Project

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint
npm run lint
```

---

*Last updated: CLAUDE.md v1.0 — Generated from full codebase audit*