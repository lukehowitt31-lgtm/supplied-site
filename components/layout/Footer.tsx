import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-supplied-ink border-t border-white/5 pt-14 pb-9">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-12">
          <div className="flex flex-col">
            <img
              src="https://supplied.agency/wp-content/uploads/2026/02/Supplied-Packaging-Logo.svg"
              alt="Supplied"
              className="h-[30px] mb-3.5 opacity-70 self-start invert brightness-0"
            />
            <p className="text-sm text-white/30 leading-[1.65] max-w-[300px] mb-4">
              Empowering fast-growing brands with sustainable, cost-effective packaging that elevates customer experience and streamlines supply chains.
            </p>
            <p className="text-xs text-white/20 leading-[1.7]">
              Supplied Agency Ltd.<br />
              167-169 Great Portland Street<br />
              5th Floor, London W1W 5PF
            </p>
          </div>
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Company</h5>
            <a href="https://supplied.agency/about-us/" target="_blank" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">About Us</a>
            <a href="https://supplied.agency/products/" target="_blank" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Products</a>
            <a href="https://supplied.agency/client-stories/" target="_blank" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Client Stories</a>
            <a href="https://supplied.agency/blog/" target="_blank" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Blog</a>
            <Link href="#partners" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Partners</Link>
          </div>
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Services</h5>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Structural Design</a>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Manufacturing</a>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Sustainability</a>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Logistics</a>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Strategy</a>
          </div>
          <div className="flex flex-col">
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Get in Touch</h5>
            <a href="mailto:hello@supplied.agency" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">hello@supplied.agency</a>
            <a href="/contact-us" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Start a Project</a>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">LinkedIn</a>
            <a href="#" className="text-[13.5px] text-white/30 mb-2.5 hover:text-supplied-amber transition-colors">Instagram</a>
          </div>
        </div>
        <div className="border-t border-white/5 pt-5 flex max-md:flex-col items-center justify-between gap-3 text-center">
          <p className="text-[11.5px] text-white/20">
            © 2026 Supplied Agency Ltd. <a href="https://supplied.agency/terms-conditions/" target="_blank" className="text-white/25 underline hover:text-white/40">Terms</a> · <a href="https://supplied.agency/privacy-policy/" target="_blank" className="text-white/25 underline hover:text-white/40">Privacy</a> · <a href="https://supplied.agency/cookie-policy/" target="_blank" className="text-white/25 underline hover:text-white/40">Cookies</a>
          </p>
          <div className="flex items-center gap-2">
            <img src="https://supplied.agency/wp-content/uploads/2024/08/FSC-Logo.svg" alt="FSC" className="h-7 opacity-30" />
            <span className="text-[11px] text-white/20">FSC® Certified Products</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
