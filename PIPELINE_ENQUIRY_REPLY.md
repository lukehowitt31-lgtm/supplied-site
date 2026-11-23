# Generate a reply to a website enquiry

Hand this to the Cursor agent on the **pipeline app**.

When a website enquiry lands (webhook `enquiry.created`, or a record in the website-enquiries module), generate a **draft reply email** the team can review and send. Do not auto-send.

The website webhook **already includes the submission text**. Use `enquiry.project.message` as the brief. Do not ask the website team for extra payload fields unless something specific is missing after you inspect a real event.

---

## Goal

1. Read the enquiry payload.
2. Decide fit using `module` / `recommendedAction` / MOQs below.
3. Draft a reply in Supplied’s voice that responds to **what they actually wrote**.
4. Attach the draft to the enquiry/deal as `draftReply` (subject + body). A human sends it.

---

## Where the submission text lives

From `POST /webhooks/supplied-enquiries` (and `GET /api/pipeline/enquiries`):

| What they submitted | Field |
|---|---|
| Free-text project explanation | **`enquiry.project.message`** — this is the main brief |
| Form topic | `enquiry.project.subject` |
| Product dropdown | `enquiry.project.productType` |
| Quantity band dropdown | `enquiry.project.estimatedQuantity` |
| Classified product families | `enquiry.project.packagingTypes` |
| Parsed qty / band | `enquiry.project.volumeQty`, `volumeBand` |
| Fit flags | `belowMoq`, `plugAndPlayFit`, `complexity`, `specNotes` |
| Contact | `enquiry.contact.name`, `.email`, `.company`, `.phone`, `.jobTitle` |
| Cost-audit extras | `enquiry.costAudit.*` (focus area, revenue, SKUs, suppliers) |
| Routing | `enquiry.module`, `enquiry.recommendedAction` |

Contact form subjects: New packaging project, Pricing enquiry, Samples request, Existing order query, Partnership opportunity, General question.

Quantity bands: Under 100, 100–499, 500–999, 1,000–4,999, 5,000+, Not sure yet.

If `project.message` is empty, still draft from subject + product + quantity, and ask 2–3 clarifying questions. For cost-audit, `message` is often a stitched summary of the cost-audit fields — also use `costAudit`.

---

## Who Supplied is

End-to-end packaging partner for consumer brands (DTC, ecommerce, retail, hybrid). London, with a Polish entity in Warsaw.

- One partnership: design, sourcing, manufacturing, QA, compliance, logistics, one invoice, one account manager
- 30+ vetted factories across 12 countries
- Typical clients: beauty, wellness, food & drink, fashion. Names we can mention when relevant: TRIP, Healf, Glow For It, Wild, SURI, Polestar, Sneak Energy
- 98% on-time delivery, ~23% average cost saving when consolidating, 200+ projects
- PPWR-ready, FSC options, 100% recyclable range
- **Production-volume partner.** Not a fit for sample-run / one-off micro orders

Write in **first person as Supplied** (“We can…”, not “Supplied can…”). UK English. Senior packaging consultant talking to a brand founder: concise, direct, warm, not salesy. Do not invent exact prices, MOQs, or lead times beyond the ranges below — call them approximate and offer a proper quote when we are a fit.

---

## What we make

| Product | Notes | Typical MOQ |
|---|---|---|
| Mailer boxes | E/B flute; tuck-front, crash-lock, magnetic, RETT; inside+outside print | 1,000 larger formats / 3,000 smaller sizes |
| Rigid boxes | Magnetic, lift-off, drawer, hinged; foil, emboss, soft-touch, spot UV | 500 |
| Shipping boxes | 0201 / outer shippers | 1,000 |
| Paper mailers | Plastic-free poly-mailer alternative; peel-seal, tear strip | 1,000 |
| Cartonboard / folding cartons | Retail cartons, sleeves | 1,000 |
| Paper tubes | | ~1,000 |
| Pouches / bags | | ~1,000 |
| Labels | Die-cut / roll / sheet | ~1,000 |
| Tissue | Custom print | 5,000 sheets |
| Paper tape | Branded | 72 rolls |
| Inserts / fitments | Corrugated (preferred), foam, pulp | ~1,000 |
| Advent calendars | Bespoke; start 4–5 months before launch | 250 |
| Printed cans | Digital CMYK aluminium; flexible volume | No strict MOQ |
| Cards & leaflets | | typically 1,000 |

Also: structural design, 3D mockups, artwork/pre-press, samples, QA, freight to warehouse/3PL.

**Lead times (from artwork approval, approximate):** digital mailers 3–4 wks; litho mailers 4–6; rigid 4–6; paper mailers 3–5; shippers 3–4; cans 3–4; tissue 4–6. Sampling +1–2 weeks. Typical brief → delivery 6–10 weeks.

**Print:** digital (no plates, full colour) vs flexo (1–4 spot colours, plates ~£150–450, often 2,000+). Diecut tools roughly £600–800 when needed.

