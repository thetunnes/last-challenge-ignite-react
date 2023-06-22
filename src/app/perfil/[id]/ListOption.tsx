'use client'
import {
  BookOpen,
  BookmarksSimple,
  Books,
  UserList,
} from '@phosphor-icons/react'
import { DataOption } from './DataOption'
import { IDataProfile } from './page'

interface Props {
  dataProfile: IDataProfile
}

export function ListOptions({ dataProfile }: Props) {
  if (!dataProfile.readPageCount) {
    return (
      <p className="text-center font-bold text-gray-300">
        Não foi possível encontrar informações para livros avaliados
      </p>
    )
  }

  return (
    <section className="flex flex-col gap-10 px-14 py-5">
      <DataOption
        icon={<BookOpen size={32} className="text-green-100" />}
        info={String(dataProfile.readPageCount)}
        description="Páginas lidas"
      />
      <DataOption
        icon={<Books size={32} className="text-green-100" />}
        info={String(dataProfile.reviewedBookCount)}
        description="Livros avaliados"
      />
      <DataOption
        icon={<UserList size={32} className="text-green-100" />}
        info={String(dataProfile.authorsCount)}
        description="Autores lidos"
      />
      <DataOption
        icon={<BookmarksSimple size={32} className="text-green-100" />}
        info={dataProfile.mostReadCategory}
        description="Categoria mais lida"
      />
    </section>
  )
}
