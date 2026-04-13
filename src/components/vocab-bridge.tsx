'use client';

import { useState } from 'react';

interface VocabBridgeProps {
  term: string;
  explanation: string;
  children?: React.ReactNode;
}

export function VocabBridge({ term, explanation, children }: VocabBridgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="inline">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border-b border-dashed border-fd-muted-foreground/50 text-fd-foreground transition-colors hover:border-fd-foreground"
        aria-expanded={isOpen}
      >
        {children ?? term}
      </button>
      {isOpen && (
        <span className="mx-1 inline-flex items-baseline gap-1 animate-fade-in rounded-md bg-fd-accent px-2 py-0.5 text-sm text-fd-muted-foreground">
          {explanation}
        </span>
      )}
    </span>
  );
}
