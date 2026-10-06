'use client';

import { DemoCard } from '@/components/demo-card';
import { AppChatDemo, type ChatStep } from '@/components/app-chat-demo';
import { CopyBlock } from '@/components/guide/copy-block';
import { useTutorialRoute, type TutorialRoute } from '@/components/route-switcher';
import { useTutorialPersona } from '@/components/persona-switcher';
import { ClaudeCodeMock, TOOL_RUN_MS, type CliStep } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock, type DesktopClock } from '@/components/claude-desktop-code-mock';
import { chatToSession } from '@/lib/chat-session';
import { ui, type Locale } from '@/lib/i18n/locale';

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
  /** Persona ids offered on this tutorial, in order. */
  personaIds?: string[];
  /** Per-persona demos; the picked persona's replace appDemo/ideDemo. */
  variants?: Record<string, { appDemo?: ChatDemoData; ideDemo?: ChatDemoData }>;
  /** Paths for a Files pane beside the desktop mock, each shown once session step `at` has run. */
  files?: Array<{ path: string; at: number }>;
  /** The desktop mock's folder chip. */
  folder?: string;
  /** Used as the desktop mock's session title. */
  title?: string;
  locale?: Locale;
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
  appDemo: baseAppDemo,
  ideDemo: baseIdeDemo,
  cliDemo,
  personaIds = [],
  variants,
  files,
  folder,
  title,
  locale = 'en',
}: TutorialStepBodyProps) {
  const t = ui(locale);
  const route = useTutorialRoute(availableRoutes);
  const persona = useTutorialPersona(personaIds);
  const variant = persona ? variants?.[persona] : undefined;
  const appDemo = variant?.appDemo ?? baseAppDemo;
  const ideDemo = variant?.ideDemo ?? baseIdeDemo;
  const chat = route === 'app' ? appDemo : route === 'ide' ? ideDemo : undefined;
  const prompts = chat ? chat.steps.filter((s) => s.role === 'user' && !s.example).map((s) => s.text) : [];

  const language = code?.language ?? 'bash';
  const codeIsPrompt = language === 'text';
  const codeIsShell = language === 'bash';

  const showPrompts = route !== 'terminal' && prompts.length > 0 && !(code && codeIsPrompt);
  const showCode = Boolean(code) && (route === 'terminal' || !codeIsShell || !showPrompts);

  const session = cliDemo?.steps ?? (appDemo ? chatToSession(appDemo.steps) : undefined);

  const pane = files ? filesPane(files, folder) : undefined;
  const desktop = session ? (
    <ClaudeDesktopCodeMock steps={session} title={title} folder={folder} pane={pane} />
  ) : null;

  let preview: React.ReactNode = null;
  if (route === 'app' && session) preview = desktop;
  else if (route === 'ide' && ideDemo) preview = <AppChatDemo steps={ideDemo.steps} loop={false} variant="ide" />;
  else if (route === 'terminal' && cliDemo) preview = <ClaudeCodeMock steps={cliDemo.steps} />;
  else if (route === 'terminal' && demo) preview = <DemoCard title={demo.title} steps={demo.steps} loop={false} />;
  else if (session) preview = desktop;
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
            title={prompts.length > 1 ? t.promptNofM(i + 1, prompts.length) : t.prompt}
          />
        ))}
      {showCode && code && (
        <div className="min-w-0">
          <CopyBlock code={code.snippet} language={codeIsPrompt ? 'prompt' : language} />
        </div>
      )}
      {preview && (
        <div className="min-w-0">
          <p className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">{t.whatYouShouldSee}</p>
          {preview}
        </div>
      )}
    </div>
  );
}

/** A Files pane that grows a tree under the folder as the session creates each path. */
function filesPane(files: Array<{ path: string; at: number }>, folder = 'my-project') {
  return ({ t, starts }: DesktopClock) => {
    const shown = files.filter((f) => starts[f.at] !== undefined && t >= starts[f.at] + TOOL_RUN_MS);
    return {
      title: 'Files',
      body: (
        <div className="font-mono text-[11.5px] leading-[1.7]">
          <div>▾ {folder}/</div>
          {shown.length === 0 ? <div className="pl-4 text-[var(--cm-muted)]">empty</div> : null}
          {shown.map((f) => {
            const parts = f.path.replace(/\/$/, '').split('/');
            const isDir = f.path.endsWith('/');
            const open = shown.some((o) => o.path !== f.path && o.path.startsWith(f.path));
            return (
              <div key={f.path} className="cc-in" style={{ paddingLeft: `${parts.length}rem` }}>
                {isDir ? (open ? '▾ ' : '▸ ') : ''}
                {parts[parts.length - 1]}
                {isDir ? '/' : ''}
              </div>
            );
          })}
        </div>
      ),
    };
  };
}
