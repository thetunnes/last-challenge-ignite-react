import Image from 'next/image'
import { Rating } from '../RecentRated'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { Book } from '../Book'
import { AverageRating } from '../AverageRating'

interface BoxProps {
  rating: Rating
}

dayjs.locale('pt-BR')
dayjs.extend(RelativeTime)

export function BoxRating({ rating }: BoxProps) {
  return (
    <div className="flex w-full flex-col gap-8 rounded-[8px] bg-gray-700">
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-max rounded-full bg-gradient-vertical p-0.5">
            <Image
              src={rating.user.avatar_url}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          </div>

          <div>
            <h4>{rating.user.name}</h4>
            <time className="text-sm text-gray-400">
              {dayjs(rating.created_at).fromNow()}
            </time>
          </div>
        </div>

        <AverageRating ratings={rating.rate} />
      </header>

      <Book book={rating.book}>
        <p className="overflow-hidden text-ellipsis">{rating.book.summary}</p>
      </Book>

      {/* <section className="flex gap-5">
        <Image src={rating.book.cover_url} alt="" width={110} height={150} />
        <div className="flex flex-col justify-between">
          <h4 className="font-bold leading-short">{rating.book.name}</h4>
          <span className="text-sm text-gray-400">{rating.book.author}</span>
          <p className="mt-5 text-sm text-gray-300">{rating.book.summary}</p>
        </div>
      </section> */}
    </div>
  )
}
