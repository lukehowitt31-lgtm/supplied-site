/**
 * Legacy blog body content as portable-text-compatible block arrays.
 *
 * Each entry mirrors the full article body scraped from suppliedpackaging.com.
 * When Sanity is populated these are unused — they exist only as fallback
 * data and to seed the CMS via the seed script.
 */

interface PortableTextSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

interface PortableTextBlock {
  _type: "block";
  _key: string;
  style: string;
  children: PortableTextSpan[];
  markDefs?: Array<{ _type: string; _key: string; href?: string }>;
}

let keyCounter = 0;
function k(): string {
  keyCounter += 1;
  return `k${keyCounter}`;
}

function p(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    children: [{ _type: "span", _key: k(), text, marks: [] }],
    markDefs: [],
  };
}

function h2(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: k(),
    style: "h2",
    children: [{ _type: "span", _key: k(), text, marks: [] }],
    markDefs: [],
  };
}

function h3(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: k(),
    style: "h3",
    children: [{ _type: "span", _key: k(), text, marks: [] }],
    markDefs: [],
  };
}

function linkedP(
  segments: Array<string | { text: string; href: string }>,
): PortableTextBlock {
  const markDefs: Array<{ _type: string; _key: string; href: string }> = [];
  const children: PortableTextSpan[] = [];

  for (const seg of segments) {
    if (typeof seg === "string") {
      children.push({ _type: "span", _key: k(), text: seg, marks: [] });
    } else {
      const linkKey = k();
      markDefs.push({ _type: "link", _key: linkKey, href: seg.href });
      children.push({
        _type: "span",
        _key: k(),
        text: seg.text,
        marks: [linkKey],
      });
    }
  }

  return { _type: "block", _key: k(), style: "normal", children, markDefs };
}

