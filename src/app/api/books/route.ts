import { prisma } from '@/lib/prisma'
// import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const idsCategories = []
  for (const search of searchParams.values()) {
    idsCategories.push(search)
  }
  let books = await prisma.book.findMany({
    include: {
      ratings: true,
    },
  })

  if (idsCategories.length) {
    books = await prisma.book.findMany({
      where: {
        categories: {
          some: {
            categoryId: { in: idsCategories },
          },
        },
      },
      include: {
        ratings: true,
      },
    })
  }

  return NextResponse.json(books)
}

export { handler as GET }
