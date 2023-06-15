import { IBook } from '@/app/explore/page'
import Image from 'next/image'
import { AllHTMLAttributes, ReactNode, Suspense } from 'react'

interface BookProps extends AllHTMLAttributes<HTMLDivElement> {
  book: IBook
  children?: ReactNode
  className?: string
  ellipsisTitle?: boolean
}

export function Book({
  book,
  children,
  className,
  ellipsisTitle = false,
  ...props
}: BookProps) {
  return (
    <section
      className={`flex max-h-[190px] justify-start gap-5 rounded-[8px] bg-gray-700 px-5 py-4 ${className}`}
      {...props}
    >
      <Suspense fallback="Loading image...">
        <Image
          src={book.cover_url}
          alt=""
          width={110}
          height={150}
          className="max-h-[150px]"
        />
      </Suspense>
      <div className="flex w-full flex-col justify-between">
        <header className="flex flex-col">
          <h4
            className={`${
              ellipsisTitle && 'overflow-hidden text-ellipsis'
            } font-bold leading-short`}
          >
            {book.name}
          </h4>
          <p className="text-sm text-gray-400">{book.author}</p>
        </header>
        {children && <footer className="overflow-hidden">{children}</footer>}
      </div>
    </section>
  )
}
