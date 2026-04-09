import React from "react";

interface LogoStripProps {
  heading?: string;
}

export function LogoStrip({ heading = "Trusted by leading brands" }: LogoStripProps) {
  const logos = [
    { name: "Wild", src: "/images/logos/wild.webp" },
    { name: "Healf", src: "/images/logos/healf.svg" },
    { name: "TRIP", src: "/images/logos/trip.svg" },
    { name: "Spacegoods", src: "/images/logos/spacegoods.svg" },
    { name: "Glow For It", src: "/images/logos/glowforit.svg" },
    { name: "Glaize", src: "/images/logos/glaize.svg" },
    { name: "SURI", src: "/images/logos/suri.webp" },
    { name: "Polestar", src: "/images/logos/polestar.svg" },
    { name: "London Sock Co.", src: "/images/logos/london-sock.svg" },
    { name: "Lumity", src: "/images/logos/lumity.svg" },
    { name: "Sneak", src: "/images/logos/sneak.webp" },
    { name: "Mrs. Alice", src: "/images/logos/mrs-alice.svg" },
    { name: "Beer52", src: "/images/logos/beer52.svg" },
    { name: "Curious Brewery", src: "/images/logos/curiousbrewery.svg" },
    { name: "Uncle Matt's", src: "/images/logos/unclematts.svg" },
  ];

  return (
    <div className="py-10 md:py-12 bg-white border-b border-supplied-ink-05 overflow-hidden">
      <div className="text-[11px] font-bold text-supplied-ink-40 uppercase tracking-[3px] text-center mb-8 md:mb-10">
        {heading}
      </div>

      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex shrink-0 animate-logo-cloud items-center gap-12 md:gap-16 pr-12 md:pr-16"
          >
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={`${logo.name} logo`}
                width={120}
                height={28}
                className="h-6 md:h-7 w-auto object-contain brightness-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
