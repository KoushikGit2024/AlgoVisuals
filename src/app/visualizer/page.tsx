import React from 'react'
import Link from 'next/link'
const VisualizerDirector = () => {
  return (
    <div>
        <Link href="/visualizers/leetcode">LeetCode</Link>
        <Link href="/visualizers/codeforces">Codeforces</Link>
        <Link href="/visualizers/codechef">Codechef</Link>
    </div>
  )
}

export default VisualizerDirector