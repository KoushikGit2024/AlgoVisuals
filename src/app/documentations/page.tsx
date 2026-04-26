import React from 'react'
import Link from 'next/link'
const DocDirector = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
        <Link href="/documentations/javascript">JavaScript</Link>
        <Link href="/documentations/postgre">PostgreSQL</Link>
        <Link href="/documentations/tailwind">Tailwind CSS</Link>
    </div>
  )
}

export default DocDirector