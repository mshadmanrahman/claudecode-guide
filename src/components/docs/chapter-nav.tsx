'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface ChapterNavProps {
  prev: DocPageInfo | null;
  next: DocPageInfo | null;
  current: DocPageInfo;
  sectionPages: DocPageInfo[];
}

export function ChapterNav({ prev, next, current, sectionPages: _sectionPages }: ChapterNavProps) {
  const { markVisited, loaded } = useReadingProgress();

  useEffect(() => {
    if (loaded && current.slug) {
      markVisited(current.slug);
    }
  }, [loaded, current.slug, markVisited]);

  return (
    <div className="mt-16">
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
    </div>
  );
}
