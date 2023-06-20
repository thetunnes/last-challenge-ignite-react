import { TextareaHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, Path } from 'react-hook-form'
type Props<FormFields extends FieldValues> = {
  lengthValue: number
  register: UseFormRegister<FormFields>
  name: Path<FormFields>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea<FormFields extends FieldValues>({
  lengthValue,
  register,
  ...props
}: Props<FormFields>) {
  return (
    <div className="relative">
      <textarea
        className="relative h-40 w-full resize-none rounded-sm border border-green-200 bg-gray-800 px-5 py-3.5 scrollbar-thin scrollbar-track-green-300 scrollbar-thumb-green-100 placeholder:text-sm placeholder:text-gray-400"
        {...register(props.name)}
        {...props}
      ></textarea>
      <span
        className={`absolute bottom-2 right-3 w-max text-xs ${
          lengthValue > 450 ? 'text-red-500' : 'text-gray-400'
        }`}
      >
        {lengthValue} / 450
      </span>
    </div>
  )
}
