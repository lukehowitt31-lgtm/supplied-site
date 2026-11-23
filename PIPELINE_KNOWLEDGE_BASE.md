# Supplied knowledge base — what the website AI uses

Hand this to the pipeline-app Cursor agent. This is the same knowledge the Knowledge Hub assistant uses on suppliedpackaging.com.

Exported from Sanity `kbItem` documents. **365 Q&As**.

## How the website AI actually uses this

Two layers:

1. **Always-on rules + fallback facts** (in `app/api/chat/route.ts`). Voice, MOQs, product ranges, pricing caution. Used in full when retrieval finds nothing.
2. **Live Q&As below** (Sanity `kbItem`). On each visitor question the site embeds the query, finds the **top 5** similar Q&As (similarity ≥ 0.45), and injects those Q&A pairs as `VERIFIED KNOWLEDGE BASE CONTEXT`. It does **not** dump all 365 into the model every time.

The public FAQ page (`lib/content/knowledgeHub.ts`) is a smaller fallback set for the webpage, **not** what the chat model retrieves.

For pipeline reply-drafting: keep the always-on rules, then search/filter these Q&As against the enquiry `project.message` + product/qty (or embed and take top 5, same as the site). Prefer the enquiry text over a generic FAQ paste.

Do not call `https://www.suppliedpackaging.com/api/chat` to write customer emails.

---

## Always-on rules (copy into the reply model)

```
You are writing as Supplied, the packaging partner. First person (“We offer…”). Concise, direct, senior consultant to a brand founder. UK English.

Never invent exact pricing, MOQs, or lead times. Describe ranges as approximate and offer a proper quote when we are a fit.

If volumes are clearly below our minimums, be honest we are unlikely the right partner. Do not push them to enquire anyway. If at/above MOQ or unclear, we can help.
```

## Fallback facts (used when no Q&A matches)

- End-to-end packaging partner for consumer brands (DTC, ecommerce, retail, hybrid)
- 30+ vetted global suppliers across 12 countries
- Products: mailer boxes, rigid boxes, shipping boxes, paper mailers, printed cans, tissue paper, paper tape, labels, cards, bags, pouches, inserts, advent calendars
- Industries: beauty & cosmetics, health & wellness, food & drink, fashion & apparel
- Key clients: TRIP, Healf, Glow For It, Wild, SURI, Polestar, Sneak Energy
- 98% on-time delivery, 23% average cost saving, 200+ projects
- PPWR compliant, FSC certified, 100% recyclable range
- London, with Polish entity in Warsaw
- Production-volume partner, not sample-run / one-off micro orders
- MOQs: mailer boxes start from 500 units digital, 1,000 litho, or 3,000 flexo. Shipping boxes start from 1,000 units (flexo only). Printed tubes start from 1,000 units (litho/offset). Printed cans start from 1,000 units (digital only). Rigid boxes from 500. Advent calendars from 250. Paper mailers and cartonboard boxes from 1,000. Inserts, labels, and pouches typically from 1,000. Tissue paper from 5,000 sheets. Paper tape from 72 rolls.
- Services: structural design, artwork & pre-press, manufacturing & sourcing, QA & compliance, logistics & freight, packaging strategy
- Mailers: E or B flute; tuck-front / crash-lock / magnetic; full inside+outside print
- Rigid: magnetic / lift-off / drawer / hinged; FSC greyboard; soft-touch / foil / emboss / spot UV; ~4–6 week lead
- Shipping boxes: 0201 style
- Paper mailers: plastic-free poly-mailer alternative; peel-seal; tear strip; kerbside recyclable
- Cans: digital CMYK aluminium; no plate charges
- Lead times from artwork approval are approximate: digital mailers 3–4 wks; litho mailers 4–6; rigid 4–6; paper mailers 3–5; shippers 3–4; cans 3–4; tissue 4–6
- Pricing (always approximate): a digitally printed mailer box starts from around £1–3 per unit at 500 units, with litho from 1,000 units and flexo from 3,000 units. Rigid ~£3–5/unit at 500 with print + soft-touch. Digital has no plates. Flexo stereo ~£300–450. Diecut tools ~£600–800. Free unprinted samples. Printed pre-pro is usually a small charge credited against the first order.
- PPWR from 2025 staggered to 2030; UK EPR; PFAS-free and FSC options; recyclable first (not compostable unless a real use case)

---

## Live Q&As (Sanity)

### About Supplied (20)

**Q:** Can Supplied help me reduce my packaging costs?

Yes. Brands that consolidate their packaging through Supplied save an average of 21% compared to managing multiple suppliers independently.

---

**Q:** Does Supplied have a European operation?

Yes. We have a Polish entity based in Warsaw, which supports European clients and supplier relationships across the continent.

---

**Q:** How many projects has Supplied managed?

We've managed over 200 packaging projects across a wide range of product categories and markets.

---

**Q:** How many suppliers does Supplied work with?

We work with a network of 60+ vetted suppliers across 12 countries globally.

---

**Q:** How many suppliers does Supplied work with?

We work with a network of 60+ vetted suppliers across 12 countries globally.

---

**Q:** Is Supplied a manufacturer or a consultancy?

We are a consultancy and managed sourcing partner, not a manufacturer. We manage your packaging supply chain through our vetted global supplier network.

---

**Q:** Is Supplied just a supplier, or do they offer consultancy?

We're a consultancy first. We advise on packaging strategy, sustainability compliance, and supply chain optimisation — not just fulfil orders.

---

**Q:** What is Supplied's mission?

To make premium, sustainable packaging accessible to fast-growing brands — removing the complexity, cost, and risk of managing packaging supply chains independently.

---

**Q:** What is Supplied's on-time delivery rate?

We achieve 95% on-time delivery across our managed projects.

---

**Q:** What is Supplied's on-time delivery rate?

We achieve 95% on-time delivery across our managed projects.

---

**Q:** What is Supplied?

Supplied is an end-to-end packaging consultancy based in London, helping fast-growing DTC and ecommerce brands source, design, and manage their packaging supply chain.

---

**Q:** What is Supplied?

Supplied is an end-to-end packaging consultancy based in London, helping fast-growing DTC and ecommerce brands source, design, and manage their packaging supply chain.

---

**Q:** What makes Supplied different from a standard packaging supplier?

We manage the entire packaging supply chain end-to-end — from design and sourcing to QA and logistics — acting as a single point of contact rather than just a product vendor.

---

**Q:** What makes Supplied different from going direct to a factory?

Going direct to a factory means managing sourcing, quality, compliance, logistics, and communication yourself — often in a different language and time zone. Supplied manages all of that on your behalf, with the buying power of a consolidated client base.

---

**Q:** What services does Supplied offer?

Our services cover structural design, artwork and pre-press, manufacturing and sourcing, QA and compliance, logistics and freight, and packaging strategy.

---

**Q:** Where is Supplied based?

Supplied has offices in London and Warsaw, Poland.

---

**Q:** Where is Supplied based?

Supplied has offices in London and Warsaw, Poland.

---

**Q:** Which well-known brands has Supplied worked with?

Our clients include TRIP, Healf, Wild, SURI, Glow For It, Polestar, and Sneak Energy, among others.

---

**Q:** Which well-known brands has Supplied worked with?

Our clients include TRIP, Healf, Wild, SURI, Glow For It, Polestar, and Sneak Energy, among others.

---

**Q:** Who are the founders of Supplied?

Supplied was founded by Gareth Walker, Alex Whomsley, Luke Howitt, and Marcos Benito Moreno — a team with deep expertise across packaging, supply chain, and ecommerce.

---

### Getting Started (12)

**Q:** Can I use Supplied for just one product initially and expand later?

Yes. Many of our longest-standing client relationships started with a single product. We're happy to prove our value on one SKU before you broaden the scope.

---

**Q:** Can Supplied help me if my launch date is very close?

Yes. Tell us your deadline immediately and we'll work backwards to identify the fastest viable option. Digital printing with short lead times is often the answer for tight timelines.

---

**Q:** Can Supplied work with brands that have no packaging experience?

Yes. Many of our clients are packaging their product for the first time. We guide you through every decision , format, material, print, finish, and logistics so you don't need prior experience.

---

**Q:** Do I need to have finalised artwork before getting a quote?

We can quote from a brief description and approximate dimensions. Artwork is developed later in the process once the structure and specification are agreed. We do always say that its better if we can have the physical product, especially if we are looking at insert, this ensures costs and right fit are covered upfront.

---

**Q:** Does Supplied have a minimum spend requirement?

There is no minimum spend requirement. We work with brands at all stages of growth, from first orders to large-scale programmes.

---

**Q:** How do I get a quote from Supplied?

Get in touch via our website or contact us directly. Share your product details, quantities, and any design references and we'll come back with options and pricing.

---

**Q:** How does Supplied handle confidential product or brand information?

All client information is treated as confidential. We do not share designs, briefs, or client details with third parties without explicit permission.

---

**Q:** How quickly will I receive a quote?

