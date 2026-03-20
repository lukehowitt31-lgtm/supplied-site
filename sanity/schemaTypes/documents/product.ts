import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "id",
      title: "Legacy Product ID",
      description: "Optional compatibility field for existing frontend IDs.",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryId",
      title: "Legacy Category ID",
      description: "Optional compatibility field while migrating category references.",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showcaseHeading",
      title: "Showcase Heading",
      description:
        "Heading above the short description. Optional marker syntax: Premium packaging that [[commands]] attention",
      type: "string",
    }),
    defineField({
      name: "featuresHeading",
      title: "Features Section Heading",
      description:
        "Main heading above feature cards. Optional marker syntax: Everything you need, [[nothing]] you don't",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "facts",
      title: "Facts",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "features",
      title: "Features",
      description: "Cards shown below the features heading (title + body + optional image).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({
              name: "image",
              title: "Thumbnail Image",
              description: "Optional — pick from your uploaded library. SVGs and photos both work.",
              type: "image",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "specs",
      title: "Legacy Specs",
      type: "object",
      fields: [
        defineField({ name: "materials", title: "Materials", type: "string" }),
        defineField({ name: "printOptions", title: "Print Options", type: "string" }),
        defineField({ name: "moq", title: "MOQ", type: "string" }),
        defineField({ name: "leadTime", title: "Lead Time", type: "string" }),
      ],
    }),
    defineField({
      name: "detailedSpecs",
      title: "Detailed Specs",
      type: "array",
      of: [defineArrayMember({ type: "specItem" })],
    }),
    defineField({
      name: "image",
      title: "Primary Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "catalogueImage",
      title: "Catalogue Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "showcaseImage",
      title: "Showcase Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "lifestyleImage",
      title: "Lifestyle Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
    defineField({
      name: "modelUrl",
      title: "3D Model URL",
      type: "string",
    }),
    defineField({
      name: "isNew",
      title: "Is New",
      type: "boolean",
      initialValue: false,
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
      title: "name",
      media: "catalogueImage",
      subtitle: "shortDescription",
    },
  },
  orderings: [
    {
      title: "Sort Order (Asc)",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
