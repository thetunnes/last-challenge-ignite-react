'use client'
import { Button } from '@/components/Button'
import GoogleIcon from '@/components/IconsLogin/Google'
import GithubIcon from '@/components/IconsLogin/Github'
import RocketIcon from '@/components/IconsLogin/Rocket'
import { signIn } from 'next-auth/react'

export function BoxLogin() {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Button onClick={() => signIn('google')}>
        <GoogleIcon /> Entrar com Google
      </Button>
      <Button onClick={() => signIn('github')}>
        <GithubIcon /> Entrar com Github
      </Button>
      <Button>
        <RocketIcon /> Acessar como visitante
      </Button>
    </div>
  )
}
