"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const linkClass =
  "text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors";

function FooterLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={className ?? linkClass}
      onClick={() => {
        if (pathname === href) window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-supplied-ink border-t border-white/5 pt-14 pb-9">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto] gap-x-10 gap-y-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/brand/supplied-logo.svg"
              alt="Supplied"
              width={140}
              height={40}
              className="h-10 w-auto mb-3.5 self-start invert brightness-0"
            />
            <p className="text-sm text-white/30 leading-[1.65] max-w-[300px] mb-4">
              The end-to-end packaging partner for fast-growing consumer brands. Design, source, produce, deliver.
            </p>
            <p className="text-xs text-white/20 leading-[1.7]">
              Supplied Agency Ltd.<br />
              Unit 19, Winnington Business Park<br />
              Wolstencroft, Northwich, Cheshire CW8 4DL
            </p>
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <span className="block text-[11px] font-semibold text-white uppercase tracking-[1.5px] mb-[18px]">Company</span>
            <FooterLink href="/about-us">About Us</FooterLink>
            <FooterLink href="/client-stories">Client Stories</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/partnerships">Partnerships</FooterLink>
            <FooterLink href="/contact-us">Contact Us</FooterLink>
          </div>

          {/* Products */}
          <div className="flex flex-col">
            <span className="block text-[11px] font-semibold text-white uppercase tracking-[1.5px] mb-[18px]">Products</span>
            <FooterLink href="/products/mailer-boxes">Mailer Boxes</FooterLink>
            <FooterLink href="/products/rigid-boxes">Rigid Boxes</FooterLink>
            <FooterLink href="/products/shipping-boxes">Shipping Boxes</FooterLink>
            <FooterLink href="/products/paper-mailers">Paper Mailers</FooterLink>
            <FooterLink href="/products/printed-cans">Printed Cans</FooterLink>
            <FooterLink href="/products">View All Products</FooterLink>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col">
            <span className="block text-[11px] font-semibold text-white uppercase tracking-[1.5px] mb-[18px]">Get in Touch</span>
            <a href="mailto:hello@suppliedpackaging.com" className={linkClass} onClick={() => trackEvent("footer_email_clicked")}>hello@suppliedpackaging.com</a>
            <FooterLink href="/knowledge-hub">Knowledge Hub</FooterLink>
            <FooterLink href="/contact-us">Start a Project</FooterLink>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.linkedin.com/company/suppliedpackaging"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-supplied-amber transition-colors"
                aria-label="LinkedIn"
                onClick={() => trackEvent("social_link_clicked", { platform: "linkedin" })}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/suppliedpackaging/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-supplied-amber transition-colors"
                aria-label="Instagram"
                onClick={() => trackEvent("social_link_clicked", { platform: "instagram" })}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* FSC Certification */}
          <div className="flex flex-col items-center lg:items-end justify-start">
            <Image
              src="/images/brand/fsc-logo-white-text.svg"
              alt="FSC® Certified"
              width={160}
              height={160}
              className="w-[160px] h-[160px] object-contain mb-3"
            />
            <p className="text-[10px] text-white/20 leading-[1.5] text-center lg:text-left max-w-[160px]">
              FSC® Certified Packaging Partner
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-5 flex max-md:flex-col items-center justify-center gap-3 text-center">
          <p className="text-[11.5px] text-white/20">
            © {new Date().getFullYear()} Supplied Agency Ltd. <FooterLink href="/terms" className="text-white/25 underline hover:text-white/40">Terms</FooterLink> · <FooterLink href="/privacy-policy" className="text-white/25 underline hover:text-white/40">Privacy</FooterLink> · <FooterLink href="/cookie-policy" className="text-white/25 underline hover:text-white/40">Cookies</FooterLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
