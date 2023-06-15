'use client'
import { useMemo } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { IRating } from '@/app/explore/page'

interface IAverageRatingProps {
  ratings?: IRating[] | number
}

export function AverageRating({ ratings }: IAverageRatingProps) {
  const averageValue = useMemo(() => {
    if (!ratings) {
      return null
    }

    if (typeof ratings === 'number') {
      return ratings
    }
    const totalRate = ratings.reduce((acc, rating) => {
      return acc + rating.rate
    }, 0)

    const averageRate = totalRate / ratings.length

    let resultado = Math.round(averageRate)
    if (averageRate - Math.floor(averageRate) === 0.5) {
      resultado = Math.floor(averageRate) + 0.5
    }

    return resultado
  }, [ratings])

  if (!averageValue) {
    return <p>...</p>
  }

  return (
    <div className="flex items-center justify-start gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => {
        if (averageValue + 0.5 > num) {
          return <Star key={num} color="#8381D9" size={16} />
        }

        if (averageValue + 0.5 === num) {
          return <StarHalf key={num} color="#8381D9" size={16} />
        }

        return (
          <Star key={num} color="#F8F9FC" size={16} className="opacity-50" />
        )
      })}
    </div>
  )
}
