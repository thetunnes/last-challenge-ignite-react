import Image from 'next/image'
import Logo from '../images/Logo.svg'
import { MenuSidebar } from '@/components/MenuSidebar'

export default function Home() {
  return (
    <section className="flex-1 flex justify-between">
      <aside className="relative flex flex-col items-center justify-start bg-[url('../images/Background.png')] rounded-[12px] p-6">
        <Image src={Logo} alt="" className="mb-16" />
        <MenuSidebar />
      </aside>
    </section>
  )
}
