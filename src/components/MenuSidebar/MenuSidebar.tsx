'use client'
import { SignIn, SignOut } from '@phosphor-icons/react'
import { useSession, signOut } from 'next-auth/react'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu } from './menus'

export function MenuSidebar() {
  const { push } = useRouter()
  const { data: session } = useSession()
  return (
    <nav className="flex h-full flex-1 flex-col">
      <Menu session={session} />
      {session ? (
        <footer className="flex items-center justify-center">
          {/* <Image src={session.user.avatar_url} alt="" /> */}
          <button
            className="flex w-max items-center gap-2"
            onClick={() => signOut()}
          >
            <p>{session.user.name}</p>
            <SignOut color="#F75A68" />
          </button>
        </footer>
      ) : (
        <footer className="flex w-max items-center justify-center">
          <button
            className="flex items-center gap-2"
            onClick={() => push('/login')}
          >
            <strong>Fazer login</strong>
            <SignIn />
          </button>
        </footer>
      )}
    </nav>
  )
}
