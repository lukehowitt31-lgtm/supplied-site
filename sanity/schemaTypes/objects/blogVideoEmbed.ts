import { defineField, defineType } from "sanity";

export const blogVideoEmbed = defineType({
  name: "blogVideoEmbed",
  title: "Video Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "url" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Video Embed",
      subtitle,
    }),
  },
});
