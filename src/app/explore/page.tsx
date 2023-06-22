'use client'
import { use, useEffect, useState } from 'react'
import { TitlePage } from '@/components/TitlePage'
import { api } from '@/lib/api'
import { BtnCategory } from '@/components/BtnCategory'
import { Book } from '@/components/Book'
import { Loading } from '@/components/Loading'
import { AverageRating } from '@/components/AverageRating'
import { WrapperDrawer } from '@/components/WrapperDrawer'
import { SessionCtxProvider } from '../hooks/useSession'

export interface ICategory {
  id: string
  name: string
}

export interface IRating {
  id: string
  book_id: string
  rate: number
  description: string
  created_at: string
  user_id: string
}

export interface IBook {
  id: string
  name: string
  author: string
  cover_url: string
  summary: string
  total_pages: string
  created_at: string
  ratings?: IRating[]
  categories?: ICategory[]
}

async function getCategories() {
  const response = await api.get('/categories')

  return response.data as ICategory[]
}

const categoriesPromise = getCategories()

export default function ExploreBooks() {
  const categories = use(categoriesPromise)

  const [chooseCategories, setChooseCategories] = useState<Array<ICategory>>([])

  const [books, setBooks] = useState<IBook[]>([])

  const [isLoadingBooks, setIsLoadingBooks] = useState(true)

  const [openDrawerBook, setOpenDrawerBook] = useState('')

  async function getListBooks() {
    try {
      setIsLoadingBooks(true)
      const test = chooseCategories.reduce((acc, category) => {
        return (acc = {
          ...acc,
          [category.name]: category.id,
        })
      }, {})

      const { data } = await api.get(`/books`, {
        params: {
          ...test,
        },
      })

      setBooks(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingBooks(false)
    }
  }

  useEffect(() => {
    getListBooks()
  }, [chooseCategories])

  return (
    <SessionCtxProvider>
      <section className="flex w-full flex-1 justify-between">
        <main className="flex w-full flex-col gap-10 py-6 pl-24">
          <TitlePage />

          <section className="flex w-full flex-col gap-16">
            <nav className="flex w-full flex-wrap items-center gap-7">
              <BtnCategory
                category={{
                  id: 'all',
                  name: 'Tudo',
                }}
                onChooseCategories={setChooseCategories}
                active={!chooseCategories.length}
              />

              {categories.map((category) => (
                <BtnCategory
                  onChooseCategories={setChooseCategories}
                  category={category}
                  key={category.id}
                  active={chooseCategories.some(
                    (cat) => cat.id === category.id,
                  )}
                />
              ))}
            </nav>

            {isLoadingBooks ? (
              <div className="flex w-full justify-center">
                <Loading>
                  <span className="text-xs">Carregando livros...</span>
                </Loading>
              </div>
            ) : books.length ? (
              <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {books.map((book) => (
                  <Book
                    book={book}
                    key={book.id}
                    onClick={() => setOpenDrawerBook(book.id)}
                  >
                    <AverageRating ratings={book.ratings} />
                  </Book>
                ))}
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <p>Não encontramos livros para os filtros inseridos 😔</p>
              </div>
            )}
          </section>
        </main>
        <WrapperDrawer
          bookId={openDrawerBook}
          onClose={() => setOpenDrawerBook('')}
        />
      </section>
    </SessionCtxProvider>
  )
}
