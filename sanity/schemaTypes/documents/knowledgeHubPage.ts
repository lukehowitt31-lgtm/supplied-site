import { defineField, defineType } from "sanity";

export const knowledgeHubPage = defineType({
  name: "knowledgeHubPage",
  title: "Knowledge Hub Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Knowledge Hub Page",
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
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "linkItem",
    }),
  ],
});
