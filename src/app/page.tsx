import { RecentedRatedBook } from '@/components/RecentRated'
import { Sidebar } from '@/components/MenuSidebar'
import { TitlePage } from '@/components/TitlePage'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <section className="flex flex-1 justify-between">
      <Sidebar />

      <main className="flex w-full flex-col gap-10 px-24 py-6">
        <TitlePage />

        <section className="flex gap-16">
          <RecentedRatedBook page={searchParams.page} />
        </section>
      </main>
    </section>
  )
}
