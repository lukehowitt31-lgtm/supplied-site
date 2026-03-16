import { defineArrayMember, defineField, defineType } from "sanity";

export const partnershipsPage = defineType({
  name: "partnershipsPage",
  title: "Partnerships Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Partnerships Page",
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
      name: "partnerTypes",
      title: "Partner Types",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "linkItem",
    }),
  ],
});
