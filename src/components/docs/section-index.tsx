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
    featuredCount: 4,
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
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <header className="pt-10 pb-14 animate-slide-up-fade">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Documentation
        </p>
        <h1 className="font-display text-4xl font-normal tracking-tight-display text-fd-foreground sm:text-5xl leading-[1.1]">
          Everything you need to work with Claude Code.
        </h1>
        <p className="mt-5 text-lg text-fd-muted-foreground max-w-xl leading-relaxed">
          Six sections. One mental model. Start wherever it makes sense for you.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-fd-border border border-fd-border rounded-xl overflow-hidden sm:grid-cols-2">
        {sections.map((section, i) => {
          const meta = SECTION_META[section.name];
          const Icon = meta?.Icon ?? BookOpen;
          const featuredCount = meta?.featuredCount ?? 4;
          const featured = section.pages.slice(0, featuredCount);
          const remaining = section.pages.length - featured.length;
          const firstPage = section.pages[0];

          return (
            <div
              key={section.name}
              className="bg-fd-background p-6 animate-slide-up-fade"
              style={{ animationDelay: `${80 + i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="font-display text-4xl font-normal leading-none select-none"
                  style={{ color: 'var(--color-fd-border)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-fd-border">
                  <Icon className="h-4 w-4 text-fd-foreground" />
                </div>
              </div>

              <h2 className="text-base font-semibold text-fd-foreground leading-tight mb-1">
                {section.name}
              </h2>
              {meta?.description && (
                <p className="text-sm text-fd-muted-foreground leading-snug">
                  {meta.description}
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
