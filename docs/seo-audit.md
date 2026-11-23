# SEO audit — Phase 1

Read-only review of the Next.js App Router site in this repo. Sanity Studio is embedded at `/backstage` and was checked here. The pipeline app’s Enquiries module is a separate codebase and was not.

Live Sanity content and the Vercel value of `NEXT_PUBLIC_SITE_URL` were not queried. Where a finding depends on that, it is called out.

Severity: **high** (fix in Phase 2), **medium**, **low**.

---

## 1. Router and metadata

**Current state.** App Router only. There is no `pages/` directory. The root layout sets `metadataBase`, a default title, description, `robots: { index: true, follow: true }`, Open Graph, and `alternates`. Each indexable route then exports `metadata` or `generateMetadata`. Almost all of them go through `buildPageMetadata()` in `lib/seo/metadata.ts`, which sets `title`, `description`, `alternates.canonical` (a root-relative path), Open Graph and Twitter.

Next.js replaces the whole `alternates` object when a child segment defines one (`node_modules/next/dist/lib/metadata/resolve-metadata.js`). A page that sets its own canonical does **not** inherit the layout canonical of `/`.

**Files.** `app/layout.tsx`, `lib/seo/metadata.ts`, and every `app/**/page.tsx` listed in section 8.

**Problem.** None in the routing model. Metadata quality is covered in sections 2 and 8.

**Severity.** Low (architecture is sound).

**Proposed fix.** Keep App Router. Phase 2 should pin `metadataBase` and make every indexable page set its own canonical, title and description. No Pages Router work.

---

## 2. metadataBase and canonicals

**Current state.** `metadataBase` is `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com")` in `app/layout.tsx`. The same env var, with the same www fallback, builds sitemap URLs, `robots.txt` sitemap URL, JSON-LD, and breadcrumb URLs.

`buildPageMetadata()` sets `alternates.canonical` to the page path (`/`, `/products/mailer-boxes`, and so on). Next resolves that against `metadataBase`, so the tag is absolute **if** the env var is the www origin. No page hardcodes a canonical to the homepage. The six flagship client stories, the dynamic `[slug]` routes, products, blog, merch, cost audit and packaging review each set their own path.

Exceptions:

- Legal pages set `alternates.canonical` directly (`/terms`, `/privacy-policy`, `/cookie-policy`) and skip `buildPageMetadata()`, so they have no Open Graph image.
- `/merch` uses `content.seo.canonical` from Sanity (`sanity/schemaTypes/documents/merchPage.ts`, fallback `"/merch"` in `lib/content/merch.ts`). An editor can point that canonical at another URL.
- `app/not-found.tsx`, `app/admin/layout.tsx` and `app/backstage/[[...index]]/layout.tsx` do not set `alternates`, so they keep the layout canonical of `/`. Admin and Studio are `noindex`. The 404 is `noindex, follow`.
- The layout also sets `alternates.languages["en-GB"]` to the site origin (the homepage URL only). Child pages that set `alternates` replace that object, so the hreflang is dropped on every real page, including the homepage.

**Files.** `app/layout.tsx`, `lib/seo/metadata.ts`, `app/merch/page.tsx`, `lib/content/merch.ts`, `sanity/schemaTypes/documents/merchPage.ts`, `app/terms/page.tsx`, `app/privacy-policy/page.tsx`, `app/cookie-policy/page.tsx`, `SANITY_CMS_SETUP.md` (documents `NEXT_PUBLIC_SITE_URL=https://suppliedpackaging.com`, the apex, not www).

**Problem.** Canonicals are self-referencing paths, but the host is not pinned to `https://www.suppliedpackaging.com`. If Vercel follows the setup doc, every canonical and the sitemap use the apex host, and `middleware.ts` 301s that host to www. The URL Google is told to index would be a redirect. This could not be confirmed against the live env.

**Severity.** High.

**Proposed fix.** Phase 2: set `metadataBase` to `https://www.suppliedpackaging.com` in code. Stop reading the host from `NEXT_PUBLIC_SITE_URL` for canonicals, sitemap and JSON-LD. Remove the free-text merch canonical, or ignore it unless it equals `/merch`. Give legal pages the same metadata helper. Leave the 404 and admin routes on `noindex` and do not canonicalise them to `/`.

---

## 3. robots.txt and sitemap

**Current state.** Both exist as App Router metadata routes, not static files in `public/`.

`app/robots.ts` allows `/` for `*` and for GPTBot, ChatGPT-User, Google-Extended, ClaudeBot, anthropic-ai, PerplexityBot, Amazonbot and Cohere-ai. It disallows `/admin/`, `/backstage/` and `/api/`. The sitemap line is `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`, falling back to `https://www.suppliedpackaging.com/sitemap.xml`. Rules do not change by host. A preview deployment serves the same allow-all file.

