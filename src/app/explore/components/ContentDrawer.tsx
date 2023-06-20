import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { IRating } from '../page'
import { DataBook } from './DataBook'
import { LoadingDataBook } from './LoadingDataBook'
import { RatingsByBook } from './RatingsByBook'

interface ICategory {
  category: {
    id: string
    name: string
  }
}

interface Rating extends IRating {
  user: {
    id: string
    name: string
    avatar_url: string
  }
}

export interface IBook {
  id: string
  name: string
  author: string
  total_pages: number
  cover_url: string
  created_at: string
  categories: ICategory[]
  ratings: Rating[]
}

interface DataBookProps {
  bookId: string
  closeDrawer: () => void
}

export function ContentDrawer({ bookId, closeDrawer }: DataBookProps) {
  const [book, setBook] = useState<IBook>()

  async function getBook() {
    const response = await api.get(`/book/?id=${bookId}`)

    setBook(response.data)
  }

  useEffect(() => {
    getBook()
  }, [bookId])

  if (!book) {
    return (
      <div>
        <div className="flex flex-col gap-10 rounded-md bg-gray-700 px-8 py-6">
          <LoadingDataBook />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="flex flex-col gap-10 rounded-md bg-gray-700 px-8 py-6">
        <DataBook book={book} />
      </div>
      <RatingsByBook
        ratings={book?.ratings}
        bookId={book.id}
        closeDrawer={closeDrawer}
      />
    </div>
  )
}
