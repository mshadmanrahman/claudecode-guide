'use client';

import Link from 'next/link';
import {
  BookOpen,
  Shield,
  ShieldCheck,
  Wrench,
  Workflow,
  Bot,
  Plug,
  ArrowRight,
  ChefHat,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface Primitive {
  number: number;
  icon: React.ElementType;
  name: string;
  oneLine: string;
  whatItIs: string;
  whenItFires: string;
  strength: string;
  example: string;
}

const primitives: Primitive[] = [
  {
    number: 1,
    icon: BookOpen,
    name: 'Rule',
    oneLine: 'A statement of intent Claude tries to follow.',
    whatItIs:
      'A statement in CLAUDE.md, a memory file, or a doc Claude reads. Claude tries to comply.',
    whenItFires: 'Every time Claude generates text or makes a decision.',
    strength: 'Soft. Claude can drift, especially under context pressure.',
    example:
      '"Never use em dashes in any output." Claude reads it, aims to comply, sometimes slips.',
  },
  {
    number: 2,
    icon: Shield,
    name: 'Hook',
    oneLine: 'A shell script that fires automatically and cannot be argued with.',
    whatItIs:
      'A script registered in .claude/settings.json that fires on tool call events (PreToolUse, PostToolUse, SessionStart, Stop). Returns exit code 2 to block.',
    whenItFires:
      'Automatically, on the matching tool call. The harness runs it. Claude cannot talk past it.',
    strength: 'Absolute. If the hook blocks, the action does not happen.',
    example:
      'A pre-commit hook that blocks git clone outside designated folders. Claude tries to clone into the wrong place; the hook says no; the clone never executes.',
  },
  {
    number: 3,
    icon: ShieldCheck,
    name: 'Guardrail',
    oneLine: 'A rule plus a hook working together.',
    whatItIs:
      'Not a separate primitive. A useful word for the combination of a rule (states the policy) and a hook (enforces it).',
    whenItFires:
      'Both. The rule on every reasoning step, the hook on every matching tool call.',
    strength: 'Combined. Rule guides intent, hook catches drift.',
    example:
      '"Don\'t write narrative content into the rules folder" lives in your project doc (rule). A Write/Edit hook blocks it at the file path level (hook). Together: a guardrail.',
  },
  {
    number: 4,
    icon: Wrench,
    name: 'Skill',
    oneLine: 'A self-contained, named procedure invoked on demand.',
    whatItIs:
      'A self-contained capability with a SKILL.md file. Lives in ~/.claude/skills/, .claude/skills/, or as part of a plugin.',
    whenItFires:
      'Three ways: you type /skill-name, you describe a task whose words match the skill\'s description, or Claude infers it applies.',
    strength: 'Mid. Triggered when relevant, skipped when not.',
    example:
      'A meeting-prep skill that pulls calendar events, attendee history, and recent emails into a brief. You say "prep me for my 3pm" and the skill fires.',
  },
  {
    number: 5,
    icon: Workflow,
    name: 'Workflow',
    oneLine: 'A multi-step orchestration that chains skills and agents.',
    whatItIs:
      'A procedure that sequences multiple skills, agents, and tool calls toward a single outcome. Often itself implemented as a skill.',
    whenItFires:
      'Same as a skill (you invoke or Claude infers), but the body dispatches to other primitives.',
    strength: 'Same as skill, with leverage from composition.',
    example:
      'A discovery-process workflow that orchestrates problem framing, then customer interviews, then synthesis, then experiment design. You invoke once; it sequences the rest.',
  },
  {
    number: 6,
    icon: Bot,
    name: 'Agent (subagent)',
    oneLine: 'A delegated worker with its own context window.',
    whatItIs:
      'A separate Claude instance with its own isolated context window, spawned by the main Claude. Returns a final summary; the main Claude never sees intermediate work.',
    whenItFires:
      'The main Claude calls the Agent tool with a prompt and a subagent_type. You ask for something heavy and Claude decides to delegate.',
    strength:
      'Token-efficient. Without subagents, heavy tasks blow your context. With them, your main thread stays light.',
    example:
      'Reviewing 30 files for cleanup candidates. Spawn an Explore subagent, get back a 200-word punch list. The 30 files never enter your main context.',
  },
  {
    number: 7,
    icon: Plug,
    name: 'MCP server',
    oneLine: 'An external service exposed to Claude as tools.',
    whatItIs:
      'A separate process that exposes external tools and data to Claude via the Model Context Protocol. Tools come prefixed with mcp__<server>__<tool>.',
    whenItFires:
      'Claude calls an MCP-prefixed tool. The MCP server translates the call into the external service\'s API and returns the result.',
    strength:
      'Adds entire external systems as tools without modifying Claude itself.',
    example:
      'mcp__plugin_linear_linear__list_issues lets Claude pull Linear tickets directly. Claude doesn\'t speak Linear\'s API; the MCP server does.',
  },
];

const decisionRule = [
  { question: '"I want Claude to remember a preference"', answer: 'Rule' },
  { question: '"I want Claude to literally not do X"', answer: 'Hook' },
  { question: '"I want both: state the policy and enforce it"', answer: 'Guardrail' },
  { question: '"I want a named, repeatable procedure"', answer: 'Skill' },
  { question: '"I want to chain multiple skills or agents"', answer: 'Workflow' },
  { question: '"I want heavy work to not blow context"', answer: 'Agent (subagent)' },
  { question: '"I want Claude to talk to Jira / Slack / Linear / etc."', answer: 'MCP server' },
];

const triggers = [
  { primitive: 'Rule', trigger: 'Claude (every reasoning step)', optOut: 'Yes (drifts under pressure)' },
  { primitive: 'Hook', trigger: 'Harness (every matching tool call)', optOut: 'No' },
  { primitive: 'Guardrail', trigger: 'Both', optOut: 'No (the hook half)' },
  { primitive: 'Skill', trigger: 'You or Claude (by name match)', optOut: 'Yes' },
  { primitive: 'Workflow', trigger: 'You or Claude', optOut: 'Yes' },
  { primitive: 'Agent', trigger: 'Claude (delegates)', optOut: 'Yes' },
  { primitive: 'MCP server', trigger: 'Claude (calls the tool)', optOut: 'Yes' },
];

const kitchenAnalogy = [
  { primitive: 'Rules', analogy: 'Recipes pinned to the fridge.' },
  {
    primitive: 'Hooks',
    analogy:
      "The smoke detector. Doesn't matter how much you wave a towel; if the alarm goes, dinner stops.",
  },
  {
    primitive: 'Guardrails',
    analogy: 'Recipes pinned next to a smoke detector calibrated for that exact dish.',
  },
  {
    primitive: 'Skills',
    analogy: "Kitchen tools you grab when needed: a whisk, a chef's knife, a thermometer.",
  },
  {
    primitive: 'Workflows',
    analogy: 'The cooking sequence: prep, sear, deglaze, plate. Several tools used in order.',
  },
  {
    primitive: 'Agents',
    analogy: 'Sous chefs you can hand a sub-task to so you can keep working on the main dish.',
  },
  {
    primitive: 'MCP servers',
    analogy:
      "The supply lines: the butcher, the produce supplier, the wine importer. Claude doesn't grow tomatoes; the MCP delivers them.",
  },
];

const mistakes = [
  {
    title: 'Using a rule when you need a hook',
    body: '"I told Claude not to push to main without my approval." That\'s a rule. Claude will follow it 95% of the time. The 5% it doesn\'t, you lose work. If the cost of failure is high, write a hook.',
  },
  {
    title: 'Using a skill when you need a workflow',
    body: 'A skill that does five different things is a workflow pretending to be a skill. Split it. One skill per atomic capability. Compose them in a workflow.',
  },
  {
    title: 'Doing in the main thread what an agent should do',
    body: 'If your task touches more than three files, or requires research, or is going to read 20 different things to find one answer, spawn an agent. The token economy of a long Claude Code session is decided more by subagent discipline than by anything else.',
  },
];

export default function PrimitivesPage() {
  return (
    <div className="min-h-screen bg-fd-background">
      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-20 pb-12 sm:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground">
          <Sparkles className="h-3 w-3" />
          Mental model
        </div>
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          The seven primitives of Claude Code
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fd-muted-foreground">
          Skill, Hook, Rule, Guardrail, Workflow, Agent, MCP. The docs use these terms inconsistently. Plugins ship them in bundles. Nobody quite tells you when to reach for which one. Here is the cleanest way to think about it.
        </p>
      </section>

      {/* ── Two axes ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="rounded-xl border border-fd-border bg-fd-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            The two axes that organize everything
          </h2>
          <p className="mt-4 text-fd-muted-foreground">
            Forget the names for a second. There are only two questions that matter.
          </p>
          <ol className="mt-4 space-y-3 text-fd-foreground">
            <li>
              <span className="font-medium">1. Who pulls the trigger?</span>{' '}
              <span className="text-fd-muted-foreground">
                You by typing or implying. Claude by reasoning. Or the harness automatically with no opt-out.
              </span>
            </li>
            <li>
              <span className="font-medium">2. How strong is the enforcement?</span>{' '}
              <span className="text-fd-muted-foreground">
                Advisory (Claude tries) or absolute (the harness blocks).
              </span>
            </li>
          </ol>
          <p className="mt-4 text-fd-muted-foreground">
            That is it. Every primitive falls somewhere on those two axes. Once you see them, the names stop blurring together.
          </p>
        </div>
      </section>

      {/* ── Seven primitives ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="font-display text-3xl font-normal tracking-tight text-fd-foreground">
          The seven primitives
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {primitives.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.number}
                className="rounded-xl border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-border/80"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fd-accent">
                    <Icon className="h-5 w-5 text-fd-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-fd-muted-foreground">
                        {String(p.number).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
                        {p.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm font-medium text-fd-foreground">{p.oneLine}</p>
                  </div>
                </div>
                <dl className="mt-5 space-y-3 border-t border-fd-border pt-5 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fd-muted-foreground">What it is</dt>
                    <dd className="mt-1 text-fd-foreground">{p.whatItIs}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fd-muted-foreground">When it fires</dt>
                    <dd className="mt-1 text-fd-foreground">{p.whenItFires}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fd-muted-foreground">Strength</dt>
                    <dd className="mt-1 text-fd-foreground">{p.strength}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-fd-muted-foreground">Example</dt>
                    <dd className="mt-1 text-fd-muted-foreground">{p.example}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Decision rule ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="rounded-xl border border-fd-border bg-fd-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            The decision rule (memorize this)
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fd-border text-left text-xs uppercase tracking-wide text-fd-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Question</th>
                  <th className="pb-3 font-medium">Reach for</th>
                </tr>
              </thead>
              <tbody>
                {decisionRule.map((row) => (
                  <tr key={row.question} className="border-b border-fd-border/60 last:border-0">
                    <td className="py-3 pr-4 text-fd-foreground">{row.question}</td>
                    <td className="py-3 font-medium text-fd-foreground">{row.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Triggers cheat sheet ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="rounded-xl border border-fd-border bg-fd-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            The triggers cheat sheet
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fd-border text-left text-xs uppercase tracking-wide text-fd-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Primitive</th>
                  <th className="pb-3 pr-4 font-medium">Who pulls the trigger?</th>
                  <th className="pb-3 font-medium">Can Claude opt out?</th>
                </tr>
              </thead>
              <tbody>
                {triggers.map((row) => (
                  <tr key={row.primitive} className="border-b border-fd-border/60 last:border-0">
                    <td className="py-3 pr-4 font-medium text-fd-foreground">{row.primitive}</td>
                    <td className="py-3 pr-4 text-fd-muted-foreground">{row.trigger}</td>
                    <td className="py-3 text-fd-muted-foreground">{row.optOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Kitchen analogy ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="rounded-xl border border-fd-border bg-fd-card p-6 sm:p-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fd-accent">
              <ChefHat className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
              The kitchen analogy
            </h2>
          </div>
          <p className="text-fd-muted-foreground">
            Stop thinking about Claude Code as software for a second. Think of your workspace as a kitchen.
          </p>
          <ul className="mt-6 space-y-3">
            {kitchenAnalogy.map((row) => (
              <li
                key={row.primitive}
                className="flex flex-col gap-1 rounded-lg border border-fd-border/60 bg-fd-background p-4 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="w-32 shrink-0 font-medium text-fd-foreground">{row.primitive}</span>
                <span className="text-fd-muted-foreground">{row.analogy}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-fd-muted-foreground">
            The kitchen runs because all seven do their job, and you (the owner) don't have to do any of them yourself.
          </p>
        </div>
      </section>

      {/* ── Common mistakes ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Where most people get this wrong
          </h2>
        </div>
        <div className="space-y-4">
          {mistakes.map((m, i) => (
            <article key={m.title} className="rounded-xl border border-fd-border bg-fd-card p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-fd-muted-foreground">
                  Mistake {i + 1}
                </span>
                <h3 className="font-display text-lg font-normal tracking-tight text-fd-foreground">
                  {m.title}
                </h3>
              </div>
              <p className="mt-3 text-fd-muted-foreground">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Takeaway ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="rounded-xl border border-fd-border bg-fd-card p-6 sm:p-10 text-center">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            The takeaway
          </h2>
          <p className="mt-4 text-fd-muted-foreground">
            You don't need to memorize every flag and every config option. You need to know which of seven primitives fits the job, and the kitchen analogy gives you a fast mental model for that.
          </p>
          <p className="mt-3 text-fd-muted-foreground">
            When in doubt, ask the one question: who do I want pulling the trigger, and how strongly do I want it enforced? The right primitive falls out.
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Ready to try it?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            See what each primitive looks like in production, or browse the full capability catalog.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Browse capabilities
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              Start the journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
