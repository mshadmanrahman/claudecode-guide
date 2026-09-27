'use client';

import { useEffect, useState } from 'react';
import { Globe, Monitor } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export type DesignerRoute = 'web' | 'desktop';

export const DESIGNER_ROUTE_CHANGE_EVENT = 'designer-route-change';
const STORAGE_KEY = 'designer-journey';

const TABS: Array<{ id: DesignerRoute; label: string; icon: React.ReactNode }> = [
  { id: 'web', label: 'On the web', icon: <Globe className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: 'desktop', label: 'In the desktop app', icon: <Monitor className="h-3.5 w-3.5" aria-hidden="true" /> },
];

const NEEDS: Record<DesignerRoute, string> = {
  web: 'A Claude account. Open claude.ai in any browser.',
  desktop: 'The Claude desktop app for Mac or Windows. It can read a folder of your files.',
};

/** Reads the saved surface. Older saves ('claude-ai', 'co-work', 'claude-code') map onto the two current ones. */
export function readSavedDesignerRoute(): DesignerRoute | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'web' || v === 'claude-ai') return 'web';
    if (v === 'desktop' || v === 'co-work' || v === 'claude-code') return 'desktop';
    return null;
  } catch {
    return null;
  }
}

interface DesignerRouteSwitcherProps {
  availableRoutes?: DesignerRoute[];
}

export function DesignerRouteSwitcher({ availableRoutes = ['web', 'desktop'] }: DesignerRouteSwitcherProps) {
  const [active, setActive] = useState<DesignerRoute>(availableRoutes[0] ?? 'web');
  const key = availableRoutes.join(',');

  useEffect(() => {
    const routes = key.split(',') as DesignerRoute[];
    const saved = readSavedDesignerRoute();
    setActive(saved && routes.includes(saved) ? saved : routes[0] ?? 'web');
  }, [key]);

  function handleSelect(id: DesignerRoute) {
    setActive(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Blocked storage: the choice still applies to this page.
    }
    window.dispatchEvent(new CustomEvent(DESIGNER_ROUTE_CHANGE_EVENT, { detail: id }));
    trackEvent('designer_route_switcher_select', { route: id });
  }

  const tabs = TABS.filter((t) => availableRoutes.includes(t.id));

  return (
    <div className="mb-8">
      <p id="designer-route-label" className="m-0 mb-2 text-xs font-medium text-fd-muted-foreground">
        Follow along:
      </p>
      <div
        role="group"
        aria-labelledby="designer-route-label"
        className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-fd-border bg-[var(--code)] p-1"
      >
        {tabs.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${
                isActive
                  ? 'border-fd-border bg-[var(--glass2)] text-fd-foreground'
                  : 'border-transparent text-fd-muted-foreground hover:text-fd-foreground'
              }`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>
      <p className="m-0 mt-3 text-sm leading-relaxed text-fd-muted-foreground">
        <span className="font-medium text-fd-foreground">You need: </span>
        {NEEDS[active]}
      </p>
    </div>
  );
}
