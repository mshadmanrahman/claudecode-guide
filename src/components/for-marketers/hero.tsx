'use client';

import Link from 'next/link';
import { PenLine, Megaphone, BarChart2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const JOURNEYS = [
  {
    id: 'content',
    label: 'Content & copy',
    icon: PenLine,
    tagline: 'From brief to draft',
    note: 'Blog posts, social media, emails, and ad copy. Brief Claude properly and get a first draft worth editing.',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    tagline: 'Launch to results',
    note: 'Campaign copy, email sequences, ad variations, and landing page headlines for any campaign.',
  },
  {
    id: 'strategy',
    label: 'Research & strategy',
    icon: BarChart2,
    tagline: 'Before you write',
    note: 'Competitive analysis, customer persona research, and positioning angles.',
  },
];

export function MarketerHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <nav className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Structural overview</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">For marketers</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Claude Code guide</span>
      </nav>

      <h1 className="font-display text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        You have more to write<br />
        than hours to write it.<br />
        <em className="italic text-fd-muted-foreground">Claude doesn&apos;t replace your thinking. It removes the blank page.</em>
      </h1>

      <p className="mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        Social posts, blog drafts, email campaigns, ad copy, market research. Claude handles the drafting. You handle the strategy and the final call. These guides show you the workflow for each.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {JOURNEYS.map((j) => {
          const Icon = j.icon;
          return (
            <div key={j.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Journey
              </p>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-fd-foreground/70" />
                <span className="text-sm font-semibold text-fd-foreground">{j.label}</span>
              </div>
              <p className="text-xs font-medium text-fd-foreground/80 mb-1">{j.tagline}</p>
              <p className="text-[11px] leading-relaxed text-fd-muted-foreground">{j.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/for-marketers/give-claude-your-brand-voice"
          onClick={() =>
            trackEvent('marketer_hero_cta_click', { cta: 'start_guide_1', section: 'for-marketers' })
          }
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Start with brand voice
        </Link>
        <Link
          href="#guides"
          onClick={() =>
            trackEvent('marketer_hero_cta_click', { cta: 'browse_guides', section: 'for-marketers' })
          }
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