We aim to turn around quotes within 2 business days for most enquiries, some more complex enquiries can take 3-4 days but we will advise at the point of quoting an approx timeframe, to ensure expectations are managed.

---

**Q:** I have packaging from another supplier — can Supplied match it?

Yes. We regularly take over supply from existing suppliers, matching specifications and improving on price or quality. Share your existing samples and we'll quote accordingly.

---

**Q:** I'm not sure what packaging format I need — can Supplied advise?

Yes. This is exactly where our consultancy approach adds value. Share your product, channel, and budget and we'll recommend the right format and specification.

---

**Q:** Is there a contract or long-term commitment required?

No long-term contract is required. We work on a project basis and earn ongoing relationships through performance.

---

**Q:** What is the first step to working with Supplied?

Get in touch via our website or email with a brief outline of your packaging requirements — product type, approximate quantity, and any reference images. We'll come back to you within 1–2 business days to look at arranging a kick-off call to discuss all your requirements in detail.

---

### Account Management (3)

**Q:** Can Supplied manage multiple concurrent projects for the same client?

Yes. We regularly manage multiple simultaneous projects for clients with complex or multi-SKU packaging programmes.

---

**Q:** Can Supplied work with my existing design agency?

Yes. We regularly collaborate with clients' in-house or external design agencies, providing dielines, technical specifications, and pre-press support.

---

**Q:** Who will be my main contact at Supplied?

You'll be assigned a dedicated account manager who oversees your projects from brief through to delivery.

---

### Process (14)

**Q:** Can I use my own artwork files?

Yes. We accept print-ready artwork files and will check them through our pre-press process before going to print.

---

**Q:** Can Supplied help with structural design?

Yes. Structural design is part of our service. We engineer packaging to your product dimensions and brand requirements from the ground up.

---

**Q:** Can Supplied help with structural design?

Yes. Structural design is part of our service. We engineer packaging to your product dimensions and brand requirements from the ground up.

---

**Q:** Does Supplied handle logistics and delivery?

Yes. We manage logistics and freight as part of our end-to-end service, so your packaging arrives at your warehouse ready to use.

---

**Q:** Does Supplied handle logistics and delivery?

Yes. We manage logistics and freight as part of our end-to-end service, so your packaging arrives at your warehouse ready to use.

---

**Q:** Does Supplied help with artwork and pre-press?

Yes. We offer artwork and pre-press support to ensure your files are production-ready and print correctly first time.

---

**Q:** Does Supplied help with artwork and pre-press?

Yes. We offer artwork and pre-press support to ensure your files are production-ready and print correctly first time.

---

**Q:** Does Supplied manage customs and international freight?

Yes. International freight management including customs clearance is handled as part of our logistics service.

---

**Q:** How long does it take to get a quote?

We aim to turn around quotes quickly — typically within 1–2 business days depending on the complexity of your requirements.

---

**Q:** What Delta E do you work to for colour matching?

We work to a Delta E of 3 against a Pantone colour

---

**Q:** What happens after I approve a quote?

Once you approve the quote, we move into structural design and artwork. After your sign-off on pre-production samples, manufacturing begins.

---

**Q:** What happens after I approve a quote?

Once you approve the quote, we move into structural design and artwork. After your sign-off on pre-production samples, manufacturing begins.

---

**Q:** What information do I need to provide to get a quote?

Share your product dimensions, quantity, print requirements, and any finish preferences. If you have artwork or a brief, that helps too. We can also work from a reference sample.

---

**Q:** What quality checks are carried out before delivery?

We carry out QA and compliance checks at the factory before shipment. Our 98% on-time delivery rate reflects the robustness of our supplier and logistics management.

---

### MOQs & Pricing (34)

**Q:** Are diecut tools a one-off charge?

Yes. Diecut tools cost approximately £600–£800 and are retained for repeat orders, so you won't be charged again on reorders of the same structure.

---

**Q:** Are there any hidden charges I should know about?

We quote transparently. Where applicable, we'll include stereo charges, diecut tool costs, and sample charges upfront so there are no surprises.

---

**Q:** Are there any setup charges?

Digital printing has no plate charges. Flexo printing requires stereo charges of £300–£450. Diecut tools cost approximately £600–£800 where applicable.

---

**Q:** Are there diecutting charges?

Diecut tools cost approximately £600–£800 and may apply when using a custom structural size. Standard sizes may avoid this charge.

---

**Q:** Are there plate charges for printed cans?

No. Digital printing on cans requires no plates, so there are no upfront tooling costs, although there is an artwork set up cost per design at approx £165 each. This will only need to be paid on first order, where a can design is new or has been updated.

---

**Q:** Are there plate charges for printed cans?

No. Digital printing on cans requires no plates, so there are no upfront tooling costs.

---

**Q:** At what quantity does flexo printing become available for mailer boxes?

Flexo printing on mailer boxes is available from 3,000 units, with digital from 500 units and litho from 1,000 units.

---

**Q:** At what quantity does flexo printing become available for mailer boxes?

Flexo printing on mailer boxes is available from 3,000 units, with digital from 500 units and litho from 1,000 units.

---

**Q:** Can I get a quote without committing to an order?

Absolutely. We provide detailed quotes with no obligation. Just share your requirements and we'll come back with options and pricing.

---

**Q:** Do higher quantities always mean lower unit costs?

Yes. The more units you order, the lower the per-unit cost — particularly when moving from digital to flexo printing.

---

**Q:** Do mailer box prices decrease at higher quantities?

Yes. Mailer boxes start from 500 units digital, 1,000 litho, or 3,000 flexo, and the unit cost drops on the higher routes. Contact us for a tailored quote.

---

**Q:** How can I reduce my packaging unit cost?

Increasing order quantity, simplifying your design, reducing the number of colours, or switching from digital to flexo printing at volume are the most effective ways to reduce unit cost.

---

**Q:** How does Supplied calculate packaging costs?

Pricing is based on product type, dimensions, board specification, print method, finish, quantity, and delivery location. We build a detailed quote for each enquiry.

---

**Q:** How much can I save by consolidating packaging through Supplied?

Brands that consolidate their packaging through Supplied save an average of 21% compared to managing multiple suppliers directly.

---

**Q:** How much can I save by consolidating packaging through Supplied?

Brands that consolidate their packaging through Supplied save an average of 21% compared to managing multiple suppliers directly.

---

**Q:** How much does packaging typically cost through Supplied?

Pricing depends on product type, size, quantity, and specification. As a guide, a digitally printed mailer box starts from around £1–3 per unit at 500 units, with litho from 1,000 units and flexo from 3,000 units. Rigid boxes are approximately £3–£5 at 500 units. We always provide an exact quote.

---

**Q:** What currencies does Supplied quote in?

We primarily quote in GBP. For European clients we can also quote in EUR. Speak to our team if you have a specific currency requirement.

---

**Q:** What is the MOQ for digital printing?

Digitally printed mailer boxes start from 500 units, with litho from 1,000 units and flexo from 3,000 units. Printed cans start from 1,000 units. Shipping boxes are flexo only, from 1,000 units. Paper mailers start from 1,000 units on the digital route.

---

**Q:** What is the MOQ for flexo printing?

Flexo printing on shipping boxes starts from 1,000 units. Flexo printing on mailer boxes starts from 3,000 units, with digital from 500 units and litho from 1,000 units.

---

**Q:** What is the MOQ for paper tape?

The minimum order quantity is 72 rolls.

---

**Q:** What is the MOQ for printed cans?

Printed cans start from 1,000 units. Digital printing is the only route, which suits craft beverage brands, small-batch launches, and seasonal SKUs.

---

**Q:** What is the MOQ for printed shipping boxes?

Flexo printed shipping boxes start from 1,000 units. We don't offer digital print on shipping boxes.

---

**Q:** What is the MOQ for printed shipping boxes?

Flexo printed shipping boxes start from 1,000 units. We don't offer digital print on shipping boxes.

---

**Q:** What is the MOQ for rigid boxes?

The minimum order quantity for rigid boxes is 500 units.

---

**Q:** What is the MOQ for rigid boxes?

The minimum order quantity for rigid boxes is 500 units.

---

**Q:** What is the MOQ for tissue paper?

The minimum order quantity for tissue paper is 5,000 sheets.

---

**Q:** What is the approximate cost per unit for mailer boxes at 500 units?

A digitally printed mailer box starts from around £1–3 per unit at 500 units, with litho from 1,000 units and flexo from 3,000 units. We'll always provide an exact quote based on your specific size and spec.

---

**Q:** What is the approximate cost per unit for mailer boxes at 500 units?

A digitally printed mailer box starts from around £1–3 per unit at 500 units, with litho from 1,000 units and flexo from 3,000 units. We'll always provide an exact quote based on your specific size and spec.

---

**Q:** What is the approximate unit cost for rigid boxes?

As a rough guide, rigid boxes are approximately £3–£5 per unit at 500 units. We'll provide an exact quote based on your dimensions and specification.

---

**Q:** What is the approximate unit cost for rigid boxes?

As a rough guide, rigid boxes are approximately £3–£5 per unit at 500 units. We'll provide an exact quote based on your dimensions and specification.

