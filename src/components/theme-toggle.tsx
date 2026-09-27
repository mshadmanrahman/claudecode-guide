'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const label = mounted ? (isDark ? 'dark' : 'light') : 'theme';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Theme: ${label}. Switch to ${isDark ? 'light' : 'dark'}` : 'Switch light or dark'}
      className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[var(--line)] bg-transparent px-3.5 font-mono text-xs text-[var(--ink)] transition-colors hover:bg-[var(--chip)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${className}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" />
        <path d="M7 1.5 A5.5 5.5 0 0 1 7 12.5 Z" fill="currentColor" />
      </svg>
      <span className="min-w-[4ch] text-left">{label}</span>
    </button>
  );
}
