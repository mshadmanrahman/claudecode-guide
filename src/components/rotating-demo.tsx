'use client';

import { useEffect, useState, useCallback } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Gamepad2, ClipboardList, BarChart3 } from 'lucide-react';

interface DemoStep {
  type: 'cmd' | 'out' | 'success' | 'warn';
  text: string;
  delay?: number;
}

interface DemoSequence {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: DemoStep[];
}

const TYPE_STYLES: Record<DemoStep['type'], string> = {
  cmd: 'text-fd-foreground font-medium',
  out: 'text-fd-muted-foreground text-xs',
  success: 'text-green-600 dark:text-green-400 text-xs',
  warn: 'text-amber-600 dark:text-amber-400 text-xs',
};

const DEMOS: DemoSequence[] = [
  {
    id: 'build',
    label: 'Build',
    icon: Gamepad2,
    steps: [
      { type: 'cmd', text: '"build me a quiz game about world history"' },
      { type: 'out', text: 'Creating project structure...', delay: 600 },
      { type: 'out', text: 'Writing game logic and UI...', delay: 500 },
      { type: 'out', text: 'Adding 20 questions across 4 categories...', delay: 400 },
      { type: 'success', text: '\u2713 Quiz game ready \u2014 run npm start to play', delay: 600 },
    ],
  },
  {
    id: 'organize',
    label: 'Organize',
    icon: ClipboardList,
    steps: [
      { type: 'cmd', text: '"summarize my meeting notes and list the action items"' },
      { type: 'out', text: 'Reading meeting-notes-apr-11.md...', delay: 600 },
      { type: 'out', text: 'Extracting decisions and action items...', delay: 500 },
      { type: 'success', text: '\u2713 3 decisions captured, 5 action items extracted', delay: 500 },
      { type: 'warn', text: '\u2192 Saved to action-items.md', delay: 400 },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: BarChart3,
    steps: [
      { type: 'cmd', text: '"read sales.csv and chart revenue by month"' },
      { type: 'out', text: 'Analyzing 2,847 rows across 14 months...', delay: 600 },
      { type: 'out', text: 'Generating interactive chart...', delay: 500 },
      { type: 'success', text: '\u2713 Chart saved to revenue-by-month.html', delay: 500 },
      { type: 'warn', text: '\u2192 Revenue up 23% since October', delay: 400 },
    ],
  },
];

const CYCLE_INTERVAL = 8000;

export function RotatingDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerRef, isInView] = useInView(0.2);

  const activeDemo = DEMOS[activeIndex];

  const switchTo = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setVisibleCount(0);
      setIsTransitioning(false);
    }, 200);
  }, [activeIndex]);

  // Step progression
  useEffect(() => {
    if (!isInView || isTransitioning) return;

    if (visibleCount >= activeDemo.steps.length) return;

    const delay = activeDemo.steps[visibleCount]?.delay ?? (activeDemo.steps[visibleCount]?.type === 'cmd' ? 800 : 400);
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, activeDemo, isInView, isTransitioning]);

  // Auto-cycle to next demo
  useEffect(() => {
    if (!isInView) return;
    if (visibleCount < activeDemo.steps.length) return;

    const timer = setTimeout(() => {
      const next = (activeIndex + 1) % DEMOS.length;
      switchTo(next);
    }, CYCLE_INTERVAL);
    return () => clearTimeout(timer);
  }, [visibleCount, activeDemo.steps.length, activeIndex, isInView, switchTo]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Tab selector */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {DEMOS.map((demo, i) => {
          const Icon = demo.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={demo.id}
              onClick={() => switchTo(i)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-fd-primary text-fd-primary-foreground shadow-sm'
                  : 'bg-fd-card text-fd-muted-foreground border border-fd-border hover:bg-fd-accent hover:text-fd-foreground'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {demo.label}
            </button>
          );
        })}
      </div>

      {/* Terminal window */}
      <div className="overflow-hidden rounded-xl border border-fd-border shadow-lg bg-fd-card">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-fd-muted-foreground">claude-code</span>
        </div>

        {/* Content */}
        <div
          className={`p-6 font-mono text-[13px] leading-loose sm:text-sm transition-opacity duration-200 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ minHeight: 300 }}
        >
          {activeDemo.steps.slice(0, visibleCount).map((step, i) => (
            <div
              key={`${activeDemo.id}-${i}`}
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
          {visibleCount < activeDemo.steps.length && isInView && (
            <span className="inline-block h-4 w-1.5 animate-blink bg-fd-foreground/60 align-middle" />
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {DEMOS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-fd-foreground' : 'w-1.5 bg-fd-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
