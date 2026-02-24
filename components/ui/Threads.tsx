"use client";

import { useEffect, useRef } from "react";

interface ThreadsProps {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  color?: string;
}

export default function Threads({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  color = "#C8773E",
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    if (enableMouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const waveCount = 10;
      const baseAmplitude = 50 * amplitude;
      const baseFrequency = 0.002;
      const speed = 0.02;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.15 + (i / waveCount) * 0.1; // Fade opacity

        const yOffset = height * 0.2 + (i * 40) + distance; // Vertical spacing
        const phase = i * 0.5;

        for (let x = 0; x <= width; x += 5) {
          // Base wave
          let y = yOffset + Math.sin(x * baseFrequency + time * speed + phase) * baseAmplitude;

          // Mouse interaction distortion
          if (enableMouseInteraction) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 300;

            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 50;
              y += force * Math.sin(x * 0.05 + time * 0.1);
            }
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (enableMouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude, distance, enableMouseInteraction, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
