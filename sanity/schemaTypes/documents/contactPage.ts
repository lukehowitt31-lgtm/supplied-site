import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      initialValue: "Contact Page",
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
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
      ],
    }),

    // ── Contact Form ──────────────────────────────────────────
    defineField({
      name: "form",
      title: "Contact Form",
      type: "object",
      fields: [
        defineField({
          name: "subjects",
          title: "Subject Options",
          description: "Dropdown options for 'What can we help with?'",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),

    // ── Sidebar / Contact Info ────────────────────────────────
    defineField({
      name: "sidebar",
      title: "Sidebar / Contact Info",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          description: "Use [[text]] or | to mark the italic/accent portion",
          type: "string",
        }),
        defineField({ name: "email", title: "Email Address", type: "string" }),
        defineField({ name: "phone", title: "Phone Number", type: "string" }),
        defineField({
          name: "phoneDisplay",
          title: "Phone Display Text",
          description: "Formatted phone number shown to users",
          type: "string",
        }),
        defineField({ name: "officeLocation", title: "Office Location", type: "string" }),
        defineField({ name: "responseTime", title: "Response Time Text", type: "string" }),
        defineField({
          name: "responseTimeDetail",
          title: "Response Time Detail",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "quickLinks",
          title: "Quick Links",
          type: "array",
          of: [defineArrayMember({ type: "linkItem" })],
        }),
      ],
    }),
  ],
});
