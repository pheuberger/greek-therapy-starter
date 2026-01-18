import type {StructureResolver} from 'sanity/structure'

const LANGUAGES = [
  {id: 'el', title: 'EL - Ελληνικά', flag: '🇬🇷'},
  {id: 'en', title: 'EN - English', flag: '🇬🇧'},
]

const TRANSLATABLE_TYPES = [
  {type: 'page', title: 'Pages', titleSingular: 'Page'},
  {type: 'post', title: 'Blog Posts', titleSingular: 'Post'},
  {type: 'therapyOffering', title: 'Therapy Offerings', titleSingular: 'Service'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),

      ...TRANSLATABLE_TYPES.map((contentType) =>
        S.listItem()
          .title(contentType.title)
          .child(
            S.list()
              .title(contentType.title)
              .items([
                S.listItem()
                  .title('All')
                  .child(
                    S.documentList()
                      .title(`All ${contentType.title}`)
                      .filter(`_type == "${contentType.type}"`)
                  ),
                S.divider(),
                ...LANGUAGES.map((lang) =>
                  S.listItem()
                    .title(`${lang.flag} ${lang.title}`)
                    .child(
                      S.documentList()
                        .title(`${contentType.title} (${lang.title})`)
                        .filter(`_type == "${contentType.type}" && language == $language`)
                        .params({language: lang.id})
                    )
                ),
              ])
          )
      ),

      S.divider(),

      S.listItem()
        .title('Authors')
        .child(S.documentList().title('Authors').filter('_type == "author"')),

      S.listItem()
        .title('Categories')
        .child(S.documentList().title('Categories').filter('_type == "category"')),
    ])
