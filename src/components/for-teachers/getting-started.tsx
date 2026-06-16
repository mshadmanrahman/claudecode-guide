'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';

const WHAT_YOU_NEED = [
  'A free Claude account at claude.ai',
  'A browser',
  'No technical setup: it works in any browser',
];

const HOW_IT_WORKS = [
  { num: '01', text: 'Open Claude.ai alongside your work.' },
  { num: '02', text: 'Describe what you need to create.' },
  { num: '03', text: "Copy Claude's output." },
  { num: '04', text: 'Edit and use it as you would any other resource.' },
];

export function TeacherGettingStarted() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28 bg-fd-card" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">03</span>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Getting started
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            No installation. No configuration. It works in a browser tab you open next to your planning doc.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* What you need */}
          <div
            className={`transition-all duration-500 delay-100 ${
              inView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
          >
            <h3 className="font-display text-lg font-medium text-fd-foreground mb-5">
              What you need
            </h3>
            <ul className="space-y-3">
              {WHAT_YOU_NEED.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-fd-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fd-primary/10 text-[10px] font-semibold text-fd-primary">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-fd-border bg-fd-background p-4">
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {"Claude's free tier is enough to follow all guides here. If you use Claude daily, Pro ($20/month) removes the rate limits."}
              </p>
            </div>
          </div>

          {/* How it works */}
          <div
            className={`transition-all duration-500 delay-200 ${
              inView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
          >
            <h3 className="font-display text-lg font-medium text-fd-foreground mb-5">
              How it works
            </h3>
            <div className="rounded-xl border border-fd-border bg-fd-background p-5 space-y-4">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-muted font-mono text-[11px] text-fd-muted-foreground">
                    {step.num}
                  </span>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed pt-0.5">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/for-teachers/write-lesson-plans-with-claude"
                onClick={() =>
                  trackEvent('teacher_getting_started_click', {
                    step: 'cta',
                    section: 'for-teachers',
                  })
                }
                className="inline-flex items-center text-sm font-medium text-fd-foreground hover:underline"
              >
                Start with Guide 1: Lesson plans &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
