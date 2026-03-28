'use client';

import { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface CollapsibleProps {
  title: string;
  variant?: 'help' | 'info';
  children: ReactNode;
}

export function Collapsible({ title, variant = 'help', children }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-lg border transition-colors ${
      variant === 'help' ? 'border-amber-500/30 bg-amber-500/5' : 'border-fd-border bg-fd-card'
    }`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm"
      >
        {variant === 'help' ? (
          <HelpCircle className="h-4 w-4 shrink-0 text-amber-500" />
        ) : (
          <ChevronRight className={`h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform ${open ? 'rotate-90' : ''}`} />
        )}
        <span className={`font-medium ${variant === 'help' ? 'text-amber-600 dark:text-amber-400' : 'text-fd-foreground'}`}>
          {title}
        </span>
      </button>
      {open && (
        <div className="border-t border-fd-border px-4 py-4 text-sm text-fd-muted-foreground leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
