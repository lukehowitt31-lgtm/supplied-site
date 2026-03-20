"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Product, ProductFeatureCard } from "@/types";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductTabs } from "@/components/ui/ProductTabs";
import { AccentHeading } from "@/components/ui/AccentHeading";

const ProductModelViewer = dynamic(
  () =>
    import("@/components/ui/ProductModelViewer").then(
      (mod) => mod.ProductModelViewer
    ),
  { ssr: false }
);

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  tabProducts: Product[];
}

export function ProductDetail({
  product,
  relatedProducts,
  tabProducts,
}: ProductDetailProps) {
  const [show3D, setShow3D] = useState(false);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  const heroImage = product.catalogueImage || product.image;
  const featureCards: ProductFeatureCard[] = product.features.map((feature) =>
    typeof feature === "string"
      ? { title: feature, body: "Engineered for performance and aesthetics." }
      : {
          title: feature.title,
          body: feature.body || "Engineered for performance and aesthetics.",
          ...(feature.image ? { image: feature.image } : {}),
        }
  );

  return (
    <div className="bg-white">
      {/* Nav spacer + breadcrumbs + product tabs */}
      <div className="bg-supplied-ink pt-[80px]">
        <div className="pt-[40px] pb-4">
          <Breadcrumbs
            items={breadcrumbItems}
            className="text-white/60 !py-0"
          />
        </div>
        <ProductTabs products={tabProducts} />
      </div>

      {/* ─── 1. IMMERSIVE IMAGE HERO with optional 3D overlay ─── */}
      <section className="relative h-[70vh] min-h-[520px] max-h-[720px] overflow-hidden">
        {/* Photo background — fades to black when 3D is active */}
        <img
          src={heroImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${show3D ? "opacity-0" : "opacity-100"}`}
        />
        <div className={`absolute inset-0 transition-opacity duration-700 ${show3D ? "opacity-0" : "opacity-100"}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-supplied-ink via-supplied-ink/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-supplied-ink/60 via-transparent to-supplied-ink/30" />
        </div>

        {/* Black background for 3D mode */}
        <div className={`absolute inset-0 bg-supplied-ink transition-opacity duration-700 ${show3D ? "opacity-100" : "opacity-0"}`} />

        {/* 3D viewer — right side */}
        {product.modelUrl && (
          <div
            className={`absolute top-0 right-0 bottom-0 w-full lg:w-[55%] z-10 transition-opacity duration-700 ${
              show3D ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgba(232,121,28,0.1),transparent_60%)] pointer-events-none" />
            {show3D && (
              <div className="absolute inset-0">
                <ProductModelViewer url={product.modelUrl} />
              </div>
            )}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/30 text-[12px] font-medium tracking-wide pointer-events-none">
              Drag to rotate
            </div>
          </div>
        )}

        {/* Text content — always visible on the left */}
        <Container className="relative z-20 h-full flex flex-col justify-end pb-14">
          <div className="max-w-[560px]">
            <Tag color="amber" pulse className="mb-5">
              supplied.agency/{product.slug}
            </Tag>
            <h1 className="text-[clamp(36px,4.5vw,56px)] font-bold text-white leading-[1.06] tracking-[-0.03em] mb-4">
              {product.name}
            </h1>
            <p className="text-[16.5px] text-white/50 leading-[1.7] mb-8 max-w-[480px]">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="fill-amber" size="lg" href="/contact-us" icon>
                Get a Free Quote
              </Button>
              <Button variant="outline-light" size="lg" href="/contact-us">
                Request Samples
              </Button>
            </div>
          </div>

          {/* 3D toggle — positioned bottom-right */}
          {product.modelUrl && (
            <button
              onClick={() => setShow3D(!show3D)}
              className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center gap-2.5 px-5 py-3 rounded-full text-[13px] font-semibold transition-all duration-300 backdrop-blur-md border z-30 ${
                show3D
                  ? "bg-white text-supplied-ink border-white/80 hover:bg-white/90"
                  : "bg-white/10 text-white border-white/15 hover:bg-white/20 hover:border-white/30"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              {show3D ? "Close 3D" : "View in 3D"}
            </button>
          )}
        </Container>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-supplied-ink border-t border-white/10">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {product.heroStats.map((stat, i) => (
              <div key={i} className="py-7 px-6 text-center">
                <div className="text-[28px] font-extrabold bg-gradient-to-br from-supplied-amber-bright to-supplied-amber bg-clip-text text-transparent leading-none mb-1">
                  {stat.val}
                </div>
                <div className="text-[10px] text-white/35 uppercase tracking-[1.2px] font-medium">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 3. PRODUCT SHOWCASE — image + key info ─── */}
      <section className="py-[80px] bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#F5F3F0]">
                <img
                  src={product.showcaseImage || heroImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal>
              <div>
                <Tag color="amber">Why {product.name.toLowerCase()}</Tag>
                <AccentHeading
                  as="h2"
                  text={product.showcaseHeading ?? "Premium packaging that [[commands]] attention"}
                  className="text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] mt-4 mb-4 text-supplied-ink"
                  accentClassName="text-supplied-amber"
                />
                <p className="text-[15px] text-supplied-ink-40 leading-[1.7] mb-8">
                  {product.shortDescription || product.description}
                </p>

                <div className="flex flex-col gap-3">
                  {product.facts.map((fact, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-center p-4 bg-supplied-bg border border-supplied-ink-05 rounded-2xl transition-all duration-300 hover:border-supplied-amber/15"
                    >
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-supplied-amber" />
                      <span className="text-sm font-semibold text-supplied-ink">
                        {fact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── 4. FEATURES GRID ─── */}
      <section className="py-[100px] bg-white">
        <Container>
          <Reveal className="text-center max-w-[580px] mx-auto mb-14">
            <Tag color="amber">Features</Tag>
            <AccentHeading
              as="h2"
              text={product.featuresHeading ?? "Everything you need, [[nothing]] you don't"}
              className="text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3.5 text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feature, i) => (
              <Reveal key={i}>
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 5. FULL-WIDTH IMAGE BREAK ─── */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[640px] overflow-hidden">
        <img
          src={product.lifestyleImage || heroImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-supplied-bg via-transparent to-transparent" />
      </section>

      {/* ─── 6. TECHNICAL SPECS ─── */}
      <section className="py-[100px] bg-supplied-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <Tag color="amber">Specifications</Tag>
              <div className="mt-3.5">
                <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] mb-4.5 text-supplied-ink">
                  Built to your{" "}
                  <em className="font-fraunces font-normal italic">exact</em>{" "}
                  requirements
                </h2>
                <p className="text-[15px] text-supplied-ink-40 leading-[1.7] mb-7">
                  Every {product.name.toLowerCase()} is engineered from scratch
                  for your product, brand identity, and customer experience.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="fill-amber"
                    size="md"
                    href="/contact-us"
                    icon
                  >
                    Get a Free Quote
                  </Button>
                  <Button variant="outline" size="md" href="/contact-us">
                    Request Samples
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal className="bg-supplied-ink rounded-[32px] p-10 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-[180px] h-[180px] bg-[radial-gradient(circle,rgba(232,121,28,0.1),transparent_70%)] pointer-events-none" />
              <h3 className="text-[19px] font-bold mb-5 relative z-10">
                Technical Specifications
              </h3>
              <div className="relative z-10">
                {product.detailedSpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-[13px] border-b border-white/6 last:border-0"
                  >
                    <span className="text-[13px] text-white/40">
                      {spec.label}
                    </span>
                    <span className="text-[13px] font-semibold text-white text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── 7. FAQ ─── */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-[100px] bg-white">
          <Container>
            <Reveal className="text-center max-w-[560px] mx-auto mb-14">
              <Tag color="amber">FAQ</Tag>
              <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3.5 text-supplied-ink">
                Common questions about{" "}
                <em className="font-fraunces font-normal italic">
                  {product.name.toLowerCase()}
                </em>
              </h2>
              <p className="text-[15px] text-supplied-ink-40 leading-[1.65]">
                Everything you need to know before ordering custom{" "}
                {product.name.toLowerCase()}.
              </p>
            </Reveal>

            <div className="max-w-[800px] mx-auto flex flex-col gap-2">
              {product.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </Container>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: product.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />
        </section>
      )}

      {/* ─── 8. RELATED PRODUCTS ─── */}
      {relatedProducts.length > 0 && (
        <section className="py-[80px] bg-supplied-bg">
          <Container>
            <div className="text-center mb-10">
              <h3 className="text-[20px] font-bold text-supplied-ink tracking-[-0.02em]">
                Explore more packaging products
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── 9. BOTTOM CTA ─── */}
      <section className="py-[100px] bg-supplied-ink text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(232,121,28,0.06),transparent_60%)] pointer-events-none" />
        <Container className="relative z-10 max-w-[580px]">
          <h2 className="text-[clamp(30px,3.8vw,46px)] font-bold text-white leading-[1.1] mb-4 tracking-[-0.03em]">
            Ready to create{" "}
            <em className="font-fraunces font-normal italic text-supplied-amber-bright">
              premium
            </em>{" "}
            {product.name.toLowerCase()}?
          </h2>
          <p className="text-[16px] text-white/40 leading-[1.65] mb-8">
            Tell us about your project. We'll come back with a transparent
            quote, timeline, and sample plan within 48 hours.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button variant="fill-amber" size="lg" href="/contact-us" icon>
              Get a Free Quote
            </Button>
            <Button variant="outline-light" size="lg" href="/contact-us">
              Request Samples
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

function isSvgUrl(src: string): boolean {
  return src.replace(/\?.*$/, "").toLowerCase().endsWith(".svg");
}

function FeatureCard({ feature }: { feature: ProductFeatureCard }) {
  const hasImage = !!feature.image;
  const svg = hasImage && isSvgUrl(feature.image!);

  const imageBlock = hasImage ? (
    svg ? (
      <div className="relative w-full h-full min-h-[120px] bg-[#E8792A] overflow-hidden">
        <Image
          src={feature.image!}
          alt={feature.title}
          fill
          className="object-cover scale-[1.35]"
        />
      </div>
    ) : (
      <div className="relative w-full h-full min-h-[120px]">
        <Image
          src={feature.image!}
          alt={feature.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    )
  ) : (
    <div className="relative w-full h-full min-h-[120px] bg-gradient-to-br from-supplied-amber/[0.08] to-supplied-amber/[0.02] flex items-center justify-center">
      <div className="w-10 h-10 rounded-xl bg-supplied-amber/10 flex items-center justify-center text-lg text-supplied-amber">
        ✦
      </div>
    </div>
  );

  return (
    <div className="bg-supplied-bg border border-supplied-ink/[0.05] rounded-2xl overflow-hidden transition-all duration-300 ease-supplied relative group hover:-translate-y-0.5 hover:shadow-lg hover:border-supplied-amber/10">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-supplied-amber transform scale-x-0 origin-left transition-transform duration-500 ease-supplied group-hover:scale-x-100 z-10" />
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-[120px] lg:w-[130px] flex-shrink-0 overflow-hidden">
          {imageBlock}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-center">
          <h3 className="text-[14.5px] font-semibold text-supplied-ink leading-tight mb-1">
            {feature.title}
          </h3>
          <p className="text-[13px] text-supplied-ink/40 leading-[1.6]">
            {feature.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-supplied-bg border border-supplied-ink-05 rounded-2xl overflow-hidden transition-all duration-300 ease-supplied hover:border-supplied-amber/12 ${
        isOpen ? "border-supplied-amber/12" : ""
      }`}
    >
      <div
        className="flex items-center justify-between p-6 cursor-pointer gap-4 hover:bg-supplied-ink-05 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[15px] font-semibold leading-[1.4] flex-1 text-supplied-ink">
          {question}
        </h3>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base font-semibold transition-all duration-350 ease-supplied ${
            isOpen
              ? "bg-supplied-amber text-white rotate-45"
              : "bg-supplied-amber-10 text-supplied-amber"
          }`}
        >
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
    </div>
  );
}
