'use client';

import { useState, useEffect, useCallback } from 'react';

export type JourneyOs = 'mac' | 'windows' | 'linux';
export type JourneyInterface = 'web' | 'desktop' | 'cli' | 'ide';

interface JourneySelections {
  os: JourneyOs | null;
  iface: JourneyInterface | null;
  loaded: boolean;
  setOs: (os: JourneyOs) => void;
  setInterface: (iface: JourneyInterface) => void;
  reset: () => void;
}

const STORAGE_KEY = 'claudecodeguide-journey';

interface StoredState {
  os: JourneyOs | null;
  iface: JourneyInterface | null;
}

function readStorage(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { os: null, iface: null };
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      os: parsed.os ?? null,
      iface: parsed.iface ?? null,
    };
  } catch {
    return { os: null, iface: null };
  }
}

function writeStorage(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

export function useJourneySelections(): JourneySelections {
  const [os, setOsState] = useState<JourneyOs | null>(null);
  const [iface, setIfaceState] = useState<JourneyInterface | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = readStorage();
    setOsState(stored.os);
    setIfaceState(stored.iface);
    setLoaded(true);
  }, []);

  const setOs = useCallback((newOs: JourneyOs) => {
    setOsState(newOs);
    setIfaceState((prev) => {
      writeStorage({ os: newOs, iface: prev });
      return prev;
    });
  }, []);

  const setInterface = useCallback((newIface: JourneyInterface) => {
    setIfaceState(newIface);
    setOsState((prev) => {
      writeStorage({ os: prev, iface: newIface });
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setOsState(null);
    setIfaceState(null);
    writeStorage({ os: null, iface: null });
  }, []);

  return { os, iface, loaded, setOs, setInterface, reset };
}
