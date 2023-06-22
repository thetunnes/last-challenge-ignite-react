import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

async function handler() {
  const top5Books = await prisma.book.findMany({
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    select: {
      cover_url: true,
      name: true,
      author: true,
      ratings: true,
    },
  })

  return NextResponse.json(top5Books.splice(0, 5))
}

export { handler as GET }
