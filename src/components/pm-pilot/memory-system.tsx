'use client';

import { useInView } from '@/hooks/use-in-view';

const directoryStructure = `~/.claude/memory/
  MEMORY.md              - always loaded, under 200 lines
  project_*.md           - one file per project you own
  feedback_*.md          - corrections (so Claude doesn't repeat mistakes)
  user_*.md              - your preferences and working style
  people/                - one file per key person
    sarah-chen.md
    marco-vidal.md`;

interface TimelineStep {
  day: string;
  label: string;
  description: string;
}

const timeline: TimelineStep[] = [
  {
    day: '1',
    label: 'Day 1',
    description: 'Memory is empty. You explain your projects, your team, your preferences. Just this once.',
  },
  {
    day: '5',
    label: 'Day 5',
    description:
      'Projects, key people, and preferences are saved. You spend a lot less time re-explaining things.',
  },
  {
    day: '15',
    label: 'Day 15',
    description:
      'Meeting prep starts pulling stakeholder context automatically. Patterns from past sessions are baked in.',
  },
  {
    day: '30',
    label: 'Day 30',
    description:
      'Sessions start with full context loaded. You just say what you need. No backstory.',
  },
];

export function PmPilotMemorySystem() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="bg-fd-muted py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">07</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            It remembers things, so you don&apos;t have to repeat them
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Every other AI tool starts fresh each session. PM Pilot builds a persistent knowledge base. You explain your context once. That&apos;s it.
          </p>
        </div>

        {/* Directory structure */}
        <div
          className={`mb-16 overflow-x-auto rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
            How the memory is structured
          </p>
          <pre className="font-mono text-xs leading-relaxed text-fd-foreground">
            {directoryStructure}
          </pre>
        </div>

        {/* Timeline */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((step, i) => (
            <div
              key={step.day}
              className={`rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <span className="font-mono text-4xl font-light text-fd-border">{step.day}</span>
              <p className="mt-3 text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-400">
                {step.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div
          className={`mt-10 rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '700ms' }}
        >
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            <span className="font-medium text-fd-foreground">Here&apos;s the thing:</span> every time you correct something, that correction gets saved. You say it once. It doesn&apos;t come up again.
          </p>
        </div>
      </div>
    </section>
  );
}
