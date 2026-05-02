'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-pink-4000">

      {/* Background */}
      <div className="absolute flex inset-0 -z-10 bg-linear-to-br from-indigo-100 via-white to-cyan-100" />

      <div className="bg-primary text-center px-6 flex flex-col items-center justify-center gap-4">

        <h1 className="text-7xl font-bold tracking-tight bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page not found
        </h2>

        <p className="mt-2 text-gray-600">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">

          <Link
            href="/"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Go Home
          </Link>

          <Link
            href="/docs"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Open Docs
          </Link>

        </div>

      </div>
    </div>
  )
}