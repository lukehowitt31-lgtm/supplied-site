# Sanity CMS Setup Runbook (Supplied Site)

This document is a project-specific, step-by-step guide to move this Next.js site from hardcoded copy/images to active Sanity CMS content.

It is written for the current repo structure and routes in this project.
Primary deployment reference for this runbook is `https://suppliedpackaging.com/`.

---

## Canonical Collaboration Context (Vercel)

- Primary live URL: `https://suppliedpackaging.com/`
- Primary Studio URL (after setup): `https://suppliedpackaging.com/studio`
- Local dev URL: `http://localhost:3002`
- Review workflow: use Vercel preview deployments for sign-off before publishing to live
- This runbook is intentionally structured around the current live information architecture

---

## Target Outcome

When complete, editors can:
- update copy and images in Sanity Studio
- publish changes without code edits
- see updates reflected on the live site after revalidation
- collaborate with reviewers using a consistent preview -> approve -> publish process

Developers keep:
- App Router architecture
- data access in `lib/content/*`
- section/page UI in `components/*`

### Primary Goal For This Project

Use **Visual Editing / Presentation mode** as the main editing workflow:
- open the website preview from Studio
- click visible content blocks directly on the page
- edit copy/images and publish

This runbook prioritizes visual editing readiness over enterprise role workflows.

---

## Current Content Sources (Baseline)

Current hardcoded content entry points:
- `lib/products.ts` (products + categories + product detail copy + image paths)
- `lib/content/blog.ts` (blog listing content)
- `lib/content/team.ts` (team cards)
- many page/section components still contain inline copy arrays (for example `components/sections/AboutUs.tsx`)

Current route map to cover (aligned to live nav at `https://suppliedpackaging.com/`):
- `/` (Home)
- `/products` and `/products/[slug]`
- `/partnerships`
- `/client-stories` and `/client-stories/*`
- `/about-us`
- `/knowledge-hub`
- `/contact-us`
- `/blog` (already in codebase and should remain CMS-backed)

Homepage module map to model in CMS:
- Hero + primary CTAs
- Trusted brands strip
- Problem bottleneck section
- Supplied solution / process summary
- Services section
- Client stories teaser
- Product catalogue teaser
- Sustainability + compliance section
- Process timeline section
- Final CTA section

---

## Phase 0 - Collaboration Setup (Do This First)

1. Add collaborators to the Vercel project with preview access.
2. Add collaborators to Sanity with a lightweight role split:
   - 2 x Admin (schema/settings/publish control)
   - 1 x Editor (blog and day-to-day content updates)
3. Set one source of truth for sign-off:
   - "Approved in Vercel preview URL" before publish
4. Create a simple shared tracker with status fields:
   - `Not Started`, `Schema Done`, `Content Migrated`, `QA Passed`, `Live`

---

## Phase 1 - Sanity Project + Access

1. Create a Sanity project in Sanity Manage:
   - project name: `supplied-site` (or your preferred name)
   - dataset: `production`
2. In Sanity Manage, configure CORS origins:
   - `http://localhost:3002`
   - `https://suppliedpackaging.com`
   - your custom production domain(s), if different
   - any active Vercel preview URL used for browser-based preview workflows
3. Generate tokens:
   - read token (for preview/private datasets)
   - write token (only if needed for scripts/imports)
4. Decide dataset policy:
   - simplest: `production` dataset readable (public content only)
   - stricter: private dataset + server-side token reads

---

## Phase 2 - Install Dependencies

Run:

```bash
npm install sanity next-sanity @sanity/image-url @portabletext/react groq @sanity/vision
```

If you plan to run scripted imports, also add:

```bash
npm install -D tsx
```

---

## Phase 3 - Environment Variables

Create/update `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-13
NEXT_PUBLIC_SITE_URL=https://suppliedpackaging.com

# Optional but recommended for preview/drafts/private dataset
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token

# For webhook security
SANITY_REVALIDATE_SECRET=super_long_random_secret
```

Notes:
- keep tokens server-only (never expose via `NEXT_PUBLIC_*`)
- `.env*` is already gitignored in this repo

---

## Phase 4 - Add Core Sanity Files

Create these files:

```text
sanity.config.ts
sanity.cli.ts
sanity/schemaTypes/index.ts
sanity/schemaTypes/documents/*.ts
sanity/schemaTypes/objects/*.ts
lib/sanity/env.ts
lib/sanity/client.ts
lib/sanity/image.ts
lib/sanity/queries.ts
app/studio/[[...index]]/page.tsx
app/studio/[[...index]]/layout.tsx
```

### 4.1 `lib/sanity/env.ts`

Use one source of truth for project ID/dataset/api version and throw clear errors if missing.

