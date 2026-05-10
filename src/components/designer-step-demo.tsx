'use client';

import { useEffect, useState } from 'react';
import { DemoCard } from '@/components/demo-card';
import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import { DESIGNER_ROUTE_CHANGE_EVENT, type DesignerRoute } from '@/components/designer-route-switcher';

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

interface DesignerStepDemoProps {
  demo?: DemoData;
  appDemo?: ChatDemoData;
  ideDemo?: ChatDemoData;
}

export function DesignerStepDemo({ demo, appDemo, ideDemo }: DesignerStepDemoProps) {
  const [route, setRoute] = useState<DesignerRoute>('claude-ai');

  useEffect(() => {
    const saved = localStorage.getItem('designer-journey') as DesignerRoute | null;
    if (saved) setRoute(saved);

    function onRouteChange(e: Event) {
      const detail = (e as CustomEvent<DesignerRoute>).detail;
      if (detail) setRoute(detail);
    }

    window.addEventListener(DESIGNER_ROUTE_CHANGE_EVENT, onRouteChange);
    return () => window.removeEventListener(DESIGNER_ROUTE_CHANGE_EVENT, onRouteChange);
  }, []);

  // claude-ai: use appDemo (chat interface)
  if (route === 'claude-ai') {
    if (appDemo) return <AppChatDemo steps={appDemo.steps} loop={false} variant="app" />;
  }

  // co-work: use ideDemo (file-aware local context)
  if (route === 'co-work') {
    if (ideDemo) return <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  }

  // claude-code: use demo (terminal output)
  if (route === 'claude-code') {
    if (demo) return <DemoCard title={demo.title} steps={demo.steps} loop={false} />;
  }

  // Graceful fallback: show whatever is available
  if (appDemo) return <AppChatDemo steps={appDemo.steps} loop={false} variant="app" />;
  if (ideDemo) return <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  if (demo) return <DemoCard title={demo.title} steps={demo.steps} loop={false} />;

  return null;
}
