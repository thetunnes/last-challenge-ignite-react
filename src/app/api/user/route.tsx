import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function handlerPost(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('id') as string

  const ratings = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
      book: {
        select: {
          total_pages: true,
          author: true,
          categories: true,
        },
      },
    },
  })

  if (!ratings.length) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    return NextResponse.json({
      mostReadCategory: '',
      readPageCount: 0,
      reviewedBookCount: 0,
      authorsCount: 0,
      user,
    })
  }

  const result = ratings.reduce(
    (acc, rating) => {
      const categories = acc.categories
      rating.book.categories.forEach((category) => {
        categories[category.categoryId] = categories[category.categoryId]
          ? categories[category.categoryId] + 1
          : 1
      })
      const objectCounts = {
        countBooks: acc.countBooks + 1,
        countPages: acc.countPages + rating.book.total_pages,
        authors: acc.authors.some((author) => author === rating.book.author)
          ? acc.authors
          : [...acc.authors, rating.book.author],
        categories,
      }

      return objectCounts
    },
    {
      countBooks: 0,
      countPages: 0,
      authors: [] as string[],
      categories: {} as { [key: string]: number },
    },
  )

  let mostReadCategoryId = ''
  let amountReadCategory = 0

  for (const category in result.categories) {
    if (result.categories[category] > amountReadCategory) {
      amountReadCategory = result.categories[category]
      mostReadCategoryId = category
    }
  }

  const mostReadCategory = await prisma.category.findFirst({
    where: {
      id: mostReadCategoryId,
    },
  })

  const data = {
    mostReadCategory: mostReadCategory?.name,
    readPageCount: result.countPages,
    reviewedBookCount: result.countBooks,
    authorsCount: result.authors.length,
    user: ratings[0]?.user,
  }

  return NextResponse.json(data)
}

export { handlerPost as GET }