`app/sitemap.ts` builds an absolute sitemap from Sanity via `sanityFetch` (published perspective, `revalidate: 3600`). `lastModified` comes from `_updatedAt`, with a fixed fallback of `2026-04-05` when a document has no date. It includes:

- Static routes: `/`, `/products`, `/client-stories`, `/blog`, `/about-us`, `/partnerships`, `/knowledge-hub`, `/merch`, `/contact-us`, `/packaging-review`, `/terms`, `/privacy-policy`, `/cookie-policy`
- Every published `product` slug at `/products/{slug}`
- Every published `blogPost` slug at `/blog/{slug}`
- Client stories: the six hardcoded slugs unioned with every published `clientStory` slug

It does not include drafts (published perspective). It does not include `/packaging-cost-audit`. It does not include `/admin` or `/backstage`.

**Files.** `app/robots.ts`, `app/sitemap.ts`, `lib/sanity/fetch.ts`.

**Problem.**

- `/packaging-cost-audit` is an indexable page with its own metadata and is missing from the sitemap.
- Sitemap and robots URLs follow `NEXT_PUBLIC_SITE_URL` (same host risk as section 2).
- `robots.txt` allows indexing on `*.vercel.app` and preview hosts. There is no production-only switch.
- The sitemap is dynamic from Sanity for products, posts and stories. `robots.txt` is not content from Sanity, which is fine.

**Severity.** High for preview indexing (with section 5). Medium for the missing cost-audit URL and the unpinned host.

**Proposed fix.** Phase 2: keep one production `robots.txt` that allows `/` and points at `https://www.suppliedpackaging.com/sitemap.xml`. Add `/packaging-cost-audit` (and any future landing pages) to the sitemap. Keep absolute www URLs and `_updatedAt`. Do not rely on robots.txt alone for previews; see section 5.

---

## 4. Rendering (products, blog, client stories)

**Current state.** All three are server-rendered. The page fetches in the server component and passes data into a client component as props. Client components still render that content in the first HTML. `useEffect` in these trees is for scroll progress, heading highlight and the 3D toggle, not for loading the page copy.

| Route | Server fetch | UI component | In the first HTML? |
| --- | --- | --- | --- |
| `/products/[slug]` | `getProductBySlug`, `getProducts`, `getAllPosts` in `app/products/[slug]/page.tsx` (`generateStaticParams` + RSC) | `ProductDetail` (`"use client"`) | Yes. Copy, FAQs, specs and related links are props. |
| `/products` | `getProducts`, `getProductCategories`, `getProductsIndexPageContent` | `ProductsIndex` | Yes. Default category is `"all"`, so every product card is in the first render. |
| `/blog/[slug]` | `getPostBySlug`, `getRelatedPosts`, `getProducts` | `BlogArticle` | Yes. `useEffect` only tracks scroll. |
| `/blog` | `getAllPosts`, `getAllCategories` | `BlogIndex` | Yes. |
| `/client-stories/[slug]` | `getClientStoryBySlug` | `ClientStoryPage` | Yes, for CMS-only stories. `generateStaticParams` skips the six hardcoded slugs. |
| `/client-stories/{healf,spacegoods,glaize-x-aston-martin,trip,glow-for-it,uncle-matts-hats}` | Sanity fetch inside each static `page.tsx`, passed into a bespoke story component | `HealfStory`, `SpacegoodsStory`, and the other four | Yes. Components fill gaps from hardcoded fallbacks when a Sanity field is empty, and those fallbacks are in the server render. |
| `/client-stories` | `getClientStoriesHubContent` | `ClientStoriesHub` | Yes. Cards link to `/client-stories/{slug}`. |

Data access is `sanityFetch` → published Sanity, with an in-repo fallback if Sanity throws (`lib/content/products.ts`, `lib/content/blog.ts`, `lib/content/clientStories.ts`). Product pages also merge legacy fields the CMS does not own (`priceRange`, `h1Title`, `modelUrl` for mailer boxes).

`/knowledge-hub` FAQ content is server-fetched and rendered. The ask-box answers come from `POST /api/chat` after the user submits. That is not the main content.

**Files.** The page files above; `lib/content/products.ts`, `lib/content/blog.ts`, `lib/content/clientStories.ts`, `lib/sanity/fetch.ts`; `components/sections/ProductDetail.tsx`, `components/sections/BlogArticle.tsx`, `components/client-stories/*`.

