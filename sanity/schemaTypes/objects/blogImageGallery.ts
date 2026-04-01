import { defineArrayMember, defineField, defineType } from "sanity";

export const blogImageGallery = defineType({
  name: "blogImageGallery",
  title: "Image Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      description: "Add 2–4 images to display side by side.",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (Rule) => Rule.min(2).max(4).required(),
    }),
    defineField({
      name: "caption",
      title: "Gallery Caption",
      description: "Optional caption shown below the gallery.",
      type: "string",
    }),
  ],
  preview: {
    select: { images: "images", caption: "caption" },
    prepare: ({ images, caption }) => ({
      title: caption || `Gallery (${images?.length ?? 0} images)`,
      subtitle: `${images?.length ?? 0} images`,
    }),
  },
});