---

**Q:** What is the lowest MOQ Supplied offers?

Digitally printed mailer boxes start from 500 units, litho from 1,000 units and flexo from 3,000 units.

---

**Q:** What is the lowest MOQ Supplied offers?

Digitally printed mailer boxes start from 500 units, litho from 1,000 units and flexo from 3,000 units.

---

**Q:** What is the minimum order quantity for mailer boxes?

Mailer boxes start from 500 units digital, 1,000 litho, or 3,000 flexo.

---

**Q:** What is the minimum order quantity for mailer boxes?

Mailer boxes start from 500 units digital, 1,000 litho, or 3,000 flexo.

---

### Samples (4)

**Q:** Are printed samples available for flexo runs?

No. Printed pre-production samples are not available for flexo print runs due to the nature of the process.

---

**Q:** Are unprinted samples free?

Yes. Unprinted structural samples are provided free of charge so you can assess the size and construction before committing to print.

---

**Q:** Can I get a sample mailer box before placing an order?

Yes. Unprinted structural samples are free of charge. Printed pre-production samples are available for a small charge, which is credited against your first order. Note that printed samples are not available for flexo print runs.

---

**Q:** Is there a charge for pre-production printed samples?

Yes, there is a small charge for printed pre-production samples. This is credited in full against your first production order.

---

### Lead Times (7)

**Q:** How long does a container from China take to get to the UK?

Average sea freight from China to the UK is around 6- 8 weeks.

---

**Q:** What is Supplied's typical lead time?

Lead times vary by product. Rigid boxes and tissue paper are typically 4–6 weeks from artwork approval. Digital products are generally faster. We confirm exact timelines at the quoting stage.

---

**Q:** What is Supplied's typical lead time?

Lead times vary by product. Rigid boxes and tissue paper are typically 4–6 weeks from artwork approval. Digital products are generally faster. We confirm exact timelines at the quoting stage.

---

**Q:** What is the lead time for rigid boxes?

Rigid boxes typically have a 4–6 week lead time from artwork approval.

---

**Q:** What is the lead time for rigid boxes?

Rigid boxes typically have a 4–6 week lead time from artwork approval.

---

**Q:** What is the lead time for tissue paper?

Tissue paper has a 4–6 week lead time from artwork approval.

---

**Q:** What is the lead time for tissue paper?

Tissue paper has a 4–6 week lead time from artwork approval.

---

### Mailer Boxes (41)

**Q:** Are mailer boxes FSC certified?

Yes. FSC certified options are available across our mailer box range.

---

**Q:** Are mailer boxes recyclable?

Yes. All our corrugated mailer boxes are fully recyclable and are designed to be PPWR compliant from the outset.

---

**Q:** Are mailer boxes suitable for fragile products?

Yes, with the right insert solution. We engineer corrugated or pulp mould inserts that hold fragile products securely within the mailer box.

---

**Q:** Are there eco-friendly closure options for mailer boxes?

Yes. Paper-based peel-and-seal strips are available as alternatives to plastic-based tape for closing mailer boxes.

---

**Q:** Are there plate (stereo) costs for mailer boxes?

Digital mailer boxes have no plate charges. Flexo printing requires stereo charges of approximately £300–£400 per colour.

---

**Q:** At what quantity does flexo printing become available for mailer boxes?

Flexo printing on mailer boxes is available from 3,000 units, with digital from 500 units and litho from 1,000 units.

---

**Q:** Can I get a sample mailer box before placing an order?

Yes. Unprinted structural samples are free of charge. Printed pre-production samples are available at approx £100 per sample.  Please note any printed sample will be digital, therefore it will not be a like for like print representation.

---

**Q:** Can I get full colour print on the inside of my mailer box

Yes. We offer full inside and outside print on mailer boxes, so your unboxing experience can be as branded as the exterio

---

**Q:** Can I get full colour print on the inside of my mailer box?

Yes. We offer full inside and outside print on mailer boxes, so your unboxing experience can be as branded as the exterior.

---

**Q:** Can I get full colour print on the inside of my mailer box?

Yes. We offer full inside and outside print on mailer boxes, so your unboxing experience can be as branded as the exterior.

---

**Q:** Can I order mailer boxes in multiple designs at the same quantity?

With digital printing, yes. Multiple designs can be run without additional plate charges, making it easy to produce different SKUs or seasonal variants.

---

**Q:** Can mailer boxes be heat sealed?

Standard corrugated mailer boxes are not heat sealed. Closure options include tuck-front and peel-and-seal adhesive strips. Speak to our team about the right closure for your fulfilment setup.

---

**Q:** Can mailer boxes be made with 100% recycled board?

All Mailer boxes made from FSC Mix 70%. which is a mix of virgin papers and recycled fibre board.

---

**Q:** Can mailer boxes be printed with metallic inks?

Metallic ink effects on corrugated are limited. The most reliable way to achieve a metallic finish on a mailer box is through litho-lam with foil blocking, rather than printing metallic ink directly onto the corrugated surface.

---

**Q:** Can mailer boxes be supplied pre-assembled?

Mailer boxes are typically supplied flat-packed. Pre-assembled options increase shipping volume and cost significantly. Crash-lock styles are the fastest to assemble as a flat pre-assembled box and is easy to erect.

---

**Q:** Can mailer boxes have a magnetic closure?

Yes. Magnetic closure is one of the available mailer box styles alongside tuck-front and crash-lock options.

---

**Q:** Can mailer boxes have perforated opening strips?

Yes. Perforated tear strips can be engineered into mailer box structures for a clean, easy-open customer experience without needing scissors or excessive force.

---

**Q:** Do mailer box prices decrease at higher quantities?

Yes. Mailer boxes start from 500 units digital, 1,000 litho, or 3,000 flexo, and the unit cost drops on the higher routes. Contact us for a tailored quote.

---

**Q:** How do I measure the internal dimensions of a mailer box?

Internal dimensions are measured length x width x height of the usable space inside the box. Always measure your product and add clearance for any inserts or tissue paper before confirming dimensions.

---

**Q:** What causes a mailer box to warp or buckle?

Warping is usually caused by moisture exposure, incorrect storage, or print coverage that is too heavy on one side of the board. We advise on print specifications and storage to minimise this risk.

---

**Q:** What is a crash-lock mailer box?

A crash-lock base assembles quickly by pressing the base flat — no taping required. It's a popular choice for high-volume fulfilment operations, where you can have the addition of peel and seal for rapid fulfilment.

---

**Q:** What is a crash-lock mailer box?

A crash-lock base assembles quickly by pressing the base flat — no taping required. It's a popular choice for high-volume fulfilment operations.

---

**Q:** What is a full overlap mailer box?

A full overlap mailer has outer closing flaps that completely overlap each other rather than meeting in the middle. This gives added security and crush resistance, useful for heavier products.

---

**Q:** What is a tuck-front mailer box?

A tuck-front box has a flap that tucks into the front panel to close. It's a clean, simple closure style often used for lighter products and subscription boxes.

---

**Q:** What is litho-lam and when is it used on mailer boxes?

Litho-lam involves printing a high-quality offset sheet and laminating it to corrugated board. It produces an exceptionally smooth, premium print finish and is available from 1,000 units.

---

**Q:** What is the approximate cost per unit for mailer boxes at 500 units?

A digitally printed mailer box starts from around £1–3 per unit at 500 units, with litho from 1,000 units and flexo from 3,000 units. We'll always provide an exact quote based on your specific size and spec.

---

**Q:** What is the best mailer box for a luxury brand?

For luxury brands, a magnetic closure mailer box with litho-lam outside print and full inside print gives the most premium feel in a corrugated format. Rigid boxes are the step up if budget allows.

---

**Q:** What is the best mailer box style for a subscription box brand?

Crash-lock bases are ideal for subscription brands — they assemble quickly at high volume, hold their shape securely, and can carry full inside and outside print for a strong unboxing moment every month.

---

**Q:** What is the difference between E flute and B flute mailer boxes?

E flute is thinner and gives a smoother print surface, ideal for premium presentation. B flute is thicker and offers more structural protection, better suited for heavier products.

---

**Q:** What is the difference between E flute and B flute mailer boxes?

E flute is thinner and gives a smoother print surface, ideal for premium presentation. B flute is thicker and offers more structural protection, better suited for heavier products.

---

**Q:** What is the difference between E flute and B flute mailer boxes?

E flute is thinner and gives a smoother print surface, ideal for premium presentation. B flute is thicker and offers more structural protection, better suited for heavier products.

---

**Q:** What is the difference between a mailer box and a shipping box?

A mailer box is designed to be both the outer shipping carton and the branded presentation box — it's what your customer opens. A shipping box is purely functional outer packaging, typically used when products are packed inside another box.

---

**Q:** What is the difference between an RSC and a mailer box?

An RSC (regular slotted container) is a plain shipping box with four flaps. A mailer box is a more complex structure designed to be opened by the end customer, typically with a tuck or crash-lock closure and branded inside and out.

---

