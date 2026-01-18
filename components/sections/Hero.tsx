import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { HeroSection } from '@/lib/types'

export function Hero({ section }: { section: HeroSection }) {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gray-50">
      {section.image?.asset && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(section.image).width(1920).height(1080).url()}
            alt={section.image.alt || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-6 py-32 text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          {section.heading}
        </h1>
        {section.subheading && (
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90 md:text-2xl">
            {section.subheading}
          </p>
        )}
        {section.cta && section.cta.href && (
          <Link
            href={section.cta.href}
            className="inline-flex items-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-transform hover:scale-105"
          >
            {section.cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
