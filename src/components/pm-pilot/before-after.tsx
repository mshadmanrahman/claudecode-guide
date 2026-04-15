'use client';

import { useInView } from '@/hooks/use-in-view';

const comparisons = [
  {
    task: 'Meeting prep',
    before: "45 min digging through Jira, Slack, and last week's notes. Then the meeting starts.",
    after: '30 seconds. A brief drops in your terminal. You walk in actually ready.',
  },
  {
    task: 'Weekly status',
    before: '2 hours chasing people for updates and guessing at sprint progress',
    after: 'Pulled from real Jira data, formatted, ready to send. Takes a minute.',
  },
  {
    task: 'PRD writing',
    before: 'Staring at a blank Confluence template for 40 minutes, writing nothing',
    after: 'Braindump first, structure second. You think out loud; it organises the output.',
  },
  {
    task: 'Market sizing',
    before: 'Days in spreadsheets with numbers you half-trust',
    after: 'TAM, SAM, SOM with explicit assumptions baked in. Takes minutes.',
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
            What actually changes
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            I didn&apos;t want a tool that thinks for me. I wanted one that handles the busywork so I could actually think.
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
