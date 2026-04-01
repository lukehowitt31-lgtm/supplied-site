import { defineField, defineType } from "sanity";

export const blogMediaText = defineType({
  name: "blogMediaText",
  title: "Image + Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "right",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description: "Optional heading above the text.",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading", body: "body", media: "image" },
    prepare: ({ title, body, media }) => ({
      title: title || (body ? body.slice(0, 60) : "Image + Text"),
      subtitle: "Image + Text",
      media,
    }),
  },
});
