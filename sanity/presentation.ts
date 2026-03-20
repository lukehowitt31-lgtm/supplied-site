import { defineDocuments, type PresentationPluginOptions } from "sanity/presentation";

const localPreviewUrl = "http://localhost:3002";

export const presentationConfig: PresentationPluginOptions = {
  previewUrl: {
    initial: localPreviewUrl,
    previewMode: {
      enable: "/api/draft-mode/enable",
      disable: "/api/draft-mode/disable",
      shareAccess: true,
    },
  },
  allowOrigins: [localPreviewUrl, "https://supplied-site.vercel.app"],
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
