'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const JOURNEYS = [
  {
    id: 'claude-ai',
    num: '01',
    label: 'Browser only',
    tagline: 'No terminal. No setup.',
    note: 'Claude lives in a Project tab alongside Figma. You stay in the browser. Start here.',
    href: '#guides',
  },
  {
    id: 'co-work',
    num: '02',
    label: 'Thinking partner',
    tagline: 'Claude in the session with you.',
    note: 'Upload your briefs and Figma exports. Claude pushes back on decisions in real-time.',
    href: '#guides',
  },
  {
    id: 'claude-code',
    num: '03',
    label: 'Prototype builder',
    tagline: 'Claude touches your files.',
    note: 'Turns design into running code. Changes the handoff. Requires a terminal.',
    href: '#guides',
  },
];

export function DesignerHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20">
      {/* Category label */}
      <p className="animate-slide-up-fade mb-8 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
        For UX Designers
      </p>

      {/* Headline — staggered line by line */}
      <h1 className="font-display tracking-tight leading-[1.05]">
        <span
          className="block animate-slide-up-fade text-5xl font-medium text-fd-foreground sm:text-6xl lg:text-[5.5rem]"
          style={{ animationDelay: '80ms' }}
        >
          You tried Claude.
        </span>
        <span
          className="block animate-slide-up-fade text-5xl font-medium sm:text-6xl lg:text-[5.5rem]"
          style={{ animationDelay: '180ms' }}
        >
          <em className="italic text-fd-muted-foreground">It felt generic.</em>
        </span>
        <span
          className="block animate-slide-up-fade text-5xl font-medium text-fd-foreground sm:text-6xl lg:text-[5.5rem]"
          style={{ animationDelay: '280ms' }}
        >
          That&apos;s a setup problem.
        </span>
      </h1>

      <p
        className="animate-slide-up-fade mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed"
        style={{ animationDelay: '400ms' }}
      >
        Claude doesn&apos;t know you design for first-time mobile users on low-end Android in a
        price-sensitive market. It knows you&apos;re a person with a question. These guides fix
        that.
      </p>

      {/* Journey cards */}
      <div className="mt-14 grid gap-px bg-fd-border sm:grid-cols-3 rounded-xl overflow-hidden border border-fd-border">
        {JOURNEYS.map((j, i) => (
          <Link
            key={j.id}
            href={j.href}
            onClick={() =>
              trackEvent('designer_hero_journey_click', { journey: j.id, section: 'for-designers' })
            }
            className="group relative flex flex-col justify-between bg-fd-background p-6 transition-colors duration-200 hover:bg-fd-accent/40"
            style={{ animationDelay: `${500 + i * 80}ms` }}
          >
            {/* Large background number */}
            <span className="pointer-events-none absolute right-4 top-3 font-mono text-6xl font-light text-fd-muted-foreground/8 select-none leading-none">
              {j.num}
            </span>

            <div>
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground/50">
                Path {j.num}
              </p>
              <p className="font-display text-xl font-medium text-fd-foreground leading-snug group-hover:text-fd-foreground transition-colors">
                {j.label}
              </p>
              <p className="mt-1 text-sm font-medium text-fd-muted-foreground">
                {j.tagline}
              </p>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-fd-muted-foreground/70 border-t border-fd-border pt-4">
              {j.note}
            </p>
          </Link>
        ))}
      </div>

      {/* CTAs */}
      <div
        className="animate-slide-up-fade mt-10 flex flex-wrap items-center gap-4"
        style={{ animationDelay: '700ms' }}
      >
        <Link
          href="/for-designers/set-up-claude"
          onClick={() =>
            trackEvent('designer_hero_cta_click', { cta: 'start_guide_1', section: 'for-designers' })
          }
          className="inline-flex items-center rounded-lg bg-fd-foreground px-6 py-3 text-sm font-semibold text-fd-background hover:opacity-80 transition-opacity"
        >
          Start with Guide 1
        </Link>
        <Link
          href="#guides"
          onClick={() =>
            trackEvent('designer_hero_cta_click', { cta: 'browse_guides', section: 'for-designers' })
          }
          className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          Browse all guides →
        </Link>
      </div>
    </section>
  );
}
