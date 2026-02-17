import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Products() {
  const products = [
    { icon: "📦", title: "Mailer Boxes", desc: "Custom ecommerce mailers" },
    { icon: "🎁", title: "Rigid Boxes", desc: "Premium gift & retail" },
    { icon: "🧴", title: "Tubes", desc: "Card & composite tubes" },
    { icon: "📨", title: "Paper Mailers", desc: "Sustainable postal packaging" },
    { icon: "🏷️", title: "Labels & Stickers", desc: "Branded product labelling" },
    { icon: "📖", title: "Cards & Leaflets", desc: "Inserts, booklets & cards" },
    { icon: "🧻", title: "Tissue & Tape", desc: "Branded paper tape & tissue" },
    { icon: "👜", title: "Bags & Pouches", desc: "Cotton totes & sachets" },
    { icon: "📐", title: "Inserts", desc: "Protective inner fitments" },
    { icon: "🚚", title: "Shipping Boxes", desc: "Transit-ready outers" },
    { icon: "📋", title: "Cartonboard", desc: "Product & retail cartons" },
    { icon: "🎄", title: "Seasonal Projects", desc: "Advent calendars & more" },
  ];

  return (
    <section className="py-[120px] bg-supplied-bg" id="prod-section">
      <Container>
        <Reveal className="text-center max-w-[600px] mx-auto mb-16">
          <Tag color="amber">Our products</Tag>
          <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] mt-4 mb-4 text-supplied-ink">
            Everything your brand needs, <em className="font-fraunces font-normal italic">sourced</em>
          </h2>
          <p className="text-base text-supplied-ink-40 leading-[1.65]">
            One partnership, one invoice, one point of contact — across your entire packaging catalogue.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {products.map((p) => (
            <Reveal key={p.title} className="bg-white border border-supplied-ink-05 rounded-2xl p-7 text-center transition-all duration-350 ease-supplied hover:-translate-y-1 hover:shadow-supplied-md hover:border-supplied-amber/12">
              <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-supplied-amber-05 to-supplied-amber-10 mx-auto mb-3.5 flex items-center justify-center text-2xl">
                {p.icon}
              </div>
              <h4 className="text-sm font-semibold mb-1 text-supplied-ink">{p.title}</h4>
              <p className="text-[12.5px] text-supplied-ink-40">{p.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Button variant="fill-ink" href="https://supplied.agency/products/" target="_blank" icon>
            View Full Catalogue
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