**Q:** What is the lead time for mailer boxes?

Lead times vary by print method and quantity. We'll confirm your exact lead time at the quoting stage. Generally its around 4-6 weeks depending on manufacturing location.

---

**Q:** What is the lead time for mailer boxes?

Lead times vary by print method and quantity. We'll confirm your exact lead time at the quoting stage.

---

**Q:** What is the maximum weight a mailer box can hold?

Weight capacity depends on the board grade and flute type. B flute handles heavier loads than E flute. We specify the right board weight for your product at the brief stage.

---

**Q:** What print method is used for mailer boxes at higher quantities?

Mailer boxes use digital from 500 units, litho from 1,000 units, and flexo from 3,000 units. Flexo reduces the unit cost but requires stereo (plate) charges of approximately £300–£450 per colour and a forme (diecut) cost, and litho gives a more premium look and feel.

---

**Q:** What print method is used for mailer boxes at low quantities?

Mailer boxes are printed digitally from 500 units, with litho from 1,000 units and flexo from 3,000 units, which means no plate charges on the digital route and a fast turnaround.

---

**Q:** What types of mailer boxes does Supplied offer?

We offer custom printed mailer boxes in E and B flute corrugated board. Styles include tuck-front, crash-lock, and magnetic closure.

---

**Q:** What types of mailer boxes does Supplied offer?

We offer custom printed mailer boxes in E and B flute corrugated board. Styles include tuck-front, crash-lock, and peel and seal

---

**Q:** What types of mailer boxes does Supplied offer?

We offer custom printed mailer boxes in E and B flute corrugated board. Styles include tuck-front, crash-lock, and magnetic closure.

---

### Rigid Boxes (19)

**Q:** Are rigid boxes suitable for gifting products?

Yes. Rigid boxes are one of the most popular packaging formats for gifting, with a premium construction and wide range of finish options.

---

**Q:** Are rigid boxes suitable for luxury or premium brands?

Yes. Rigid boxes are one of the most premium packaging formats available, with a wide range of finishes that elevate the perceived value of any product.

---

**Q:** Can I get a rigid box with a window cut-out?

Yes. Window cut-outs in rigid boxes — sometimes fitted with a clear acetate panel — allow the product to be seen without opening. Popular in cosmetics and gifting.

---

**Q:** Can rigid boxes be custom sized?

Yes. All rigid boxes are made to your exact product dimensions. We engineer inserts and structure around your product requirements.

---

**Q:** Can rigid boxes be reused by customers?

Yes. The durability of rigid boxes makes them naturally reusable — a quality that aligns well with sustainability messaging. Many brands design rigid boxes explicitly for reuse as storage or keepsake boxes.

---

**Q:** Can rigid boxes be used for food products?

Yes. Rigid boxes can be food-safe lined or fitted with food-grade inserts. Speak to our team about the specific requirements for your product and we'll design accordingly.

---

**Q:** Can rigid boxes have a foam or velvet lining?

Yes. Interior linings in foam, velvet, or other materials can be added to rigid boxes for products requiring extra protection or a particularly luxurious feel — common in jewellery and cosmetics.

---

**Q:** What finishes are available on rigid boxes?

Rigid boxes can be finished with soft-touch lamination, foil blocking, embossing, and spot UV. Combinations are also possible.

---

**Q:** What finishes are available on rigid boxes?

Rigid boxes can be finished with soft-touch lamination, foil blocking, embossing, and spot UV. Combinations are also possible.

---

**Q:** What finishes are available on rigid boxes?

Rigid boxes can be finished with soft-touch lamination, foil blocking, embossing, and spot UV. Combinations are also possible.

---

**Q:** What is a book-style rigid box?

A book-style rigid box is hinged along one edge and opens like a book. It's used for premium gifting and luxury products where the opening moment is part of the brand experience.

---

**Q:** What is a drawer rigid box?

A drawer box slides open horizontally from a sleeve — creating a distinctive opening experience often used for jewellery, tech accessories, and premium gifting.

---

**Q:** What is a hinged rigid box?

A hinged rigid box opens like a book or a clamshell, connected by a spine. It's used for premium gifting and products where the opening moment is important.

---

**Q:** What is a lift-off lid rigid box?

A lift-off lid box has a separate lid that sits over the base — a classic format used widely in luxury goods, cosmetics, and premium retail.

---

**Q:** What is a magnetic closure rigid box?

A magnetic closure rigid box uses hidden magnets in the lid to create a satisfying, secure close. It's one of the most popular formats for premium gifting and cosmetics.

---

**Q:** What is the MOQ for rigid boxes?

The minimum order quantity for rigid boxes is 500 units.

---

**Q:** What is the standard greyboard thickness for rigid boxes?

Rigid boxes are typically made from 1,500–2,000 micron greyboard depending on the box size and structural requirements. We specify the appropriate thickness for each project.

---

**Q:** What types of rigid boxes does Supplied offer?

We offer magnetic closure, lift-off lid, drawer, and hinged rigid boxes. All are made from FSC-certified greyboard.

---

**Q:** What types of rigid boxes does Supplied offer?

We offer magnetic closure, lift-off lid, drawer, and hinged rigid boxes. All are made from FSC-certified greyboard.

---

### Shipping Boxes (7)

**Q:** Are plain shipping boxes available?

Yes. Plain unprinted shipping boxes are available if you simply need a reliable, cost-effective outer carton.

---

**Q:** Can shipping boxes be branded?

Yes. We offer fully branded shipping boxes with flexo printing from 1,000 units. We don't offer digital print on shipping boxes.

---

**Q:** What does 0201 mean for shipping boxes?

0201 is the international standard code for a regular slotted container — the most common shipping box style, with four flaps top and bottom that meet in the centre when closed.

---

**Q:** What is double-wall corrugated board?

Double-wall corrugated has two fluted layers between three liner sheets, providing greater strength and crush resistance than single-wall board. It's used for heavier or fragile products.

---

**Q:** What is the minimum order for printed shipping boxes?

We don't offer digital print on shipping boxes. Flexo printed shipping boxes start from 1,000 units.

---

**Q:** What is the minimum order for flexo printed shipping boxes?

Flexo printed shipping boxes start from 1,000 units.

---

**Q:** What shipping box styles does Supplied offer?

We supply 0201 style regular slotted shipping boxes, available plain or fully branded.

---

### Paper Mailers (7)

**Q:** Can paper mailers be printed with a full colour design?

Yes. Custom printed paper mailers can carry your full brand design, logo, and messaging.

---

**Q:** Can paper mailers be used for clothing?

Yes. Paper mailers are widely used by fashion and apparel brands as a sustainable alternative to plastic poly mailers for soft goods.

---

**Q:** Do paper mailers have a returns strip?

Yes. Our paper mailers include a tear strip for easy customer returns, as well as a peel-seal closure.

---

**Q:** What are paper mailers?

Paper mailers are a sustainable alternative to plastic poly mailers — fully recyclable, with peel-seal closure and tear strip for easy returns.

---

**Q:** What are paper mailers?

Paper mailers are a sustainable alternative to plastic poly mailers — fully recyclable, with peel-seal closure and tear strip for easy returns.

---

**Q:** What is a peel-seal closure on a paper mailer?

A peel-seal closure has a self-adhesive strip protected by a peel-off liner. It provides a secure, tamper-evident seal without needing tape.

---

**Q:** What is a tear strip on a paper mailer?

A tear strip is a perforated strip that allows the recipient to open the mailer cleanly along a straight line — often used as a second seal strip for easy returns.

---

### Printed Cans (6)

**Q:** Are printed cans food safe?

Yes. Our aluminium cans meet food and beverage safety standards. We can provide documentation on request.

---

**Q:** Are printed cans suitable for craft breweries?

Yes. Printed cans start from 1,000 units, with no plate charges, which suits craft breweries, RTD brands, and soft drink producers.

---

**Q:** Can I print different designs on the same can run?

Digital printing allows for multiple designs within the same production run without additional plate charges — ideal for variety packs or seasonal editions.

---

**Q:** What drinks are printed cans suitable for?

Printed cans are suitable for beer, cider, soft drinks, energy drinks, RTDs, and other beverages.

---

**Q:** What type of cans does Supplied offer?

We offer digitally printed aluminium cans using CMYK printing directly onto the can surface. No printing plates are required.

---

**Q:** What type of cans does Supplied offer?

We offer digitally printed aluminium cans using CMYK printing directly onto the can surface. No printing plates are required.

---

### Cartonboard (3)

**Q:** Does Supplied offer folding cartons?

Yes. Folding cartons in cartonboard are available within our product range. Speak to our team about your specific requirements and we'll advise on the right specification.

---

**Q:** What is cartonboard?

Cartonboard is a stiff paperboard used for folding cartons — the type of packaging you see on cereal boxes, cosmetic boxes, and pharmaceutical packs. It's lighter than corrugated and suited to retail shelf presentation.

---

**Q:** What is the difference between cartonboard and corrugated board?

