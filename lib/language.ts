import type {Language} from './types'

export const AVAILABLE_LANGUAGES: Language[] = ['el', 'en']

export const DEFAULT_LANGUAGE: Language = 'el'

export function parseSegments(segments: string[]): {
  language: Language
  slug: string | null
} {
  if (!segments || segments.length === 0) {
    return {language: DEFAULT_LANGUAGE, slug: null}
  }

  const firstSegment = segments[0]
  const isLanguageCode = AVAILABLE_LANGUAGES.includes(firstSegment as Language)

  if (isLanguageCode) {
    return {
      language: firstSegment as Language,
      slug: segments[1] || null,
    }
  }

  return {
    language: DEFAULT_LANGUAGE,
    slug: firstSegment,
  }
}

export function parseListingSegments(segments: string[]): {
  language: Language
  slug: string | null
} {
  if (!segments || segments.length === 0) {
    return {language: DEFAULT_LANGUAGE, slug: null}
  }

  const firstSegment = segments[0]
  const isLanguageCode = AVAILABLE_LANGUAGES.includes(firstSegment as Language)

  if (isLanguageCode) {
    return {
      language: firstSegment as Language,
      slug: segments[1] || null,
    }
  }

  return {
    language: DEFAULT_LANGUAGE,
    slug: firstSegment,
  }
}

export function getLocalizedPath(path: string, language: Language): string {
  if (language === DEFAULT_LANGUAGE) {
    return path
  }

  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '')

  return `/${language}${cleanPath}`
}

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && AVAILABLE_LANGUAGES.includes(firstSegment as Language)) {
    return firstSegment as Language
  }

  return DEFAULT_LANGUAGE
}

export function formatDate(
  date: Date | string,
  language: Language,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const locale = language === 'el' ? 'el-GR' : 'en-US'
  return dateObj.toLocaleDateString(locale, options)
}

export function getNavLabel(
  item: {labels?: {el: string; en: string}; label?: string},
  language: Language
): string {
  if (item.labels) {
    return item.labels[language]
  }
  return item.label || ''
}
