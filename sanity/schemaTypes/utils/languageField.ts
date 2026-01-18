import {defineField} from 'sanity'

/**
 * Reusable language field for all content types
 * Default language is Greek ('el')
 */
export const languageField = defineField({
  name: 'language',
  title: 'Γλώσσα / Language',
  type: 'string',
  options: {
    list: [
      {title: 'EL - Ελληνικά', value: 'el'},
      {title: 'EN - English', value: 'en'},
    ],
    layout: 'radio',
  },
  initialValue: 'el',
  validation: (Rule) => Rule.required(),
  description: 'Επιλέξτε γλώσσα / Select language',
})

/**
 * Get language icon/badge for use in previews
 */
export function getLanguageEmoji(language: string): string {
  switch (language) {
    case 'el':
      return '🇬🇷'
    case 'en':
      return '🇬🇧'
    default:
      return '🌍'
  }
}
