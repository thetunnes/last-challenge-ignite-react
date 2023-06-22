'use client'
import { Sidebar } from '@/components/MenuSidebar'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export function BaseLayout({ children }: Props) {
  const pathname = usePathname()
  return (
    <div className="flex min-h-[calc(100vh-2.5rem)] w-full gap-24">
      {pathname !== '/login' && <Sidebar />}
      {children}
    </div>
  )
}
