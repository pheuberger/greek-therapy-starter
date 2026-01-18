import {defineType} from 'sanity'

/**
 * Navigation item with multilingual labels
 */
export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {
      name: 'href',
      title: 'Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Use / for home, /about, /services, /blog, etc. (always in English)',
    },
    {
      name: 'labels',
      title: 'Ετικέτες / Labels',
      type: 'object',
      description: 'Ετικέτα για κάθε γλώσσα / Label for each language',
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
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      labelEl: 'labels.el',
      labelEn: 'labels.en',
      href: 'href',
    },
    prepare({labelEl, labelEn, href}) {
      return {
        title: `${labelEl} / ${labelEn}`,
        subtitle: href,
      }
    },
  },
})
