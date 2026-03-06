"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ParticleNetwork } from "@/components/ui/ParticleNetwork";

// ══════════════════════════════════════
// PARTNER DATA
// ══════════════════════════════════════
const partners = [
  {
    id: "ifglobal",
    name: "IFGlobal",
    logo: "/images/logos/ifglobal.png",
    logoClass: "",
    category: "Ecommerce Fulfilment",
    website: "https://www.ifglobal.com",
    image: "/images/partners/ifglobal.png",
    description: "IFGlobal is a global ecommerce fulfilment partner with 20+ years of experience, providing adaptive fulfilment, growth consultancy, and smart technology across fulfilment centres in the UK, US, and EU. Their proprietary BladePRO software offers real-time order and inventory management, while their boutique, partner-led approach ensures every brand gets personalised support to scale — from pick, pack, and dispatch to returns management and bespoke packaging personalisation. Over 90% of their clients say they would recommend IFGlobal to other ecommerce brands.",
    highlights: ["UK, US & EU Fulfilment Centres", "Proprietary BladePRO Software", "20+ Years Experience", "90%+ Client Recommendation"],
  },
  {
    id: "blc",
    name: "Black Label Creations",
    logo: "/images/logos/blc.png",
    logoClass: "",
    category: "Private Label Supplement Manufacturing",
    website: "https://www.blacklabelcreations.com",
    image: "/images/partners/blc.png",
    description: "Black Label Creations is a full-service private label supplement manufacturing partner, helping ambitious brands create standout supplements from functional powders to RTDs and everything in between. With a purpose-built facility, ISO9001 accreditation, and audited manufacturing partners across the UK, USA, and EU, BLC supports brands from concept to shelf — including formulation, procurement, operations, quality control, and creative services.",
    highlights: ["Multi-Format Capabilities", "ISO9001 Accredited", "UK, USA & EU Manufacturing", "Concept to Shelf"],
  },
  {
    id: "ecc",
    name: "eCom Collab Club",
    logo: "/images/logos/ecomcollabclub.svg",
    logoClass: "",
    category: "eCommerce Community",
    website: "https://ecomcollabclub.com",
    image: "/images/partners/ecc.png",
    description: "eCom Collab Club brings together the people behind fast-growing ecommerce brands to share knowledge, collaborate, and build meaningful business relationships. Connecting founders, operators, and service providers across the DTC ecosystem, eCom Collab Club is the go-to community for brands looking to learn, grow, and partner with the right people.",
    highlights: ["DTC Founder Network", "Knowledge Sharing", "Business Collaboration", "Ecosystem Connections"],
  },
];

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11"/><path d="M14 9v5l3 3"/>
      </svg>
    ),
    title: "Revenue share",
    text: "Earn a recurring commission on every client you refer. No caps, no limits."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="20" height="16" rx="2"/><path d="M4 12h20"/><circle cx="9" cy="18" r="1.5"/><circle cx="14" cy="18" r="1.5"/>
      </svg>
    ),
    title: "Co-branded collateral",
    text: "Joint case studies, landing pages, and marketing assets to close deals together."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4l3 6h7l-5.5 4.5L20.5 22 14 17.5 7.5 22l2-7.5L4 10h7z"/>
      </svg>
    ),
    title: "Priority support",
    text: "Dedicated partner manager, fast-track sampling, and exclusive pricing for your clients."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14l4 4 8-8"/><rect x="3" y="3" width="22" height="22" rx="4"/>
      </svg>
    ),
    title: "Listed on our site",
    text: "Your logo and profile featured on our partnerships page, visible to every brand we work with."
  }
];

// ══════════════════════════════════════
// PARTNER CARD
// ══════════════════════════════════════
function PartnerCard({ partner, isOpen, onToggle }: { partner: typeof partners[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex flex-col items-center justify-center gap-4 p-8 min-h-[160px] transition-all duration-300 cursor-pointer border-0 bg-transparent relative group ${
        isOpen ? "bg-white/[0.04] ring-1 ring-supplied-amber/30" : "hover:bg-white/[0.02]"
      }`}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-12 max-w-[180px] object-contain"
        style={partner.logoClass ? { mixBlendMode: partner.logoClass as React.CSSProperties['mixBlendMode'] } : undefined}
      />
      <span className="text-[10px] text-supplied-ink-40 font-medium tracking-[0.08em] uppercase">
        {partner.category}
      </span>
      <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isOpen ? "bg-supplied-amber scale-100" : "bg-white/20 scale-0 group-hover:scale-100"}`} />
    </button>
  );
}

