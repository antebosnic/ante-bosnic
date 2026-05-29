import { defineArrayMember, defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    // ── Headline ─────────────────────────────────────────────────────────────
    defineField({
      name: "headlineLine1",
      title: "Headline — Line 1",
      type: "string",
      description: 'Displayed font-light. e.g. "We design things"',
    }),
    defineField({
      name: "headlineLine2",
      title: "Headline — Line 2",
      type: "string",
      description: 'Displayed font-light. e.g. "that refuse"',
    }),
    defineField({
      name: "headlineLine3",
      title: "Headline — Line 3",
      type: "string",
      description: 'Displayed bold italic. e.g. "to be ignored."',
    }),
    // ── Pull quote ────────────────────────────────────────────────────────────
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "string",
      description: "Short memorable quote shown as the sticky left column in the bio section.",
    }),
    // ── Bio paragraphs ────────────────────────────────────────────────────────
    defineField({
      name: "bio",
      title: "Bio Paragraphs",
      type: "array",
      description: "Each item is one paragraph of body copy.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "paragraph",
              title: "Paragraph",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: { title: "paragraph" },
            prepare({ title }: { title?: string }) {
              const t = title ?? "";
              return { title: t.length > 80 ? t.slice(0, 80) + "…" : t };
            },
          },
        }),
      ],
    }),
    // ── Stats strip ───────────────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      description: "Shown in the hero metrics strip and the bio stats row.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "num",
              title: "Number",
              type: "string",
              description: 'e.g. "05+"',
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "Years of practice"',
            }),
          ],
          preview: { select: { title: "num", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "headlineLine1" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "About Page" };
    },
  },
});
