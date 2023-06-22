import { RecentedRatedBook } from '@/components/RecentRated'
import { TitlePage } from '@/components/TitlePage'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <section className="flex flex-1 justify-between">
      <main className="flex w-full flex-col gap-10 py-6">
        <TitlePage />

        <section className="flex gap-16">
          <RecentedRatedBook page={searchParams.page} />
        </section>
      </main>
    </section>
  )
}