**Problem.** No client-only fetch of product, post or story body. Nothing here has to move from `useEffect` to RSC for the copy to be crawlable.

**Severity.** Low.

**Proposed fix.** Phase 2 does not need a rendering migration for these routes. Phase 4 should still render new product and landing-page fields on the server, the same way these pages already do. When the six flagship stories are fully in Sanity, the hardcoded fallbacks can go, but that is content model work, not a crawlability bug.

---

## 5. Hosts, previews, supplied.agency

**Current state.** `middleware.ts` 301-redirects any host containing `supplied.agency`, and any `suppliedpackaging.com` host that does not start with `www.`, to `https://www.suppliedpackaging.com` plus the original path and query. That is the only `supplied.agency` reference in application code (the playbook and this audit mention it too). There is no old-path redirect map in `next.config.ts`.

`next.config.ts` sends `X-Robots-Tag: noindex, nofollow, noarchive` on `/admin`, `/admin/:path*` and `/api/pipeline/:path*` only. It does not vary headers by host.

`*.vercel.app` and other preview hosts are not redirected and do not get `noindex`.

**Files.** `middleware.ts`, `next.config.ts`, `app/admin/layout.tsx`, `app/backstage/[[...index]]/layout.tsx`.

**Problem.** A preview such as `supplied-site.vercel.app` is allowed by `robots.txt`, has no `X-Robots-Tag`, and will emit canonicals at whatever `NEXT_PUBLIC_SITE_URL` is. If that env is the production www host, canonicals point at production (helpful, not sufficient). If it is the preview host, the preview is self-canonical. Either way the playbook requirement is unmet: non-production hosts must not be indexable.

The apex → www redirect exists, as a 301 rather than a 308, and only inside middleware. Whether Vercel also redirects the domain was not checked. Old `supplied.agency` paths were not available to compare; the middleware preserves the path, so a retired URL only survives if this app has the same path.

**Severity.** High.

**Proposed fix.** Phase 2: if the request host is not `www.suppliedpackaging.com`, set `X-Robots-Tag: noindex, nofollow`. Keep the host redirect. Use 308 if Vercel is not already doing it. Separately, in Vercel Domains, point `supplied.agency` and `www.supplied.agency` at www. Add a `next.config` redirect map only after the old paths are known. That map is not in this repo.

---

## 6. Structured data

JSON-LD found:

| Type | Where | Notes |
| --- | --- | --- |
| Organization + WebSite | `app/layout.tsx` (every page) | See below. |
| Product + AggregateOffer | `app/products/[slug]/page.tsx` | Offer block only when `product.priceRange` is set. |
| FAQPage | `components/sections/ProductDetail.tsx` | Only if the product has FAQs. Built from the same FAQ copy as the page. |
| BreadcrumbList | `components/ui/Breadcrumbs.tsx` on product pages | Last item has no `item` URL. |
| Article | `app/blog/[slug]/page.tsx` | Headline, description, image, dates, author, publisher. |
| BreadcrumbList | `components/ui/BreadcrumbJsonLd.tsx` on blog, client stories, and several hubs | Same missing current-page URL. |
| FAQPage | `components/sections/KnowledgeHub.tsx` | From hub FAQ content. |
| FAQPage | `components/sections/PartnershipsPageClient.tsx` | From partnerships FAQs, only if the list is non-empty. |
| Organization, Product (one per merch category), FAQPage | `app/merch/page.tsx` | Product offers are placeholder. |
| FAQPage | Merch, as above | From merch FAQ content. |

No Review, AggregateRating, or star markup was found.

### Organization and WebSite (`app/layout.tsx`)

- `@type: Organization`, `name: "Supplied Agency"`. No `legalName`.
- `url` is `siteUrl` (env, www fallback).
- `logo` is `${siteUrl}/images/brand/supplied-logo.svg` (SVG, not a raster logo).
- Address is hardcoded: Unit 19, Winnington Business Park, Northwich, CW8 4DL, GB.
- `contactPoint.email` is `hello@suppliedpackaging.com`.
- `sameAs`: `https://www.linkedin.com/company/supplied-agency` and `https://www.instagram.com/suppliedpackaging/`.
- WebSite is only `name: "Supplied"` and `url`. No `SearchAction` (the site has no site-search URL, so omitting it is correct).

The terms page states the legal entity is Supplied Agency Ltd, company no. 15812561. The schema name does not match the Phase 2 brief (`name: "Supplied"`, `legalName: "Supplied Agency Ltd"`).

**Severity.** Medium.

### Product on `/products/[slug]`

