import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "About Page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "shortVersionTag",
      title: "Short Version — Section Tag",
      type: "string",
    }),
    defineField({
      name: "shortVersionHeading",
      title: "Short Version — Heading",
      type: "string",
    }),
    defineField({
      name: "shortVersionHeadingAccent",
      title: "Short Version — Heading Accent",
      description: "Italic/accent portion of the heading (orange Fraunces)",
      type: "string",
    }),
    defineField({
      name: "shortVersionBody",
      title: "Short Version — Body",
      description: "Use double newline to separate paragraphs. Last paragraph is displayed bold.",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
    }),
    defineField({
      name: "teamTag",
      title: "Team Section — Tag",
      type: "string",
    }),
    defineField({
      name: "teamHeading",
      title: "Team Section — Heading",
      type: "string",
    }),
    defineField({
      name: "teamHeadingAccent",
      title: "Team Section — Heading Accent",
      description: "Italic/accent portion (orange Fraunces)",
      type: "string",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "num", title: "Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "whatWeCoverTag",
      title: "What We Cover — Tag",
      type: "string",
    }),
    defineField({
      name: "whatWeCoverHeading",
      title: "What We Cover — Heading",
      type: "string",
    }),
    defineField({
      name: "whatWeCoverHeadingAccent",
      title: "What We Cover — Heading Accent",
      description: "Italic/accent portion (orange Fraunces)",
      type: "string",
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Quote Text", type: "text", rows: 4 }),
        defineField({ name: "author", title: "Author", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
      ],
    }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "linkItem" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkItem" }),
      ],
    }),
  ],
});
