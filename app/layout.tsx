import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Sora, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SanityLive } from "@/lib/sanity/live";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Supplied — The End-to-End Packaging Partner",
  description: "Packaging that grows your brand, not your headaches. We partner with fast-growing ecommerce brands to design, source, and deliver sustainable packaging.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftModeEnabled } = await draftMode();

  return (
    <html lang="en" className={`${sora.variable} ${fraunces.variable}`}>
      <body
        className="antialiased font-sans bg-supplied-bg text-supplied-ink"
      >
        <SiteChrome enableVisualEditing={isDraftModeEnabled}>
          {children}
        </SiteChrome>
        <SanityLive />
      </body>
    </html>
  );
}
