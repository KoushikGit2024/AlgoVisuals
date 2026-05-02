'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {error.message || 'An unexpected error occurred.'}
      </p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
      >
        Try again
      </button>
    </div>
  )
}