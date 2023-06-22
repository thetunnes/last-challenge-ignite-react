import { ContentDrawer } from '@/app/explore/components/ContentDrawer'
import { X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import { Button } from '../Button'
import GoogleIcon from '../IconsLogin/Google'
import GithubIcon from '../IconsLogin/Github'

interface IWrapperDrawer {
  bookId: string
  onClose: () => void
}

export function WrapperDrawer({ bookId, onClose }: IWrapperDrawer) {
  const [unauthorized, setUnauthorized] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (event: any) => {
    // Verifica se o evento de clique vem a partir da Div Overlay
    if (event.target === overlayRef.current) {
      onClose()
    }
  }

  async function handleSignIn(provider: string) {
    try {
      await signIn(provider)
    } catch (err) {
      console.log(err)
    }
  }

  function closeModal() {
    onClose()
    setUnauthorized(false)
  }

  if (!bookId.length) {
    return null
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/60`}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className={`scrollbar-rounded-[6px] absolute bottom-0 right-0 top-0 z-50 w-11/12 overflow-y-auto scrollbar-thin scrollbar-track-gray-600 scrollbar-thumb-gray-700 ${
          bookId.length ? 'max-w-2xl' : 'max-w-0'
        } bg-gray-800 px-12 py-16 transition-all`}
      >
        <X
          className="absolute right-12 top-6 w-max cursor-pointer text-2xl text-gray-400 transition-colors hover:text-gray-100"
          onClick={() => onClose()}
        />

        <ContentDrawer
          bookId={bookId}
          closeDrawer={closeModal}
          openModalBlock={() => setUnauthorized(true)}
        />
      </div>

      {unauthorized ? (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[999] bg-black/60">
          <section className="absolute left-1/2 top-1/2 z-[9999] flex h-80 w-full max-w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] bg-gray-700 px-16 py-4">
            <X
              className="absolute right-4 top-4 cursor-pointer text-2xl text-gray-400 transition-colors hover:text-gray-100"
              onClick={() => closeModal()}
            />
            <div className="flex w-full flex-col justify-center gap-4">
              <h1 className="mx-auto font-bold text-gray-200">
                Faça login para deixar sua avaliação
              </h1>
              <Button onClick={() => handleSignIn('google')}>
                <GoogleIcon /> Entrar com Google
              </Button>
              <Button onClick={() => handleSignIn('github')}>
                <GithubIcon /> Entrar com Github
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}
