"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/ui/Container";
import { AccentHeading } from "@/components/ui/AccentHeading";
import Threads from "@/components/ui/Threads";
import { trackEvent } from "@/lib/analytics";
import { linkifyProducts } from "@/lib/linkifyProducts";
import {
  fallbackKnowledgeHubContent,
  type KnowledgeHubCategory,
  type KnowledgeHubPageContent,
} from "@/lib/content/knowledgeHub";
import type { Product } from "@/types";

const AMBER = "#C8773E";
const INK = "#1A1A1A";
const INK40 = "#8A8A8A";
const INK08 = "#EBEBEB";
const CREAM = "#FAF9F6";



const PRODUCT_OPTIONS = [
  "Mailer Boxes", "Rigid Boxes", "Shipping Boxes", "Paper Mailers",
  "Printed Cans", "Tissue Paper", "Paper Tape", "Labels & Stickers",
  "Advent Calendars", "Bags & Pouches", "Inserts & Fitments", "Not sure yet"
];

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8.5" cy="8.5" r="6"/><path d="M13 13l4.5 4.5"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9l14-7-7 14v-7H2z"/>
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
      <path d="M5 8l5 5 5-5"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v8M4.5 7.5L8 11l3.5-3.5"/><path d="M2 12v1.5a1 1 0 001 1h10a1 1 0 001-1V12"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5"/><path d="M1.5 4.5L8 9l6.5-4.5"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5L6.5 11.5 12.5 5"/>
    </svg>
  );
}

function FAQItem({ faq, color }: { faq: { q: string; a: string }; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${INK08}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 bg-transparent border-none cursor-pointer text-left gap-4">
        <span className="text-[15px] font-semibold text-supplied-ink leading-[1.4] flex-1">{faq.q}</span>
        <span style={{ color: open ? color : INK40 }} className="flex-shrink-0"><ChevronIcon open={open}/></span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0, overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s",
        opacity: open ? 1 : 0
      }}>
        <p className="text-sm text-supplied-ink-40 leading-[1.75] pb-6 max-w-[700px]">{linkifyProducts(faq.a)}</p>
      </div>
    </div>
  );
}

function CategorySection({ cat }: { cat: KnowledgeHubCategory }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg" style={{ background: cat.bg }}>{cat.icon}</span>
        <h3 className="text-xl font-bold tracking-[-0.01em]">{cat.label}</h3>
        <span className="text-[11px] font-semibold rounded-full px-2.5 py-0.5 ml-1" style={{ color: cat.color, background: cat.bg }}>{cat.faqs.length} questions</span>
      </div>
      <div className="ml-[52px]">
        {cat.faqs.map((faq, i) => (
          <div key={i} style={!expanded && i >= 4 ? { height: 0, overflow: "hidden", opacity: 0, position: "absolute", pointerEvents: "none" } : undefined}>
            <FAQItem faq={faq} color={cat.color}/>
          </div>
        ))}
        {cat.faqs.length > 4 && (
          <button onClick={() => setExpanded(!expanded)} className="bg-transparent border border-supplied-ink-10 rounded-lg px-5 py-2.5 text-[13px] font-semibold cursor-pointer mt-2 transition-all hover:brightness-105" style={{ color: cat.color }}>
            {expanded ? "Show less" : `Show all ${cat.faqs.length} questions`}
          </button>
        )}
      </div>
    </div>
  );
}

