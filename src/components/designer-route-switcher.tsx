'use client';

import { useEffect, useState } from 'react';
import { Globe, FolderOpen, Terminal } from 'lucide-react';

export type DesignerRoute = 'claude-ai' | 'co-work' | 'claude-code';

export const DESIGNER_ROUTE_CHANGE_EVENT = 'designer-route-change';
const STORAGE_KEY = 'designer-journey';

const TABS: Array<{ id: DesignerRoute; label: string; icon: React.ReactNode }> = [
  { id: 'claude-ai', label: 'Claude.ai', icon: <Globe className="h-3.5 w-3.5" /> },
  { id: 'co-work', label: 'Claude Co-Work', icon: <FolderOpen className="h-3.5 w-3.5" /> },
  { id: 'claude-code', label: 'Claude Code', icon: <Terminal className="h-3.5 w-3.5" /> },
];

interface DesignerRouteSwitcherProps {
  availableRoutes?: DesignerRoute[];
}

export function DesignerRouteSwitcher({ availableRoutes = ['claude-ai'] }: DesignerRouteSwitcherProps) {
  const [active, setActive] = useState<DesignerRoute>('claude-ai');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as DesignerRoute | null;
    if (saved && availableRoutes.includes(saved)) {
      setActive(saved);
    } else {
      setActive(availableRoutes[0] ?? 'claude-ai');
    }
  }, [availableRoutes]);

  function handleSelect(id: DesignerRoute) {
    if (!availableRoutes.includes(id)) return;
    setActive(id);
    localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent(DESIGNER_ROUTE_CHANGE_EVENT, { detail: id }));
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
              title={available ? undefined : 'Not available for this guide'}
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
                  n/a
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
