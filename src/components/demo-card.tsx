'use client';

import { useEffect, useRef, useState } from 'react';

interface DemoStep {
  /** 'cmd' = user input, 'out' = Claude output, 'success' = green output, 'warn' = amber annotation, 'error' = red output */
  type: 'cmd' | 'out' | 'success' | 'warn' | 'error';
  text: string;
  /** Delay in ms before this step appears (relative to previous step) */
  delay?: number;
}

interface DemoCardProps {
  title?: string;
  steps: DemoStep[];
  /** Whether the demo loops */
  loop?: boolean;
  /** Pause in ms before restarting when looping */
  loopDelay?: number;
}

const TYPE_STYLES: Record<DemoStep['type'], string> = {
  cmd: 'text-fd-foreground font-medium',
  out: 'text-fd-muted-foreground text-xs',
  success: 'text-green-600 dark:text-green-400 text-xs',
  warn: 'text-amber-600 dark:text-amber-400 text-xs',
  error: 'text-red-600 dark:text-red-400 text-xs',
};

export function DemoCard({ title = 'Terminal', steps, loop = true, loopDelay = 3000 }: DemoCardProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) return;

    if (visibleCount >= steps.length) {
      if (!loop) return;
      const timer = setTimeout(() => setVisibleCount(0), loopDelay);
      return () => clearTimeout(timer);
    }

    const delay = steps[visibleCount]?.delay ?? (steps[visibleCount]?.type === 'cmd' ? 800 : 400);
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, steps, loop, loopDelay, isInView]);

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-hidden rounded-xl border border-fd-border shadow-sm bg-fd-card"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 font-mono text-[11px] text-fd-muted-foreground">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-[13px] leading-relaxed sm:p-5 sm:text-sm">
        {steps.slice(0, visibleCount).map((step, i) => (
          <div
            key={i}
            className={`animate-fade-in ${step.type === 'cmd' ? 'mt-3 first:mt-0' : 'mt-0.5'}`}
          >
            {step.type === 'cmd' ? (
              <div>
                <span className="text-green-600 dark:text-green-400">~</span>
                <span className="text-fd-muted-foreground"> $ </span>
                <span className={TYPE_STYLES.cmd}>{step.text}</span>
              </div>
            ) : (
              <div className={TYPE_STYLES[step.type]}>
                {'  '}{step.text}
              </div>
            )}
          </div>
        ))}

        {/* Blinking cursor */}
        {visibleCount < steps.length && isInView && (
          <span className="inline-block h-4 w-1.5 animate-blink bg-fd-foreground/60 align-middle" />
        )}
      </div>
    </div>
  );
}

/** Intersection Observer hook — triggers animation only when visible */
function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