function generateChatPDF(messages: { role: string; text: string }[], lead: { name?: string; company?: string }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const nameStr = lead.name ? ` for ${lead.name}` : "";
  const companyStr = lead.company ? ` · ${lead.company}` : "";

  const chatHTML = messages.map(m => {
    if (m.role === "user") {
      return `<div style="margin-bottom:20px;"><div style="font-size:10px;font-weight:600;color:#C8773E;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">You</div><div style="background:#FAF9F6;border:1px solid #EBEBEB;border-radius:8px;padding:12px 16px;font-size:13px;line-height:1.7;color:#1A1A1A;">${m.text.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div></div>`;
    } else {
      return `<div style="margin-bottom:20px;"><div style="font-size:10px;font-weight:600;color:#C8773E;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Supplied</div><div style="background:#FFFFFF;border:1px solid #EBEBEB;border-radius:8px;padding:12px 16px;font-size:13px;line-height:1.7;color:#1A1A1A;">${m.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}</div></div>`;
    }
  }).join("");

  // The PDF print window uses its own font stack since it's a standalone document
  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>* { margin:0; padding:0; box-sizing:border-box; } body { font-family:system-ui,sans-serif; color:#1A1A1A; } @page { margin: 40px; }</style></head><body><div style="padding:0 0 40px;"><div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:20px;border-bottom:2px solid #1A1A1A;margin-bottom:32px;"><div><div style="font-size:22px;font-weight:700;letter-spacing:-0.02em;">supplied.</div><div style="font-size:11px;color:#8A8A8A;margin-top:2px;">Knowledge Hub</div></div><div style="text-align:right;"><div style="font-size:11px;color:#8A8A8A;">${dateStr} at ${timeStr}</div><div style="font-size:11px;color:#8A8A8A;">${messages.filter(m=>m.role==="user").length} questions · ${messages.filter(m=>m.role==="assistant").length} answers</div></div></div><div style="margin-bottom:28px;"><div style="font-size:18px;font-weight:700;letter-spacing:-0.01em;margin-bottom:4px;">Your Packaging Q&A Session${nameStr}</div><div style="font-size:13px;color:#8A8A8A;">Answers provided by Supplied's packaging knowledge base${companyStr}</div></div>${chatHTML}<div style="margin-top:40px;padding-top:20px;border-top:1px solid #EBEBEB;"><div style="font-size:12px;color:#8A8A8A;line-height:1.7;"><strong style="color:#1A1A1A;">Need more detail?</strong> Get in touch with our team for personalised advice and pricing.<br><span style="color:#C8773E;">suppliedpackaging.com/contact-us</span> · <span style="color:#C8773E;">hello@suppliedpackaging.com</span></div><div style="font-size:10px;color:#D9D9D9;margin-top:12px;">© ${now.getFullYear()} Supplied Agency Ltd. This document was generated from suppliedpackaging.com/knowledge-hub. Information is for guidance only — contact us for confirmed specifications and pricing.</div></div></div></body></html>`;

  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  }
}

function emailChatSession(messages: { role: string; text: string }[], lead: { name?: string; company?: string }, summary: string = "") {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const subject = encodeURIComponent(`Enquiry from Knowledge Hub - ${dateStr}`);

  let body = "Hi Supplied Team,\n\n";
  body += summary ? `${summary}\n\n` : "I've been using your Knowledge Hub and have some questions.\n\n";
  body += "[Please add any extra context here]\n\n";
  body += "Here is my chat session so far:\n\n";
  body += "--------------------------------------------------\n";
  body += `Supplied Knowledge Hub — ${dateStr}\n`;
  if (lead.name) body += `Prepared for: ${lead.name}${lead.company ? ` · ${lead.company}` : ""}\n`;
  body += "--------------------------------------------------\n\n";

  messages.forEach(m => {
    if (m.role === "user") {
      body += `ME:\n${m.text}\n\n`;
    } else {
      body += `SUPPLIED:\n${m.text}\n\n`;
      body += "──────────────────────────────\n\n";
    }
  });

  const encodedBody = encodeURIComponent(body);
  const mailtoUrl = `mailto:hello@suppliedpackaging.com?subject=${subject}&body=${encodedBody}`;

  if (mailtoUrl.length > 2000) {
    navigator.clipboard.writeText(body).then(() => {
      const fallbackBody = encodeURIComponent(`Hi Supplied Team,\n\n${summary || "I've been using your Knowledge Hub and have some questions."}\n\n[Please paste the chat transcript here - it has been copied to your clipboard]\n\n`);
      window.open(`mailto:hello@suppliedpackaging.com?subject=${subject}&body=${fallbackBody}`, "_blank");
    });
    return "copied";
  } else {
    window.open(mailtoUrl, "_blank");
    return "opened";
  }
}

