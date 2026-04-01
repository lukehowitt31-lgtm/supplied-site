"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col">
            <img
              src="/images/brand/supplied-logo.svg"
              alt="Supplied"
              className="h-[30px] mb-3.5 opacity-70 self-start invert brightness-0"
            />
            <p className="text-sm text-white/30 leading-[1.65] max-w-[300px] mb-4">
              The end-to-end packaging partner for fast-growing consumer brands. Design, source, produce, deliver.
            </p>
            <p className="text-xs text-white/20 leading-[1.7]">
              Supplied Agency Ltd.<br />
              Unit 19, Winnington Business Park<br />
              Northwich, Cheshire CW8 4DL
            </p>
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Company</h5>
            <FooterLink href="/about-us">About Us</FooterLink>
            <FooterLink href="/client-stories">Client Stories</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/partnerships">Partnerships</FooterLink>
            <FooterLink href="/contact-us">Contact Us</FooterLink>
          </div>

          {/* Products */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Products</h5>
            <FooterLink href="/products/mailer-boxes">Mailer Boxes</FooterLink>
            <FooterLink href="/products/rigid-boxes">Rigid Boxes</FooterLink>
            <FooterLink href="/products/shipping-boxes">Shipping Boxes</FooterLink>
            <FooterLink href="/products/paper-mailers">Paper Mailers</FooterLink>
            <FooterLink href="/products/printed-cans">Printed Cans</FooterLink>
            <FooterLink href="/products">View All Products</FooterLink>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Get in Touch</h5>
            <a href="mailto:hello@supplied.agency" className={linkClass}>hello@supplied.agency</a>
            <FooterLink href="/knowledge-hub">Knowledge Hub</FooterLink>
            <FooterLink href="/contact-us">Start a Project</FooterLink>
            <a href="https://linkedin.com/company/supplied-agency" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
            <a href="https://instagram.com/supplied.agency" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a>
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