`priceRange` is not a Sanity field. `lib/content/products.ts` copies it from `lib/content/legacyProducts.ts` whenever the slug matches a legacy product. All ten legacy products define a range (`rigid-boxes` £3–£8, `mailer-boxes` is in that file too, and the other eight). The JSON-LD then emits:

- `AggregateOffer`
- `priceCurrency: GBP`
- `lowPrice` / `highPrice` from that hardcoded object
- `offerCount: "1"` (a string, and not a real offer count)
- `availability: https://schema.org/InStock`

Made-to-order packaging is not stock sitting in a warehouse. These prices are not CMS data. `image` is a Sanity CDN URL when the asset exists, and a root-relative `/images/...` path on the legacy fallback, with no `siteUrl` prefix. `category` is the internal id (`boxes`), not a label.

FAQ JSON-LD on the same page is real FAQ text. That part is fine.

**Severity.** High.

### Product on `/merch`

Each category is a Product with `Offer.price: "0"`, `priceCurrency: GBP`, `priceValidUntil: "2027-12-31"`, `availability: InStock`, and a description that says “Price on request”. A second Organization block repeats the root one.

**Severity.** High.

### Article

`dateModified` is set to `datePublished` (`post.dateISO`). There is no separate modified date. Publisher name is “Supplied”. Image is made absolute.

**Severity.** Low.

### BreadcrumbList

Both breadcrumb components omit `item` on the current page (the entry with no `href`). Google expects the current page URL on the last `ListItem`.

**Severity.** Medium.

### Client stories

No Article or CaseStudy JSON-LD. Breadcrumbs only.

**Severity.** Low. Add it in a later phase from real story fields. Do not invent awards or ratings.

**Proposed fix.** Phase 2: correct Organization and WebSite in the root layout (name, legal name, url, logo, sameAs — LinkedIn is already in the layout, so no TODO is needed for that URL). Delete the merch `price: "0"` offers, or emit a Product with no `offers`. On packaging products, emit Product JSON-LD with name, description, image (absolute), url and brand only, unless Sanity has a real price field. Drop `InStock` and `offerCount`. Point the last breadcrumb `item` at the current absolute URL. Do not add reviews or ratings.

---

## 7. Headings

**Current state.** Indexable pages each render one `h1` (or `AccentHeading as="h1"`):

| Page | H1 source |
| --- | --- |
| `/` | `components/sections/HeroSpread.tsx` |
| `/products` | `components/sections/products/ProductHero.tsx` |
| `/products/[slug]` | `components/sections/ProductDetail.tsx` (`product.h1Title \|\| product.name`) |
| `/blog` | `components/sections/BlogIndex.tsx` |
| `/blog/[slug]` | `components/sections/BlogArticle.tsx` |
| `/client-stories` | `components/client-stories/ClientStoriesHub.tsx` |
| `/client-stories/[slug]` | `components/client-stories/ClientStoryPage.tsx` |
| Six flagship stories | One `h1` in each story component |
| `/about-us` | `components/sections/AboutUs.tsx` |
| `/contact-us` | `components/sections/ContactPageClient.tsx` |
| `/partnerships` | `components/sections/PartnershipsPageClient.tsx` |
| `/knowledge-hub` | `components/sections/KnowledgeHub.tsx` |
| `/merch` | `components/sections/merch/MerchHero.tsx` |
| `/packaging-cost-audit` | `components/sections/CostAuditPageClient.tsx` |
| `/packaging-review` | `components/sections/PackagingReviewPageClient.tsx` |
| Legal pages | `components/ui/LegalPageLayout.tsx` |
| 404 | `app/not-found.tsx` |

Navbar and footer have no `h1`. Homepage sections below the hero use `h2`.

`h1Title` on product pages comes only from the legacy file, not from Sanity (`lib/content/products.ts` sets `h1Title: fallbackProduct?.h1Title`). CMS cannot change the product H1.

Admin screens (`AdminHome`, `EnquiriesAdmin`, `KnowledgeAdmin`) render more than one `h1` in places. They are `noindex` and disallowed.

**Problem.** No indexable page was found with zero or multiple H1s. Product H1s are not editable in Sanity.

**Severity.** Low for the public H1 count. The missing CMS H1 field is Phase 4.

**Proposed fix.** Phase 2: no H1 markup change required. Phase 4: add an optional product `h1` (or use the existing name) and stop reading `h1Title` only from `legacyProducts.ts`.

---

## 8. Titles and descriptions

**Current state.** Static titles below are unique. Descriptions on those routes are unique too. They are hardcoded in the page file, not read from Sanity, except where noted.

