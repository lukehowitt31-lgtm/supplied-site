import type { StructureBuilder, StructureResolver } from "sanity/structure";

export const singletonTypes = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "partnershipsPage",
  "contactPage",
  "knowledgeHubPage",
  "clientStoriesHub",
] as const;

type SingletonType = (typeof singletonTypes)[number];

function singletonListItem(
  S: StructureBuilder,
  schemaType: SingletonType,
  title: string
) {
  return S.listItem()
    .id(schemaType)
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(schemaType));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.listItem()
        .id("pages")
        .title("Pages")
        .child(
          S.list()
            .id("pages-list")
            .title("Pages")
            .items([
              singletonListItem(S, "homePage", "Home Page"),
              singletonListItem(S, "aboutPage", "About Page"),
              singletonListItem(S, "partnershipsPage", "Partnerships Page"),
              singletonListItem(S, "contactPage", "Contact Page"),
              singletonListItem(S, "knowledgeHubPage", "Knowledge Hub Page"),
            ])
        ),
      S.listItem()
        .id("products")
        .title("Products")
        .child(
          S.list()
            .id("products-list")
            .title("Products")
            .items([
              S.documentTypeListItem("productCategory").title("Product Categories"),
              S.documentTypeListItem("product").title("Products"),
            ])
        ),
      S.listItem()
        .id("client-stories")
        .title("Client Stories")
        .child(
          S.list()
            .id("client-stories-list")
            .title("Client Stories")
            .items([
              singletonListItem(S, "clientStoriesHub", "Client Stories Hub"),
              S.documentTypeListItem("clientStory").title("Stories"),
            ])
        ),
      S.listItem()
        .id("blog-and-knowledge-hub")
        .title("Blog & Knowledge Hub")
        .child(
          S.list()
            .id("blog-list")
            .title("Blog & Knowledge Hub")
            .items([
              S.documentTypeListItem("blogCategory").title("Blog Categories"),
              S.documentTypeListItem("blogPost").title("Blog Posts"),
            ])
        ),
      S.listItem()
        .id("team")
        .title("Team")
        .child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem()
        .id("site-settings")
        .title("Site Settings")
        .child(
          S.list()
            .id("site-settings-list")
            .title("Site Settings")
            .items([singletonListItem(S, "siteSettings", "Site Settings")])
        ),
    ]);
