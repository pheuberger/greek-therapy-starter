import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from 'next-sanity'
import {sanityFetch} from '@/sanity/lib/fetch'
import {
  PAGE_BY_SLUG_QUERY,
  POSTS_LIST_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_POSTS_LIST_QUERY,
  THERAPY_OFFERINGS_LIST_QUERY,
  THERAPY_OFFERING_BY_SLUG_QUERY,
  ALL_THERAPY_OFFERINGS_LIST_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {generatePageMetadata, generatePostMetadata} from '@/lib/metadata'
import {SectionRenderer} from '@/components/sections/SectionRenderer'
import {parseRoute} from '@/lib/router'
import {formatDate, getLocalizedPath, DEFAULT_LANGUAGE} from '@/lib/language'
import type {Page, Post, TherapyOffering, SiteSettings, Language} from '@/lib/types'

interface PageProps {
  params: Promise<{path?: string[]}>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {path = []} = await params
  const {language, type, slug} = parseRoute(path)

  switch (type) {
    case 'home': {
      const page = await sanityFetch<Page>({
        query: PAGE_BY_SLUG_QUERY,
        params: {slug: 'home', language},
        tags: ['page', 'home', language],
      })
      if (!page) return {}
      return generatePageMetadata({
        title: page.seo?.metaTitle || page.title,
        description: page.seo?.metaDescription,
        ogImage: page.seo?.ogImage,
        path: getLocalizedPath('/', language),
      })
    }

    case 'blog-listing':
      return generatePageMetadata({
        title: language === 'el' ? 'Άρθρα' : 'Blog',
        description:
          language === 'el'
            ? 'Σκέψεις και πηγές για την ψυχοθεραπεία και την ευεξία'
            : 'Insights, reflections, and resources on therapy and wellbeing',
        path: getLocalizedPath('/blog', language),
      })

    case 'blog-post': {
      const post = await sanityFetch<Post>({
        query: POST_BY_SLUG_QUERY,
        params: {slug, language},
        tags: ['post', slug || '', language],
      })
      if (!post) return {}
      return generatePostMetadata({
        title: post.seo?.metaTitle || post.title,
        excerpt: post.seo?.metaDescription || post.excerpt,
        coverImage: post.seo?.ogImage || post.coverImage,
        author: post.author?.name,
        publishedAt: post.publishedAt,
        slug: slug || '',
      })
    }

    case 'services-listing':
      return generatePageMetadata({
        title: language === 'el' ? 'Υπηρεσίες' : 'Services',
        description:
          language === 'el'
            ? 'Εξερευνήστε υπηρεσίες θεραπείας για την ευεξία σας'
            : 'Explore therapy services tailored to support your wellbeing journey',
        path: getLocalizedPath('/services', language),
      })

    case 'service-detail': {
      const service = await sanityFetch<TherapyOffering>({
        query: THERAPY_OFFERING_BY_SLUG_QUERY,
        params: {slug, language},
        tags: ['therapyOffering', slug || '', language],
      })
      if (!service) return {}
      return generatePageMetadata({
        title: service.seo?.metaTitle || service.title,
        description: service.seo?.metaDescription || service.summary,
        ogImage: service.seo?.ogImage || service.coverImage,
        path: getLocalizedPath(`/services/${slug}`, language),
      })
    }

    case 'dynamic-page': {
      const page = await sanityFetch<Page>({
        query: PAGE_BY_SLUG_QUERY,
        params: {slug, language},
        tags: ['page', slug || '', language],
      })
      if (!page) return {}
      return generatePageMetadata({
        title: page.seo?.metaTitle || page.title,
        description: page.seo?.metaDescription,
        ogImage: page.seo?.ogImage,
        path: getLocalizedPath(`/${slug}`, language),
      })
    }

    default:
      return {}
  }
}

export default async function DynamicPage({params}: PageProps) {
  const {path = []} = await params
  const {language, type, slug} = parseRoute(path)

  switch (type) {
    case 'home':
      return <HomePage language={language} />
    case 'blog-listing':
      return <BlogListingPage language={language} />
    case 'blog-post':
      return <BlogPostPage slug={slug!} language={language} />
    case 'services-listing':
      return <ServicesListingPage language={language} />
    case 'service-detail':
      return <ServiceDetailPage slug={slug!} language={language} />
    case 'dynamic-page':
      return <DynamicSanityPage slug={slug!} language={language} />
    default:
      notFound()
  }
}

async function HomePage({language}: {language: Language}) {
  let page = await sanityFetch<Page>({
    query: PAGE_BY_SLUG_QUERY,
    params: {slug: 'home', language},
    tags: ['page', 'home', language],
  })

  if (!page && language !== DEFAULT_LANGUAGE) {
    page = await sanityFetch<Page>({
      query: PAGE_BY_SLUG_QUERY,
      params: {slug: 'home', language: DEFAULT_LANGUAGE},
      tags: ['page', 'home', DEFAULT_LANGUAGE],
    })
  }

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">
            {language === 'el' ? 'Καλώς ήρθατε' : 'Welcome'}
          </h1>
          <p className="text-gray-600">
            {language === 'el'
              ? 'Δημιουργήστε μια σελίδα με slug "home" στο Sanity Studio.'
              : 'Please create a page with slug "home" in Sanity Studio.'}
          </p>
          <a
            href="/studio"
            className="mt-4 inline-block rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
          >
            {language === 'el' ? 'Πήγαινε στο Studio' : 'Go to Studio'}
          </a>
        </div>
      </div>
    )
  }

  return (
    <main>
      <SectionRenderer sections={page.sections || []} language={language} />
    </main>
  )
}

