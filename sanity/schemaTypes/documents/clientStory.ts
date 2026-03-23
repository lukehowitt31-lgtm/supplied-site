import { defineArrayMember, defineField, defineType } from "sanity";

export const clientStory = defineType({
  name: "clientStory",
  title: "Client Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Story Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bodyImage1",
      title: "Body Image 1",
      description: "First in-page image — typically the cinematic strip after the context section",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bodyImage2",
      title: "Body Image 2",
      description: "Second in-page image — mid-page section background",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bodyImage3",
      title: "Body Image 3",
      description: "Third in-page image — typically the results section background",
      type: "imageWithAlt",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      description: "The display heading shown in the hero (e.g. 'The Packaging Infrastructure Behind 434% Growth.')",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      description: "Optional tagline shown below the hero heading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroTags",
      title: "Hero Tags",
      description: "Pill-shaped tags shown in the hero section",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
      hidden: true,
      deprecated: { reason: "Use the 'context' section body in Content Sections instead" },
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
      hidden: true,
      deprecated: { reason: "Use the 'context' section body in Content Sections instead" },
    }),
    defineField({
      name: "result",
      title: "Result",
      type: "text",
      rows: 4,
      hidden: true,
      deprecated: { reason: "Use the 'context' section body in Content Sections instead" },
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string",
    }),
    defineField({
      name: "quoteRole",
      title: "Quote Role",
      type: "string",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      description: "Keyed content blocks that map to named slots in the bespoke page layout",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "sectionId",
              title: "Section ID",
              description: "Matches a named slot in the story component (e.g. 'context', 'challenge', 'solution', 'results', 'takeaway')",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "tag", title: "Section Label", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "headingAccent", title: "Heading Accent", description: "The italic/accent portion of the heading", type: "string" }),
            defineField({ name: "body", title: "Body", description: "Body paragraphs (use newlines to separate)", type: "text", rows: 6 }),
            defineField({
              name: "items",
              title: "Items",
              description: "Structured cards, steps, or grid items within this section",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                    defineField({ name: "value", title: "Value", description: "Prominent stat/number display (e.g. '01', 'Iconic')", type: "string" }),
                  ],
                  preview: {
                    select: { title: "title", subtitle: "value" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "sectionId", subtitle: "heading" },
            prepare: ({ title, subtitle }) => ({
              title: title ?? "Untitled Section",
              subtitle: subtitle ?? "",
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "clientName",
      media: "heroImage",
    },
  },
});
