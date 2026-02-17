import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section className="py-[120px] bg-white" id="svc-section">
      <Container>
        <Reveal className="text-center max-w-[600px] mx-auto mb-16">
          <Tag color="amber">What we do</Tag>
          <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] mt-4 mb-4 text-supplied-ink">
            End-to-end packaging, <em className="font-fraunces font-normal italic">handled</em>
          </h2>
          <p className="text-base text-supplied-ink-40 leading-[1.65]">
            From structural design to doorstep delivery — one accountable partnership across your entire packaging portfolio.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ServiceCard icon="✏️" title="Structural & Technical Design" desc="Custom dieline engineering, 3D mockups, and structural solutions that protect and elevate your brand." />
          <ServiceCard icon="🎨" title="Artwork & Pre-Press" desc="Print-ready artwork, colour management, and quality checks so your packaging looks exactly as intended." />
          <ServiceCard icon="🏭" title="Manufacturing & Sourcing" desc="30+ vetted global suppliers across corrugated, rigid, flexible, and speciality — matched to your brief and budget." />
          <ServiceCard icon="✅" title="QA & Compliance" desc="Factory audits, sample approvals, and PPWR/FSC sustainability compliance built into every project." />
          <ServiceCard icon="🚢" title="Logistics & Freight" desc="End-to-end freight, customs clearance, and warehousing — from factory floor to your fulfilment centre." />
          <ServiceCard icon="💡" title="Packaging Strategy" desc="Cost-reduction audits, material innovation workshops, and portfolio reviews to keep you ahead." />
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Reveal className="p-9 bg-white border border-supplied-ink-05 rounded-2xl transition-all duration-400 ease-supplied relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-supplied-lg hover:border-transparent">
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-supplied-amber transform scale-x-0 origin-left transition-transform duration-500 ease-supplied group-hover:scale-x-100" />
      <div className="w-12 h-12 rounded-xl bg-supplied-amber-10 flex items-center justify-center text-[22px] mb-5">
        {icon}
      </div>
      <h3 className="text-[17px] font-semibold mb-2 text-supplied-ink">{title}</h3>
      <p className="text-[13.5px] text-supplied-ink-40 leading-[1.6]">{desc}</p>
    </Reveal>
  );
}
