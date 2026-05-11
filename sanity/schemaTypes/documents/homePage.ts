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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({
          name: "pullLine",
          title: "Italic Pull Line",
          description: "Short italic line rendered below body (e.g. \"The redundancy isn't reduced. It's orchestrated.\")",
          type: "string",
        }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
        defineField({
          name: "steps",
          title: "Steps",
          description:
            "Step titles rendered below the solution CTA (e.g. \"Audit & benchmark\"). Keep steps + descriptions in sync by index.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "stepDescriptions",
          title: "Step Descriptions",
          description:
            "One-line description shown under each step title. Match the number and order of Steps above.",
          type: "array",
          of: [defineArrayMember({ type: "text" })],
        }),
      ],
    }),
    defineField({
      name: "threePillars",
      title: "Three Pillars Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
        defineField({ name: "closingLine", title: "Closing Line", type: "text", rows: 2 }),
        defineField({
          name: "pillars",
          title: "Pillars",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
                defineField({
                  name: "counterpoint",
                  title: "Counterpoint",
                  description:
                    "Optional one-line trade-off shown in the amber right rail (e.g. \"Most optimise here. We model total landed cost.\"). Keep it short — italic display type.",
                  type: "string",
                }),
              ],
            }),
          ],
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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
          name: "eyebrow",
          title: "Eyebrow",
          description: "Small label above heading (e.g. \"Proof, not promises.\")",
          type: "string",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({
          name: "trailingLine",
          title: "Trailing Line",
          description: "Small line rendered below the product grid (e.g. \"If it isn't listed, ask. We source anything packaging.\")",
          type: "string",
        }),
        defineField({ name: "cta", title: "CTA", type: "linkItem" }),
      ],
    }),
    defineField({
      name: "howWerePaid",
      title: "How We're Paid Section",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Eyebrow Tag", type: "string" }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "intro", title: "Intro Paragraph", type: "text", rows: 3 }),
        defineField({
          name: "yourWin",
          title: "Your Win Card",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Card Label", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
            defineField({ name: "stat", title: "Stat (e.g. \"15–25%\")", type: "string" }),
            defineField({ name: "statCaption", title: "Stat Caption", type: "string" }),
          ],
        }),
        defineField({
          name: "ourWin",
          title: "Our Win Card",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Card Label", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
            defineField({ name: "stat", title: "Stat", type: "string" }),
            defineField({ name: "statCaption", title: "Stat Caption", type: "string" }),
          ],
        }),
        defineField({
          name: "mechanism",
          title: "How It Works (3 steps)",
          description: "The mechanism strip shown beneath the two win cards.",
          type: "array",
          of: [
            {
              type: "object",
              name: "mechanismStep",
              fields: [
                defineField({ name: "step", title: "Step Label (e.g. 01)", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
              ],
              preview: {
                select: { title: "title", subtitle: "step" },
              },
            },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        defineField({ name: "closingLine", title: "Italic Closing Line", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "costAuditHook",
      title: "Cost Audit Hook Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font.",
          type: "string",
        }),
        defineField({ name: "paragraph1", title: "Paragraph 1", type: "text", rows: 4 }),
        defineField({ name: "paragraph2", title: "Paragraph 2", type: "text", rows: 4 }),
        defineField({ name: "cta", title: "Primary CTA", type: "linkItem" }),
        defineField({
          name: "image",
          title: "Section Illustration",
          description:
            "Visual shown alongside the copy (right column on desktop). Recommended: ~1024×768 PNG/WebP with a transparent or cream background.",
          type: "imageWithAlt",
        }),
      ],
    }),
    defineField({
      name: "whoWeWorkWith",
      title: "Who We Work With Section",
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
          name: "bullets",
          title: "Bullets",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "closingLine", title: "Closing Line", type: "text", rows: 2 }),
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
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
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
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | for accent font. Use {br} for a line break.",
          type: "string",
        }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "linkItem" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkItem" }),
        defineField({
          name: "founderQuote",
          title: "Founder Quote",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Quote", type: "text", rows: 4 }),
            defineField({ name: "name", title: "Attribution Name", type: "string" }),
            defineField({ name: "role", title: "Attribution Role", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});
