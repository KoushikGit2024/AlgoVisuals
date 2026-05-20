"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ─── Algorithm Definitions ────────────────────────────────────────────────────
// FIXED BUG-06: all hrefs now match actual folder names (plural snake_case)
const ALGORITHMS = [
  {
    name: "Arrays",
    href: "/algorithms/arrays",
    icon: "▦",
    gradient: "from-[#818CF8] to-[#6366F1]",
    desc: "Two pointers, sliding window, prefix sums",
    complexity: "O(n)",
    count: 12,
  },
  {
    name: "Sorting",
    href: "/algorithms/sorting",
    icon: "≋",
    gradient: "from-[#6366F1] to-[#A78BFA]",
    desc: "Bubble, merge, quick, heap, counting sort",
    complexity: "O(n log n)",
    count: 8,
    featured: true,
  },
  {
    name: "Graphs",
    href: "/algorithms/graphs",
    icon: "◉",
    gradient: "from-[#A78BFA] to-[#F472B6]",
    desc: "BFS, DFS, Dijkstra, Bellman-Ford, Floyd",
    complexity: "O(V + E)",
    count: 10,
  },
  {
    name: "Trees",
    href: "/algorithms/trees",
    icon: "⬡",
    gradient: "from-[#F472B6] to-[#FB923C]",
    desc: "BST, AVL, segment tree, traversals",
    complexity: "O(log n)",
    count: 9,
  },
  {
    name: "Dynamic Programming",
    href: "/algorithms/dynamic_programming",
    icon: "◈",
    gradient: "from-[#34D399] to-[#818CF8]",
    desc: "Memoization, tabulation, optimal substructure",
    complexity: "O(n²)",
    count: 14,
  },
  {
    name: "Linked Lists",
    href: "/algorithms/linked_lists",
    icon: "⬤→",
    gradient: "from-[#818CF8] to-[#34D399]",
    desc: "Reversal, cycle detection, merge, Floyd's",
    complexity: "O(n)",
    count: 7,
  },
  {
    name: "Stacks",
    href: "/algorithms/stacks",
    icon: "⬚",
    gradient: "from-[#34D399] to-[#6366F1]",
    desc: "Monotonic stack, bracket matching, next greater",
    complexity: "O(n)",
    count: 6,
  },
  {
    name: "Queues",
    href: "/algorithms/queues",
    icon: "⇢",
    gradient: "from-[#6366F1] to-[#F472B6]",
    desc: "Deque, sliding window max, BFS patterns",
    complexity: "O(n)",
    count: 5,
  },
  {
    name: "Hash Maps",
    href: "/algorithms/hash_maps",
    icon: "#",
    gradient: "from-[#F472B6] to-[#FB923C]",
    desc: "Frequency count, anagram, LRU cache",
    complexity: "O(1) avg",
    count: 8,
  },
  {
    name: "Heap",
    href: "/algorithms/heap",
    icon: "△",
    gradient: "from-[#FB923C] to-[#34D399]",
    desc: "Min-heap, max-heap, k-way merge, top-k",
    complexity: "O(log n)",
    count: 6,
  },
  {
    name: "Recursion",
    href: "/algorithms/recursion",
    icon: "∞",
    gradient: "from-[#34D399] to-[#A78BFA]",
    desc: "Backtracking, permutations, divide & conquer",
    complexity: "O(2ⁿ)",
    count: 9,
  },
  {
    name: "Strings",
    href: "/algorithms/strings",
    icon: "Aa",
    gradient: "from-[#A78BFA] to-[#818CF8]",
    desc: "KMP, Rabin-Karp, Z-algorithm, trie patterns",
    complexity: "O(n + m)",
    count: 10,
  },
  {
    name: "Tries",
    href: "/algorithms/tries",
    icon: "⌥",
    gradient: "from-[#818CF8] to-[#F472B6]",
    desc: "Prefix trees, autocomplete, word search",
    complexity: "O(m)",
    count: 5,
  },
  {
    name: "Greedy",
    href: "/algorithms/greedy",
    icon: "★",
    gradient: "from-[#F472B6] to-[#6366F1]",
    desc: "Interval scheduling, Huffman, activity selection",
    complexity: "O(n log n)",
    count: 7,
  },
  {
    name: "Bit Manipulation",
    href: "/algorithms/bit_manipulation",
    icon: "⊕",
    gradient: "from-[#6366F1] to-[#34D399]",
    desc: "XOR tricks, bitmasking, power of two",
    complexity: "O(1)",
    count: 6,
  },
  {
    name: "Range Structures",
    href: "/algorithms/range_structures",
    icon: "⊏⊐",
    gradient: "from-[#34D399] to-[#FB923C]",
    desc: "Segment trees, BIT/Fenwick, range queries",
    complexity: "O(log n)",
    count: 5,
  },
];

// ─── Algorithm Card ───────────────────────────────────────────────────────────
function AlgoCard({
  algo,
  index,
}: {
  algo: (typeof ALGORITHMS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={algo.href}
        className="group flex flex-col gap-4 p-5 rounded-2xl h-full transition-all duration-300"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "color-mix(in srgb, var(--accent) 40%, transparent)";
          el.style.boxShadow = "0 8px 32px var(--glow-soft)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Icon */}
        <div className="flex items-start justify-between">
          <div
            className={`w-11 h-11 flex items-center justify-center rounded-xl text-lg font-bold text-white bg-gradient-to-br ${algo.gradient}`}
          >
            {algo.icon}
          </div>
          {algo.featured && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                color: "var(--accent)",
                border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
              }}
            >
              Live
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1 transition-colors duration-150 group-hover:text-[var(--accent)]" style={{ color: "var(--text)" }}>
            {algo.name}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            {algo.desc}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <span
            className="text-[11px] font-mono px-2 py-0.5 rounded-md"
            style={{ background: "var(--surface-2)", color: "var(--muted)", fontFamily: "var(--font-geist-mono, monospace)" }}
          >
            {algo.complexity}
          </span>
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>
            {algo.count} problems
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AlgorithmsPage() {
  return (
    <div className="p-6 pb-16" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
          Algorithms
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {ALGORITHMS.length} categories &mdash; pick one to start visualizing.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ALGORITHMS.map((algo, i) => (
          <AlgoCard key={algo.href} algo={algo} index={i} />
        ))}
      </div>
    </div>
  );
}