| Path | Title source | Description source |
| --- | --- | --- |
| `/` | Hardcoded in `app/page.tsx` | Hardcoded. Layout default is a different title and is overridden. |
| `/products` | Hardcoded in `app/products/page.tsx` | Hardcoded |
| `/blog` | Hardcoded in `app/blog/page.tsx` | Hardcoded |
| `/client-stories` | Hardcoded in `app/client-stories/page.tsx` | Hardcoded |
| `/about-us` | Hardcoded in `app/about-us/page.tsx` | Hardcoded |
| `/contact-us` | Hardcoded in `app/contact-us/page.tsx` | Hardcoded |
| `/partnerships` | Hardcoded in `app/partnerships/page.tsx` | Hardcoded |
| `/knowledge-hub` | Hardcoded in `app/knowledge-hub/page.tsx` | Hardcoded |
| `/merch` | Sanity `seo.title`, else fallback in `lib/content/merch.ts` | Sanity `seo.description`, else fallback |
| `/packaging-cost-audit` | Sanity `seo` via `getCostAuditPageContent()` | Same |
| `/packaging-review` | Sanity `seo` via `getPackagingReviewPageContent()` | Same |
| `/terms`, `/privacy-policy`, `/cookie-policy` | Hardcoded in each page | Hardcoded |
| `/products/[slug]` | `product.seo.title`, else `{name} \| Supplied Packaging` | `product.seo.description`, else `product.description` |
| `/blog/[slug]` | `post.seo.title` (trimmed to 60 characters), else `{title} \| Supplied Blog` also trimmed | `post.seo.description`, else excerpt |
| `/client-stories/[slug]` | `{clientName} — Client Story \| Supplied` | `result`, else `solution`, else `challenge` |
| Six flagship stories | Hardcoded in each `app/client-stories/*/page.tsx` | Hardcoded |

Sanity `seo` object (`title`, `description` only) exists on: `product`, `blogPost`, `merchPage`, `costAuditPage`, `packagingReviewPage`. It does **not** exist on `homePage`, `aboutPage`, `productsIndexPage`, `clientStoriesHub`, `clientStory`, `contactPage`, `partnershipsPage`, `knowledgeHubPage`, or `siteSettings`.

Legacy product SEO titles in `lib/content/legacyProducts.ts` are unique (one per slug, all ending in `| Supplied`). They apply when the CMS field is empty, because `mapSanityProduct` fills `seo.title` from the legacy record before the page fallback runs. Published CMS titles were not read, so two documents could still share a title in the dataset.

Blog titles are sliced at 60 characters, which can make two long titles look the same in the tab.

The root layout title (`Packaging Partner for Consumer Brands | Supplied`) and description are defaults for any route that forgets metadata. Current indexable routes override them. `not-found` sets a title and no description.

**Problem.** Titles are unique in code. Most important URLs cannot be edited in Sanity. Client stories have no SEO fields at all. Merch, cost audit, packaging review, products and posts can.

**Severity.** Medium for the missing CMS fields on hubs and stories. Low for duplicate risk in the static list (none found).

**Proposed fix.** Phase 2: keep one unique title and description per route; read Sanity `seo` where the field already exists; otherwise keep the current per-page string, not the layout default. Phase 4: add `seoTitle` / `seoDescription` (or the existing `seo` object) to products that need richer landing copy, to `clientStory`, and to the new `landingPage` type. Do not add a single site-wide description.

---

## 9. Heavy assets

Files over 500KB under `public/`, and whether a route loads them.

### Loaded on a page view

| Asset | Size | When it loads |
| --- | --- | --- |
| `public/models/SpacegoodsRender10.glb` | 12.2 MB | `/products/mailer-boxes`. Legacy `modelUrl` is merged onto that slug even if Sanity leaves `modelUrl` empty. `app/products/[slug]/page.tsx` emits `<link rel="preload">` for the GLB and the HDR in the first HTML, before anyone clicks “View in 3D”. |
| `public/studio_small_01_1k.hdr` | 1.6 MB | Same preload on any product with `modelUrl`. Today that is mailer boxes. `ProductModelViewer` also points `Environment` at this HDR, and calls `useGLTF.preload("/models/SpacegoodsRender10.glb")` when the viewer chunk loads. The viewer itself is `next/dynamic` with `ssr: false` and mounts only after the toggle. The preload links do not wait for the toggle. |
| `public/videos/HealfAdventTiktok.mp4` | 9.8 MB | `/client-stories/healf`. `UnboxingOverlayCTA` keeps `TikTokPlayer` mounted while the panel is off-screen. The `<video src>` has `autoPlay`, so the file is requested on load. |
| `public/videos/SpacegoodsTiktok.mp4` | 4.3 MB | `/client-stories/spacegoods`. Same pattern. |
| `public/videos/TripTubeTiktok.mp4` | 3.7 MB | `/client-stories/trip`. |
| `public/videos/UncleMattsTiktok.mp4` | 3.3 MB | `/client-stories/uncle-matts-hats`. |
| `public/videos/GlazieTiktok.mp4` | 2.3 MB | `/client-stories/glaize-x-aston-martin`. |
| `public/videos/GlowForItTiktok.mp4` | 1.3 MB | `/client-stories/glow-for-it`. |
| `public/images/products/MrsAliceShippingBoxHero.webp` | 546 KB | Hero/catalogue image for shipping boxes when that path is used. `ProductDetail` sets `priority` on the hero image. |