function PartnerProfile({ partner }: { partner: typeof partners[number] }) {
  return (
    <div className="p-8 md:p-10 bg-white/[0.02] border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-10 items-start">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-supplied-amber mb-3">{partner.category}</p>
          <h3 className="text-[22px] font-extrabold text-white mb-3 tracking-[-0.01em]">{partner.name}</h3>
          <p className="text-[15px] text-white/55 leading-[1.7] mb-6">{partner.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {partner.highlights.map((h, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-[11px] font-medium border border-supplied-amber/20 text-supplied-amber bg-supplied-amber/5">
                {h}
              </span>
            ))}
          </div>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-supplied-amber text-white rounded-lg text-[13px] font-semibold hover:bg-supplied-amber/90 transition-colors no-underline"
          >
            Visit Website
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 9l4-4M5 5h4v4"/>
            </svg>
          </a>
        </div>
        <div className="hidden lg:block rounded-xl overflow-hidden aspect-[3/2]">
          <img
            src={partner.image}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
export default function PartnershipsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePartner, setActivePartner] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      type: (form.elements.namedItem("type") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit application");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try emailing us directly at help@supplied.agency");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="font-sans bg-supplied-bg min-h-screen">
      
      {/* ═══════════ HERO ═══════════ */}
      <section className="bg-supplied-ink relative overflow-hidden pt-20">
        <ParticleNetwork id="tsparticles-hero" />
        
        {/* Diagonal accent */}
        <div className="absolute -top-[120px] -right-[80px] w-[500px] h-[500px] bg-[linear-gradient(135deg,rgba(200,119,62,0.15)_0%,transparent_60%)] rounded-full pointer-events-none" />

        <Container className="relative z-10 py-[100px] lg:py-[120px]">
          <div className="max-w-[680px]">
            <Reveal>
              <div className="mb-5">
                <Tag color="amber" pulse>Partnerships</Tag>
              </div>
              <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold text-white tracking-[-0.025em] leading-[1.12] mb-5">
                Grow with us.<br/>
                <em className="font-fraunces italic font-medium text-supplied-amber">Earn with us.</em>
              </h1>
              <p className="text-lg text-white/55 leading-[1.65] max-w-[520px] mb-9">
                We partner with eCommerce agencies, consultants, and technology platforms to deliver better packaging outcomes for fast-growing brands. Refer clients, earn revenue, build together.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="fill-amber" href="#become-partner" icon>
                  Become a Partner
                </Button>
                <Button variant="outline-light" href="#partners">
                  See Our Partners
                </Button>
              </div>
            </Reveal>

            {/* Stats strip */}
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-12 mt-16 pt-10 border-t border-white/10">
                {[
                  { value: "50+", label: "Brands served" },
                  { value: "23%", label: "Avg. client saving" },
                  { value: "98%", label: "On-time delivery" },
                  { value: "£0", label: "Cost to partner" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-[32px] font-medium text-supplied-amber tracking-[-0.02em] leading-none">
                      {s.value}
                    </div>
                    <div className="text-xs text-supplied-ink-40 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="bg-white py-20">
        <Container>
          <div className="text-center mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-3.5">
                <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                How it works
              </div>
              <h2 className=" text-[clamp(28px,3.5vw,40px)] font-extrabold text-supplied-ink tracking-[-0.02em] leading-[1.2]">
                Three steps to <em className="font-fraunces italic font-medium text-supplied-amber">partnership</em>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-supplied-ink-05 rounded-2xl overflow-hidden border border-supplied-ink-05">
            {[
              { step: "01", title: "Apply", desc: "Fill out a quick form telling us about your business and the brands you work with. We review every application within 48 hours." },
              { step: "02", title: "Onboard", desc: "Meet your dedicated partner manager, get access to co-branded assets, pricing sheets, and your referral tracking dashboard." },
              { step: "03", title: "Earn", desc: "Refer brands. We handle the packaging. You earn a recurring commission on every project — for the lifetime of the client." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className="bg-supplied-bg p-9 h-full relative group hover:bg-white transition-colors duration-300">
                  <div className="text-[64px] font-light text-supplied-amber/10 absolute top-5 right-7 leading-none select-none">
                    {s.step}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-supplied-amber flex items-center justify-center text-white font-bold text-base mb-5 relative z-10">
                    {s.step}
                  </div>
                  <h3 className=" text-2xl font-medium text-supplied-ink mb-3 tracking-[-0.01em] relative z-10">
                    {s.title}
                  </h3>
                  <p className="text-sm text-supplied-ink-60 leading-[1.65] relative z-10">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════ BENEFITS ═══════════ */}
      <section className="bg-supplied-bg py-20">
        <Container>
          <div className="text-center mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-3.5">
                <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                Partner benefits
              </div>
              <h2 className=" text-[clamp(28px,3.5vw,40px)] font-extrabold text-supplied-ink tracking-[-0.02em] leading-[1.2]">
                What you <em className="font-fraunces italic font-medium text-supplied-amber">get</em>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white rounded-[14px] p-7 border border-supplied-ink-05 hover:shadow-supplied-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-[52px] h-[52px] rounded-xl bg-supplied-amber/10 text-supplied-amber flex items-center justify-center mb-5">
                    {b.icon}
                  </div>
                  <h3 className=" text-lg font-medium text-supplied-ink mb-2 tracking-[-0.01em]">
                    {b.title}
                  </h3>
                  <p className="text-[13px] text-supplied-ink-60 leading-[1.6]">
                    {b.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════ CURRENT PARTNERS ═══════════ */}
      <section id="partners" className="bg-supplied-ink py-20">
        <Container>
          <div className="text-center mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-3.5">
                <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                Our Partners
              </div>
              <h2 className=" text-[clamp(28px,3.5vw,40px)] font-extrabold text-white tracking-[-0.02em] leading-[1.2] mb-3">
                Trusted by the <em className="font-fraunces italic font-medium text-supplied-amber">best</em>
              </h2>
              <p className="text-[15px] text-supplied-ink-40 max-w-[460px] mx-auto">
                Agencies, platforms, and consultants who trust Supplied to look after their clients&apos; packaging.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]">
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5`}>
                {partners.map((p) => (
                  <PartnerCard
                    key={p.id}
                    partner={p}
                    isOpen={activePartner === p.id}
                    onToggle={() => setActivePartner(activePartner === p.id ? null : p.id)}
                  />
                ))}
              </div>
              {activePartner && (
                <PartnerProfile partner={partners.find(p => p.id === activePartner)!} />
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════ BECOME A PARTNER CTA ═══════════ */}
      <section id="become-partner" className="bg-supplied-bg py-20">
        <Container>
          <Reveal>
            <div className="bg-supplied-ink rounded-[20px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[480px] relative">
              
              {/* Left: copy */}
              <div className="p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
                <ParticleNetwork id="tsparticles-cta" />
                <div className="relative z-10">
                  <h2 className=" text-[clamp(28px,3vw,38px)] font-medium text-white tracking-[-0.02em] leading-[1.2] mb-4">
                    Ready to <em className="font-fraunces italic font-medium text-supplied-amber">partner up</em>?
                  </h2>
                  <p className="text-[15px] text-white/50 leading-[1.65] mb-8 max-w-[380px]">
                    Whether you're an agency looking to add packaging to your offering, or a platform that wants to integrate — we'd love to hear from you.
                  </p>

                  <div className="flex flex-col gap-4">
                    {[
                      "No minimum referral volume",
                      "Dedicated partner manager from day one",
                      "Full co-branded marketing support",
                      "Transparent tracking and reporting"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-supplied-amber/15 flex items-center justify-center flex-shrink-0 text-supplied-amber">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 6l2.5 2.5 5-5"/>
                          </svg>
                        </div>
                        <span className="text-sm text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="p-10 lg:p-14 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center relative z-10">
                {!submitted ? (
                  <>
                    <h3 className=" text-[22px] font-medium text-white mb-7">
                      Apply to partner
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4.5">
                      {[
                        { label: "Your name", name: "name", placeholder: "Full name", type: "text" },
                        { label: "Company", name: "company", placeholder: "Company name", type: "text" },
                        { label: "Email", name: "email", placeholder: "you@company.com", type: "email" },
                        { label: "Website", name: "website", placeholder: "www.yourbrand.com", type: "text" },
                      ].map((field, i) => (
                        <div key={i}>
                          <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-supplied-ink-40 mb-1.5">
                            {field.label}
                          </label>
                          <input 
                            name={field.name}
                            type={field.type} 
                            placeholder={field.placeholder} 
                            required={field.name !== "website"}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-supplied-amber transition-colors"
                          />
                        </div>
                      ))}

                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-supplied-ink-40 mb-1.5">
                          Partnership type
                        </label>
                        <select name="type" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-supplied-ink-40 text-sm focus:outline-none focus:border-supplied-amber transition-colors appearance-none">
                          <option value="">Select type...</option>
                          <option value="referral">Referral / Agency</option>
                          <option value="technology">Technology / Integration</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <button 
                        type="submit" 
                        disabled={sending}
                        className={`w-full py-3.5 bg-supplied-amber text-white rounded-lg text-sm font-semibold hover:bg-supplied-amber-deep transition-colors mt-2 ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {sending ? "Submitting..." : "Submit Application →"}
                      </button>

                      {error && (
                        <p className="text-[11px] text-[#E85454] mt-3.5 text-center">{error}</p>
                      )}

                      <p className="text-[11px] text-supplied-ink-40 mt-3.5 text-center">
                        We'll review your application and respond within 48 hours.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#4CAF7D]/10 mx-auto mb-5 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 14l5 5 9-9"/>
                      </svg>
                    </div>
                    <h3 className=" text-2xl font-medium text-white mb-2">
                      Application Received
                    </h3>
                    <p className="text-[15px] text-white/60 leading-[1.6] max-w-[360px] mx-auto mb-6">
                      Thanks for applying to be a Supplied partner. We'll review your details and get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[13px] font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Submit another application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="bg-white py-20">
        <Container className="max-w-[740px]">
          <div className="text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-3.5">
                <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                FAQs
              </div>
              <h2 className=" text-[clamp(28px,3.5vw,36px)] font-extrabold text-supplied-ink tracking-[-0.02em]">
                Common questions
              </h2>
            </Reveal>
          </div>

          <div className="space-y-0">
            {[
              { q: "Who can become a partner?", a: "We work with eCommerce agencies, DTC consultants, fulfilment providers, and technology platforms. If you work with brands that need packaging, we want to talk." },
              { q: "How does the referral commission work?", a: "You earn a percentage of the revenue from every client you refer, paid monthly. Commission applies for the lifetime of the client relationship — not just the first order." },
              { q: "Is there a cost to join?", a: "No. The partnership programme is completely free. We provide all co-branded assets, a dedicated partner manager, and full onboarding at no cost." },
              { q: "What support do you provide?", a: "You'll get a named partner manager, co-branded collateral, joint case studies, priority sampling, and preferential pricing for your clients." },
              { q: "How quickly can you onboard a referred client?", a: "Typically within 48 hours of introduction. We'll have pricing and samples ready within a week, and first production within 4-6 weeks." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <FaqItem question={item.q} answer={item.a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

// ══════════════════════════════════════
// FAQ ACCORDION
// ══════════════════════════════════════
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-supplied-ink-10 py-5">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex items-center justify-between bg-none border-none cursor-pointer p-0 text-left group"
      >
        <span className="text-base font-medium text-supplied-ink leading-[1.4] group-hover:text-supplied-amber transition-colors">
          {question}
        </span>
        <span className={`text-xl text-supplied-amber font-light transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-sm text-supplied-ink-60 leading-[1.65] pt-3 pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}
