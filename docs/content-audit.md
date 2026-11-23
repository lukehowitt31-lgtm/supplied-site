# Content audit

Generated 2026-11-23T17:04:08.985Z. Read-only. Nothing was written to Sanity.

Project `xxkq8l0t`, dataset `production`, perspective `raw`, stega encoding off. Drafts, published documents and version documents are separate rows.

Documents scanned: **41**.

- aboutPage: 1
- blogPost: 14
- clientStoriesHub: 1
- clientStory: 6
- contactPage: 1
- costAuditPage: 1
- homePage: 1
- knowledgeHubPage: 1
- merchPage: 2
- packagingReviewPage: 1
- partnershipsPage: 1
- product: 10
- productsIndexPage: 1

## Summary

- Zero-width or stega fields: **0**
- Products with disagreeing MOQ numbers: **0** of 10
- Duplicated feature-body groups: **0**
- SEO titles or descriptions containing a year before 2027: **1**
- Agreed-MOQ drift on mailer boxes, shipping boxes, printed tubes and printed cans: **2**

## Stega and visual editing

### Production fetches

`lib/sanity/client.ts` builds both `sanityClient` and `sanityPreviewClient` with `stega: { studioUrl: "/backstage" }`. In `@sanity/client` the default is `stega.enabled: false`. Passing that object merges `studioUrl` onto the default and leaves encoding off. `studioUrl` is only used once a fetch sets `stega: true`; the client requires it in that case, which is why it is set on the client.

`lib/sanity/fetch.ts` is the fetch the site uses. It checks `draftMode()`:

- Draft mode on: `perspective: "drafts"`, `stega: true`, no cache.
- Draft mode off: `perspective: "published"`, `stega: false`, with tag revalidation.

A normal production render does not enable draft mode, so the fetch passes `stega: false`. Stega characters are not inserted into the HTML on those requests.

Presentation (`sanity/presentation.ts`) enables draft mode through `/api/draft-mode/enable`. That preview session is the one that fetches with stega on. `components/ui/AccentHeading.tsx` leaves those characters untouched in draft mode so the click-to-edit overlay can map the rendered text back to a field.

### How the characters get into stored content

Stega is a response transform. Content Lake does not store the characters on its own. They land in a document when an already-encoded string is saved.

The likely routes:

1. Copying text from the Presentation preview, where stega is on, and pasting it into a Studio field. The invisible characters travel on the clipboard.
2. A script or mutation that fetched with stega enabled and wrote the encoded strings back.
3. A visual-editing control writing the encoded preview string into the field without running `stegaClean` before save.

`lib/content/products.ts`, `lib/content/home.ts`, `lib/content/costAudit.ts` and `lib/content/packagingReview.ts` strip a wider zero-width range when they read. That hides stored characters on the page. It does not delete them from the dataset. This audit fetches with `stega: false` and perspective `raw`, so a hit below is stored content, including drafts.

`stegaClean` from `@sanity/client/stega` removes runs of four or more characters from the official alphabet (U+200B–U+200D, U+2060–U+2063, U+FEFF, and U+1D173–U+1D17A). The cleaner runs `stegaClean`, then strips the requested ranges at any length, including a single character and U+2064, and any leftover musical-symbol code points from that alphabet.

## 1. Zero-width and stega characters

A field is listed when it contains U+200B–U+200D, U+FEFF, U+2060–U+2064, a run of those, or a code point from the official stega alphabet (U+1D173–U+1D17A). The preview is the text after those characters are removed.

No stored fields contain those characters.

## 2. Product MOQ values

Each product document is shown with every MOQ-bearing value found in `seo.description`, `heroStats` (value or label mentions MOQ, minimum, or order quantity), `specs.moq`, `detailedSpecs` rows whose label or value mentions MOQ or minimum, `moqFrom` anywhere on the document, and FAQ answers that mention minimum or MOQ.

Numbers in prose are taken from the sentence next to that mention, so a lead time or a price is not treated as an MOQ. `1K` is read as 1,000. Dedicated MOQ fields contribute every number in the field. Digital and flexo figures are compared with their own kind. An unlabeled figure mismatches when it is not the same set as one of those labelled figures. A **mismatch** is two different number sets in the same group, including a single figure against a range. An empty source is not a mismatch. `moqFrom` is not on the product schema; it is reported when a document still has the field.

