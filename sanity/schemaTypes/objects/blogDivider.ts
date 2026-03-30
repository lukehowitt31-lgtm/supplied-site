import { defineType } from "sanity";

export const blogDivider = defineType({
  name: "blogDivider",
  title: "Divider",
  type: "object",
  fields: [
    {
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Accent", value: "accent" },
        ],
      },
      initialValue: "standard",
    },
  ],
  preview: {
    prepare: () => ({ title: "── Divider ──" }),
  },
});
