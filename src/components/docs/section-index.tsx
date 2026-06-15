import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Zap, GitBranch, FileCode2, BarChart2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface SectionIndexProps {
  sections: { name: string; pages: DocPageInfo[] }[];
}

interface SectionMeta {
  description: string;
  Icon: LucideIcon;
  featuredCount: number;
}

const SECTION_META: Record<string, SectionMeta> = {
  Foundations: {
    description: "The vocabulary, mental models, and comparisons you need before anything else makes sense.",
    Icon: BookOpen,
    featuredCount: 5,
  },
  Frameworks: {
    description: "Structured operating systems for working with Claude Code consistently, every session.",
    Icon: Layers,
    featuredCount: 2,
  },
  Patterns: {
    description: "Advanced techniques: hooks, skills, agents, and thinking modes that multiply your output.",
    Icon: Zap,
    featuredCount: 4,
  },
  Workflows: {
    description: "Step-by-step playbooks for developers, PMs, and designers. Real tasks, real outputs.",
    Icon: GitBranch,
    featuredCount: 4,
  },
  Templates: {
    description: "Drop-in CLAUDE.md starters for any project type, ready to customize and commit.",
    Icon: FileCode2,
    featuredCount: 4,
  },
  Comparisons: {
    description: "How Claude Code stacks up against every major AI coding tool, side by side.",
    Icon: BarChart2,
    featuredCount: 4,
  },
};

export function SectionIndex({ sections }: SectionIndexProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
          Documentation
        </h1>
        <p className="mt-3 text-lg text-fd-muted-foreground">
          Everything you need to work with Claude Code, organized by topic.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
        {sections.map((section) => {
          const meta = SECTION_META[section.name];
          const Icon = meta?.Icon ?? BookOpen;
          const featuredCount = meta?.featuredCount ?? 4;
          const featured = section.pages.slice(0, featuredCount);
          const remaining = section.pages.length - featured.length;
          const firstPage = section.pages[0];

          return (
            <div
              key={section.name}
              className="rounded-xl border border-fd-border bg-fd-background p-5"
            >
              <div className="flex items-start gap-3 mb-1">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-fd-border">
                  <Icon className="h-4 w-4 text-fd-foreground" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-fd-foreground leading-tight">
                    {section.name}
                  </h2>
                  {meta?.description && (
                    <p className="mt-1 text-sm text-fd-muted-foreground leading-snug">
                      {meta.description}
                    </p>
                  )}
                </div>
              </div>

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
                    <span>
                      {remaining} more {remaining === 1 ? 'page' : 'pages'} in this section
                    </span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