Cartonboard is a solid board without a fluted inner layer — thinner, lighter, and better for retail shelf presence. Corrugated board has a fluted core giving it greater structural strength for shipping.

---

### Advent Calendars (6)

**Q:** Can Supplied design the advent calendar structure from scratch?

Yes. We handle structural design from brief through to pre-production sample, engineered to your product dimensions and brand requirements.

---

**Q:** Can advent calendars be fully custom designed?

Yes. Advent calendars are built entirely to your specification — structure, size, number of windows, and all print and finish options.

---

**Q:** Does Supplied make advent calendars?

Yes. We produce fully bespoke advent calendar structures, engineered to your exact product and brand requirements.

---

**Q:** What lead time should I plan for an advent calendar?

Plan for 4–5 months from initial brief to delivery. Starting early gives time for structural design, sampling, revisions, and production.

---

**Q:** When should I start planning my advent calendar?

We recommend starting 4–5 months before your planned launch date to allow time for design, sampling, and production.

---

**Q:** When should I start planning my advent calendar?

We recommend starting 4–5 months before your planned launch date to allow time for design, sampling, and production.

---

### Inserts (8)

**Q:** Can Supplied produce inserts for multi-product gift sets?

Yes. We regularly engineer inserts that hold multiple products of different sizes securely within a single box — common for gift sets and subscription boxes.

---

**Q:** What insert options are available?

We offer corrugated, foam, and pulp mould inserts, all engineered to the exact dimensions of your product for a secure fit.

---

**Q:** What is a corrugated insert?

A corrugated insert is engineered from corrugated board, cut and folded to create compartments or product holds within your outer box.

---

**Q:** What is a foam insert?

A foam insert is cut to the exact shape of your product, providing cushioning and a premium presentation feel. It's commonly used for electronics, cosmetics, and gift sets.

---

**Q:** What is a pulp mould insert?

A pulp mould insert is made from recycled paper fibre formed into a custom shape to hold your product. It's fully recyclable, biodegradable, and a popular alternative to foam.

---

**Q:** What is a vacuum-formed insert?

A vacuum-formed insert is made by heating a plastic sheet and forming it over a mould. It's precise and cost-effective for certain applications but not recyclable — we recommend pulp mould or corrugated as more sustainable alternatives.

---

**Q:** What is the best insert material for a luxury product?

Foam inserts give the most premium presentation feel for luxury products — a clean, precise fit with a satisfying resistance. Pulp mould is a strong sustainable alternative with a more artisan aesthetic.

---

**Q:** What is the most sustainable insert option?

Pulp mould and corrugated inserts are the most sustainable options — both are made from recycled content and are fully recyclable at end of life.

---

### Labels (9)

**Q:** Are labels available with a clear background?

Yes. Clear label materials are available for a no-label look, widely used in beauty and beverage applications.

---

**Q:** Can labels be supplied on rolls?

Yes. Labels are available on rolls for use with automated or semi-automated label application equipment.

---

**Q:** Can labels be waterproof?

Yes. Waterproof synthetic label materials are available for products that may be exposed to moisture — common in beauty, food, and beverage applications.

---

**Q:** What is a clear label?

A clear label is printed on transparent material, giving a no-label look where only the printed design is visible on the product. Popular for glass bottles and jars in beauty and beverage.

---

**Q:** What label formats does Supplied offer?

We supply self-adhesive labels in die-cut, roll, and sheet formats to suit different application methods.

---

**Q:** What label materials are best for beauty products?

White gloss or white matte paper labels are standard for beauty. For products exposed to moisture — in the shower or bathroom — a waterproof BOPP or polyester label is recommended.

---

**Q:** What label materials are best for food and beverage products?

Food and beverage labels typically use white or clear BOPP for moisture resistance. For craft and premium products, uncoated paper labels give a natural, tactile feel.

---

**Q:** What materials are labels available in?

Labels are available in paper, kraft, and synthetic materials depending on your application and finish requirements.

---

**Q:** What shapes can die-cut labels be produced in?

Die-cut labels can be produced in any shape — circle, oval, square, rectangle, or fully custom outline shapes.

---

### Tissue Paper (5)

**Q:** Can tissue paper be used as void fill?

Yes. Tissue paper is widely used as both a product wrap and a decorative void fill inside mailer and rigid boxes.

---

**Q:** Does Supplied offer custom printed tissue paper?

Yes. We offer fully custom printed tissue paper for use inside boxes and mailers.

---

**Q:** Is tissue paper FSC certified?

Yes. FSC certified tissue paper is available within our range.

---

**Q:** Is tissue paper recyclable?

Yes. Our tissue paper is recyclable and can be designed to meet PPWR compliance requirements.

---

**Q:** What is the MOQ for tissue paper?

The minimum order quantity for tissue paper is 5,000 sheets.

---

### Paper Tape (4)

**Q:** Does Supplied offer branded paper tape?

Yes. We supply custom branded paper tape, with a minimum order of 72 rolls.

---

**Q:** Is paper tape recyclable with the box?

Yes. Paper tape — particularly water-activated varieties — can generally be recycled along with the corrugated box, unlike plastic tape which must be removed before recycling.

---

**Q:** What is the MOQ for paper tape?

The minimum order quantity is 72 rolls.

---

**Q:** What is water-activated tape?

Water-activated tape uses a starch-based adhesive that activates when moistened. It bonds directly with the box surface, making it more secure and tamper-evident than pressure-sensitive alternatives.

---

### Pouches & Bags (3)

**Q:** Are pouches recyclable?

Recyclability depends on the laminate construction. Mono-material pouches — made from a single material type — are fully recyclable and are increasingly available as a PPWR-compliant alternative to multi-layer laminates.

---

**Q:** Does Supplied offer flexible packaging such as pouches?

Yes. Pouches and bags are available within our product range, suitable for food, supplement, and beauty brands. Speak to our team about your specific format and material requirements.

---

**Q:** What is a mono-material pouch?

A mono-material pouch is made from a single polymer or paper-based material rather than a laminate of multiple layers. It can be recycled through standard streams and is designed to meet PPWR recyclability requirements.

---

### Print Methods (48)

**Q:** Are Pantone colours available?

Pantone matching is available on flexo print runs. Digital printing works in CMYK and cannot guarantee exact Pantone matching.

---

**Q:** Are there any design limitations with flexo printing?

Flexo printing handles solid colours and simple graphics very well. Very fine detail or photographic imagery is better suited to digital or litho-lam printing.

---

**Q:** Are there plate charges for mailer boxes?

Digital mailer boxes have no plate charges. Flexo printing requires stereo charges of approximately £300–£400.

---

**Q:** Are there plate charges for mailer boxes?

Digital mailer boxes have no plate charges. Flexo printing requires stereo charges of approximately £300–£400.

---

**Q:** Can I combine multiple finishes on a rigid box?

Yes. It's common to combine soft-touch lamination with foil blocking, embossing, or spot UV on a single rigid box for a layered premium finish.

---

**Q:** Can I get white ink printing?

White ink options vary by product and print method. Speak to our team and we'll advise on what's possible for your specific packaging format.

---

**Q:** Can I print a photographic image on my mailer box?

Yes. Digital and litho-lam printing both handle photographic imagery well. Flexo is less suited to complex photographic designs.

---

**Q:** Can I print multiple designs with digital printing?

Yes. Digital printing makes it easy to run multiple designs or SKUs in the same batch with no additional plate costs.

---

**Q:** Can I print with more than four colours?

Yes. We can support with various print finishes to achieve 4 colour print. Each additional colour adds to the cost on flexo runs, as you require a print stereo for every colour you use.

---

**Q:** Can I switch from digital to flexo as my volumes grow?

Yes. Many brands start on digital and move to flexo as order quantities increase. We manage that transition and ensure consistency in your brand colours and finish.

---

**Q:** Can flexo printing achieve Pantone colour matching?

Yes. Flexo printing can be set up for Pantone matched inks, making it suitable for brands with strict brand colour guidelines.

---

**Q:** Do you get Ink Rub on printed boxes?

You will typically see some ink rub on your boxes when using Flexographic printing. This is worse when you have a large flood print across the full board, in particular darker colours will show this more noticeable. Colours like Black, dark greens, Purple etc will have heavy pigmentation due to the amount of ink you have to overlay onto the corrugated board.

---

**Q:** Is CMYK printing available on cans?

Yes. Our digitally printed cans use full CMYK colour directly onto the aluminium surface.

---

**Q:** What are stereo charges?

Stereos are the printing plates used in flexo printing. They typically cost £300–£450 and are a one-off charge per design.

---

**Q:** What are stereo charges?

Stereos are the printing plates used in flexo printing. They typically cost £300–£400 and are a one-off charge per design.

---

**Q:** What is UV coating on packaging?

UV coating is a liquid coating cured instantly by ultraviolet light. It produces a hard, high-gloss finish that's more durable than standard aqueous coating and can be applied as spot UV for selective effect.

---

**Q:** What is a colour proof?

A colour proof is a print output used to check colour accuracy before full production. Digital proofs are standard for most runs — press proofs printed on the actual press are available for critical colour work.

