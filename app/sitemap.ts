import type {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/client'
import {
  ALL_PAGES_SLUGS_QUERY,
  ALL_POSTS_SLUGS_QUERY,
  ALL_THERAPY_OFFERINGS_SLUGS_QUERY,
} from '@/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

type ContentItem = {slug: string; language: string}

function generateAlternates(path: string): {
  languages: Record<string, string>
} {
  return {
    languages: {
      el: `${siteUrl}${path}`,
      en: `${siteUrl}/en${path === '/' ? '' : path}`,
      'x-default': `${siteUrl}${path}`,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts, services] = await Promise.all([
    sanityFetch<ContentItem[]>({
      query: ALL_PAGES_SLUGS_QUERY,
      tags: ['page'],
    }),
    sanityFetch<ContentItem[]>({
      query: ALL_POSTS_SLUGS_QUERY,
      tags: ['post'],
    }),
    sanityFetch<ContentItem[]>({
      query: ALL_THERAPY_OFFERINGS_SLUGS_QUERY,
      tags: ['therapyOffering'],
    }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: generateAlternates('/'),
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: generateAlternates('/blog'),
    },
    {
      url: `${siteUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: generateAlternates('/services'),
    },
    {
      url: `${siteUrl}/en/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const uniqueSlugs = new Set<string>()
  const pageRoutes: MetadataRoute.Sitemap = []

  for (const page of pages) {
    if (page.slug === 'home' || uniqueSlugs.has(page.slug)) continue
    uniqueSlugs.add(page.slug)

    pageRoutes.push({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: generateAlternates(`/${page.slug}`),
    })
    pageRoutes.push({
      url: `${siteUrl}/en/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  const uniquePostSlugs = new Set<string>()
  const postRoutes: MetadataRoute.Sitemap = []

  for (const post of posts) {
    if (uniquePostSlugs.has(post.slug)) continue
    uniquePostSlugs.add(post.slug)

    postRoutes.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: generateAlternates(`/blog/${post.slug}`),
    })
    postRoutes.push({
      url: `${siteUrl}/en/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  const uniqueServiceSlugs = new Set<string>()
  const serviceRoutes: MetadataRoute.Sitemap = []

  for (const service of services) {
    if (uniqueServiceSlugs.has(service.slug)) continue
    uniqueServiceSlugs.add(service.slug)

    serviceRoutes.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: generateAlternates(`/services/${service.slug}`),
    })
    serviceRoutes.push({
      url: `${siteUrl}/en/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  return [...staticRoutes, ...pageRoutes, ...postRoutes, ...serviceRoutes]
}
