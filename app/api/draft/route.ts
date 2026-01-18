import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  // Check the secret - Sanity sends 'sanity-preview-secret', also support 'secret' for manual testing
  const secret = searchParams.get('sanity-preview-secret') || searchParams.get('secret')
  const pathname = searchParams.get('sanity-preview-pathname') || searchParams.get('slug')

  // Verify the secret matches
  if (!secret || secret !== process.env.SANITY_DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the fetched document
  // If no pathname is provided, redirect to the home page
  const redirectPath = pathname || '/'
  redirect(redirectPath)
}