---

**Q:** What is a dieline?

A dieline is a flat template showing exactly how a box is cut and folded. We provide dielines for all custom structures so your designer can apply artwork accurately.

---

**Q:** What is cold foil printing?

Cold foil printing applies metallic foil to packaging using UV adhesive rather than heat and pressure. It can be applied inline on digital presses and works well for large metallic coverage areas.

---

**Q:** What is digital printing?

Digital printing applies ink directly from a digital file with no printing plates required. Mailer boxes use it from 500 units, with litho from 1,000 units and flexo from 3,000 units. Printed cans start from 1,000 units.

---

**Q:** What is digital printing?

Digital printing applies ink directly from a digital file with no printing plates required. Mailer boxes use it from 500 units, with litho from 1,000 units and flexo from 3,000 units. Printed cans start from 1,000 units.

---

**Q:** What is embossing versus debossing?

Embossing creates a raised surface impression. Debossing creates a recessed impression pressed into the surface. Both are used on logos and brand marks for a tactile premium effect.

---

**Q:** What is embossing?

Embossing creates a raised three-dimensional impression in the surface of the packaging — commonly used on logos or brand marks to add a tactile premium quality.

---

**Q:** What is flexo printing?

Flexo (flexographic) printing uses engraved rubber or polymer plates to apply ink at high speed. It's cost-effective at volume but requires upfront stereo (plate) charges.

---

**Q:** What is flexo printing?

Flexo (flexographic) printing uses engraved rubber or polymer plates to apply ink at high speed. It's cost-effective at volume but requires upfront stereo (plate) charges.

---

**Q:** What is flexographic printing registration?

Registration refers to the precise alignment of each ink colour in a flexo print run. Poor registration causes colours to appear misaligned or blurry. Fine detail and thin borders are most vulnerable to registration issues.

---

**Q:** What is foil blocking?

Foil blocking presses a metallic or pigmented foil onto the surface of the packaging using heat and pressure. It's used to highlight logos, text, or design elements with a premium metallic finish.

---

**Q:** What is ink holdout?

Ink holdout refers to how well a substrate prevents ink from being absorbed into its surface. High holdout surfaces like Brown and White Kraftliner papers are better for flood colour coverage, compared to Testliner papers (higher recycled content) which are more porous so the overall flood colour can seem speckled and not as rich and strong in the overall colour.

---

**Q:** What is litho-lam printing?

Litho-lam (lithographic lamination) involves printing a high-quality sheet offset and laminating it to corrugated board. It gives a premium finish and is available for mailer boxes from 1,000 units, alongside digital from 500 units and flexo from 3,000 units.

---

**Q:** What is litho-lam printing?

Litho-lam (lithographic lamination) involves printing a high-quality sheet offset and laminating it to corrugated board. It gives a premium finish and is available for mailer boxes from 1,000 units, alongside digital from 500 units and flexo from 3,000 units.

---

**Q:** What is overlamination?

Overlamination is the application of a thin film over the printed surface to protect it from scuffing and moisture and to enhance the finish. Matte and gloss are the two standard options.

---

**Q:** What is pre-press?

Pre-press is the process of checking and preparing artwork files for print — including colour profiling, bleed, die lines, and resolution checks. We handle this as part of our service.

---

**Q:** What is rotogravure printing?

Rotogravure is a high-quality printing process using engraved cylinders, used primarily for flexible packaging like pouches and films. It produces excellent colour depth but has high setup costs suited to large volume runs.

---

**Q:** What is soft-touch lamination?

Soft-touch lamination is a matte film finish applied to the outer surface of rigid boxes or cartons. It gives a velvety tactile feel and a premium look that photographs well.

---

**Q:** What is the best print method for a new brand with no minimum budget?

Digital printing is the best starting point for mailer boxes: no plate charges, from 500 units, with litho from 1,000 units and flexo from 3,000 units.

---

**Q:** What is the colour gamut like on digital printing?

Digital printing produces vibrant, accurate CMYK colour. For most brand applications it's more than sufficient, though it cannot guarantee exact Pantone matching.

---

**Q:** What is the difference between RGB and CMYK colour?

RGB is the colour model used for screens — it produces colour using light. CMYK is the printing colour model using cyan, magenta, yellow, and black inks. All artwork for print must be converted to CMYK before production.

---

**Q:** What is the difference between gloss and matte lamination?

Gloss lamination gives a shiny, reflective surface that makes colours appear vivid and saturated. Matte lamination gives a flat, non-reflective surface that feels softer and more premium to the touch.

---

**Q:** What is the difference between inside and outside print on a mailer box?

Outside print is what your customer sees on delivery. Inside print is revealed when the box is opened — a key part of the unboxing experience. We offer both.

---

**Q:** What print method is used for mailer boxes at higher quantities?

Mailer boxes use flexo from 3,000 units, digital from 500 units, and litho from 1,000 units, and flexo reduces the unit cost but requires stereo (plate) charges of approximately £300–£400.

---

**Q:** What print method is used for mailer boxes at higher quantities?

Mailer boxes use flexo from 3,000 units, digital from 500 units, and litho from 1,000 units, and flexo reduces the unit cost but requires stereo (plate) charges of approximately £300–£400.

---

**Q:** What print method is used for mailer boxes at low quantities?

Mailer boxes are printed digitally from 500 units, with litho from 1,000 units and flexo from 3,000 units, which means no plate charges on the digital route and a fast turnaround.

---

**Q:** What print method is used for mailer boxes at low quantities?

Mailer boxes are printed digitally from 500 units, with litho from 1,000 units and flexo from 3,000 units, which means no plate charges on the digital route and a fast turnaround.

---

**Q:** What print methods does Supplied use?

We use digital printing for short runs and flexo printing for larger volumes. The right method depends on your quantity, design complexity, and budget.

---

**Q:** When does digital printing make more sense than flexo?

Digital printing suits mailer boxes from 500 units, with litho from 1,000 units and flexo from 3,000 units, plus designs with lots of colour variation or where you want to avoid upfront plate costs.

---

**Q:** When does digital printing make more sense than flexo?

Digital printing suits mailer boxes from 500 units, with litho from 1,000 units and flexo from 3,000 units, plus designs with lots of colour variation or where you want to avoid upfront plate costs.

---

**Q:** When does flexo printing make more sense than digital?

Flexo becomes more cost-effective for mailer boxes from 3,000 units, after digital from 500 units and litho from 1,000 units. Shipping boxes are flexo from 1,000 units.

---

**Q:** When does flexo printing make more sense than digital?

Flexo becomes more cost-effective for mailer boxes from 3,000 units, after digital from 500 units and litho from 1,000 units. Shipping boxes are flexo from 1,000 units.

---

### Corrugated Technical (10)

**Q:** What does 100FR mean on a board spec?

100FR refers to a 100gsm fluting medium — the inner corrugated layer. FR denotes the grade of fluting used in the construction.

---

**Q:** What does 150WTK mean on a board spec?

150WTK refers to a 150gsm white top kraft liner — the outer facing of the corrugated board. White top gives a better print surface than natural kraft.

---

**Q:** What does B flute mean?

B flute has approximately 50 flutes per metre and is thicker than E flute. It offers greater cushioning and structural strength, making it better suited for heavier products.

---

**Q:** What does E flute mean?

E flute is a fine corrugated profile with approximately 90 flutes per metre. It's thin, gives a smooth print surface, and is commonly used for retail packaging and premium mailer boxes.

---

**Q:** What is a regular slotted container (RSC)?

An RSC — also known as a 0201 style box — is the most common shipping box format. It has four flaps on both the top and bottom that meet in the centre when closed.

---

**Q:** What is a retail-ready packaging (RRP) box?

Retail-ready packaging is designed to go directly onto a retail shelf without unpacking. It typically has a tear-off or push-out front panel that creates a display tray.

---

**Q:** What is corrugated board?

Corrugated board is a layered material made from a fluted inner sheet sandwiched between flat liner sheets. It provides strength and cushioning while remaining lightweight and recyclable.

---

**Q:** What is kraft liner?

Kraft liner is the outer facing of corrugated board made from virgin or recycled kraft pulp. It gives a natural brown appearance and is widely used for shipping and sustainable packaging.

---

**Q:** What is the difference between single wall and double wall corrugated?

Single wall corrugated has one fluted layer between two liners. Double wall has two fluted layers between three liners, offering significantly greater strength for heavier or more fragile products.

---

**Q:** What is white top liner?

White top liner has a white clay-coated surface on the outside face. It gives a significantly brighter and smoother print surface than natural kraft, important for high-quality brand presentation.

---

### Ecommerce Packaging (7)

**Q:** How can packaging reduce fulfilment costs?

Right-sized packaging reduces DIM weight charges, fits more units per pallet, reduces void fill requirements, and speeds up packing times — all of which reduce total fulfilment cost per order.

---

**Q:** How does packaging affect customer retention for DTC brands?

Premium, memorable packaging reinforces the perceived value of the product and increases the likelihood of repeat purchase and word-of-mouth recommendation. It's one of the highest-ROI brand investments a DTC brand can make.

