import { defineField, defineType } from "sanity";

export const blogTable = defineType({
  name: "blogTable",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "table",
      title: "Table Data",
      type: "table",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "withHeader",
      title: "First row is a header",
      description: "When enabled, the first row is styled as a header row.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "Optional caption shown below the table.",
      type: "string",
    }),
  ],
  preview: {
    select: { caption: "caption" },
    prepare: ({ caption }) => ({
      title: caption || "Table",
    }),
  },
});
