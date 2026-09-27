'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';

/** Render **bold**, `inline code`, and \n line breaks from chat text. */
function renderChatText(text: string): ReactNode {
  const lines = text.split('\n');
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    const rendered = parts.map((part, pi) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pi}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={pi} className="rounded bg-[var(--code)] px-1 py-0.5 font-mono text-label">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
    return (
      <span key={li}>
        {rendered}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

export type ChatRole = 'user' | 'claude';

export interface ChatStep {
  role: ChatRole;
  /** Supports \n for line breaks (rendered with whitespace: pre-line) */
  text: string;
  /** Delay in ms before this message appears. Defaults: user=600ms, claude=1200ms */
  delay?: number;
}

interface AppChatDemoProps {
  steps: ChatStep[];
  loop?: boolean;
  loopDelay?: number;
  /** 'app' = claude.ai in a browser. 'desktop' = the Claude desktop app. 'ide' = VS Code / Cursor chat panel. */
  variant?: 'app' | 'desktop' | 'ide';
  /** Desktop only: the folder Claude has been given, shown in the header. */
  folder?: string;
}

export function AppChatDemo({ steps, loop = true, loopDelay = 4000, variant = 'app', folder }: AppChatDemoProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [containerRef, isInView] = useInView(0.3);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // Reduced motion: show the whole conversation at once, no typing or looping.
    if (reducedMotion) {
      setVisibleCount(steps.length);
      return;
    }
    if (!isInView) return;

    if (visibleCount >= steps.length) {
      if (!loop) return;
      const t = setTimeout(() => setVisibleCount(0), loopDelay);
      return () => clearTimeout(t);
    }

    const step = steps[visibleCount];
    const delay = step?.delay ?? (step?.role === 'user' ? 600 : 1200);
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount, steps, loop, loopDelay, isInView, reducedMotion]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount]);

  const nextIsClaudeMessage =
    visibleCount < steps.length && steps[visibleCount]?.role === 'claude';
  const showTyping = isInView && nextIsClaudeMessage && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-hidden rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2]"
    >
      {/* Header : changes based on variant */}
      {variant === 'ide' ? (
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] bg-zinc-800 px-4 py-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-zinc-600 text-label text-zinc-200">
            ⌘
          </div>
          <span className="text-xs font-medium text-zinc-200">AI Chat</span>
          <span className="ml-auto font-mono text-label text-zinc-400">Cursor · ⌘L</span>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 border-b border-fd-border bg-[var(--code)] px-4 py-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#cc785c] text-label font-bold text-[#141413]" aria-hidden="true">
            C
          </div>
          <span className="text-sm font-medium text-fd-foreground">Claude</span>
          {variant === 'desktop' && folder ? (
            <span className="ml-auto truncate rounded-md border border-fd-border px-2 py-0.5 font-mono text-label text-fd-muted-foreground">
              Folder: {folder}
            </span>
          ) : (
            <span className="ml-auto font-mono text-label text-fd-muted-foreground">
              {variant === 'desktop' ? 'Desktop app' : 'claude.ai'}
            </span>
          )}
        </div>
      )}

      {/* Message thread : fixed height prevents CLS as messages animate in */}
      <div
        ref={scrollRef}
        className="overflow-y-auto px-4 py-4 space-y-3"
        style={{ height: 300 }}
      >
        {steps.slice(0, visibleCount).map((step, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 animate-fade-in ${step.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {step.role === 'claude' && (
              <div className={`mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-label font-bold ${variant === 'ide' ? 'bg-[var(--acc)] text-[var(--accInk)]' : 'bg-[#cc785c] text-[#141413]'}`} aria-hidden="true">
                {variant === 'ide' ? 'AI' : 'C'}
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                step.role === 'user'
                  ? 'rounded-br-sm bg-[#525252] text-white'
                  : 'rounded-bl-sm border border-fd-border bg-fd-background text-fd-foreground'
              }`}
            >
              {renderChatText(step.text)}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div className="flex items-end gap-2 justify-start animate-fade-in">
            <div className={`mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-label font-bold ${variant === 'ide' ? 'bg-[var(--acc)] text-[var(--accInk)]' : 'bg-[#cc785c] text-[#141413]'}`} aria-hidden="true">
              {variant === 'ide' ? 'AI' : 'C'}
            </div>
            <div className="flex items-center gap-1 rounded-xl rounded-bl-sm border border-fd-border bg-fd-background px-4 py-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60 animate-bounce motion-reduce:animate-none"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60 animate-bounce motion-reduce:animate-none"
                style={{ animationDelay: '160ms' }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60 animate-bounce motion-reduce:animate-none"
                style={{ animationDelay: '320ms' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-fd-border bg-[var(--code)] px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-fd-border bg-fd-background px-3 py-2">
          <span className="flex-1 text-xs text-fd-muted-foreground/60 select-none">
            {variant === 'ide' ? 'Ask Cursor…' : 'Message Claude…'}
          </span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-fd-muted-foreground/20">
            <svg className="h-2.5 w-2.5 rotate-90 text-fd-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
