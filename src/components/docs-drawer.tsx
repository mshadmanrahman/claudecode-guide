'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { X, ChevronDown } from 'lucide-react';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface DocsDrawerSection {
  name: string;
  pages: DocPageInfo[];
}

interface DocsDrawerProps {
  open: boolean;
  onClose: () => void;
  sections: DocsDrawerSection[];
}

export function DocsDrawer({ open, onClose, sections }: DocsDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function handleLinkClick(url: string) {
    router.push(url);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 left-0 z-50 flex h-full max-w-xs w-full flex-col bg-fd-background border-r border-fd-border shadow-xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Documentation navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-fd-border px-4 py-3 h-14 shrink-0">
          <span className="text-sm font-semibold text-fd-foreground">Documentation</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
            aria-label="Close documentation navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable section list */}
        <div className="flex-1 overflow-y-auto py-4">
          {sections.map((section) => (
            <SectionGroup
              key={section.name}
              section={section}
              pathname={pathname}
              onLinkClick={handleLinkClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

interface SectionGroupProps {
  section: DocsDrawerSection;
  pathname: string;
  onLinkClick: (url: string) => void;
}

function SectionGroup({ section, pathname, onLinkClick }: SectionGroupProps) {
  const hasActivePage = section.pages.some(
    (p) => pathname === p.url || pathname.startsWith(p.url + '/')
  );

  return (
    <div className="px-3 mb-4">
      <details open={hasActivePage || section.pages.length <= 5} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors select-none">
          {section.name}
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
        </summary>

        <ul className="mt-1 space-y-0.5">
          {section.pages.map((page) => {
            const isActive = pathname === page.url || pathname.startsWith(page.url + '/');
            return (
              <li key={page.url}>
                <button
                  onClick={() => onLinkClick(page.url)}
                  className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-fd-primary/10 text-fd-primary font-medium'
                      : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent'
                  }`}
                >
                  {page.title}
                </button>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
}
