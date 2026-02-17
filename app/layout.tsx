import type { Metadata } from "next";
import { Sora, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  // Ensure we load the axes we need, or let it default. 
  // Explicitly requesting italic might help if Next.js splits them.
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Supplied — The End-to-End Packaging Partner",
  description: "Packaging that grows your brand, not your headaches. We partner with fast-growing ecommerce brands to design, source, and deliver sustainable packaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${fraunces.variable}`}>
      <body
        className="antialiased font-sans bg-supplied-bg text-supplied-ink"
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
