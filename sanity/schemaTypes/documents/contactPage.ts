import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Contact Page",
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
      name: "contactDetails",
      title: "Contact Details",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "formIntro",
      title: "Form Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerCta",
      title: "Footer CTA",
      type: "linkItem",
    }),
  ],
});