// ---------------------------------------------------------------------------
// Part 1: The Art of Smarter Packaging Design
// ---------------------------------------------------------------------------
const part1Body: PortableTextBlock[] = [
  p("This is the first in a five-part blog series called 25 Ways to Save Money on Packaging, published every Wednesday. Each week, we\u2019ll explore a different area of packaging strategy, from smarter design and efficient fulfilment to procurement hacks and logistics \u2013 all tailored to help brands like yours cut costs while maintaining a great customer experience."),

  h2("Blog 1: The Art of Smarter Packaging Design"),
  p("Packaging isn\u2019t just about looks. It\u2019s about efficiency, cost, and practicality. In this post, we dive into 10 clever strategies to reduce packaging spend through better design."),

  h3("1. Use fewer components"),
  linkedP([
    "Printed extras like booklets, product guides, and thank-you cards might seem small but they drive up costs in printing, assembly time, and materials. Every extra item that needs to be printed, sourced, and packed adds time and complexity to your fulfilment process. Streamlining these components or shifting them to digital via QR codes, onboarding emails, or printed messages inside the box, can significantly reduce overheads without losing the customer touch. ",
    { text: "Sonos did just that by digitising their legal insert, saving $640,000 annually and eliminating 200,000 pounds of printed paper.", href: "https://www.sonos.com/pdfs/policies/2019-sonos-responsibility-report.pdf" },
    " It\u2019s a win for the environment, and a major win for cost.",
  ]),

  h3("2. Ship less air"),
  linkedP([
    "Oversized packaging not only increases shipping costs but also creates a poor customer experience. Bulky boxes filled with void fill are frustrating to receive and inefficient to store and ship. Right-sizing your packaging helps reduce both material waste and shipping fees. ",
    { text: "IKEA halved the package size for its Ektorp sofa by redesigning it to be flat-packed", href: "https://www.ernestpackaging.com/buzz/world-of-packaging/why-ikea-loves-packaging-hates-air" },
    " \u2014 saving costs across storage, transport, and emissions. In the UK, brands like ",
    { text: "Trinny London use compact, tailored packaging for their stackable beauty products", href: "https://trinnylondon.com/uk/stacks" },
    ", ensuring every inch of space is used efficiently while still protecting the contents. Less air means less cost, and a lot less frustration for the end customer.",
  ]),

  h3("3. Reduce thickness and strength"),
  p("Packaging doesn\u2019t always need to be heavy-duty. For lighter items like clothing, cosmetics, or accessories, switching from double-walled corrugate to single-wall E-flute can cut costs significantly without affecting performance, or even a mailer bag. These thinner materials reduce both raw material usage and overall package weight, which means cheaper shipping and lower carbon impact. They also take up less space in storage and are easier to handle during fulfilment. The goal is to match strength to need and avoid over-engineering where it isn\u2019t necessary."),

  h3("4. Reduce product volume"),
  linkedP([
    "Smaller products lead to smaller packaging and lower costs across the board. If your product can be reformulated to be more concentrated, or redesigned to be flatter or modular, the packaging that surrounds it becomes instantly more efficient. Walmart saved massively by switching to concentrated detergent, shrinking the footprint and weight of each bottle. In the UK, ",
    { text: "Smol took this further with compact, letterbox-friendly laundry capsules", href: "https://smol.com/uk/mission" },
    " that reduce courier costs and eliminate the need for outer packaging entirely. Every centimetre you shave off product size reduces costs in materials, shipping, storage, and emissions.",
  ]),

  h3("5. Ready-to-ship SKUs"),
  linkedP([
    "Products that can ship in their own retail packaging remove the need for an extra outer carton, void fill, or branded mailer saving time and money on every order. These types of SKUs are ideal for letterbox deliveries or products already packaged to withstand shipping. Amazon\u2019s SIOC (Ships In Own Container) program encourages this approach by rewarding brands that qualify with reduced fees and faster processing. In the UK, ",
    { text: "Graze famously designed their snack boxes to slide straight through the letterbox", href: "https://www.packagingstrategies.com/blogs/14-packaging-strategies-blog/post/86956-graze-ships-a-new-snack-food-packaging-craze" },
    ", minimising material use, reducing courier costs, and simplifying the unboxing experience for customers.",
  ]),

  h3("6. Modular packaging"),
  p("Designing unique packaging for every product variation can quickly become expensive and inefficient. Modular packaging systems solve this by creating a set of standardised components like inserts, sleeves, or box sizes that can work across multiple SKUs. This approach simplifies production, reduces tooling costs, and makes inventory easier to manage. It also improves your forecasting accuracy and lets you scale more smoothly. Brands like Wild cut their packaging SKUs from 12 to 3, which not only saved money but also sped up their fulfilment process and reduced the chance of stock issues."),

  h3("7. Optimise for dimensional weight"),
  linkedP([
    "Shipping costs are often calculated based on dimensional weight \u2014 the amount of space a package takes up rather than its actual weight. This means even a lightweight product in an oversized box can be charged as if it were much heavier. To avoid unnecessary fees, review your packaging dimensions against your courier\u2019s pricing brackets. Carriers like Royal Mail, DPD and Evri each have specific thresholds that, if exceeded by just a few millimetres, can double your costs. Engineering packaging to stay within these limits not only saves money but also helps reduce emissions and storage space. ",
    { text: "View a useful guide to UK DIM pricing here", href: "https://www.packsize.co.uk/ebook/ready-for-the-new-dimensional-dim-weight-charges" },
    ".",
  ]),

  h3("8. Faster fulfilment"),
  p("When every second counts in your fulfilment process, smarter packaging makes all the difference to your operational efficiencies. Using crash-lock boxes with peel & seal can shave off up to 20\u201330 seconds per order versus standard 0427 mailer boxes, eliminating the need for tape or additional assembly time. The unit cost might be slightly higher. But the labour savings? Huge. Multiply that by hundreds of orders a day, and you\u2019re gaining hours of fulfilment time every single day, meaning significant labour savings. Less tape. Less time. More speed. It\u2019s packaging designed for rapid fulfilment growth."),

  h3("9. Use stock or semi-custom packaging"),
  p("Going fully bespoke with your packaging design can look great but the costs add up fast. Whenever possible, using stock or semi-custom options helps avoid tooling fees, reduces lead times, and offers more flexibility with suppliers. You can still make these solutions feel branded by adding sleeves, stickers, or printed tape. The key is focusing custom elements only where they truly add value \u2014 and letting the rest work harder for less."),

  h3("10. Reduce print coverage and colours"),
  linkedP([
    "Printing costs can scale quickly depending on how much surface area is printed and how many colours or effects are used. Flood printing, foils, UV varnishes, or even full bleed colour wraps often look great, but come with a price. By simplifying artwork, reducing ink coverage, and using fewer colours, brands can save significantly. A minimal design using kraft board or uncoated white with a single colour print can still feel premium while lowering both costs and environmental impact. Fussy is a great example \u2014 their packaging uses minimal print, clean lines, and recyclable materials, reinforcing their sustainable message while keeping costs down. (",
    { text: "Fussy Sustainability Page", href: "https://www.getfussy.com/pages/sustainability" },
    ") Less ink = more savings.",
  ]),

  p("That\u2019s your first 10 strategies \u2014 all focused on making your packaging design work harder and cost less. From right-sizing to reducing print, small tweaks can make a big difference across thousands of orders."),
  p("Next week, we\u2019re diving into the supply chain \u2014 everything from choosing local factories to cutting freight and storage costs. If you\u2019re serious about driving efficiency beyond the box, Part 2 is not to be missed."),
];

