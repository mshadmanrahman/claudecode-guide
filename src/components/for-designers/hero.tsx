'use client';

import Link from 'next/link';
import { Globe, FolderOpen, Terminal } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const JOURNEYS = [
  {
    id: 'claude-ai',
    label: 'Claude.ai',
    icon: Globe,
    tagline: 'The thinking partner',
    note: 'Claude lives in a Project tab alongside Figma. No terminal. No code.',
  },
  {
    id: 'co-work',
    label: 'Claude Co-Work',
    icon: FolderOpen,
    tagline: 'The active collaborator',
    note: 'Claude is in the session with you, pushing back in real-time.',
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    icon: Terminal,
    tagline: 'The prototype builder',
    note: 'Claude touches files, generates code, and changes the handoff.',
  },
];

export function DesignerHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <nav className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Structural overview</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">For UX designers</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Claude Code guide</span>
      </nav>

      <h1 className="font-serif text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        A designer doesn&apos;t<br />
        <em className="italic text-fd-muted-foreground">&apos;use Claude.&apos;</em><br />
        They pick a journey.
      </h1>

      <p className="mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        Three journeys. Three different types of designer. Three different before/afters. What changes in your day depends entirely on which path you are on.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {JOURNEYS.map((j) => {
          const Icon = j.icon;
          return (
            <div key={j.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Powered by
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
          href="/for-designers/set-up-claude"
          onClick={() => trackEvent('designer_hero_cta_click', { cta: 'start_guide_1', section: 'for-designers' })}
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Set up your workspace
        </Link>
        <Link
          href="#guides"
          onClick={() => trackEvent('designer_hero_cta_click', { cta: 'browse_guides', section: 'for-designers' })}
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Browse guides by path
        </Link>
      </div>
    </section>
  );
}
