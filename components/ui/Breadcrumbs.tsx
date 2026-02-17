import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`py-[80px] bg-supplied-ink ${className}`}>
      <Container>
        <div className="flex items-center gap-2 text-xs text-white/30">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-white/15">›</span>}
                {item.href && !isLast ? (
                  <Link 
                    href={item.href} 
                    className="text-white/40 hover:text-supplied-amber transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/60">
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.href ? `https://supplied.agency${item.href}` : undefined,
            })),
          }),
        }}
      />
    </nav>
  );
}
