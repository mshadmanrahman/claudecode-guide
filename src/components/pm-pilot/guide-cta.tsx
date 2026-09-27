'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';

const SKILLS = [
  { name: '/meeting-prep', href: '/pm-pilot/guide/skills/meeting-prep' },
  { name: '/prd', href: '/pm-pilot/guide/skills/prd' },
  { name: '/weekly-status', href: '/pm-pilot/guide/skills/weekly-status' },
  { name: '/people-sync', href: '/pm-pilot/guide/skills/people-sync' },
  { name: '/deep-context', href: '/pm-pilot/guide/skills/deep-context' },
  { name: '/market-sizing', href: '/pm-pilot/guide/skills/market-sizing' },
  { name: '/prioritize', href: '/pm-pilot/guide/skills/prioritize' },
  { name: '/synthesize-interviews', href: '/pm-pilot/guide/skills/synthesize-interviews' },
  { name: '/critique', href: '/pm-pilot/guide/skills/critique' },
  { name: '/ask-company', href: '/pm-pilot/guide/skills/ask-company' },
  { name: '/dogfood', href: '/pm-pilot/guide/skills/dogfood' },
  { name: '/lenny-podcast', href: '/pm-pilot/guide/skills/lenny-podcast' },
  { name: '/session-init', href: '/pm-pilot/guide/productivity/session-init' },
  { name: '/handoff-doc', href: '/pm-pilot/guide/productivity/handoff-doc' },
  { name: '/orchestrator', href: '/pm-pilot/guide/productivity/orchestrator' },
  { name: '/strategic-compact', href: '/pm-pilot/guide/productivity/strategic-compact' },
  { name: '/manifest-reader', href: '/pm-pilot/guide/productivity/manifest-reader' },
  { name: '/meta-observer', href: '/pm-pilot/guide/productivity/meta-observer' },
  { name: '/tdd-workflow', href: '/pm-pilot/guide/dev/tdd-workflow' },
  { name: '/verification-loop', href: '/pm-pilot/guide/dev/verification-loop' },
  { name: '/search-first', href: '/pm-pilot/guide/dev/search-first' },
  { name: '/security-review', href: '/pm-pilot/guide/dev/security-review' },
  { name: '/market-research', href: '/pm-pilot/guide/content-writing/market-research' },
  { name: '/writing-style', href: '/pm-pilot/guide/content-writing/writing-style' },
  { name: '/writing-substack', href: '/pm-pilot/guide/content-writing/writing-substack' },
];

export function PmPilotGuideCta() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            Pick the skill that matches your biggest time sink.
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            All 25 skills. Each one has a real prompt and the output you should expect. No vague promises about what AI "might" do for you.
          </p>
        </div>

        <div
          className={`mt-10 flex flex-wrap gap-2 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
          style={{ animationDelay: '150ms' }}
        >
          {SKILLS.map((skill) => (
            <Link
              key={skill.name}
              href={skill.href}
              onClick={() => trackEvent('pm_pilot_skill_chip_click', { skill: skill.name })}
              className="glass rounded-lg px-3 py-2 font-mono text-sm text-fd-muted-foreground transition-colors hover:border-[var(--acc)] hover:bg-[var(--chip)] hover:text-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            >
              {skill.name}
            </Link>
          ))}
        </div>

        <div
          className={`mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
          style={{ animationDelay: '250ms' }}
        >
          <Link
            href="/pm-pilot/guide"
            onClick={() => trackEvent('pm_pilot_open_guide_click', { source: 'landing_cta' })}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            Open the guide
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/mshadmanrahman/pm-pilot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('pm_pilot_github_click', { source: 'landing_cta' })}
            className="glass inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
