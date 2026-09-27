'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Plays a diagram's CSS sequence once, when it scrolls into view.
 * Server render is the finished state. The sequence only arms when the element
 * starts below the fold and motion is allowed, so nothing already on screen
 * blinks out and back. States: data-motion="armed" then "play" (globals.css, dv-seq).
 */
export function PlayOnView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.motion = 'armed';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.motion = 'play';
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
