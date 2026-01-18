// Base types
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

// Language types
export type Language = 'el' | 'en'

export interface NavigationItem {
  href: string
  label?: string
  labels?: {
    el: string
    en: string
  }
}

export interface MultilingualText {
  el: string
  en: string
}

// Site Settings
export interface SiteSettings {
  title: MultilingualText
  description: MultilingualText
  logo?: SanityImage
  contactInfo?: {
    email?: string
    phone?: string
    officeAddress?: string
    mapsUrl?: string
  }
  navigation?: NavigationItem[]
  footerLinks?: NavigationItem[]
  defaultSeo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
  bookingUrl?: string
  bookingButton?: {
    labels: {
      el: string
      en: string
    }
    href: string
  }
  footerLabels?: {
    quickLinksTitle?: MultilingualText
    getStartedTitle?: MultilingualText
    getStartedText?: MultilingualText
    bookingButtonText?: MultilingualText
    copyright?: MultilingualText
  }
}

// Section types
export interface HeroSection {
  _type: 'heroSection'
  _key: string
  heading: string
  subheading?: string
  cta?: {
    label: string
    href: string | null
  }
  image?: SanityImage
}

export interface RichTextSection {
  _type: 'richTextSection'
  _key: string
  content: any[] // Portable Text
}

export interface FeaturesSection {
  _type: 'featuresSection'
  _key: string
  features: Array<{
    title: string
    description?: string
    image?: SanityImage
  }>
}

export interface TestimonialsSection {
  _type: 'testimonialsSection'
  _key: string
  testimonials: Array<{
    quote: string
    author: string
    role?: string
    image?: SanityImage
  }>
}

export interface CtaBannerSection {
  _type: 'ctaBannerSection'
  _key: string
  heading: string
  text?: string
  primaryCta?: {
    label: string
    href: string | null
  }
  secondaryCta?: {
    label: string
    href: string | null
  }
  backgroundColor?: string
}

export interface ContactFormSection {
  _type: 'contactFormSection'
  _key: string
  phoneNumber?: string
  phoneText?: string
  requiredFieldsNote?: string
  consentText: string
  privacyPolicyPath?: string
  privacyPolicyLinkText?: string
  spamNote?: string
  labels: {
    fullName: string
    email: string
    phone: string
    message: string
  }
  placeholders?: {
    fullName?: string
    email?: string
    phone?: string
    message?: string
  }
  submitButtonText: string
  successMessage: string
  errorMessage: string
}

export interface HeadlineSection {
  _type: 'headlineSection'
  _key: string
  heading: string
  subtitle?: string
  level?: 'h1' | 'h2' | 'h3'
  alignment?: 'left' | 'center'
}

export type Section =
  | HeroSection
  | RichTextSection
  | FeaturesSection
  | TestimonialsSection
  | CtaBannerSection
  | ContactFormSection
  | HeadlineSection

// Page
export interface Page {
  _id: string
  language: Language
  title: string
  slug: {
    current: string
  }
  sections?: Section[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}

// Author
export interface Author {
  _id: string
  name: string
  bio?: string
  photo?: SanityImage
}

// Category
export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}

// Post
export interface Post {
  _id: string
  language: Language
  title: string
  slug: {
    current: string
  }
  excerpt: string
  publishedAt: string
  coverImage?: SanityImage
  author: Author
  categories?: Category[]
  body: any[] // Portable Text
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}

// Therapy Offering
export interface TherapyOffering {
  _id: string
  language: Language
  title: string
  slug: {
    current: string
  }
  summary: string
  coverImage?: SanityImage
  description: any[] // Portable Text
  artTherapyDetails?: {
    modalities?: string[]
    materials?: string
    noExperienceRequired?: boolean
  }
  sessionDetails?: {
    duration?: string
    format?: 'in-person' | 'online' | 'both'
    fees?: string
  }
  faqs?: Array<{
    question: string
    answer: string
  }>
  cta?: {
    text: string
    showContactInfo: boolean
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}
