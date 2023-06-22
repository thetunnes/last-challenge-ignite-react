import { ProfileAvatar } from '@/components/ProfileAvatar'
import { IDataProfile } from './page'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import ptBR from 'dayjs/locale/pt-br'
import { ListOptions } from './ListOption'

interface Props {
  dataProfile: IDataProfile
}

dayjs.locale(ptBR)
dayjs.extend(RelativeTime)

export function BoxDataProfile({ dataProfile }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 border-l border-gray-700">
      <section className="flex flex-col items-center justify-center gap-5">
        <ProfileAvatar sourceImg={dataProfile.user.avatar_url} size="lg" />
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold leading-short">
            {dataProfile.user.name}
          </h3>
          <p className="w-max text-sm text-gray-400">
            membro desde{' '}
            {new Date(dataProfile.user.created_at).getFullYear ===
            new Date().getFullYear
              ? dayjs(dataProfile.user.created_at).format('MMMM')
              : dayjs(dataProfile.user.created_at).format('YYYY')}
          </p>
        </div>
      </section>

      <div className="h-1 w-8 rounded-full bg-gradient-horizontal" />

      <ListOptions dataProfile={dataProfile} />
    </div>
  )
}
