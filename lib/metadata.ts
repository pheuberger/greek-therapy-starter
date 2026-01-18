import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SITE_SETTINGS_QUERY } from './queries'
import type { SiteSettings, SanityImage } from './types'
import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'
import { DEFAULT_LANGUAGE } from './language'

// Image URL builder
const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// Get site URL from environment or default
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Fetch site settings for metadata generation
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ['site'],
  })
}

/**
 * Generate base metadata from site settings
 */
export async function generateBaseMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  if (!settings) {
    return {
      title: 'Loading...',
      description: 'Please configure site settings in Sanity Studio',
    }
  }

  const metadata: Metadata = {
    title: {
      default: settings.defaultSeo?.metaTitle || settings.title[DEFAULT_LANGUAGE],
      template: `%s | ${settings.title[DEFAULT_LANGUAGE]}`,
    },
    description: settings.defaultSeo?.metaDescription || settings.description[DEFAULT_LANGUAGE],
    metadataBase: new URL(siteUrl),
  }

  // Add Open Graph image if available
  if (settings.defaultSeo?.ogImage?.asset) {
    const ogImageUrl = urlFor(settings.defaultSeo.ogImage)
      .width(1200)
      .height(630)
      .url()

    metadata.openGraph = {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: settings.defaultSeo.ogImage.alt || settings.title[DEFAULT_LANGUAGE],
        },
      ],
    }

    metadata.twitter = {
      card: 'summary_large_image',
      images: [ogImageUrl],
    }
  }

  return metadata
}

/**
 * Generate metadata for a specific page with SEO overrides
 */
export async function generatePageMetadata({
  title,
  description,
  ogImage,
  path,
}: {
  title?: string
  description?: string
  ogImage?: SanityImage
  path?: string
}): Promise<Metadata> {
  const settings = await getSiteSettings()

  const metadata: Metadata = {}

  // Title
  if (title) {
    metadata.title = title
  }

  // Description
  if (description) {
    metadata.description = description
  } else if (settings?.defaultSeo?.metaDescription) {
    metadata.description = settings.defaultSeo.metaDescription
  }

  // Open Graph
  const ogData: Metadata['openGraph'] = {}

  if (title) {
    ogData.title = title
  }

  if (description) {
    ogData.description = description
  }

  if (path) {
    ogData.url = `${siteUrl}${path}`
  }

  // OG Image priority: page override > default from settings
  const imageToUse = ogImage || settings?.defaultSeo?.ogImage

  if (imageToUse?.asset) {
    const ogImageUrl = urlFor(imageToUse).width(1200).height(630).url()

    ogData.images = [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: imageToUse.alt || title || settings?.title[DEFAULT_LANGUAGE] || '',
      },
    ]
  }

  if (Object.keys(ogData).length > 0) {
    metadata.openGraph = ogData
  }

  // Twitter Card
  if (imageToUse?.asset) {
    const twitterImageUrl = urlFor(imageToUse).width(1200).height(630).url()

    metadata.twitter = {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [twitterImageUrl],
    }
  }

  return metadata
}

/**
 * Generate metadata for blog posts with author and date
 */
export async function generatePostMetadata({
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  slug,
}: {
  title: string
  excerpt: string
  coverImage?: SanityImage
  author?: string
  publishedAt?: string
  slug: string
}): Promise<Metadata> {
  const settings = await getSiteSettings()

  const metadata: Metadata = {
    title,
    description: excerpt,
  }

  // Open Graph
  const ogData: Metadata['openGraph'] = {
    type: 'article',
    title,
    description: excerpt,
    url: `${siteUrl}/blog/${slug}`,
  }

  if (publishedAt) {
    ogData.publishedTime = publishedAt
  }

  if (author) {
    ogData.authors = [author]
  }

  // Use cover image if available, otherwise fall back to default
  const imageToUse = coverImage || settings?.defaultSeo?.ogImage

  if (imageToUse?.asset) {
    const ogImageUrl = urlFor(imageToUse).width(1200).height(630).url()

    ogData.images = [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: imageToUse.alt || title,
      },
    ]
  }

  metadata.openGraph = ogData

  // Twitter Card
  if (imageToUse?.asset) {
    const twitterImageUrl = urlFor(imageToUse).width(1200).height(630).url()

    metadata.twitter = {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [twitterImageUrl],
    }
  }

  return metadata
}
