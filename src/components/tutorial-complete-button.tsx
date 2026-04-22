'use client';

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { EmailCapture } from './email-capture';

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

  if (completed) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 text-sm font-medium text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          Done. Nice work.
        </div>
        <EmailCapture placement="post-tutorial" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 rounded-xl border border-fd-border bg-fd-card px-6 py-4 text-sm font-medium text-fd-muted-foreground hover:border-fd-muted-foreground/30 hover:text-fd-foreground cursor-pointer transition-all"
    >
      <Circle className="h-4 w-4" />
      Mark as complete
    </button>
  );
}
