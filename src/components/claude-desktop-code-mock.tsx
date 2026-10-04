'use client';

import {
  CHAR_MS,
  EASE,
  ORANGE,
  TOOL_LINE_MS,
  TOOL_RUN_MS,
  stepDuration,
  useSessionClock,
  type CliStep,
} from '@/components/claude-code-mock';
import type { ReactNode } from 'react';

/**
 * The Code tab of the Claude desktop app, running the same scripted session
 * as the terminal mock: sidebar with the Chat/Code toggle and recent sessions,
 * a top bar with the session title and folder, a sans transcript where tool
 * calls collapse into one-line rows, and the task composer.
 */

/** Where the session is: the clock and when each step starts. Extras draw from it. */
export interface DesktopClock {
  t: number;
  starts: number[];
}

/** The model and effort picker beside the send button, and which of its menus is open. */
export interface PickerState {
  model: string;
  effort: string;
  menu?: 'model' | 'effort' | null;
  /** The chip being clicked right now, drawn pressed. */
  press?: 'model' | 'effort' | null;
  /** The model row under the pointer while the model menu is open. */
  hover?: string;
  /** Slider thumb position, 0 (low) to 4 (max), fractional while it moves. */
  slider?: number;
}

const MODELS = ['Fable 5.1', 'Opus 5.5', 'Sonnet 5.5', 'Haiku 4.5'];
const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'];