### 4.2 `lib/sanity/client.ts`

Create:
- `sanityClient` (published content, CDN on)
- `sanityPreviewClient` (draft mode/token use, CDN off)

### 4.3 `lib/sanity/image.ts`

Create a `urlFor()` helper with `@sanity/image-url`.

### 4.4 `sanity.config.ts`

Configure:
- `projectId`, `dataset`
- `basePath: "/studio"`
- plugins: `structureTool()`, `presentationTool()`, `visionTool()`
- `schema: { types: schemaTypes }`

### 4.5 Studio route in App Router

Create `app/studio/[[...index]]/page.tsx` using `NextStudio` from `next-sanity/studio`.

Add noindex metadata in `app/studio/[[...index]]/layout.tsx`.

Verify both:
- local: `http://localhost:3002/studio`
- live: `https://suppliedpackaging.com/studio`

---

## Phase 5 - Content Model (Schemas)

Create schema docs in this order:

1. `siteSettings` (singleton)
2. `productCategory`
3. `product`
4. `blogCategory`
5. `blogPost`
6. `teamMember`
7. `clientStory`
8. singleton pages:
   - `homePage`
   - `aboutPage`
   - `contactPage`
   - `knowledgeHubPage` (if needed)

### Product schema fields (map from `types/product.ts`)

Include:
- identity: `name`, `slug`, `category` (reference)
- summary: `shortDescription`, `description`
- arrays: `facts[]`, `features[]`, `heroStats[]`, `faqs[]`, `detailedSpecs[]`
- media: `image`, `catalogueImage`, `showcaseImage`, `lifestyleImage`, optional `modelUrl`
- SEO object: `title`, `description`
- optional status flags: `isNew`

### Home page schema strategy

For active CMS usage, avoid hardcoding section copy in component files.

Use one `homePage` singleton with section objects:
- hero
- logo strip
- problem/solution
- services
- case studies teaser
- products teaser
- sustainability
- process
- CTA

Each object should include text/image content and references where relevant.

---

## Phase 5A - Build Studio Navigation (So You Always Know Where To Edit)

Set up the Sanity desk/sidebar in this exact top-level order:

1. `Pages`
2. `Products`
3. `Client Stories`
4. `Blog & Knowledge Hub`
5. `Team`
6. `Site Settings`

Use these item types inside each group:

- `Pages`
  - `Home Page` (singleton)
  - `About Page` (singleton)
  - `Partnerships Page` (singleton)
  - `Contact Page` (singleton)
  - `Knowledge Hub Page` (singleton)
- `Products`
  - `Product Categories` (list docs)
  - `Products` (list docs)
- `Client Stories`
  - `Client Stories Hub` (singleton)
  - `Stories` (list docs)
- `Blog & Knowledge Hub`
  - `Blog Categories` (list docs)
  - `Blog Posts` (list docs)
- `Team`
  - `Team Members` (list docs)
- `Site Settings`
  - `Site Settings` (singleton)

Implementation note:
- build this with a custom Structure Builder in `sanity.config.ts` so collaborators see consistent navigation every time.

---

## Phase 5B - Exact Click Paths For Each Live Section

Use this as your "where do I go in Sanity?" map for `https://suppliedpackaging.com/`.

### Home (`/`)

Go to: `Pages -> Home Page`

Edit these sections there:
- `hero` -> top headline/subheadline + primary CTA buttons
- `trustedBrands` -> logos/names strip under hero
- `problemBottleneck` -> "Packaging becomes a bottleneck..." section
- `solution` -> "One partnership..." section + process summary
- `servicesTeaser` -> "What we do / End-to-end packaging" section
- `clientStoriesTeaser` -> "Real brands, real impact" section content
- `productsTeaser` -> "Everything your brand needs, sourced" section
- `sustainability` -> PPWR/FSC/compliance section
- `process` -> "From concept to your customer's door"
- `finalCta` -> bottom CTA block

### Products Index (`/products`)

Go to:
- `Products -> Product Categories` for filter labels/tabs
- `Products -> Products` for product cards and ordering

Product card-relevant fields:
- `name`
- `shortDescription`
- `catalogueImage` (or mapped card image)
- `category`
- any `isNew`/featured flags

### Product Detail (`/products/[slug]`)

Go to: `Products -> Products -> [Open Product]`

Edit detail page fields:
- `name`, `description`
- `heroStats`
- `facts`, `features`
- `detailedSpecs`
- `faqs`
- `image`, `showcaseImage`, `lifestyleImage`
- `seo.title`, `seo.description`
- optional `modelUrl`

### Client Stories Hub (`/client-stories`)

Go to: `Client Stories -> Client Stories Hub`

