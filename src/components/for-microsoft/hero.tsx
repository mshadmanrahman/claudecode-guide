'use client';

import Link from 'next/link';
import { FileText, BarChart2, Monitor } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const JOURNEYS = [
  {
    id: 'word',
    label: 'Microsoft Word',
    icon: FileText,
    tagline: 'Draft and edit documents',
    note: 'Give Claude a brief, get a first draft. Paste existing text, get it improved.',
  },
  {
    id: 'excel',
    label: 'Microsoft Excel',
    icon: BarChart2,
    tagline: 'Formulas and data analysis',
    note: 'Describe what you want to calculate. Claude writes the formula. Works every time.',
  },
  {
    id: 'powerpoint',
    label: 'Microsoft PowerPoint',
    icon: Monitor,
    tagline: 'Presentations and slides',
    note: "Outline decks, write talking points, sharpen slides that aren't clicking.",
  },
];

export function MicrosoftHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <nav className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">
          Structural overview
        </span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">
          For Microsoft Office users
        </span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">
          Claude Code guide
        </span>
      </nav>

      <h1 className="font-serif text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        Claude doesn&apos;t have a Word add-in.<br />
        <em className="italic text-fd-muted-foreground">It doesn&apos;t need one.</em><br />
        Here&apos;s the workflow.
      </h1>

      <p className="mt-6 max-w-lg text-sm font-medium text-fd-muted-foreground italic">
        Copy. Paste. Claude.
      </p>

      <p className="mt-4 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        Microsoft 365 doesn&apos;t integrate with Claude natively. That&apos;s fine: the copy-paste
        workflow is faster than you&apos;d think, and it works for Word, Excel, PowerPoint, and
        Outlook. These guides walk you through it.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {JOURNEYS.map((j) => {
          const Icon = j.icon;
          return (
            <div key={j.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Works with
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
          href="/for-microsoft/write-faster-in-word-with-claude"
          onClick={() =>
            trackEvent('microsoft_hero_cta_click', {
              cta: 'start_with_word',
              section: 'for-microsoft',
            })
          }
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Start with Word
        </Link>
        <Link
          href="#guides"
          onClick={() =>
            trackEvent('microsoft_hero_cta_click', {
              cta: 'browse_guides',
              section: 'for-microsoft',
            })
          }
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