export default function KnowledgeHub({ content, products = [] }: { content?: KnowledgeHubPageContent; products?: Product[] }) {
  const fallback = fallbackKnowledgeHubContent;
  const categories = content?.faqCategories?.length ? content.faqCategories : fallback.faqCategories;
  const heroHeadline = content?.heroHeadline || fallback.heroHeadline;
  const heroSubheadline = content?.heroSubheadline || fallback.heroSubheadline;
  const contactCtaHeading = content?.contactCtaHeading || fallback.contactCtaHeading;
  const contactCtaBody = content?.contactCtaBody || fallback.contactCtaBody;
  const contactEmail = content?.contactEmail || fallback.contactEmail;
  const allFaqs = categories.flatMap(cat =>
    cat.faqs.map(faq => ({ ...faq, category: cat.label, catId: cat.id, color: cat.color }))
  );
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadAction, setLeadAction] = useState<"pdf" | "email" | null>(null);
  const [leadData, setLeadData] = useState({ name: "", email: "", company: "", products: [] as string[] });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadErrors, setLeadErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let key = localStorage.getItem("supplied_hub_session");
    if (!key) {
      key = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("supplied_hub_session", key);
    }
    setSessionKey(key);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const handleAsk = async () => {
    const q = query.trim();
    if (!q || loading) return;
    setQuery("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.map(m => ({ role: m.role === "user" ? "user" : "assistant", text: m.text })), { role: "user", text: q }],
          sessionKey
        })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Chat request failed");
      }
      const data = await res.json();
      const answer = data.content?.map((b: { text?: string }) => b.text || "").join("") || "Sorry, I couldn't process that. Try asking another way.";
      setMessages(prev => [...prev, { role: "assistant", text: answer }]);
      trackEvent("knowledge_hub_question", { question: q.slice(0, 100) });
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Please try again or browse the FAQ sections below." }]);
    }
    setLoading(false);
  };

  const generateSummary = async (msgs: { role: string; text: string }[]) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...msgs.map(m => ({ role: m.role === "user" ? "user" : "assistant", text: m.text })), { role: "user", text: "Summarise what I asked about in one sentence starting with 'I asked about...'" }],
          sessionKey
        })
      });
      const data = await res.json();
      return data.content?.map((b: { text?: string }) => b.text || "").join("") || "I had some questions about packaging.";
    } catch {
      return "I had some questions about packaging.";
    }
  };

  const handleLeadSubmit = async () => {
    const errors: { name?: boolean; email?: boolean } = {};
    if (!leadData.name.trim()) errors.name = true;
    if (!leadData.email.trim() || !leadData.email.includes("@")) errors.email = true;
    if (Object.keys(errors).length > 0) { setLeadErrors(errors); return; }
    setLeadErrors({});
    setLeadSubmitted(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadData, chatSession: messages, sessionKey })
      });
    } catch { /* lead capture is best-effort */ }
    trackEvent("knowledge_hub_lead_submitted", { action: leadAction || "unknown", products: leadData.products.join(", ") });

    setTimeout(async () => {
      if (leadAction === "pdf") {
        generateChatPDF(messages, leadData);
        trackEvent("knowledge_hub_pdf_downloaded");
      } else {
        const summary = await generateSummary(messages);
        const result = emailChatSession(messages, leadData, summary);
        trackEvent("knowledge_hub_email_sent");
        if (result === "copied") setEmailStatus("copied");
        else setEmailStatus("sent");
        setTimeout(() => setEmailStatus(null), 3000);
      }
      setTimeout(() => { setShowLeadCapture(false); setLeadSubmitted(false); }, 600);
    }, 1200);
  };

  const toggleProduct = (p: string) => {
    setLeadData(prev => ({
      ...prev,
      products: prev.products.includes(p) ? prev.products.filter(x => x !== p) : [...prev.products, p]
    }));
  };

  const filteredCategories = categories
    .filter(cat => activeFilter === "all" || cat.id === activeFilter)
    .map(cat => ({
      ...cat,
      faqs: searchFilter
        ? cat.faqs.filter(f => f.q.toLowerCase().includes(searchFilter.toLowerCase()) || f.a.toLowerCase().includes(searchFilter.toLowerCase()))
        : cat.faqs
    }))
    .filter(cat => cat.faqs.length > 0);

  const totalFaqs = categories.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <div className="font-sans bg-supplied-bg min-h-screen text-supplied-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
      {/* HERO */}
      <div className="bg-supplied-ink text-white relative overflow-hidden pt-20">
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <Threads amplitude={1} distance={0} enableMouseInteraction={false} color="#C8773E" />
        </div>
        <Container className="relative z-10 py-[100px] lg:py-[120px] text-center">
          <div className="max-w-[700px] mx-auto">
            <div className="inline-flex items-center gap-2 mb-5">
              <Tag color="amber" pulse>Knowledge Hub</Tag>
            </div>
            <AccentHeading
              as="h1"
              text={heroHeadline || "Packaging |Knowledge Hub"}
              className="text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-4"
            />
            <p className="text-base text-white/55 leading-[1.7] max-w-[520px] mx-auto mb-9">
              {heroSubheadline}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5 max-w-[600px] mx-auto backdrop-blur-md">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAsk()}
                  placeholder="Ask a packaging question..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-[15px] px-4 py-3.5 font-sans caret-supplied-amber placeholder:text-white/40"
                />
                <button onClick={handleAsk} disabled={loading || !query.trim()} className={`bg-supplied-amber border-none rounded-[10px] w-11 h-11 flex items-center justify-center text-white flex-shrink-0 transition-opacity duration-200 ${loading || !query.trim() ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:bg-supplied-amber-deep'}`}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <SendIcon/>}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {["What are your MOQs?", "PPWR compliance", "Mailer box pricing", "Sustainable materials"].map(p => (
                <button key={p} onClick={() => { setQuery(p); setTimeout(() => inputRef.current?.focus(), 50); }} className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-white/50 cursor-pointer font-sans transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* CHAT MESSAGES */}
      {messages.length > 0 && (
        <div className="max-w-[700px] mx-auto px-8 pt-8">
          <div ref={chatRef} className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4.5 py-3.5 rounded-[14px] text-sm leading-[1.7] ${m.role === "user" ? "bg-supplied-amber text-white rounded-br-sm" : "bg-white text-supplied-ink border border-supplied-ink-10 rounded-bl-sm"}`}>
                  {m.role === "assistant" && <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-supplied-amber mb-1.5">Supplied</div>}
                  <div className="whitespace-pre-wrap">
                    {m.text.split(/(\*\*.*?\*\*)/g).map((part: string, j: number) =>
                      part.startsWith('**') && part.endsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-supplied-ink-10 rounded-[14px] rounded-bl-sm px-4.5 py-3.5 flex gap-1.5 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-supplied-ink-40 animate-dot-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Follow-up input */}
          <div className="mt-5">
            <div className="bg-white border border-supplied-ink-10 rounded-2xl p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2">
                <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAsk()} placeholder="Ask a follow-up question..." className="flex-1 bg-transparent border-none outline-none text-supplied-ink text-[15px] px-4 py-3.5 font-sans caret-supplied-amber placeholder:text-supplied-ink-40" />
                <button onClick={handleAsk} disabled={loading || !query.trim()} className={`bg-supplied-amber border-none rounded-[10px] w-11 h-11 flex items-center justify-center text-white flex-shrink-0 transition-opacity duration-200 ${loading || !query.trim() ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:bg-supplied-amber-deep'}`}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <SendIcon/>}
                </button>
              </div>
            </div>
          </div>

          {/* Save session toolbar */}
          {!loading && messages.filter(m => m.role === "assistant").length > 0 && (
            <div className="flex items-center justify-between flex-wrap gap-3 mt-5 p-4 bg-white border border-supplied-ink-10 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-[13px]">💬</span>
                <div>
                  <span className="text-[13px] font-semibold text-supplied-ink block">Save this session</span>
                  <span className="text-xs text-supplied-ink-40">{messages.filter(m => m.role === "user").length} questions · {messages.filter(m => m.role === "assistant").length} answers</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setLeadAction("pdf"); setShowLeadCapture(true); }} className="inline-flex items-center gap-1.5 bg-supplied-ink text-white border-none rounded-lg px-4 py-2.5 text-xs font-semibold cursor-pointer font-sans transition-all hover:bg-black">
                  <DownloadIcon/> Download PDF
                </button>
                <button onClick={() => { setLeadAction("email"); setShowLeadCapture(true); }} className="inline-flex items-center gap-1.5 bg-transparent text-supplied-ink border border-supplied-ink-10 rounded-lg px-4 py-2.5 text-xs font-semibold cursor-pointer font-sans transition-all hover:bg-supplied-ink-05">
                  {emailStatus ? <><CheckIcon/> {emailStatus === "copied" ? "Copied — paste into email" : "Opening email..."}</> : <><EmailIcon/> Email Supplied about this</>}
                </button>
              </div>
            </div>
          )}

          {/* Lead capture modal */}
          {showLeadCapture && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5">
              <div onClick={() => { if (!leadSubmitted) setShowLeadCapture(false); }} className="absolute inset-0 bg-supplied-ink/60 backdrop-blur-sm" />
              <div className="relative bg-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.2)] animate-slide-up">
                {leadSubmitted ? (
                  <div className="p-10 lg:p-14 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#E8F0EA] flex items-center justify-center mx-auto mb-5 text-2xl">✓</div>
                    <p className="text-xl font-bold mb-1.5">You&apos;re all set, {leadData.name.split(" ")[0]}!</p>
                    <p className="text-sm text-supplied-ink-40 leading-[1.6]">{leadAction === "pdf" ? "Your PDF is being generated now..." : "Opening your email client..."}</p>
                  </div>
                ) : (
                  <>
                    <div className="p-7 lg:px-8 lg:pt-7 lg:pb-5 border-b border-supplied-ink-10 flex items-start justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-supplied-amber mb-2">
                          <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                          {leadAction === "pdf" ? "Download PDF" : "Email Supplied"}
                        </div>
                        <p className="text-xl font-bold tracking-[-0.01em] leading-[1.2]">Quick details before we send</p>
                        <p className="text-[13px] text-supplied-ink-40 mt-1 leading-[1.5]">So we can personalise your document and follow up if you&apos;d like.</p>
                      </div>
                      <button onClick={() => setShowLeadCapture(false)} className="bg-transparent border-none cursor-pointer p-1 text-supplied-ink-40 text-xl leading-none hover:text-supplied-ink">×</button>
                    </div>
                    <div className="p-6 lg:p-8">
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-supplied-ink mb-1.5">Full name <span className="text-[#B85454]">*</span></label>
                        <input value={leadData.name} onChange={e => { setLeadData(prev => ({ ...prev, name: e.target.value })); setLeadErrors(prev => ({ ...prev, name: false })); }} placeholder="e.g. Sarah Mitchell" className={`w-full px-3.5 py-2.5 rounded-[10px] text-sm font-sans border outline-none transition-colors bg-supplied-bg ${leadErrors.name ? 'border-[#B85454]' : 'border-supplied-ink-10 focus:border-supplied-amber'}`} />
                        {leadErrors.name && <span className="text-[11px] text-[#B85454] mt-1 block">Please enter your name</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-supplied-ink mb-1.5">Email address <span className="text-[#B85454]">*</span></label>
                        <input type="email" value={leadData.email} onChange={e => { setLeadData(prev => ({ ...prev, email: e.target.value })); setLeadErrors(prev => ({ ...prev, email: false })); }} placeholder="e.g. sarah@yourbrand.com" className={`w-full px-3.5 py-2.5 rounded-[10px] text-sm font-sans border outline-none transition-colors bg-supplied-bg ${leadErrors.email ? 'border-[#B85454]' : 'border-supplied-ink-10 focus:border-supplied-amber'}`} />
                        {leadErrors.email && <span className="text-[11px] text-[#B85454] mt-1 block">Please enter a valid email</span>}
                      </div>
                      <div className="mb-5">
                        <label className="block text-xs font-semibold text-supplied-ink mb-1.5">Company / brand name</label>
                        <input value={leadData.company} onChange={e => setLeadData(prev => ({ ...prev, company: e.target.value }))} placeholder="e.g. Glow Skincare" className="w-full px-3.5 py-2.5 rounded-[10px] text-sm font-sans border border-supplied-ink-10 outline-none transition-colors bg-supplied-bg focus:border-supplied-amber" />
                      </div>
                      <div className="mb-7">
                        <label className="block text-xs font-semibold text-supplied-ink mb-2">Products you&apos;re interested in</label>
                        <div className="flex flex-wrap gap-1.5">
                          {PRODUCT_OPTIONS.map(p => {
                            const selected = leadData.products.includes(p);
                            return <button key={p} onClick={() => toggleProduct(p)} className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer font-sans transition-all border ${selected ? 'bg-supplied-amber text-white border-supplied-amber' : 'bg-transparent text-supplied-ink-40 border-supplied-ink-10 hover:border-supplied-amber/50'}`}>{p}</button>;
                          })}
                        </div>
                      </div>
                      <button onClick={handleLeadSubmit} className="w-full px-6 py-3.5 rounded-[10px] bg-supplied-ink text-white border-none text-sm font-semibold cursor-pointer font-sans flex items-center justify-center gap-2 transition-all hover:bg-black hover:-translate-y-0.5">
                        {leadAction === "pdf" ? <><DownloadIcon/> Download my Q&A</> : <><EmailIcon/> Send to my email</>}
                      </button>
                      <p className="text-[11px] text-supplied-ink-40 text-center mt-3 leading-[1.5]">We&apos;ll only use your details to follow up on your packaging enquiry. No spam, ever.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="border-b border-supplied-ink-10 mt-8" />
        </div>
      )}

      {/* FAQ SECTION */}
      <Container className="max-w-[900px] py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-[28px] font-bold tracking-[-0.02em]">Frequently Asked Questions</h2>
            <p className="text-sm text-supplied-ink-40 mt-1">{totalFaqs} answers across {categories.length} categories</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-supplied-ink-10 rounded-[10px] px-3.5 py-2 w-[260px]">
            <span className="text-supplied-ink-40"><SearchIcon/></span>
            <input value={searchFilter} onChange={e => setSearchFilter(e.target.value)} placeholder="Filter questions..." className="flex-1 border-none outline-none text-[13px] font-sans bg-transparent text-supplied-ink placeholder:text-supplied-ink-40" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-supplied-ink-10 pb-4">
          <button onClick={() => setActiveFilter("all")} className={`border rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer font-sans transition-all ${activeFilter === "all" ? 'bg-supplied-ink text-white border-supplied-ink' : 'bg-transparent text-supplied-ink-40 border-supplied-ink-10 hover:border-supplied-ink'}`}>All</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveFilter(cat.id)} className={`border rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer font-sans transition-all flex items-center gap-1.5 ${activeFilter === cat.id ? 'text-white' : 'bg-transparent text-supplied-ink-40 border-supplied-ink-10 hover:border-supplied-ink'}`} style={activeFilter === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}>
              <span className="text-sm">{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map(cat => <CategorySection key={cat.id} cat={cat}/>)
        ) : (
          <div className="text-center py-16 px-5 text-supplied-ink-40">
            <p className="text-base mb-2">No questions match your search.</p>
            <p className="text-sm">Try different keywords or ask your question using the AI search above.</p>
          </div>
        )}

        <div className="bg-supplied-ink rounded-2xl p-9 lg:p-10 flex items-center justify-between flex-wrap gap-5 mt-12">
          <div>
            <p className="text-white text-lg font-semibold mb-1">{contactCtaHeading}</p>
            <p className="text-white/50 text-sm">{contactCtaBody}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/contact-us" className="bg-supplied-amber text-white px-6 py-3 rounded-lg text-sm font-semibold no-underline inline-flex items-center gap-1.5 hover:bg-supplied-amber-deep transition-colors">Get in Touch <span>→</span></Link>
            <a href={`mailto:${contactEmail}`} className="bg-transparent text-white px-6 py-3 rounded-lg text-sm font-semibold no-underline inline-flex items-center gap-1.5 border border-white/15 hover:bg-white/10 transition-colors">{contactEmail}</a>
          </div>
        </div>
      </Container>

      {products.length > 0 && (
        <Container className="py-16">
          <div className="text-center mb-8">
            <Tag color="amber">Browse products</Tag>
            <h2 className="text-[22px] font-bold text-supplied-ink tracking-[-0.02em] mt-3">
              Explore our packaging range
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col items-center rounded-2xl overflow-hidden bg-white p-4 transition-shadow hover:shadow-lg border border-supplied-ink/5"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="text-[13px] font-semibold text-supplied-ink text-center group-hover:text-supplied-amber transition-colors">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
