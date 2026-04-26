import React from 'react'
import Link from 'next/link'

const AlgoDirector = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
        <Link href="/algorithms/arrays">Arrays</Link>
        <Link href="/algorithms/bit_manupulation">Bit Manupulation</Link>
        <Link href="/algorithms/dinamic_programming">Dinamic Programming</Link>
        <Link href="/algorithms/graph">Graph</Link>
        <Link href="/algorithms/greedy">Greedy</Link>
        <Link href="/algorithms/hash_map">Hash Map</Link>
        <Link href="/algorithms/heap">Heap</Link>
        <Link href="/algorithms/linked_list">Linked List</Link>
        <Link href="/algorithms/queue">Queue</Link>
        <Link href="/algorithms/recursion">Recursion</Link>
        <Link href="/algorithms/range_structures">Range Structures</Link>
        <Link href="/algorithms/sorting">Sorting</Link>
        <Link href="/algorithms/stack">Stack</Link>
        <Link href="/algorithms/string">String</Link>
        <Link href="/algorithms/tree">Tree</Link>
        <Link href="/algorithms/trie">Trie</Link>
    </div>
  )
}

export default AlgoDirector