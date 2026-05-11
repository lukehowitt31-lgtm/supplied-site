import type { Metadata } from "next";

const DEFAULT_OG_IMAGE = "/images/brand/supplied-og.png";
const SITE_NAME = "Supplied";
const LOCALE = "en_GB";

export interface OgImageInput {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/about-us" or "/". */
  path: string;
  /** Either a string URL or a full OgImageInput object. Falls back to the brand OG. */
  image?: OgImageInput | string;
  /** Defaults to "website". Use "article" for blog posts / case studies. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  /** Pass to expose a different alt for screen readers; otherwise derived from title. */
  imageAlt?: string;
  robots?: Metadata["robots"];
}

/**
 * Build a complete Next.js Metadata object with consistent Open Graph + Twitter
 * defaults baked in. Use this from every page to avoid silently dropping the
 * brand OG image via Next's shallow-merge of metadata.openGraph.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    imageAlt,
    robots,
  } = input;

  const normalisedImage: Required<OgImageInput> =
    typeof image === "string"
      ? {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        }
      : {
          url: image?.url ?? DEFAULT_OG_IMAGE,
          width: image?.width ?? 1200,
          height: image?.height ?? 630,
          alt: image?.alt ?? imageAlt ?? title,
        };

  const isArticle = type === "article";

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: LOCALE,
      type,
      images: [normalisedImage],
      ...(isArticle && publishedTime ? { publishedTime } : {}),
      ...(isArticle && modifiedTime ? { modifiedTime } : {}),
      ...(isArticle && authors && authors.length > 0 ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [normalisedImage.url],
    },
  };
}

/**
 * Build a URL for the dynamic OG image route at /og.
 * Pass an optional `bg` (absolute or root-relative) to use as a background image.
 */
export function ogImageUrl(params: {
  title: string;
  subtitle?: string;
  bg?: string;
}): string {
  const query = new URLSearchParams();
  query.set("title", params.title);
  if (params.subtitle) query.set("subtitle", params.subtitle);
  if (params.bg) query.set("bg", params.bg);
  return `/og?${query.toString()}`;
}
