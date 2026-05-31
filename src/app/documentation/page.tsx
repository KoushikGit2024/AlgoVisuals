import React from 'react'
import Link from 'next/link'
const DocDirector = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
        <Link href="/documentation/javascript">JavaScript</Link>
        <Link href="/documentation/postgresql">PostgreSQL</Link>
        <Link href="/documentation/tailwind">Tailwind CSS</Link>
    </div>
  )
}

export default DocDirector