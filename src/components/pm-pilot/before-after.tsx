'use client';

import { useInView } from '@/hooks/use-in-view';

const comparisons = [
  {
    task: 'Meeting prep',
    before: "45 min digging through Jira, Slack, and last week's notes",
    after: '30 seconds. A brief lands in your terminal.',
  },
  {
    task: 'Weekly status',
    before: '2 hours assembling updates, chasing people, guessing at progress',
    after: 'Auto-generated from real Jira data, formatted and ready to send.',
  },
  {
    task: 'PRD writing',
    before: 'Staring at a blank Confluence template for 40 minutes',
    after: 'Guided braindump-first process. Structure comes after thinking.',
  },
  {
    task: 'Market sizing',
    before: 'Days of spreadsheet hell, questionable data sources',
    after: 'Structured TAM / SAM / SOM in minutes. Cite your assumptions.',
  },
];

export function PmPilotBeforeAfter() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">
            01
          </span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            What changes
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            PM Pilot doesn&apos;t replace your judgment. It removes everything blocking it.
          </p>
        </div>

        <div className="space-y-6">
          {comparisons.map((c, i) => (
            <div
              key={c.task}
              className={`rounded-xl border border-fd-border bg-fd-card p-6 sm:p-8 transition-all duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
                {c.task}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400/60" />
                  <p className="text-sm leading-relaxed text-fd-muted-foreground">
                    {c.before}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  <p className="text-sm leading-relaxed text-green-600 dark:text-green-400">
                    {c.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
