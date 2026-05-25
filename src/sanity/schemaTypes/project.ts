import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "imageUrl", title: "Image URL", type: "string" }),
    defineField({ name: "image", title: "Image (upload)", type: "image", options: { hotspot: true } }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tall", title: "Tall card", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number" }),
    defineField({ name: "link", title: "Project link", type: "url" }),
  ],
  preview: { select: { title: "title", media: "image" } },
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
