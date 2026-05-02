const NAV = {
  algorithms: {
    id: "algorithms",
    label: "Algorithms",
    color: "#3B82F6",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="7" width="2" height="6" fill="currentColor" />
        <rect x="4.5" y="4" width="2" height="9" fill="currentColor" />
        <rect x="8" y="1" width="2" height="12" fill="currentColor" />
        <rect x="11.5" y="5" width="2" height="8" fill="currentColor" />
      </svg>
    ),
    items: [
      { label: "Arrays", href: "/algorithms/arrays" },
      { label: "Bit Manipulation", href: "/algorithms/bit_manipulation" },
      { label: "Dynamic Programming", href: "/algorithms/dynamic_programming" },
      { label: "Graphs", href: "/algorithms/graphs" },
      { label: "Greedy", href: "/algorithms/greedy" },
      { label: "Hash Maps", href: "/algorithms/hash_maps" },
      { label: "Heap", href: "/algorithms/heap" },
      { label: "Linked Lists", href: "/algorithms/linked_lists" },
      { label: "Queues", href: "/algorithms/queues" },
      { label: "Range Structures", href: "/algorithms/range_structures" },
      { label: "Recursion", href: "/algorithms/recursion" },
      { label: "Sorting", href: "/algorithms/sorting" },
      { label: "Stacks", href: "/algorithms/stacks" },
      { label: "Strings", href: "/algorithms/strings" },
      { label: "Trees", href: "/algorithms/trees" },
      { label: "Tries", href: "/algorithms/tries" },
    ],
  },
  documentation: {
    id: "documentation",
    label: "Documentation",
    color: "#1D9E75",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 2h7l3 3v7H2V2z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 2v3h3M4 7h6M4 9.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { label: "JavaScript", href: "/documentation/javascript" },
      { label: "PostgreSQL", href: "/documentation/postgresql" },
      { label: "React", href: "/documentation/react" },
      { label: "Tailwind CSS", href: "/documentation/tailwind_css" },
    ],
  },
  visualizer: {
    id: "visualizer",
    label: "Visualizer",
    color: "#7F77DD",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { label: "CodeChef", href: "/visualizer/codechef" },
      { label: "Codeforces", href: "/visualizer/codeforces" },
      { label: "LeetCode", href: "/visualizer/leetcode" },
    ],
  },
};

export { NAV, docsNav }