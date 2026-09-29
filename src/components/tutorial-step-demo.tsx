'use client';

import { DemoCard } from '@/components/demo-card';
import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import { CopyBlock } from '@/components/guide/copy-block';
import { useTutorialRoute, type TutorialRoute } from '@/components/route-switcher';
import { ClaudeCodeMock, type CliStep } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';
import { chatToSession } from '@/lib/chat-session';

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
  /** Used as the desktop mock's session title. */
  title?: string;
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

  const session = cliDemo?.steps ?? (appDemo ? chatToSession(appDemo.steps) : undefined);

  let preview: React.ReactNode = null;
  if (route === 'app' && session) preview = <ClaudeDesktopCodeMock steps={session} title={title} />;
  else if (route === 'ide' && ideDemo) preview = <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  else if (route === 'terminal' && cliDemo) preview = <ClaudeCodeMock steps={cliDemo.steps} />;
  else if (route === 'terminal' && demo) preview = <DemoCard title={demo.title} steps={demo.steps} loop={false} />;
  else if (session) preview = <ClaudeDesktopCodeMock steps={session} title={title} />;
  else if (ideDemo) preview = <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  else if (demo) preview = <DemoCard title={demo.title} steps={demo.steps} loop={false} />;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {showPrompts &&
        prompts.map((text, i) => (
          <CopyBlock
            key={i}
            code={text}
            language="prompt"
            title={prompts.length > 1 ? `Prompt ${i + 1} of ${prompts.length}` : 'Prompt'}
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
