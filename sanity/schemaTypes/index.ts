import {type SchemaTypeDefinition} from 'sanity'
import {siteSettings} from './siteSettings'
import {navigationItem} from './utils/navigationItem'
import {heroSection} from './sections/hero'
import {richTextSection} from './sections/richText'
import {featuresSection} from './sections/features'
import {testimonialsSection} from './sections/testimonials'
import {ctaBannerSection} from './sections/ctaBanner'
import {contactFormSection} from './sections/contactForm'
import {headlineSection} from './sections/headline'
import {page} from './page'
import {therapyOffering} from './therapyOffering'
import {post} from './post'
import {author} from './author'
import {category} from './category'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Singletons
    siteSettings,
    // Utilities
    navigationItem,
    // Section types
    headlineSection,
    heroSection,
    richTextSection,
    featuresSection,
    testimonialsSection,
    ctaBannerSection,
    contactFormSection,
    // Content types
    page,
    therapyOffering,
    post,
    author,
    category,
  ],
}
