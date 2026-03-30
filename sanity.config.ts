import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { table } from "@sanity/table";
import { schemaTypes } from "./sanity/schemaTypes";
import { singletonTypes, structure } from "./sanity/structure";
import { presentationConfig } from "./sanity/presentation";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Supplied Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    presentationTool(presentationConfig),
    visionTool(),
    table(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !singletonTypes.includes(schemaType as (typeof singletonTypes)[number])
      ),
  },
  document: {
    actions: (previousActions, context) =>
      singletonTypes.includes(context.schemaType as (typeof singletonTypes)[number])
        ? previousActions.filter(
            ({ action }) => action !== "duplicate" && action !== "delete"
          )
        : previousActions,
  },
});
