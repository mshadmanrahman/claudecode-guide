'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Terminal, Code2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export type TutorialRoute = 'app' | 'terminal' | 'ide';

export const ROUTE_CHANGE_EVENT = 'tutorial-route-change';
const STORAGE_KEY = 'tutorial-route';

const TABS: Array<{ id: TutorialRoute; label: string; icon: React.ReactNode }> = [
  { id: 'app', label: 'Claude app', icon: <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: 'terminal', label: 'Terminal', icon: <Terminal className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: 'ide', label: 'VS Code / Cursor', icon: <Code2 className="h-3.5 w-3.5" aria-hidden="true" /> },
];

function readSaved(): TutorialRoute | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'app' || v === 'terminal' || v === 'ide' ? v : null;
  } catch {
    return null;
  }
}

function saveRoute(route: TutorialRoute) {
  try {
    localStorage.setItem(STORAGE_KEY, route);
  } catch {
    // Private mode or blocked storage: the choice still applies to this page.
  }
}

/**
 * The route the reader is following on this tutorial. The switcher and every
 * step read this same hook, so the tab shown and the instructions shown can
 * never disagree. A saved route that this tutorial lacks falls back to its
 * first authored route.
 */
export function useTutorialRoute(availableRoutes: TutorialRoute[]): TutorialRoute {
  const key = availableRoutes.join(',');
  const [route, setRoute] = useState<TutorialRoute>(availableRoutes[0] ?? 'app');

  useEffect(() => {
    const routes = key.split(',') as TutorialRoute[];
    const saved = readSaved();
    if (saved && routes.includes(saved)) setRoute(saved);

    function onChange(e: Event) {
      const detail = (e as CustomEvent<TutorialRoute>).detail;
      if (detail && routes.includes(detail)) setRoute(detail);
    }
    window.addEventListener(ROUTE_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(ROUTE_CHANGE_EVENT, onChange);
  }, [key]);

  return route;
}

const NEEDS: Record<TutorialRoute, React.ReactNode> = {
  app: <>A Claude account. Open claude.ai in a browser, or the Claude desktop app.</>,
  terminal: (
    <>
      Claude Code installed on your computer.{' '}
      <Link href="/docs/foundations/installation" className="text-[var(--acc)] underline underline-offset-4">
        Install guide
      </Link>
    </>
  ),
  ide: <>VS Code or Cursor with the Claude Code extension.</>,
};

interface RouteSwitcherProps {
  /** Routes that have content authored. Only these are offered. */
  availableRoutes?: TutorialRoute[];
}

export function RouteSwitcher({ availableRoutes = ['app'] }: RouteSwitcherProps) {
  const active = useTutorialRoute(availableRoutes);
  const tabs = TABS.filter((t) => availableRoutes.includes(t.id));

  function handleSelect(id: TutorialRoute) {
    saveRoute(id);
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: id }));
    trackEvent('route_switcher_select', { route: id });
  }

  return (
    <div>
      <p id="route-label" className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">
        follow along in
      </p>
      <div
        role="group"
        aria-labelledby="route-label"
        className="flex max-w-full flex-wrap gap-1 rounded-lg border border-[var(--line)] bg-[var(--code)] p-1 sm:inline-flex"
      >
        {tabs.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(id)}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-compact font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${
                isActive
                  ? 'border-[var(--line)] bg-[var(--glass2)] text-[var(--ink)]'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>
      <p className="m-0 mt-3 text-sm leading-relaxed text-[var(--muted)]">
        <span className="font-medium text-[var(--ink)]">You need: </span>
        {NEEDS[active]}
      </p>
    </div>
  );
}
