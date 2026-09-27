'use client';

import Link from 'next/link';
import { FileText, BarChart2, Monitor } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

import { KineticText } from '@/components/kinetic-text';
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
      <h1 className="font-display text-[clamp(38px,9vw,48px)] font-semibold tracking-[-0.035em] text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        <KineticText>Claude doesn&apos;t have a Word add-in.<br />
        <span className="text-[var(--muted)]">It doesn&apos;t need one.</span><br />
        Here&apos;s the workflow.</KineticText>
      </h1>

      <p className="hm-rise mt-6 max-w-lg text-sm font-medium text-fd-muted-foreground">
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
            <div key={j.id} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-fd-foreground/70" />
                <span className="text-sm font-semibold text-fd-foreground">{j.label}</span>
              </div>
              <p className="text-xs font-medium text-fd-foreground mb-1">{j.tagline}</p>
              <p className="text-xs leading-relaxed text-[var(--muted)]">{j.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Link
          href="/for-microsoft/write-faster-in-word-with-claude"
          onClick={() =>
            trackEvent('microsoft_hero_cta_click', {
              cta: 'start_with_word',
              section: 'for-microsoft',
            })
          }
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
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
          className="glass inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
