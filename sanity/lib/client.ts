import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Enable stega in development for visual editing
const isDevelopment = process.env.NODE_ENV === 'development'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disabled for ISR and tag-based revalidation
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
  stega: {
    enabled: isDevelopment,
    studioUrl: '/studio',
  },
})

// Client for draft mode with token
export const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

// Helper function for fetching data with proper caching and revalidation
// This function must be used in server components only
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  revalidate = 60, // Default revalidate time in seconds
  isDraftMode = false,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
  isDraftMode?: boolean
}): Promise<T | null> {
  try {
    // Use draft client in draft mode
    if (isDraftMode) {
      return await draftClient.fetch<T>(query, params, {
        next: {
          revalidate: 0, // No caching in draft mode
          tags,
        },
      })
    }

    // Use regular client for published content
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: revalidate,
        tags,
      },
    })
  } catch (error) {
    // Fail gracefully when Sanity is not configured or unreachable
    // This allows the app to run with fallback UI
    console.error('Sanity fetch error:', error)
    return null as T
  }
}
