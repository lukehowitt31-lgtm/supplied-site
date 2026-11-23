# Sanity MOQ changes

Source list for `npm run apply:moq`. The script defaults to a dry run and patches Sanity only with `--write`. It skips the two price answers below.

These four products are published documents. A filled Sanity field is what the product page renders. The code fallback in `lib/content/legacyProducts.ts` is used only when that field is empty, or when the Sanity fetch fails. `moqFrom` is not a Sanity field.

Agreed quantities:

| Product | Digital | Volume |
| --- | --- | --- |
| Mailer boxes | 500 | 1,000 litho, 3,000 flexo |
| Shipping boxes | Not offered | 1,000 flexo |
| Printed tubes | Not offered | 1,000 litho/offset |
| Printed cans | 1,000 | Not offered |

Paste the replacement over the current text. Leave every other product, and every field not listed here, as it is.

## Mailer boxes

Document `product.mailer-boxes`.

### `specs.moq`

Current:

```
5000 units
```

Replace with:

```
From 500 units digital, 1,000 litho, 3,000 flexo
```

### `detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL64v"]` label MOQ

Current:

```
500 units
```

Replace with:

```
500 digital, 1,000 litho, 3,000 flexo
```

### `heroStats[_key=="4WosXPXvlMgq3tPqrVL5mr"]`

Current value `From 500 Units`, label `MOQ`.

Replace value with:

```
500 / 1,000 / 3,000
```

Replace label with:

```
Digital / Litho / Flexo
```

### `seo.description`

Current:

```
Custom printed mailer boxes for ecommerce brands. Full colour inside & outside print, from 500 units. FSC certified, self-locking, designed for social sharing.
```

Replace with:

```
Custom printed mailer boxes for ecommerce brands. Full colour inside & outside print, from 500 units digital, 1,000 litho, 3,000 flexo. FSC certified, self-locking, designed for social sharing.
```

### `faqs[_key=="4WosXPXvlMgq3tPqrVL5u5"]` — What's the minimum order for custom mailer boxes?

Current:

```
From 500 units with digital printing. This makes custom mailer boxes accessible even for smaller brands or product launches. At higher volumes (2,000+) we can switch to litho-laminated production which reduces the unit cost significantly. We always price both options so you can choose based on your budget and volumes.
```

Replace with:

```
From 500 units with digital printing. Litho-laminated production starts at 1,000 units, and flexo at 3,000 units. We price each route so you can choose based on your budget and volumes.
```

### `faqs[_key=="4WosXPXvlMgq3tPqrVL5xh"]` — How much do custom mailer boxes cost?

`apply:moq` skips this answer.

Current:

```
A small large letter size box with digital print on the inside and outside of the box typically starts from around £1.50–3.50 per unit at 250 quantity, depending on size and finishes. At 2,000+ units the cost drops noticeably, and at 5,000+ with either Flexo or litho printing options, it reduces further. We provide fully transparent quotes with line-by-line breakdowns covering print, material, finishing, and delivery.
```

Replace with:

```
A small large letter size box with digital print on the inside and outside of the box typically starts from around £1–3 per unit at 500 units, depending on size and finishes. Litho starts at 1,000 units and flexo at 3,000 units. We provide fully transparent quotes with line-by-line breakdowns covering print, material, finishing, and delivery.
```

The £1–3 figure is the digital price at the 500-unit minimum. The old 2,000+ and 5,000+ bands are removed because those quantities are not the agreed minimums.

## Shipping boxes

Document `product.shipping-boxes`. Digital is not offered. Flexo starts at 1,000.

### `shortDescription`

Current:

```
Flexo & Digital Options
```

Replace with:

```
Flexo print
```

### `description`

Current:

```
Custom branded shipping boxes with flexographic or digital printing. The ecommerce workhorse, but now with your brand on the outside.
```

Replace with:

```
Custom branded shipping boxes with flexographic printing. The ecommerce workhorse, but now with your brand on the outside.
```

### `facts`

Current:

```
Flexo (2,000+)
Digital (Low MOQ)
Custom Sizing
Various Fluting Options
```

Replace with:

