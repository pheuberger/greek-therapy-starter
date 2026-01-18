import type { Section, Language } from '@/lib/types'
import { Hero } from './Hero'
import { RichText } from './RichText'
import { Features } from './Features'
import { Testimonials } from './Testimonials'
import { CtaBanner } from './CtaBanner'
import { ContactForm } from './ContactForm'
import { Headline } from './Headline'

export function SectionRenderer({ sections, language = 'el' }: { sections: Section[]; language?: Language }) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSection':
            return <Hero key={section._key} section={section} />
          case 'richTextSection':
            return <RichText key={section._key} section={section} />
          case 'featuresSection':
            return <Features key={section._key} section={section} />
          case 'testimonialsSection':
            return <Testimonials key={section._key} section={section} />
          case 'ctaBannerSection':
            return <CtaBanner key={section._key} section={section} />
          case 'contactFormSection':
            return <ContactForm key={section._key} section={section} language={language} />
          case 'headlineSection':
            return <Headline key={section._key} section={section} />
          default:
            console.warn(`Unknown section type: ${(section as any)._type}`)
            return null
        }
      })}
    </>
  )
}
