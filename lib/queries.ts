import {groq} from 'next-sanity'

// Site settings query (no language filtering - global)
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  title,
  description,
  logo {
    asset->,
    alt
  },
  contactInfo {
    email,
    phone,
    officeAddress,
    mapsUrl
  },
  navigation[] {
    href,
    labels {
      el,
      en
    }
  },
  footerLinks[] {
    href,
    labels {
      el,
      en
    }
  },
  bookingButton {
    labels {
      el,
      en
    },
    href
  },
  footerLabels {
    quickLinksTitle {
      el,
      en
    },
    getStartedTitle {
      el,
      en
    },
    getStartedText {
      el,
      en
    },
    bookingButtonText {
      el,
      en
    },
    copyright {
      el,
      en
    }
  },
  defaultSeo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->,
      alt
    }
  },
  bookingUrl
}`

// Page queries with language support
export const PAGE_BY_SLUG_QUERY = groq`*[_type == "page" && slug.current == $slug && language == $language][0] {
  _id,
  language,
  title,
  slug,
  sections[] {
    _type,
    _key,
    // Headline section
    _type == "headlineSection" => {
      heading,
      subtitle,
      level,
      alignment
    },
    // Hero section
    _type == "heroSection" => {
      heading,
      subheading,
      cta {
        label,
        href
      },
      image {
        asset->,
        alt
      }
    },
    // Rich text section
    _type == "richTextSection" => {
      content[] {
        ...,
        _type == "image" => {
          asset->,
          alt,
          caption
        }
      }
    },
    // Features section
    _type == "featuresSection" => {
      features[] {
        title,
        description,
        image {
          asset->,
          alt
        }
      }
    },
    // Testimonials section
    _type == "testimonialsSection" => {
      testimonials[] {
        quote,
        author,
        role,
        image {
          asset->,
          alt
        }
      }
    },
    // CTA Banner section
    _type == "ctaBannerSection" => {
      heading,
      text,
      primaryCta {
        label,
        href
      },
      secondaryCta {
        label,
        href
      },
      backgroundColor
    },
    // Contact Form section
    _type == "contactFormSection" => {
      phoneNumber,
      phoneText,
      requiredFieldsNote,
      consentText,
      privacyPolicyPath,
      privacyPolicyLinkText,
      spamNote,
      labels {
        fullName,
        email,
        phone,
        message
      },
      placeholders {
        fullName,
        email,
        phone,
        message
      },
      submitButtonText,
      successMessage,
      errorMessage
    }
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->,
      alt
    }
  }
}`

// All pages slugs (for static generation)
export const ALL_PAGES_SLUGS_QUERY = groq`*[_type == "page"] {
  "slug": slug.current,
  language
}`

// All posts including other languages (for listing with badges)
export const ALL_POSTS_LIST_QUERY = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  language,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage {
    asset->,
    alt
  },
  author-> {
    name,
    photo {
      asset->
    }
  },
  categories[]-> {
    title,
    slug
  }
}`

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug && language == $language][0] {
  _id,
  language,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage {
    asset->,
    alt
  },
  author-> {
    name,
    bio,
    photo {
      asset->
    }
  },
  categories[]-> {
    title,
    slug
  },
  body[] {
    ...,
    _type == "image" => {
      asset->,
      alt,
      caption
    }
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->,
      alt
    }
  }
}`

export const ALL_POSTS_SLUGS_QUERY = groq`*[_type == "post"] {
  "slug": slug.current,
  language
}`

// All therapy offerings including other languages
export const ALL_THERAPY_OFFERINGS_LIST_QUERY = groq`*[_type == "therapyOffering"] | order(title asc) {
  _id,
  language,
  title,
  slug,
  summary,
  coverImage {
    asset->,
    alt
  },
  sessionDetails {
    duration,
    format,
    fees
  }
}`

export const THERAPY_OFFERING_BY_SLUG_QUERY = groq`*[_type == "therapyOffering" && slug.current == $slug && language == $language][0] {
  _id,
  language,
  title,
  slug,
  summary,
  coverImage {
    asset->,
    alt
  },
  description,
  artTherapyDetails {
    modalities,
    materials,
    noExperienceRequired
  },
  sessionDetails {
    duration,
    format,
    fees
  },
  faqs[] {
    question,
    answer
  },
  cta {
    text,
    showContactInfo
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->,
      alt
    }
  }
}`

export const ALL_THERAPY_OFFERINGS_SLUGS_QUERY = groq`*[_type == "therapyOffering"] {
  "slug": slug.current,
  language
}`

// Author queries (no language - names remain same)
export const AUTHOR_BY_ID_QUERY = groq`*[_type == "author" && _id == $id][0] {
  name,
  bio,
  photo {
    asset->
  }
}`

// Category queries (no language - titles remain same)
export const ALL_CATEGORIES_QUERY = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`
