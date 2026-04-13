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
      'Briefing from Jira, Slack, and Calendar. Includes political context and open questions.',
  },
  {
    name: 'people-sync',
    trigger: '"sync people from meeting"',
    description: 'Reads Granola transcript, updates stakeholder files with new context.',
  },
  {
    name: 'weekly-status',
    trigger: '"weekly status"',
    description: 'Accomplishment report pulled from connected systems. Formatted and ready to send.',
  },
  {
    name: 'deep-context',
    trigger: '"tell me everything about X"',
    description: 'Cross-channel research across Jira, Slack, Confluence, and memory.',
  },
  {
    name: 'market-sizing',
    trigger: '"size the market for X"',
    description: 'TAM, SAM, SOM with explicit data sources and assumptions.',
  },
  {
    name: 'ask-company',
    trigger: '"who owns X at my company"',
    description: 'Enterprise knowledge assistant. Searches org context and memory.',
  },
  {
    name: 'dogfood',
    trigger: '"dogfood this app"',
    description: 'Systematic QA walkthrough with structured bug reports.',
  },
  {
    name: 'lenny-podcast',
    trigger: '"what does Lenny say about X"',
    description: 'Searches 269+ PM podcast episodes for relevant insights.',
  },
  {
    name: 'prd',
    trigger: '"write a PRD for X"',
    description: 'Braindump first, then structure. No more blank-page paralysis.',
  },
  {
    name: 'prioritize',
    trigger: '"rank these features"',
    description: 'RICE, ICE, WSJF, MoSCoW, Kano. Pick your framework or let it recommend.',
  },
  {
    name: 'synthesize-interviews',
    trigger: '"synthesize these interviews"',
    description: 'Extracts themes and actionable recommendations from user research.',
  },
  {
    name: 'critique',
    trigger: '"critique this doc"',
    description: 'Pressure-tests documents for logic gaps, missing assumptions, and weak arguments.',
  },
];

const compactCategories: SkillCategory[] = [
  {
    title: 'Productivity (6 skills)',
    skills: [
      { name: 'session-init', trigger: '', description: 'Loads workspace context at session start' },
      { name: 'handoff-doc', trigger: '', description: 'Creates portable handoff documents' },
      { name: 'strategic-compact', trigger: '', description: 'Compresses strategy into actionable briefs' },
      { name: 'orchestrator', trigger: '', description: 'Wave-based parallel agent execution' },
      { name: 'manifest-reader', trigger: '', description: 'Reads and summarizes agent manifests' },
      { name: 'meta-observer', trigger: '', description: 'Background observation and logging' },
    ],
  },
  {
    title: 'Dev (4 skills)',
    skills: [
      { name: 'tdd-workflow', trigger: '', description: 'Test-driven development enforcement' },
      { name: 'verification-loop', trigger: '', description: 'Build, test, lint verification' },
      { name: 'search-first', trigger: '', description: 'Research before implementation' },
      { name: 'security-review', trigger: '', description: 'Security audit for code changes' },
    ],
  },
  {
    title: 'Content (3 skills)',
    skills: [
      { name: 'market-research', trigger: '', description: 'Competitive and market analysis' },
      { name: 'writing-style', trigger: '', description: 'Personal voice and tone enforcement' },
      { name: 'writing-substack', trigger: '', description: 'Substack-optimized content creation' },
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
            Full skill reference
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            25 skills, 5 agents, 4 slash commands. All open source, all editable.
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
