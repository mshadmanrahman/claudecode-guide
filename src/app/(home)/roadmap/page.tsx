import Link from 'next/link';
import { ArrowRight, Check, Lock, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Roadmap',
  description: 'Your visual guide through the Claude Code journey. See where you are, what comes next, and how the pieces fit together.',
};

interface StageProps {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  items: { title: string; href: string; description: string; badge?: string }[];
}

function Stage({ number, title, subtitle, color, items }: StageProps) {
  return (
    <div className="relative">
      {/* Stage header */}
      <div className="mb-6 flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fd-border ${color} font-mono text-lg font-bold`}>
          {number}
        </div>
        <div>
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            {title}
          </h2>
          <p className="text-sm text-fd-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Items */}
      <div className="ml-6 border-l-2 border-fd-border pl-10 pb-8">
        <div className="grid gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-4 rounded-lg border border-fd-border bg-fd-card p-4 transition-all hover:border-fd-muted-foreground/30 hover:bg-fd-accent"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fd-border text-fd-muted-foreground group-hover:border-fd-foreground group-hover:text-fd-foreground transition-colors">
                <Check className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-fd-foreground group-hover:underline">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-fd-muted-foreground">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <main className="flex min-h-screen flex-col bg-fd-background">
      {/* Header */}
      <nav className="border-b border-fd-border px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-mono text-sm font-bold tracking-tight text-fd-muted-foreground hover:text-fd-foreground transition-colors">
            claudecodeguide<span className="text-fd-foreground">.dev</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">Home</Link>
            <Link href="/docs/foundations/glossary" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">Glossary</Link>
            <Link href="/tutorials" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">Tutorials</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Your learning journey
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          Follow the path from zero to power user. Each step builds on the last.
          <br />
          Go at your own pace. Skip what you know.
        </p>
      </section>

      {/* Roadmap */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        {/* Stage 1 */}
        <Stage
          number="01"
          title="Getting Started"
          subtitle="Install, configure, write your first prompt"
          color="bg-green-500/10 text-green-600 dark:text-green-400"
          items={[
            {
              title: 'The CLAUDE.md Guide',
              href: '/docs/foundations/claude-md',
              description: 'The most important file in your project. Set up your rules, preferences, and workflow.',
              badge: 'start here',
            },
            {
              title: 'Glossary',
              href: '/docs/foundations/glossary',
              description: 'Every term explained in plain English. Bookmark this.',
            },
            {
              title: 'Cost Optimization',
              href: '/docs/foundations/cost-optimization',
              description: 'Pro vs Max vs API. Pick the right plan and don\'t overspend.',
            },
          ]}
        />

        {/* Connector */}
        <div className="ml-6 flex justify-center py-2">
          <ChevronDown className="h-5 w-5 text-fd-muted-foreground" />
        </div>

        {/* Stage 2 */}
        <Stage
          number="02"
          title="Build the Foundation"
          subtitle="Memory, sessions, and the habits that compound"
          color="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          items={[
            {
              title: 'Session Lifecycle',
              href: '/docs/foundations/session-lifecycle',
              description: 'How to start warm, work efficiently, and end with a trail.',
            },
            {
              title: 'Memory System',
              href: '/docs/foundations/memory-system',
              description: 'Make Claude Code remember you across sessions. The compound effect.',
            },
            {
              title: 'Daily Practice',
              href: '/docs/workflows/daily-practice',
              description: 'Morning to end-of-day habits. The system that makes everything click.',
            },
          ]}
        />

        <div className="ml-6 flex justify-center py-2">
          <ChevronDown className="h-5 w-5 text-fd-muted-foreground" />
        </div>

        {/* Stage 3 */}
        <Stage
          number="03"
          title="Learn the Patterns"
          subtitle="Skills, hooks, agents, and connecting your tools"
          color="bg-purple-500/10 text-purple-600 dark:text-purple-400"
          items={[
            {
              title: 'Building Skills',
              href: '/docs/patterns/skills',
              description: 'Turn multi-step tasks into single commands. Your personal automation.',
            },
            {
              title: 'Hooks',
              href: '/docs/patterns/hooks',
              description: 'Automate quality checks, formatting, and context injection.',
            },
            {
              title: 'Sub-Agents',
              href: '/docs/patterns/agents',
              description: 'Delegate focused tasks to specialized agents. Keep your main context clean.',
            },
            {
              title: 'MCP Servers',
              href: '/docs/patterns/mcp-servers',
              description: 'Connect Claude Code to GitHub, Slack, Jira, databases, and more.',
            },
          ]}
        />

        <div className="ml-6 flex justify-center py-2">
          <ChevronDown className="h-5 w-5 text-fd-muted-foreground" />
        </div>

        {/* Stage 4 */}
        <Stage
          number="04"
          title="Go Deeper"
          subtitle="Advanced patterns, team workflows, and automation"
          color="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          items={[
            {
              title: 'Autonomous Loops',
              href: '/docs/patterns/autonomous-loops',
              description: 'Set Claude Code to work while you sleep. Task templates and safety controls.',
            },
            {
              title: 'Team Adoption',
              href: '/docs/workflows/team-adoption',
              description: 'Roll out to your team. Shared configs, onboarding, getting buy-in.',
            },
            {
              title: 'Claude Code for PMs',
              href: '/docs/workflows/pm-workflow',
              description: 'You don\'t need to write code. Meeting prep, status reports, decision tracking.',
            },
            {
              title: 'Debugging',
              href: '/docs/workflows/debugging',
              description: 'Systematic debugging. Stop guessing, start gathering evidence.',
            },
          ]}
        />

        <div className="ml-6 flex justify-center py-2">
          <ChevronDown className="h-5 w-5 text-fd-muted-foreground" />
        </div>

        {/* Stage 5 */}
        <Stage
          number="05"
          title="Grab a Template & Ship"
          subtitle="Copy-paste configs and honest comparisons"
          color="bg-rose-500/10 text-rose-600 dark:text-rose-400"
          items={[
            {
              title: 'Template Gallery',
              href: '/docs/templates',
              description: 'Ready-made CLAUDE.md for Next.js, monorepos, Python, and PM workspaces.',
            },
            {
              title: 'Claude Code vs Cursor',
              href: '/docs/comparisons/vs-cursor',
              description: 'Terminal-native vs IDE-integrated. Honest comparison.',
            },
            {
              title: 'Claude Code vs Copilot',
              href: '/docs/comparisons/vs-copilot',
              description: 'Autocomplete vs agentic. Different tools for different jobs.',
            },
            {
              title: 'Pro vs Max vs API',
              href: '/docs/comparisons/pro-vs-max',
              description: 'Which plan for which workflow. Real numbers.',
            },
          ]}
        />
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-10 text-center">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Ready to begin?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            Start with Stage 01. Everything else follows naturally.
          </p>
          <Link
            href="/docs/foundations/claude-md"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
          >
            Start from zero
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-fd-border px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-sm text-fd-muted-foreground">
            claudecodeguide<span className="font-bold text-fd-foreground">.dev</span>
          </p>
          <p className="text-sm text-fd-muted-foreground">
            Built by{' '}
            <a href="https://github.com/mshadmanrahman" target="_blank" rel="noopener noreferrer" className="font-medium text-fd-foreground hover:underline">
              Shadman Rahman
            </a>
            {' '}with lots of ♥️, ☕️ and Claude Code, naturally! 😉
          </p>
        </div>
      </footer>
    </main>
  );
}
