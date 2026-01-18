import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
fields: [
    defineField({
      name: 'title',
      title: 'Site Title / Τίτλος Ιστοσελίδας',
      type: 'object',
      description: 'The name of your practice (used in header logo and SEO)',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'el',
          title: 'EL - Ελληνικά',
          type: 'string',
          validation: (Rule) => Rule.required().max(60),
        },
        {
          name: 'en',
          title: 'EN - English',
          type: 'string',
          validation: (Rule) => Rule.required().max(60),
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Site Description / Περιγραφή Ιστοσελίδας',
      type: 'object',
      description: 'Brief description of your practice (used for SEO and footer)',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'el',
          title: 'EL - Ελληνικά',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().max(160),
        },
        {
          name: 'en',
          title: 'EN - English',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().max(160),
        },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'officeAddress',
          title: 'Office Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'mapsUrl',
          title: 'Google Maps URL',
          type: 'url',
          description: 'Link to your Google Maps listing (e.g., https://maps.app.goo.gl/...)',
        },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [{type: 'navigationItem'}],
      description: 'Main navigation menu with multilingual labels',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [{type: 'navigationItem'}],
      description: 'Footer links with multilingual labels',
    }),
    defineField({
      name: 'bookingButton',
      title: 'Booking Button',
      type: 'object',
      description: 'Book appointment button shown in header',
      fields: [
        {
          name: 'labels',
          title: 'Button Labels',
          type: 'object',
          fields: [
            {
              name: 'el',
              title: 'EL - Ελληνικά',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'en',
              title: 'EN - English',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'href',
          title: 'Link',
          type: 'string',
          description: 'Path to contact page (e.g., /contact)',
          initialValue: '/contact',
        },
      ],
    }),
    defineField({
      name: 'footerLabels',
      title: 'Footer Labels',
      type: 'object',
      description: 'Labels displayed in the footer section',
      fields: [
        {
          name: 'quickLinksTitle',
          title: 'Quick Links Section Title',
          type: 'object',
          fields: [
            {name: 'el', title: 'EL - Ελληνικά', type: 'string', initialValue: 'Σύνδεσμοι'},
            {name: 'en', title: 'EN - English', type: 'string', initialValue: 'Quick Links'},
          ],
        },
        {
          name: 'getStartedTitle',
          title: 'Get Started Section Title',
          type: 'object',
          fields: [
            {name: 'el', title: 'EL - Ελληνικά', type: 'string', initialValue: 'Ξεκινήστε'},
            {name: 'en', title: 'EN - English', type: 'string', initialValue: 'Get Started'},
          ],
        },
        {
          name: 'getStartedText',
          title: 'Get Started Description',
          type: 'object',
          fields: [
            {name: 'el', title: 'EL - Ελληνικά', type: 'string', initialValue: 'Έτοιμοι να ξεκινήσετε το ταξίδι σας;'},
            {name: 'en', title: 'EN - English', type: 'string', initialValue: 'Ready to begin your therapy journey?'},
          ],
        },
        {
          name: 'bookingButtonText',
          title: 'Booking Button Text',
          type: 'object',
          fields: [
            {name: 'el', title: 'EL - Ελληνικά', type: 'string', initialValue: 'Κλείστε Ραντεβού'},
            {name: 'en', title: 'EN - English', type: 'string', initialValue: 'Schedule a Session'},
          ],
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'object',
          description: 'Text after the year and site title',
          fields: [
            {name: 'el', title: 'EL - Ελληνικά', type: 'string', initialValue: 'Με επιφύλαξη παντός δικαιώματος.'},
            {name: 'en', title: 'EN - English', type: 'string', initialValue: 'All rights reserved.'},
          ],
        },
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'object',
      description: 'Fallback SEO values used when pages don\'t have their own',
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
          description: 'Image shown when sharing on social media (1200x630px recommended)',
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
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
