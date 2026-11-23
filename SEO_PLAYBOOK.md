# Supplied SEO Fix Playbook (Cursor)

Drop this file in the repo root as `SEO_PLAYBOOK.md`. Work through it one phase at a time, in Cursor Agent mode.

## How to run it

1. **One phase per branch and per chat.** For example `git checkout -b seo/phase-1-audit`, then start a fresh Agent chat.
2. **Start every chat with:** `@SEO_PLAYBOOK.md We're doing Phase X.` and paste that phase's prompt.
3. **Audit first, then build.** Every prompt asks Cursor to inspect the code and propose a plan before changing anything. Read the plan, push back where needed, then reply "go".
4. **Before merging any phase:** run `npm run build`, open the Vercel preview, and work through that phase's checks.
5. **Merge, deploy, move on.** Don't stack phases. If something breaks, you need to know which phase did it.

---

## Phase 0: Set up the project rule (do once)

Create `.cursor/rules/seo.mdc` with the content below. Cursor will then apply it to every chat automatically.

```markdown
---
description: SEO context and guardrails for suppliedpackaging.com
alwaysApply: true
---

# Project
- Site: https://www.suppliedpackaging.com (canonical host is www, https)
- Business: Supplied, a UK end-to-end packaging partner for fast-growing DTC brands
  (health & wellness first, affordable luxury second). Core products: mailer boxes
  and paper mailers. Strong niches: printed cans, rigid boxes, advent calendars.
- Stack: Next.js on Vercel, Sanity CMS for content, Supabase for enquiries.

# SEO rules
- Every indexable page must have: unique <title>, unique meta description,
  self-referencing absolute canonical on the www host, exactly one H1, and its
  main content present in server-rendered HTML (never client-only fetches).
- Content from Sanity must render server-side (SSG/ISR/RSC), not in useEffect.
- Never output fake or placeholder structured data: no invented reviews,
  ratings, prices or awards. Omit a field rather than fabricate it.
- Non-production hosts (*.vercel.app, preview deployments, old domains) must
  never be indexable.
- Use British English in all user-facing copy and metadata.

# Working rules
- Inspect the codebase and propose a plan before editing. Wait for approval.
- Do not change visual design, layout or styling unless the task says so.
- Keep changes scoped to the current phase. List every file you changed at the end.
```

---

## Phase 1: Read-only SEO audit

**Goal:** find what's actually wrong in the code before fixing anything.

```text
@SEO_PLAYBOOK.md We're doing Phase 1. This is READ-ONLY. Do not edit any files.

Audit this Next.js + Sanity codebase for technical SEO and produce a report at
docs/seo-audit.md. For each item, say: current state, file paths, problem (if any),
severity (high/medium/low), and the proposed fix.

Check:
1. Router type (App Router or Pages Router) and how metadata is set per page.
2. metadataBase / canonical tags: are canonicals absolute, on the www host, and
   self-referencing on every page? Flag any page whose canonical points elsewhere
   (e.g. every page canonicalising to the homepage).
3. robots.txt and sitemap: do they exist, are they dynamic from Sanity, do they
   use absolute www URLs, do they include every product, blog and client story page?
4. Rendering: for product pages, blog posts and client stories, is the Sanity
   content in the server-rendered HTML, or fetched client-side? Name the
   component and data-fetching method for each route.
5. Hosts: is there any handling (middleware, headers, next.config redirects)
   that stops *.vercel.app or preview hosts being indexed? Is there any
   reference to supplied.agency?
6. Structured data: list every JSON-LD block (Product, BreadcrumbList,
   Organization, etc.), where it's generated, and any fields that are missing
   or hardcoded.
7. Headings: any page with zero or multiple H1s.
8. Titles and descriptions: are they unique per page and pulled from Sanity?
   List any duplicates or defaults.
9. Heavy assets: find large files loaded on page load (anything over 500KB,
   especially .hdr, .glb, 3D or video files) and which routes load them.
10. Internal linking: do product pages link to related products, case studies
    and the contact page? Is there a products index linking to every product?
11. Contact form: trace the full submission path (component -> API route ->
    Supabase table and/or email). List the table name and columns.

End with a prioritised fix list grouped into: Phase 2 (technical), Phase 3
(form attribution), Phase 4+ (content model).
```

**Check:** read `docs/seo-audit.md` yourself. Anything marked high severity goes into Phase 2.

---

## Phase 2: Technical fixes

