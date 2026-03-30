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
          type: "text",
          rows: 3,
        }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "linkItem" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkItem" }),
        defineField({
          name: "stats",
          title: "Hero Stats",
          type: "array",
          of: [defineArrayMember({ type: "statItem" })],
        }),
      ],
    }),

    // ── How It Works ─────────────────────────────────────────
    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "step", title: "Step Number", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "step" } },
            }),
          ],
        }),
      ],
    }),

    // ── Benefits ─────────────────────────────────────────────
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({
          name: "cards",
          title: "Benefit Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),

    // ── Partners ─────────────────────────────────────────────
    defineField({
      name: "partnersSection",
      title: "Our Partners Section",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
        defineField({
          name: "partners",
          title: "Partners",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "id", title: "ID (slug)", type: "string" }),
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "logo", title: "Logo Path", type: "string" }),
                defineField({ name: "category", title: "Category", type: "string" }),
                defineField({ name: "website", title: "Website URL", type: "string" }),
                defineField({ name: "image", title: "Profile Image Path", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
                defineField({
                  name: "highlights",
                  title: "Highlights",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
              preview: { select: { title: "name", subtitle: "category" } },
            }),
          ],
        }),
      ],
    }),

    // ── Become a Partner CTA ─────────────────────────────────
    defineField({
      name: "ctaSection",
      title: "Become a Partner CTA",
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
          name: "checklist",
          title: "Checklist Items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "formHeading", title: "Form Heading", type: "string" }),
      ],
    }),

    // ── FAQs ─────────────────────────────────────────────────
    defineField({
      name: "faqsSection",
      title: "FAQs Section",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "faqs",
          title: "FAQ Items",
          type: "array",
          of: [defineArrayMember({ type: "faqItem" })],
        }),
      ],
    }),
  ],
});
