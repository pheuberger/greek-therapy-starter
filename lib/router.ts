import {AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE} from './language'
import type {Language} from './types'

export type RouteType =
  | 'home'
  | 'blog-listing'
  | 'blog-post'
  | 'services-listing'
  | 'service-detail'
  | 'dynamic-page'

export interface ParsedRoute {
  language: Language
  type: RouteType
  slug: string | null
}

export function parseRoute(pathSegments: string[]): ParsedRoute {
  if (!pathSegments || pathSegments.length === 0) {
    return {language: DEFAULT_LANGUAGE, type: 'home', slug: null}
  }

  const firstSegment = pathSegments[0]
  const isLanguagePrefix = AVAILABLE_LANGUAGES.includes(firstSegment as Language)

  const language: Language = isLanguagePrefix ? (firstSegment as Language) : DEFAULT_LANGUAGE
  const routeSegments = isLanguagePrefix ? pathSegments.slice(1) : pathSegments

  if (routeSegments.length === 0) {
    return {language, type: 'home', slug: null}
  }

  const [first, second] = routeSegments

  if (first === 'blog') {
    if (second) {
      return {language, type: 'blog-post', slug: second}
    }
    return {language, type: 'blog-listing', slug: null}
  }

  if (first === 'services') {
    if (second) {
      return {language, type: 'service-detail', slug: second}
    }
    return {language, type: 'services-listing', slug: null}
  }

  return {language, type: 'dynamic-page', slug: first}
}
