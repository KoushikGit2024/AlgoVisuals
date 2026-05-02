"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState, useId } from 'react';
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Algorithms', href: '/algorithms' },
  { name: 'Documentation', href: '/documentation' },
  { name: 'Visualizer', href: '/visualizer' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // FIX: React's useId() includes colons (e.g., ":r0:").
  // Colons break SVG url(#) references. We must strip them.
  const rawId = useId().replace(/:/g, '');
  // console.log(useId())
  const brandGradId = `brand-${rawId}`;
  const lineGradId = `line-${rawId}`;
  const glowId = `glow-${rawId}`;

  // Handle mounting and theme initialization safely for SSR
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <nav
      // FIX: Added 'sticky' so top-0 actually works
      className="w-full h-14 top-0 z-50 flex justify-center px-4 py-4 bg-transparent custom-dashed-horizontal"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo */}
        <div className="h-full flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-tighter"
            style={{ color: "var(--text)" }}
          >
            <svg
              className="h-14"
              viewBox="0 0 350 110"
              preserveAspectRatio="xMinYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={brandGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>

                <linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.25" />
                </linearGradient>

                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Icon */}
              <g transform="translate(20,15)" filter={`url(#${glowId})`}>
                <g stroke={`url(#${lineGradId})`} strokeWidth="2" strokeLinecap="round">
                  <line x1="20" y1="35" x2="50" y2="12" />
                  <line x1="50" y1="12" x2="80" y2="35" />
                  <line x1="80" y1="35" x2="65" y2="68" />
                  <line x1="65" y1="68" x2="35" y2="68" />
                  <line x1="35" y1="68" x2="20" y2="35" />
                  <line x1="50" y1="45" x2="20" y2="35" />
                  <line x1="50" y1="45" x2="50" y2="12" />
                  <line x1="50" y1="45" x2="80" y2="35" />
                </g>

                <circle cx="20" cy="35" r="4.5" fill="#6366F1" opacity="0.9" />
                <circle cx="50" cy="12" r="6.5" fill={`url(#${brandGradId})`} />
                <circle cx="80" cy="35" r="4.5" fill="#22C55E" opacity="0.9" />
                <circle cx="65" cy="68" r="3.8" fill="#4ADE80" opacity="0.8" />
                <circle cx="35" cy="68" r="3.8" fill="#818CF8" opacity="0.8" />
                <circle cx="50" cy="45" r="6" fill={`url(#${brandGradId})`} />
              </g>

              {/* Text */}
              <text
                x="130"
                y="58"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="30"
                fontWeight="700"
              >
                {/* FIX: Safe color hydration preserving original hex codes */}
                <tspan fill={mounted ? (theme === "dark" ? "#f1f5f4" : "#0F172A") : "#f1f5f4"}>
                  Algo{" "}
                </tspan>
                <tspan fill={`url(#${brandGradId})`}>Visuals</tspan>
              </text>

              {/* Tagline */}
              <text
                x="130"
                y="80"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="10"
                fontWeight="600"
                fill={mounted ? (theme === "dark" ? "#f1f5f4" : "#0F172A") : "#f1f5f4"}
                letterSpacing="2"
              >
                SEE ALGORITHMS EVOLVE
              </text>
            </svg>
          </Link>
        </div>
        <div className="flex w-3/4 max-w-2xl bg-red-400 h-full items-center justify-end px-2">
          <div className="flex items-center justify-around w-4/5 h-full max-w-2xl">
            <div className="flex items-center justify-between gap-1 w-2/3 h-full">
              {navItems.map((item) => {
                const isActive = pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative px-8 py-6 text-xs font-bold uppercase tracking-widest transition-none',
                      isActive
                        ? 'text-white dark:text-black'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-bubble"
                        className="absolute -inset-2 z-0 bg-zinc-900 dark:bg-zinc-100 rounded-md p-4"
                        transition={{
                          type: 'spring',
                          stiffness: 100,
                          damping: 10,
                          mass: 0.2,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center border transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              style={{
                borderColor: "var(--border)",
                color: "var(--muted)",
                background: "transparent",
              }}
              aria-label="Toggle Theme"
              data-lpignore="true"
              suppressHydrationWarning={true}
            >
              {mounted ? (
                theme === "light" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )
              ) : (
                <div className="w-[14px] h-[14px]" />
              )}
            </button>  
            <div className="hamberger">
              <Menu size={24}/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}