'use client';

import { useInView } from '@/hooks/use-in-view';

const WHAT_YOU_NEED = [
  'A Claude account (free tier works)',
  'A browser',
  'Your brand voice examples: 3 to 5 pieces of existing content that sound most like you',
];

const WORKFLOW_STEPS = [
  { num: '01', step: 'Open Claude.ai in your browser.' },
  { num: '02', step: 'Paste your brand voice prompt (Guide 1 shows you how).' },
  { num: '03', step: 'Brief Claude with your task.' },
  { num: '04', step: 'Edit the draft.' },
  { num: '05', step: 'Publish.' },
];

export function MarketerGettingStarted() {
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
            No setup required. You need a browser, a Claude account, and your existing content.
          </p>
        </div>

        <div
          className={`grid gap-8 sm:grid-cols-2 transition-all duration-500 delay-100 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          {/* What you need */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
              What you need
            </p>
            <ul className="space-y-3">
              {WHAT_YOU_NEED.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-background font-mono text-[10px] text-fd-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-fd-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The basic workflow */}
          <div className="rounded-xl border border-fd-border bg-fd-background p-6">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
              The basic workflow
            </p>
            <ol className="space-y-4">
              {WORKFLOW_STEPS.map((item) => (
                <li key={item.num} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-fd-muted-foreground/50 mt-0.5 w-5 shrink-0">
                    {item.num}
                  </span>
                  <span className="text-sm text-fd-foreground leading-relaxed">{item.step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-[11px] text-fd-muted-foreground leading-relaxed border-t border-fd-border pt-4">
              The free tier is enough to follow all guides here. Pro ($20/month) removes the rate
              limit if you&apos;re writing a lot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
