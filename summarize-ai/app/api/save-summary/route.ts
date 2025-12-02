import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { originalText, summary } = body

    if (!originalText || !summary) {
      return NextResponse.json(
        { error: 'Original text and summary are required' },
        { status: 400 }
      )
    }

    const savedSummary = await prisma.summary.create({
      data: {
        originalText,
        summary,
      },
    })
    return NextResponse.json(savedSummary, { status: 201 })
  } catch (error) {
    console.error('API Error (/api/save-summary):', error)
    return NextResponse.json(
      { error: 'Failed to save summary', details: (error as Error).message },
      { status: 500 }
    )
  }
}
