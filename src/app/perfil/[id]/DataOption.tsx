'use client'
import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  info: string
  description: string
}

export function DataOption({ icon, info, description }: Props) {
  return (
    <div className="flex items-center gap-5">
      {icon}
      <div className="flex flex-col">
        <strong className="font-bold leading-short text-gray-200">
          {info}
        </strong>
        <p className="w-max text-sm text-gray-300">{description}</p>
      </div>
    </div>
  )
}
