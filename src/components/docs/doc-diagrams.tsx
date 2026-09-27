import { Arrow, Branch, Fig, Node } from './diagram-kit';
import { PlayOnView } from './play-on-view';
import type { CSSProperties } from 'react';

// Docs diagrams, drawn with the primitives in diagram-kit.tsx. Each one
// replaces a raster illustration and keeps its labels and meaning.

/* ── Foundations: memory router ── */

export function MemoryRouterDiagram() {
  return (
    <Fig label="memory router" caption="One thin index loads every session. Only the shard the task needs comes in.">
      <Branch
        parent={<Node title="MEMORY.md" sub="router, one line per topic" lines={4} />}
        items={[
          { title: 'auth.md', sub: 'task matches, loading', tag: 'loaded', tone: 'acc' },
          { title: 'deploy.md', sub: 'on disk', tone: 'ghost' },
          { title: 'data.md', sub: 'on disk', tone: 'ghost' },
          { title: 'search.md', sub: 'on disk', tone: 'ghost' },
          { title: 'billing.md', sub: 'on disk', tone: 'ghost' },
        ]}
      />
      <div className="dv-aside">
        <span className="dv-aside-label">replaces</span>
        <Node title="CLAUDE.md, everything in one file" sub="800 lines, loaded every turn" tone="ghost" struck />
      </div>
    </Fig>
  );
}

export function EveryTurnTaxDiagram() {
  const turns = [1, 2, 3, 4];
  return (
    <Fig label="the every-turn tax" caption="The same file rides along on every turn, so what you pay for it keeps climbing.">
      <PlayOnView className="dv-turns dv-seq">
        {turns.map((t) => (
          <div key={t} className="dv-turn" style={{ '--i': t - 1, '--fill': t / 4 } as CSSProperties}>
            <span className="dv-mono-muted">turn {t}</span>
            <Node title="CLAUDE.md" sub="reloaded" lines={3} />
            <div className="dv-meter" aria-hidden>
              <span />
            </div>
            <span className="dv-mono-muted">
              paid <span className="dv-acc-text dv-paid">{t}x</span>
            </span>
          </div>
        ))}
      </PlayOnView>
    </Fig>
  );
}

export function MoreFilesTrapDiagram() {
  const rest = [
    '02-project-context.md',
    '03-architecture.md',
    '04-api-guidelines.md',
    '05-data-model.md',
    '06-testing.md',
    '07-deployment.md',
    '08-operations.md',
    '09-security.md',
    '10-style-guide.md',
  ];
  return (
    <Fig label="the more-files trap" caption="Split without a router, the agent reads the one file it was told about. The other nine never load.">
      <div className="dv-row">
        <Node title="agent" sub="loads what it is told" />
        <Arrow acc />
        <Node title="01-core-principles.md" tag="loaded" tone="acc" pulse lines={2} />
      </div>
      <div className="dv-grid dv-mt">
        {rest.map((name) => (
          <Node key={name} title={name} sub="not loaded" tone="ghost" />
        ))}
      </div>
    </Fig>
  );
}

/* ── Foundations: CLAUDE.md ── */

export function ClaudeMdRouterDiagram() {
  return (
    <Fig label="claude.md as a router" caption="CLAUDE.md dispatches the work to the edges and pulls back only the conclusion.">
      <Branch
        parent={<Node title="CLAUDE.md" sub="always loaded, points outward" lines={3} />}
        items={[
          { title: 'memory shards', sub: 'read on demand' },
          { title: 'skills', sub: 'invoked by name' },
          { title: 'specialist subagents', sub: 'own context, summarized return', tag: 'returns', tone: 'acc' },
          { title: 'rules', sub: 'loaded by path' },
        ]}
      />
    </Fig>
  );
}

/* ── Foundations: subagent context isolation ── */

