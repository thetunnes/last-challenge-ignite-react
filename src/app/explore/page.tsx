'use client'
import { use, useEffect, useState } from 'react'
import { Sidebar } from '@/components/MenuSidebar'
import { TitlePage } from '@/components/TitlePage'
import { api } from '@/lib/api'
import { BtnCategory } from '@/components/BtnCategory'
import { Book } from '@/components/Book'
import { Loading } from '@/components/Loading'
import { AverageRating } from '@/components/AverageRating'
import { WrapperDrawer } from '@/components/WrapperDrawer'

export interface ICategory {
  id: string
  name: string
}

export interface IRating {
  id: string
  book_id: string
  rate: number
  description: string
}

export interface IBook {
  id: string
  name: string
  author: string
  cover_url: string
  summary: string
  ratings?: IRating[]
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

  const [isLoadingBooks, setIsLoadingBooks] = useState(false)

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
    <section className="flex w-full flex-1 justify-between">
      <Sidebar />

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
                active={chooseCategories.some((cat) => cat.id === category.id)}
              />
            ))}
          </nav>

          {isLoadingBooks ? (
            <div className="flex w-full justify-center">
              <Loading>
                <span className="text-xs">Carregando livros...</span>
              </Loading>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {books.length ? (
                books.map((book) => (
                  <Book
                    book={book}
                    key={book.id}
                    onClick={() => setOpenDrawerBook(book.id)}
                  >
                    <AverageRating ratings={book.ratings} />
                  </Book>
                ))
              ) : (
                <div className="flex w-full justify-center">
                  <p>Não encontramos livros para os filtros inseridos 😔</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <WrapperDrawer
        bookId={openDrawerBook}
        onClose={() => setOpenDrawerBook('')}
      />
    </section>
  )
}
