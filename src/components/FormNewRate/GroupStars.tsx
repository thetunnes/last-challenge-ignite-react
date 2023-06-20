import { Star, StarHalf } from '@phosphor-icons/react'
import { useCallback } from 'react'

interface Props {
  setValue: (num: number) => void
  value: number
}

export function GroupStar({ setValue, value }: Props) {
  const test = useCallback((eventSvg: any, valStar: number) => {
    const clickSvgX = eventSvg.nativeEvent.offsetX
    const widthSvg = eventSvg.target.getBoundingClientRect().width

    // Verifica se o clique ocorreu na primeira metade do elemento SVG
    if (clickSvgX < widthSvg / 2) {
      return setValue(valStar - 0.5)
    }

    setValue(valStar)
  }, [])

  return (
    <div className="flex w-max items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => {
        if (value + 0.5 === num) {
          return (
            <StarHalf
              color="#8381D9"
              size={28}
              weight="fill"
              className="cursor-pointer"
              id={`star-${num}`}
              onClick={(e) => test(e, num)}
              key={num}
            />
          )
        }
        return (
          <Star
            color="#8381D9"
            size={28}
            className={`${value + 0.5 <= num && 'opacity-50'} cursor-pointer`}
            id={`star-${num}`}
            onClick={(e) => test(e, num)}
            key={num}
            weight={value + 0.5 > num ? 'fill' : 'regular'}
          />
        )
      })}
    </div>
  )
}
