'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { ui, type Locale } from '@/lib/i18n/locale';

export const PERSONA_CHANGE_EVENT = 'tutorial-persona-change';
const STORAGE_KEY = 'tutorial-persona';

export interface TutorialPersona {
  id: string;
  label: string;
}

function readSaved(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function savePersona(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
  }
}

/**
 * The role the reader picked on this tutorial. Same pattern as
 * useTutorialRoute: the switcher and every step read this one hook, and a
 * saved role this tutorial lacks falls back to its first persona.
 */
export function useTutorialPersona(personaIds: string[]): string | undefined {
  const key = personaIds.join(',');
  const [persona, setPersona] = useState<string | undefined>(personaIds[0]);

  useEffect(() => {
    const ids = key.split(',');
    const saved = readSaved();
    if (saved && ids.includes(saved)) setPersona(saved);

    function onChange(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail && ids.includes(detail)) setPersona(detail);
    }
    window.addEventListener(PERSONA_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(PERSONA_CHANGE_EVENT, onChange);
  }, [key]);

  return persona;
}

interface PersonaSwitcherProps {
  personas: TutorialPersona[];
  locale?: Locale;
}

export function PersonaSwitcher({ personas, locale = 'en' }: PersonaSwitcherProps) {
  const active = useTutorialPersona(personas.map((p) => p.id));

  function handleSelect(id: string) {
    savePersona(id);
    window.dispatchEvent(new CustomEvent(PERSONA_CHANGE_EVENT, { detail: id }));
    trackEvent('persona_switcher_select', { persona: id });
  }

  return (
    <div>
      <p id="persona-label" className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">
        {ui(locale).examplesForYourRole}
      </p>
      <div
        role="group"
        aria-labelledby="persona-label"
        className="flex max-w-full flex-wrap gap-1 rounded-lg border border-[var(--line)] bg-[var(--code)] p-1 sm:inline-flex"
      >
        {personas.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(id)}
              className={`rounded-md border px-3 py-2 text-compact font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${
                isActive
                  ? 'border-[var(--line)] bg-[var(--glass2)] text-[var(--ink)]'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
