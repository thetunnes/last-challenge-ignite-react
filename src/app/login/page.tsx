import Image from 'next/image'
import HeroLogin from '../../images/hero-login.png'
import { BoxLogin } from './BoxLogin'

export default function Login() {
  return (
    <section className="w-full h-[calc(100vh-40px)] flex justify-between">
      <Image
        src={HeroLogin}
        alt=""
        className="w-max max-h-full object-contain"
      />

      <div className="flex mx-auto flex-col gap-10 justify-center">
        <header className="flex flex-col gap-0.5">
          <h2 className="text-gray-100 font-bold text-xl leading-short ">
            Boas vindas!
          </h2>
          <p className="text-md ">Faça seu login ou acesse como visitante.</p>
        </header>

        <BoxLogin />
      </div>
    </section>
  )
}
