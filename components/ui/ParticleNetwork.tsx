"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

type ParticleVariant = "default" | "knowledge";

interface ParticleNetworkProps {
  id?: string;
  variant?: ParticleVariant;
}

export function ParticleNetwork({ id = "tsparticles", variant = "default" }: ParticleNetworkProps) {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  const isKnowledge = variant === "knowledge";

  return (
    <Particles
      id={id}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: isKnowledge ? 180 : 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: "#C8773E", // Supplied Amber
          },
          links: {
            color: "#C8773E",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: isKnowledge ? "none" : "right",
            enable: true,
            outModes: {
              default: "out",
            },
            random: isKnowledge ? true : false,
            speed: isKnowledge ? 0.5 : 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
