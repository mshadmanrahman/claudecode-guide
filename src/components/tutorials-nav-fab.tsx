'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Layers, X } from 'lucide-react';

interface TutorialNavSection {
  id: string;
  title: string;
}

interface TutorialsNavFabProps {
  sections: TutorialNavSection[];
}

export function TutorialsNavFab({ sections }: TutorialsNavFabProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Intersection Observer to track active section
  useEffect(() => {
    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Close on backdrop click (outside popup and button)
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, close]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    close();
  }, [close]);

  if (sections.length === 0) return null;

  return (
    <>
      {/* Floating pill button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="fixed left-4 bottom-6 z-30 flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/90 px-4 py-2.5 shadow-lg backdrop-blur-md text-sm text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-all hover:shadow-xl md:left-6 md:bottom-8"
        aria-label="Open tutorial sections"
        aria-expanded={open}
      >
        <Layers className="h-4 w-4" />
        <span className="hidden sm:inline">Sections</span>
      </button>

      {/* Popup */}
      {open && (
        <div
          ref={popupRef}
          className="fixed left-4 bottom-16 z-40 w-56 rounded-xl border border-fd-border bg-fd-background/95 shadow-xl backdrop-blur-md md:left-6 md:bottom-20"
          role="dialog"
          aria-label="Tutorial sections"
        >
          <div className="flex items-center justify-between border-b border-fd-border px-4 py-2.5">
            <span className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wide">
              Sections
            </span>
            <button
              onClick={close}
              className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              aria-label="Close sections"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <nav className="py-1.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  activeId === section.id
                    ? 'bg-fd-accent text-fd-foreground font-medium'
                    : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
