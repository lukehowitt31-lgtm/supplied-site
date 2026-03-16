"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import VisualEditing from "next-sanity/visual-editing/client-component";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface SiteChromeProps {
  children: ReactNode;
  enableVisualEditing?: boolean;
}

export function SiteChrome({
  children,
  enableVisualEditing = false,
}: SiteChromeProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {enableVisualEditing ? <VisualEditing /> : null}
    </>
  );
}
