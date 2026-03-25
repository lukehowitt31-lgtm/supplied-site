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
    defineField({
      name: "heroTag",
      title: "Hero Tag",
      type: "string",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero Headline Accent",
      description: "Italic/accent portion (orange Fraunces)",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "formSubjects",
      title: "Form Subject Options",
      description: "Dropdown options for 'What can we help with?'",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "sidebarHeading",
      title: "Sidebar Heading",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone Display Text",
      description: "Formatted phone number shown to users",
      type: "string",
    }),
    defineField({
      name: "officeLocation",
      title: "Office Location",
      type: "string",
    }),
    defineField({
      name: "responseTime",
      title: "Response Time Text",
      type: "string",
    }),
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
});
