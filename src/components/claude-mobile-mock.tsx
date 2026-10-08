'use client';

import { useEffect, useRef, useState } from 'react';
import { renderChatText, type ChatStep } from '@/components/app-chat-demo';
import { useInView } from '@/hooks/use-in-view';

interface ClaudeMobileMockProps {
  steps: ChatStep[];
  loop?: boolean;
  loopDelay?: number;
}

/** The Claude starburst, as the iOS app draws it beside a reply. */
function Spark({ className = 'h-5 w-5' }: { className?: string }) {
  const rays = [0, 33, 65, 98, 131, 164, 196, 229, 262, 295, 327];
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      {rays.map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2="2.5"
          stroke="#D97757"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

/**
 * The same first task as the desktop demo, drawn as the Claude iPhone app. Small
 * screens get this instead of the Mac window, which does not fit a phone.
 */
export function ClaudeMobileMock({ steps, loop = true, loopDelay = 4000 }: ClaudeMobileMockProps) {
  const [visible, setVisible] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [containerRef, isInView] = useInView(0.3);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(steps.length);
      return;
    }
    if (!isInView) return;
    if (visible >= steps.length) {
      if (!loop) return;
      const t = setTimeout(() => setVisible(0), loopDelay);
      return () => clearTimeout(t);
    }
    const step = steps[visible];
    const t = setTimeout(() => setVisible((c) => c + 1), step?.delay ?? (step?.role === 'user' ? 700 : 1500));
    return () => clearTimeout(t);
  }, [visible, steps, loop, loopDelay, isInView, reducedMotion]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible]);

  const thinking = isInView && !reducedMotion && visible < steps.length && steps[visible]?.role === 'claude';

  return (
    <div
      ref={containerRef}
      className="mx-auto flex h-[520px] w-[300px] max-w-full flex-col overflow-hidden rounded-[40px] border-[6px] border-[#1c1c1e] bg-[var(--bg)]"
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pb-1 pt-2.5 text-[11px] font-semibold text-fd-foreground" aria-hidden="true">
        <span>9:41</span>
        <span className="h-[18px] w-[72px] rounded-full bg-[#1c1c1e]" />
        <span className="flex items-center gap-1">
          <span className="h-2 w-3 rounded-[2px] border border-current" />
        </span>
      </div>

      {/* App bar */}
      <div className="flex items-center justify-between px-4 py-2" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-fd-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 7h16M4 12h10M4 17h16" />
        </svg>
        <span className="flex items-center gap-1 text-sm font-semibold text-fd-foreground">
          Claude
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-fd-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-fd-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </div>

      {/* Thread */}
      <div ref={threadRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed">
        {steps.slice(0, visible).map((step, i) =>
          step.role === 'user' ? (
            <div key={i} className="animate-fade-in flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-[var(--code)] px-3.5 py-2 text-fd-foreground">{renderChatText(step.text)}</div>
            </div>
          ) : (
            <div key={i} className="animate-fade-in flex flex-col gap-2 text-fd-foreground">
              <Spark />
              <div>{renderChatText(step.text)}</div>
            </div>
          ),
        )}
        {thinking && (
          <div className="animate-fade-in" aria-hidden="true">
            <Spark className="h-5 w-5 motion-safe:animate-[spin_2.4s_linear_infinite]" />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="px-3 pb-5 pt-2" aria-hidden="true">
        <div className="flex flex-col gap-2 rounded-3xl border border-fd-border bg-[var(--bg)] px-3.5 py-2.5 shadow-sm">
          <span className="text-[13px] text-fd-muted-foreground">Reply to Claude</span>
          <div className="flex items-center justify-between">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-fd-border text-fd-muted-foreground">+</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D97757] text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-fd-foreground/80" />
      </div>
    </div>
  );
}
