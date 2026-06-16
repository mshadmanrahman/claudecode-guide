'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { DAY_ART } from './claude-in-your-day-art';

const DAY_PREVIEW = [
  {
    time: '8am',
    title: 'Morning brief',
    description: 'Ask Claude what to focus on before email hijacks your day.',
  },
  {
    time: '10am',
    title: 'Research & draft',
    description: 'Give it rough notes, get a working first draft back.',
  },
  {
    time: '2pm',
    title: 'Review & refine',
    description: 'Share what you made. Claude makes it sharper.',
  },
  {
    time: '5pm',
    title: 'Day recap',
    description: 'Three bullets. Clean handoff. Tomorrow starts clear.',
  },
] as const;

export function ClaudeInYourDay() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewFired = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewFired.current) {
          viewFired.current = true;
          trackEvent('workflow_teaser_view');
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
        Your daily workflow
      </p>
      <h2 className="mb-3 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
        Claude, all day long
      </h2>
      <p className="mb-12 text-center text-fd-muted-foreground max-w-lg mx-auto">
        One task is fine. A full workflow is better. Here&apos;s what a day with Claude actually looks like.
      </p>

      <div className="grid grid-cols-1 gap-px bg-fd-border border border-fd-border rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {DAY_PREVIEW.map((item) => {
          const Art = DAY_ART[item.time];
          return (
            <div
              key={item.time}
              className="flex flex-col bg-fd-background p-6"
            >
              {Art && (
                <div className="mb-5 h-[72px] text-fd-foreground/35">
                  <Art />
                </div>
              )}
              <span className="mb-2 text-[10px] tracking-[0.18em] uppercase font-medium text-fd-muted-foreground">
                {item.time}
              </span>
              <h3 className="mb-2 font-display text-base font-bold tracking-tight text-fd-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/workflow"
          className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:underline"
          onClick={() => trackEvent('workflow_teaser_cta_click')}
        >
          See the full workflow, by role
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
