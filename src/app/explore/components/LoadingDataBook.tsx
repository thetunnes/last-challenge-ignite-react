import { SkeletonText } from '@/components/Skeleton/text'
import { BookOpen, Bookmark } from 'lucide-react'
import { SkeletonImg } from '@/components/Skeleton/image'

export function LoadingDataBook() {
  return (
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
  )
}
