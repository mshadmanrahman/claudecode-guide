'use client';

import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

interface GuideStepProps {
  stepId: string;
  number: string;
  title: string;
  completed: boolean;
  onToggle: (stepId: string) => void;
  children: ReactNode;
}

export function GuideStep({ stepId, number, title, completed, onToggle, children }: GuideStepProps) {
  return (
    <div className={`rounded-xl border transition-colors ${completed ? 'border-green-500/30 bg-green-500/5' : 'border-fd-border bg-fd-card'}`}>
      {/* Header */}
      <button
        type="button"
        onClick={() => onToggle(stepId)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          completed
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-fd-border text-fd-muted-foreground hover:border-fd-foreground'
        }`}>
          {completed ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="font-mono text-xs">{number}</span>
          )}
        </div>
        <div className="flex-1">
          <h3 className={`font-display text-lg tracking-tight ${completed ? 'text-fd-muted-foreground line-through' : 'text-fd-foreground'}`}>
            {title}
          </h3>
        </div>
        {completed && (
          <span className="text-xs text-green-500 font-medium">Done</span>
        )}
      </button>

      {/* Content */}
      {!completed && (
        <div className="border-t border-fd-border px-6 py-6">
          {children}
        </div>
      )}
    </div>
  );
}
