import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // About Page — singleton (one document of this type)
      S.listItem()
        .title('About Page')
        .id('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('716d2eec-e4b7-4626-9477-18e75f75f7fe')
        ),
      S.divider(),
      // All other document types, excluding the singleton
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'about'
      ),
    ])
