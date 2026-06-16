import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { DocPageInfo } from '@/lib/docs-navigation';
import {
  FoundationsArt,
  FrameworksArt,
  PatternsArt,
  WorkflowsArt,
  TemplatesArt,
  ComparisonsArt,
} from './section-art';

interface SectionIndexProps {
  sections: { name: string; pages: DocPageInfo[] }[];
}

type IllustrationFn = () => React.JSX.Element;

const ILLUSTRATIONS: Record<string, IllustrationFn> = {
  Foundations: FoundationsArt,
  Frameworks:  FrameworksArt,
  Patterns:    PatternsArt,
  Workflows:   WorkflowsArt,
  Templates:   TemplatesArt,
  Comparisons: ComparisonsArt,
};

const DESCRIPTIONS: Record<string, string> = {
  Foundations: "The vocabulary, mental models, and comparisons you need before anything else makes sense.",
  Frameworks:  "Structured operating systems for working with Claude Code consistently, every session.",
  Patterns:    "Advanced techniques: hooks, skills, agents, and thinking modes that multiply your output.",
  Workflows:   "Step-by-step playbooks for developers, PMs, and designers. Real tasks, real outputs.",
  Templates:   "Drop-in CLAUDE.md starters for any project type, ready to customize and commit.",
  Comparisons: "How Claude Code stacks up against every major AI coding tool, side by side.",
};

const FEATURED_COUNT: Record<string, number> = {
  Foundations: 5,
  Frameworks:  4,
  Patterns:    4,
  Workflows:   4,
  Templates:   4,
  Comparisons: 4,
};

export function SectionIndex({ sections }: SectionIndexProps) {
  return (
    <div className="w-full">
      {/* Editorial hero: light in light mode, near-black in dark mode */}
      <section className="bg-fd-card dark:bg-[#0c0c0c] border-b border-fd-border px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center animate-slide-up-fade">
        <p className="text-[10px] tracking-[0.22em] uppercase text-fd-muted-foreground dark:text-white/30 mb-7 font-medium">
          Claude Code Guide
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight-display text-fd-foreground dark:text-white leading-[0.95] max-w-2xl mx-auto">
          A guide for every kind of builder.
        </h1>
        <p className="mt-8 text-sm text-fd-muted-foreground dark:text-white/40 max-w-[22rem] mx-auto leading-relaxed">
          Six sections. One mental model. Start wherever it makes sense for you.
        </p>
      </section>

      {/* Section grid */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-px bg-fd-border border border-fd-border rounded-xl overflow-hidden sm:grid-cols-2">
          {sections.map((section, i) => {
            const Illustration = ILLUSTRATIONS[section.name];
            const description  = DESCRIPTIONS[section.name];
            const featuredCount = FEATURED_COUNT[section.name] ?? 4;
            const featured  = section.pages.slice(0, featuredCount);
            const remaining = section.pages.length - featured.length;
            const firstPage = section.pages[0];

            return (
              <div
                key={section.name}
                className="bg-fd-background p-6 animate-slide-up-fade"
                style={{ animationDelay: `${80 + i * 55}ms` }}
              >
                {/* Generative SVG art */}
                <div className="mb-5 h-[110px] text-fd-foreground/40">
                  {Illustration && <Illustration />}
                </div>

                {/* Ordinal + section name */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className="font-display text-3xl font-normal leading-none select-none shrink-0"
                    style={{ color: 'var(--color-fd-border)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-base font-semibold text-fd-foreground leading-tight">
                    {section.name}
                  </h2>
                </div>

                {description && (
                  <p className="mt-1 text-sm text-fd-muted-foreground leading-snug pl-[2.6rem]">
                    {description}
                  </p>
                )}

                <ul className="mt-4 space-y-0.5 border-t border-fd-border pt-4">
                  {featured.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={page.url}
                        className="group/link flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                      >
                        <span className="flex-1 truncate">{page.title}</span>
                        <ArrowRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {remaining > 0 && firstPage && (
                  <div className="mt-3 border-t border-fd-border pt-3">
                    <Link
                      href={firstPage.url}
                      className="flex items-center gap-1.5 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                    >
                      <span>{remaining} more {remaining === 1 ? 'page' : 'pages'} in this section</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
