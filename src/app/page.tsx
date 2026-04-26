import React from 'react'
import Link from 'next/link'
const Home = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <Link href="/algorithms">Algorithms</Link>
      <Link href="/documentations">Documentations</Link>
      <Link href="/visualizers">Visualizers</Link>
    </div>
  )
}

export default Home