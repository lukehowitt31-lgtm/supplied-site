import { aboutPage } from "./documents/aboutPage";
import { blogCategory } from "./documents/blogCategory";
import { blogPost } from "./documents/blogPost";
import { clientStoriesHub } from "./documents/clientStoriesHub";
import { clientStory } from "./documents/clientStory";
import { contactPage } from "./documents/contactPage";
import { homePage } from "./documents/homePage";
import { knowledgeHubPage } from "./documents/knowledgeHubPage";
import { partnershipsPage } from "./documents/partnershipsPage";
import { product } from "./documents/product";
import { productCategory } from "./documents/productCategory";
import { productsIndexPage } from "./documents/productsIndexPage";
import { siteSettings } from "./documents/siteSettings";
import { teamMember } from "./documents/teamMember";
import { blogCta } from "./objects/blogCta";
import { blogDivider } from "./objects/blogDivider";
import { blogPullQuote } from "./objects/blogPullQuote";
import { blogVideoEmbed } from "./objects/blogVideoEmbed";
import { faqItem } from "./objects/faqItem";
import { imageWithAlt } from "./objects/imageWithAlt";
import { linkItem } from "./objects/linkItem";
import { seo } from "./objects/seo";
import { specItem } from "./objects/specItem";
import { statItem } from "./objects/statItem";

export const schemaTypes = [
  // Objects
  seo,
  faqItem,
  specItem,
  statItem,
  linkItem,
  imageWithAlt,
  blogCta,
  blogDivider,
  blogPullQuote,
  blogVideoEmbed,

  // Documents
  siteSettings,
  productCategory,
  product,
  productsIndexPage,
  blogCategory,
  blogPost,
  teamMember,
  clientStory,
  clientStoriesHub,
  homePage,
  aboutPage,
  partnershipsPage,
  contactPage,
  knowledgeHubPage,
];
