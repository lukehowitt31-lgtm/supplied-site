import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found | Supplied",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-supplied-ink min-h-[80vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,rgba(200,119,62,0.1),transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 py-32 text-center max-w-[640px]">
        <p
          className="text-[120px] font-bold leading-none tracking-[-0.04em] text-supplied-amber/20 mb-4"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          404
        </p>
        <h1 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-white leading-[1.15] tracking-[-0.03em] mb-4">
          Page not found
        </h1>
        <p className="text-[16px] text-white/40 leading-[1.7] mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Here are some helpful links to get you back on track.
        </p>

        <div className="flex justify-center gap-3 flex-wrap mb-16">
          <Button variant="fill-amber" size="lg" href="/" icon>
            Back to Home
          </Button>
          <Button variant="outline-light" size="lg" href="/contact-us" icon>
            Contact Us
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/products"
            className="group rounded-xl border border-white/10 p-5 hover:border-supplied-amber/30 transition-colors"
          >
            <span className="text-[13px] font-semibold text-supplied-amber tracking-[0.06em] uppercase block mb-1">
              Products
            </span>
            <span className="text-[14px] text-white/50 group-hover:text-white/70 transition-colors">
              Browse our full packaging range
            </span>
          </Link>
          <Link
            href="/blog"
            className="group rounded-xl border border-white/10 p-5 hover:border-supplied-amber/30 transition-colors"
          >
            <span className="text-[13px] font-semibold text-supplied-amber tracking-[0.06em] uppercase block mb-1">
              Blog
            </span>
            <span className="text-[14px] text-white/50 group-hover:text-white/70 transition-colors">
              Packaging insights &amp; guides
            </span>
          </Link>
          <Link
            href="/client-stories"
            className="group rounded-xl border border-white/10 p-5 hover:border-supplied-amber/30 transition-colors"
          >
            <span className="text-[13px] font-semibold text-supplied-amber tracking-[0.06em] uppercase block mb-1">
              Client Stories
            </span>
            <span className="text-[14px] text-white/50 group-hover:text-white/70 transition-colors">
              Real results from real brands
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
