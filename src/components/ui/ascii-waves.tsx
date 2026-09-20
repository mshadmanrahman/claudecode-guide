"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function AsciiWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // A curated set of characters for that premium, mystical matrix vibe
    const chars = " ‧⠤⠒⠓⠚⠋⠉⠙⠹⠸⠼⠴⠦⠧⠇⠏⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏".split("");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      // Determine if we are in dark mode
      const currentTheme = theme === 'system' ? systemTheme : theme;
      const isDark = currentTheme === 'dark';

      // Clear with background color matching the theme
      ctx.fillStyle = isDark ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const charWidth = 14;
      const charHeight = 14;
      
      const cols = Math.floor(canvas.width / charWidth) + 1;
      const rows = Math.floor(canvas.height / charHeight) + 1;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Generate organic, fluid wave mathematics
          const wave1 = Math.sin((x * 0.08) + time * 0.8);
          const wave2 = Math.cos((y * 0.06) - time * 0.5);
          const wave3 = Math.sin((x * 0.04) + (y * 0.04) + time * 1.1);
          
          // Combine waves and normalize to 0..1
          const noise = (wave1 + wave2 + wave3) / 3; 
          const normalized = (noise + 1) / 2;
          
          // Select character based on wave height
          const charIndex = Math.floor(normalized * chars.length);
          const char = chars[Math.min(charIndex, chars.length - 1)];

          if (char === " ") continue; // skip rendering empty spaces for performance

          // Gentle uniform fade, not clustered in the center
          const distFromCenterY = Math.abs(y - rows/2) / (rows/2);
          
          // Create a subtle horizontal band where the main text lives (fade out the middle row)
          const centerTextZone = Math.max(0, 1 - (1.0 - distFromCenterY) * 1.5);
          
          const maxOpacity = isDark ? (0.1 + normalized * 0.3) : (0.05 + normalized * 0.15);
          const finalOpacity = maxOpacity * centerTextZone;
          
          if (finalOpacity > 0.01) {
            // White text for dark mode, dark text for light mode
            const rgb = isDark ? "255, 255, 255" : "0, 0, 0";
            ctx.fillStyle = `rgba(${rgb}, ${finalOpacity})`;
            ctx.fillText(char, x * charWidth, y * charHeight);
          }
        }
      }

      time += 0.005; // Slow, mystical wave speed
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, systemTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
