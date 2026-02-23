"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
export default function ContactPage() {
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
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
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
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] bg-[length:32px_32px] pointer-events-none" />
        <div className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(200,119,62,0.1)_0%,transparent_70%)] pointer-events-none" />

        <Container className="relative z-10 py-[100px] lg:py-[80px] text-center">
          <Reveal>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-supplied-amber/10 text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              Get in touch
            </div>
            <h1 className="font-fraunces text-[clamp(36px,5vw,56px)] font-medium text-white tracking-[-0.025em] leading-[1.12] mb-4">
              Let's talk <em className="font-fraunces italic text-supplied-amber">packaging</em>
            </h1>
            <p className="text-[17px] text-white/50 leading-[1.6] max-w-[480px] mx-auto">
              Whether you're exploring options or ready to start a project, we'd love to hear from you.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════ FORM + INFO ═══════════ */}
      <section className="bg-supplied-bg py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Form */}
            <Reveal>
              <div className="bg-white rounded-[20px] p-8 lg:p-12 border border-supplied-ink-05">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField label="Your name" name="name" placeholder="Full name" required />
                      <FormField label="Company" name="company" placeholder="Company name" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField label="Email" name="email" type="email" placeholder="you@company.com" required />
                      <FormField label="Phone" name="phone" type="tel" placeholder="Optional" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-[0.04em] uppercase text-supplied-ink mb-2">
                        What can we help with?
                      </label>
                      <div className="relative">
                        <select 
                          name="subject" 
                          className="w-full px-4 py-3.5 bg-supplied-bg border border-supplied-ink-10 rounded-[10px] text-supplied-ink text-sm font-sans outline-none appearance-none cursor-pointer focus:border-supplied-amber transition-colors"
                        >
                          <option value="">Select a topic...</option>
                          <option value="New packaging project">New packaging project</option>
                          <option value="Pricing enquiry">Pricing enquiry</option>
                          <option value="Samples request">Samples request</option>
                          <option value="Existing order query">Existing order query</option>
                          <option value="Partnership opportunity">Partnership opportunity</option>
                          <option value="General question">General question</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="#8A8A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 1.5L6 6.5L11 1.5"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-[0.04em] uppercase text-supplied-ink mb-2">
                        Message
                      </label>
                      <textarea 
                        name="message" 
                        rows={5} 
                        placeholder="Tell us about your project, products, or questions..." 
                        required 
                        className="w-full px-4 py-3.5 bg-supplied-bg border border-supplied-ink-10 rounded-[10px] text-supplied-ink text-sm font-sans outline-none resize-y leading-[1.6] focus:border-supplied-amber transition-colors"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={sending} 
                      className={`w-full py-4 bg-supplied-amber text-white rounded-[10px] text-[15px] font-semibold font-sans cursor-pointer transition-all duration-150 shadow-[0_2px_8px_rgba(200,119,62,0.2)] hover:-translate-y-0.5 ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {sending ? "Sending..." : "Send Message →"}
                    </button>

                    {error && (
                      <p className="text-[13px] text-[#E85454] text-center mt-3.5">{error}</p>
                    )}

                    <p className="text-xs text-supplied-ink-40 text-center mt-3.5">
                      We typically respond within a few hours during business days.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#4CAF7D]/10 mx-auto mb-5 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 14l5 5 9-9"/>
                      </svg>
                    </div>
                    <h3 className="font-fraunces text-2xl font-medium text-supplied-ink mb-2">
                      Message sent
                    </h3>
                    <p className="text-[15px] text-supplied-ink-60 leading-[1.6] max-w-[360px] mx-auto mb-6">
                      Thanks for getting in touch. Our team will get back to you shortly at the email address you provided.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="px-6 py-3 bg-supplied-bg border border-supplied-ink-10 rounded-lg text-[13px] font-semibold text-supplied-ink font-sans hover:bg-white transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Info sidebar */}
            <div className="flex flex-col gap-6">
              {/* Direct contact card */}
              <Reveal delay={100}>
                <div className="bg-supplied-ink rounded-2xl p-8 lg:p-9">
                  <h3 className="font-fraunces text-xl font-medium text-white mb-6">
                    Prefer to reach out directly?
                  </h3>

                  <div className="flex flex-col gap-5">
                    <ContactRow
                      icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="14" height="10" rx="1.5"/><path d="M2 4l7 5 7-5"/></svg>}
                      label="Email"
                      value="help@supplied.agency"
                      href="mailto:help@supplied.agency"
                    />
                    <ContactRow
                      icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 12.8v1.9a1.27 1.27 0 01-1.38 1.27 12.56 12.56 0 01-5.48-1.95 12.37 12.37 0 01-3.8-3.8A12.56 12.56 0 012.9 4.73 1.27 1.27 0 014.16 3.35h1.9a1.27 1.27 0 011.27 1.09 8.15 8.15 0 00.44 1.79 1.27 1.27 0 01-.29 1.34l-.8.8a10.16 10.16 0 003.8 3.8l.8-.8a1.27 1.27 0 011.34-.29 8.15 8.15 0 001.79.44 1.27 1.27 0 011.09 1.28z"/></svg>}
                      label="Phone"
                      value="+44 (0) 20 3355 3676"
                      href="tel:+442033553676"
                    />
                    <ContactRow
                      icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/><path d="M9 1.5C5.55 1.5 2.25 4.65 2.25 9c0 2.85 2.7 6.15 5.78 8.18a1.65 1.65 0 001.94 0C13.05 15.15 15.75 11.85 15.75 9c0-4.35-3.3-7.5-6.75-7.5z"/></svg>}
                      label="Office"
                      value="London / Warsaw"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Response time */}
              <Reveal delay={200}>
                <div className="bg-white rounded-2xl p-7 border border-supplied-ink-05">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF7D] shadow-[0_0_0_3px_rgba(76,175,125,0.15)]" />
                    <span className="text-[13px] font-semibold text-supplied-ink">Typically reply within 2 hours</span>
                  </div>
                  <p className="text-[13px] text-supplied-ink-40 leading-[1.55]">
                    Mon–Fri, 9am–6pm GMT. Urgent requests are flagged to the team immediately.
                  </p>
                </div>
              </Reveal>

              {/* Quick links */}
              <Reveal delay={300}>
                <div className="bg-white rounded-2xl p-7 border border-supplied-ink-05">
                  <h4 className="text-sm font-semibold text-supplied-ink mb-4">Quick links</h4>
                  <div className="flex flex-col">
                    {[
                      { label: "Browse our products", href: "/products" },
                      { label: "See client stories", href: "/client-stories" },
                      { label: "Knowledge Hub", href: "/knowledge-hub" },
                      { label: "Become a partner", href: "/partnerships" },
                    ].map((link, i) => (
                      <a 
                        key={i} 
                        href={link.href} 
                        className={`flex items-center justify-between py-2.5 no-underline group ${i < 3 ? 'border-b border-supplied-ink-05' : ''}`}
                      >
                        <span className="text-sm text-supplied-ink-60 group-hover:text-supplied-ink transition-colors">{link.label}</span>
                        <span className="text-sm text-supplied-amber transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ══════════════════════════════════════
// FORM FIELD COMPONENT
// ══════════════════════════════════════
function FormField({ label, name, type = "text", placeholder, required = false }: { label: string, name: string, type?: string, placeholder?: string, required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.04em] uppercase text-supplied-ink mb-2">
        {label}{required && <span className="text-supplied-amber ml-0.5">*</span>}
      </label>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        required={required} 
        className="w-full px-4 py-3.5 bg-supplied-bg border border-supplied-ink-10 rounded-[10px] text-supplied-ink text-sm font-sans outline-none focus:border-supplied-amber transition-colors placeholder:text-supplied-ink-20"
      />
    </div>
  );
}

// ══════════════════════════════════════
// CONTACT ROW COMPONENT
// ══════════════════════════════════════
function ContactRow({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) {
  const content = (
    <div className="flex items-center gap-3.5 group">
      <div className="w-10 h-10 rounded-[10px] bg-supplied-amber/10 flex items-center justify-center flex-shrink-0 text-supplied-amber group-hover:bg-supplied-amber group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <div className="text-[11px] text-supplied-ink-40 font-medium mb-0.5">{label}</div>
        <div className="text-sm text-white font-medium">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="no-underline block">{content}</a>;
  }
  return content;
}
