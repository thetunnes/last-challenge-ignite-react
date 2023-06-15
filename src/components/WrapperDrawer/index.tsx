import { ContentDrawer } from '@/app/explore/components/ContentDrawer'
import { X } from 'lucide-react'
import { useRef } from 'react'

interface IWrapperDrawer {
  bookId: string
  onClose: () => void
}

export function WrapperDrawer({ bookId, onClose }: IWrapperDrawer) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (event: any) => {
    // Verifica se o evento de clique vem a partir da Div Overlay
    if (event.target === overlayRef.current) {
      onClose()
    }
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
        className={`fixed bottom-0 right-0 top-0 z-50 w-11/12 ${
          bookId.length ? 'max-w-2xl' : 'max-w-0'
        } bg-gray-800 px-12 py-16 transition-all`}
      >
        <X
          className="absolute right-12 top-6 w-max cursor-pointer text-2xl text-gray-400 transition-colors hover:text-gray-100"
          onClick={() => onClose()}
        />

        <ContentDrawer bookId={bookId} />
      </div>
    </div>
  )
}
