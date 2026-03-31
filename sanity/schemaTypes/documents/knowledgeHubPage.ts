import { defineArrayMember, defineField, defineType } from "sanity";

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
      description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
      title: "Intro Text",
      description: "Shown above the AI assistant / FAQ search area",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "linkItem",
    }),
    defineField({
      name: "faqCategories",
      title: "FAQ Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID (slug)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
            defineField({ name: "color", title: "Accent Colour (hex)", type: "string" }),
            defineField({ name: "bg", title: "Background Colour (hex)", type: "string" }),
            defineField({
              name: "faqs",
              title: "FAQs",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "q", title: "Question", type: "string" }),
                    defineField({ name: "a", title: "Answer", type: "text", rows: 5 }),
                  ],
                  preview: { select: { title: "q" } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
            prepare: ({ title, subtitle }) => ({
              title: `${subtitle ?? ""} ${title ?? "Untitled"}`.trim(),
            }),
          },
        }),
      ],
    }),
  ],
});
