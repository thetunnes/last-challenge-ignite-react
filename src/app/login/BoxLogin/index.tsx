'use client'
import { Button } from '@/components/Button'
import GoogleIcon from '@/components/IconsLogin/Google'
import GithubIcon from '@/components/IconsLogin/Github'
import RocketIcon from '@/components/IconsLogin/Rocket'
import { signIn, signOut } from 'next-auth/react'

export function BoxLogin() {
  async function handleSignIn(provider: string) {
    try {
      await signIn(provider, {
        callbackUrl: `${window.location.origin}/`,
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSignOut() {
    signOut({
      callbackUrl: `${window.location.origin}/`,
    })
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <Button onClick={() => handleSignIn('google')}>
        <GoogleIcon /> Entrar com Google
      </Button>
      <Button onClick={() => handleSignIn('github')}>
        <GithubIcon /> Entrar com Github
      </Button>
      <Button onClick={() => handleSignOut()}>
        <RocketIcon /> Acessar como visitante
      </Button>
    </div>
  )
}
