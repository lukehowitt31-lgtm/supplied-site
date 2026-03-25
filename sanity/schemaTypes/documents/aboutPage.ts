import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "About Page",
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
      ],
    }),

    // ── The Short Version ─────────────────────────────────────
    defineField({
      name: "shortVersion",
      title: "The Short Version",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Body",
          description: "Use double newline to separate paragraphs. Last paragraph is displayed bold.",
          type: "text",
          rows: 6,
        }),
      ],
    }),

    // ── Stats ─────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
    }),

    // ── Team ──────────────────────────────────────────────────
    defineField({
      name: "team",
      title: "Team Section",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
      ],
    }),

    // ── How We Work (Values) ──────────────────────────────────
    defineField({
      name: "howWeWork",
      title: "How We Work",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "values",
          title: "Values",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "num", title: "Number", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "num" } },
            }),
          ],
        }),
      ],
    }),

    // ── What We Cover ─────────────────────────────────────────
    defineField({
      name: "whatWeCover",
      title: "What We Cover",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Section Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({
          name: "capabilities",
          title: "Capabilities",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),

    // ── Pull Quote ────────────────────────────────────────────
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Quote Text", type: "text", rows: 4 }),
        defineField({ name: "author", title: "Author", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
      ],
    }),

    // ── Offices ───────────────────────────────────────────────
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "name", subtitle: "label" } },
        }),
      ],
    }),

    // ── Final CTA ─────────────────────────────────────────────
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "linkItem" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkItem" }),
      ],
    }),
  ],
});
