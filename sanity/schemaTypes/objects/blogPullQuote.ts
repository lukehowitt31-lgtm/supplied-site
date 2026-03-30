import { defineField, defineType } from "sanity";

export const blogPullQuote = defineType({
  name: "blogPullQuote",
  title: "Pull Quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "quote" },
    prepare: ({ title }) => ({
      title: title ? `"${title.slice(0, 60)}…"` : "Pull Quote",
    }),
  },
});
