import { draftMode } from 'next/headers'
import { sanityFetch as baseSanityFetch } from './client'
import type { QueryParams } from 'next-sanity'

/**
 * Server-only wrapper that automatically detects draft mode
 */
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}) {
  const draft = await draftMode()

  return baseSanityFetch<T>({
    query,
    params,
    tags,
    revalidate,
    isDraftMode: draft.isEnabled,
  })
}