---

**Q:** What is an unboxing experience?

The unboxing experience is the moment a customer opens their delivery — the sequence of reveals, textures, and brand touchpoints from the outer box to the product inside. It's a key brand moment for DTC businesses and drives social sharing and repeat purchase.

---

**Q:** What is dimensional weight pricing in shipping?

Dimensional weight (DIM weight) pricing charges based on the volume of a parcel rather than its actual weight, when the volume-based calculation is higher. Right-sizing packaging reduces DIM weight charges and can significantly lower fulfilment costs.

---

**Q:** What is frustration-free packaging?

Frustration-free packaging is easy to open, uses minimal materials, and arrives without excessive void fill or unnecessary layers. It improves the customer experience and reduces waste.

---

**Q:** What packaging elements contribute to a good unboxing experience?

Outside print, inside print, tissue paper, branded tape, inserts, cards, and stickers all contribute layers to the unboxing moment. We help brands design a coherent sequence from outer to inner.

---

**Q:** Why does the unboxing experience matter for DTC brands?

For DTC brands, the delivery is often the first physical brand touchpoint. A well-designed unboxing experience builds brand affinity, encourages social sharing, and increases the perceived value of the product.

---

### Sustainability (40)

**Q:** Are mailer boxes FSC certified?

Yes. FSC certified options are available across our mailer box range.

---

**Q:** Are mailer boxes recyclable?

Yes. All our corrugated mailer boxes are fully recyclable and are designed to be PPWR compliant from the outset.

---

**Q:** Are paper mailers more sustainable than plastic poly mailers?

Yes. Paper mailers are fully recyclable, PFAS-free, and kerbside recyclable in most of the UK — making them a significantly more sustainable alternative to plastic poly mailers.

---

**Q:** Are paper mailers recyclable?

Yes. Paper mailers are fully recyclable and PFAS-free, making them a compliant alternative to plastic mailers.

---

**Q:** Are pulp mould inserts recyclable?

Yes. Pulp mould inserts are made from recycled paper fibre and are fully recyclable and compostable.

---

**Q:** Are rigid boxes recyclable?

Yes. Our rigid boxes use FSC-certified greyboard and are designed to meet recyclability requirements under PPWR.

---

**Q:** Can I get packaging with recycled content?

Yes. We can source packaging with post-consumer recycled content across several product categories to help meet PPWR recycled content minimums.

---

**Q:** Can Supplied help me understand my PPWR obligations?

Yes. We have strong working knowledge of PPWR and can advise on how it applies to your specific packaging formats and markets.

---

**Q:** Can inserts be made from sustainable materials?

Yes. Pulp mould and corrugated inserts are fully recyclable and widely used as sustainable alternatives to foam.

---

**Q:** Does PPWR apply to UK brands?

PPWR is EU legislation. The UK has its own Extended Producer Responsibility (EPR) scheme with similar objectives. If you sell into both markets, we can design packaging that satisfies both.

---

**Q:** Does Supplied offer FSC certified packaging?

Yes. FSC certified options are available across our full range, including mailer boxes, rigid boxes, shipping boxes, and paper-based products.

---

**Q:** Does Supplied offer FSC certified packaging?

Yes. FSC certified options are available across our full range, including mailer boxes, rigid boxes, shipping boxes, and paper-based products.

---

**Q:** Does Supplied offer mono-material packaging solutions?

Yes. Mono-material packaging — made from a single material type — is easier to recycle and increasingly preferred under PPWR. We can advise on mono-material options across our range.

---

**Q:** Does Supplied provide sustainability documentation?

Yes. We can provide FSC chain of custody documentation, material data sheets, and compliance declarations where required.

---

**Q:** How does Supplied approach packaging sustainability?

Sustainability is built into our sourcing criteria. We work with a vetted supplier network that meets FSC, PPWR, and PFAS-free standards, and we design packaging to fit products accurately to reduce waste.

---

**Q:** Is Supplied packaging PFAS-free?

Yes. Our packaging range is PFAS-free. PFAS are chemicals increasingly restricted under EU and UK regulation due to their environmental persistence.

---

**Q:** Is Supplied packaging PFAS-free?

Yes. Our packaging range is PFAS-free. PFAS are chemicals increasingly restricted under EU and UK regulation due to their environmental persistence.

---

**Q:** Is Supplied packaging PPWR compliant?

Yes. All packaging we design and supply is PPWR compliant from the outset — it's built into our sourcing and design process, not bolted on afterwards.

---

**Q:** Is Supplied packaging PPWR compliant?

Yes. All packaging we design and supply is PPWR compliant from the outset — it's built into our sourcing and design process, not bolted on afterwards.

---

**Q:** Is Supplied's packaging recyclable?

Yes. We offer a 100% recyclable range across all product categories, designed to meet current and incoming regulatory requirements.

---

**Q:** Is Supplied's packaging recyclable?

Yes. We offer a 100% recyclable range across all product categories, designed to meet current and incoming regulatory requirements.

---

**Q:** Is paper tape a sustainable option?

Yes. Paper tape is a fully recyclable alternative to plastic packing tape and fits within a sustainable packaging strategy.

---

**Q:** What does FSC certification mean?

FSC (Forest Stewardship Council) certification means the paper or board in your packaging comes from responsibly managed forests. It's a widely recognised mark of sustainable sourcing.

---

**Q:** What does PPWR mean for my packaging?

PPWR requires that your packaging meets recyclability thresholds, contains minimum levels of recycled content, uses standardised labelling, and avoids excessive void space. We design to all of these requirements as standard.

---

**Q:** What does kerbside recyclable mean?

Kerbside recyclable means the packaging can be collected in standard household recycling collections across most of the UK. It's the most accessible recyclability claim for consumers.

---

**Q:** What is EPR and does it affect my packaging?

EPR stands for Extended Producer Responsibility. In the UK it requires brands to report on and contribute to the end-of-life cost of their packaging. All packaging we supply is designed with EPR compliance in mind.

---

**Q:** What is PFAS and why does it matter for packaging?

PFAS are per- and polyfluoroalkyl substances used in some packaging coatings. They are increasingly restricted under EU and UK regulation due to environmental persistence. All our packaging is PFAS-free.

---

**Q:** What is PPWR?

PPWR stands for the EU Packaging and Packaging Waste Regulation. It sets mandatory requirements for recyclability, recycled content, and labelling across all packaging sold in the EU.

---

**Q:** What is PPWR?

PPWR stands for the EU Packaging and Packaging Waste Regulation. It sets mandatory requirements for recyclability, recycled content, and labelling across all packaging sold in the EU.

---

**Q:** What is a lifecycle assessment (LCA)?

A lifecycle assessment evaluates the environmental impact of a packaging product across its entire life — from raw material extraction through production, use, and end of life. It's used to compare the true sustainability of different packaging options.

---

**Q:** What is packaging lightweighting?

Lightweighting means reducing the material weight of packaging while maintaining structural performance. It reduces material costs, lowers carbon footprint, and is increasingly encouraged under PPWR.

---

**Q:** What is post-consumer recycled content (PCR)?

PCR refers to material that has been used by consumers and then recycled back into new packaging. It's the most valued form of recycled content under sustainability frameworks and regulations.

---

**Q:** What is the UK EPR scheme?

The UK EPR (Extended Producer Responsibility) scheme requires brands to take financial responsibility for the end-of-life management of their packaging. It has similar recyclability aims to the EU's PPWR.

---

**Q:** What is the difference between recyclable and compostable packaging?

Recyclable packaging can be processed through standard recycling streams and made into new materials. Compostable packaging breaks down biologically under specific conditions. Recyclable is more broadly accessible for consumers.

---

**Q:** What is the difference between recyclable and recycled content?

Recyclable means the packaging can be recycled at end of life. Recycled content means the packaging contains material that has already been recycled. PPWR requires both — we design to meet both requirements.

---

**Q:** What is the on-pack recycling label (OPRL)?

OPRL is the UK's standardised on-pack labelling scheme that tells consumers how to recycle packaging. Labels indicate whether packaging is widely recycled, check locally, or not yet recycled. We can advise on the correct OPRL label for your packaging.

---

**Q:** What is void space restriction under PPWR?

PPWR restricts excessive void space — the empty space inside packaging relative to the product. We engineer packaging to fit your product accurately, keeping void space to a minimum.

---

**Q:** What sustainable alternatives does Supplied offer to plastic packaging?

We offer paper mailers, paper tape, pulp mould inserts, and corrugated packaging as sustainable alternatives to plastic-based formats.

---

**Q:** When does PPWR come into force?

PPWR is being phased in from 2025, with key compliance milestones running through to 2030.

---

**Q:** When does PPWR come into force?

PPWR is being phased in from 2025, with key compliance milestones running through to 2030.

---

### Packaging Strategy (5)

**Q:** Can Supplied advise on packaging for a product rebrand?

Yes. Rebrands are a common trigger for a packaging review. We manage the transition from old to new packaging, coordinating stock rundown and new production to minimise waste and downtime.

