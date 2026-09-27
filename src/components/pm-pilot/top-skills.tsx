'use client';

import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import { useInView } from '@/hooks/use-in-view';

const GRANOLA_AFFILIATE = 'https://www.granola.ai?via=shadman-rahman';

const skills = [
  {
    num: '01',
    name: '/meeting-prep',
    description:
      'Checks Jira, Slack, and your calendar, then gives you a brief. Who owes what, what got missed, what to ask. I use this before every 1:1.',
  },
  {
    num: '02',
    name: '/prd',
    description:
      'Asks you to brain-dump first. No template until the thinking is done. Genuinely prevents the thing where you write a whole PRD that says nothing.',
  },
  {
    num: '03',
    name: '/weekly-status',
    description:
      'Hits Jira, counts what closed, flags the blockers, writes the update. You just review and send.',
  },
  {
    num: '04',
    name: '/market-sizing',
    description:
      'TAM, SAM, SOM with all the assumptions written out. Saves you from the spreadsheet that nobody believes anyway.',
  },
  {
    num: '05',
    name: '/people-sync',
    description: (
      <>
        Reads transcripts from{' '}
        <a
          href={GRANOLA_AFFILIATE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Granola
        </a>{' '}
        and updates your stakeholder notes automatically. No more forgetting what you promised last week.
      </>
    ),
  },
];

const WEEKLY_STATUS_STEPS: ChatStep[] = [
  { role: 'user', text: 'Draft my weekly status.' },
  {
    role: 'claude',
    text: "Sprint 42 has 18 issues: 14 closed, 4 in progress. Two are blocked, INS-1204 and INS-1311.\n\n**This week:** shipped the auth refactor and closed 14 issues in Sprint 42.\n**Blocked:** INS-1204 (auth migration) is waiting on DevOps.\n**Next week:** resolve INS-1311, then Q2 planning kicks off Thursday.\n\nReady to paste into Slack or Confluence.",
  },
];

export function PmPilotTopSkills() {
  const [ref, inView] = useInView(0.1);
  const [demoRef, demoInView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            Five skills worth trying first
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Each one is a markdown file. Read it, edit it, fork it. Nothing is hidden.
          </p>
        </div>

        <div className="space-y-0 mb-20">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-start gap-6 border-b border-fd-border py-6 transition-all motion-reduce:transition-none duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80 + 100}ms` }}
            >
              <span className="font-mono text-lg font-light text-[var(--muted)] pt-0.5 shrink-0">
                {s.num}
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 sm:items-baseline">
                <span className="font-mono text-sm font-semibold text-[var(--acc)] shrink-0 sm:w-44">
                  {s.name}
                </span>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={demoRef}
          className={`transition-all motion-reduce:transition-none duration-500 ${
            demoInView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <AppChatDemo steps={WEEKLY_STATUS_STEPS} loop loopDelay={4000} />
        </div>
      </div>
    </section>
  );
}
