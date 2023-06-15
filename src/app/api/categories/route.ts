import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

async function handler() {
  const categories = await prisma.category.findMany()

  return NextResponse.json(categories)
}

export { handler as GET }
