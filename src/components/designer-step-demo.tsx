'use client';

import { useEffect, useState } from 'react';
import type { ChatStep } from '@/components/app-chat-demo';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';
import { chatToSession } from '@/components/tutorial-step-demo';
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

  const demo = route === 'desktop' ? (desktopDemo ?? appDemo) : (appDemo ?? desktopDemo);
  if (!demo) return null;

  return (
    <div className="min-w-0">
      <p className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">what you should see</p>
      <ClaudeDesktopCodeMock steps={chatToSession(demo.steps)} folder={demo.folder} />
    </div>
  );
}
