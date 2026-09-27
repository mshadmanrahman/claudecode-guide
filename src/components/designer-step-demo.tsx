'use client';

import { useEffect, useState } from 'react';
import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import {
  DESIGNER_ROUTE_CHANGE_EVENT,
  readSavedDesignerRoute,
  type DesignerRoute,
} from '@/components/designer-route-switcher';

interface ChatDemoData {
  steps: ChatStep[];
  /** Desktop only: the folder shown in the demo header. */
  folder?: string;
}

interface DesignerStepDemoProps {
  appDemo?: ChatDemoData;
  desktopDemo?: ChatDemoData;
}

export function DesignerStepDemo({ appDemo, desktopDemo }: DesignerStepDemoProps) {
  const [route, setRoute] = useState<DesignerRoute>('web');

  useEffect(() => {
    const saved = readSavedDesignerRoute();
    if (saved) setRoute(saved);

    function onRouteChange(e: Event) {
      const detail = (e as CustomEvent<DesignerRoute>).detail;
      if (detail) setRoute(detail);
    }

    window.addEventListener(DESIGNER_ROUTE_CHANGE_EVENT, onRouteChange);
    return () => window.removeEventListener(DESIGNER_ROUTE_CHANGE_EVENT, onRouteChange);
  }, []);

  const desktop = desktopDemo ? (
    <AppChatDemo steps={desktopDemo.steps} loop={false} variant="desktop" folder={desktopDemo.folder} />
  ) : null;
  const web = appDemo ? <AppChatDemo steps={appDemo.steps} loop={false} variant="app" /> : null;

  // Show the chosen surface, and fall back to the other when a step has only one.
  return route === 'desktop' ? (desktop ?? web) : (web ?? desktop);
}