export function IsolationWallsDiagram() {
  return (
    <Fig label="three isolation walls" caption="Each wall keeps something available without loading it into the window.">
      <div className="dv-cols">
        <section className="dv-col">
          <p className="dv-col-head">
            <span className="dv-acc-text">01</span> routed memory
          </p>
          <Node title="MEMORY.md" sub="index of shards" />
          <Arrow acc />
          <Node title="shard-03.md" sub="only this one loads" tag="loaded" tone="acc" pulse />
          <div className="dv-stack dv-mt-sm">
            <Node title="shard-01.md" sub="unloaded" tone="ghost" />
            <Node title="shard-02.md" sub="unloaded" tone="ghost" />
          </div>
        </section>
        <section className="dv-col">
          <p className="dv-col-head">
            <span className="dv-acc-text">02</span> isolated subagents
          </p>
          <Node title="main session" sub="orchestrator" />
          <Arrow label="delegate" />
          <div className="dv-stack">
            <Node title="subagent A" sub="own context window" tone="acc" />
            <Node title="subagent B" sub="own context window" tone="acc" />
          </div>
          <Arrow acc label="summary back" />
          <Node title="main session" sub="sees the summary, not the 40 files" />
        </section>
        <section className="dv-col">
          <p className="dv-col-head">
            <span className="dv-acc-text">03</span> scoped state
          </p>
          <Branch
            parent={<Node title="agent-state/" sub="one folder per persona" />}
            items={[
              { title: 'persona-a/', sub: 'state, memory, cache' },
              { title: 'persona-b/', sub: 'state, memory, cache' },
              { title: 'persona-c/', sub: 'state, memory, cache' },
            ]}
          />
        </section>
      </div>
    </Fig>
  );
}

/* ── Frameworks: the 5C Loop ── */

const FIVE_C: ReadonlyArray<{ id: string; name: string; sub: string }> = [
  { id: 'C1', name: 'Capture', sub: 'gather the raw material' },
  { id: 'C2', name: 'Context', sub: 'reader, purpose, format' },
  { id: 'C3', name: 'Create', sub: 'draft the full thing' },
  { id: 'C4', name: 'Check', sub: 'verify what only you can' },
  { id: 'C5', name: 'Compound', sub: 'save what worked' },
];

export function FiveCLoopDiagram() {
  return (
    <Fig label="the 5c loop" caption="Each step feeds the next. Compound feeds the next Capture, which is what makes it a loop.">
      <div className="dv-loop">
        {FIVE_C.map((step, i) => (
          <div key={step.id} className="dv-loop-step">
            <Node
              title={step.name}
              tag={step.id}
              sub={step.sub}
              tone={step.id === 'C5' ? 'acc' : 'base'}
              pulse={step.id === 'C5'}
            />
            {i < FIVE_C.length - 1 ? <Arrow /> : null}
          </div>
        ))}
        <span className="dv-loop-return" aria-hidden>
          <span>next time starts here</span>
        </span>
      </div>
    </Fig>
  );
}

