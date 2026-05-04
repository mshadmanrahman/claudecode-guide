'use client';

import Link from 'next/link';
import { GitCompare, FileCode, Compass, GraduationCap, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface RouterCard {
  id: 'compare' | 'claude-md' | 'interface' | 'tutorials';
  icon: typeof GitCompare;
  title: string;
  blurb: string;
  href: string;
  audience: string;
}

const CARDS: ReadonlyArray<RouterCard> = [
  {
    id: 'compare',
    icon: GitCompare,
    title: 'Compare Claude Code to other tools',
    blurb: 'Honest takes on Cursor, Copilot, Aider, ChatGPT, and Gemini CLI. Pick what fits.',
    href: '/docs/comparisons',
    audience: 'Evaluating',
  },
  {
    id: 'claude-md',
    icon: FileCode,
    title: 'Set up your CLAUDE.md',
    blurb: 'The one file that makes Claude understand your project. Templates and patterns inside.',
    href: '/docs/foundations/claude-md',
    audience: 'Setting up',
  },
  {
    id: 'interface',
    icon: Compass,
    title: 'Pick the right interface',
    blurb: 'Web, Desktop, Terminal, or VS Code. Decide based on what you actually want to do.',
    href: '/docs/foundations/which-interface',
    audience: 'Starting out',
  },
  {
    id: 'tutorials',
    icon: GraduationCap,
    title: 'Browse 50+ tutorials',
    blurb: 'Hands-on projects from quiz games to PM workflows. Filter by skill and time.',
    href: '/tutorials',
    audience: 'Learning by doing',
  },
];

export function PathRouter() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-24">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
        Find what you need
      </p>
      <h2 className="mb-4 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
        What brought you here?
      </h2>
      <p className="mb-12 text-center text-fd-muted-foreground max-w-lg mx-auto">
        Four shortcuts to the pages people actually open. Skip the homepage browse.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              onClick={() => {
                trackEvent('router_card_click', {
                  card_id: card.id,
                  card_audience: card.audience,
                });
              }}
              className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-200 hover:shadow-md hover:border-fd-muted-foreground/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className="h-5 w-5 text-fd-foreground" />
                <span className="rounded-full bg-fd-accent px-2.5 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
                  {card.audience}
                </span>
              </div>
              <h3 className="mb-2 font-display text-lg font-normal tracking-tight text-fd-foreground leading-snug">
                {card.title}
              </h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                {card.blurb}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
