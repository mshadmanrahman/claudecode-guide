'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Terminal, Code2 } from 'lucide-react';

export type TutorialRoute = 'app' | 'terminal' | 'ide';

export const ROUTE_CHANGE_EVENT = 'tutorial-route-change';
const STORAGE_KEY = 'tutorial-route';

const TABS: Array<{ id: TutorialRoute; label: string; icon: React.ReactNode }> = [
  { id: 'app', label: 'Claude App', icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: 'terminal', label: 'Terminal', icon: <Terminal className="h-3.5 w-3.5" /> },
  { id: 'ide', label: 'VS Code / Cursor', icon: <Code2 className="h-3.5 w-3.5" /> },
];

interface RouteSwitcherProps {
  /** Routes that have content authored. Others show "coming soon". Defaults to ['app']. */
  availableRoutes?: TutorialRoute[];
}

export function RouteSwitcher({ availableRoutes = ['app'] }: RouteSwitcherProps) {
  const [active, setActive] = useState<TutorialRoute>('app');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as TutorialRoute | null;
    if (saved && availableRoutes.includes(saved)) {
      setActive(saved);
    } else {
      // Default to first available route
      setActive(availableRoutes[0] ?? 'app');
    }
  }, [availableRoutes]);

  function handleSelect(id: TutorialRoute) {
    if (!availableRoutes.includes(id)) return;
    setActive(id);
    localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: id }));
  }

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="text-xs font-medium text-fd-muted-foreground">Follow along using:</span>
      </div>
      <div className="inline-flex items-center gap-1 overflow-x-auto rounded-lg border border-fd-border bg-fd-muted p-1 max-w-full">
        {TABS.map(({ id, label, icon }) => {
          const available = availableRoutes.includes(id);
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              disabled={!available}
              title={available ? undefined : 'Coming soon'}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-fd-background border border-fd-border text-fd-foreground shadow-sm'
                  : available
                  ? 'text-fd-muted-foreground hover:text-fd-foreground'
                  : 'cursor-not-allowed text-fd-muted-foreground/30'
              }`}
            >
              {icon}
              {label}
              {!available && (
                <span className="rounded-full bg-fd-muted-foreground/10 px-1.5 py-0.5 text-[9px] font-medium text-fd-muted-foreground/40">
                  soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
