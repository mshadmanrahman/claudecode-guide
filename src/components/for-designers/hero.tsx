'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

import { AudienceDemoPanel } from '@/components/audience-demo-panel';
import { KineticText } from '@/components/kinetic-text';
const JOURNEYS = [
  {
    id: 'web',
    label: 'On the web',
    tagline: 'Nothing to install.',
    note: 'Open claude.ai in any browser. A Project keeps your working agreement next to Figma. Start here.',
    href: '#guides',
  },
  {
    id: 'desktop',
    label: 'In the desktop app',
    tagline: 'Claude reads your files.',
    note: 'The Claude app for Mac or Windows. Point it at a folder of briefs and Figma exports so you stop pasting.',
    href: '#guides',
  },
];

export function DesignerHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20">
      {/* Category label */}

      {/* Headline, staggered line by line */}
      <h1 className="font-display tracking-[-0.035em] leading-[1.05] font-semibold">
        <KineticText>
        <span
          className="block text-5xl font-medium text-fd-foreground sm:text-6xl lg:text-[5.5rem]"
        >
          You tried Claude.
        </span>
        <span
          className="block text-5xl font-medium sm:text-6xl lg:text-[5.5rem]"
        >
          <span className="text-[var(--muted)]">It felt generic.</span>
        </span>
        <span
          className="block text-5xl font-medium text-fd-foreground sm:text-6xl lg:text-[5.5rem]"
        >
          That&apos;s a setup problem.
        </span>
        </KineticText>
      </h1>

      <p
        className="hm-rise mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed"
        style={{ animationDelay: '400ms' }}
      >
        Claude doesn&apos;t know you design for first-time mobile users on low-end Android in a
        price-sensitive market. It knows you&apos;re a person with a question. These guides fix
        that.
      </p>

      <AudienceDemoPanel
        audience="designers"
        className="hm-rise mt-12 h-[560px] rounded-3xl border border-[var(--line)] md:h-[460px]"
      />

      {/* Journey cards */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {JOURNEYS.map((j, i) => (
          <Link
            key={j.id}
            href={j.href}
            onClick={() =>
              trackEvent('designer_hero_journey_click', { journey: j.id, section: 'for-designers' })
            }
            className="glass group relative flex flex-col justify-between rounded-xl p-6 transition-colors duration-200 hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            style={{ animationDelay: `${500 + i * 80}ms` }}
          >
            {/* Large background number */}

            <div>
              <p className="font-display text-xl font-medium text-fd-foreground leading-snug group-hover:text-fd-foreground transition-colors">
                {j.label}
              </p>
              <p className="mt-1 text-sm font-medium text-fd-muted-foreground">
                {j.tagline}
              </p>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[var(--muted)] border-t border-fd-border pt-4">
              {j.note}
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-sm text-fd-muted-foreground">
        Want Claude to build working prototypes? Two guides use the Code tab of the desktop app.{' '}
        <Link href="#guides" className="font-medium text-fd-foreground underline underline-offset-4 hover:no-underline">
          See them
        </Link>
      </p>

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
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--acc)] px-6 text-sm font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Start with Guide 1
        </Link>
        <Link
          href="#guides"
          onClick={() =>
            trackEvent('designer_hero_cta_click', { cta: 'browse_guides', section: 'for-designers' })
          }
          className="glass inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