Edit:
- hub headline/subheadline
- featured stories order
- teaser copy and CTA text

### Client Story Detail (`/client-stories/*`)

Go to: `Client Stories -> Stories -> [Open Story]`

Edit:
- hero (title/subtitle/industry/client logo)
- challenge section
- solution section
- outcomes/metrics
- testimonial quote/attribution
- gallery/media
- bottom CTA

### About (`/about-us`)

Go to:
- `Pages -> About Page` for page-level copy blocks
- `Team -> Team Members` for profile cards

Use `About Page` for:
- hero copy
- stats strip
- values/capabilities/offices
- about-specific CTA

### Partnerships (`/partnerships`)

Go to: `Pages -> Partnerships Page`

Edit:
- hero copy
- partner types/logos
- process or benefits blocks
- CTA copy

### Knowledge Hub (`/knowledge-hub`)

Go to:
- `Pages -> Knowledge Hub Page` for page hero/layout copy
- `Blog & Knowledge Hub -> Blog Categories` for category labels
- `Blog & Knowledge Hub -> Blog Posts` for cards/articles

### Blog (`/blog`)

Go to: `Blog & Knowledge Hub -> Blog Posts`

Edit:
- title, slug, excerpt
- category
- main image
- publish date
- featured flag
- article body (if implemented as rich text)

### Contact (`/contact-us`)

Go to: `Pages -> Contact Page`

Edit:
- hero/title/subtitle
- contact details text
- form intro/help copy
- CTA/footer contact block

---

## Phase 5C - Collaboration Walkthrough (Section-by-Section)

Use this for every change request from a collaborator:

1. Identify live section on `https://suppliedpackaging.com/`.
2. Use Phase 5B to open the exact Sanity location.
3. Edit in draft and add a short internal note (what changed).
4. Share Vercel preview URL for review.
5. Reviewer approves or requests revision.
6. Publish in Sanity.
7. Confirm update on live URL after revalidation.

If unclear where a section belongs:
- default to `Pages -> Home Page` for homepage modules
- default to `Pages -> [Page Singleton]` for route-level static copy
- default to list docs (`Products`, `Stories`, `Blog Posts`, `Team Members`) for repeatable cards/details

---

## Phase 6 - Data Layer Adapters (`lib/content/*`)

Keep UI components decoupled from Sanity by using adapters in `lib/content`.

Create/update:
- `lib/content/products.ts`
- `lib/content/blog.ts`
- `lib/content/team.ts`
- `lib/content/home.ts`
- `lib/content/clientStories.ts`
- `lib/content/pages.ts` (optional grouping for singleton pages)

Adapter responsibilities:
- fetch GROQ data
- map CMS shape to existing TypeScript UI types
- provide safe defaults/fallbacks
- apply cache tags (`next: { tags: [...] }`) for revalidation

---

## Phase 7 - Route + Component Wiring (Module by Module)

### 7.1 Products (first migration)

1. Create `lib/content/products.ts` with:
   - `getProducts()`
   - `getProductBySlug()`
   - `getProductCategories()`
2. Replace imports of `@/lib/products` in:
   - `app/products/page.tsx`
   - `app/products/[slug]/page.tsx`
   - `components/sections/ProductDetail.tsx`
   - `components/sections/ProductsIndex.tsx`
   - `components/ui/ProductTabs.tsx`
3. Keep `lib/products.ts` only as temporary fallback during migration.
4. Remove `lib/products.ts` after parity is confirmed.

### 7.2 Blog

1. Update `lib/content/blog.ts` to query Sanity.
2. Keep return shape compatible with `types/blog.ts` and `components/sections/BlogIndex.tsx`.
3. Add optional rich body support for future blog detail pages.

### 7.3 Team + About page

1. Update `lib/content/team.ts` to query Sanity.
2. Move inline arrays in `components/sections/AboutUs.tsx` (stats, values, capabilities, offices) into `aboutPage` singleton content and fetch via adapter.

### 7.4 Homepage modules

1. Build `homePage` singleton schema.
2. Add `lib/content/home.ts` query + mapper.
3. Pass section content from `app/page.tsx` to section components as props (or let each section fetch through adapter if preferred).

### 7.5 Client stories

1. Keep `clientStory` + `clientStoriesHub` as the source of truth in Sanity.
2. Add `lib/content/clientStories.ts` adapter with safe fallbacks.
3. Wire `app/client-stories/page.tsx` + `components/client-stories/ClientStoriesHub.tsx` to adapter data.
4. Use dynamic route `app/client-stories/[slug]/page.tsx` for CMS-managed story detail pages.
5. Keep existing bespoke static story routes in place until each one is migrated block-by-block into CMS fields and approved.

---

