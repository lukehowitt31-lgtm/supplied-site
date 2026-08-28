import { defineArrayMember, defineField, defineType } from "sanity";

export const packagingReviewPage = defineType({
  name: "packagingReviewPage",
  title: "Packaging Review Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Packaging Review Page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "headline",
          title: "Headline",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Label",
          type: "string",
        }),
        defineField({
          name: "riskReversal",
          title: "Risk-reversal line",
          description: 'Shown under the CTA, e.g. "No fee. No contract. No obligation."',
          type: "string",
        }),
        defineField({
          name: "image",
          title: "Hero image",
          description:
            "Optional packaging / product photograph for the right column. Recommended ~1200×1500. Falls back to a local product image if empty.",
          type: "imageWithAlt",
        }),
        defineField({
          name: "quickFacts",
          title: "Quick facts under CTA",
          description: "Up to 4 short value/label pairs (e.g. \"One · Requirement\").",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "quickFact",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "problem",
      title: "Recognise the problem",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Statements",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Statement", type: "string" }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
        defineField({
          name: "closingLine",
          title: "Closing line",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "outcome",
      title: "Desired future",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "image",
          title: "Section image",
          description:
            "Optional packaging photograph shown beside the outcome list. Recommended ~1200×1500.",
          type: "imageWithAlt",
        }),
        defineField({
          name: "items",
          title: "Outcomes",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "timeNote",
          title: "Time note",
          description: 'e.g. "Usually around 20–30 minutes to give us the context we need."',
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
                defineField({ name: "stepNumber", title: "Step number", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
              ],
              preview: {
                select: { title: "title", subtitle: "stepNumber" },
              },
            }),
          ],
        }),
        defineField({
          name: "ctaLabel",
          title: "Section CTA label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "difference",
      title: "Why this is different",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({
          name: "points",
          title: "Points",
          description: "Keep to 3 short points. Avoid a feature list.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "socialProof",
      title: "Social proof",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({
          name: "intro",
          title: "Intro",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "showTestimonials",
          title: "Show testimonials?",
          description: "Toggle off to hide quotes until real ones are ready.",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "testimonials",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "role", title: "Role", type: "string" }),
                defineField({ name: "brand", title: "Brand", type: "string" }),
                defineField({ name: "result", title: "Result chip", type: "string" }),
                defineField({ name: "href", title: "Story URL", type: "string" }),
              ],
              preview: { select: { title: "brand", subtitle: "name" } },
            }),
          ],
        }),
        defineField({
          name: "stories",
          title: "Result cards",
          description:
            "Optional case-study cards with a specific result. Leave empty to hide.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "brand", title: "Brand", type: "string" }),
                defineField({ name: "result", title: "Result", type: "string" }),
                defineField({ name: "href", title: "Story URL", type: "string" }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "imageWithAlt",
                }),
              ],
              preview: { select: { title: "brand", subtitle: "result" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "riskReversal",
      title: "Risk reversal",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({
          name: "points",
          title: "Headline points",
          description: "Short stacked lines, e.g. No fee / No contract / No obligation.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (Rule) => Rule.max(4),
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "requestForm",
      title: "Final CTA / form",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] to accent a phrase in Fraunces.",
          type: "string",
        }),
        defineField({ name: "sub", title: "Supporting copy", type: "text", rows: 3 }),
        defineField({
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
        }),
        defineField({
          name: "privacyFootnote",
          title: "Privacy footnote",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "successHeading",
          title: "Success heading",
          type: "string",
        }),
        defineField({
          name: "successBody",
          title: "Success body",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "ogImage", title: "OG Image Path", type: "string" }),
      ],
    }),
  ],
});
