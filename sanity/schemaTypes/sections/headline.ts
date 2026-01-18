import {defineType} from 'sanity'

export const headlineSection = defineType({
  name: 'headlineSection',
  title: 'Headline Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional supporting text below the heading',
    },
    {
      name: 'level',
      title: 'Heading Level',
      type: 'string',
      options: {
        list: [
          {title: 'H1 (Page Title)', value: 'h1'},
          {title: 'H2 (Section)', value: 'h2'},
          {title: 'H3 (Subsection)', value: 'h3'},
        ],
        layout: 'radio',
      },
      initialValue: 'h2',
      description: 'Use H1 once per page for the main title, H2 for sections, H3 for subsections',
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      level: 'level',
    },
    prepare({heading, level}) {
      return {
        title: heading || 'Headline',
        subtitle: level ? level.toUpperCase() : 'H2',
      }
    },
  },
})
