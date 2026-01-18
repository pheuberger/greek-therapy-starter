import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { TestimonialsSection } from '@/lib/types'

export function Testimonials({ section }: { section: TestimonialsSection }) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {section.testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg bg-gray-50 p-8">
              <blockquote className="mb-6 text-lg italic text-gray-700">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                {testimonial.image?.asset && (
                  <Image
                    src={urlFor(testimonial.image).width(60).height(60).url()}
                    alt={testimonial.image.alt || testimonial.author}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  {testimonial.role && (
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
