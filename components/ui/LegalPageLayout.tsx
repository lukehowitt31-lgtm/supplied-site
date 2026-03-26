import React from "react";
import { Container } from "@/components/ui/Container";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <section className="bg-white min-h-screen pt-[160px] pb-[100px]">
      <Container narrow>
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-supplied-ink/30 mb-3">
          Legal
        </p>
        <h1 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-supplied-ink mb-3">
          {title}
        </h1>
        <p className="text-sm text-supplied-ink/40 mb-12">
          Last updated: {lastUpdated}
        </p>

        <div className="prose prose-supplied max-w-none text-supplied-ink/70 text-[15px] leading-[1.85] [&_h2]:text-supplied-ink [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-[1.3] [&_h3]:text-supplied-ink [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_strong]:text-supplied-ink/90 [&_strong]:font-semibold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-5 [&_li]:mb-1.5 [&_li]:list-disc [&_ol]:mb-4 [&_ol]:pl-5 [&_ol>li]:list-decimal [&_a]:text-supplied-amber [&_a]:underline [&_a:hover]:text-supplied-ink [&_table]:w-full [&_table]:text-[13px] [&_table]:my-6 [&_table]:border-collapse [&_th]:text-left [&_th]:text-supplied-ink [&_th]:font-semibold [&_th]:py-2 [&_th]:px-3 [&_th]:border-b [&_th]:border-supplied-ink/10 [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-supplied-ink/5 [&_td]:align-top">
          {children}
        </div>
      </Container>
    </section>
  );
}
