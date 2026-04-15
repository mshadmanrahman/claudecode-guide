'use client';

import { useInView } from '@/hooks/use-in-view';

const principles = [
  {
    num: '01',
    text: 'Braindump before structure. Templates create false clarity. Thinking comes first; the skeleton follows.',
  },
  {
    num: '02',
    text: 'Memory beats transcripts. A 200-line memory file is more useful than scrolling back through a 50,000-token conversation.',
  },
  {
    num: '03',
    text: 'Skills load on demand. There are 25 of them, but only the ones you actually use ever touch your context window.',
  },
  {
    num: '04',
    text: 'Rules stay compressed. Around 950 tokens total. Not 9,500.',
  },
  {
    num: '05',
    text: 'Every session builds on the last. Corrections become saved rules. Meetings become stakeholder notes.',
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
            I tracked my time for a week. More than half of it was status updates, meeting prep, and chasing context across Jira and Slack. That&apos;s not product work. That&apos;s admin with a fancier title.
          </p>
          <p className="text-lg font-medium text-fd-foreground">
            So I built a system to eat the admin.
          </p>
          <p className="text-lg leading-relaxed text-fd-muted-foreground">
            14 years of PM experience across startups and enterprise, compressed into reusable skills. The kind of setup I always wanted but never had time to build properly. Until I did.
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
