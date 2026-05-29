import type { StructureResolver } from 'sanity/structure'

// Studio sidebar matches the live site architecture:
//   Singletons  →  About Page
//   Collections →  Portfolio Projects · News Posts · Services · Testimonials
export const structure: StructureResolver = (S) =>
  S.list()
    .title('H.Studio')
    .items([

      // ── Singleton pages ──────────────────────────────────────────────────
      // One document per page; clicking opens the document directly (no list)

      S.listItem()
        .title('About Page')
        .id('about-singleton')
        .child(
          S.document()
            .title('About Page')
            .schemaType('about')
            .documentId('716d2eec-e4b7-4626-9477-18e75f75f7fe')
        ),

      S.divider(),

      // ── Collections ──────────────────────────────────────────────────────
      // Ordered by where they appear on the site

      S.documentTypeListItem('project').title('Portfolio Projects'),
      S.documentTypeListItem('post').title('News Posts'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])
