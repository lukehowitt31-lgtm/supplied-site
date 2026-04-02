import { defineDocuments, type PresentationPluginOptions } from "sanity/presentation";

const productionUrl = "https://suppliedpackaging.com";
const localPreviewUrl = "http://localhost:3002";

const isProduction = typeof window !== "undefined" && !window.location.hostname.includes("localhost");

export const presentationConfig: PresentationPluginOptions = {
  previewUrl: {
    initial: isProduction ? productionUrl : localPreviewUrl,
    previewMode: {
      enable: "/api/draft-mode/enable",
      disable: "/api/draft-mode/disable",
      shareAccess: true,
    },
  },
  allowOrigins: [localPreviewUrl, productionUrl],
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
      {
        route: "/blog/:slug",
        filter: `_type == "blogPost" && slug.current == $slug`,
        params: ({ params }) => ({ slug: params.slug }),
      },
    ]),
  },
};
