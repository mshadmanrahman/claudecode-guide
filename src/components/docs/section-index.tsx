'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight, Check, Circle } from 'lucide-react';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface SectionIndexProps {
  sections: { name: string; pages: DocPageInfo[] }[];
}

export function SectionIndex({ sections }: SectionIndexProps) {
  const { isVisited, loaded } = useReadingProgress();

  const totalPages = sections.reduce((sum, s) => sum + s.pages.length, 0);
  const visitedCount = loaded
    ? sections.reduce(
        (sum, s) => sum + s.pages.filter((p) => isVisited(p.slug)).length,
        0,
      )
    : 0;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fd-primary/10">
            <BookOpen className="h-5 w-5 text-fd-primary" />
          </div>
          <h1 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
            Documentation
          </h1>
        </div>
        <p className="text-lg text-fd-muted-foreground">
          Everything you need to know about Claude Code, organized by topic.
          Read in order or jump to what you need.
        </p>

        {/* Overall progress */}
        {loaded && visitedCount > 0 && (
          <div className="mt-6 rounded-xl border border-fd-border bg-fd-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-fd-foreground">Your progress</span>
              <span className="text-sm text-fd-muted-foreground">
                {visitedCount} of {totalPages} pages
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-fd-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-fd-primary transition-all duration-500 ease-out"
                style={{ width: `${Math.round((visitedCount / totalPages) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Section cards */}
      <div className="space-y-6">
        {sections.map((section) => {
          const sectionVisited = loaded
            ? section.pages.filter((p) => isVisited(p.slug)).length
            : 0;

          return (
            <section
              key={section.name}
              className="rounded-xl border border-fd-border bg-fd-card overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-fd-border bg-fd-card">
                <h2 className="text-lg font-medium text-fd-foreground">{section.name}</h2>
                {loaded && (
                  <span className="text-xs text-fd-muted-foreground">
                    {sectionVisited} / {section.pages.length}
                  </span>
                )}
              </div>

              {/* Page list */}
              <div className="divide-y divide-fd-border">
                {section.pages.map((page) => {
                  const visited = loaded && isVisited(page.slug);

                  return (
                    <Link
                      key={page.slug}
                      href={page.url}
                      className="group flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-fd-accent"
                    >
                      {visited ? (
                        <Check className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-fd-border" />
                      )}
                      <span className="flex-1 text-sm text-fd-foreground truncate">
                        {page.title}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Start reading CTA */}
      {sections.length > 0 && sections[0].pages.length > 0 && (
        <div className="mt-10 text-center">
          <Link
            href={sections[0].pages[0].url}
            className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
          >
            {visitedCount > 0 ? 'Continue reading' : 'Start from the beginning'}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-fd-muted-foreground">
            Prefer email updates?{' '}
            <a
              href="https://shadmanrahman.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fd-foreground transition-colors"
            >
              Follow on Substack
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
