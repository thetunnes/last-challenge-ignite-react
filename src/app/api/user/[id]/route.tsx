import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function handlerPost(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('id') as string

  const ratings = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    select: {
      book: {
        select: {
          _count: true,
          total_pages: true,
          author: true,
        },
      },
    },
  })

  console.log(ratings)

  return NextResponse.next()
}

export { handlerPost as GET }
