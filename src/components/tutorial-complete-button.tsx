'use client';

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface TutorialCompleteButtonProps {
  slug: string;
  title: string;
}

export function TutorialCompleteButton({ slug, title }: TutorialCompleteButtonProps) {
  const [completed, setCompleted] = useState(false);

  function handleClick() {
    if (completed) return;
    setCompleted(true);
    trackEvent('tutorial_complete', {
      tutorial_slug: slug,
      tutorial_title: title,
      source: 'button',
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={completed}
      className={`w-full flex items-center justify-center gap-2 rounded-xl border px-6 py-4 text-sm font-medium transition-all ${
        completed
          ? 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 cursor-default'
          : 'border-fd-border bg-fd-card text-fd-muted-foreground hover:border-fd-muted-foreground/30 hover:text-fd-foreground cursor-pointer'
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Done. Nice work.
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          Mark as complete
        </>
      )}
    </button>
  );
}
