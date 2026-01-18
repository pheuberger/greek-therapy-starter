import {defineType} from 'sanity'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              description: 'Use initials or first name only for privacy',
            },
            {
              name: 'role',
              title: 'Role/Context',
              type: 'string',
              description: 'e.g., "Client" or leave blank',
            },
          ],
          preview: {
            select: {
              quote: 'quote',
              author: 'author',
            },
            prepare({quote, author}) {
              return {
                title: author || 'Anonymous',
                subtitle: quote ? `${quote.substring(0, 60)}...` : '',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      testimonials: 'testimonials',
    },
    prepare({testimonials}) {
      return {
        title: 'Testimonials',
        subtitle: `${testimonials?.length || 0} testimonials`,
      }
    },
  },
})