Homepage preloads `/SuppliedSpreadTransparent.webp`. That file is under 500KB.

### In `public/`, not referenced by any component

These are not loaded by a route today. They still ship with the deployment.

| Asset | Size |
| --- | --- |
| `public/models/spacegoodsboxopen.glb` | 99.5 MB |
| `public/models/SpacegoodsRender2.glb`, `3`, `6`, `7`, `8`, `9` | about 12.5 MB each |
| `public/models/SpacegoodsRender4.glb`, `5` | about 8.6 MB each |
| `public/models/crashlock-box.glb` | 4.3 MB |

**Files.** `app/products/[slug]/page.tsx`, `components/ui/ProductModelViewer.tsx`, `components/sections/ProductDetail.tsx`, `lib/content/legacyProducts.ts`, `components/client-stories/UnboxingOverlayCTA.tsx`, `components/ui/TikTokPlayer.tsx`, the six story components, `public/models/`, `public/videos/`.

**Problem.** The mailer-box document preloads about 14MB of 3D assets during first load, on the main commercial URL. Case-study videos download even when the overlay is closed. A 99.5MB GLB is unused and still in the repo.

**Severity.** High for the mailer-box preload. Medium for the case-study videos. Low for unused files (deploy weight, not crawl or LCP, until something imports them).

**Proposed fix.** Phase 2: remove the `<link rel="preload">` tags and the module-level `useGLTF.preload`. Load the GLB and HDR only after “View in 3D”, on that route only. Set the case-study `<video>` `src` only when the overlay opens. Delete or stop deploying the unreferenced GLBs (especially `spacegoodsboxopen.glb`) in that same phase if it stays a one-line asset change; otherwise leave deletion for a follow-up so Phase 2 does not turn into a media cleanup.

---

## 10. Internal linking

**Current state.**

- `/products` lists every product returned by `getProducts()` (legacy slugs, plus any other Sanity product that has slug, name, description, image, hero stats and detailed specs). Each card links to `/products/{slug}` (`components/ui/ProductCard.tsx`). The first render is category `"all"`.
- Footer links to mailer boxes, rigid boxes, shipping boxes, paper mailers, printed cans, and `/products` (`components/layout/Footer.tsx`).
- Homepage `Products` teaser links to seven product URLs, including `/products/mailer-boxes` (`components/sections/Products.tsx`). Those hrefs are hardcoded, not the full catalogue.
- Product pages link to `/contact-us` (quote and samples, repeated), to up to four related products, and to three blog posts. Related products are “same category, then fill from the rest”, not a CMS reference (`app/products/[slug]/page.tsx`). Related posts are `allPosts.slice(0, 3)`, not posts about that product. There is no link to a client story.
- Homepage case-study cards have a `slug` but the UI only changes the active card. The only link is the section CTA, default `/client-stories` (`components/sections/CaseStudies.tsx`). Individual stories are not linked from the homepage carousel.
- `/client-stories` links to each story. Contact, about and partnerships pages link among themselves via in-page quick links. Product schema has no `relatedProducts` or `caseStudies` references.

**Files.** `components/sections/ProductsIndex.tsx`, `components/ui/ProductCard.tsx`, `components/layout/Footer.tsx`, `components/sections/Products.tsx`, `components/sections/ProductDetail.tsx`, `app/products/[slug]/page.tsx`, `components/sections/CaseStudies.tsx`, `components/client-stories/ClientStoriesHub.tsx`, `sanity/schemaTypes/documents/product.ts`.

**Problem.** The products index does link to every product the catalogue function returns. Product pages link to contact and to a computed set of other products. They do not link to case studies. “Related” blog posts are the first three posts. The homepage proof section does not deep-link to the story URLs.

**Severity.** Medium.

