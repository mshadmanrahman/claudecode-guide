'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'claudecodeguide-reading-progress';

export function useReadingProgress() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setVisited(new Set(JSON.parse(saved) as string[]));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const markVisited = useCallback((slug: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(slug);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const isVisited = useCallback((slug: string) => visited.has(slug), [visited]);

  return { visited, markVisited, isVisited, loaded };
}
