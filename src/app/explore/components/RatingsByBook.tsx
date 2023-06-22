import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import ptBR from 'dayjs/locale/pt-br'
import { IRating } from '../page'
import { AverageRating } from '@/components/AverageRating'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { FormNewRate } from '@/components/FormNewRate'
import { useSessionCtx } from '@/app/hooks/useSession'
import { ProfileAvatar } from '@/components/ProfileAvatar'

interface Rating extends IRating {
  user: {
    id: string
    name: string
    avatar_url: string
  }
}

interface RatingsBookProps {
  ratings: Rating[] | undefined
  bookId: string
  closeDrawer: () => void
  openModalBlock: () => void
}

dayjs.locale(ptBR)
dayjs.extend(RelativeTime)

export function RatingsByBook({
  ratings,
  bookId,
  closeDrawer,
  openModalBlock,
}: RatingsBookProps) {
  const [toRate, setToRate] = useState(false)

  const { data: session } = useSession()

  const { verifySession } = useSessionCtx()

  async function handleClickAvailable() {
    const session = await verifySession()
    setToRate(true)
    if (!session) {
      return openModalBlock()
    }
  }

  return (
    <div className="flex flex-col justify-center gap-3">
      <header className="mb-1 flex items-center justify-between">
        <p className="text-sm text-gray-200">Avaliações</p>
        {!ratings?.some((rating) => rating.user_id === session?.user.id) &&
          !toRate && (
            <button
              className="font-bold text-purple-100"
              onClick={() => handleClickAvailable()}
            >
              Avaliar
            </button>
          )}
      </header>

      {toRate && session ? (
        <FormNewRate
          session={session}
          closeForm={() => setToRate(false)}
          bookId={bookId}
          closeDrawer={closeDrawer}
        />
      ) : null}

      {!!ratings &&
        ratings.map((rating) => (
          <div
            key={rating.id}
            className={`flex flex-col justify-center gap-6 rounded-[8px] p-6 ${
              rating.user_id === session?.user.id
                ? 'bg-gray-600'
                : 'bg-gray-700'
            }`}
          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ProfileAvatar sourceImg={rating.user.avatar_url} size="md" />
                <div className="flex flex-col items-start">
                  <strong className="font-bold leading-short">
                    {rating.user.name}
                  </strong>
                  <p className="text-sm text-gray-400">
                    {dayjs(rating.created_at).fromNow()}
                  </p>
                </div>
              </div>
              <AverageRating ratings={rating.rate} />
            </header>
            <p className="text-sm text-gray-300">{rating.description}</p>
          </div>
        ))}
    </div>
  )
}
