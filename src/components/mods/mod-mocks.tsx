'use client';

import type { CliStep } from '@/components/claude-code-mock';
import { stepDuration } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock, type DesktopClock } from '@/components/claude-desktop-code-mock';
import { avatarSvg, dotsSvg, type Mood } from '@/components/mods/avatar-svg';

/**
 * The three mods from the "How to Mod Claude Code" post, animated inside the
 * desktop app mock: the agent panel, the Usage status line and the /active
 * pane. Layout and labels follow each mod's own render code. The numbers and
 * thread names are made up.
 */

const ORANGE = '#D97757';
const GREEN = '#3BA55C';

const lerp = (from: number, to: number, p: number) => from + (to - from) * Math.min(1, Math.max(0, p));
const k = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${Math.round(n)}`);
const clock = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
const endOf = (steps: CliStep[], starts: number[], i: number) => starts[i] + stepDuration(steps[i]);

/** The usage-pace mod's line: a five-cell bar, weekly use against the share of the week gone, and a verdict. */
function UsageLine({ used, elapsed, flash = false }: { used: number; elapsed: number; flash?: boolean }) {
  const pace = used / elapsed;
  const verdict = pace > 1.15 ? 'Over pace' : pace < 0.85 ? 'Under pace' : 'On pace';
  const filled = Math.round((used / 100) * 5);
  return (
    <>
      <span className="text-[var(--cm-ink)]">Usage</span>
      <span className={`transition-colors duration-700 ${flash ? 'text-[var(--cm-ink)]' : ''}`}>
        {'█'.repeat(filled) + '░'.repeat(5 - filled)} {used}% / {elapsed}% week | {verdict}
      </span>
    </>
  );
}

function Svg({ svg, className }: { svg: string; className: string }) {
  return <span className={`block ${className} [&>svg]:h-full [&>svg]:w-full`} dangerouslySetInnerHTML={{ __html: svg }} />;
}

/* ---------- Agent panel ---------- */

interface Agent {
  key: string;
  description: string;
  role: string;
  model: string;
  effort: [string, string];
  start: number;
  end: number;
  tokens: number;
  ctx: number;
  steps: number;
  cost: number;
}

function AgentCard({ a, t }: { a: Agent; t: number }) {
  const p = (t - a.start) / (a.end - a.start);
  const status: Mood = t < a.end ? 'running' : 'done';
  const ctx = lerp(0, a.ctx, p);
  const fill = Math.min(12, Math.round((ctx / 1_000_000) * 12));
  return (
    <div className="cc-in mb-2.5 flex gap-2">
      <Svg svg={avatarSvg(a.role, status)} className="h-[45px] w-[55px] shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <span className="flex min-w-0 items-center gap-1">
            {status === 'running' ? (
              <Svg svg={dotsSvg(ORANGE)} className="h-[8px] w-[16px] shrink-0" />
            ) : (
              <b style={{ color: GREEN }}>✓</b>
            )}
            <b className="truncate">{a.description}</b>
          </span>
          <span className="shrink-0 text-[var(--cm-muted)]">{clock(Math.min(t, a.end) - a.start)}</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <span className="flex min-w-0 gap-1 truncate">
            <span style={{ color: a.effort[1] }}>{a.effort[0]}</span>
            <span>{a.model}</span>
            <span className="text-[var(--cm-muted)]">· {a.role}</span>
          </span>
          <span className="shrink-0 text-[var(--cm-muted)]">≈${lerp(0, a.cost, p).toFixed(2)}</span>
        </div>
        <div className="truncate text-[var(--cm-muted)]">
          {k(lerp(0, a.tokens, p))} read · {Math.round(lerp(0, a.steps, p))} steps · {k(ctx)} ctx
        </div>
        <div className="font-mono text-[10px] leading-[12px] tracking-[-1px]">
          <span style={{ color: a.effort[1] }}>{'━'.repeat(Math.max(1, fill))}</span>
          <span className="text-[var(--cm-line)]">{'━'.repeat(12 - Math.max(1, fill))}</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-md border border-[var(--cm-line)] px-1.5 py-1">
      <div className="text-[10.5px] text-[var(--cm-muted)]">{label}</div>
      <div className="truncate font-semibold">{value}</div>
      {sub ? <div className="truncate text-[10.5px] text-[var(--cm-muted)]">{sub}</div> : null}
    </div>
  );
}

const agentSteps: CliStep[] = [
  { kind: 'prompt', text: 'Find every docs page that still says Sonnet 5 and list them' },
  { kind: 'thinking', verb: 'Planning', ms: 900 },
  { kind: 'tool', name: 'Agent', arg: '2 agents', result: '' },
  { kind: 'thinking', verb: 'Waiting on agents', ms: 5200 },
  { kind: 'say', text: 'Found 10 pages that still say Sonnet 5.\nThe Explore agent found them and the Scout agent checked each match.' },
];

export function ModsAgentPanelMock() {
  return (
    <ClaudeDesktopCodeMock
      steps={agentSteps}
      title="Find stale model names"
      folder="claudecode-guide"
      loop
      tailMs={1500}
      height={300}
      status={() => <UsageLine used={28} elapsed={36} />}
      pane={({ t, starts }) => {
        const open = starts[2];
        if (t < open) return null;
        const done = endOf(agentSteps, starts, 4);
        const agents: Agent[] = [
          { key: 'ex', description: 'Find Sonnet 5 mentions', role: 'explore', model: 'Opus 5.5', effort: ['light', '#3BB8A0'], start: open + 200, end: open + 4300, tokens: 48_200, ctx: 31_000, steps: 14, cost: 0.21 },
          { key: 'sc', description: 'Check each match', role: 'scout', model: 'Haiku 5.5', effort: ['light', '#3BB8A0'], start: open + 700, end: open + 5400, tokens: 31_500, ctx: 22_400, steps: 9, cost: 0.01 },
        ];
        const live = agents.filter((a) => t >= a.start);
        const running = live.filter((a) => t < a.end);
        const finished = live.filter((a) => t >= a.end);
        const mainP = (t - starts[0]) / (done - starts[0]);
        const main: Agent = { key: 'main', description: 'Main agent', role: 'main', model: 'Opus 5.5', effort: ['medium', '#4A9FD9'], start: starts[0], end: done, tokens: 61_000, ctx: 58_000, steps: 6, cost: 0.31 };
        const cost = lerp(0, main.cost, mainP) + live.reduce((s, a) => s + lerp(0, a.cost, (t - a.start) / (a.end - a.start)), 0);
        const tokens = lerp(0, main.tokens, mainP) + live.reduce((s, a) => s + lerp(0, a.tokens, (t - a.start) / (a.end - a.start)), 0);
        return {
          title: 'Agents',
          body: (
            <>
              <div className="mb-2.5 flex gap-1.5">
                <Stat label="Cost" value={`≈$${cost.toFixed(2)}`} />
                <Stat label="Tokens" value={k(tokens)} />
                <Stat label="Time" value={clock(Math.min(t, done) - starts[0])} />
              </div>
              <div className="mb-1 text-[var(--cm-muted)]">This chat</div>
              <AgentCard a={main} t={t} />
              {running.length > 0 && <div className="mb-1 text-[var(--cm-muted)]">Running · {running.length}</div>}
              {running.map((a) => (
                <AgentCard key={a.key} a={a} t={t} />
              ))}
              {finished.length > 0 && <div className="mb-1 text-[var(--cm-muted)]">▾ Completed · {finished.length}</div>}
              {finished.map((a) => (
                <AgentCard key={a.key} a={a} t={t} />
              ))}
            </>
          ),
        };
      }}
    />
  );
}

/* ---------- Usage line ---------- */

const usageSteps: CliStep[] = [
  { kind: 'prompt', text: 'Cut the pricing page intro to one paragraph' },
  { kind: 'thinking', verb: 'Reading', ms: 900 },
  { kind: 'tool', name: 'Read', arg: 'content/pricing.mdx', result: 'Read 64 lines' },
  { kind: 'tool', name: 'Update', arg: 'content/pricing.mdx', result: 'Updated with 4 additions and 11 removals', lines: ['Pick a plan by how often you work with Claude,', 'not by how big your project is.'] },
  { kind: 'say', text: 'Cut the intro from three paragraphs to one.' },
];

export function ModsUsageMock() {
  return (
    <ClaudeDesktopCodeMock
      steps={usageSteps}
      title="Pricing page intro"
      folder="my-site"
      loop
      tailMs={2500}
      height={240}
      status={({ t, starts }) => {
        // The mod refreshes on turn.complete, so the numbers move once the reply lands.
        const after = t >= endOf(usageSteps, starts, usageSteps.length - 1);
        return <UsageLine used={after ? 29 : 28} elapsed={36} flash={after} />;
      }}
    />
  );
}

/* ---------- /active pane ---------- */

const THREADS = [
  { title: 'Pricing page rewrite, 10-02', question: 'Did the new table ship?' },
  { title: 'Blog hero images, 10-03', question: 'Two left to draw?' },
  { title: 'Weekly newsletter, 10-04', question: 'Send Monday or Tuesday?' },
  { title: 'Onboarding checklist, 09-30', question: 'Did step 3 confuse anyone?' },
];

const activeSteps: CliStep[] = [
  { kind: 'prompt', text: '/active' },
  { kind: 'say', text: 'Active This Week pane opened.' },
];

export function ModsActivePaneMock() {
  const pressAt = (c: DesktopClock) => c.starts[1] + 2200;
  return (
    <ClaudeDesktopCodeMock
      steps={activeSteps}
      title="Monday catch-up"
      folder="workspace"
      loop
      tailMs={4200}
      height={210}
      status={() => <UsageLine used={28} elapsed={36} />}
      fill={(c) => (c.t >= pressAt(c) + 250 ? `Picking up ${THREADS[0].title}. ${THREADS[0].question}` : undefined)}
      pane={(c) => {
        if (c.t < c.starts[1]) return null;
        const pressed = c.t >= pressAt(c) && c.t < pressAt(c) + 400;
        return {
          title: 'Active this week',
          body: (
            <>
              {THREADS.map((th, i) => (
                <div key={th.title} className="cc-in mb-2.5">
                  <div
                    className={`inline-block rounded-md border px-2 py-0.5 font-medium transition-transform duration-150 ${
                      i === 0 && pressed ? 'scale-95 border-[#D97757] text-[#D97757]' : 'border-[var(--cm-line)]'
                    }`}
                  >
                    {th.title}
                  </div>
                  <div className="mt-0.5 text-[var(--cm-muted)]">{th.question}</div>
                </div>
              ))}
              <div className="inline-block rounded-md border border-[var(--cm-line)] px-2 py-0.5">Reload</div>
            </>
          ),
        };
      }}
    />
  );
}
