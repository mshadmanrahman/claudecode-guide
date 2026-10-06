'use client';

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { ui, type Locale } from '@/lib/i18n/locale';

interface TutorialCompleteButtonProps {
  slug: string;
  title: string;
  locale?: Locale;
}

export function TutorialCompleteButton({ slug, title, locale = 'en' }: TutorialCompleteButtonProps) {
  const t = ui(locale);
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
      <div
        role="status"
        className="flex items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--chip)] px-6 py-4 text-sm font-medium text-[var(--acc)]"
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        {t.doneNiceWork}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="glass flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
    >
      <Circle className="h-4 w-4" aria-hidden="true" />
      {t.markComplete}
    </button>
  );
}
