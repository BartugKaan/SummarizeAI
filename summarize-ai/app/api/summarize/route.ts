import { NextRequest, NextResponse } from 'next/server'
import { summarizeText } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    // Get the request body from the body
    const body = await request.json()
    const { text } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      )
    }

    const summary = await summarizeText(text)
    return NextResponse.json({ summary }, { status: 200 })
  } catch (error) {
    // Log the error to the console
    console.error('API Error (/api/summarize):', error)
    return NextResponse.json(
      { error: 'Failed to summarize text', details: (error as Error).message },
      { status: 500 }
    )
  }
}
