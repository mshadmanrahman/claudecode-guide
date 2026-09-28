'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';

/**
 * A Claude Code session as it looks in a real terminal: the welcome banner,
 * the prompt, the ⏺ replies and tool calls, the spinner. Everything is
 * derived from one clock, so the motion stays smooth and reduced motion can
 * jump straight to the end.
 */

export type CliStep =
  /** Typed into the input box, then submitted and echoed as "> text". */
  | { kind: 'prompt'; text: string }
  /** The orange spinner line ("✻ Thinking…") shown while Claude works. */
  | { kind: 'thinking'; verb?: string; ms?: number }
  /** A plain reply. Supports \n; lines stream in one by one. */
  | { kind: 'say'; text: string }
  /** A tool call: "⏺ Write(CLAUDE.md)" then "⎿ result", then optional file lines. */
  | { kind: 'tool'; name: string; arg: string; result: string; lines?: string[] }
  /** What a slash command prints under its prompt: "⎿ Set model to Haiku 4.5". */
  | { kind: 'output'; text: string };

interface ClaudeCodeMockProps {
  steps: CliStep[];
  cwd?: string;
  loop?: boolean;
  height?: number;
}

export const ORANGE = '#D77757';
const MASCOT = 'var(--ct-mascot)';
export const DIM = 'var(--ct-dim)';
export const INK = 'var(--ct-ink)';
export const SPINNER = ['·', '✢', '✳', '✶', '✻', '✽', '✻', '✶', '✳', '✢'];
export const CHAR_MS = 34;
const LINE_MS = 110;
const GAP_MS = 380;
export const TOOL_RUN_MS = 420;
export const TOOL_LINE_MS = 70;
export const EASE = 'cubic-bezier(0.22,1,0.36,1)';

export function stepDuration(step: CliStep): number {
  switch (step.kind) {
    case 'prompt':
      return step.text.length * CHAR_MS + 420;
    case 'thinking':
      return step.ms ?? 1300;
    case 'say':
      return step.text.split('\n').length * LINE_MS + 200;
    case 'tool':
      return TOOL_RUN_MS + 100 + (step.lines?.length ?? 0) * TOOL_LINE_MS;
    case 'output':
      return 300 + step.text.split('\n').length * LINE_MS;
  }
}

export function Mascot({ className, color }: { className: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"
        style={{ fill: color }}
      />
    </svg>
  );
}

function CurrentBanner({ cwd }: { cwd: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <Mascot className="h-10 w-10" color={MASCOT} />
      <div className="min-w-0 leading-[1.45]">
        <div>
          <span className="font-bold">Claude Code</span> <span style={{ color: DIM }}>v2.1.28</span>
        </div>
        <div style={{ color: DIM }}>Opus 5.5 · Claude Pro</div>
        <div className="truncate" style={{ color: DIM }}>{cwd}</div>
      </div>
    </div>
  );
}

/**
 * The shared clock for a scripted session: one requestAnimationFrame loop that
 * runs while the mock is on screen, plus the glide that scrolls the transcript
 * up when it outgrows the window. Reduced motion returns t = Infinity, so every
 * step renders in its finished state.
 */
