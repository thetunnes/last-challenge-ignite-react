import Image from 'next/image'
import { MenuSidebar } from './MenuSidebar'
import Logo from '../../../public/images/Logo.svg'

export function Sidebar() {
  return (
    <aside
      className={`relative flex h-[92vh] w-max flex-col items-center justify-start rounded-[12px] bg-[url('../images/Background.png')] bg-no-repeat p-6`}
    >
      <Image src={Logo} alt="" className="mb-16" />
      <MenuSidebar />
    </aside>
  )
}
