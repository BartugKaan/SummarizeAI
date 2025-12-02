import OpenAI from 'openai'
import { env } from '@/lib/env'

const openai = new OpenAI({
  apiKey: env.get('OPENAI_API_KEY'),
})

export async function summarizeText(text: string): Promise<string> {
  if (!text.trim()) {
    throw new Error('Text is required')
  }
  if (text.length < 20) {
    throw new Error('Text must be at least 20 characters')
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that summarizes text in a concise and clear manner.',
        },
        {
          role: 'user',
          content: `Summarize the following text: ${text}`,
        },
      ],
      max_tokens: 500,
    })
    return response.choices[0].message.content || 'No summary available'
  } catch (error) {
    console.log('Error summarizing text:', error)
    throw new Error(`Failed to summarize text: ${(error as Error).message}`)
  }
}
