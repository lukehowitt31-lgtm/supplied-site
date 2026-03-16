import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityDataset, sanityProjectId } from "./env";

const builder = imageUrlBuilder({
  projectId: sanityProjectId,
  dataset: sanityDataset,
});

type ImageSource = Image | { asset: { _ref: string; _type?: "reference" } };

export function urlFor(source: ImageSource) {
  return builder.image(source);
}
