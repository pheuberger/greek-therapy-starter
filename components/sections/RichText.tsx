import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { RichTextSection } from '@/lib/types'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
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
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold text-gray-900">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-700">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-700">{children}</li>,
  },
  marks: {
    link: ({ value, children }: any) => {
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

export function RichText({ section }: { section: RichTextSection }) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="prose prose-lg max-w-none">
          <PortableText value={section.content} components={portableTextComponents} />
        </div>
      </div>
    </section>
  )
}