### product · Custom Advent Calendars (`advent-calendars`) · `product.advent-calendars` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats[_key=="NUzgRk9h7jKjntS8pzpgEA"] (Min Order) | 500+ — Min Order | 500 |
| specs.moq | 500+ units | 500 |
| detailedSpecs[_key=="NUzgRk9h7jKjntS8pzpgIE"] (MOQ) | From 500 units | 500 |
| moqFrom | — | — |
| FAQ answers | — | — |

### product · Custom Cartonboard Boxes (`cartonboard-boxes`) · `product.cartonboard-boxes` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | MOQ from 1,000. | 1000 |
| heroStats[_key=="4WosXPXvlMgq3tPqrVL55V"] (Min Order Qty) | 1K — Min Order Qty | 1000 |
| specs.moq | From 1,000 units | 1000 |
| detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL5Sz"] (MOQ) | From 1,000 units | 1000 |
| moqFrom | — | — |
| faqs[_key=="4WosXPXvlMgq3tPqrVL5EX"].answer — What is the minimum order quantity for custom cartonboard boxes? | Our standard MOQ starts from 1,000 units. | 1000 |

### product · Custom Mailer Boxes (`mailer-boxes`) · `product.mailer-boxes` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats | — | — |
| specs.moq | From 500 units digital, 1,000 litho, 3,000 flexo | 500, 1000, 3000 |
| detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL64v"] (MOQ) | 500 digital, 1,000 litho, 3,000 flexo | 500, 1000, 3000 |
| moqFrom | — | — |
| FAQ answers | — | — |

### product · Custom Printed Paper Tape (`packing-tape`) · `product.packing-tape` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats[_key=="dsdzDBKQU3TOwM9o6klr1o"] (From 72 rolls) | MOQ — From 72 rolls | 72 |
| specs.moq | 72 rolls | 72 |
| detailedSpecs[_key=="dsdzDBKQU3TOwM9o6klrW8"] (MOQ) | 72 rolls | 72 |
| moqFrom | — | — |
| faqs[_key=="dsdzDBKQU3TOwM9o6klrp5"].answer — How much does custom printed paper tape cost? | A single-colour print on 48mm kraft tape typically starts from around £3–5 per roll at minimum quantities, reducing with volume. | — |

### product · Custom Printed Paper Mailers (`paper-mailers`) · `product.paper-mailers` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats[_key=="4WosXPXvlMgq3tPqrVL4jp"] (Digital MOQ) | 1K — Digital MOQ | 1000 |
| heroStats[_key=="4WosXPXvlMgq3tPqrVL4ld"] (Flexo MOQ) | 10K — Flexo MOQ | 10000 |
| specs.moq | 1,000 units (Digital) | 1000 |
| detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL4TZ"] (MOQ (Digital)) | 1,000 units | 1000 |
| detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL4VN"] (MOQ (Flexo)) | 10,000 units | 10000 |
| moqFrom | — | — |
| FAQ answers | — | — |

### product · Digitally Printed Cans (`printed-cans`) · `product.printed-cans` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | Digitally printed aluminium cans for craft beer, RTD & beverages. Full CMYK direct-to-can print. Low MOQs, no labels, infinitely recyclable. | — |
| heroStats[_key=="NUzgRk9h7jKjntS8pzph83"] (MOQ) | 1,000 — MOQ | 1000 |
| specs.moq | 1,000 units | 1000 |
| detailedSpecs[_key=="NUzgRk9h7jKjntS8pzpgws"] (MOQ) | 1,000 units | 1000 |
| moqFrom | — | — |
| FAQ answers | — | — |

### product · Custom Printed Paper Tubes (`printed-tubes`) · `product.printed-tubes` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats[_key=="4WosXPXvlMgq3tPqrVL3ib"] (Min Order Qty) | 1K — Min Order Qty | 1000 |
| specs.moq | 1,000 units | 1000 |
| detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL3yr"] (MOQ) | From 1,000 units | 1000 |
| moqFrom | — | — |
| FAQ answers | — | — |

