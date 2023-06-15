'use client'
import { ICategory } from '@/app/explore/page'

interface BtnCategoryProps {
  onChooseCategories: (
    setCallback: (previousState: ICategory[]) => ICategory[],
  ) => void
  category: ICategory
  active: boolean
}

export function BtnCategory({
  onChooseCategories,
  category,
  active,
}: BtnCategoryProps) {
  function toggleSelectCategory() {
    if (category.id === 'all') {
      return onChooseCategories((prev) => [])
    }

    onChooseCategories((prevCategories: ICategory[]) => {
      if (prevCategories.some((cat) => cat.id === category.id)) {
        return prevCategories.filter((cat) => cat.id !== category.id)
      }

      return [...prevCategories, category]
    })
  }

  return (
    <button
      onClick={() => toggleSelectCategory()}
      className={`w-max rounded-full border px-4 py-1 ${
        !active
          ? 'border-purple-100  text-purple-100'
          : 'border-purple-200 bg-purple-200 text-gray-100'
      }`}
    >
      {category.name}
    </button>
  )
}
