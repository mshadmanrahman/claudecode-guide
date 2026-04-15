'use client';

import { useInView } from '@/hooks/use-in-view';

interface Skill {
  name: string;
  trigger: string;
  description: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const pmCore: Skill[] = [
  {
    name: 'meeting-prep',
    trigger: '"prep for my meeting with X"',
    description:
      'Pulls a brief from Jira, Slack, and Calendar. Covers political context, open questions, and what you owe each other.',
  },
  {
    name: 'people-sync',
    trigger: '"sync people from meeting"',
    description: 'Reads a Granola transcript, then updates your stakeholder files. No manual note-taking.',
  },
  {
    name: 'weekly-status',
    trigger: '"weekly status"',
    description: 'Hits your connected systems, writes the update, formats it to send. You just review.',
  },
  {
    name: 'deep-context',
    trigger: '"tell me everything about X"',
    description: 'Searches Jira, Slack, Confluence, and memory all at once. Good for onboarding to a problem fast.',
  },
  {
    name: 'market-sizing',
    trigger: '"size the market for X"',
    description: 'TAM, SAM, SOM with all assumptions written out. Beats the spreadsheet you half-trust.',
  },
  {
    name: 'ask-company',
    trigger: '"who owns X at my company"',
    description: 'Searches org context and memory to answer ownership questions. Surprisingly useful.',
  },
  {
    name: 'dogfood',
    trigger: '"dogfood this app"',
    description: 'Walks through your app systematically and produces structured bug reports.',
  },
  {
    name: 'lenny-podcast',
    trigger: '"what does Lenny say about X"',
    description: 'Searches 269+ PM podcast episodes. Good for a second opinion before a decision.',
  },
  {
    name: 'prd',
    trigger: '"write a PRD for X"',
    description: 'Braindump first, then structure. The blank-page problem is the whole problem this solves.',
  },
  {
    name: 'prioritize',
    trigger: '"rank these features"',
    description: 'RICE, ICE, WSJF, MoSCoW, Kano. Pick one or let it recommend the right fit.',
  },
  {
    name: 'synthesize-interviews',
    trigger: '"synthesize these interviews"',
    description: 'Pulls themes and actual recommendations from user research notes.',
  },
  {
    name: 'critique',
    trigger: '"critique this doc"',
    description: 'Pushes back on logic gaps, missing assumptions, and weak arguments. Honest, not polite.',
  },
];

const compactCategories: SkillCategory[] = [
  {
    title: 'Productivity (6 skills)',
    skills: [
      { name: 'session-init', trigger: '', description: 'Loads your workspace context at the start of every session' },
      { name: 'handoff-doc', trigger: '', description: 'Writes a portable handoff doc so nothing gets lost between sessions' },
      { name: 'strategic-compact', trigger: '', description: 'Compresses a strategy doc down to what actually matters' },
      { name: 'orchestrator', trigger: '', description: 'Runs multiple agents in parallel waves' },
      { name: 'manifest-reader', trigger: '', description: 'Reads and summarises agent configuration files' },
      { name: 'meta-observer', trigger: '', description: 'Watches sessions in the background and logs patterns' },
    ],
  },
  {
    title: 'Dev (4 skills)',
    skills: [
      { name: 'tdd-workflow', trigger: '', description: 'Enforces test-first development' },
      { name: 'verification-loop', trigger: '', description: 'Runs build, test, and lint in sequence' },
      { name: 'search-first', trigger: '', description: 'Checks existing solutions before writing new code' },
      { name: 'security-review', trigger: '', description: 'Audits code changes for security issues' },
    ],
  },
  {
    title: 'Content (3 skills)',
    skills: [
      { name: 'market-research', trigger: '', description: 'Competitive and market analysis' },
      { name: 'writing-style', trigger: '', description: 'Enforces your personal voice and tone' },
      { name: 'writing-substack', trigger: '', description: 'Formats and structures content for Substack' },
    ],
  },
];

const slashCommands = ['/plan', '/code-review', '/verify', '/tdd'];
const agents = ['planner', 'code-reviewer', 'build-error-resolver', 'tdd-guide', 'file-analyzer'];

export function PmPilotFullSkillRef() {
  const [ref, inView] = useInView(0.1);
  const [compactRef, compactInView] = useInView(0.1);

  return (
    <section className="bg-fd-muted py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">09</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Everything that&apos;s in the box
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            25 skills, 5 agents, 4 slash commands. All open source. All just markdown files you can read and edit.
          </p>
        </div>

        {/* PM Core - detailed */}
        <div className="mb-16">
          <p
            className={`mb-6 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground transition-all duration-500 ${
              inView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
            style={{ animationDelay: '100ms' }}
          >
            PM Core (12 skills)
          </p>
          <div className="space-y-0">
            {pmCore.map((skill, i) => (
              <div
                key={skill.name}
                className={`flex flex-col gap-1 border-b border-fd-border py-5 sm:flex-row sm:gap-6 sm:items-baseline transition-all duration-500 ${
                  inView ? 'animate-slide-up-fade' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 50 + 150}ms` }}
              >
                <span className="font-mono text-sm font-semibold text-green-600 dark:text-green-400 shrink-0 sm:w-48">
                  /{skill.name}
                </span>
                <div className="flex flex-col gap-1">
                  {skill.trigger && (
                    <span className="font-mono text-xs text-fd-muted-foreground/60">
                      {skill.trigger}
                    </span>
                  )}
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact categories */}
        <div ref={compactRef} className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {compactCategories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-500 ${
                compactInView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${ci * 100}ms` }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
                {cat.title}
              </p>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-0.5">
                    <span className="font-mono text-xs font-semibold text-green-600 dark:text-green-400">
                      /{skill.name}
                    </span>
                    <p className="text-xs text-fd-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Slash commands + Agents */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div
            className={`rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-500 ${
              compactInView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
              Slash commands
            </p>
            <div className="flex flex-wrap gap-2">
              {slashCommands.map((cmd) => (
                <span
                  key={cmd}
                  className="rounded-md border border-fd-border bg-fd-background px-3 py-1.5 font-mono text-xs text-fd-foreground"
                >
                  {cmd}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-500 ${
              compactInView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
              Agents
            </p>
            <div className="flex flex-wrap gap-2">
              {agents.map((agent) => (
                <span
                  key={agent}
                  className="rounded-md border border-fd-border bg-fd-background px-3 py-1.5 font-mono text-xs text-fd-foreground"
                >
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
