import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "blogCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Thumbnail Image",
      description: "Used on blog listing cards and social sharing.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      description:
        "Full-width hero image shown at the top of the blog post. Falls back to the thumbnail if not set.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "imageWithAlt" }),
        defineArrayMember({ type: "blogImageGallery" }),
        defineArrayMember({ type: "blogMediaText" }),
        defineArrayMember({ type: "table" }),
        defineArrayMember({ type: "blogTable" }),
        defineArrayMember({ type: "blogCallout" }),
        defineArrayMember({ type: "blogCta" }),
        defineArrayMember({ type: "blogPullQuote" }),
        defineArrayMember({ type: "blogVideoEmbed" }),
        defineArrayMember({ type: "blogDivider" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "publishedDate",
    },
  },
});
