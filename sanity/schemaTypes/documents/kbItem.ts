import { defineField, defineType } from "sanity";
import { KB_CATEGORIES } from "../../../lib/knowledge/categories";

const categoryOptions = KB_CATEGORIES.map((value) => ({ title: value, value }));

export const kbItem = defineType({
  name: "kbItem",
  title: "Knowledge Hub Q&A",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(280),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      description:
        "Plain text. Used both for human display in the FAQ and as context fed to the AI assistant.",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: categoryOptions,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "embedding",
      title: "Embedding (auto-generated)",
      description:
        "OpenAI text-embedding-3-small vector. Generated automatically by a Sanity webhook on publish — do not edit by hand.",
      type: "array",
      of: [{ type: "number" }],
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "embeddingSourceHash",
      title: "Embedding Source Hash",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "embeddingUpdatedAt",
      title: "Embedding Updated At",
      type: "datetime",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
      embedding: "embedding",
    },
    prepare: ({ title, subtitle, embedding }) => {
      const hasEmbedding =
        Array.isArray(embedding) && embedding.length > 0;
      const status = hasEmbedding ? "✓" : "…";
      return {
        title: title ?? "Untitled question",
        subtitle: `${status} ${subtitle ?? "Uncategorised"}`,
      };
    },
  },
  orderings: [
    {
      title: "Category, then Question",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "question", direction: "asc" },
      ],
    },
  ],
});
