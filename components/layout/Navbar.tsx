"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroTheme, setHeroTheme] = useState<"dark" | "light">("light");
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
      
      // Determine if we've scrolled down enough to trigger styling changes
      setScrolled(currentScrollY > 20);

      // Determine hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past top
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Only apply light hero styling if we are on the homepage AND the hero theme is light AND we haven't scrolled.
  // All other pages start with a dark background, so they should default to the "dark hero" (white text) style.
  const isLightHero = pathname === "/" && heroTheme === "light" && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-supplied ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled 
          ? "bg-[#111118]/85 backdrop-blur-md border-b border-white/5 shadow-lg py-3" 
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
        <Link href="/" className="hover:opacity-70 transition-opacity duration-300">
          <img
            src="https://supplied.agency/wp-content/uploads/2026/02/Supplied-Packaging-Logo.svg"
            alt="Supplied"
            className={`h-10 transition-all duration-300 ${isLightHero ? "brightness-0" : ""}`} 
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </Link>
        
        <div className="flex items-center gap-2 max-md:hidden">
          <div className={`flex items-center rounded-full px-1.5 py-1.5 backdrop-blur-sm border mr-3 transition-colors duration-300 ${
            isLightHero 
              ? "bg-supplied-ink/5 border-supplied-ink/10" 
              : "bg-white/5 border-white/5"
          }`}>
            <NavLink href="/" active={!isLightHero} isLightHero={isLightHero}>Home</NavLink>
            <NavLink href="/products" isLightHero={isLightHero}>Products</NavLink>
            <NavLink href="/partnerships" isLightHero={isLightHero}>Partnerships</NavLink>
            <NavLink href="/client-stories" isLightHero={isLightHero}>Stories</NavLink>
            <NavLink href="https://supplied.agency/about-us/" target="_blank" isLightHero={isLightHero}>About</NavLink>
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
            Start a Project
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active, target, isLightHero }: { href: string; children: React.ReactNode; active?: boolean; target?: string; isLightHero?: boolean }) {
  return (
    <Link 
      href={href} 
      target={target}
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