async function BlogListingPage({language}: {language: Language}) {
  const posts = await sanityFetch<Post[]>({
    query: ALL_POSTS_LIST_QUERY,
    tags: ['post'],
  }) || []

  const currentLanguagePosts = posts.filter((p) => p.language === language)
  const otherLanguagePosts = posts.filter(
    (p) => p.language !== language && !currentLanguagePosts.some((cp) => cp.slug.current === p.slug.current)
  )
  const allPosts = [...currentLanguagePosts, ...otherLanguagePosts]

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            {language === 'el' ? 'Άρθρα' : 'Blog'}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {language === 'el'
              ? 'Σκέψεις και πηγές για την ψυχοθεραπεία και την ευεξία'
              : 'Insights, reflections, and resources on therapy and wellbeing'}
          </p>
        </div>

        {allPosts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">
              {language === 'el' ? 'Δεν υπάρχουν άρθρα ακόμη.' : 'No blog posts yet.'}
            </p>
            <a
              href="/studio"
              className="mt-4 inline-block rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
            >
              {language === 'el' ? 'Δημιουργήστε το πρώτο σας άρθρο' : 'Create your first post'}
            </a>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <Link
                key={post._id}
                href={getLocalizedPath(`/blog/${post.slug.current}`, language)}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {post.coverImage?.asset && (
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <Image
                      src={urlFor(post.coverImage).width(600).height(400).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, language)}</time>
                    {post.categories && post.categories.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{post.categories[0].title}</span>
                      </>
                    )}
                    {post.language !== language && (
                      <>
                        <span>•</span>
                        <span className="rounded bg-gray-200 px-2 py-0.5 text-xs">
                          {post.language === 'el' ? 'Ελληνικά μόνο' : 'English only'}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-gray-700">
                    {post.title}
                  </h2>
                  <p className="text-gray-600">{post.excerpt}</p>
                  {post.author && (
                    <div className="mt-4 flex items-center gap-3">
                      {post.author.photo?.asset && (
                        <Image
                          src={urlFor(post.author.photo).width(40).height(40).url()}
                          alt={post.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

async function BlogPostPage({slug, language}: {slug: string; language: Language}) {
  let post = await sanityFetch<Post>({
    query: POST_BY_SLUG_QUERY,
    params: {slug, language},
    tags: ['post', slug, language],
  })

  if (!post && language !== DEFAULT_LANGUAGE) {
    post = await sanityFetch<Post>({
      query: POST_BY_SLUG_QUERY,
      params: {slug, language: DEFAULT_LANGUAGE},
      tags: ['post', slug, DEFAULT_LANGUAGE],
    })
  }

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white py-16">
      <article className="container mx-auto max-w-4xl px-6">
        <Link
          href={getLocalizedPath('/blog', language)}
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          ← {language === 'el' ? 'Πίσω στα Άρθρα' : 'Back to Blog'}
        </Link>

        {post.coverImage?.asset && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(post.coverImage).width(1200).height(630).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mb-6">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
          <time dateTime={post.publishedAt} className="text-sm text-gray-500">
            {formatDate(post.publishedAt, language)}
          </time>
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">{post.title}</h1>

        {post.excerpt && <p className="mb-8 text-xl text-gray-600">{post.excerpt}</p>}

        {post.author && (
          <div className="mb-12 flex items-center gap-4 border-b border-t border-gray-200 py-6">
            {post.author.photo?.asset && (
              <Image
                src={urlFor(post.author.photo).width(60).height(60).url()}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-semibold text-gray-900">{post.author.name}</div>
              {post.author.bio && <div className="text-sm text-gray-600">{post.author.bio}</div>}
            </div>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href={getLocalizedPath('/blog', language)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← {language === 'el' ? 'Πίσω στα Άρθρα' : 'Back to Blog'}
          </Link>
        </div>
      </article>
    </main>
  )
}

async function ServicesListingPage({language}: {language: Language}) {
  const services = await sanityFetch<TherapyOffering[]>({
    query: ALL_THERAPY_OFFERINGS_LIST_QUERY,
    tags: ['therapyOffering'],
  }) || []

  const currentLanguageServices = services.filter((s) => s.language === language)
  const otherLanguageServices = services.filter(
    (s) =>
      s.language !== language && !currentLanguageServices.some((cs) => cs.slug.current === s.slug.current)
  )
  const allServices = [...currentLanguageServices, ...otherLanguageServices]

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            {language === 'el' ? 'Υπηρεσίες' : 'Services'}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {language === 'el'
              ? 'Εξερευνήστε υπηρεσίες θεραπείας για την ευεξία σας'
              : 'Explore therapy services tailored to support your wellbeing journey'}
          </p>
        </div>

        {allServices.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">
              {language === 'el' ? 'Δεν υπάρχουν διαθέσιμες υπηρεσίες.' : 'No services available yet.'}
            </p>
            <a
              href="/studio"
              className="mt-4 inline-block rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
            >
              {language === 'el' ? 'Προσθέστε την πρώτη υπηρεσία' : 'Add your first service'}
            </a>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service) => (
              <Link
                key={service._id}
                href={getLocalizedPath(`/services/${service.slug.current}`, language)}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {service.coverImage?.asset && (
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <Image
                      src={urlFor(service.coverImage).width(600).height(400).url()}
                      alt={service.coverImage.alt || service.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  {service.language !== language && (
                    <span className="mb-2 inline-block rounded bg-gray-200 px-2 py-0.5 text-xs">
                      {service.language === 'el' ? 'Ελληνικά μόνο' : 'English only'}
                    </span>
                  )}
                  <h2 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-gray-700">
                    {service.title}
                  </h2>
                  <p className="mb-4 text-gray-600">{service.summary}</p>

                  {service.sessionDetails && (
                    <div className="space-y-1 border-t border-gray-200 pt-4 text-sm text-gray-600">
                      {service.sessionDetails.duration && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {language === 'el' ? 'Διάρκεια:' : 'Duration:'}
                          </span>
                          <span>{service.sessionDetails.duration}</span>
                        </div>
                      )}
                      {service.sessionDetails.format && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {language === 'el' ? 'Μορφή:' : 'Format:'}
                          </span>
                          <span className="capitalize">{service.sessionDetails.format}</span>
                        </div>
                      )}
                      {service.sessionDetails.fees && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {language === 'el' ? 'Τιμή:' : 'Fees:'}
                          </span>
                          <span>{service.sessionDetails.fees}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

async function ServiceDetailPage({slug, language}: {slug: string; language: Language}) {
  let [service, siteSettings] = await Promise.all([
    sanityFetch<TherapyOffering>({
      query: THERAPY_OFFERING_BY_SLUG_QUERY,
      params: {slug, language},
      tags: ['therapyOffering', slug, language],
    }),
    sanityFetch<SiteSettings>({
      query: SITE_SETTINGS_QUERY,
      tags: ['siteSettings'],
    }),
  ])

  if (!service && language !== DEFAULT_LANGUAGE) {
    service = await sanityFetch<TherapyOffering>({
      query: THERAPY_OFFERING_BY_SLUG_QUERY,
      params: {slug, language: DEFAULT_LANGUAGE},
      tags: ['therapyOffering', slug, DEFAULT_LANGUAGE],
    })
  }

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white py-16">
      <article className="container mx-auto max-w-4xl px-6">
        <Link
          href={getLocalizedPath('/services', language)}
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          ← {language === 'el' ? 'Πίσω στις Υπηρεσίες' : 'Back to Services'}
        </Link>

        {service.coverImage?.asset && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(service.coverImage).width(1200).height(630).url()}
              alt={service.coverImage.alt || service.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">{service.title}</h1>
        <p className="mb-8 text-xl text-gray-600">{service.summary}</p>

        {service.sessionDetails && (
          <div className="mb-8 rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {language === 'el' ? 'Πληροφορίες Συνεδρίας' : 'Session Information'}
            </h2>
            <div className="space-y-2">
              {service.sessionDetails.duration && (
                <div className="flex items-start gap-3">
                  <span className="font-medium text-gray-700">
                    {language === 'el' ? 'Διάρκεια:' : 'Duration:'}
                  </span>
                  <span className="text-gray-600">{service.sessionDetails.duration}</span>
                </div>
              )}
              {service.sessionDetails.format && (
                <div className="flex items-start gap-3">
                  <span className="font-medium text-gray-700">
                    {language === 'el' ? 'Μορφή:' : 'Format:'}
                  </span>
                  <span className="capitalize text-gray-600">{service.sessionDetails.format}</span>
                </div>
              )}
              {service.sessionDetails.fees && (
                <div className="flex items-start gap-3">
                  <span className="font-medium text-gray-700">
                    {language === 'el' ? 'Τιμή:' : 'Fees:'}
                  </span>
                  <span className="text-gray-600">{service.sessionDetails.fees}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {service.artTherapyDetails && (
          <div className="mb-8 rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {language === 'el' ? 'Λεπτομέρειες Θεραπείας Τέχνης' : 'Art Therapy Details'}
            </h2>
            <div className="space-y-3">
              {service.artTherapyDetails.modalities && service.artTherapyDetails.modalities.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">
                    {language === 'el' ? 'Καλλιτεχνικές τεχνικές: ' : 'Art modalities: '}
                  </span>
                  <span className="text-gray-600">
                    {service.artTherapyDetails.modalities.join(', ')}
                  </span>
                </div>
              )}
              {service.artTherapyDetails.materials && (
                <div>
                  <span className="font-medium text-gray-700">
                    {language === 'el' ? 'Παρεχόμενα υλικά: ' : 'Materials provided: '}
                  </span>
                  <span className="text-gray-600">{service.artTherapyDetails.materials}</span>
                </div>
              )}
              {service.artTherapyDetails.noExperienceRequired && (
                <div className="rounded bg-white p-3 text-sm">
                  ✓{' '}
                  {language === 'el'
                    ? 'Δεν απαιτείται καλλιτεχνική εμπειρία'
                    : 'No art experience required'}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="prose prose-lg mb-12 max-w-none">
          <PortableText value={service.description} components={servicePortableTextComponents} />
        </div>

        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-12 border-t border-gray-200 pt-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              {language === 'el' ? 'Συχνές Ερωτήσεις' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.cta && (
          <div className="rounded-lg bg-gray-900 p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">
              {service.cta.text ||
                (language === 'el' ? 'Έτοιμοι να ξεκινήσετε;' : 'Ready to get started?')}
            </h2>
            {service.cta.showContactInfo && siteSettings?.contactInfo && (
              <div className="space-y-2 text-lg">
                {siteSettings.contactInfo.email && (
                  <div>
                    <a
                      href={`mailto:${siteSettings.contactInfo.email}`}
                      className="underline hover:text-gray-200"
                    >
                      {siteSettings.contactInfo.email}
                    </a>
                  </div>
                )}
                {siteSettings.contactInfo.phone && (
                  <div>
                    <a
                      href={`tel:${siteSettings.contactInfo.phone}`}
                      className="underline hover:text-gray-200"
                    >
                      {siteSettings.contactInfo.phone}
                    </a>
                  </div>
                )}
              </div>
            )}
            {siteSettings?.bookingUrl && (
              <a
                href={siteSettings.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-white px-8 py-3 text-gray-900 transition-transform hover:scale-105"
              >
                {language === 'el' ? 'Κλείστε Ραντεβού' : 'Schedule a Session'}
              </a>
            )}
          </div>
        )}

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href={getLocalizedPath('/services', language)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← {language === 'el' ? 'Πίσω στις Υπηρεσίες' : 'Back to Services'}
          </Link>
        </div>
      </article>
    </main>
  )
}

async function DynamicSanityPage({slug, language}: {slug: string; language: Language}) {
  let page = await sanityFetch<Page>({
    query: PAGE_BY_SLUG_QUERY,
    params: {slug, language},
    tags: ['page', slug, language],
  })

  if (!page && language !== DEFAULT_LANGUAGE) {
    page = await sanityFetch<Page>({
      query: PAGE_BY_SLUG_QUERY,
      params: {slug, language: DEFAULT_LANGUAGE},
      tags: ['page', slug, DEFAULT_LANGUAGE],
    })
  }

  if (!page) {
    notFound()
  }

  return (
    <main>
      <SectionRenderer sections={page.sections || []} language={language} />
    </main>
  )
}

const portableTextComponents = {
  types: {
    image: ({value}: any) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({children}: any) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({children}: any) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({children}: any) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold text-gray-900">{children}</h4>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({children}: any) => (
      <p className="mb-4 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
  },
  list: {
    bullet: ({children}: any) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
    number: ({children}: any) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    link: ({value, children}: any) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      )
    },
  },
}

const servicePortableTextComponents = {
  block: {
    h2: ({children}: any) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({children}: any) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold text-gray-900">{children}</h3>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({children}: any) => (
      <p className="mb-4 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
  },
  list: {
    bullet: ({children}: any) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
  },
  marks: {
    strong: ({children}: any) => <strong className="font-semibold">{children}</strong>,
    em: ({children}: any) => <em className="italic">{children}</em>,
  },
}
