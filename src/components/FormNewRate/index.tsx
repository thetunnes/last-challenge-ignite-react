import Image from 'next/image'
import { Button } from '../Button'
import { Check, X } from 'lucide-react'
import { Session } from 'next-auth'
import { TextArea } from '../TextArea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GroupStar } from './GroupStars'
import { api } from '@/lib/api'

interface Props {
  session: Session
  closeForm: () => void
  closeDrawer: () => void
  bookId: string
}

const schemaNewRate = z.object({
  description: z.string().min(4, 'Uma descrição deve ser escrita'),
  rate: z.number().min(0.5, 'Uma nota de avaliação deve ser selecionada'),
})

type NewRateData = z.infer<typeof schemaNewRate>

export function FormNewRate({
  session,
  closeForm,
  closeDrawer,
  bookId,
}: Props) {
  const { register, handleSubmit, watch, setValue, formState, reset } =
    useForm<NewRateData>({
      resolver: zodResolver(schemaNewRate),
      defaultValues: {
        description: '',
        rate: 0,
      },
    })
  const { errors, isSubmitting } = formState

  async function onSubmit(data: NewRateData) {
    const dataSend = {
      userId: session.user.id,
      bookId,
      description: data.description,
      rate: data.rate,
    }

    try {
      await api.post('/rating', dataSend)

      reset()
      closeDrawer()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-6 rounded-[8px] bg-gray-700 p-6"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={session.user.avatar_url}
            width={40}
            height={40}
            alt=""
            quality={100}
            className="h-10 w-10 rounded-full border border-gradient-vertical object-cover"
          />
          <div className="flex flex-col items-start">
            <strong className="font-bold leading-short">
              {session.user.name}
            </strong>
          </div>
        </div>
        <GroupStar
          setValue={(num: number) => setValue('rate', num)}
          value={watch('rate')}
        />
      </header>
      <TextArea
        name="description"
        register={register}
        lengthValue={watch('description')?.length ?? 0}
        placeholder="Escreva sua avaliação"
      />
      <div className="flex flex-wrap items-center justify-between gap-1">
        {!!Object.values(errors).length && (
          <p className="text-xs font-bold text-red-500">
            {Object.values(errors)[0].message}
          </p>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button size="sm" onClick={() => closeForm()}>
            <X className="text-2xl text-purple-100" />
          </Button>
          <Button
            size="sm"
            disabled={!watch('description')?.length || isSubmitting}
            type="submit"
          >
            <Check className={`text-2xl text-green-100`} />
          </Button>
        </div>
      </div>
    </form>
  )
}
