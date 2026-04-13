'use client';

import { useInView } from '@/hooks/use-in-view';

const principles = [
  {
    num: '01',
    text: 'Braindump before structure. Never open a template before the thinking is externalized.',
  },
  {
    num: '02',
    text: 'Memory over transcripts. A 200-line memory file beats a 50,000-token session replay.',
  },
  {
    num: '03',
    text: 'Skills load on demand. 25 skills, zero startup cost.',
  },
  {
    num: '04',
    text: 'Rules are compressed. Around 950 tokens total, not 9,500.',
  },
  {
    num: '05',
    text: 'Every session compounds. Corrections become rules. Meetings become stakeholder intelligence.',
  },
];

export function PmPilotWhyExists() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">08</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Why this exists
          </h2>
        </div>

        <div
          className={`mb-16 max-w-3xl space-y-6 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          <p className="text-lg leading-relaxed text-fd-muted-foreground">
            PMs spend 60% of their time on status updates, meeting prep, and context-gathering.
            Not on product thinking. Not on strategy. Not on the work that actually moves the
            needle.
          </p>
          <p className="text-lg font-medium text-fd-foreground">
            PM Pilot gives you that time back.
          </p>
          <p className="text-lg leading-relaxed text-fd-muted-foreground">
            It started as one PM&apos;s personal setup. 14 years of product experience across
            startups and enterprise, distilled into reusable skills and workflows. The kind of
            system you&apos;d build for yourself if you had the time.
          </p>
        </div>

        <div className="space-y-0">
          {principles.map((p, i) => (
            <div
              key={p.num}
              className={`flex items-start gap-6 border-b border-fd-border py-6 transition-all duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80 + 200}ms` }}
            >
              <span className="font-mono text-lg font-light text-fd-muted-foreground/40 pt-0.5 shrink-0">
                {p.num}
              </span>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