```text
@SEO_PLAYBOOK.md @docs/seo-audit.md We're doing Phase 2: technical SEO fixes.
Propose a plan first, then wait for my go.

Fix the high and medium items from the audit, including at minimum:

1. Canonicals and metadata
   - Set metadataBase to https://www.suppliedpackaging.com.
   - Every page gets a self-referencing absolute canonical.
   - Titles and meta descriptions come from Sanity SEO fields where they exist,
     with a sensible per-page fallback (never one site-wide default).
   - Exactly one H1 per page.

2. Robots and sitemap
   - Dynamic sitemap built from Sanity (products, blog posts, client stories,
     static pages), absolute www URLs, lastModified from _updatedAt.
   - robots.txt that allows everything on production and points to the sitemap.

3. Non-production hosts
   - In middleware (or next.config headers), if the request host is not
     www.suppliedpackaging.com, add `X-Robots-Tag: noindex, nofollow`.
   - Also 308 redirect the bare domain suppliedpackaging.com to www if
     that's not already handled at the Vercel level.

4. Structured data
   - Add Organization + WebSite JSON-LD in the root layout: name "Supplied",
     legal name "Supplied Agency Ltd", url, logo, and sameAs with the LinkedIn
     company page URL (leave a clearly marked TODO constant for me to fill in
     if you can't find it in the codebase).
   - Review the Product JSON-LD on product pages: make it valid and complete
     using only real data from Sanity. Do not add reviews, ratings or prices
     that don't exist in the CMS.

5. Rendering
   - Any product, blog or client story content currently fetched client-side
     must move to server rendering (RSC/SSG/ISR) without changing the design.

6. Heavy assets
   - Only load the heavy 3D/HDR assets on the route that actually needs them,
     lazy-load them after first paint, and don't block LCP.

Do not touch visual design. At the end, list every file changed and tell me
exactly what to check on the Vercel preview.
```

**Checks on the preview:**
- View source on `/products/mailer-boxes`: you should see one canonical tag pointing at `https://www.suppliedpackaging.com/products/mailer-boxes`, one H1, a unique title, and the product copy in the raw HTML.
- Run `curl -I https://supplied-site.vercel.app`. The response should include `x-robots-tag: noindex, nofollow`.
- Visit `/sitemap.xml` and `/robots.txt`. Every URL should start with `https://www.`
- Paste a product URL into Google's Rich Results Test. Product and Breadcrumb should be valid with no errors.

**Manual steps outside Cursor:**
- **Vercel → Domains:** set `supplied.agency` (and `www.supplied.agency`) to a 308 redirect to `www.suppliedpackaging.com`. If the old site had different paths, ask Cursor for a redirect map in `next.config` as well.
- **Search Console:** submit the new sitemap, then request indexing on the 5–6 most important product pages.
- **Bing Webmaster Tools:** import the site from Search Console (one click). Bing feeds ChatGPT search and Copilot, so it matters for AI visibility.

---

## Phase 3: Enquiry attribution

**Goal:** never again have to guess where enquiries come from.

```text
@SEO_PLAYBOOK.md @docs/seo-audit.md We're doing Phase 3: enquiry attribution.
Propose a plan first, then wait for my go.

1. Add a required "How did you hear about us?" select to the contact form with
   options: Google search, ChatGPT or another AI assistant, LinkedIn,
   Recommendation from someone, Event, Email from Supplied, Other.
   If "Other" or "Recommendation" is picked, show an optional free-text field
   ("Tell us more").

2. Silent attribution capture: on the first page view of a session, store in
   sessionStorage: document.referrer, landing page path, and any utm_* params.
   Submit these as hidden fields with the form.

3. Persist everything: trace the existing submission path from the audit and
   add the new fields end to end (Supabase migration for new nullable columns:
   heard_about, heard_about_detail, referrer, landing_page, utm_source,
   utm_medium, utm_campaign), plus include them in any notification email.

4. Make sure the new fields show in the Enquiries module of the pipeline app
   if it reads from the same table (tell me if that lives in a separate repo
   and what needs changing there).

Match the existing form styling exactly. List files changed and the SQL
migration separately so I can run it.
```

**Check:** submit a test enquiry from your phone with `?utm_source=test` on the URL, then confirm every field has landed in Supabase and in the notification email.

---

## Phase 4: Sanity content model for SEO pages

**Goal:** give product pages and new landing pages the fields they need to rank. This phase is structure only; you'll write the copy afterwards.

