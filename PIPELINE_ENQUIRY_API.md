# Website enquiry API → Pipeline app

Hand this to the Cursor agent on the **pipeline app**. The suppliedpackaging.com website already captures contact-form and cost-audit submissions. This spec is how the pipeline app should ingest those payloads, route them into a dedicated module, and turn the right ones into deals/projects.

Do not change the website. Implement the consumer side only.

---

## Goal

1. Receive website enquiries as structured JSON.
2. Filter them into a **website-enquiry** module (or equivalent) using `enquiry.module`.
3. Create a **deal/project** from qualified enquiries (`recommendedAction === "create_deal"`).
4. Dedupe on `enquiry.id` so pull + webhook never create two records.

---

## Source

- **Production base URL:** `https://www.suppliedpackaging.com`
- **Origin field:** always `"supplied-website"`
- **Sources included:** `contact` (`/contact-us`) and `cost-audit` (`/packaging-cost-audit`)
- **Not included yet:** Knowledge Hub leads, partnership applications

Auth token is a shared secret. Ask Luke for `PIPELINE_API_TOKEN` / `PIPELINE_WEBHOOK_SECRET` — do not invent or commit secrets.

---

## Auth

All pull requests:

```
Authorization: Bearer <PIPELINE_API_TOKEN>
```

- No query-string tokens.
- `401` if missing/invalid.
- Rate limit: 60 requests / minute / IP → `429`.

---

## Option A — Pull API (polling / backfill)

Use this for an initial sync and as a fallback if webhooks are missed.

### List

```
GET /api/pipeline/enquiries
```

Query params (all optional):

| Param | Type | Notes |
|---|---|---|
| `since` | ISO 8601 | Only enquiries with `submittedAt >= since`. Use as a cursor. |
| `source` | `contact` \| `cost-audit` | |
| `kind` | `genuine` \| `spam` \| `supplier` \| `partnership` \| `other` | |
| `reviewStatus` | `new` \| `reviewed` \| `ignored` | |
| `module` | see modules below | Pre-filter on the website side |
| `limit` | 1–100 | Default `50` |

Example:

```bash
curl -H "Authorization: Bearer $PIPELINE_API_TOKEN" \
  "https://www.suppliedpackaging.com/api/pipeline/enquiries?module=new-business&limit=50"
```

For incremental sync, store the latest `submittedAt` you ingested and pass it as `since` on the next poll. Overlap by a few seconds and dedupe on `id`.

### Get one

```
GET /api/pipeline/enquiries/{id}
```

`id` looks like `enquiry.mt6zgodyhi4ohb`.

Responses:

- List `200`: `{ "enquiries": PipelineEnquiryPayload[], "meta": { count, limit, since, source, kind, reviewStatus, module } }`
- One `200`: `{ "enquiry": PipelineEnquiryPayload }`
- `401` unauthorized
- `404` unknown id
- `429` rate limited
- `500` server error

---

## Option B — Push webhook (preferred for live deals)

The website POSTs to the pipeline app on every new enquiry.

Ask Luke to set these on the **website** (Vercel):

| Website env | Value |
|---|---|
| `PIPELINE_WEBHOOK_URL` | `https://<pipeline-app>/webhooks/supplied-enquiries` (or whatever route you create) |
| `PIPELINE_WEBHOOK_SECRET` | shared HMAC secret |
| `PIPELINE_API_TOKEN` | bearer token for the pull API |

The pipeline app should expose a **POST** endpoint that:

1. Reads the **raw body** (do not re-serialize before verifying).
2. Verifies `X-Supplied-Signature`.
3. Returns `200` quickly (process async if needed — website times out at 8s).
4. Upserts by `enquiry.id`, then routes by `enquiry.module`.

### Webhook request

```
POST <PIPELINE_WEBHOOK_URL>
Content-Type: application/json
X-Supplied-Event: enquiry.created
X-Supplied-Id: enquiry.xxxxx
X-Supplied-Signature: sha256=<hex>
```

Body:

```json
{
  "event": "enquiry.created",
  "occurredAt": "2026-08-25T08:12:00.000Z",
  "enquiry": { "...PipelineEnquiryPayload..." }
}
```

### Signature verification

- Algorithm: HMAC-SHA256 of the **raw request body**
- Secret: `PIPELINE_WEBHOOK_SECRET` (website falls back to `PIPELINE_API_TOKEN` if secret unset — use a dedicated secret in production)
- Header format: `sha256=` + hex digest
- Compare with a timing-safe equal
- Reject if missing/invalid (`401`)

Node example:

```ts
import { createHmac, timingSafeEqual } from "crypto";

function verifySignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const actual = header.slice("sha256=".length);
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

---

## Payload

TypeScript (canonical):

```ts
type EnquirySource = "contact" | "cost-audit";
type EnquiryKind = "genuine" | "spam" | "supplier" | "partnership" | "other";
type EnquiryReviewStatus = "new" | "reviewed" | "ignored";
type VolumeBand = "micro" | "small" | "mid" | "production" | "unknown";
type Complexity = "simple" | "mid" | "premium" | "unspecified";

type PipelineModule =
  | "new-business"
  | "cost-audit"
  | "plug-and-play"
  | "below-moq"
  | "partnership"
  | "supplier"
  | "spam"
  | "other";

type PipelineRecommendedAction = "create_deal" | "review" | "ignore";