// ---------------------------------------------------------------------------
// Part 2: Smarter Supply Chain & Logistics
// ---------------------------------------------------------------------------
const part2Body: PortableTextBlock[] = [
  p("This is the second in a five-part blog series called 25 Ways to Save Money on Packaging, published every Wednesday. Each week, we\u2019ll explore a different area of packaging strategy, from smarter design and efficient fulfilment to procurement hacks and logistics \u2013 all tailored to help brands like yours cut costs while maintaining a great customer experience."),

  h2("Blog 2: Smarter Supply Chain & Logistics"),
  p("Packaging design is only part of the equation. What happens after your boxes are made, how they\u2019re shipped, stored, and fulfilled has just as much impact on cost. These next 5 strategies help you reduce spend through smarter supply chain thinking."),

  h3("11. Manufacture closer to home"),
  linkedP([
    "Sourcing packaging from overseas can seem cheaper at first glance, but the full landed cost often tells a different story. Factor in international freight charges, long lead times, customs delays, currency fluctuations, and import duties, and you might be paying more than you think. Manufacturing closer to your fulfilment centre not only reduces transport costs and emissions, but gives you better flexibility and responsiveness, especially when timelines are tight. It also makes quality control and communication easier, helping you avoid costly errors and last-minute fixes. In fact, over 90% of manufacturers have shifted some packaging procurement from overseas to domestic suppliers in recent years, a clear sign that local sourcing can drive efficiency and cost savings, according to a ",
    { text: "Packaging Digest report", href: "https://brownpackaging.com/why-u-s-companies-are-shifting-to-domestic-packaging-suppliers/" },
    ".",
  ]),

  h3("12. Avoid a complex supplier network"),
  linkedP([
    "Working with too many different packaging suppliers can lead to higher freight charges, complex inventory planning, and inconsistent lead times. While it may seem like spreading orders across vendors gives you flexibility, it often results in duplicated admin, inconsistent stock arrivals, and higher per-unit costs. ",
    { text: "At Supplied", href: "/about-us" },
    ", we follow a similar principle: by managing a complex, global packaging supplier network on behalf of our clients, we consolidate packaging needs into fewer, smarter shipments, simplifying operations, cutting freight costs, and helping brands avoid the chaos of juggling multiple vendors and deliveries.",
  ]),

  h3("13. Reduce packaging storage needs"),
  linkedP([
    "Packaging takes up valuable warehouse space \u2014 especially if you\u2019re storing large volumes of bulky boxes or pre-assembled items. That storage comes at a cost, either in rent or in limited capacity for other SKUs. Choosing flat-packed or nestable formats (like fold-flat cartons, tubes, or flexible pouches) allows you to fit more in less space and gives your team better control over inventory. You\u2019ll also reduce the number of deliveries required to restock, and avoid the last-minute panic of running out during peak. Furniture brand ",
    { text: "Flexsteel reduced its packaging storage footprint by 90%", href: "https://www.packsize.com/case-study/flexsteel" },
    " using on-demand, right-sized box making systems, dramatically lowering inventory costs.",
  ]),

  h3("14. Order in bulk and call off"),
  p("One of the biggest cost advantages comes not from what you order, but how you order it. Placing smaller, reactive orders leads to higher per-unit costs, emergency freight charges, and poor supplier leverage. Instead, forecast packaging needs quarterly or seasonally, and work with suppliers who can offer volume discounts. Even if you don\u2019t have the storage space, look for partners who can hold stock for you and deliver in batches, sometimes known as \u2018call-off\u2019 logistics. This lets you lock in pricing without cramming your warehouse. It\u2019s a balance of volume and flexibility that can result in serious cost savings without the operational burden."),

  h3("15. Plan for peak"),
  p("The busiest time of year is also the most expensive \u2014 especially if you haven\u2019t planned ahead. When you\u2019re forced to place last-minute packaging orders, you pay premium rates for production, freight, and sometimes storage. By forecasting your peak periods and building packaging orders into that plan early, you avoid the chaos and save significantly. You\u2019ll also give suppliers time to reserve capacity, maintain quality, and reduce the risk of delays \u2014 making the entire process smoother from start to ship."),

  p("These five strategies prove that supply chain tweaks, not just box design, can make a big difference. From smarter stock planning to better vendor choices, small adjustments behind the scenes often create the biggest impact."),
  p("In next week\u2019s blog, we\u2019ll explore how putting the customer first can actually help you save. From returns to reusables, Part 3 is all about savings through customer experience."),
];

