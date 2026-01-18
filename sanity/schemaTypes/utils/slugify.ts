import type {SlugSourceContext} from 'sanity'

const DIACRITICS = /[\u0300-\u036f]/g
const NON_ALPHANUMERIC = /[^a-z0-9\s-]/g
const WHITESPACE = /\s+/g
const MULTIPLE_HYPHENS = /-+/g
const LEADING_TRAILING_HYPHENS = /^-|-$/g

export function slugify(input: string, _schemaType: {name: string}, _context: SlugSourceContext): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(NON_ALPHANUMERIC, '')
    .replace(WHITESPACE, '-')
    .replace(MULTIPLE_HYPHENS, '-')
    .replace(LEADING_TRAILING_HYPHENS, '')
}
