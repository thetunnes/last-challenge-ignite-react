'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavLinkProps {
  menu: {
    title: string
    url: string
    icon: ReactNode
  }
}

export function NavLink({ menu }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <li className="relative w-max">
      <Link
        href={menu.url}
        className={`
        flex items-center gap-3 capitalize transition-all before:absolute before:-left-4 before:bottom-0 before:top-0 before:w-1 before:rounded-full hover:text-gray-100 hover:before:bg-gradient-vertical
        ${
          pathname === menu.url
            ? 'text-gray-100 before:bg-gradient-vertical'
            : 'text-gray-400'
        }
        `}
      >
        {menu.icon}
        {menu.title}
      </Link>
    </li>
  )
}
