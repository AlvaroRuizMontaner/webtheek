'use client' // Error components must be Client Components
 
import EmptyState from '@/components/empty-state/EmptyState'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="text-center py-20 flex flex-col">
      <div className="h-64">
        <EmptyState text="Algo ha fallado..." />
      </div>
      <button
      className='py-2 px-8 rounded-md bg-primary-300 text-white w-fit m-auto hover:bg-primary-500 mt-4u'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Prueba de nuevo
      </button>
    </div>
  )
}