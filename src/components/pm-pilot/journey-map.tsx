'use client';

import { useInView } from '@/hooks/use-in-view';

const GRANOLA_AFFILIATE = 'https://www.granola.ai?via=shadman-rahman';
const GUIDE_URL = 'https://claudecodeguide.dev';

const levels = [
  {
    level: '01',
    title: 'Any AI chat, right now',
    subtitle: 'Zero install',
    description:
      'Grab any skill file from GitHub and paste it into ChatGPT, Claude, or Gemini. No terminal. No account. You can try this in the next 2 minutes.',
    link: null,
  },
  {
    level: '02',
    title: 'Claude Desktop',
    subtitle: '5 min setup',
    description:
      'Create a project in Claude Desktop and paste any skill into the project instructions. No terminal needed. Skills stick across every conversation.',
    link: null,
  },
  {
    level: '03',
    title: 'Claude Code CLI',
    subtitle: 'Live Jira, Slack, Calendar',
    description:
      'This is where it gets serious. PM Pilot reads live data: real tickets, real Slack threads, real deadlines. I use this every day.',
    link: GUIDE_URL,
  },
];

export function PmPilotJourneyMap() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="bg-fd-muted py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16">
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">
            02
          </span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Start where you are
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Never opened a terminal? Fine. You can get value from PM Pilot today, without installing anything. Upgrade whenever you&apos;re ready.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {levels.map((l, i) => (
            <div
              key={l.level}
              className={`relative rounded-xl border border-fd-border bg-fd-card p-8 flex flex-col gap-6 transition-all duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="font-mono text-6xl font-light text-fd-border">
                {l.level}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-fd-foreground">{l.title}</h3>
                <p className="text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-400">
                  {l.subtitle}
                </p>
              </div>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                {l.description}
              </p>

              {l.level === '03' && (
                <div className="mt-auto flex flex-col gap-2 text-sm">
                  <a
                    href={GRANOLA_AFFILIATE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Add{' '}
                    <span className="font-medium text-fd-foreground underline underline-offset-2">
                      Granola
                    </span>{' '}
                    to get meeting transcripts too
                  </a>
                  <a
                    href={GUIDE_URL}
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Full setup guide at{' '}
                    <span className="font-medium text-fd-foreground underline underline-offset-2">
                      claudecodeguide.dev
                    </span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
