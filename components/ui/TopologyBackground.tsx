"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export function TopologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise3D = createNoise3D();
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      if (!ctx || !canvas) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Configuration
      const lines = 20;
      const step = 10; // Resolution of the grid
      const scale = 0.003; // Noise scale
      const speed = 0.0001; // Animation speed
      
      ctx.lineWidth = 1;
      
      // Draw isolines
      // We'll use a simplified approach: scanning rows and drawing curves based on noise height
      // This creates a "joy division" style plot which looks like topography
      
      const rows = 40;
      const rowHeight = height / rows;
      
      for (let y = 0; y < height; y += rowHeight) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(200, 119, 62, 0.15)"; // Supplied Amber low opacity
        
        let hasStarted = false;
        
        for (let x = 0; x <= width; x += step) {
          const noiseValue = noise3D(x * scale, y * scale, time * speed);
          const yOffset = noiseValue * 80; // Amplitude
          
          // Fade out edges
          const distFromCenter = Math.abs(width / 2 - x) / (width / 2);
          const fade = Math.max(0, 1 - Math.pow(distFromCenter, 2));
          
          const finalY = y + yOffset * fade;
          
          if (!hasStarted) {
            ctx.moveTo(x, finalY);
            hasStarted = true;
          } else {
            ctx.lineTo(x, finalY);
          }
        }
        
        ctx.stroke();
      }
      
      // Add a second layer for depth
      for (let y = rowHeight / 2; y < height; y += rowHeight) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"; // White very low opacity
        
        let hasStarted = false;
        
        for (let x = 0; x <= width; x += step) {
          const noiseValue = noise3D(x * scale + 100, y * scale + 100, time * speed);
          const yOffset = noiseValue * 60;
          
          const distFromCenter = Math.abs(width / 2 - x) / (width / 2);
          const fade = Math.max(0, 1 - Math.pow(distFromCenter, 2));
          
          const finalY = y + yOffset * fade;
          
          if (!hasStarted) {
            ctx.moveTo(x, finalY);
            hasStarted = true;
          } else {
            ctx.lineTo(x, finalY);
          }
        }
        
        ctx.stroke();
      }

      time++;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
