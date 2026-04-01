import { defineField, defineType } from "sanity";

export const blogCallout = defineType({
  name: "blogCallout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Important", value: "important" },
          { title: "Hint / Advice", value: "hint" },
          { title: "Warning", value: "warning" },
        ],
      },
      initialValue: "important",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description: "Optional short heading (e.g. \"Important\", \"Pro tip\")",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { style: "style", heading: "heading", body: "body" },
    prepare: ({ style, heading, body }) => ({
      title: heading || (style === "hint" ? "Hint / Advice" : style === "warning" ? "Warning" : "Important"),
      subtitle: body ? body.slice(0, 80) : "",
    }),
  },
});
