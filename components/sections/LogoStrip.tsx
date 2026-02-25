import React from "react";
import { Container } from "@/components/ui/Container";

export function LogoStrip() {
  const logos = [
    { name: "Wild", src: "/images/logos/wild.png" },
    { name: "Healf", src: "/images/logos/healf.png" },
    { name: "TRIP", src: "/images/logos/trip.svg" },
    { name: "Spacegoods", src: "/images/logos/spacegoods.svg" },
    { name: "Glow For It", src: "/images/logos/glowforit.svg" },
    { name: "Glaize", src: "/images/logos/glaize.svg" },
    { name: "SURI", src: "/images/logos/suri.png" },
    { name: "Polestar", src: "/images/logos/polestar.svg" },
    { name: "London Sock Co.", src: "/images/logos/london-sock.svg" },
    { name: "Lumity", src: "/images/logos/lumity.svg" },
    { name: "Sneak", src: "/images/logos/sneak.png" },
    { name: "Mrs. Alice", src: "/images/logos/mrs-alice.svg" },
  ];

  return (
    <div className="py-12 bg-white border-b border-supplied-ink-05 overflow-hidden">
      <div className="text-[12px] font-bold text-supplied-ink-40 uppercase tracking-[3px] text-center mb-10">
        Trusted by leading brands
      </div>
      
      <div
        className="group relative flex gap-16 overflow-hidden p-2"
        style={{
          maskImage:
            'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
        }}
      >
        {Array(2)
          .fill(null)
          .map((index) => (
            <div
              key={index}
              className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
            >
              {logos.map((logo) => (
                <div 
                  key={logo.name}
                  className="w-[160px] h-[90px] bg-white border border-supplied-ink-05 rounded-xl flex items-center justify-center p-6 transition-all duration-300 hover:border-supplied-amber/30 hover:shadow-md group/logo"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain opacity-40 grayscale transition-all duration-400 ease-supplied group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-hover/logo:scale-110"
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
