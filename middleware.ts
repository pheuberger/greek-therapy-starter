import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

const AVAILABLE_LANGUAGES = ['el', 'en']
const DEFAULT_LANGUAGE = 'el'
const LANGUAGE_COOKIE = 'NEXT_LOCALE'

function getLanguageFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && AVAILABLE_LANGUAGES.includes(firstSegment)) {
    return firstSegment
  }

  return null
}

function getBrowserLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return DEFAULT_LANGUAGE

  const languages = acceptLanguage.split(',').map((lang) => lang.split(';')[0].trim())

  for (const lang of languages) {
    const shortLang = lang.substring(0, 2).toLowerCase()
    if (shortLang === 'el') return 'el'
    if (shortLang === 'en') return 'en'
  }

  return DEFAULT_LANGUAGE
}

function shouldSkipMiddleware(pathname: string): boolean {
  const isNextInternal = pathname.startsWith('/_next')
  const isApiRoute = pathname.startsWith('/api')
  const isSanityStudio = pathname.startsWith('/studio')
  const isStaticFile = pathname.includes('.')

  return isNextInternal || isApiRoute || isSanityStudio || isStaticFile
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  const pathLanguage = getLanguageFromPath(pathname)
  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value
  const browserLanguage = getBrowserLanguage(request)

  const resolvedLanguage = pathLanguage || cookieLanguage || browserLanguage || DEFAULT_LANGUAGE

  const response = NextResponse.next()
  response.headers.set('x-language', resolvedLanguage)

  const shouldUpdateCookie = !cookieLanguage || (pathLanguage && cookieLanguage !== pathLanguage)
  if (shouldUpdateCookie) {
    response.cookies.set(LANGUAGE_COOKIE, resolvedLanguage, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
