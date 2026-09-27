'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DemoCard } from '@/components/demo-card';
import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import { CopyBlock } from '@/components/guide/copy-block';
import { useTutorialRoute, type TutorialRoute } from '@/components/route-switcher';
import { ClaudeCodeMock, type CliStep } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';

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

interface TutorialStepBodyProps {
  availableRoutes: TutorialRoute[];
  code?: { snippet: string; language?: string };
  demo?: DemoData;
  appDemo?: ChatDemoData;
  ideDemo?: ChatDemoData;
  /** One scripted session, shown as the real CLI or the desktop Code tab. */
  cliDemo?: { steps: CliStep[] };
  /** 'product' swaps the generic cards for the product-faithful mocks. */
  mockStyle?: 'product';
  /** Used as the desktop mock's session title. */
  title?: string;
}

function PromptBlock({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the text stays selectable.
    }
  }

  return (
    <div className="glass overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--code)] px-4 py-2">
        <span className="font-mono text-xs text-[var(--muted)]">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--chip)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          {copied ? (
            <Check className="h-3 w-3 text-[var(--acc)]" aria-hidden="true" />
          ) : (
            <Copy className="h-3 w-3" aria-hidden="true" />
          )}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy prompt'}</span>
        </button>
      </div>
      <p className="m-0 whitespace-pre-wrap break-words p-4 text-ui leading-relaxed">{text}</p>
    </div>
  );
}

/**
 * One step's hands-on part, for the route the reader picked.
 *
 * Terminal readers get the command. App and IDE readers get the prompt they
 * would type, pulled from the authored chat demo, so every step has something
 * to copy even when the tutorial has no code block. Route-neutral files
 * (markdown, JSON, plain-text prompts) show on every route.
 */
export function TutorialStepBody({
  availableRoutes,
  code,
  demo,
  appDemo,
  ideDemo,
  cliDemo,
  mockStyle,
  title,
}: TutorialStepBodyProps) {
  const route = useTutorialRoute(availableRoutes);
  const chat = route === 'app' ? appDemo : route === 'ide' ? ideDemo : undefined;
  const prompts = chat ? chat.steps.filter((s) => s.role === 'user').map((s) => s.text) : [];

  const language = code?.language ?? 'bash';
  const codeIsPrompt = language === 'text';
  const codeIsShell = language === 'bash';

  const showPrompts = route !== 'terminal' && prompts.length > 0 && !(code && codeIsPrompt);
  const showCode = Boolean(code) && (route === 'terminal' || !codeIsShell || !showPrompts);

  const product = mockStyle === 'product' && cliDemo;

  let preview: React.ReactNode = null;
  if (product && route === 'app') preview = <ClaudeDesktopCodeMock steps={cliDemo.steps} title={title} />;
  else if (product && route === 'terminal') preview = <ClaudeCodeMock steps={cliDemo.steps} />;
  else if (route === 'app' && appDemo) preview = <AppChatDemo steps={appDemo.steps} loop={false} variant="app" />;
  else if (route === 'ide' && ideDemo) preview = <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  else if (route === 'terminal' && demo) preview = <DemoCard title={demo.title} steps={demo.steps} loop={false} />;
  else if (appDemo) preview = <AppChatDemo steps={appDemo.steps} loop={false} variant="app" />;
  else if (ideDemo) preview = <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  else if (demo) preview = <DemoCard title={demo.title} steps={demo.steps} loop={false} />;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {showPrompts &&
        prompts.map((text, i) => (
          <PromptBlock
            key={i}
            text={text}
            label={prompts.length > 1 ? `prompt ${i + 1} of ${prompts.length}` : 'prompt'}
          />
        ))}
      {showCode && code && (
        <div className="min-w-0">
          <CopyBlock code={code.snippet} language={codeIsPrompt ? 'prompt' : language} />
        </div>
      )}
      {preview && (
        <div className="min-w-0">
          <p className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">what you should see</p>
          {preview}
        </div>
      )}
    </div>
  );
}
