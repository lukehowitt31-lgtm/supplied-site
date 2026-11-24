import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const disallowed = ["/admin/", "/backstage/", "/api/"];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowed,
    },
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
