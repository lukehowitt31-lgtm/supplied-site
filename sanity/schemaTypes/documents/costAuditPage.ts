import { defineArrayMember, defineField, defineType } from "sanity";

const ICON_OPTIONS: { title: string; value: string }[] = [
  { title: "Benchmark / chart", value: "benchmark" },
  { title: "Map / supply chain", value: "map" },
  { title: "Compliance / shield", value: "compliance" },
  { title: "Redesign / sparkle", value: "redesign" },
  { title: "Spec sheet / document", value: "spec" },
  { title: "Suppliers / people", value: "suppliers" },
  { title: "Invoice / receipt", value: "invoice" },
  { title: "Submit / upload", value: "submit" },
  { title: "Email / envelope", value: "email" },
  { title: "Call / phone", value: "call" },
  { title: "Savings / coins", value: "savings" },
  { title: "Clock / time", value: "clock" },
  { title: "Lock / privacy", value: "lock" },
  { title: "Lightbulb / idea", value: "lightbulb" },
];

export const costAuditPage = defineType({
  name: "costAuditPage",
  title: "Packaging Cost Audit Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Packaging Cost Audit Page",
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
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 4 }),
        defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string" }),
        defineField({
          name: "secondaryCtaText",
          title: "Secondary Text Below CTA",
          type: "string",
        }),
        defineField({
          name: "image",
          title: "Hero Visual (right column)",
          description:
            "Optional. Recommended ~1024×1024 PNG/WebP — illustration, report mockup, or product photo. The hero falls back to a centered layout if left empty.",
          type: "imageWithAlt",
        }),
        defineField({
          name: "quickFacts",
          title: "Quick Fact Chips",
          description:
            "Up to 4 short value/label pairs shown beneath the CTA (e.g. \"2 weeks · Turnaround\").",
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
      name: "whatYouGet",
      title: "What You Get",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "previewImage",
          title: "Deliverable Preview Image",
          description:
            "Optional — a mockup of the audit report PDF. Recommended ~900×1200 PNG/WebP. Shown as a feature image in the section if provided.",
          type: "imageWithAlt",
        }),
        defineField({
          name: "previewCaption",
          title: "Preview Caption",
          description: "Short caption shown beneath the preview image.",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ICON_OPTIONS },
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "icon" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "whatWeNeed",
      title: "What We Need",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ICON_OPTIONS },
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "icon" },
              },
            }),
          ],
        }),
        defineField({
          name: "closingLine",
          title: "Confidentiality Line",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ICON_OPTIONS },
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "stepNumber" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "question", title: "Question", type: "string" }),
                defineField({ name: "answer", title: "Answer", type: "text", rows: 5 }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socialProof",
      title: "Social Proof",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({
          name: "logos",
          title: "Logos",
          description: "Paths to logo files (e.g. /images/logos/wild.webp)",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Brand Name", type: "string" }),
                defineField({ name: "src", title: "Logo Path", type: "string" }),
              ],
            }),
          ],
        }),
        defineField({
          name: "showPullQuote",
          title: "Show pull quote?",
          description: "Toggle off to hide the quote block until we have a real one.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "pullQuoteText", title: "Pull Quote", type: "text", rows: 4 }),
        defineField({ name: "pullQuoteName", title: "Attribution — Name", type: "string" }),
        defineField({ name: "pullQuoteRole", title: "Attribution — Role", type: "string" }),
        defineField({ name: "pullQuoteBrand", title: "Attribution — Brand", type: "string" }),
      ],
    }),
    defineField({
      name: "requestForm",
      title: "Request Form",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "sub", title: "Sub", type: "text", rows: 3 }),
        defineField({ name: "submitLabel", title: "Submit Button Label", type: "string" }),
        defineField({
          name: "privacyFootnote",
          title: "Privacy Footnote",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "footerCta",
      title: "Footer CTA",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "sub", title: "Sub", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "CTA", type: "linkItem" }),
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
