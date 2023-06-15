import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

async function handler() {
  const listRating = await prisma.rating.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
      user: true,
    },
  })

  return NextResponse.json(listRating)
}

export { handler as GET }
