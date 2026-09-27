'use client';

import { useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  /** ms before the count starts, matched to the hero choreography in globals.css */
  delay?: number;
  duration?: number;
}

/**
 * Renders the final number on the server, then ticks up from 0 after hydration.
 * Reduced motion, or a tab opened in the background, keeps the server value.
 * Width is reserved with tabular figures so the line never reflows while the
 * digits change.
 */
export function CountUp({ to, delay = 0, duration = 1200 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let t0 = 0;
    el.textContent = '0';
    const frame = (ts: number) => {
      if (!t0) t0 = ts;
      const t = Math.min((ts - t0 - delay) / duration, 1);
      const eased = t <= 0 ? 0 : 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = String(to);
    };
  }, [to, delay, duration]);

  return (
    <span
      ref={ref}
      className="inline-block text-right tabular-nums"
      style={{ minWidth: `${String(to).length}ch` }}
    >
      {to}
    </span>
  );
}
