"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

const productLinks = [
  { href: "/products/mailer-boxes", label: "Mailer Boxes" },
  { href: "/products/rigid-boxes", label: "Rigid Boxes" },
  { href: "/products/shipping-boxes", label: "Shipping Boxes" },
  { href: "/products/paper-mailers", label: "Paper Mailers" },
  { href: "/products/printed-cans", label: "Printed Cans" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroTheme, setHeroTheme] = useState<"dark" | "light">("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"dark" | "light">;
      setHeroTheme(customEvent.detail);
    };

    window.addEventListener("hero-theme-change", handleThemeChange);
    return () => window.removeEventListener("hero-theme-change", handleThemeChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMobile = useCallback(() => setMobileOpen(p => !p), []);

  const isLightHero = pathname === "/" && heroTheme === "light" && !scrolled;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products", hasDropdown: true },
    { href: "/partnerships", label: "Partnerships" },
    { href: "/client-stories", label: "Stories" },
    { href: "/about-us", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  const openProducts = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsOpen(true);
  };
  const closeProducts = () => {
    productsTimeoutRef.current = setTimeout(() => setProductsOpen(false), 150);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-supplied ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled || mobileOpen
            ? "bg-[#111118]/85 backdrop-blur-md border-b border-white/5 shadow-lg py-3" 
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between">
          <Link href="/" className="hover:opacity-70 transition-opacity duration-300">
            <img
              src="/images/brand/supplied-logo.svg"
              alt="Supplied"
              className={`h-10 transition-all duration-300 ${scrolled ? "md:h-10" : "md:h-[52px]"} ${isLightHero && !mobileOpen ? "brightness-0" : ""}`} 
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </Link>
          
          {/* Desktop nav */}
          <div className="flex items-center gap-2 max-md:hidden">
            <div className={`flex items-center rounded-full px-1.5 py-1.5 backdrop-blur-sm border mr-3 transition-colors duration-300 ${
              isLightHero 
                ? "bg-supplied-ink/5 border-supplied-ink/10" 
                : "bg-white/5 border-white/5"
            }`}>
              {navLinks.map(l =>
                l.hasDropdown ? (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={openProducts}
                    onMouseLeave={closeProducts}
                  >
                    <NavLink href={l.href} isLightHero={isLightHero}>
                      {l.label}
                      <svg className={`inline-block ml-1 w-3 h-3 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 4.5L6 7.5L9 4.5" />
                      </svg>
                    </NavLink>

                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      productsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}>
                      <div className="bg-[#1a1a22] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[200px] backdrop-blur-xl">
                        {productLinks.map(p => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="flex items-center px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {p.label}
                          </Link>
                        ))}
                        <div className="h-px bg-white/8 mx-3 my-1" />
                        <Link
                          href="/products"
                          className="flex items-center px-4 py-2.5 text-[13px] text-supplied-amber font-medium hover:bg-supplied-amber/5 transition-colors"
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink key={l.href} href={l.href} isLightHero={isLightHero}>{l.label}</NavLink>
                )
              )}
            </div>
            
            <Button 
              variant={isLightHero ? "outline" : "outline-light"} 
              size="sm" 
              href="/knowledge-hub" 
              className={`transition-colors duration-300 ${
                isLightHero 
                  ? "border-supplied-ink/10 hover:border-supplied-amber text-supplied-ink/80" 
                  : "border-white/10 hover:border-supplied-amber text-white/80"
              }`}
            >
              Knowledge Hub
            </Button>
            <Button variant="fill-amber" size="sm" href="/contact-us" icon>
              Contact Us
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMobile}
            className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`absolute w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"}`} />
            <span className={`absolute w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
            <span className={`absolute w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[998] bg-[#111118]/98 backdrop-blur-lg transition-all duration-400 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`flex flex-col items-center justify-center h-full gap-2 transition-transform duration-400 ${mobileOpen ? "translate-y-0" : "-translate-y-8"}`}>
          {navLinks.map((l, i) =>
            l.hasDropdown ? (
              <React.Fragment key={l.href}>
                <button
                  onClick={() => setMobileProductsOpen(p => !p)}
                  className="text-white/80 hover:text-white text-[22px] font-semibold py-3 px-6 rounded-xl hover:bg-white/5 transition-all duration-200 flex items-center gap-2"
                  style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
                >
                  {l.label}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 4.5L6 7.5L9 4.5" />
                  </svg>
                </button>
                <div className={`flex flex-col items-center overflow-hidden transition-all duration-300 ${
                  mobileProductsOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  {productLinks.map(p => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-white/50 hover:text-white text-[16px] py-2 px-6 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="text-supplied-amber hover:text-supplied-amber/80 text-[14px] font-medium py-2 px-6 transition-colors"
                  >
                    View All Products →
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white text-[22px] font-semibold py-3 px-6 rounded-xl hover:bg-white/5 transition-all duration-200"
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            )
          )}
          <div className="h-px w-16 bg-white/10 my-4" />
          <Link
            href="/knowledge-hub"
            onClick={() => setMobileOpen(false)}
            className="text-white/50 hover:text-white text-[15px] font-medium py-2 transition-colors"
          >
            Knowledge Hub
          </Link>
          <Link
            href="/contact-us"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3.5 bg-supplied-amber text-white rounded-xl text-[15px] font-semibold hover:bg-supplied-amber/90 transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children, active, target, rel, isLightHero }: { href: string; children: React.ReactNode; active?: boolean; target?: string; rel?: string; isLightHero?: boolean }) {
  return (
    <Link 
      href={href} 
      target={target}
      rel={rel}
      className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
        active 
          ? isLightHero 
            ? "text-white bg-supplied-ink font-semibold"
            : "text-supplied-ink bg-white font-semibold" 
          : isLightHero
            ? "text-supplied-ink/70 hover:text-supplied-ink hover:bg-supplied-ink/10"
            : "text-white/70 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </Link>
  );
}
