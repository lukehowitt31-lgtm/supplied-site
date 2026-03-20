import React from "react";
import Link from "next/link";

const linkClass =
  "text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors";

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
            <Link href="/about-us" className={linkClass}>About Us</Link>
            <Link href="/client-stories" className={linkClass}>Client Stories</Link>
            <Link href="/blog" className={linkClass}>Blog</Link>
            <Link href="/partnerships" className={linkClass}>Partnerships</Link>
            <Link href="/contact-us" className={linkClass}>Contact Us</Link>
          </div>

          {/* Products */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Products</h5>
            <Link href="/products/mailer-boxes" className={linkClass}>Mailer Boxes</Link>
            <Link href="/products/rigid-boxes" className={linkClass}>Rigid Boxes</Link>
            <Link href="/products/shipping-boxes" className={linkClass}>Shipping Boxes</Link>
            <Link href="/products/paper-mailers" className={linkClass}>Paper Mailers</Link>
            <Link href="/products/printed-cans" className={linkClass}>Printed Cans</Link>
            <Link href="/products" className={linkClass}>View All Products</Link>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Get in Touch</h5>
            <a href="mailto:hello@supplied.agency" className={linkClass}>hello@supplied.agency</a>
            <Link href="/knowledge-hub" className={linkClass}>Knowledge Hub</Link>
            <Link href="/contact-us" className={linkClass}>Start a Project</Link>
            <a href="https://linkedin.com/company/supplied-agency" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
            <a href="https://instagram.com/supplied.agency" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-5 flex max-md:flex-col items-center justify-between gap-3 text-center">
          <p className="text-[11.5px] text-white/20">
            © {new Date().getFullYear()} Supplied Agency Ltd. <a href="https://supplied.agency/terms-conditions/" target="_blank" rel="noopener noreferrer" className="text-white/25 underline hover:text-white/40">Terms</a> · <a href="https://supplied.agency/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-white/25 underline hover:text-white/40">Privacy</a> · <a href="https://supplied.agency/cookie-policy/" target="_blank" rel="noopener noreferrer" className="text-white/25 underline hover:text-white/40">Cookies</a>
          </p>
          <div className="flex items-center gap-2.5">
            <img src="/images/brand/fsc-logo-new.svg" alt="FSC Certified" className="h-9 invert opacity-25" />
            <span className="text-[11px] text-white/25">FSC® Certified Products</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