export function useSessionClock(steps: CliStep[], loop: boolean) {
  const [containerRef, isInView] = useInView(0.3);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const starts: number[] = [];
  let total = 700; // the banner settles before the first keystroke
  for (const s of steps) {
    starts.push(total);
    total += stepDuration(s) + GAP_MS;
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const finished = elapsed >= total;

  useEffect(() => {
    if (reducedMotion || !isInView) return;
    if (finished && !loop) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setElapsed((e) => {
        const next = e + dt;
        if (next >= total + 4000) return loop ? 0 : total;
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, reducedMotion, total, loop, finished]);

  useLayoutEffect(() => {
    const v = viewportRef.current;
    const c = contentRef.current;
    if (!v || !c) return;
    const over = Math.max(0, c.scrollHeight - v.clientHeight);
    if (over !== offset) setOffset(over);
  });

  return {
    t: reducedMotion ? Number.POSITIVE_INFINITY : elapsed,
    starts,
    containerRef,
    viewportRef,
    contentRef,
    offset,
  };
}

export function ClaudeCodeMock({ steps, cwd = '~/my-project', loop = false, height = 340 }: ClaudeCodeMockProps) {
  const { t, starts, containerRef, viewportRef, contentRef, offset } = useSessionClock(steps, loop);
  const promptGlyph = '❯';

  let inputText = '';
  const transcript: React.ReactNode[] = [];

  steps.forEach((step, i) => {
    const local = t - starts[i];
    if (local < 0) return;
    const dur = stepDuration(step);
    switch (step.kind) {
      case 'prompt': {
        if (local < dur) {
          inputText = step.text.slice(0, Math.floor(local / CHAR_MS));
        } else {
          transcript.push(
            <div key={i} className="cc-in mt-3 rounded-sm bg-[var(--ct-chip)] px-1.5 py-0.5">
              <span style={{ color: DIM }}>{promptGlyph} </span>
              {step.text}
            </div>,
          );
        }
        break;
      }
      case 'thinking': {
        if (local < dur) {
          const glyph = SPINNER[Math.floor(local / 120) % SPINNER.length];
          const secs = Math.max(1, Math.round(local / 1000));
          transcript.push(
            <div key={i} className="mt-3" style={{ color: ORANGE }}>
              <span className="inline-block w-4">{glyph}</span>
              {step.verb ?? 'Thinking'}…{' '}
              <span style={{ color: DIM }}>({secs}s · esc to interrupt)</span>
            </div>,
          );
        }
        break;
      }
      case 'say': {
        const lines = step.text.split('\n');
        const shown = Math.min(lines.length, Math.floor(local / LINE_MS) + 1);
        transcript.push(
          <div key={i} className="mt-3 flex gap-2">
            <span className="shrink-0">⏺</span>
            <div className="min-w-0">
              {lines.slice(0, shown).map((line, li) => (
                <div key={li} className="cc-in min-h-[1.5em] whitespace-pre-wrap break-words">
                  {line}
                </div>
              ))}
            </div>
          </div>,
        );
        break;
      }
      case 'tool': {
        const running = local < TOOL_RUN_MS;
        const bodyLines = step.lines ?? [];
        const shown = running
          ? 0
          : Math.min(bodyLines.length, Math.floor((local - TOOL_RUN_MS) / TOOL_LINE_MS) + 1);
        transcript.push(
          <div key={i} className="cc-in mt-3">
            <div className="flex gap-2">
              <span className="shrink-0 transition-colors duration-300" style={{ color: running ? DIM : 'var(--ct-ok)' }}>
                ⏺
              </span>
              <span className="min-w-0 break-words">
                <span className="font-bold">{step.name}</span>({step.arg})
              </span>
            </div>
            {!running && (
              <div className="cc-in flex gap-2 pl-2" style={{ color: DIM }}>
                <span className="shrink-0">⎿</span>
                <span className="min-w-0 break-words">{step.result}</span>
              </div>
            )}
            {bodyLines.slice(0, shown).map((line, li) => (
              <div key={li} className="cc-in flex gap-3 pl-6">
                <span className="w-5 shrink-0 text-right" style={{ color: DIM }}>{li + 1}</span>
                <span className="min-w-0 whitespace-pre-wrap break-words">{line}</span>
              </div>
            ))}
          </div>,
        );
        break;
      }
      case 'output': {
        transcript.push(
          <div key={i} className="cc-in flex gap-2 pl-2" style={{ color: DIM }}>
            <span className="shrink-0">⎿</span>
            <span className="min-w-0 whitespace-pre-wrap break-words">{step.text}</span>
          </div>,
        );
        break;
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="ctmock my-6 min-w-0 overflow-hidden rounded-xl border border-[var(--ct-edge)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)]"
      role="img"
      aria-label="A Claude Code session in a terminal"
    >
      <div className="relative flex items-center gap-2 border-b border-[var(--ct-edge)] bg-[var(--ct-bar)] px-3.5 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="pointer-events-none absolute inset-x-20 truncate text-center font-mono text-[11.5px] text-[var(--ct-dim)]">
          claude · {cwd.split('/').pop()}
        </span>
      </div>
      <div className="bg-[var(--ct-bg)] font-mono text-[12.5px] leading-[1.5]" style={{ color: INK }}>
        <div ref={viewportRef} className="relative overflow-hidden px-3 pt-3 sm:px-4" style={{ height }}>
          <div
            ref={contentRef}
            className="transition-transform duration-500 motion-reduce:transition-none"
            style={{ transform: `translateY(${-offset}px)`, transitionTimingFunction: EASE }}
          >
            <CurrentBanner cwd={cwd} />
            {transcript}
            <div className="h-2" />
          </div>
        </div>
        {/* The input box: rules above and below, like the real CLI. */}
        <div className="px-3 pb-2 sm:px-4">
          <div className="truncate border-y border-[var(--ct-rule)] py-1.5">
            <span style={{ color: DIM }}>{promptGlyph} </span>
            {inputText ? (
              <span>{inputText}</span>
            ) : (
              <span style={{ color: DIM }}>Try &quot;what does this project do?&quot;</span>
            )}
            <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-[var(--ct-ink)] motion-safe:animate-blink" />
          </div>
          <div className="pt-1 text-[11.5px]" style={{ color: DIM }}>
            ⏵⏵ accept edits on (shift+tab to cycle)
          </div>
        </div>
      </div>
    </div>
  );
}
