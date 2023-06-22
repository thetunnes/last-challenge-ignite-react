import { RecentedRatedBook } from '@/components/RecentRated'
import { TitlePage } from '@/components/TitlePage'
import { api } from '@/lib/api'
import { IBook } from './explore/page'
import { MostPopularBooks } from '@/components/MostPopularBooks'

async function getTop5Books() {
  try {
    const { data } = await api.get('/books/5-most-reviewed')

    return data
  } catch (err) {
    console.log(err)
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const fiveBooks: IBook[] = await getTop5Books()

  return (
    <section className="flex flex-1 justify-between">
      <main className="flex w-full flex-col gap-10 py-6">
        <TitlePage />

        <section className="flex gap-16">
          <RecentedRatedBook page={searchParams.page} />
          <MostPopularBooks top5Books={fiveBooks} />
        </section>
      </main>
    </section>
  )
}