---

**Q:** Can Supplied help me plan packaging for a new product launch?

Yes. We work with brands from pre-launch through to first delivery, managing structural design, sampling, production, and logistics to hit your go-live date.

---

**Q:** Can Supplied help me reduce the number of packaging suppliers I use?

Yes. Consolidating suppliers through Supplied is one of the most effective ways to reduce cost, complexity, and risk. We manage everything through a single relationship.

---

**Q:** What is a packaging strategy and why does my brand need one?

A packaging strategy defines the formats, materials, finishes, and supply chain approach that best serve your brand's commercial, sustainability, and customer experience goals. Without one, brands often overspend, under-deliver on unboxing, or find themselves non-compliant as regulations tighten.

---

**Q:** What is packaging consolidation?

Packaging consolidation means sourcing all your packaging through a single partner rather than managing multiple suppliers. It typically reduces cost, complexity, and risk.

---

### Industries (21)

**Q:** Can Supplied produce luxury beauty packaging?

Yes. Our rigid box range with soft-touch lamination, foil blocking, embossing, and spot UV is well suited to luxury and premium beauty brands.

---

**Q:** Can Supplied produce packaging for alcoholic beverage brands?

Yes. Printed cans, labels, and outer shipping cases are all available for spirits, wine, beer, and RTD brands. We advise on format based on your product and channel.

---

**Q:** Does Supplied work with beauty brands?

Yes. Beauty and cosmetics is one of our core sectors. We work with brands across skincare, haircare, bodycare, and cosmetics.

---

**Q:** Does Supplied work with fashion brands?

Yes. Fashion and apparel is one of the industries we serve, providing mailer boxes, paper mailers, tissue paper, and bags.

---

**Q:** Does Supplied work with food and drink brands?

Yes. We supply packaging to food producers, craft beverage brands, and DTC food businesses.

---

**Q:** Does Supplied work with health and wellness brands?

Yes. Health and wellness is one of our key sectors. We work with supplement brands, functional food companies, and wellness DTC brands.

---

**Q:** Does Supplied work with indie beauty brands?

Yes. Many of our beauty clients are independent brands building their packaging programme from scratch. Low MOQs and our consultancy approach make us well suited to indie and emerging brands.

---

**Q:** Does Supplied work with pet food brands?

Yes. We supply packaging to pet food and pet wellness brands across mailer boxes, pouches, labels, and shipping cases.

---

**Q:** Does Supplied work with sportswear or activewear brands?

Yes. Paper mailers and mailer boxes are the most common formats for fashion and activewear brands. Sustainable options are increasingly requested and fully available within our range.

---

**Q:** Does Supplied work with supplement brands?

Yes. Supplement brands are a key segment for us - pouches, mailer boxes, labels, and inserts are all commonly required and available within our range.

---

**Q:** Does Supplied work with tech and electronics brands?

Yes. Rigid boxes and custom foam or pulp mould inserts are widely used for tech accessories and electronics where product protection and unboxing presentation are both priorities.

---

**Q:** What packaging formats are common for jewellery brands?

Rigid boxes — particularly magnetic closure and drawer formats — are the most popular for jewellery. Velvet or foam inserts are often specified for product protection and premium presentation.

---

**Q:** What packaging formats are common in health and wellness?

Mailer boxes, shipping boxes, printed cans, pouches, labels, and inserts are all commonly used by our health and wellness clients.

---

**Q:** What packaging formats are popular for candle brands?

Rigid boxes with soft-touch lamination or foil blocking are popular for premium candle brands. Mailer boxes with tissue paper and inserts are used for DTC shipping.

---

**Q:** What packaging formats are popular in the beauty sector?

Rigid boxes, mailer boxes with full inside print, tissue paper, labels, and inserts are all widely used by beauty brands we work with.

---

**Q:** What packaging formats are used for gifting brands?

Gift sets typically use rigid boxes with printed interiors, tissue paper, branded ribbon or filler, and a thank you card. Advent calendar structures are also popular for seasonal gifting programmes.

---

**Q:** What packaging formats work best for skincare brands?

Rigid boxes and mailer boxes with full inside print are popular for skincare — they protect glass or tube formats and deliver a premium unboxing moment that matches the product positioning.

---

**Q:** What packaging is available for beverage brands?

We offer digitally printed aluminium cans from 1,000 units, with no plate charges, ideal for craft breweries, soft drink brands, and RTD producers.

---

**Q:** What packaging is used for home fragrance brands?

Rigid boxes, mailer boxes, tissue paper, and labels are all used by home fragrance brands. Inserts are important for fragile glass formats, we can support with various insert materials.

---

**Q:** Which beauty brands has Supplied worked with?

Our clients include Wild, Glow For It, and SURI, among others across the beauty and personal care sector.

---

**Q:** Which health and wellness brands has Supplied worked with?

Our clients include TRIP, Healf, and Sneak Energy, among others in the health and wellness space.

---

### Logistics (12)

**Q:** Can Supplied deliver directly to my 3PL or fulfilment centre?

Yes. We regularly deliver directly to 3PL and fulfilment centre addresses on behalf of our clients.

---

**Q:** Can Supplied manage urgent or expedited orders?

We will always explore options for urgent requirements. Share your deadline at the earliest opportunity and we'll advise on what's achievable.

---

**Q:** What causes packaging delays and how does Supplied mitigate them?

Common causes include material shortages, factory capacity constraints, freight delays, and customs holds. We mitigate these through early planning, multi-supplier sourcing, and proactive communication throughout the production and shipping process.

---

**Q:** What incoterms does Supplied work to?

We typically deliver on DDP (Delivered Duty Paid) terms, meaning all costs and risks are managed to your door. We'll confirm the applicable incoterms for your specific order.

---

**Q:** What is DDP delivery?

DDP (Delivered Duty Paid) means the supplier takes responsibility for all costs and risks — including import duties and customs clearance — until the goods arrive at the buyer's nominated address. This is our standard delivery term.

---

**Q:** What is a 3PL?

A 3PL (third-party logistics provider) manages warehousing and order fulfilment on behalf of brands. We integrate with 3PL delivery requirements, including labelling and pallet configuration.

---

**Q:** What is a bill of lading?

A bill of lading is the key shipping document for sea freight. It acts as a contract between shipper and carrier, a receipt of goods, and a title document. We manage all freight documentation on your behalf.

---

**Q:** What is a fulfilment centre?

A fulfilment centre is a third-party warehouse that stores products and dispatches orders on behalf of a brand. We deliver packaging directly to fulfilment centres on request.

---

**Q:** What is air freight and when is it used?

Air freight ships goods by plane and is significantly faster than sea — typically 3–7 days from most origins. It's used for urgent orders or high-value, low-volume shipments where speed outweighs the higher cost.

---

**Q:** What is lead time and how is it calculated?

Lead time is the total time from order confirmation to delivery. It includes production time, quality inspection, and freight transit. We confirm the total lead time for each order at the quoting stage.

---

**Q:** What is safety stock in packaging?

Safety stock is a buffer quantity of packaging held in reserve to cover unexpected demand spikes or supply delays. We advise clients on appropriate safety stock levels based on their order frequency and lead times.

---

**Q:** What is sea freight and when is it used?

Sea freight ships goods in containers by ocean. It's the most cost-effective option for large orders from the Far East or other distant suppliers, with typical transit times of 6-8 weeks depending on origin.

---

### Supplier Network (4)

**Q:** Does Supplied source from China?

Yes. We source from China for certain product categories where quality, capacity, and pricing make it the optimal choice. All China-based suppliers are fully vetted.

---

**Q:** Does Supplied use UK-based suppliers?

Yes. UK-based suppliers are part of our network and are used where lead time, minimum order, or client preference makes them the right choice.

---

**Q:** How many countries does Supplied source from?

We source from vetted suppliers across 12 countries globally.

---

**Q:** What are the advantages of European suppliers over Far East suppliers?

European suppliers typically offer shorter lead times, lower freight costs, easier communication, and reduced exposure to long-haul supply chain disruption. The trade-off is usually a higher unit cost at equivalent volumes.

---

### QA & Quality (3)

**Q:** Do I need to approve a pre-production sample before production starts?

Yes. We require client sign-off on pre-production samples before commencing the full production run. This protects both parties and ensures the finished product meets expectations.

---

**Q:** What is a pre-production sample?

A pre-production sample is a production-quality sample made before the full run commences. It allows you to check print, construction, and finish before committing to full production.

---

**Q:** What quality checks does Supplied carry out?

We carry out QA inspection at the factory before shipment, checking print quality, construction, dimensions, and finish against agreed specifications.

---

### Other (3)

**Q:** What is a telescopic rigid tube?

A telescopic box has a base and a separate lid where the lid slides over the base. It's a classic format widely used for cosmetics, candles, and health and wellness brands.

---

**Q:** Where do we ship to?

we can ship globally, using our network of over 60+ vetted suppliers, spanning 12 countries.

---

**Q:** how many vetted suppliers do you have?

We have 60+ vetted suppliers across 12 countries

---
