import { defineArrayMember, defineField, defineType } from "sanity";

export const clientStoriesHub = defineType({
  name: "clientStoriesHub",
  title: "Client Stories Hub",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      description: "The italic/accent portion of the heading (displayed in orange Fraunces)",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featuredStories",
      title: "Featured Stories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "clientStory" }],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "linkItem",
    }),
  ],
});
