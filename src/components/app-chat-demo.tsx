'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';

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
}

export function AppChatDemo({ steps, loop = true, loopDelay = 4000 }: AppChatDemoProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [containerRef, isInView] = useInView(0.3);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [visibleCount, steps, loop, loopDelay, isInView]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount]);

  const nextIsClaudeMessage =
    visibleCount < steps.length && steps[visibleCount]?.role === 'claude';
  const showTyping = isInView && nextIsClaudeMessage;

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-hidden rounded-xl border border-fd-border shadow-sm bg-fd-card"
    >
      {/* App header */}
      <div className="flex items-center gap-2.5 border-b border-fd-border bg-fd-muted px-4 py-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#cc785c] text-[11px] font-bold text-white">
          C
        </div>
        <span className="text-sm font-medium text-fd-foreground">Claude</span>
        <span className="ml-auto font-mono text-[11px] text-fd-muted-foreground">claude.ai</span>
      </div>

      {/* Message thread */}
      <div
        ref={scrollRef}
        className="overflow-y-auto px-4 py-4 space-y-3"
        style={{ minHeight: 120, maxHeight: 300 }}
      >
        {steps.slice(0, visibleCount).map((step, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 animate-fade-in ${step.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {step.role === 'claude' && (
              <div className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#cc785c] text-[11px] font-bold text-white">
                C
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                step.role === 'user'
                  ? 'rounded-br-sm bg-fd-foreground text-fd-background'
                  : 'rounded-bl-sm border border-fd-border bg-fd-background text-fd-foreground'
              }`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {step.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div className="flex items-end gap-2 justify-start animate-fade-in">
            <div className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#cc785c] text-[11px] font-bold text-white">
              C
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-fd-border bg-fd-background px-4 py-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60 animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60 animate-bounce"
                style={{ animationDelay: '160ms' }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/60 animate-bounce"
                style={{ animationDelay: '320ms' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-fd-border bg-fd-muted px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-fd-border bg-fd-background px-3 py-2">
          <span className="flex-1 text-xs text-fd-muted-foreground/60 select-none">
            Message Claude…
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