```
Flexo (1,000+)
Custom Sizing
Various Fluting Options
```

### `features[_key=="bcfbab87315b"]` — Flexo or Digital Print

Current title:

```
Flexo or Digital Print
```

Replace title with:

```
Flexo Print
```

Current body:

```
Spot colour flexo from 2,000 units. Full CMYK digital from 500 units. Pick the method that fits your volume and design.
```

Replace body with:

```
Spot colour flexo from 1,000 units.
```

### `heroStats[_key=="dsdzDBKQU3TOwM9o6kltLq"]`

Current value `2`, label `Print Methods`.

Replace value with:

```
Flexo
```

Replace label with:

```
Print method
```

### `seo.title`

Current:

```
Printed Shipping Boxes UK | 0201 Flexo & Digital | Supplied
```

Replace with:

```
Printed Shipping Boxes UK | 0201 Flexo | Supplied
```

### `seo.description`

Current:

```
Custom printed 0201 shipping boxes. Flexo or digital print on corrugated. B, E & BC flute. FSC certified, PPWR compliant. From 250 units.
```

Replace with:

```
Custom printed 0201 shipping boxes. Flexo print on corrugated. B, E & BC flute. FSC certified, PPWR compliant. From 1,000 units.
```

### `specs.moq`

Current:

```
1000 units
```

Replace with:

```
1,000 units (flexo)
```

### `specs.printOptions`

Current:

```
Flexo or Digital
```

Replace with:

```
Flexo
```

### `detailedSpecs[_key=="dsdzDBKQU3TOwM9o6klsg9"]` label Print Methods

Current:

```
Flexo (Volume) or Digital (Short Run)
```

Replace with:

```
Flexo
```

### `detailedSpecs[_key=="dsdzDBKQU3TOwM9o6klsjw"]` label MOQ

Current:

```
500 (Digital) / 2,000 (Flexo)
```

Replace with:

```
1,000 units (flexo)
```

### `faqs[_key=="dsdzDBKQU3TOwM9o6klt2t"]` — Can I print full colour on a shipping box?

Current:

```
Yes — with digital printing you can achieve full CMYK photo-quality graphics on corrugated. Flexo printing offers 1–3 spot colours which is ideal for logos, brand colours, and handling instructions. For most ecommerce brands, a clean 1–2 colour flexo print is the most cost-effective option that still delivers strong brand impact.
```

Replace with:

```
Flexo printing offers 1–3 spot colours, which is ideal for logos, brand colours, and handling instructions. We don't offer digital print on shipping boxes. For most ecommerce brands, a clean 1–2 colour flexo print is the most cost-effective option that still delivers strong brand impact.
```

### `faqs[_key=="dsdzDBKQU3TOwM9o6kltAT"]` — What's the minimum order for printed shipping boxes?

Current:

```
For flexo printed boxes, MOQ is typically 2,000 units. For digitally printed boxes, we can go as low as 500 units. The right choice depends on your volumes and whether you need spot colour or full CMYK capability. We'll provide pricing for both methods so you can compare.
```

Replace with:

```
Flexo printed shipping boxes start from 1,000 units. We don't offer a digital print route on shipping boxes.
```

## Printed tubes

Document `product.printed-tubes`. Digital is not offered. Litho/offset starts at 1,000. The detailed spec row `Print` is already `Offset / Litho (CMYK + Pantone)`. Leave it.

### `heroStats[_key=="4WosXPXvlMgq3tPqrVL3ib"]`

Current value `3K`, label `Min Order Qty`.

Replace value with:

```
1K
```

Leave the label.

### `detailedSpecs[_key=="4WosXPXvlMgq3tPqrVL3yr"]` label MOQ

Current:

```
From 3,000 units
```

Replace with:

```
From 1,000 units
```

`specs.moq` is already `1,000 units`. Leave it.

### `specs.printOptions`

Current:

```
Digital or Offset (CMYK + Pantone)
```

Replace with:

```
Offset / litho (CMYK + Pantone)
```

### `faqs[_key=="4WosXPXvlMgq3tPqrVL4F7"]` — What's the minimum order for custom printed tubes?

