import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "News Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
    defineField({ name: "link", title: "Link URL", type: "url" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
