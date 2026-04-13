'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Circle } from 'lucide-react';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface ChapterNavProps {
  prev: DocPageInfo | null;
  next: DocPageInfo | null;
  current: DocPageInfo;
  sectionPages: DocPageInfo[];
}

export function ChapterNav({ prev, next, current, sectionPages }: ChapterNavProps) {
  const { isVisited, markVisited, loaded } = useReadingProgress();

  // Mark current page as visited (in effect to avoid render loop)
  useEffect(() => {
    if (loaded && current.slug) {
      markVisited(current.slug);
    }
  }, [loaded, current.slug, markVisited]);

  const visitedCount = loaded
    ? sectionPages.filter((p) => isVisited(p.slug)).length
    : 0;

  return (
    <div className="mt-16 space-y-8">
      {/* Prev / Next navigation */}
      <div className="flex items-stretch gap-4">
        {prev ? (
          <Link
            href={prev.url}
            className="group flex flex-1 items-center gap-3 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:shadow-sm hover:bg-fd-accent"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors" />
            <div className="min-w-0">
              <span className="text-xs text-fd-muted-foreground">Previous</span>
              <p className="text-sm font-medium text-fd-foreground truncate">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={next.url}
            className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-fd-border bg-fd-card p-5 text-right transition-all hover:shadow-sm hover:bg-fd-accent"
          >
            <div className="min-w-0">
              <span className="text-xs text-fd-muted-foreground">Next</span>
              <p className="text-sm font-medium text-fd-foreground truncate">{next.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Section progress */}
      {sectionPages.length > 1 && (
        <div className="rounded-xl border border-fd-border bg-fd-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-fd-foreground">{current.section}</h3>
            {loaded && (
              <span className="text-xs text-fd-muted-foreground">
                {visitedCount} of {sectionPages.length}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {sectionPages.map((page) => {
              const isCurrent = page.slug === current.slug;
              const visited = loaded && isVisited(page.slug);
              return (
                <Link
                  key={page.slug}
                  href={page.url}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isCurrent
                      ? 'bg-fd-primary/5 font-medium text-fd-foreground'
                      : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent'
                  }`}
                >
                  {visited ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" />
                  ) : isCurrent ? (
                    <Circle className="h-3.5 w-3.5 shrink-0 text-fd-foreground fill-fd-foreground" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 shrink-0 text-fd-border" />
                  )}
                  <span className="truncate">{page.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
