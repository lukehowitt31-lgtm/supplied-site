import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "rigid-boxes",
    slug: "rigid-boxes",
    name: "Custom Printed Rigid Boxes",
    categoryId: "boxes",
    shortDescription: "For Premium Brands",
    description: "Luxury rigid boxes designed and manufactured for health, beauty, and wellness brands. Magnetic closures, lift-off lids, and drawer styles — FSC certified and fully customisable from 500 units.",
    facts: [
      "Magnetic Closure Boxes",
      "Lift-Off Lid Boxes",
      "Drawer Boxes",
      "Hinged Boxes"
    ],
    features: [
      "Luxury Unboxing",
      "Premium Finishes",
      "Custom Inserts",
      "Sustainable Materials",
      "Global Manufacturing",
      "Transparent Pricing"
    ],
    specs: {
      materials: "1.5mm — 3mm greyboard",
      printOptions: "CMYK + Pantone, up to 8 colours",
      moq: "From 500 units",
      leadTime: "4–6 weeks from approval",
    },
    detailedSpecs: [
      { label: "Board Thickness", value: "1.5mm — 3mm greyboard" },
      { label: "Wrap Material", value: "Art paper, specialty, fabric" },
      { label: "Print", value: "CMYK + Pantone, up to 8 colours" },
      { label: "Finishes", value: "Foil, emboss, spot UV, soft-touch" },
      { label: "Inserts", value: "EVA foam, card, flocked, pulp" },
      { label: "MOQ", value: "From 500 units" },
      { label: "Sample Lead Time", value: "2–3 weeks" },
      { label: "Production", value: "4–6 weeks from approval" },
      { label: "Certification", value: "FSC® available" }
    ],
    image: "/images/logos/trip.svg",
    seo: {
      title: "Custom Printed Rigid Boxes UK | From 500 Units | Supplied",
      description: "Custom printed rigid boxes for premium brands. Magnetic closure, lift-off lid & drawer styles. FSC certified, from 500 units. Free samples & transparent pricing."
    },
    heroStats: [
      { val: "500", lbl: "Min Order Qty" },
      { val: "FSC®", lbl: "Certified Board" },
      { val: "3 wk", lbl: "Sample Lead Time" },
      { val: "100%", lbl: "Recyclable" }
    ],
    faqs: [
      {
        question: "What is the minimum order quantity for custom rigid boxes?",
        answer: "Our minimum order quantity for custom rigid boxes starts at 500 units. This allows us to keep tooling and setup costs per unit reasonable while giving smaller brands access to premium packaging. For larger volumes, unit costs reduce significantly — we'll always provide a transparent cost breakdown so you can see exactly where your budget goes."
      },
      {
        question: "How long does it take to produce custom rigid boxes?",
        answer: "From artwork approval, production typically takes 4–6 weeks. Before that, you'll receive physical samples within 2–3 weeks of briefing. The full timeline from initial brief to delivery is usually 8–10 weeks. We recommend starting the process early for seasonal launches or campaigns, and we'll create a detailed timeline at the outset so there are no surprises."
      },
      {
        question: "What types of rigid box styles are available?",
        answer: "We manufacture four main rigid box styles: magnetic closure (book-style with concealed magnets), lift-off lid (classic two-piece), drawer boxes (sliding tray with outer sleeve), and hinged boxes (one-piece with integrated hinge). Each style can be fully customised in terms of size, material, print, and finishing. We'll recommend the best style based on your product and budget."
      },
      {
        question: "Can rigid boxes be made from sustainable materials?",
        answer: "Yes. All our rigid boxes can be produced using FSC-certified board, recycled greyboard cores, and water-based inks. We also offer plastic-free finishing options including paper-based lamination. Our rigid boxes are 100% recyclable and PPWR compliant for brands selling into European markets. We'll help you meet sustainability requirements without compromising on the premium look and feel."
      },
      {
        question: "What finishes can I add to rigid boxes?",
        answer: "Available finishes include soft-touch lamination, gloss lamination, hot foil stamping (gold, silver, or custom colours), embossing, debossing, spot UV varnish, and metallic inks. You can combine multiple finishes on a single box — for example, soft-touch matte base with spot UV on your logo. We'll advise on which combinations work best for your brand and budget."
      },
      {
        question: "How much do custom rigid boxes cost?",
        answer: "Pricing depends on size, board thickness, print, finishes, inserts, and quantity. As a rough guide, a standard magnetic closure box with full-colour print and soft-touch lamination starts from around £3–5 per unit at 500 quantity, reducing significantly at higher volumes. We provide fully transparent quotes with line-by-line cost breakdowns — including tooling, materials, print, finishing, and freight."
      }
    ]
  },
  {
    id: "advent-calendars",
    slug: "advent-calendars",
    name: "Custom Advent Calendars",
    categoryId: "seasonal",
    shortDescription: "That Sell Out Every Year",
    description: "Bespoke printed advent calendars for beauty, wellness, and food brands. From structural design to fulfilment-ready delivery — fully managed by Supplied.",
    facts: [
      "Fully Custom Structures",
      "Show-Stopping Print",
      "Product-Specific Inserts",
      "Timeline Management"
    ],
    features: [
      "Fully Custom Structures",
      "Show-Stopping Print",
      "Product-Specific Inserts",
      "Timeline Management",
      "Sustainable Options",
      "Delivery to Fulfilment"
    ],
    specs: {
      materials: "Rigid board or folding carton",
      printOptions: "Litho or digital with foiling",
      moq: "500+ units",
      leadTime: "8-10 weeks",
    },
    detailedSpecs: [
      { label: "Structure", value: "12-door, 24-door, drawer, book-style" },
      { label: "Material", value: "FSC board, plastic-free inserts" },
      { label: "Print", value: "Litho or digital with foiling" },
      { label: "MOQ", value: "From 500 units" },
      { label: "Planning", value: "Start in Q2 (April-May)" },
      { label: "Delivery", value: "Packed & palletised for fulfilment" }
    ],
    image: "/images/logos/mrs-alice.svg",
    seo: {
      title: "Custom Advent Calendar Printing UK | Beauty & Wellness | Supplied",
      description: "Bespoke printed advent calendars for beauty, wellness & food brands. Fully custom structures, FSC certified, from 500 units. Start planning for 2026."
    },
    heroStats: [
      { val: "12–25", lbl: "Door Configs" },
      { val: "Q2", lbl: "Start Planning" },
      { val: "FSC®", lbl: "Materials" },
      { val: "500+", lbl: "Min Order" }
    ],
    faqs: [
      {
        question: "When should I start planning my advent calendar?",
        answer: "Ideally April–May. Advent calendars have the longest planning cycle in packaging. You need time for concept, structural design, sampling, and production before a September/October delivery. Brands that brief us in Q2 get the widest range of options for structures, finishes, and manufacturing slots. Leaving it until July significantly limits your options."
      },
      {
        question: "What's the minimum order for a custom advent calendar?",
        answer: "Typically from 500 units, depending on complexity. Simpler structures with fewer doors can sometimes be produced at lower quantities. We'll advise on the most cost-effective approach based on your budget and the level of customisation you need."
      },
      {
        question: "Can you create a fully bespoke calendar shape?",
        answer: "Absolutely. We've produced house-shaped calendars, tree shapes, brand-specific silhouettes, and more. Custom tooling is required for bespoke structures which adds to cost and lead time, but the result is a calendar that's completely unique to your brand and becomes a collectible piece."
      },
      {
        question: "What products can go inside an advent calendar?",
        answer: "Almost anything — beauty minis, wellness supplements, tea bags, chocolate, candles, skincare sachets. We design each cavity to the exact dimensions of your products, so everything fits securely. We can also mix cavity sizes within a single calendar to accommodate different product shapes and sizes."
      },
      {
        question: "How much does a custom advent calendar cost?",
        answer: "Pricing varies significantly based on size, number of doors, structure type, print, and finishes. A standard 24-door box-style calendar with full-colour litho print typically ranges from £5–15 per unit at 500+ quantity. Premium structures with foiling, magnetic closures, or bespoke shapes will be higher. We always provide fully itemised quotes so you see exactly where costs sit."
      }
    ]
  },
  {
    id: "tissue-paper",
    slug: "tissue-paper",
    name: "Custom Printed Tissue Paper",
    categoryId: "accessories",
    shortDescription: "For Branded Packaging",
    description: "Elevate your unboxing with custom printed tissue paper. Your logo, colours, and patterns printed on premium FSC-certified tissue — from 5,000 sheets.",
    facts: [
      "Full Custom Print",
      "Custom Sizes",
      "FSC & Acid-Free",
      "Flexible MOQs"
    ],
    features: [
      "Full Custom Print",
      "Custom Sizes",
      "FSC & Acid-Free",
      "Flexible MOQs",
      "Fast Turnaround",
      "Competitive Pricing"
    ],
    specs: {
      materials: "17gsm or 28gsm tissue paper",
      printOptions: "1-4 spot colours (Pantone)",
      moq: "5,000 sheets",
      leadTime: "3 weeks",
    },
    detailedSpecs: [
      { label: "Paper Weight", value: "17gsm (Standard) or 28gsm (Premium)" },
      { label: "Print", value: "1-4 Spot Colours (Pantone)" },
      { label: "Sheet Size", value: "Standard 500x750mm or Custom" },
      { label: "Material", value: "FSC® Certified, Acid-Free" },
      { label: "MOQ", value: "5,000 sheets" },
      { label: "Lead Time", value: "3-4 weeks" }
    ],
    image: "/images/logos/suri.png",
    seo: {
      title: "Custom Printed Tissue Paper UK | From 5,000 Sheets | Supplied",
      description: "Custom printed tissue paper for branded packaging. 1-4 colour print on FSC-certified 17gsm tissue. From 5,000 sheets with 3-week lead time."
    },
    heroStats: [
      { val: "1–4", lbl: "Colour Print" },
      { val: "17gsm", lbl: "Premium Weight" },
      { val: "FSC®", lbl: "Certified" },
      { val: "3 wk", lbl: "Lead Time" }
    ],
    faqs: [
      {
        question: "What's the minimum order for printed tissue paper?",
        answer: "Our minimum order starts at 5,000 sheets. This is a flexographic print minimum — the print plates need a reasonable run length to be cost-effective. At 5,000 sheets, you'll have enough to test the impact on your unboxing experience before committing to larger volumes."
      },
      {
        question: "How many colours can I print on tissue paper?",
        answer: "Up to 4 spot colours using Pantone matching. Tissue paper is printed using flexographic printing with water-based inks, which gives clean, sharp reproduction. For most brands, a 1 or 2 colour logo repeat is the most effective and cost-efficient option. We can also produce metallic ink effects for a more premium feel."
      },
      {
        question: "Is custom tissue paper recyclable?",
        answer: "Yes, 100%. Our tissue paper is made from FSC-certified wood pulp, printed with water-based inks, and is fully recyclable in standard household paper recycling. It's also acid-free, which means it won't discolour or damage products over time — important for beauty and wellness brands."
      },
      {
        question: "Can I get tissue paper cut to a custom size?",
        answer: "Absolutely. Standard sheets are 500x750mm, but we can cut to any size to match your specific box dimensions. Custom sizing reduces waste, speeds up your packing process, and gives a cleaner, more intentional look inside the box."
      },
      {
        question: "How much does custom tissue paper cost?",
        answer: "Pricing depends on quantity, number of print colours, and sheet size. As a guide, a single-colour logo print on 17gsm tissue at 10,000 sheets typically comes in at around 8–15p per sheet. Additional colours and custom sizing may adjust this. We always provide transparent, itemised quotes."
      }
    ]
  },
  {
    id: "packing-tape",
    slug: "packing-tape",
    name: "Custom Printed Paper Tape",
    categoryId: "accessories",
    shortDescription: "For Ecommerce Brands",
    description: "Plastic-free, fully recyclable branded tape. Your logo on every parcel — building brand recognition from the doorstep. From 72 rolls.",
    facts: [
      "Instant Recognition",
      "Plastic-Free",
      "Tamper-Evident",
      "Up to 3 Colours"
    ],
    features: [
      "Instant Recognition",
      "Plastic-Free",
      "Tamper-Evident",
      "Up to 3 Colours",
      "Low MOQ",
      "2–3 Week Lead"
    ],
    specs: {
      materials: "Kraft paper (White or Natural)",
      printOptions: "Flexo (1-3 colors)",
      moq: "72 rolls",
      leadTime: "2-3 weeks",
    },
    detailedSpecs: [
      { label: "Width", value: "48mm Standard" },
      { label: "Length", value: "50m per roll" },
      { label: "Material", value: "Kraft Paper (White or Natural)" },
      { label: "Adhesive", value: "Water-Activated or Self-Adhesive" },
      { label: "Print", value: "1-3 Spot Colours" },
      { label: "MOQ", value: "72 rolls" }
    ],
    image: "/images/logos/glowforit.svg",
    seo: {
      title: "Custom Printed Paper Tape UK | Plastic-Free | Supplied",
      description: "Custom printed paper tape for ecommerce brands. Plastic-free, recyclable, tamper-evident. From 72 rolls. Water-activated or self-adhesive options."
    },
    heroStats: [
      { val: "48mm", lbl: "Standard Width" },
      { val: "50m", lbl: "Per Roll" },
      { val: "1–3", lbl: "Colour Print" },
      { val: "0%", lbl: "Plastic" }
    ],
    faqs: [
      {
        question: "What's the difference between water-activated and self-adhesive paper tape?",
        answer: "Water-activated (gummed) tape requires a dispenser with a water unit — when the adhesive is moistened it forms a permanent bond with corrugated cardboard, making it tamper-evident and extremely secure. Self-adhesive paper tape works like regular tape (peel and stick) but uses a paper carrier instead of plastic. Water-activated is stronger and more secure; self-adhesive is easier to implement without new equipment."
      },
      {
        question: "Do I need a special dispenser for water-activated tape?",
        answer: "Yes, water-activated tape requires a gummed tape dispenser (manual or electric). These are widely available and a relatively small investment — typically £50–300 depending on volume. For self-adhesive paper tape, your existing tape gun works fine. We can advise on the best dispenser for your packing volumes."
      },
      {
        question: "Is printed paper tape really recyclable with the box?",
        answer: "Yes. Unlike plastic tape which must be removed before recycling, paper tape is made from the same material family as the corrugated box. It can go straight into curbside paper recycling without separation. This makes it far more convenient for your customers and genuinely more sustainable than any plastic alternative."
      },
      {
        question: "What's the minimum order for custom printed tape?",
        answer: "From 72 rolls (48mm x 50m). This keeps the barrier to entry low — enough for most small-to-medium ecommerce brands to get started. We hold your print plates on file so repeat orders are faster and require no additional setup costs."
      },
      {
        question: "How much does custom printed paper tape cost?",
        answer: "A single-colour print on 48mm kraft tape typically starts from around £3–5 per roll at minimum quantities, reducing with volume. There's a one-off plate charge for the first order (usually £50–100) which covers the flexographic printing plate. After that, repeat orders only pay for the tape itself."
      }
    ]
  },
  {
    id: "paper-mailers",
    slug: "paper-mailers",
    name: "Custom Printed Paper Mailers",
    categoryId: "mailers",
    shortDescription: "Digital & Flexo",
    description: "Sustainable, plastic-free paper mailers with full-colour digital or flexographic printing. The modern replacement for poly mailers.",
    facts: [
      "Digital Print",
      "Flexo Print",
      "Honeycomb Lining",
      "Custom Sizing"
    ],
    features: [
      "Digital Print",
      "Flexo Print",
      "Honeycomb Lining",
      "Custom Sizing",
      "Dual Seal Strip",
      "Curbside Recyclable"
    ],
    specs: {
      materials: "FSC Certified Kraft Paper",
      printOptions: "Digital (CMYK) or Flexo (Spot)",
      moq: "500 units (Digital)",
      leadTime: "3-4 weeks",
    },
    detailedSpecs: [
      { label: "Material", value: "FSC Certified Kraft Paper" },
      { label: "Print Methods", value: "Digital (CMYK) or Flexo (Spot)" },
      { label: "MOQ (Digital)", value: "500 units" },
      { label: "MOQ (Flexo)", value: "5,000 units" },
      { label: "Features", value: "Dual Seal Strip, Honeycomb Lining" },
      { label: "Sustainability", value: "Plastic-Free, Curbside Recyclable" }
    ],
    image: "/images/logos/glowforit.svg",
    seo: {
      title: "Custom Printed Paper Mailers UK | Digital & Flexo | Supplied",
      description: "Custom printed paper mailers with digital or flexo printing. Plastic-free, FSC certified, from 500 units. Sustainable alternative to poly mailers."
    },
    heroStats: [
      { val: "500", lbl: "Digital MOQ" },
      { val: "5K", lbl: "Flexo MOQ" },
      { val: "0%", lbl: "Plastic" },
      { val: "FSC®", lbl: "Certified" }
    ],
    faqs: [
      {
        question: "Should I choose digital or flexo printed paper mailers?",
        answer: "Digital printing is best for orders under 5,000 units, when you need full-colour photographic graphics, or when you want to run multiple design variants without plate costs. Flexo printing is more cost-effective at volumes above 5,000 and works well for clean logo-based designs in 1–3 spot colours. We'll always recommend the best option based on your volumes and design requirements."
      },
      {
        question: "Are paper mailers strong enough to replace poly mailers?",
        answer: "Yes — modern paper mailers are designed specifically to replace poly. Honeycomb-lined options provide excellent cushioning and impact protection. For lightweight items like clothing, accessories, and beauty products, standard paper mailers are more than sufficient. For heavier or more fragile items, we'd recommend padded variants or testing with a sample order first."
      },
      {
        question: "What sizes are available?",
        answer: "We stock over 10 standard sizes ranging from small (200x280mm) to large (400x500mm). Custom sizing is also available — we'll help you find the optimal size to reduce void space and minimise shipping costs while still protecting your product properly."
      },
      {
        question: "Can paper mailers have a returns seal strip?",
        answer: "Yes. Our paper mailers come with dual adhesive strips as standard — one for initial sealing and a second strip for easy returns. This is a must-have for ecommerce brands looking to improve the customer experience and simplify their returns process."
      },
      {
        question: "How much do custom paper mailers cost?",
        answer: "Digital printed paper mailers start from approximately 40–80p per unit at 500 quantity depending on size. Flexo printed mailers start from around 15–35p per unit at 5,000+. Padded/honeycomb options are slightly more. We provide full pricing breakdowns including any plate charges for flexo."
      }
    ]
  },
  {
    id: "shipping-boxes",
    slug: "shipping-boxes",
    name: "Printed Shipping Boxes",
    categoryId: "boxes",
    shortDescription: "0201 Flexo & Digital",
    description: "Custom branded 0201 shipping boxes with flexographic or digital printing. The ecommerce workhorse — now with your brand on the outside.",
    facts: [
      "Flexo (2,000+)",
      "Digital (Low MOQ)",
      "Custom Sizing",
      "Right Flute"
    ],
    features: [
      "Flexo (2,000+)",
      "Digital (Low MOQ)",
      "Custom Sizing",
      "Right Flute",
      "100% Recyclable",
      "Flat-Packed"
    ],
    specs: {
      materials: "Corrugated board (B, E, BC flute)",
      printOptions: "Flexo or Digital",
      moq: "250 units",
      leadTime: "3-4 weeks",
    },
    detailedSpecs: [
      { label: "Style", value: "FEFCO 0201 (RSC)" },
      { label: "Flute Options", value: "B, E, BC Double Wall" },
      { label: "Print Methods", value: "Flexo (Volume) or Digital (Short Run)" },
      { label: "MOQ", value: "250 (Digital) / 2,000 (Flexo)" },
      { label: "Sustainability", value: "100% Recyclable, FSC® Certified" },
      { label: "Delivery", value: "Flat-packed" }
    ],
    image: "/images/logos/polestar.svg",
    seo: {
      title: "Printed Shipping Boxes UK | 0201 Flexo & Digital | Supplied",
      description: "Custom printed 0201 shipping boxes. Flexo or digital print on corrugated. B, E & BC flute. FSC certified, PPWR compliant. From 250 units."
    },
    heroStats: [
      { val: "0201", lbl: "FEFCO Style" },
      { val: "B/E/BC", lbl: "Flute Options" },
      { val: "2", lbl: "Print Methods" },
      { val: "FSC®", lbl: "Certified" }
    ],
    faqs: [
      {
        question: "What is a 0201 shipping box?",
        answer: "A 0201 (also called RSC — Regular Slotted Container) is the most common shipping box style. It's a single piece of corrugated board with four flaps that fold to close the top and bottom. It's cost-effective to produce, ships flat for storage efficiency, and is suitable for the vast majority of ecommerce products. The FEFCO 0201 code is the international standard reference for this box style."
      },
      {
        question: "Which flute type should I choose?",
        answer: "E-flute (1.5mm) is thin and lightweight — ideal for lighter products and where storage space is limited. B-flute (3mm) offers good all-round protection for medium-weight items. BC double wall (6mm) is for heavier or fragile products requiring maximum strength. We'll recommend the right flute based on your product weight, fragility, and shipping conditions."
      },
      {
        question: "Can I print full colour on a shipping box?",
        answer: "Yes — with digital printing you can achieve full CMYK photo-quality graphics on corrugated. Flexo printing offers 1–3 spot colours which is ideal for logos, brand colours, and handling instructions. For most ecommerce brands, a clean 1–2 colour flexo print is the most cost-effective option that still delivers strong brand impact."
      },
      {
        question: "How does custom sizing save money?",
        answer: "Couriers charge based on either actual weight or dimensional (DIM) weight — whichever is greater. An oversized box means you pay for the air inside it. Custom-sized boxes also reduce the need for void fill materials, lower your material costs per box, and present a more professional unboxing experience. The savings on shipping alone often pay for the move to custom sizing."
      },
      {
        question: "What's the minimum order for printed shipping boxes?",
        answer: "For flexo printed boxes, MOQ is typically 2,000 units. For digitally printed boxes, we can go as low as 250–500 units. The right choice depends on your volumes and whether you need spot colour or full CMYK capability. We'll provide pricing for both methods so you can compare."
      }
    ]
  },
  {
    id: "mailer-boxes",
    slug: "mailer-boxes",
    name: "Custom Mailer Boxes",
    categoryId: "boxes",
    shortDescription: "For Ecommerce Brands",
    description: "Full-colour printed mailer boxes with inside and outside print. The packaging your customers actually see — designed to create unboxing moments that drive retention and shares.",
    facts: [
      "Inside & Outside Print",
      "Custom Sizing",
      "Premium Finishes",
      "Designed for Social"
    ],
    features: [
      "Inside & Outside Print",
      "Custom Sizing",
      "Premium Finishes",
      "Designed for Social",
      "Self-Locking Tabs",
      "FSC & Recyclable"
    ],
    specs: {
      materials: "E-Flute, B-Flute corrugated board",
      printOptions: "Digital, Offset, Flexo",
      moq: "250 units",
      leadTime: "3-4 weeks",
    },
    detailedSpecs: [
      { label: "Material", value: "E-Flute or B-Flute Corrugated" },
      { label: "Print", value: "CMYK Full Colour (Inside & Out)" },
      { label: "Finishes", value: "Gloss/Matte Lamination, Spot UV, Foiling" },
      { label: "MOQ", value: "250 units" },
      { label: "Assembly", value: "Self-locking (No tape needed)" },
      { label: "Sustainability", value: "FSC® Certified, Recyclable" }
    ],
    image: "/images/logos/wild.png",
    seo: {
      title: "Custom Mailer Boxes UK | Inside & Outside Print | Supplied",
      description: "Custom printed mailer boxes for ecommerce brands. Full colour inside & outside print, from 250 units. FSC certified, self-locking, designed for social sharing."
    },
    heroStats: [
      { val: "CMYK", lbl: "Full Colour" },
      { val: "In+Out", lbl: "Both Sides" },
      { val: "250", lbl: "Min Order" },
      { val: "E/B", lbl: "Flute" }
    ],
    faqs: [
      {
        question: "What's the difference between a mailer box and a shipping box?",
        answer: "A mailer box is what your customer sees — it's designed for the unboxing experience with tuck-in flaps, self-locking tabs, and full-colour print inside and out. A shipping box (0201) is the outer transit packaging designed primarily for protection. Many ecommerce brands use a mailer box as the primary packaging, or a mailer box inside a plain shipping box for extra protection on fragile products."
      },
      {
        question: "Can I print on both the inside and outside?",
        answer: "Yes — this is one of the key advantages of custom mailer boxes. Outside print handles brand recognition on the doorstep. Inside print creates the surprise and delight moment when the box is opened. We recommend using the inside for your brand story, social media handles, QR codes, or a thank-you message. The inside print is where the emotional connection happens."
      },
      {
        question: "What's the minimum order for custom mailer boxes?",
        answer: "From 250 units with digital printing. This makes custom mailer boxes accessible even for smaller brands or product launches. At higher volumes (2,000+) we can switch to litho-laminated production which reduces the unit cost significantly. We always price both options so you can choose based on your budget and volumes."
      },
      {
        question: "Do I need to use tape with a mailer box?",
        answer: "Not necessarily. Our mailer boxes feature self-locking tabs that hold the box closed without tape. For extra security in transit, you can add a branded paper tape seal which doubles as an additional branding touchpoint. The self-locking design speeds up your packing process significantly — no tape guns needed on the packing line."
      },
      {
        question: "How much do custom mailer boxes cost?",
        answer: "A digitally printed mailer box with full-colour inside and outside print typically starts from around £1.50–3.50 per unit at 250 quantity, depending on size and finishes. At 1,000+ units the cost drops noticeably, and at 5,000+ with litho production it reduces further. We provide fully transparent quotes with line-by-line breakdowns covering print, material, finishing, and delivery."
      }
    ]
  },
  {
    id: "printed-cans",
    slug: "printed-cans",
    name: "Digitally Printed Cans",
    categoryId: "retail",
    shortDescription: "For Beers & Beverages",
    description: "Short-run, digitally printed aluminium cans for craft breweries, RTD brands, and beverage startups. No labels, no sleeves — your brand printed directly on the can.",
    facts: [
      "Digital Direct Print",
      "Low MOQs",
      "Unlimited Designs",
      "Infinitely Recyclable"
    ],
    features: [
      "Digital Direct Print",
      "Low MOQs",
      "Unlimited Designs",
      "Infinitely Recyclable",
      "Beer, RTD, Soft Drinks",
      "3–4 Week Turnaround"
    ],
    specs: {
      materials: "Aluminium",
      printOptions: "Digital Direct Print",
      moq: "1000 units",
      leadTime: "3-4 weeks",
    },
    detailedSpecs: [
      { label: "Standard Sizes", value: "330ml Sleek, 330ml Standard, 440ml" },
      { label: "Material", value: "Aluminium (Food Grade)" },
      { label: "Print", value: "Digital Direct-to-Can (CMYK + White)" },
      { label: "MOQ", value: "1,000 - 5,000 units" },
      { label: "Sustainability", value: "Infinitely Recyclable" },
      { label: "Turnaround", value: "3-4 Weeks" }
    ],
    image: "/images/logos/sneak.png",
    seo: {
      title: "Digitally Printed Cans UK | Beer & Beverage Cans | Supplied",
      description: "Digitally printed aluminium cans for craft beer, RTD & beverages. Full CMYK direct-to-can print. Low MOQs, no labels, infinitely recyclable."
    },
    heroStats: [
      { val: "330ml", lbl: "Standard" },
      { val: "CMYK", lbl: "Full Colour" },
      { val: "♻️", lbl: "Infinitely Recyclable" },
      { val: "Low", lbl: "MOQs" }
    ],
    faqs: [
      {
        question: "What's the difference between digitally printed cans and labelled cans?",
        answer: "Digitally printed cans have the artwork printed directly onto the aluminium surface — there's no label or sleeve to peel, wrinkle, or come loose. The result is a seamless, premium finish that looks and feels like cans from major brands. Labelled or sleeved cans have a printed plastic wrap applied over a plain can — they're cheaper at very low volumes but look less professional and add plastic to the packaging."
      },
      {
        question: "What's the minimum order for digitally printed cans?",
        answer: "MOQs vary by supplier but typically start from around 1,000–5,000 cans per design. This is significantly lower than traditional litho-printed cans which usually require 50,000+ units. Digital printing makes it viable for craft breweries, startup beverage brands, and limited edition runs."
      },
      {
        question: "What sizes of can are available?",
        answer: "Standard sizes include 330ml sleek, 330ml standard, and 440ml. Some suppliers also offer 250ml slim cans and 500ml. The 330ml sleek is the most popular for craft beer, RTD cocktails, and premium soft drinks. We'll advise on the best size based on your product, market positioning, and filling requirements."
      },
      {
        question: "Do you handle can filling as well?",
        answer: "We supply the printed cans and can coordinate with your filling partner or recommend contract filling facilities through our partner network. Some of our manufacturing partners offer integrated print-and-fill services, which simplifies logistics and reduces handling. We'll recommend the best setup based on your volumes and location."
      },
      {
        question: "Are digitally printed cans food-safe?",
        answer: "Yes. All cans are produced from food-grade aluminium with internal food-safe coatings. The digital print is applied to the exterior surface only and is sealed with a protective overvarnish. All materials comply with EU food contact regulations. Certificates of compliance are available on request."
      }
    ]
  }
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === "all") return products;
  return products.filter((p) => p.categoryId === categoryId);
}

export const categories = [
  { id: "all", label: "All Products" },
  { id: "boxes", label: "Boxes" },
  { id: "mailers", label: "Mailers" },
  { id: "accessories", label: "Accessories" },
  { id: "retail", label: "Retail" },
  { id: "seasonal", label: "Seasonal" },
];
