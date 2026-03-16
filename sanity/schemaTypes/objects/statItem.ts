import { defineField, defineType } from "sanity";

export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({
      name: "val",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lbl",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
