import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

async function handlerPost(req: NextRequest) {
  const schemaBody = z.object({
    description: z.string(),
    bookId: z.string().uuid(),
    userId: z.string().uuid(),
    rate: z.number(),
  })
  const body = await req.json()

  const { bookId, description, rate, userId } = schemaBody.parse(body)

  await prisma.rating.create({
    data: {
      description,
      rate,
      book_id: bookId,
      user_id: userId,
    },
  })

  return NextResponse.json(
    { message: 'Avaliação adicionada com sucesso!' },
    { status: 201 },
  )
}

export { handlerPost as POST }
