import { defineDocuments, type PresentationPluginOptions } from "sanity/presentation";

const localPreviewUrl = "http://localhost:3002";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || localPreviewUrl;

const previewInitialUrl = configuredSiteUrl;
const previewSiteOrigin = (() => {
  try {
    return new URL(configuredSiteUrl).origin;
  } catch {
    return localPreviewUrl;
  }
})();

export const presentationConfig: PresentationPluginOptions = {
  previewUrl: {
    initial: previewInitialUrl,
    previewMode: {
      enable: "/api/draft-mode/enable",
      disable: "/api/draft-mode/disable",
      shareAccess: true,
    },
  },
  allowOrigins: [previewSiteOrigin, localPreviewUrl],
  resolve: {
    mainDocuments: defineDocuments([
      { route: "/", type: "homePage" },
      { route: "/about-us", type: "aboutPage" },
      { route: "/partnerships", type: "partnershipsPage" },
      { route: "/contact-us", type: "contactPage" },
      { route: "/knowledge-hub", type: "knowledgeHubPage" },
      { route: "/client-stories", type: "clientStoriesHub" },
      {
        route: "/products/:slug",
        filter: `_type == "product" && slug.current == $slug`,
        params: ({ params }) => ({ slug: params.slug }),
      },
      {
        route: "/client-stories/:slug",
        filter: `_type == "clientStory" && slug.current == $slug`,
        params: ({ params }) => ({ slug: params.slug }),
      },
    ]),
  },
};
