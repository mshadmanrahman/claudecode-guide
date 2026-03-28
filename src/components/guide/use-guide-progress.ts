'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'claudecodeguide-progress';

interface GuideState {
  completedSteps: string[];
  selectedOs: 'mac' | 'windows' | 'linux' | null;
  selectedPlan: 'pro' | 'max' | null;
}

const defaultState: GuideState = {
  completedSteps: [],
  selectedOs: null,
  selectedPlan: null,
};

export function useGuideProgress() {
  const [state, setState] = useState<GuideState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: GuideState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const toggleStep = useCallback((stepId: string) => {
    setState((prev) => {
      const completed = prev.completedSteps.includes(stepId)
        ? prev.completedSteps.filter((s) => s !== stepId)
        : [...prev.completedSteps, stepId];
      const next = { ...prev, completedSteps: completed };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setOs = useCallback((os: 'mac' | 'windows' | 'linux') => {
    persist({ ...state, selectedOs: os });
  }, [state, persist]);

  const setPlan = useCallback((plan: 'pro' | 'max') => {
    persist({ ...state, selectedPlan: plan });
  }, [state, persist]);

  const resetProgress = useCallback(() => {
    persist(defaultState);
  }, [persist]);

  const totalSteps = 9;
  const completedCount = state.completedSteps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return {
    ...state,
    loaded,
    toggleStep,
    setOs,
    setPlan,
    resetProgress,
    isCompleted: (stepId: string) => state.completedSteps.includes(stepId),
    progressPercent,
    completedCount,
    totalSteps,
  };
}
