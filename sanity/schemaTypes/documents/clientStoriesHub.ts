import { defineArrayMember, defineField, defineType } from "sanity";

export const clientStoriesHub = defineType({
  name: "clientStoriesHub",
  title: "Client Stories Hub",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: "Use [[text]] or | for accent font. Use {br} for a line break.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      description: "Key metrics shown in the hero (e.g. 50+ Brands Served)",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
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
      name: "ctaHeading",
      title: "CTA Heading",
      description: "Bottom CTA heading. Use [[text]] or | for accent font.",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "linkItem",
    }),
  ],
});