function Picker({ p }: { p: PickerState }) {
  const chip = (which: 'model' | 'effort') =>
    `rounded-md px-1.5 py-0.5 transition-[transform,background-color] duration-150 ${
      p.menu === which ? 'bg-[var(--cm-bubble)] text-[var(--cm-ink)]' : ''
    } ${p.press === which ? 'scale-95' : ''}`;
  const pos = p.slider ?? EFFORTS.indexOf(p.effort);
  return (
    <span className="relative ml-auto flex items-center gap-0.5">
      <span className={chip('model')}>{p.model}</span>
      <span className={chip('effort')}>{p.effort}</span>
      {p.menu === 'model' ? (
        <span className="cc-in absolute bottom-full right-0 z-10 mb-2 w-[170px] rounded-lg border border-[var(--cm-line)] bg-[var(--cm-card)] p-1 text-[12.5px] text-[var(--cm-ink)] shadow-lg">
          {MODELS.map((m) => (
            <span
              key={m}
              className={`flex items-center justify-between rounded-md px-2 py-1 ${p.hover === m ? 'bg-[var(--cm-bubble)]' : ''}`}
            >
              {m}
              {m === p.model ? <span style={{ color: ORANGE }}>✓</span> : null}
            </span>
          ))}
        </span>
      ) : null}
      {p.menu === 'effort' ? (
        <span className="cc-in absolute bottom-full right-0 z-10 mb-2 w-[230px] rounded-lg border border-[var(--cm-line)] bg-[var(--cm-card)] px-3 pb-2 pt-2.5 text-[var(--cm-ink)] shadow-lg">
          <span className="block text-[12px] font-medium">Effort</span>
          <span className="relative mx-1.5 mt-3 block h-1 rounded-full bg-[var(--cm-line)]">
            <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(pos / 4) * 100}%`, background: ORANGE }} />
            {EFFORTS.map((e, i) => (
              <span key={e} className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cm-muted)]" style={{ left: `${(i / 4) * 100}%` }} />
            ))}
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white shadow"
              style={{ left: `${(pos / 4) * 100}%`, borderColor: ORANGE }}
            />
          </span>
          <span className="mt-2 flex justify-between text-[10.5px] text-[var(--cm-muted)]">
            {EFFORTS.map((e, i) => (
              <span key={e} className={Math.round(pos) === i ? 'font-medium text-[var(--cm-ink)]' : ''}>
                {e}
              </span>
            ))}
          </span>
        </span>
      ) : null}
    </span>
  );
}

interface ClaudeDesktopCodeMockProps {
  steps: CliStep[];
  title?: string;
  folder?: string;
  loop?: boolean;
  height?: number;
  /** A side pane, as a mod would open one. Return null while it is closed. */
  pane?: (c: DesktopClock) => { title: string; body: ReactNode } | null;
  /** A band above the composer, as a mod's AbovePrompt render would draw it. */
  band?: (c: DesktopClock) => ReactNode;
  /** A status line under the composer. */
  status?: (c: DesktopClock) => ReactNode;
  /** Overrides the composer text, e.g. when a pane button fills the prompt. */
  fill?: (c: DesktopClock) => string | undefined;
  /** Extra time to hold after the last step, for extras that keep moving. */
  tailMs?: number;
  /** Draws the model and effort picker as a scripted state instead of the plain model label. */
  picker?: (c: DesktopClock) => PickerState;
}

const LINE_MS = 110;
const ADDED = '#32d74b';

function Spark({ className = 'h-4 w-4', spinning = false }: { className?: string; spinning?: boolean }) {
  const rays = [0, 32, 64, 98, 130, 162, 196, 228, 262, 294, 326];
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className} ${spinning ? 'motion-safe:animate-[spin_2.4s_linear_infinite]' : ''}`}
      aria-hidden="true"
      focusable="false"
    >
      {rays.map((deg, i) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2={i % 2 ? 2.6 : 1.4}
          stroke="#D97757"
          strokeWidth="2.3"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" aria-hidden="true" focusable="false">
      <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" focusable="false">
      <path d="M4 1.75h5.5L12.5 4.75v9.5h-8.5z M9.5 1.75v3h3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/** The collapsed row for a non-edit tool call: [while running, when done]. */
function collapsedLabel(name: string, file: string | undefined): [string, string] {
  if (name === 'Bash') return ['Running a command', 'Ran 1 command'];
  if (name === 'Agent') return [`Starting ${file}`, `Started ${file}`];
  if (name === 'Glob' || name === 'Grep') return ['Searching', 'Searched for 1 pattern'];
  if (name.endsWith('(MCP)')) return [`Calling ${name.split(' - ')[0]}`, `Called ${name.split(' - ')[0]}`];
  return [`Reading ${file}`, 'Read 1 file'];
}

/** "Wrote 287 lines" or "with 7 additions" wins over the preview length, which is often cut short. */
function addedCount(result: string, previewLines: number): number {
  const m = result.match(/(\d+) (?:lines|additions?)/);
  return m ? Number(m[1]) : previewLines;
}

function Sidebar({ title }: { title: string }) {
  const recents = ['Tidy the roadmap doc', 'Draft launch checklist'];
  return (
    <aside className="hidden w-[184px] shrink-0 flex-col gap-3 border-r border-[var(--cm-line)] bg-[var(--cm-side)] px-2.5 py-3 text-[12.5px] sm:flex">
      <div className="grid grid-cols-2 rounded-md bg-[var(--cm-bubble)] p-0.5 text-center text-[12px]">
        <span className="rounded-[5px] py-1 text-[var(--cm-muted)]">Chat</span>
        <span className="rounded-[5px] bg-[var(--cm-card)] py-1 font-medium shadow-sm">Code</span>
      </div>
      <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
        <span className="text-[15px] leading-none text-[var(--cm-muted)]">+</span> New session
      </div>
      <div>
        <p className="m-0 px-2 pb-1 text-[11px] text-[var(--cm-muted)]">Recents</p>
        <div className="flex items-center gap-2 rounded-md bg-[var(--cm-bubble)] px-2 py-1.5">
          <Spark className="h-3 w-3" />
          <span className="truncate">{title}</span>
        </div>
        {recents.map((r) => (
          <div key={r} className="flex items-center gap-2 px-2 py-1.5 text-[var(--cm-muted)]">
            <span className="h-2 w-2 shrink-0 rounded-full border border-current" />
            <span className="truncate">{r}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function ClaudeDesktopCodeMock({
  steps,
  title = 'New session',
  folder = 'my-project',
  loop = false,
  height = 330,
  pane,
  band,
  status,
  fill,
  tailMs = 0,
  picker,
}: ClaudeDesktopCodeMockProps) {
  const { t, starts, containerRef, viewportRef, contentRef, offset } = useSessionClock(steps, loop, tailMs);
  const clock = { t, starts };
  const openPane = pane?.(clock) ?? null;
  const bandNode = band?.(clock);

  let inputText = '';
  let sending = false;
  const transcript: React.ReactNode[] = [];

  steps.forEach((step, i) => {
    const local = t - starts[i];
    if (local < 0) return;
    const dur = stepDuration(step);
    switch (step.kind) {
      case 'prompt': {
        if (local < dur - 260) {
          inputText = step.text.slice(0, Math.floor(local / CHAR_MS));
        } else if (local < dur) {
          inputText = step.text;
          sending = true;
        } else {
          transcript.push(
            <div key={i} className="cc-in mt-4 flex justify-end">
              <div className="max-w-[85%] rounded-[10px] bg-[var(--cm-bubble)] px-3 py-2">{step.text}</div>
            </div>,
          );
        }
        break;
      }
      case 'thinking': {
        if (local < dur) {
          transcript.push(
            <div key={i} className="cc-in mt-4 flex items-center gap-2 text-[var(--cm-muted)]">
              <Spark spinning />
              <span className="motion-safe:animate-pulse">{step.verb ?? 'Thinking'}…</span>
            </div>,
          );
        }
        break;
      }
      case 'say': {
        const lines = step.text.split('\n');
        const shown = Math.min(lines.length, Math.floor(local / LINE_MS) + 1);
        transcript.push(
          <div key={i} className="mt-4">
            {lines.slice(0, shown).map((line, li) => (
              <p key={li} className="cc-in m-0 min-h-[1.45em] whitespace-pre-wrap break-words">
                {line}
              </p>
            ))}
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
        const isEdit = step.name === 'Write' || step.name === 'Edit' || step.name === 'Update';
        const file = step.arg.split('/').pop();
        if (!isEdit) {
          const [doing, done] = collapsedLabel(step.name, file);
          transcript.push(
            <div key={i} className="cc-in mt-3 flex items-center gap-1.5 rounded px-1 py-0.5 text-[13px] text-[var(--cm-muted)]">
              <Chevron />
              {running ? (
                <span className="min-w-0 truncate motion-safe:animate-pulse">{doing}…</span>
              ) : (
                <span className="min-w-0 truncate">{done}</span>
              )}
            </div>,
          );
          break;
        }
        transcript.push(
          <div key={i} className="cc-in mt-3 overflow-hidden rounded-lg border border-[var(--cm-line)] bg-[var(--cm-card)] text-[12.5px]">
            <div className="flex items-center gap-2 px-3 py-2">
              <FileIcon />
              <span className="min-w-0 flex-1 truncate font-medium">{file}</span>
              {running ? (
                <span className="text-[var(--cm-muted)] motion-safe:animate-pulse">Writing…</span>
              ) : (
                <>
                  <span className="font-mono" style={{ color: ADDED }}>+{addedCount(step.result, bodyLines.length)}</span>
                  <span className="text-[var(--cm-muted)]">Undo</span>
                </>
              )}
            </div>
            {shown > 0 && (
              <div className="border-t border-[var(--cm-line)] py-1 font-mono text-[11.5px] leading-[1.6]">
                {bodyLines.slice(0, shown).map((line, li) => (
                  <div key={li} className="cc-in flex gap-3 bg-[#32d74b]/[0.08] px-3">
                    <span className="w-4 shrink-0 text-right text-[var(--cm-muted)]">{li + 1}</span>
                    <span className="min-w-0 whitespace-pre-wrap break-words">{line || ' '}</span>
                  </div>
                ))}
              </div>
            )}
          </div>,
        );
        break;
      }
    }
  });

  const filled = fill?.(clock);
  if (filled !== undefined) inputText = filled;

  return (
    <div
      ref={containerRef}
      className="cmock not-prose my-6 min-w-0 overflow-hidden rounded-xl border border-[var(--cm-line)] bg-[var(--cm-bg)] text-[var(--cm-ink)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]"
      role="img"
      aria-label="A Claude Code session in the Code tab of the Claude desktop app"
    >
      <div className="flex">
        <div className={`hidden w-[184px] shrink-0 items-center gap-2 border-r border-[var(--cm-line)] bg-[var(--cm-side)] px-3.5 h-10 ${pane ? '' : 'sm:flex'}`}>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {/* Top bar: session title, folder chip, then the right-hand actions. */}
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 border-b border-[var(--cm-line)] px-3 text-[12.5px]">
          <span className={`mr-1 flex items-center gap-1.5 ${pane ? '' : 'sm:hidden'}`}>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="min-w-0 truncate font-medium">{title}</span>
          <span className="shrink-0 rounded-md border border-[var(--cm-line)] px-1.5 py-0.5 text-[11.5px] text-[var(--cm-muted)]">
            {folder}
          </span>
          <span className="ml-auto hidden shrink-0 text-[var(--cm-muted)] sm:inline">Changes</span>
          <span className="shrink-0 rounded-md border border-[var(--cm-line)] px-2 py-0.5 text-[11.5px]">Share</span>
        </div>
      </div>
      <div className={pane ? 'flex flex-col sm:flex-row' : 'flex'}>
        {/* A pane takes the sidebar's room, so the transcript keeps its width. */}
        {pane ? null : <Sidebar title={title} />}
        <div className="flex min-w-0 flex-1 flex-col text-[14px] leading-[20px]">
          <div ref={viewportRef} className="relative overflow-hidden px-4 sm:px-6" style={{ height }}>
            <div
              ref={contentRef}
              className="pb-3 transition-transform duration-500 motion-reduce:transition-none"
              style={{ transform: `translateY(${-offset}px)`, transitionTimingFunction: EASE }}
            >
              <div className="h-1" />
              {transcript}
            </div>
          </div>
          {/* Composer: task box, then mode, model and the send button. */}
          <div className="px-3 pb-3 sm:px-5">
            {bandNode ? (
              <div className="cc-in mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-[var(--cm-line)] bg-[var(--cm-card)] px-3 py-2 text-[12.5px]">
                {bandNode}
              </div>
            ) : null}
            <div className="rounded-xl border border-[var(--cm-line)] bg-[var(--cm-card)] px-3 pb-2 pt-2.5 shadow-sm">
              <div className="min-h-[20px] truncate">
                {inputText ? (
                  <span>{inputText}</span>
                ) : (
                  <span className="text-[var(--cm-muted)]">Describe a task or ask a question</span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11.5px] text-[var(--cm-muted)]">
                <span className="text-[16px] leading-none">+</span>
                <span className="rounded-md bg-[var(--cm-bubble)] px-1.5 py-0.5">Accept edits</span>
                {picker ? <Picker p={picker(clock)} /> : <span className="ml-auto hidden sm:inline">Opus 5.5</span>}
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-[6px] transition-transform duration-200"
                  style={{ background: ORANGE, transform: sending ? 'scale(0.88)' : 'none' }}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" focusable="false">
                    <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
            {status ? (
              <div className="mt-1.5 flex min-h-[18px] items-center gap-2 overflow-hidden whitespace-nowrap px-1 font-mono text-[11px] text-[var(--cm-muted)]">
                {status(clock)}
              </div>
            ) : null}
          </div>
        </div>
        {pane ? (
          <aside
            className={`relative shrink-0 overflow-hidden border-[var(--cm-line)] bg-[var(--cm-side)] transition-[width,opacity] duration-500 motion-reduce:transition-none max-sm:border-t sm:border-l ${
              openPane ? 'opacity-100 sm:w-[280px]' : 'max-sm:hidden opacity-0 sm:w-0'
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            {openPane ? (
              <div className="w-full sm:absolute sm:inset-y-0 sm:left-0 sm:w-[280px]">
                <div className="flex h-9 items-center justify-between border-b border-[var(--cm-line)] px-3 text-[12px] font-medium">
                  <span>{openPane.title}</span>
                  <span className="text-[var(--cm-muted)]">×</span>
                </div>
                <div className="px-3 py-2.5 text-[12px] leading-[17px]">{openPane.body}</div>
              </div>
            ) : null}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
