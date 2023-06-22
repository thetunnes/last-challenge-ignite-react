import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ReactNode, createContext, useContext, useState } from 'react'

interface SessionProps {
  user: any
  verifySession: () => any
}

const SessionContext = createContext({} as SessionProps)

interface Props {
  children: ReactNode
}
export function SessionCtxProvider({ children }: Props) {
  const { data: session, status } = useSession()

  const [user, setUser] = useState<Session | null>(null)

  async function verifySession() {
    if (status !== 'loading') {
      setUser(session ?? null)
      return session
    }
  }
  return (
    <SessionContext.Provider value={{ verifySession, user }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionCtx = () => useContext(SessionContext)