**Proposed fix.** Phase 2 can add story links on the homepage cards and stop using `allPosts.slice(0, 3)` if a simple category match already exists. Editorial related products and case-study references belong in Phase 4, when the schema has `relatedProducts` and `caseStudies`. Phase 5a then links the mailer-box hub to format and sector pages.

---

## 11. Contact form and enquiry storage

**Current state.** The contact form does not write to Supabase. Supabase appears only in `scripts/migrate-knowledge-hub-to-sanity.ts` (a one-off read of a `knowledge_hub` table). There is no Supabase client in the app.

### Contact, cost audit, packaging review

1. `components/sections/ContactPageClient.tsx` POSTs JSON to `/api/contact`.
2. `components/sections/CostAuditPageClient.tsx` and `components/sections/PackagingReviewPageClient.tsx` POST to the same route with `type: "cost-audit"` or `type: "packaging-review"`.
3. `app/api/contact/route.ts` rate-limits, honours a honeypot field `_hp`, validates, then:
   - `persistEnquiry()` in `lib/enquiries/store.ts`
   - email via Resend (`https://api.resend.com/emails`) to luke@, alex@, gareth@, marcos@ and lil@ `suppliedpackaging.com`
   - optional Slack message if `SLACK_WEBHOOK_URL` is set
4. `persistEnquiry` creates a Sanity document with `_type: "enquiry"` and `_id` `enquiry.{timestamp}{rand}`. It then fires `dispatchEnquiryCreated` (`lib/enquiries/webhook.ts`) to `PIPELINE_WEBHOOK_URL`, signed with `PIPELINE_WEBHOOK_SECRET` or `PIPELINE_API_TOKEN`.
5. The pipeline app can also pull `GET /api/pipeline/enquiries` and `GET /api/pipeline/enquiries/[id]` (`app/api/pipeline/enquiries/route.ts`). This repo’s own admin is `/admin/enquiries` (`components/sections/EnquiriesAdmin.tsx`), reading the same Sanity documents.

`enquiry` is **not** in `sanity/schemaTypes/index.ts`. Documents are written without a registered schema. Studio in this repo will not show them as a normal document type. The insights pane is `sanity/components/EnquiryInsightsPane.tsx`, mounted from `sanity/structure.ts`.

### Fields actually stored

Plaintext on the Sanity document: `submittedAt`, `source` (`contact` | `cost-audit` | `packaging-review`), `subject`, `productType`, `estimatedQuantity`, `packagingTypes`, `volumeRaw`, `volumeQty`, `volumeBand`, `belowMoq`, `complexity`, `specNotes`, `plugAndPlayFit`, `kind`, `reviewStatus`, `notes`.

Encrypted with `lib/enquiries/crypto.ts`: `name`, `company`, `email`, `phone`, `message`, `extra` (JSON string), `notes`.

`extra` for the contact form currently holds `referralSource` when the visitor picks one. Cost-audit extra can also hold `jobTitle`, `companyRevenue`, `packagingSkus`, `packagingSuppliers`, `focusArea`.

There are no columns or keys for `heard_about`, `heard_about_detail`, `referrer`, `landing_page`, `utm_source`, `utm_medium`, `utm_campaign`.

### “How did you hear about us?”

The contact form already has an optional select, `referralSource`, options from `CONTACT_REFERRAL_SOURCES` in `lib/enquiries/types.ts` (Google search, LinkedIn, Instagram, AI search, referral, existing customer, agency or partner, trade show or event, article/podcast/press, email, other). Placeholder is “Optional”. There is no free-text follow-up. The value is included in the Resend email and the Slack message when present, and in `extra.referralSource` for the pipeline payload (`lib/enquiries/pipeline.ts` passes `extra` through).

It does not match the Phase 3 option list, it is not required, and it does not capture session referrer, landing path or `utm_*`.

### Other forms (not the contact table)

- `/partnerships` → `POST /api/partnerships` → Resend (and Slack if configured). It does not call `persistEnquiry`.
- Knowledge Hub lead capture → `POST /api/leads` → Slack only. It does not call `persistEnquiry`.
- `POST /api/inbound` forwards Resend inbound mail. It is not the contact form.

### Outside this repo

`PIPELINE_ENQUIRY_API.md` and `PIPELINE_ENQUIRY_REPLY.md` say the pipeline app is a separate project. It is expected to expose something like `POST /webhooks/supplied-enquiries` and to call this site’s pipeline API. Its Enquiries module was not in this workspace, so it is unknown whether that UI reads `extra.referralSource` or only a fixed field list. Phase 3 has to change that app as well as this one. There is no Supabase migration to run for enquiries.

