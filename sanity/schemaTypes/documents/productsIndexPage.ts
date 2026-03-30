import { defineField, defineType } from "sanity";

export const productsIndexPage = defineType({
  name: "productsIndexPage",
  title: "Products Index Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Products Index Page",
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Tag", type: "string" }),
        defineField({
          name: "headline",
          title: "Headline",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 3,
        }),
      ],
    }),

    // ── CTA ───────────────────────────────────────────────────
    defineField({
      name: "cta",
      title: "Bottom CTA",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "linkItem",
        }),
      ],
    }),
  ],
});
