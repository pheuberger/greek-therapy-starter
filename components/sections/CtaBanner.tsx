import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { CtaBannerSection } from '@/lib/types'

const backgroundColors = {
  sand: 'bg-sand-3',
  teal: 'bg-primary text-white',
  white: 'bg-white',
}

export function CtaBanner({ section }: { section: CtaBannerSection }) {
  const bgColor = section.backgroundColor || 'sand'

  return (
    <section className={cn('py-16', backgroundColors[bgColor as keyof typeof backgroundColors] || backgroundColors.sand)}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-4 text-4xl font-bold">
          {section.heading}
        </h2>
        {section.text && (
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            {section.text}
          </p>
        )}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {section.primaryCta && section.primaryCta.href && (
            <Link
              href={section.primaryCta.href}
              className={cn(
                'inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold transition-transform hover:scale-105',
                bgColor === 'teal'
                  ? 'bg-white text-primary'
                  : 'bg-primary text-white'
              )}
            >
              {section.primaryCta.label}
            </Link>
          )}
          {section.secondaryCta && section.secondaryCta.href && (
            <Link
              href={section.secondaryCta.href}
              className={cn(
                'inline-flex items-center rounded-full border-2 px-8 py-4 text-lg font-semibold transition-transform hover:scale-105',
                bgColor === 'teal'
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-gray-900 text-gray-900 hover:bg-gray-100'
              )}
            >
              {section.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