**Pricing (always “approximate”, never a quote):**
- Mailers: depends on size/volume; production from the MOQs above
- Rigid: roughly £3–5/unit at 500 with print + soft-touch, down at higher qty
- Free unprinted structure samples; printed pre-pro samples usually a small charge credited against the first order
- Cost audits: material right-size, board weight, supplier consolidation, print method, freight

**Sustainability / compliance:** recyclable first (not compostable unless they have a real use case); FSC; plastic-free mailers/tissue/tape/corrugated; paper-based lamination on rigid; PPWR from 2025 staggered to 2030; UK EPR if UK-only; PFAS-free options.

---

## How to decide the reply type

Use website classification first:

| `module` | Reply stance |
|---|---|
| `new-business` | We can help. Acknowledge their brief. Say what we’d do next. Ask only the gaps. |
| `cost-audit` | We can help. Acknowledge revenue / SKUs / suppliers / focus. Outline a packaging audit. Offer a call. |
| `plug-and-play` | Below typical MOQ but a simple standard product. Be honest about volume. Offer a lighter path if genuine, or a polite not-a-fit if tiny. Do not oversell. |
| `below-moq` | Politely not a fit at this volume. Point at MOQ. Do not push a quote or /contact-us. Leave the door open if they scale. |
| `partnership` | Not a packaging project reply. Thank them, say the partnerships team will review. |
| `other` | Clarify what they need. Ask questions. |
| `spam` / `supplier` | **No customer reply.** |

If `project.message` clearly contradicts `belowMoq` (e.g. they wrote “20,000 units”), trust the message and treat as in-volume. If quantity is “Not sure yet”, ask volume before committing we can take the work.

---

## Draft email rules

**Output (store on the record, do not send):**

```ts
{
  to: enquiry.contact.email,
  subject: string,
  body: string,          // plain text, ready to paste
  stance: "quote" | "audit" | "clarify" | "not_a_fit" | "partnership" | "no_reply",
  internalNotes: string  // for the AM: gaps, risks, suggested next step
}
```

**Subject:** `Re: {project.subject or "your packaging enquiry"} — Supplied`

**Body shape:**

1. Hi {first name},
2. One sentence that shows we read **their message** (quote or paraphrase a concrete detail — product, qty, finish, timeline).
3. Fit + substance (what we actually do for that request), using the baseline above. Max ~3 short paragraphs.
4. Next step: 1–3 specific questions **or** offer a call / samples / audit.
5. Sign-off: first name of the sender can be a placeholder like `[Name]`, then `Supplied` / suppliedpackaging.com

**Questions to ask only if missing** (don’t interrogate):

- Product dimensions / what goes in the pack
- Annual or first-order quantity (and whether recurring)
- Print: existing artwork vs need design; number of SKUs/designs
- Delivery country and date
- Retail vs ecommerce vs both
- Current supplier / pain (especially cost-audit)

**Do:**

- Match their product language (mailer vs rigid vs cans, etc.)
- Mention a relevant capability (inserts, PPWR, unboxing, subscription, etc.) only if their message calls for it
- For samples requests at proper volume: explain free unprinted vs charged printed pre-pro
- For existing-order queries: we don’t have order data in the payload — ask for order/company reference and say the AM will pick it up. Do not pretend we can see their order.

**Don’t:**

- Invent a unit price or a locked lead time
- Overpromise “we can definitely do X by Friday”
- Write a brochure. This is a reply to *their* project
- CC legal/compliance language dumps
- Generate a reply for spam/supplier

---

## Knowledge base

This document **is** the baseline (same facts as the website Knowledge Hub assistant).

Optional later: the public FAQ lives on https://www.suppliedpackaging.com/knowledge-hub and CMS Q&As are `kbItem` documents. The pipeline should **not** call the public `/api/chat` endpoint to write customer emails (that’s the on-site assistant, rate-limited, not a draft-mail API).

If you add retrieval, search a local copy of this baseline + any KB export you already store. Prefer the enquiry message over generic FAQ paste.

---

## Implementation checklist

- [ ] On `enquiry.created` (and a “Generate reply” action on the enquiry record), build a draft from the payload
- [ ] Ground the draft in `project.message` + product/qty fields
- [ ] Branch on `module` as in the table
- [ ] Save draft on the enquiry/deal; human sends
- [ ] `spam` / `supplier` → skip
- [ ] Show the AM the internal notes (MOQ flag, missing dims, etc.)

---

## Tiny examples (tone, not templates)

**In-volume mailer brief:** they asked for 5,000 printed mailers with inserts. Thank them, confirm that’s a core product, outline structure + print + insert, ask inner dimensions and delivery date, offer samples.

**Below MOQ:** they want 200 gift boxes. Thank them, say rigid usually starts at 500 and we’re set up for production runs, we wouldn’t be the right partner at 200, happy to revisit at volume.

**Cost audit:** they listed 12 SKUs and two suppliers. Acknowledge that, say we’d audit spec/supplier/freight, suggest a 30-min call, ask where the stock ships from.
