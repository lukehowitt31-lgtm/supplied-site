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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Configuration
      const waveCount = 40;
      const baseAmplitude = 30 * amplitude;
      const baseFrequency = 0.003;
      const speed = 0.015;
      const baseSpread = 12; // Base vertical spacing between lines

      // Create a gradient for the lines to fade out at edges
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.2, color);
      gradient.addColorStop(0.8, color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        
        // Vary opacity based on index to create depth
        const alpha = 0.1 + (Math.sin(i * 0.5 + time * 0.05) * 0.05) + (i / waveCount) * 0.15;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.6, alpha));

        // Phase shift for each line
        const phase = i * 0.2;

        for (let x = 0; x <= width; x += 5) {
          const normalizedX = x / width;
          
          // Pinch effect: 0.35 at ends, 1 in middle
          // This creates a partial pinch (not completely closed)
          const pinchBase = 0.35; 
          const pinchRange = 1 - pinchBase;
          const envelope = pinchBase + pinchRange * Math.sin(normalizedX * Math.PI);
          
          // Apply envelope to the vertical spacing (spread)
          // This makes the lines converge at the ends but not touch
          const currentSpread = baseSpread * envelope;
          
          // Calculate base Y position for this line at this X
          const yBase = height * 0.5 + (i - waveCount / 2) * currentSpread + distance;

          // Apply envelope to wave amplitude as well
          // So waves also flatten out at the ends
          const currentAmplitude = baseAmplitude * envelope;

          // Combine multiple sine waves for complexity
          const y = yBase 
            + Math.sin(x * baseFrequency + time * speed + phase) * currentAmplitude
            + Math.sin(x * baseFrequency * 2 + time * speed * 1.5 + phase) * (currentAmplitude * 0.5)
            + Math.sin(x * baseFrequency * 0.5 + time * speed * 0.8) * (currentAmplitude * 0.3);

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
      cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude, distance, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
