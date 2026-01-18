import type {SlugIsUniqueValidator} from 'sanity'

export const isUniqueSlugPerLanguage: SlugIsUniqueValidator = async (slug, context) => {
  const {document, getClient} = context
  if (!document?.language) {
    return true
  }

  const client = getClient({apiVersion: '2025-01-02'})
  const id = document._id.replace(/^drafts\./, '')
  const type = document._type
  const language = document.language

  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type,
    language,
  }

  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    _type == $type &&
    language == $language &&
    slug.current == $slug
  ][0]._id)`

  const result = await client.fetch(query, params)
  return result
}
