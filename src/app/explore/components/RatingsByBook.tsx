import { api } from '@/lib/api'
import { useEffect } from 'react'

interface RatingsBookProps {
  idBook?: string
}

export function RatingsByBook({ idBook }: RatingsBookProps) {
  async function fetchDataBookById() {
    try {
      const { data } = await api.get(`/books/rating/?id=${idBook}`)

      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDataBookById()
  }, [idBook])

  return <div></div>
}
