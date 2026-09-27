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
      <section className="px-6 pt-12 pb-8 sm:pt-16 sm:pb-10 text-center animate-slide-up-fade">
        <p className="text-[10px] tracking-[0.22em] uppercase text-fd-muted-foreground mb-6 font-medium">
          Claude Code Guide
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight-display text-fd-foreground leading-[0.95] max-w-2xl mx-auto">
          A guide for every kind of builder.
        </h1>
        <p className="mt-6 text-sm text-fd-muted-foreground max-w-[22rem] mx-auto leading-relaxed">
          Six sections. One mental model. Start wherever it makes sense for you.
        </p>
      </section>

      {/* Section grid: glass cards over the faded scene, same card as the homepage personas */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sections.map((section, i) => {
            const Illustration = ILLUSTRATIONS[section.name];
            const description  = DESCRIPTIONS[section.name];
            const featuredCount = FEATURED_COUNT[section.name] ?? 4;
            const featured  = section.pages.slice(0, featuredCount);
            const remaining = section.pages.length - featured.length;
            const firstPage = section.pages[0];
            const slug = section.name.toLowerCase();

            return (
              <section
                key={section.name}
                aria-labelledby={`section-${slug}`}
                className="glass hm-card ccg-section-card animate-slide-up-fade"
                style={{ animationDelay: `${80 + i * 55}ms` }}
              >
                <div className="mb-5 h-[96px] text-fd-foreground">
                  {Illustration && <Illustration />}
                </div>

                <span className="font-mono text-xs text-[var(--acc)]">
                  {String(i + 1).padStart(2, '0')} / {slug}
                </span>
                <h2
                  id={`section-${slug}`}
                  className="mt-2 text-lg font-semibold text-fd-foreground leading-tight"
                >
                  {section.name}
                </h2>

                {description && (
                  <p className="mt-1.5 text-sm text-fd-muted-foreground leading-snug">
                    {description}
                  </p>
                )}

                <ul className="mt-4 mb-3 space-y-0.5 border-t border-[var(--line)] pt-3">
                  {featured.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={page.url}
                        className="group/link -mx-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-[var(--chip)] hover:text-fd-foreground"
                      >
                        <span className="flex-1 truncate">{page.title}</span>
                        <ArrowRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-60" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>

                {remaining > 0 && firstPage && (
                  <div className="mt-auto border-t border-[var(--line)] pt-3">
                    <Link
                      href={firstPage.url}
                      className="flex items-center gap-1.5 font-mono text-xs text-fd-muted-foreground transition-colors hover:text-[var(--acc)]"
                    >
                      <span>{remaining} more {remaining === 1 ? 'page' : 'pages'} in this section</span>
                      <ArrowRight className="h-3 w-3" aria-hidden />
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
