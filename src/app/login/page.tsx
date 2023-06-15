import Image from 'next/image'
import HeroLogin from '../../../public/images/hero-login.png'
import { BoxLogin } from './BoxLogin'

export default function Login() {
  return (
    <section className="flex h-[calc(100vh-40px)] w-full justify-between">
      <Image
        src={HeroLogin}
        alt=""
        className="max-h-full w-max object-contain"
      />

      <div className="mx-auto flex flex-col justify-center gap-10">
        <header className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold leading-short text-gray-100 ">
            Boas vindas!
          </h2>
          <p className="text-md ">Faça seu login ou acesse como visitante.</p>
        </header>

        <BoxLogin />
      </div>
    </section>
  )
}
