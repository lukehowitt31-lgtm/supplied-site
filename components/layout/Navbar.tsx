"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

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
            className="h-10" 
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </Link>
        
        <div className="flex items-center gap-2 max-md:hidden">
          <div className="flex items-center bg-white/5 rounded-full px-1.5 py-1.5 backdrop-blur-sm border border-white/5 mr-3">
            <NavLink href="/" active>Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="#partners">Partners</NavLink>
            <NavLink href="https://supplied.agency/client-stories/" target="_blank">Stories</NavLink>
            <NavLink href="https://supplied.agency/about-us/" target="_blank">About</NavLink>
          </div>
          
          <Button variant="outline-light" size="sm" href="https://supplied.agency/knowledge-hub" target="_blank" className="border-white/10 hover:border-supplied-amber text-white/80">
            Hub
          </Button>
          <Button variant="fill-amber" size="sm" href="https://supplied.agency/contact-us/" target="_blank" icon>
            Start a Project
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active, target }: { href: string; children: React.ReactNode; active?: boolean; target?: string }) {
  return (
    <Link 
      href={href} 
      target={target}
      className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
        active 
          ? "text-supplied-ink bg-white font-semibold" 
          : "text-white/70 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </Link>
  );
}
