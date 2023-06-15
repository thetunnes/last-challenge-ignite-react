'use client'

import { useEffect, useState } from 'react'

interface InfiniteScrollProps {
  fetchData: (page?: string) => Promise<void>
  totalPages?: number
  actuallyPage?: number
}

export function InfiniteScroll({
  fetchData,
  totalPages,
  actuallyPage,
}: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Reached the bottom of the page
      try {
        setIsLoading(true)
        await fetchData() // Call your API or load more data here
      } finally {
        setIsLoading((prev) => !prev)
      }
    }
  }

  useEffect(() => {
    if (totalPages === actuallyPage) {
      return
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="flex w-full p-2">
      {isLoading ? (
        <p className="text-purple-200">...</p>
      ) : totalPages === actuallyPage ? (
        <p className="h-1 w-full bg-purple-200"></p>
      ) : null}
    </div>
  )
}
