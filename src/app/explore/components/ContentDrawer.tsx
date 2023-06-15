import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { IRating } from '../page'
import { DataBook } from './DataBook'
import { SkeletonText } from '@/components/Skeleton/text'
import { BookOpen, Bookmark } from 'lucide-react'
import { SkeletonImg } from '@/components/Skeleton/image'

interface ICategory {
  category: {
    id: string
    name: string
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
  ratings: IRating[]
}

interface DataBookProps {
  bookId: string
}

export function ContentDrawer({ bookId }: DataBookProps) {
  const [book, setBook] = useState<IBook>()

  async function getBook() {
    const response = await api.get(`/book/?id=${bookId}`)

    setBook(response.data)
  }
  // async function getRatingsBook() {
  //   const response = await api.get(`/book/?id=${bookId}`)

  //   setBook(response.data)
  // }

  useEffect(() => {
    getBook()
    // getRatingsBook()
  }, [bookId])

  console.log(book)

  return (
    <div>
      <div className="flex flex-col gap-10 rounded-md bg-gray-700 px-8 py-6">
        {book ? (
          <DataBook book={book} />
        ) : (
          <>
            <div className="flex justify-start gap-8">
              <SkeletonImg />
              <div className="flex flex-1 flex-col justify-between">
                <header className="flex-1 gap-2 self-start">
                  <SkeletonText />
                  <SkeletonText />
                </header>

                <div className="w-16">
                  <SkeletonText />
                </div>
              </div>
            </div>
            <footer className="flex items-center justify-start gap-14 border-t border-gray-600 py-6">
              <section className="flex items-center gap-4">
                <Bookmark className="text-2xl text-green-100" />
                <div>
                  <h4 className="block text-sm text-gray-300">Categoria</h4>
                  <SkeletonText />
                </div>
              </section>
              <section className="flex items-center gap-4">
                <BookOpen className="text-2xl text-green-100" />
                <div className="">
                  <h4 className="block text-sm text-gray-300">Páginas</h4>
                  <SkeletonText />
                </div>
              </section>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