### product · Custom Printed Rigid Boxes (`rigid-boxes`) · `product.rigid-boxes` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats[_key=="NUzgRk9h7jKjntS8pzpg1y"] (Min Order Qty) | 500 — Min Order Qty | 500 |
| specs.moq | From 500 units | 500 |
| detailedSpecs[_key=="NUzgRk9h7jKjntS8pzpfxu"] (MOQ) | From 500 units | 500 |
| moqFrom | — | — |
| faqs[_key=="NUzgRk9h7jKjntS8pzpfmj"].answer — What is the minimum order quantity for custom rigid boxes? | Our minimum order quantity for custom rigid boxes starts at 500 units. | 500 |

### product · Printed Shipping Boxes (`shipping-boxes`) · `product.shipping-boxes` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats | — | — |
| specs.moq | 1,000 units (flexo) | 1000 |
| detailedSpecs[_key=="dsdzDBKQU3TOwM9o6klsjw"] (MOQ) | 1,000 units (flexo) | 1000 |
| moqFrom | — | — |
| FAQ answers | — | — |

### product · Custom Printed Tissue Paper (`tissue-paper`) · `product.tissue-paper` · published

**Match.**

| Source | Value | Numbers |
| --- | --- | --- |
| seo.description | — | — |
| heroStats | — | — |
| specs.moq | 5,000 sheets | 5000 |
| detailedSpecs[_key=="NUzgRk9h7jKjntS8pzpgjf"] (MOQ) | 5,000 sheets | 5000 |
| moqFrom | — | — |
| faqs[_key=="NUzgRk9h7jKjntS8pzpgWS"].answer — What's the minimum order for printed tissue paper? | Our minimum order starts at 5,000 sheets. This is a flexographic print minimum — the print plates need a reasonable run length to be cost-effective. | 5000 |

## 3. Duplicated feature body copy

Within one product document, feature bodies that match after stega characters are removed and whitespace is collapsed. Empty bodies are ignored. Draft and published copies of the same product are separate documents.

No duplicated feature bodies.

## 4. SEO titles and descriptions with a year before 2027

Checked every string at a path ending in `seo.title` or `seo.description`. A four-digit year from 1900–2026 is a hit. 2027 and later are not.

| Document | State | Field | Years | Text |
| --- | --- | --- | --- | --- |
| Supplied & IFGlobal bring packaging and fulfilment to Ideas Fest 2026 (`supplied-if-global-ideas-fest-2026`) | published | `seo.title` | 2026 | Supplied & IF Global at Ideas Fest 2026 |

## 5. Agreed MOQ drift

Checked mailer boxes, shipping boxes, printed tubes and printed cans against the agreed table in `scripts/content-audit.ts`. Digital / litho / flexo is null when that route is not offered. The lowest offered figure is the code `moqFrom`.

A non-empty Sanity field wins over the code fallback at render time. `moqFrom` is code-only and is not rendered. The contact MOQ notice has no Sanity value, so its code fallback is what the contact page shows. The knowledge-hub answer is the Sanity document when that page has FAQ categories.

A hit is a quantity that is not in the agreed set, a dedicated MOQ field that omits one of the offered routes, or a route the table marks as not offered. A price sentence that states a quantity is checked against the same table.

### Sanity `product.mailer-boxes`

- `faqs[4] How much do custom mailer boxes cost?` — 250 is not an agreed MOQ; 2,000 is not an agreed MOQ; 5,000 is not an agreed MOQ; omits 500, 1,000, 3,000. How much do custom mailer boxes cost? A small large letter size box with digital print on the inside and outside of the box typically starts from around £1.50–3.50 per unit at 250…

### Sanity `knowledgeHubPage`

- `faqCategories[_key=="rOv2v1AtN64guwYLFkM4Fz"].faqs[_key=="rOv2v1AtN64guwYLFkM4Is"].a sentence 1` — 250 is not an agreed MOQ; omits 500, 1,000, 3,000. A standard full-colour digitally printed mailer box starts from around £1.50–3.00 per unit at 250 quantity, dropping significantly at higher volumes.

## Scope

Types: `product`, `blogPost`, `clientStory`, `homePage`, `aboutPage`, `merchPage`, `partnershipsPage`, `contactPage`, `knowledgeHubPage`, `clientStoriesHub`, `costAuditPage`, `packagingReviewPage`, `productsIndexPage`.

Section 5 also reads `lib/content/legacyProducts.ts`, `lib/content/contact.ts` and `lib/content/knowledgeHub.ts`. Categories, team members, knowledge-hub Q&A documents, site settings and enquiries were not scanned.

