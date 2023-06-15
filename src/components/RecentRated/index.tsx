import { api } from '@/lib/api'
import { BoxRating } from '../BoxRating'

interface Book {
  id: string
  name: string
  author: string
  summary: string
  total_pages: number
  created_at: string
  cover_url: string
}

interface User {
  id: string
  name: string
  email: string | null
  avatar_url: string
}

export interface Rating {
  id: string
  user: User
  book: Book
  description: string
  rate: number
  created_at: string
}

interface Props {
  page?: string
}

export async function RecentedRatedBook({ page }: Props) {
  const response = await api.get('/books/recent-rated')

  const latestReviews = response.data as Rating[]

  if (!latestReviews.length) {
    return (
      <div>
        <h3>As avaliações não foram carregadas...</h3>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <h3 className="mb-1 text-sm text-gray-100">Avaliações mais recentes</h3>

      {latestReviews.map((rating) => (
        <BoxRating rating={rating} key={rating.id} />
      ))}
    </div>
  )
}
