'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
    <nav aria-label="Previous and next page" className="ccg-pager">
      {prev ? (
        <Link href={prev.url} className="ccg-pager-card glass hm-card">
          <span className="ccg-pager-label">previous</span>
          <span className="ccg-pager-title">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" className="max-sm:hidden" />
      )}
      {next ? (
        <Link href={next.url} className="ccg-pager-card glass hm-card text-right">
          <span className="ccg-pager-label">next</span>
          <span className="ccg-pager-title">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