```text
@SEO_PLAYBOOK.md We're doing Phase 4: Sanity content model. Propose a plan
first, then wait for my go.

1. Extend the product schema with optional fields:
   - seoTitle, seoDescription
   - intro (short, plain-language summary of what we supply)
   - formats (array: name, description, best for) e.g. crashlock, tuck-front, roll-end
   - printOptions (array: method, when it makes sense)
   - moq (text), leadTime (text), priceGuide (array: volume, indicative price)
   - faqs (array: question, answer)
   - caseStudies (references to client story documents)
   - relatedProducts (references)

2. Create a new document type `landingPage` for format, sector and tender pages
   with: slug, seoTitle, seoDescription, h1, intro, sections (portable text),
   faqs, caseStudies, relatedProducts, primaryCta (label + link).

3. Render these on the frontend using existing components and styling:
   - Formats, print options, MOQ/lead time and price guide as tidy sections.
   - FAQs as an accordion, with FAQPage JSON-LD built from the same data.
   - Case studies and related products as cards linking to their pages.
   - All sections only render if the field has content.

4. Route landingPage documents at /[slug] (or a sensible path; propose it),
   include them in the sitemap, and give them canonicals and metadata like
   every other page.

Don't change the design system. List schema files and frontend files changed.
```

**Check:** add test content in Sanity Studio and confirm it renders server-side (view source), the FAQ JSON-LD validates, and the page appears in the sitemap.

---

## Phase 5: Build the priority pages

Do these one per chat. The copy goes into Sanity; Cursor only builds things the content model can't handle.

### 5a. Mailer boxes hub

```text
@SEO_PLAYBOOK.md We're doing Phase 5a: the mailer boxes hub at
/products/mailer-boxes. Propose a plan first.

Using the Phase 4 fields, make sure this page has, in this order:
H1 -> intro -> formats -> print options -> MOQ, lead time and price guide ->
case study -> FAQs -> CTA ("Send us your current spec and we'll benchmark it
for free", linking to the contact form).

Add internal links:
- from the hub to every format/sector landing page that references mailer boxes
- from those landing pages back to the hub
- from the homepage and /products to the hub with descriptive anchor text
  ("custom mailer boxes", not "learn more")

Suggested metadata (I'll set it in Sanity):
Title: Custom Mailer Boxes UK | Crashlock & Tuck-Front Manufacturing | Supplied
Description: Mailer boxes made to spec for growing DTC brands. Crashlock and
tuck-front formats, flexo, litho or digital print, UK and EU supply. Free
benchmark of your current setup.
```

### 5b. Tender page

```text
@SEO_PLAYBOOK.md We're doing Phase 5b: a packaging tender page as a
landingPage document at /packaging-tender. Propose a plan first.

Build anything the landingPage type can't already handle:
1. A gated download: "Packaging RFQ checklist" (PDF I'll upload to Sanity).
   Small form (name, work email, company) that saves to Supabase using the same
   attribution fields as Phase 3, then reveals the download link.
2. A "What we need from you" checklist section (specs, volumes, artwork,
   delivery locations, current pricing if they're happy to share).
3. A "How we respond" timeline section (e.g. acknowledgement, questions,
   pricing and samples, final submission).
4. Link this page from the footer, the contact page and the Packaging Cost
   Audit page.

Suggested metadata:
Title: Packaging Tender or Supplier Review? Put Us In | Supplied
Description: Running a packaging tender or reviewing suppliers? We'll respond
to your RFQ with a full benchmark of unit cost, freight, lead times and stock
options. Download our free packaging RFQ checklist.
```

### 5c. Format and sector pages

Create these as `landingPage` documents in Sanity, in this order. They won't need Cursor unless something breaks:
1. `/crashlock-mailer-boxes`
2. `/supplement-packaging` (health and wellness: mailer boxes, pouches, cartons, test kits)
3. `/subscription-box-packaging`
4. `/jewellery-packaging` (affordable luxury)

Each one needs its own case study, specs and FAQs. If you just swap the keyword on near-identical pages, Google won't index them.

---

## Phase 6: Bing IndexNow on publish (optional, quick win)

```text
@SEO_PLAYBOOK.md We're doing Phase 6: IndexNow. Propose a plan first.

When a document is published in Sanity, we already (or will) hit a webhook for
on-demand revalidation. Extend that handler so that, after revalidating, it
pings IndexNow (https://api.indexnow.org/indexnow) with the changed page's
absolute www URL. Generate an IndexNow key, serve the key file from /public as
required, and store the key in an env var. Fail silently and log errors; never
block revalidation.
```

---

## Ongoing (not Cursor)

- **Monthly AI visibility check.** Ask ChatGPT, Perplexity, Gemini, Copilot and Google AI Mode the same 5 prompts and log whether Supplied appears:
  - custom printed cans supplier UK
  - rigid box manufacturer UK
  - custom advent calendar manufacturer UK
  - crashlock mailer box supplier UK
  - packaging partner for DTC brands UK
- **Links.** Every partner (eCC, ShipBob, BLC, Get Better, IF Global) and willing client links to the site. Track these as a standing action in the weekly BD meeting.
- **Search Console.** Each month, compare clicks by query and by page against the previous month.
- **Enquiry sources.** Once Phase 3 is live, review the "How did you hear about us?" answers monthly. That's your real channel mix.
