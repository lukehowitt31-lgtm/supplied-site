import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Sora, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Supplied — The End-to-End Packaging Partner",
  description:
    "Packaging that grows your brand, not your headaches. We partner with fast-growing ecommerce brands to design, source, and deliver sustainable packaging.",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Supplied",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/brand/supplied-og.png", width: 1200, height: 630, alt: "Supplied — The End-to-End Packaging Partner" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": siteUrl,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftModeEnabled } = await draftMode();

  return (
    <html lang="en-GB" className={`${sora.variable} ${fraunces.variable}`}>
      <body
        className="antialiased font-sans bg-supplied-bg text-supplied-ink"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Supplied Agency",
                url: siteUrl,
                logo: `${siteUrl}/images/brand/supplied-logo.svg`,
                description:
                  "End-to-end packaging consultancy for fast-growing DTC and ecommerce brands",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Unit 19, Winnington Business Park",
                  addressLocality: "Northwich",
                  addressRegion: "Cheshire",
                  postalCode: "CW8 4DL",
                  addressCountry: "GB",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "hello@suppliedpackaging.com",
                  contactType: "customer service",
                },
                sameAs: [
                  "https://www.linkedin.com/company/supplied-agency",
                  "https://www.instagram.com/suppliedpackaging/",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Supplied",
                url: siteUrl,
              },
            ]),
          }}
        />
        <SiteChrome enableVisualEditing={isDraftModeEnabled}>
          {children}
        </SiteChrome>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
