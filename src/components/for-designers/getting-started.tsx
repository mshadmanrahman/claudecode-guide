'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';

const STEPS = [
  {
    num: '01',
    title: 'Pick your tool',
    body: 'Claude.ai for 8 guides with no setup. Claude Co-Work if you want Claude reading your local files. Claude Code if you want to build and run real components.',
  },
  {
    num: '02',
    title: 'Write your working agreement',
    body: 'Guide 1 walks you through it in 10 minutes. One block of text that tells Claude who you are, who you design for, and how you want output delivered. Every session starts from there.',
    href: '/for-designers/set-up-claude',
  },
  {
    num: '03',
    title: 'Pick any guide that matches today',
    body: 'Got a brief kickoff tomorrow? Guide 2. Running a heuristic eval next week? Guide 5. Each one is self-contained. No order required after the first.',
    href: '/for-designers',
  },
];

export function DesignerGettingStarted() {
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
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Getting started
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Three steps, and the first one takes 10 minutes.
          </p>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex gap-6 transition-all duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-background font-mono text-sm font-light text-fd-muted-foreground">
                {step.num}
              </div>
              <div className="pt-1">
                <h3 className="font-display text-lg font-medium text-fd-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{step.body}</p>
                {step.href && (
                  <Link
                    href={step.href}
                    onClick={() =>
                      trackEvent('designer_getting_started_click', {
                        step: step.num,
                        step_title: step.title,
                        section: 'for-designers',
                      })
                    }
                    className="mt-3 inline-flex items-center text-sm font-medium text-fd-foreground hover:underline"
                  >
                    {step.num === '02' ? 'Start Guide 1' : 'Browse all guides'} &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
