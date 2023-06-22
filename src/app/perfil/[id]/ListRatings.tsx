import { AverageRating } from '@/components/AverageRating'
import { Rating } from '@/components/RecentRated'
import Image from 'next/image'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import ptBR from 'dayjs/locale/pt-br'

interface Props {
  ratings: Rating[]
}

dayjs.locale(ptBR)
dayjs.extend(RelativeTime)

export function ListRatings({ ratings }: Props) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      {ratings.map((rating) => (
        <div className="flex flex-col gap-2" key={rating.id}>
          <time className="text-sm text-gray-300">
            {dayjs(rating.created_at).fromNow()}
          </time>
          <div className="flex flex-col gap-6 rounded-[8px] bg-gray-700 p-6">
            <div className="flex justify-start gap-6">
              <Image
                src={rating.book.cover_url}
                alt=""
                width={100}
                height={135}
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col items-start gap-1">
                  <h2 className="text-lg font-bold leading-short">
                    {rating.book.name}
                  </h2>
                  <p className="text-sm text-gray-400">{rating.book.author}</p>
                </div>
                <footer>
                  <AverageRating ratings={rating.rate} />
                </footer>
              </div>
            </div>

            <span className="text-justify text-sm text-gray-300">
              {rating.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
