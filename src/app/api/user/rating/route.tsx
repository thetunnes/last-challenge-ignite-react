import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function handler(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('id') as string
  const nameBook = req.nextUrl.searchParams.get('name_book') as string

  console.log(userId, nameBook)
  let ratingsByUser = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      book: true,
      id: true,
      description: true,
      created_at: true,
      rate: true,
    },
  })

  if (nameBook) {
    ratingsByUser = await prisma.rating.findMany({
      where: {
        user_id: userId,
        book: {
          name: nameBook,
        },
      },
      select: {
        book: true,
        id: true,
        description: true,
        created_at: true,
        rate: true,
      },
    })
  }

  return NextResponse.json(ratingsByUser)
}

export { handler as GET }
