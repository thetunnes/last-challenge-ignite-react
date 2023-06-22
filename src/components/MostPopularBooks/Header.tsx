'use client'

import { CaretRight } from '@phosphor-icons/react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between">
      <h3 className="text-sm">Livros populares</h3>
      <Link
        href="/explore"
        className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm font-bold text-purple-100 hover:bg-purple-100/[6%]"
      >
        Ver todos <CaretRight size={16} />
      </Link>
    </header>
  )
}