Current:

```
From 3,000 units per design. This is accessible for most wellness and supplement brands, whether you're launching a new SKU or transitioning from plastic. At higher volumes the unit cost reduces significantly. We provide fully itemised quotes covering tooling, materials, print, lining, and delivery.
```

Replace with:

```
From 1,000 units per design. This is accessible for most wellness and supplement brands, whether you're launching a new SKU or transitioning from plastic. At higher volumes the unit cost reduces significantly. We provide fully itemised quotes covering tooling, materials, print, lining, and delivery.
```

## Printed cans

Document `product.printed-cans`. Digital only, from 1,000. No litho or other volume route.

### `specs.moq`

Current:

```
1000 units
```

Replace with:

```
1,000 units
```

### `detailedSpecs[_key=="NUzgRk9h7jKjntS8pzpgws"]` label MOQ

Current:

```
1,000 - 5,000 units
```

Replace with:

```
1,000 units
```

### `heroStats[_key=="NUzgRk9h7jKjntS8pzph83"]`

Current value `Low`, label `MOQs`.

Replace value with:

```
1,000
```

Replace label with:

```
MOQ
```

### `faqs[_key=="NUzgRk9h7jKjntS8pzph0w"]` — What's the minimum order for digitally printed cans?

Current:

```
MOQs vary by supplier but typically start from around 1,000–5,000 cans per design. This is significantly lower than traditional litho-printed cans which usually require 50,000+ units. Digital printing makes it viable for craft breweries, startup beverage brands, and limited edition runs.
```

Replace with:

```
From 1,000 cans per design. Digital printing makes it viable for craft breweries, startup beverage brands, and limited edition runs.
```

### Feature titles

These six bodies are already real copy in Sanity. They are not the placeholder “Engineered for performance and aesthetics.” Do not replace the bodies from this list. Titles, if you want to write new body copy yourself:

1. Digital Direct Print
2. Low MOQs
3. Unlimited Designs
4. Infinitely Recyclable
5. Beer, RTD, Soft Drinks
6. 3–4 Week Turnaround

`Low MOQs` / `As low as 1,000 units` already matches the agreed minimum. Leave it unless you are writing new copy.

## Knowledge hub

Document `knowledgeHubPage`. This answer is what the hub renders. The code fallback is only used when the page has no FAQ categories.

### `faqCategories[_key=="rOv2v1AtN64guwYLFkM35o"].faqs[_key=="rOv2v1AtN64guwYLFkM3Ba"]` — What is the minimum order quantity (MOQ)?

Current:

```
MOQs vary by product. Digitally printed mailer boxes start from 500 units. Rigid boxes from 500 units. Paper mailers from 500 (digital) or 10,000 (flexo). Shipping boxes from 250 (digital) or 2,000 (flexo). Printed cans have low MOQs with no plate charges. Tissue paper from 5,000 sheets. Paper tape from 72 rolls.
```

Replace with:

```
MOQs vary by product. Mailer boxes start from 500 units digital, 1,000 litho, or 3,000 flexo. Rigid boxes from 500 units. Paper mailers from 500 (digital) or 10,000 (flexo). Shipping boxes from 1,000 units (flexo only). Printed tubes from 1,000 units (litho/offset). Printed cans from 1,000 units (digital only). Tissue paper from 5,000 sheets. Paper tape from 72 rolls.
```

Rigid boxes, paper mailers, tissue and tape are unchanged.

### `faqCategories[_key=="rOv2v1AtN64guwYLFkM4Fz"].faqs[_key=="rOv2v1AtN64guwYLFkM4Is"]` — How much do custom mailer boxes cost?

`apply:moq` skips this answer.

The question field is `How much do custom mailer boxes cost?`. Replace the answer only.

Current:

```
A standard full-colour digitally printed mailer box starts from around £1.50–3.00 per unit at 250 quantity, dropping significantly at higher volumes.
```

Replace with:

```
A standard full-colour digitally printed mailer box starts from around £1–3 per unit at 500 units, with litho from 1,000 units and flexo from 3,000 units.
```

The £1–3 figure is the digital price at the 500-unit minimum.
