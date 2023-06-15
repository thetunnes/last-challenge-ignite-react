import Image from 'next/image'
import LoadingIcon from '../../public/images/loading.gif'
import { ReactNode } from 'react'

interface LoadingProps {
  children: ReactNode
}

export function Loading({ children }: LoadingProps) {
  return (
    <div className="flex w-max flex-col items-center justify-center gap-1">
      <Image src={LoadingIcon} alt="" width={20} height={20} />
      {children}
    </div>
  )
}
