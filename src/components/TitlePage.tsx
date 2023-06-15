'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'

export function TitlePage() {
  const pathname = usePathname()

  if (pathname === '/explore') {
    return (
      <h1 className="flex items-center gap-3 text-2xl font-bold">
        <Binoculars size={32} className="text-green-100" /> Explorar
      </h1>
    )
  }
  if (pathname === '/perfil') {
    return (
      <h1 className="flex items-center gap-3 text-2xl font-bold">
        <User size={32} className="text-green-100" /> Perfil
      </h1>
    )
  }

  return (
    <h1 className="flex items-center gap-3 text-2xl font-bold">
      <ChartLineUp size={32} className="text-green-100" /> Início
    </h1>
  )
}
