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

      // Configuration for the "Threads" look
      const waveCount = 40; // More lines for a denser look
      const baseAmplitude = 30 * amplitude;
      const baseFrequency = 0.003;
      const speed = 0.015;
      
      // Create a gradient for the lines to fade out at edges
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.2, color);
      gradient.addColorStop(0.8, color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8; // Thinner lines
        
        // Vary opacity based on index to create depth
        const alpha = 0.1 + (Math.sin(i * 0.5 + time * 0.05) * 0.05) + (i / waveCount) * 0.15;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.6, alpha));

        // Vertical spacing with some randomness/organic feel
        const yBase = height * 0.5 + (i - waveCount / 2) * 8 + distance; 
        
        // Phase shift for each line
        const phase = i * 0.2;

        for (let x = 0; x <= width; x += 5) {
          // Combine multiple sine waves for complexity
          let y = yBase 
            + Math.sin(x * baseFrequency + time * speed + phase) * baseAmplitude
            + Math.sin(x * baseFrequency * 2 + time * speed * 1.5 + phase) * (baseAmplitude * 0.5)
            + Math.sin(x * baseFrequency * 0.5 + time * speed * 0.8) * (baseAmplitude * 0.3);

          // Mouse interaction distortion
          if (enableMouseInteraction) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 300;

            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 40;
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
