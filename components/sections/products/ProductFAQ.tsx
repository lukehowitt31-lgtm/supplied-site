"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Product } from "@/types";

interface ProductFAQProps {
  product: Product;
}

export function ProductFAQ({ product }: ProductFAQProps) {
  if (!product.faqs || product.faqs.length === 0) return null;

  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <Reveal className="text-center max-w-[560px] mx-auto mb-14">
          <Tag color="amber">FAQ</Tag>
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3.5 text-supplied-ink">
            Common questions about <em className="font-fraunces font-normal italic">{product.name.toLowerCase()}</em>
          </h2>
          <p className="text-[15px] text-supplied-ink-40 leading-[1.65]">
            Everything you need to know before ordering custom {product.name.toLowerCase()}.
          </p>
        </Reveal>
        
        <div className="max-w-[800px] mx-auto flex flex-col gap-2">
          {product.faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Container>
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": product.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal className={`bg-white border border-supplied-ink-05 rounded-2xl overflow-hidden transition-all duration-300 ease-supplied hover:border-supplied-amber/12 ${isOpen ? 'border-supplied-amber/12' : ''}`}>
      <div 
        className="flex items-center justify-between p-6 cursor-pointer gap-4 hover:bg-supplied-ink-05 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[15px] font-semibold leading-[1.4] flex-1 text-supplied-ink">
          {question}
        </h3>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base font-semibold transition-all duration-350 ease-supplied ${
          isOpen ? "bg-supplied-amber text-white rotate-45" : "bg-supplied-amber-10 text-supplied-amber"
        }`}>
          +
        </div>
      </div>
      <div 
        className={`transition-all duration-400 ease-supplied overflow-hidden ${
          isOpen ? "max-h-[400px] pb-5 px-6" : "max-h-0"
        }`}
      >
        <p className="text-[14px] text-supplied-ink-40 leading-[1.7]">
          {answer}
        </p>
      </div>
    </Reveal>
  );
}
