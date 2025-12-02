import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic' // Allow dynamic rendering for API routes

export async function GET() {
  try {
    const summaries = await prisma.summary.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        originalText: true,
        summary: true,
        createdAt: true,
      },
    })

    return NextResponse.json(summaries, { status: 200 })
  } catch (error) {
    console.log('API Error (/api/summaries):', error)
    return NextResponse.json(
      { error: 'Failed to fetch summaries', details: (error as Error).message },
      { status: 500 }
    )
  }
}
