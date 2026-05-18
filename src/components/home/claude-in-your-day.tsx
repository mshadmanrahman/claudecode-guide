'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sun, Search, PenLine, Moon, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const DAY_PREVIEW = [
  {
    time: '8am',
    icon: Sun,
    title: 'Morning brief',
    description: 'Ask Claude what to focus on before email hijacks your day.',
    color: 'text-orange-500 dark:text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    time: '10am',
    icon: Search,
    title: 'Research & draft',
    description: 'Give it rough notes, get a working first draft back.',
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    time: '2pm',
    icon: PenLine,
    title: 'Review & refine',
    description: 'Share what you made. Claude makes it sharper.',
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    time: '5pm',
    icon: Moon,
    title: 'Day recap',
    description: 'Three bullets. Clean handoff. Tomorrow starts clear.',
    color: 'text-slate-500 dark:text-slate-400',
    bg: 'bg-slate-500/10',
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DAY_PREVIEW.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.time}
              className="rounded-xl border border-fd-border bg-fd-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <span className="font-mono text-xs text-fd-muted-foreground">{item.time}</span>
              </div>
              <h3 className="mb-2 font-display text-base font-normal tracking-tight text-fd-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
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