export function CheckPanelDiagram() {
  const rows: ReadonlyArray<{ check: string; before: string; after: string }> = [
    { check: 'facts', before: 'timeline line is wrong', after: 'corrected' },
    { check: 'tone', before: 'one word too formal', after: 'softened' },
    { check: 'sensitive', before: 'read for what lands wrong', after: 'clear' },
  ];
  return (
    <Fig label="c4: check" caption="Small corrections, not a rewrite, when Capture and Context were done well.">
      <div className="dv-row dv-row--top">
        <div className="dv-panel">
          <p className="dv-col-head">before check</p>
          <ul className="dv-checks">
            {rows.map((r) => (
              <li key={r.check}>
                <span className="dv-tag">{r.check}</span>
                <span className="dv-mono-muted">{r.before}</span>
              </li>
            ))}
          </ul>
        </div>
        <Arrow acc label="5 min" />
        <div className="dv-panel dv-panel--acc">
          <p className="dv-col-head dv-acc-text">after check</p>
          <ul className="dv-checks">
            {rows.map((r) => (
              <li key={r.check}>
                <span className="dv-tag dv-tag--acc">{r.check}</span>
                <span className="dv-mono">{r.after}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fig>
  );
}

/* ── Frameworks: persona spokes ── */

type PersonaKey =
  | 'pms'
  | 'marketers'
  | 'teachers'
  | 'hr'
  | 'operations'
  | 'designers'
  | 'microsoft'
  | 'chrome';

interface PersonaFlow {
  label: string;
  caption: string;
  inputs: string[];
  core: { title: string; sub: string; loop?: boolean };
  outputs: string[];
}

const LOOP_CORE = { title: '5C loop', sub: 'capture, context, create, check, compound', loop: true };

const PERSONA_FLOWS: Record<PersonaKey, PersonaFlow> = {
  pms: {
    label: '5c loop for pms',
    caption: 'Discovery and roadmap inputs go through the loop and come out as the documents a PM owns.',
    inputs: ['discovery notes', 'roadmap', 'stakeholder threads'],
    core: LOOP_CORE,
    outputs: ['PRDs', 'roadmap updates', 'discovery readouts', 'stakeholder briefs', 'sprint reviews'],
  },
  marketers: {
    label: '5c loop for marketers',
    caption: 'Research and performance data go through the loop and come out as briefs, reports and campaign content.',
    inputs: ['market research', 'performance data', 'brand voice'],
    core: LOOP_CORE,
    outputs: ['campaign briefs', 'content calendars', 'performance reports', 'creative briefs'],
  },
  teachers: {
    label: '5c loop for teachers',
    caption: 'Curriculum and class context go through the loop and come out as classroom documents.',
    inputs: ['curriculum standards', 'class context', 'student work'],
    core: LOOP_CORE,
    outputs: ['lesson plans', 'rubrics', 'student feedback', 'parent emails'],
  },
  hr: {
    label: '5c loop for hr',
    caption: 'Document HR work once, then compound it across every hire and review cycle.',
    inputs: ['role brief', 'people data', 'additional context'],
    core: LOOP_CORE,
    outputs: [
      'job descriptions',
      'interview questions',
      '30-60-90 plans',
      'performance reviews',
      'policies and SOPs',
      'all-staff communications',
    ],
  },
  operations: {
    label: '5c loop for operations',
    caption: 'Process data and exceptions go through the loop and come out as the documents ops runs on.',
    inputs: ['process data', 'exception logs', 'vendor threads'],
    core: LOOP_CORE,
    outputs: ['exception reports', 'SOPs', 'vendor emails', 'dashboards'],
  },
  designers: {
    label: 'claude code for designers',
    caption: 'Your canvas and tokens go in, Claude Code builds the components and the mockup comes out.',
    inputs: ['component canvas', 'spacing tokens, 8px grid', 'alignment guides'],
    core: { title: 'Claude Code', sub: 'builds components from your specs' },
    outputs: ['components/card/', 'UI mockup', 'responsive spacing'],
  },
  microsoft: {
    label: 'claude code with microsoft 365',
    caption: 'Claude Code is the translation layer between the apps you already use and the files you need.',
    inputs: ['Word', 'Excel', 'Teams', 'Outlook'],
    core: { title: 'Claude Code', sub: 'translation layer, transforms content' },
    outputs: ['report', 'summary', 'data sheet', 'JSON file'],
  },
  chrome: {
    label: 'claude in the browser',
    caption: 'Open tabs and your annotations go in. A research document comes out.',
    inputs: ['open tabs', 'selections and annotations', 'page notes'],
    core: { title: 'Claude', sub: 'parse, extract, summarize, organize' },
    outputs: ['highlights', 'summaries', 'action items', 'notes'],
  },
};

export function PersonaFlowDiagram({ persona }: { persona: PersonaKey }) {
  const flow = PERSONA_FLOWS[persona];
  if (!flow) return null;
  return (
    <Fig label={flow.label} caption={flow.caption}>
      <div className="dv-flow3">
        <div className="dv-stack">
          <p className="dv-col-head">inputs</p>
          {flow.inputs.map((x) => (
            <Node key={x} title={x} />
          ))}
        </div>
        <Arrow acc />
        <Node title={flow.core.title} sub={flow.core.sub} tone="acc" pulse className="dv-core">
          {flow.core.loop ? (
            <div className="dv-chips" aria-hidden>
              {FIVE_C.map((c) => (
                <span key={c.id}>{c.id}</span>
              ))}
            </div>
          ) : null}
        </Node>
        <Arrow acc />
        <div className="dv-stack">
          <p className="dv-col-head">outputs</p>
          {flow.outputs.map((x) => (
            <Node key={x} title={x} />
          ))}
        </div>
      </div>
    </Fig>
  );
}
