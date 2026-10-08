'use client';

import Link from 'next/link';
import { Globe, Puzzle, LayoutGrid } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

import { AudienceDemoPanel } from '@/components/audience-demo-panel';
import { KineticText } from '@/components/kinetic-text';
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
      <h1 className="font-display text-[clamp(38px,9vw,48px)] font-semibold tracking-[-0.035em] text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        <KineticText>You have a browser.<br />
        <span className="text-[var(--muted)]">Claude runs in it.</span><br />
        Here&apos;s what to actually do.</KineticText>
      </h1>

      <p className="hm-rise mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        No code. No installs required to start. Claude.ai works in Chrome like any other website, but most people use 5% of what it can do. These guides cover the other 95%, from browser basics to the Chrome extension to running Claude alongside Gmail and Google Docs.
      </p>

      <AudienceDemoPanel
        audience="chrome"
        className="hm-rise mt-12 h-[560px] rounded-3xl border border-[var(--line)] md:h-[460px]"
      />

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
          href="/for-chrome/get-started-with-claude-in-your-browser"
          onClick={() => trackEvent('chrome_hero_cta_click', { cta: 'start_guide_1', section: 'for-chrome' })}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Start with Guide 1
        </Link>
        <Link
          href="#guides"
          onClick={() => trackEvent('chrome_hero_cta_click', { cta: 'browse_guides', section: 'for-chrome' })}
          className="glass inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
