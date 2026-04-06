'use client';

import { useEffect, useState } from 'react';
import { DemoCard } from '@/components/demo-card';
import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import { ROUTE_CHANGE_EVENT, type TutorialRoute } from '@/components/route-switcher';

interface DemoData {
  title?: string;
  steps: Array<{
    type: 'cmd' | 'out' | 'success' | 'warn' | 'error';
    text: string;
    delay?: number;
  }>;
}

interface AppDemoData {
  steps: ChatStep[];
}

interface TutorialStepDemoProps {
  demo?: DemoData;
  appDemo?: AppDemoData;
}

/**
 * Client island that renders either a terminal DemoCard or an AppChatDemo
 * based on the currently selected tutorial route (persisted in localStorage).
 *
 * Falls back gracefully: if the chosen route has no content, renders
 * whichever demo type is available.
 */
export function TutorialStepDemo({ demo, appDemo }: TutorialStepDemoProps) {
  const [route, setRoute] = useState<TutorialRoute>('app');

  useEffect(() => {
    const saved = localStorage.getItem('tutorial-route') as TutorialRoute | null;
    if (saved) setRoute(saved);

    function onRouteChange(e: Event) {
      const detail = (e as CustomEvent<TutorialRoute>).detail;
      if (detail) setRoute(detail);
    }

    window.addEventListener(ROUTE_CHANGE_EVENT, onRouteChange);
    return () => window.removeEventListener(ROUTE_CHANGE_EVENT, onRouteChange);
  }, []);

  // Claude App route
  if (route === 'app' && appDemo) {
    return <AppChatDemo steps={appDemo.steps} loop={false} />;
  }

  // Terminal / IDE route (both fall back to DemoCard for now)
  if (route !== 'app' && demo) {
    return <DemoCard title={demo.title} steps={demo.steps} loop={false} />;
  }

  // Fallback: render whatever is available
  if (appDemo) return <AppChatDemo steps={appDemo.steps} loop={false} />;
  if (demo) return <DemoCard title={demo.title} steps={demo.steps} loop={false} />;

  return null;
}
