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
const partnerCategories = [
  {
    id: "referral",
    label: "Referral & Agency Partners",
    description: "eCommerce agencies, consultants, and fulfilment partners who refer brands to Supplied for packaging solutions.",
    partners: [
      { name: "Partner 1", logo: null, type: "Agency" },
      { name: "Partner 2", logo: null, type: "Consultant" },
      { name: "Partner 3", logo: null, type: "Fulfilment" },
      { name: "Partner 4", logo: null, type: "Agency" },
    ]
  },
  {
    id: "technology",
    label: "Technology Partners",
    description: "Platforms and tools we integrate with to streamline ordering, design, and supply chain management.",
    partners: [
      { name: "Partner 5", logo: null, type: "Platform" },
      { name: "Partner 6", logo: null, type: "Design" },
      { name: "Partner 7", logo: null, type: "Supply Chain" },
      { name: "Partner 8", logo: null, type: "Analytics" },
    ]
  }
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
// LOGO PLACEHOLDER
// ══════════════════════════════════════
function PartnerLogo({ logo, name }: { logo: string | null; name: string }) {
  if (logo) {
    return <img src={logo} alt={name} className="max-h-9 max-w-[140px] object-contain" />;
  }
  return (
    <div className="flex items-center justify-center w-[140px] h-11 rounded-lg border-2 border-dashed border-supplied-amber/20 bg-supplied-amber/5">
      <span className="text-[11px] text-supplied-ink-40 font-medium">{name}</span>
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
                Agencies, platforms, and consultants who trust Supplied to look after their clients' packaging.
              </p>
            </Reveal>
          </div>

          {partnerCategories.map((cat, ci) => (
            <Reveal key={cat.id} delay={ci * 100} className={ci < partnerCategories.length - 1 ? "mb-12" : ""}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-supplied-amber opacity-40" />
                <span className="text-xs font-semibold tracking-[0.06em] uppercase text-supplied-amber">
                  {cat.label}
                </span>
              </div>
              <p className="text-sm text-supplied-ink-40 mb-6 max-w-[520px]">
                {cat.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 rounded-xl overflow-hidden bg-white/5 border border-white/5">
                {cat.partners.map((p, pi) => (
                  <div key={pi} className="bg-supplied-ink p-6 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:bg-white/[0.02] transition-colors duration-300">
                    <PartnerLogo logo={p.logo} name={p.name}/>
                    <span className="text-[10px] text-supplied-ink-40 font-medium tracking-[0.06em] uppercase">
                      {p.type}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
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
