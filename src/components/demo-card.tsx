'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';

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
  /** Override the max content height in px (default 280) */
  maxHeight?: number;
}

const TYPE_STYLES: Record<DemoStep['type'], string> = {
  cmd: 'text-[var(--ct-ink)]',
  out: 'text-[var(--ct-dim)]',
  success: 'text-[var(--ct-ok)]',
  warn: 'text-[#D77757]',
  error: 'text-red-700 dark:text-red-400',
};

export function DemoCard({ title = 'Terminal', steps, loop = true, loopDelay = 3000, maxHeight = 280 }: DemoCardProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [containerRef, isInView] = useInView(0.3);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom as new steps appear
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <div
      ref={containerRef}
      className="ctmock my-6 min-w-0 overflow-hidden rounded-xl border border-[var(--ct-edge)] bg-[var(--ct-bg)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)]"
    >
      {/* Title bar */}
      <div className="relative flex items-center gap-2 border-b border-[var(--ct-edge)] bg-[var(--ct-bar)] px-3.5 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="pointer-events-none absolute inset-x-20 truncate text-center font-mono text-[11.5px] text-[var(--ct-dim)]">
          {title}
        </span>
      </div>

      {/* Content : fixed height based on step count, scrolls when full */}
      <div
        ref={scrollRef}
        className="overflow-y-auto px-3 py-3 font-mono text-[12.5px] leading-[1.5] text-[var(--ct-ink)] sm:px-4"
        style={{ height: Math.min(Math.max(steps.length * 24 + 32, 100), maxHeight) }}
      >
        {steps.slice(0, visibleCount).map((step, i) => (
          <div
            key={i}
            className={`animate-fade-in ${step.type === 'cmd' ? 'mt-3 first:mt-0' : 'mt-0.5'}`}
          >
            {step.type === 'cmd' ? (
              <div>
                <span className="text-[var(--ct-dim)]">~ $ </span>
                <span className={TYPE_STYLES.cmd}>{step.text}</span> </div>
            ) : (
              <div className={TYPE_STYLES[step.type]}> {'  '}{step.text}
              </div>
            )}
          </div>
        ))}

        {/* Blinking cursor */}
        {visibleCount < steps.length && isInView && (
          <span className="inline-block h-4 w-1.5 animate-blink bg-[var(--ct-ink)] align-middle motion-reduce:animate-none" />
        )}
      </div>
    </div>
  );
}

