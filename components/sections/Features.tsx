import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { FeaturesSection } from '@/lib/types'

export function Features({ section }: { section: FeaturesSection }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div
          className={`grid gap-8 ${
            section.features.length === 1
              ? 'md:grid-cols-1 lg:max-w-2xl lg:mx-auto'
              : section.features.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {section.features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {feature.image?.asset && (
                <div className="mb-4">
                  <Image
                    src={urlFor(feature.image).width(400).height(300).url()}
                    alt={feature.image.alt || ''}
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              )}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="text-gray-600">{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
