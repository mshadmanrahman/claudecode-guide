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
    after: 'Braindump first, structure second. You think out loud; it organizes the output.',
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
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
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
              className={`glass rounded-xl p-6 sm:p-8 transition-all motion-reduce:transition-none duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <h3 className="mb-4 text-lg font-semibold text-fd-foreground">
                {c.task}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[var(--code)]" />
                  <p className="text-sm leading-relaxed text-fd-muted-foreground">
                    {c.before}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[var(--acc)]" />
                  <p className="text-sm leading-relaxed text-[var(--acc)] ">
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
