'use client';

import { useState, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import { DocsDrawer } from './docs-drawer';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface DocSection {
  name: string;
  pages: DocPageInfo[];
}

interface DocsContentsFabProps {
  sections: DocSection[];
}

export function DocsContentsFab({ sections }: DocsContentsFabProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  if (sections.length === 0) return null;

  return (
    <>
      {/* Floating button pinned to left side of content area */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed left-4 bottom-6 z-30 flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/90 px-4 py-2.5 shadow-lg backdrop-blur-md text-sm text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-all hover:shadow-xl md:left-6 md:bottom-8"
        aria-label="Open documentation contents"
      >
        <BookOpen className="h-4 w-4" />
        <span className="hidden sm:inline">Contents</span>
      </button>

      <DocsDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        sections={sections}
      />
    </>
  );
}
