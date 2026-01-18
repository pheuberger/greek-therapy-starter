import {defineField, defineType} from 'sanity'
import {languageField, getLanguageEmoji} from './utils/languageField'
import {isUniqueSlugPerLanguage} from './utils/isUniqueSlugPerLanguage'
import {slugify} from './utils/slugify'

export const therapyOffering = defineType({
  name: 'therapyOffering',
  title: 'Therapy Offering',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Service Title',
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief description shown on the services list page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artTherapyDetails',
      title: 'Art Therapy Details',
      type: 'object',
      description: 'Specific details for art therapy offerings',
      fields: [
        {
          name: 'modalities',
          title: 'Art Modalities Used',
          type: 'array',
          of: [{type: 'string'}],
          description: 'e.g., painting, drawing, collage, sculpture, etc.',
        },
        {
          name: 'materials',
          title: 'Materials Provided',
          type: 'text',
          rows: 2,
          description: 'What art materials are provided?',
        },
        {
          name: 'noExperienceRequired',
          title: 'No Art Experience Required?',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'sessionDetails',
      title: 'Session Details',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Session Duration',
          type: 'string',
          description: 'e.g., "50 minutes", "90 minutes"',
        },
        {
          name: 'format',
          title: 'Format',
          type: 'string',
          options: {
            list: [
              {title: 'In-person', value: 'in-person'},
              {title: 'Online', value: 'online'},
              {title: 'Both', value: 'both'},
            ],
          },
        },
        {
          name: 'fees',
          title: 'Fees',
          type: 'string',
          description: 'e.g., "$150 per session" or "Sliding scale available"',
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Get in touch to learn more',
        },
        {
          name: 'showContactInfo',
          title: 'Show Contact Information',
          type: 'boolean',
          initialValue: true,
          description: 'Display email/phone from site settings',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
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
      subtitle: 'summary',
      media: 'coverImage',
      language: 'language',
    },
    prepare({title, subtitle, media, language}) {
      return {
        title: `${getLanguageEmoji(language)} ${title}`,
        subtitle,
        media,
      }
    },
  },
})
