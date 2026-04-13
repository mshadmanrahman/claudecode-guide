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

interface ChatDemoData {
  steps: ChatStep[];
}

interface TutorialStepDemoProps {
  demo?: DemoData;
  appDemo?: ChatDemoData;
  ideDemo?: ChatDemoData;
}

export function TutorialStepDemo({ demo, appDemo, ideDemo }: TutorialStepDemoProps) {
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

  if (route === 'app') {
    if (appDemo) return <AppChatDemo steps={appDemo.steps} loop={false} variant="app" />;
  }

  if (route === 'ide') {
    if (ideDemo) return <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  }

  if (route === 'terminal') {
    if (demo) return <DemoCard title={demo.title} steps={demo.steps} loop={false} />;
  }

  // Graceful fallback : show whatever is available for this step
  if (appDemo) return <AppChatDemo steps={appDemo.steps} loop={false} variant="app" />;
  if (ideDemo) return <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  if (demo) return <DemoCard title={demo.title} steps={demo.steps} loop={false} />;

  return null;
}
