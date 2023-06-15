import { prisma } from '@/lib/prisma'
// import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  let idBook = ''
  for (const search of searchParams.values()) {
    idBook = search
  }

  const book = await prisma.book.findFirst({
    where: {
      id: idBook,
    },
    include: {
      ratings: true,
      categories: {
        select: {
          category: true,
        },
      },
    },
  })

  return NextResponse.json(book)
}

export { handler as GET }