interface PipelineEnquiryPayload {
  id: string;                     // stable unique id, e.g. "enquiry.mt6zgodyhi4ohb"
  submittedAt: string;            // ISO 8601
  origin: "supplied-website";
  source: EnquirySource;
  sourceUrl: string;              // https://www.suppliedpackaging.com/contact-us or /packaging-cost-audit
  module: PipelineModule;
  recommendedAction: PipelineRecommendedAction;
  contact: {
    name: string;
    email: string;
    phone: string;                // may be ""
    company: string;              // may be ""
    jobTitle?: string;            // cost-audit only
  };
  project: {
    subject: string;
    message: string;
    productType: string;          // form dropdown, may be ""
    estimatedQuantity: string;    // form band, may be ""
    packagingTypes: string[];     // classified product families
    volumeQty: number | null;     // parsed/estimated qty
    volumeBand: VolumeBand;
    belowMoq: boolean | null;     // null = unknown
    complexity: Complexity;
    specNotes: string;
    plugAndPlayFit: boolean;
  };
  costAudit?: {
    focusArea?: string;
    companyRevenue?: string;
    packagingSkus?: string;
    packagingSuppliers?: string;
  };
  qualification: {
    kind: EnquiryKind;
    reviewStatus: EnquiryReviewStatus;
  };
  extra: Record<string, string>;  // leftover form fields
}
```

Example:

```json
{
  "id": "enquiry.mt6zgodyhi4ohb",
  "submittedAt": "2026-08-25T08:12:00.000Z",
  "origin": "supplied-website",
  "source": "contact",
  "sourceUrl": "https://www.suppliedpackaging.com/contact-us",
  "module": "new-business",
  "recommendedAction": "create_deal",
  "contact": {
    "name": "Jane Smith",
    "email": "jane@brand.com",
    "phone": "+44 20 0000 0000",
    "company": "Brand Co"
  },
  "project": {
    "subject": "New packaging project",
    "message": "We need 5,000 mailer boxes printed both sides.",
    "productType": "Mailer boxes",
    "estimatedQuantity": "5,000+",
    "packagingTypes": ["Mailer boxes"],
    "volumeQty": 5000,
    "volumeBand": "production",
    "belowMoq": false,
    "complexity": "simple",
    "specNotes": "",
    "plugAndPlayFit": false
  },
  "qualification": {
    "kind": "genuine",
    "reviewStatus": "new"
  },
  "extra": {}
}
```

Cost-audit example extras: `contact.jobTitle`, `costAudit.companyRevenue`, `costAudit.packagingSkus`, `costAudit.packagingSuppliers`, `costAudit.focusArea`. `source` will be `"cost-audit"` and `module` `"cost-audit"`.

---

## Routing into the pipeline module

`module` is already classified on the website. Use it as the primary filter.

| `module` | `recommendedAction` | What to do |
|---|---|---|
| `new-business` | `create_deal` | Create deal/project immediately |
| `cost-audit` | `create_deal` | Create deal/project, tag as cost audit |
| `plug-and-play` | `review` | Land in the special module, human review before a full deal |
| `below-moq` | `review` | Land in the special module, likely too small — do not auto-create a deal |
| `partnership` | `review` | Partnership queue, not a packaging deal |
| `other` | `review` | Park for review |
| `spam` | `ignore` | Store or drop. Do not create a deal |
| `supplier` | `ignore` | Store or drop. Do not create a deal |

Suggested pipeline behaviour:

- **Inbound inbox / “Website enquiries” module:** persist every payload except `spam` (optional: keep spam in a junk view).
- **Auto-create deal/project** only when `recommendedAction === "create_deal"`.
- Keep `plug-and-play` and `below-moq` visible in the special module so the team can promote them to a deal manually.

---

## Mapping onto a deal / project

When creating a deal/project from an enquiry:

| Deal / project field | From payload |
|---|---|
| External id / idempotency key | `enquiry.id` |
| Source | `enquiry.origin` + `enquiry.source` |
| Source URL | `enquiry.sourceUrl` |
| Company / account name | `enquiry.contact.company` (fallback: contact name) |
| Primary contact name | `enquiry.contact.name` |
| Email | `enquiry.contact.email` |
| Phone | `enquiry.contact.phone` |
| Job title | `enquiry.contact.jobTitle` |
| Title | `enquiry.project.subject` or `"{company} — {productType}"` |
| Description / brief | `enquiry.project.message` |
| Product | `enquiry.project.productType` or `packagingTypes[0]` |
| Quantity | `enquiry.project.estimatedQuantity` / `volumeQty` / `volumeBand` |
| Tags | `module`, `source`, `volumeBand`, `complexity` |
| Cost-audit extras | `enquiry.costAudit.*` |

Idempotency: if `enquiry.id` already exists as a deal or inbox item, **update or skip** — never insert a second one.

---

## Pipeline app env vars

```
SUPPLIED_SITE_URL=https://www.suppliedpackaging.com
SUPPLIED_PIPELINE_API_TOKEN=<same token as website PIPELINE_API_TOKEN>
SUPPLIED_WEBHOOK_SECRET=<same secret as website PIPELINE_WEBHOOK_SECRET>
```

---

## Implementation checklist

- [ ] Add a `supplied-enquiry` (or similar) inbox record keyed by `enquiry.id`
- [ ] POST webhook route with HMAC verification on the raw body
- [ ] Route by `enquiry.module` into the special website-enquiry module
- [ ] Auto-create deal/project when `recommendedAction === "create_deal"`
- [ ] Leave `plug-and-play` / `below-moq` in the module for manual promotion
- [ ] Ignore `spam` and `supplier` for deal creation
- [ ] Poll `GET /api/pipeline/enquiries?since=...` as backfill / missed-webhook recovery
- [ ] Do not log raw emails/phones to public logs more than necessary (PII)

---

## Out of scope

- Do not call Sanity directly. The website API is the only source.
- Do not use the site admin token in the browser.
- Do not treat Knowledge Hub or partnership form posts as this payload — they are not on this API yet.
