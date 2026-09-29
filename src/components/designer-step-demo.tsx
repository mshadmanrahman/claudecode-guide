'use client';

import { useEffect, useState } from 'react';
import type { ChatStep } from '@/components/app-chat-demo';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';
import { chatToSession } from '@/lib/chat-session';
import { CopyBlock } from '@/components/guide/copy-block';
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
  /** The step already shows its own copyable prompt, so do not repeat it. */
  skipPrompts?: boolean;
}

export function DesignerStepDemo({ appDemo, desktopDemo, skipPrompts = false }: DesignerStepDemoProps) {
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

  const prompts = skipPrompts ? [] : demo.steps.filter((st) => st.role === 'user').map((st) => st.text);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {prompts.map((text, i) => (
        <CopyBlock
          key={i}
          code={text}
          language="prompt"
          title={prompts.length > 1 ? `Prompt ${i + 1} of ${prompts.length}` : 'Prompt'}
        />
      ))}
      <div>
      <p className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">what you should see</p>
      <ClaudeDesktopCodeMock steps={chatToSession(demo.steps)} folder={demo.folder} />
      </div>
    </div>
  );
}