## Phase 8 - Images and Media

1. Upload product/blog/team/story images to Sanity asset library.
2. Replace local string image paths with Sanity image objects in schemas.
3. Use `urlFor(image).width(...).height(...).auto("format")`.
4. Update `next.config.ts` to allow Sanity CDN:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
}
```

5. Keep important static brand assets in `public/` only when they should not be editor-managed.

---

## Phase 9 - Revalidation (Publish -> Live Site)

`app/api/wh/content/route.ts` is implemented in this repo and already handles:
- signature verification (`next-sanity/webhook`)
- tag/path revalidation by document type
- JSON response for debugging

In Sanity Manage, add webhook:
- path: `Manage -> API -> Webhooks -> Create webhook`
- trigger on create/update/delete/publish/unpublish
- endpoint: `https://www.suppliedpackaging.com/api/wh/content`
- include secret = same value as `SANITY_REVALIDATE_SECRET`

If you later move to a custom domain, update webhook endpoint to that domain.

Recommended tags:
- `products`
- `blog`
- `team`
- `home`
- `client-stories`
- `pages`

---

## Phase 10 - Draft/Preview + Visual Editing (Primary Workflow)

Add draft mode support so editors can preview unpublished changes and edit visually:
- enable draft mode route handlers
- use preview client with token
- read drafts only in preview mode
- enable Presentation tool in Studio
- allow editors to click blocks in the preview pane to edit source fields
- use Vercel preview deployment URLs for quick sign-off before publish

For this project, this phase is a priority because it is the primary day-to-day editing experience.

---

## Phase 11 - Content Migration Plan

Use this order:

1. Products (highest business impact)
2. Blog
3. Team/About
4. Homepage modules
5. Client stories
6. Remaining static pages

For each module:
- create schema
- import existing hardcoded content
- wire adapter
- verify rendering parity
- remove hardcoded source

Bulk prefill command (recommended before manual editing):

1. Ensure `.env.local` has a valid `SANITY_API_WRITE_TOKEN`.
2. Run:
   - `npm run seed:sanity -- --dry-run` (check payload without writing)
   - `npm run seed:sanity` (safe mode: only fills missing fields)
   - `npm run seed:sanity -- --overwrite` (force reset to current in-code content)
3. In Studio, verify these docs are populated:
   - Home Page
   - About Page
   - Product Categories + Products
   - Blog Categories + Blog Posts
   - Team Members
   - Client Stories Hub + Client Story docs

This avoids manual copy/paste and gives a complete editable baseline aligned to the existing site.

---

## Phase 12 - QA Checklist (Before Go-Live)

- [ ] `npm run build` passes
- [ ] Studio accessible at `/studio`
- [ ] Studio accessible at `https://suppliedpackaging.com/studio`
- [ ] editors can create/edit/publish docs
- [ ] product list and product detail render from Sanity
- [ ] blog list renders from Sanity
- [ ] team/about content renders from Sanity
- [ ] homepage modules render from Sanity
- [ ] client stories render from Sanity
- [ ] webhook revalidation updates pages after publish
- [ ] image rendering works from `cdn.sanity.io`
- [ ] visual editing works from Studio Presentation mode
- [ ] lightweight reviewer sign-off works using Vercel preview URLs
- [ ] published updates visible on `https://suppliedpackaging.com/`
- [ ] no server secrets imported into client components

---

## Phase 13 - Suggested Execution Schedule

Practical rollout:
- Day 0: collaboration setup (roles, ownership, workflow)
- Day 1: infrastructure + studio + schemas + products adapter
- Day 2: products migration + image migration + revalidation
- Day 3: blog + team + about page
- Day 4: homepage modules
- Day 5: client stories + final QA + launch

---

## Phase 14 - Lightweight Publishing Workflow (Small Team)

Use this simple rhythm for ongoing CMS work:

1. Admin or Editor updates content in Sanity Studio (prefer Presentation/Visual mode).
2. Quick check on localhost or Vercel preview URL.
3. Admin publishes.
4. Confirm on `https://suppliedpackaging.com/`.
5. Log the change in a short tracker note (date, page/module, owner).

For urgent rollback:
- restore previous revision in Sanity (or unpublish problematic content)
- trigger revalidation
- verify rollback on live URL

---

## Notes For This Codebase

- Keep route files small (`app/**/page.tsx`) and push data logic into `lib/content/*`.
- Keep CMS coupling out of UI components; components should receive typed props.
- Prefer replacing existing files/components over creating parallel "v2" versions.
- Keep `app/page.tsx` as section composition only.

---

## Definition of Done

This migration is complete when non-developers can update copy/images for all key modules in Sanity, publish, and see changes on the site without code changes.
