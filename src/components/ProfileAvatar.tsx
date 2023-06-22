import Image from 'next/image'

interface Props {
  sourceImg: string
  size?: 'sm' | 'md' | 'lg'
  width?: number
  height?: number
}
export function ProfileAvatar({
  sourceImg,
  size = 'md',
  width = 40,
  height = 40,
}: Props) {
  return (
    <div
      className={`rounded-full bg-gradient-vertical 
        ${size !== 'lg' ? 'p-0.5' : 'p-1'}
        ${size === 'sm' && 'h-8 w-8'}
        ${size === 'md' && 'h-10 w-10'}
        ${size === 'lg' && 'h-[4.5rem] w-[4.5rem]'}
      `}
    >
      <Image
        src={sourceImg}
        width={width}
        height={height}
        className="h-full w-full rounded-full object-cover"
        alt=""
      />
    </div>
  )
}
