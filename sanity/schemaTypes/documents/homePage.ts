import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Home Page",
      validation: (Rule) => Rule.required(),
    }),
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
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "linkItem" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkItem" }),
        defineField({
          name: "stats",
          title: "Hero Stats",
          type: "array",
          of: [defineArrayMember({ type: "statItem" })],
        }),
        defineField({ name: "prooflineTitle", title: "Proofline Title", type: "string" }),
        defineField({
          name: "prooflineSubtitle",
          title: "Proofline Subtitle",
          type: "string",
        }),
        defineField({
          name: "hotspots",
          title: "Hero Hotspots",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "id", title: "ID", type: "string" }),
                defineField({ name: "x", title: "X (%)", type: "number" }),
                defineField({ name: "y", title: "Y (%)", type: "number" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "detail", title: "Detail", type: "text", rows: 3 }),
                defineField({ name: "href", title: "Link", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "trustedBrands",
      title: "Trusted Brands",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({
          name: "brands",
          title: "Brand Names",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "problemBottleneck",
      title: "Problem / Bottleneck Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          title: "Problem Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
              ],
            }),
          ],
        }),
        defineField({
          name: "items",
          title: "Problem Items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "solution",
      title: "Solution Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "stepDescriptions",
          title: "Step Descriptions",
          type: "array",
          of: [defineArrayMember({ type: "text" })],
        }),
      ],
    }),
    defineField({
      name: "servicesTeaser",
      title: "Services Teaser",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "heroTitle", title: "Hero Card Title", type: "string" }),
        defineField({ name: "heroBody", title: "Hero Card Body", type: "text", rows: 4 }),
        defineField({
          name: "heroChips",
          title: "Hero Card Chips",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "cards",
          title: "Service Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
                defineField({
                  name: "chips",
                  title: "Chips",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
              preview: {
                select: { title: "title" },
              },
            }),
          ],
        }),
        defineField({
          name: "stats",
          title: "Stats Strip",
          description: "Stats shown below the service cards (e.g. 30+ Global Suppliers)",
          type: "array",
          of: [defineArrayMember({ type: "statItem" })],
        }),
      ],
    }),
    defineField({
      name: "clientStoriesTeaser",
      title: "Client Stories Teaser",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "CTA", type: "linkItem" }),
        defineField({
          name: "cards",
          title: "Homepage Story Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Client Name", type: "string" }),
                defineField({ name: "slug", title: "Slug", type: "string" }),
                defineField({ name: "industry", title: "Industry", type: "string" }),
                defineField({
                  name: "products",
                  title: "Products/Tags",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
                defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
                defineField({ name: "person", title: "Quote Attribution", type: "string" }),
                defineField({ name: "stat1Value", title: "Stat 1 Value", type: "string" }),
                defineField({ name: "stat1Label", title: "Stat 1 Label", type: "string" }),
                defineField({ name: "stat2Value", title: "Stat 2 Value", type: "string" }),
                defineField({ name: "stat2Label", title: "Stat 2 Label", type: "string" }),
                defineField({ name: "challenge", title: "Challenge", type: "text", rows: 3 }),
                defineField({ name: "result", title: "Result", type: "text", rows: 3 }),
                defineField({ name: "image", title: "Image Path", type: "string" }),
                defineField({ name: "logo", title: "Logo Path", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "productsTeaser",
      title: "Products Teaser",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "CTA", type: "linkItem" }),
      ],
    }),
    defineField({
      name: "sustainability",
      title: "Sustainability Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({
          name: "checklist",
          title: "Checklist Items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "stepDescriptions",
          title: "Step Descriptions",
          type: "array",
          of: [defineArrayMember({ type: "text" })],
        }),
      ],
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "linkItem" }),
      ],
    }),
  ],
});