// ---------------------------------------------------------------------------
// Part 3: Customer Experience That Saves
// ---------------------------------------------------------------------------
const part3Body: PortableTextBlock[] = [
  p("This is the third in a five-part blog series called 25 Ways to Save Money on Packaging, published every Wednesday. Each week, we\u2019ll explore a different area of packaging strategy, from smarter design and efficient fulfilment to procurement hacks and logistics \u2013 all tailored to help brands like yours cut costs while maintaining a great customer experience."),

  h2("Blog 3: Customer Experience That Saves"),
  p("Your customers care about packaging, but so should your ops team. When done right, a great unboxing experience can reduce returns, cut damage rates, and even lower total packaging spend. These next five ideas focus on putting your customers first in a way that also helps your bottom line."),

  h3("16. Design for returns"),
  linkedP([
    "Returns are a reality for most eCommerce brands, especially in fashion and beauty. Packaging that\u2019s not designed for two-way shipping often ends up damaged, scruffy or completely unusable. This results in unnecessary replacements, refunds, and customer dissatisfaction. A more effective option? Re-sealable mailers, dual-seal boxes, or peel & seal formats that customers can reuse for returns. These eliminate the need to include an additional bag or label, keep the experience simple, and show customers you\u2019re thinking ahead. ",
    { text: "Rental platform HURR uses RePack\u2019s reusable packaging to make returns simple and sustainable", href: "https://www.repack.com/case-studies/hurr-using-reusable-packaging-on-its-rental-platform-2" },
    ", reducing waste and the need for additional materials.",
  ]),

  h3("17. Reduce breakages with better inserts"),
  linkedP([
    "Fragile goods like glass bottles, candles or cosmetics often carry a high breakage risk leading to refunds, replacements, negative reviews, and brand damage. Relying on generic void fill might not be enough. Instead, investing in tailored inserts made from kraft, pulp, or die-cut corrugate provides form-fitting protection that cushions your product in transit. It can even replace plastic or foam void fill, helping with sustainability goals. Plus, inserts can guide the customer\u2019s unboxing experience and reduce confusion or handling errors. A great example is ",
    { text: "Fatty15, a D2C supplement brand that uses custom-designed inserts to secure their glass bottles during transit", href: "https://www.packworld.com/trends/ecommerce-d2c-packaging/article/21319324/subscription-d2c-supplement-brand-makes-sustainable-impression-at-unboxing" },
    ". Their packaging minimises movement inside the box and uses recyclable materials, ensuring products arrive intact while reinforcing their sustainability commitment.",
  ]),

  h3("18. Reinforce perceived value"),
  linkedP([
    "Customers form lasting impressions from their first unboxing and it often defines how much they feel your product is \u2018worth.\u2019 But elevating perceived value doesn\u2019t mean luxury-grade costs. You can achieve a premium feel through thoughtful design, such as interior print, consistent material textures, or clever box openings. Even a plain corrugate box with smart folding and a single branded sticker can feel polished and intentional. Beauty Pie creates a premium yet accessible experience by using ",
    { text: "branded tissue paper", href: "/products/tissue-paper" },
    ", carefully colour-matched packaging, and sleek box designs that feel luxurious without being overly extravagant. By focusing on consistency and neat presentation, you give customers confidence in your brand and increase retention without breaking the bank.",
  ]),

  h3("19. Avoid overpackaging"),
  linkedP([
    "Too much packaging isn\u2019t just wasteful \u2014 it\u2019s one of the top drivers of negative customer feedback. Whether it\u2019s a small item in a huge box or layers of unnecessary wrap, overpackaging frustrates customers and drives up shipping and material costs. By carefully sizing die-lines, using smarter structural design, and avoiding excess padding, brands can cut costs and boost sustainability. Abel & Cole, a UK organic grocery delivery brand, actively avoids unnecessary packaging with ",
    { text: "a \u201Czero pointless plastic\u201D policy", href: "https://www.abelandcole.co.uk/contentpage?folder=AboutUs&file=packaging-promise.htm" },
    ", cutting both waste and operational costs.",
  ]),

  h3("20. Tier your packaging by customer journey"),
  linkedP([
    "Not every order needs the full unboxing treatment. Many brands are adopting a two-tier packaging approach: a premium, branded experience for the first order and a more cost-effective, sustainable format for subsequent refills or repeat purchases. Think: ",
    { text: "rigid boxes", href: "/products/rigid-boxes" },
    " or ",
    { text: "tissue wraps", href: "/products/tissue-paper" },
    " for your first delivery, then a simpler ",
    { text: "recyclable mailer", href: "/products/paper-mailers" },
    " or ",
    { text: "pouch", href: "/products/paper-mailers" },
    " for top-ups. ",
    { text: "Wild, the refillable deodorant brand, exemplifies this perfectly", href: "https://wearewild.com/b/how-we-made-a-deodorant-for-life" },
    ", delivering a premium aluminium case with first orders, and minimal eco-friendly refill packs thereafter.",
  ]),

  p("Delivering an exceptional customer experience isn\u2019t just about building loyalty \u2014 it\u2019s a hidden lever for serious cost savings. Smarter returns, fewer breakages, cleaner unboxings, and sustainable refill strategies all cut waste and cost while elevating your brand."),
  p("Next week, we shift gears to the buying desk. Part 4 will dive into procurement: how to negotiate better deals, find hidden savings, and future-proof your packaging supply chain."),
];

