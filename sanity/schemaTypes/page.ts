import {defineField, defineType} from 'sanity'
import {languageField, getLanguageEmoji} from './utils/languageField'
import {isUniqueSlugPerLanguage} from './utils/isUniqueSlugPerLanguage'
import {slugify} from './utils/slugify'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify,
        isUnique: isUniqueSlugPerLanguage,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL slug (always in English, shared across translations)',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {type: 'headlineSection'},
        {type: 'heroSection'},
        {type: 'richTextSection'},
        {type: 'featuresSection'},
        {type: 'testimonialsSection'},
        {type: 'ctaBannerSection'},
        {type: 'contactFormSection'},
      ],
      description: 'Build your page by adding sections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Override default SEO settings for this page',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image shown when sharing on social media (1200x630px)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      language: 'language',
    },
    prepare({title, slug, language}) {
      return {
        title: `${getLanguageEmoji(language)} ${title}`,
        subtitle: `/${slug || ''}`,
      }
    },
  },
})