**Severity.** Medium for attribution (the commercial gap Phase 3 is for). Not an indexing defect.

**Proposed fix.** Phase 3 should extend the Sanity `enquiry` document (and register the type), the contact form, the Resend/Slack bodies, and `PipelineEnquiryPayload`. Do not add a Supabase table. Then update the pipeline app so the new keys render in its Enquiries module. Tell that agent: payload already includes `extra`; new fields should be first-class on the webhook and the pull API, not only inside encrypted `extra`, or the other app will keep missing them.

---

## What was not checked

- Vercel project settings: the real `NEXT_PUBLIC_SITE_URL`, domain redirects, and whether `supplied.agency` is already a domain redirect on top of middleware.
- The published Sanity dataset (actual titles, which products have `seo.title` filled, which stories exist beyond the six hardcoded routes).
- The old `supplied.agency` URL list, so no redirect map was drafted.
- The pipeline app repository and its Enquiries screens.
- Google Search Console, Rich Results, or the live HTML of production. This audit is from source.

---

## Prioritised fix list

### Phase 2 — technical

1. **High.** Pin canonicals, sitemap and JSON-LD to `https://www.suppliedpackaging.com`. Do not take the host from `NEXT_PUBLIC_SITE_URL`. Confirm every indexable page has a self-referencing canonical. Remove or lock the merch canonical field.
2. **High.** On any host other than `www.suppliedpackaging.com`, send `X-Robots-Tag: noindex, nofollow`. Keep `robots.txt` allow-all only as the production file, with the sitemap URL on www.
3. **High.** Keep the apex and `supplied.agency` redirect. Prefer 308. Add an old-path map only once the old URLs are known. Vercel domain setup stays a manual step.
4. **High.** Remove invented Product offers: legacy `priceRange` / `InStock` / `offerCount` on product pages, and `price: "0"` on `/merch`. Keep Product, FAQ and Breadcrumb markup that uses real fields. Fix Organization (`name: "Supplied"`, `legalName: "Supplied Agency Ltd"`, existing LinkedIn and Instagram `sameAs`) and WebSite in the root layout. Add the current URL on the last breadcrumb item.
5. **High.** Stop preloading `SpacegoodsRender10.glb` and `studio_small_01_1k.hdr` on mailer boxes. Load them only after “View in 3D”.
6. **Medium.** Add `/packaging-cost-audit` to the sitemap. Keep products, posts, stories and the other static routes, with `_updatedAt`.
7. **Medium.** Case-study videos: set `src` only when the overlay opens.
8. **Medium.** Homepage case-study cards should link to `/client-stories/{slug}`. Replace `allPosts.slice(0, 3)` on product pages with posts that share a category, if that data is already on the post.
9. **Low.** Legal pages should use `buildPageMetadata` so they get Open Graph. Do not canonicalise the 404 to `/`. Drop or ignore unused GLBs (`spacegoodsboxopen.glb` first) so they are not deployed.

No rendering migration is required for products, blog or client stories. Public pages already have one H1.

### Phase 3 — form attribution

1. Add the required “How did you hear about us?” options from the playbook, plus the optional free-text field. The current select can be replaced; it is optional and the option list differs.
2. Capture `document.referrer`, landing path and `utm_*` in `sessionStorage` on the first page view, and submit them with the form.
3. Persist them on the Sanity `enquiry` document (new fields, not a Supabase migration). Register `enquiry` in the Studio schema. Include the fields in the Resend email, Slack, and `toPipelinePayload`.
4. Update the pipeline app (separate repo) so its Enquiries module shows the new fields. This repo only documents the contract in `PIPELINE_ENQUIRY_API.md`.

### Phase 4+ — content model

1. Extend `product` with the Phase 4 fields that are still missing: intro, formats, print options as a list (today `specs.printOptions` is one string), MOQ and lead time as page copy (today they are spec strings), price guide, `relatedProducts`, `caseStudies`, and a real H1 field. `faqs` and `seo` already exist. Do not keep prices only in `legacyProducts.ts`.
2. Add `landingPage` (slug, SEO, H1, intro, sections, FAQs, case studies, related products, primary CTA), a route, sitemap entries and canonicals.
3. Add `seo` to `clientStory`, and use it on the six flagship routes instead of hardcoded titles.
4. Add `seo` to the homepage and the other hubs if those titles should be editable. Until then the hardcoded strings in section 8 are the source of truth.
5. Phase 5 pages (mailer-box hub, tender page, format and sector landing pages) depend on that model. Phase 6 IndexNow depends on the existing content webhook (`app/api/wh/content/route.ts` was not changed in this audit).
