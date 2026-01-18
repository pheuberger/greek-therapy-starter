import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'
import {AVAILABLE_LANGUAGES} from '@/lib/language'
import type {Language} from '@/lib/types'

export async function POST(request: Request) {
  try {
    const {language} = await request.json()

    // Validate language
    if (!language || !AVAILABLE_LANGUAGES.includes(language as Language)) {
      return NextResponse.json({error: 'Invalid language'}, {status: 400})
    }

    // Set language cookie
    const cookieStore = await cookies()
    cookieStore.set('NEXT_LOCALE', language, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })

    return NextResponse.json({success: true, language})
  } catch (error) {
    console.error('Error setting language:', error)
    return NextResponse.json({error: 'Failed to set language'}, {status: 500})
  }
}