// ---------------------------------------------------------------------------
// Part 4: Procurement That Works Harder
// ---------------------------------------------------------------------------
const part4Body: PortableTextBlock[] = [
  p("This is the fourth in a five-part blog series called 25 Ways to Save Money on Packaging, published every Wednesday. Each week, we\u2019ll explore a different area of packaging strategy, from smarter design and efficient fulfilment to procurement hacks and logistics \u2013 all tailored to help brands like yours cut costs while maintaining a great customer experience."),

  h2("Blog 4: Procurement That Works Harder"),
  p("Your packaging costs don\u2019t just come down to what you design or ship \u2014 they\u2019re also shaped by how (and where) you buy. From supplier selection to order strategy, this part of the process is often overlooked, but it\u2019s where some of the biggest savings can be unlocked."),

  h3("21. Get multiple quotes"),
  linkedP([
    "It\u2019s easy to stick with the same supplier out of habit, but that can mean missing out on better pricing, lead times, or service. Benchmarking your packaging costs once or twice a year gives you leverage and ensures you\u2019re still getting good value. ",
    { text: "At Supplied", href: "/about-us" },
    ", we do this for you constantly \u2014 cross-quoting through our network of trusted suppliers built over 30 years. This ensures you\u2019re getting the best price for the spec, without the admin.",
  ]),

  h3("22. Don\u2019t focus only on unit price"),
  linkedP([
    "The cheapest unit price doesn\u2019t always win. What matters is the total landed cost, including freight, storage, duties, and how well the packaging performs in fulfilment. Be mindful of shipping terms too \u2013 EXW (ExWorks) pricing may seem cheaper, but DAP (Delivered At Place) can reduce headaches and hidden fees. ",
    { text: "More about incoterms here", href: "https://www.dhl.com/gb-en/home/global-forwarding/freight-forwarding-education-center/incoterms-explained.html" },
    ". A box that costs 5p more but ",
    { text: "assembles 10 seconds faster", href: "/products/mailer-boxes" },
    " might be the better deal overall.",
  ]),

  h3("23. Forecast better, order smarter"),
  p("Reactive ordering leads to poor pricing, panic buying, and delays. The more accurate your forecasts, the more confidently you can order, which often unlocks better volume pricing or delivery terms. If you\u2019re launching new SKUs or promotions, include your packaging partners early. Sharing product roadmaps or marketing calendars can help suppliers prepare capacity, and in some cases, reserve raw material pricing in advance. We offer excellent call-off solutions with inclusive storage and material pre-ordering, meaning if you can forecast even a minimum 6-month window, we can help you capitalise on the best possible pricing."),

  h3("24. Consolidate your buying"),
  p("Buying tape from one supplier, cartons from another, and tissue from a third sounds flexible, but usually ends up more expensive. You lose bulk discounts, add multiple freight charges, and deal with more admin and stock tracking. Where possible, consolidate packaging spend with a single trusted partner who can provide all or most of what you need. Not only will it save money, it\u2019ll make your ops team\u2019s life easier too."),

  h3("25. Use a partner who can scale with you"),
  p("If your brand is growing, your packaging supplier needs to be able to keep up. Working with a partner who has global sourcing, stockholding options, and the ability to scale as you scale avoids costly disruptions down the line. A partner that offers flexibility \u2014 like storing materials, supporting multiple SKUs, or sourcing from multiple regions \u2014 ensures your costs stay competitive as you grow."),

  p("Procurement is where packaging costs are locked in \u2014 or lost. Getting smarter about who you work with, how you order, and what you measure can be the difference between average costs and best-in-class efficiency."),
  p("Next week is the final blog in the series. Part 5 will tie it all together, showing how packaging impacts your brand, your operations, and your bottom line. Don\u2019t miss the finale!"),
];

