import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | Supplied",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
