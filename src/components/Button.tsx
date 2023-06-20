import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md'
}

export function Button({ children, size = 'md', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
      ${size === 'sm' && `p-2`}
      ${size === 'md' && `px-6 py-5`}
      flex items-center justify-start gap-5 rounded-[8px] bg-gray-600 transition-colors hover:enabled:bg-gray-500 disabled:opacity-40
      `}
    >
      {children}
    </button>
  )
}
