import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import { NavLink } from './NavLink'

interface MenuProps {
  session: {
    user: {
      id: string
      name: string
      email: string
    }
  } | null
}

const menus = [
  {
    title: 'início',
    url: '/',
    private: false,
    icon: <ChartLineUp size={24} />,
  },
  {
    title: 'explorar',
    url: '/explore',
    private: false,
    icon: <Binoculars size={24} />,
  },
  {
    title: 'perfil',
    url: '/perfil',
    private: true,
    icon: <User size={24} />,
  },
]

export function Menu({ session }: MenuProps) {
  return (
    <ul className="flex-1 flex flex-col items-start gap-4">
      {menus.map((menu) => {
        if (!session && menu.private) {
          return null
        }
        return <NavLink menu={menu} key={menu.url} />
      })}
    </ul>
  )
}
