import {defineType} from 'sanity'

export const ctaBannerSection = defineType({
  name: 'ctaBannerSection',
  title: 'CTA Banner Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'secondaryCta',
      title: 'Secondary Call to Action (Optional)',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Sand (Light)', value: 'sand'},
          {title: 'Teal (Accent)', value: 'teal'},
          {title: 'White', value: 'white'},
        ],
      },
      initialValue: 'sand',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'text',
    },
  },
})
