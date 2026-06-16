'use client';

import Link from 'next/link';
import { Globe, Puzzle, LayoutGrid } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const JOURNEYS = [
  {
    id: 'browser-basics',
    label: 'Browser basics',
    icon: Globe,
    tagline: 'No extensions needed',
    note: "Just claude.ai open in a tab. Enough to get things done.",
  },
  {
    id: 'chrome-extension',
    label: 'Chrome extension',
    icon: Puzzle,
    tagline: 'One click from anywhere',
    note: "Claude in your toolbar. Access it without leaving the page you're on.",
  },
  {
    id: 'google-workspace',
    label: 'Google Workspace',
    icon: LayoutGrid,
    tagline: 'Gmail, Docs, Sheets',
    note: 'Claude running alongside the Google tools you already use every day.',
  },
];

export function ChromeHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <nav className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">All guides</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">For Chrome users</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Claude Code guide</span>
      </nav>

      <h1 className="font-display text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        You have a browser.<br />
        <em className="italic text-fd-muted-foreground">Claude runs in it.</em><br />
        Here&apos;s what to actually do.
      </h1>

      <p className="mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        No code. No installs required to start. Claude.ai works in Chrome like any other website, but most people use 5% of what it can do. These guides cover the other 95%, from browser basics to the Chrome extension to running Claude alongside Gmail and Google Docs.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {JOURNEYS.map((j) => {
          const Icon = j.icon;
          return (
            <div key={j.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Path
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
          href="/for-chrome/get-started-with-claude-in-your-browser"
          onClick={() => trackEvent('chrome_hero_cta_click', { cta: 'start_guide_1', section: 'for-chrome' })}
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Start with Guide 1
        </Link>
        <Link
          href="#guides"
          onClick={() => trackEvent('chrome_hero_cta_click', { cta: 'browse_guides', section: 'for-chrome' })}
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
