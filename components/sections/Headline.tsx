import { cn } from '@/lib/utils'
import type { HeadlineSection } from '@/lib/types'

const headingStyles = {
  h1: 'text-3xl md:text-4xl lg:text-5xl',
  h2: 'text-3xl md:text-4xl',
  h3: 'text-2xl md:text-3xl',
}

function normalizeLevel(level: string | undefined): 'h1' | 'h2' | 'h3' {
  if (!level) return 'h2'
  if (level.startsWith('h1')) return 'h1'
  if (level.startsWith('h3')) return 'h3'
  return 'h2'
}

function normalizeAlignment(alignment: string | undefined): 'left' | 'center' {
  if (!alignment) return 'center'
  if (alignment.startsWith('left')) return 'left'
  return 'center'
}

export function Headline({ section }: { section: HeadlineSection }) {
  const alignment = normalizeAlignment(section.alignment)
  const level = normalizeLevel(section.level)

  return (
    <section className="bg-white py-12">
      <div
        className={cn(
          'container mx-auto px-6',
          alignment === 'center' && 'text-center'
        )}
      >
        {level === 'h1' && (
          <h1 className={cn('font-bold text-gray-900', headingStyles.h1)}>
            {section.heading}
          </h1>
        )}
        {level === 'h2' && (
          <h2 className={cn('font-bold text-gray-900', headingStyles.h2)}>
            {section.heading}
          </h2>
        )}
        {level === 'h3' && (
          <h3 className={cn('font-bold text-gray-900', headingStyles.h3)}>
            {section.heading}
          </h3>
        )}
        {section.subtitle && (
          <p
            className={cn(
              'mt-4 text-lg text-gray-600 md:text-xl',
              alignment === 'center' && 'mx-auto max-w-3xl'
            )}
          >
            {section.subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
