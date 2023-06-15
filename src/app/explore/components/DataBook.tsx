import Image from 'next/image'
import { AverageRating } from '@/components/AverageRating'
import { BookOpen, Bookmark } from 'lucide-react'
import { IBook } from './ContentDrawer'

interface DataBookProps {
  book: IBook
}

export function DataBook({ book }: DataBookProps) {
  return (
    <>
      <div className="flex justify-start gap-8">
        <Image src={book.cover_url} width={170} height={240} alt="" />
        <div className="flex flex-1 flex-col justify-between">
          <header className="flex-1 gap-2 self-start">
            <h2 className="text-lg font-bold leading-short">{book.name}</h2>
            <span className="text-gray-300">{book.author}</span>
          </header>

          <section className="flex flex-col gap-1">
            <AverageRating ratings={book.ratings} />
            <span className="text-sm text-gray-400">
              {book.ratings.length} Avaliações
            </span>
          </section>
        </div>
      </div>
      <footer className="flex items-center justify-start gap-14 border-t border-gray-600 py-6">
        <section className="flex items-center gap-4">
          <Bookmark className="text-2xl text-green-100" />
          <div>
            <h4 className="block text-sm text-gray-300">Categoria</h4>
            <div className="flex flex-wrap items-center gap-1">
              {book.categories.map(({ category }, i) => (
                <span
                  key={category.id}
                  className="inline-block font-bold text-gray-200"
                >
                  {category.name}
                  {i < book.categories.length - 1 ? ',' : '.'}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="flex items-center gap-4">
          <BookOpen className="text-2xl text-green-100" />
          <div className="">
            <h4 className="block text-sm text-gray-300">Páginas</h4>
            <p className="font-bold text-gray-200">{book.total_pages}</p>
          </div>
        </section>
      </footer>
    </>
  )
}
