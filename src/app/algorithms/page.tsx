'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  name: string;
  redirect: string;
  active?: boolean;
};

const DemoCard = ({ name, redirect, active }: Props) => {
  return (
    <div
      className={cn(
        // base
        "flex flex-col items-center justify-around w-56 p-4 rounded-2xl shadow-md transition",

        // theme
        "bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100",

        // interaction
        "hover:shadow-xl hover:-translate-y-1",

        // state variants
        active && "ring-2 ring-blue-500 dark:ring-blue-400"
      )}
    >
      {/* Image Section */}
      <div
        className={cn(
          "w-40 h-40 rounded-lg flex items-center justify-center",
          "bg-gray-200 dark:bg-gray-700"
        )}
      >
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {name}
        </span>
      </div>

      {/* Info Section */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <h3 className="font-semibold text-lg text-center">
          {name}
        </h3>

        <Link
          href={redirect}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition",
            "bg-blue-500 text-white hover:bg-blue-600",
            "dark:bg-blue-600 dark:hover:bg-blue-500"
          )}
        >
          View Demo
        </Link>
      </div>
    </div>
  )
}

const AlgoDirector = () => {
  const algorithms = [
    { name: "Arrays", redirect: "/algorithms/arrays" },
    { name: "Bit Manipulation", redirect: "/algorithms/bit_manipulation" },
    { name: "Dynamic Programming", redirect: "/algorithms/dynamic_programming" },
    { name: "Graph", redirect: "/algorithms/graph" },
    { name: "Greedy", redirect: "/algorithms/greedy" },
    { name: "Hash Map", redirect: "/algorithms/hash_map" },
    { name: "Heap", redirect: "/algorithms/heap" },
    { name: "Linked List", redirect: "/algorithms/linked_list" },
    { name: "Queue", redirect: "/algorithms/queue" },
    { name: "Recursion", redirect: "/algorithms/recursion" },
    { name: "Range Structures", redirect: "/algorithms/range_structures" },
    { name: "Sorting", redirect: "/algorithms/sorting" },
    { name: "Stack", redirect: "/algorithms/stack" },
    { name: "String", redirect: "/algorithms/string" },
    { name: "Tree", redirect: "/algorithms/tree" },
    { name: "Trie", redirect: "/algorithms/trie" }
  ]

  return (
    <div className="flex flex-wrap justify-center gap-6 pt-10 px-4">
      {algorithms.map((algo, index) => (
        <DemoCard
          key={index}
          name={algo.name}
          redirect={algo.redirect}
        />
      ))}
      {/* <SortingVisualizer/> */}
    </div>
  )
}
export default AlgoDirector