// ---------------------------------------------------------------------------
// Part 5: Bringing It All Together
// ---------------------------------------------------------------------------
const part5Body: PortableTextBlock[] = [
  p("We\u2019ve covered design. We\u2019ve tackled supply chain, customer experience, and procurement. Now it\u2019s time to zoom out and look at the big picture\u2026 how packaging influences your entire business. This final post isn\u2019t just about cutting costs \u2014 it\u2019s about how smart packaging supports growth, sustainability, brand trust, and better decision-making across your team."),
  p("This is the final part in a blog series called 25 Ways to Save Money on Packaging, published every Wednesday. Each week, we explored a different area of packaging strategy, from smarter design and efficient fulfilment to procurement hacks and logistics."),

  h2("Blog 5: Bringing It All Together"),

  h3("26. Treat packaging as a growth lever"),
  linkedP([
    "Packaging isn\u2019t just a cost centre \u2014 it\u2019s a core part of your customer journey. The right packaging can improve retention, boost referrals, and make your product more shareable. That leads to stronger lifetime value and better return on ad spend. In D2C especially, packaging is the one guaranteed physical brand touchpoint. When you nail it, you create moments that drive loyalty and advocacy. ",
    { text: "UK florist brand Bloom & Wild demonstrated this perfectly with their iconic letterbox flower mailer", href: "https://www.dlpmag.com/news/30539/ds-smith-helps-letterbox-flower-firm-bloom/" },
    ", a clever structural solution that made deliveries easier and set them apart from traditional florists, helping to fuel their growth.",
  ]),

  h3("27. Make sustainability a cost advantage"),
  linkedP([
    "Sustainability is no longer just a nice-to-have \u2014 it\u2019s becoming a cost advantage too. Lightweight materials, minimal designs, and paper-based alternatives don\u2019t just cut carbon \u2014 they often reduce freight, storage, and disposal fees. Aligning with eco-friendly standards can also unlock retailer partnerships, media coverage, and long-term brand value. IKEA has led the way on this, replacing foam with recyclable paper-based alternatives across its boxes. Not only did it reduce environmental impact, ",
    { text: "but it helped lower shipping volume and cost", href: "https://blog.allpack.uk.com/successful-brands-eco-friendly-packaging" },
    ".",
  ]),

  h3("28. Don\u2019t silo packaging"),
  linkedP([
    "Packaging affects multiple teams \u2013 from ops and procurement to brand, marketing, and finance. But too often, it\u2019s treated as an isolated function. The best results happen when it\u2019s planned cross-functionally: when the ops team informs timelines, brand sets the tone, and finance understands the ROI. REN Clean Skincare is a great example \u2014 they approached ",
    { text: "their zero-waste journey", href: "https://www.renskincare.co.uk/pages/zero-waste" },
    " by involving sustainability, product development, and marketing teams. Their cross-functional collaboration led to refillable formats and recycled ocean plastic packaging.",
  ]),

  h3("29. Get more from your supplier"),
  linkedP([
    "Your packaging supplier shouldn\u2019t just be a vendor \u2014 they should be a partner. Someone who understands your brand, your growth plans, and your operational pain points. ",
    { text: "At Supplied we work as an extension of your team", href: "/about-us" },
    ", from structural design and artwork management to sourcing, warehousing, and fulfilment. And we know when to push for a better price, when to recommend a format change, and when to just make it work fast.",
  ]),

  h3("30. Revisit your packaging regularly"),
  linkedP([
    "Too many brands set their packaging once and leave it untouched for years \u2014 even as their product range, customer expectations, and costs change. Reviewing every 6\u201312 months ensures you\u2019re not missing easy wins. Whether that\u2019s switching format, unlocking new pricing, or simplifying fulfilment, there\u2019s always something to improve. We\u2019ve seen brands save 20\u201330% just by auditing their current packaging and making a few key changes. A great example is Wild, ",
    { text: "who reduced their e-comm packaging SKUs from 12 to just 3", href: "https://www.sourceful.com/success-story/wild" },
    " by streamlining their design and working across brand, ops and supply chain.",
  ]),

  h2("Wrapping up the Series"),
  p("Packaging isn\u2019t just a box. It\u2019s a tool to reduce costs, delight customers, and support growth. Whether you\u2019re optimising design, simplifying fulfilment, or negotiating smarter, there\u2019s money on the table for every brand willing to look a little deeper."),
  p("We hope this five-part series gave you a few useful tools, ideas, or even just a nudge to take another look at how you\u2019re doing things."),
  p("And if you ever want a hand with it all, you know where to find us."),
];

