import { TitlePage } from '@/components/TitlePage'
import { api } from '@/lib/api'
import { BoxDataProfile } from './BoxDataProfile'

export interface IDataProfile {
  mostReadCategory: string
  readPageCount: number
  reviewedBookCount: number
  authorsCount: number
  user: {
    id: string
    name: string
    created_at: string
    avatar_url: string
  }
}

async function getDataUser(idUser: string) {
  try {
    const { data } = await api.get(`/user/?id=${idUser}`)

    return data
  } catch (err) {
    console.log(err)
  }
}

export default async function Perfil({ params }: { params: any }) {
  const dataProfile: IDataProfile = await getDataUser(params.id)

  return (
    <section className="mt-12  flex flex-1 flex-col justify-start gap-10">
      <TitlePage />
      <main className="flex flex-1 justify-start gap-16">
        <div className="w-full p-2 "></div>

        <BoxDataProfile dataProfile={dataProfile} />
      </main>
    </section>
  )
}
