import { defineArrayMember, defineField, defineType } from "sanity";

export const merchPage = defineType({
  name: "merchPage",
  title: "Merch Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Merch Page",
      validation: (Rule) => Rule.required(),
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.max(70).warning("Keep under 70 characters."),
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160).warning("Keep under 160 characters."),
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
        }),
        defineField({
          name: "canonical",
          title: "Canonical URL",
          type: "string",
          initialValue: "/merch",
        }),
      ],
    }),

    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          rows: 4,
        }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    // ── Problem / Solution ────────────────────────────────────
    defineField({
      name: "problemSolution",
      title: "Problem / Solution",
      type: "object",
      fields: [
        defineField({
          name: "problemHeading",
          title: "Problem Heading",
          description: "Use [[text]] for accent font.",
          type: "string",
        }),
        defineField({
          name: "problemBody",
          title: "Problem Body",
          type: "text",
          rows: 6,
        }),
        defineField({
          name: "solutionHeading",
          title: "Solution Heading",
          description: "Use [[text]] for accent font.",
          type: "string",
        }),
        defineField({
          name: "solutionBody",
          title: "Solution Body",
          type: "text",
          rows: 6,
        }),
      ],
    }),

    // ── Categories ────────────────────────────────────────────
    defineField({
      name: "categories",
      title: "Merch Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "anchorId",
              title: "Anchor ID",
              description: "URL-safe slug for deep linking, e.g. cosmetic-bags",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "shortDescription",
              title: "Short Description",
              description: "Shown in the category grid tiles.",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "longDescription",
              title: "Long Description",
              description: "Shown in the full category section.",
              type: "text",
              rows: 5,
            }),
            defineField({
              name: "image",
              title: "Category Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "applications",
              title: "Typical Applications",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "customisationOptions",
              title: "Customisation Options",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "moq",
              title: "MOQ",
              description: "e.g. 500 units",
              type: "string",
            }),
            defineField({
              name: "leadTime",
              title: "Lead Time",
              description: "e.g. 6-8 weeks",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "anchorId" },
          },
        }),
      ],
    }),

    // ── Comparison ────────────────────────────────────────────
    defineField({
      name: "comparison",
      title: "Comparison Table (Supplied vs Alibaba)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "topic",
              title: "Topic",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "suppliedAnswer",
              title: "Supplied",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "alibabaAnswer",
              title: "Self-sourced (Alibaba)",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "topic" },
          },
        }),
      ],
    }),

    // ── FAQ ───────────────────────────────────────────────────
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    // ── Final CTA ─────────────────────────────────────────────
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] for accent font.",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
      ],
    }),
  ],
});