// ---------------------------------------------------------------------------
// Spring Clean Your Packaging Supply Chain
// ---------------------------------------------------------------------------
const springCleanBody: PortableTextBlock[] = [
  p("As spring arrives, it\u2019s the perfect time to refresh your packaging supply chain. With summer launches ahead, addressing lead times and hidden issues now can make the difference between a smooth season and a scramble."),
  p("Early actions secure production slots and avoid delays. Small choices today can lead to significant savings later. Whether it\u2019s reviewing your current suppliers, auditing stock levels, or reassessing your packaging formats, now is the time to act."),
  p("Ready to enhance your packaging for a successful season? Get in touch and let\u2019s talk about how we can help you prepare."),
];

// ---------------------------------------------------------------------------
// Black Friday Deadlines
// ---------------------------------------------------------------------------
const blackFridayBody: PortableTextBlock[] = [
  p("If you\u2019re a brand that relies heavily on Black Friday and Christmas shopping patterns, this is probably the most stressful time of year. First, you\u2019ll need to somehow forecast your product needs and balance your cash flow. Maybe then you might start to think about forecasting your packaging needs."),
  p("We\u2019ve worked with several brands who work to the \u201CChristmas in July\u201D principle: planning and ordering in July to make sure you don\u2019t miss important lead time deadlines. The bad news is that we\u2019re at the tail end of August."),
  p("The good news is that when it comes to packaging, there\u2019s still time for you to get what you need. If we take Black Friday as the closer deadline, here\u2019s a rough guide to some order deadlines (assuming delivery to you by 22nd November):"),

  h3("Corrugated Mailer Boxes, Shipping Boxes, Cartonboard Boxes"),
  p("UK (Road): First Order \u2013 10th October | Reorder \u2013 17th October"),
  p("Europe (Road): First Order \u2013 3rd October | Reorder \u2013 10th October"),
  p("Asia (Air): First Order \u2013 3rd October | Reorder \u2013 10th October"),

  h3("Rigid Boxes"),
  p("UK (Road): First Order \u2013 10th October | Reorder \u2013 17th October"),
  p("Europe (Road): First Order \u2013 3rd October | Reorder \u2013 10th October"),
  p("Asia (Air): First Order \u2013 12th September | Reorder \u2013 19th September"),

  h3("Tissue Paper & Printed Collateral"),
  p("UK (Road): First Order \u2013 10th October | Reorder \u2013 17th October"),
  p("Europe (Road): First Order \u2013 10th October | Reorder \u2013 17th October"),

  h3("Paper Tubes"),
  p("Europe (Road): First Order \u2013 3rd October | Reorder \u2013 10th October"),
  p("Asia (Air): First Order \u2013 26th September | Reorder \u2013 26th September"),

  h3("Paper Mailers"),
  p("UK (Road): First Order \u2013 3rd October | Reorder \u2013 10th October"),
  p("Europe (Road): First Order \u2013 3rd October | Reorder \u2013 10th October"),

  h3("Poly Mailers & Poly Bubble Mailers"),
  p("Asia (Air): First Order \u2013 3rd October | Reorder \u2013 10th October"),

  h2("Other considerations"),
  p("These dates assume that artwork is ready to go and any sampling needs have been taken care of. We would always recommend giving yourself some comfort room for design:"),
  p("Artwork and design \u2013 minimum 1 week. Sampling (where possible) \u2013 3 weeks. Decision making \u2013 minimum 1 week. Higher quantities will require longer lead times (could be 2\u20133 weeks longer). For Christmas, add 2 weeks to the above table."),

  h2("Rush Orders"),
  linkedP([
    "We\u2019re sometimes able to accommodate rush orders depending on the complexity of the design and print. This might mean compromising on print process, materials, finish or using a stock size. ",
    { text: "Contact us", href: "/contact-us" },
    " to discuss your needs.",
  ]),
];

// ---------------------------------------------------------------------------
// Lookup map
// ---------------------------------------------------------------------------
const bodyBySlug: Record<string, unknown[]> = {
  "25-real-ways-to-cut-packaging-costs-part-1": part1Body,
  "25-real-ways-to-cut-packaging-costs-part-2": part2Body,
  "25-real-ways-to-cut-packaging-costs-part-3": part3Body,
  "25-real-ways-to-cut-packaging-costs-part-4": part4Body,
  "25-real-ways-to-cut-packaging-costs-part-5-final": part5Body,
  "spring-clean-your-packaging": springCleanBody,
  "black-friday-deadlines": blackFridayBody,
};

export function getLegacyBlogBody(slug: string): unknown[] | undefined {
  return bodyBySlug[slug];
}

export function getAllLegacyBlogBodies(): Record<string, unknown[]> {
  return bodyBySlug;
}
