'use client';

import Link from 'next/link';
import {
  FileText,
  Terminal,
  Globe,
  Eye,
  Brain,
  Zap,
  Search,
  FolderOpen,
  Code2,
  TestTube,
  GitBranch,
  Puzzle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Server,
  MessageSquare,
  LayoutDashboard,
  Database,
  Palette,
  BookOpen,
  Calendar,
  Mail,
  Cloud,
  Shield,
  Bot,
  Workflow,
  BarChart2,
  Bug,
  Layers,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface Capability {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
}

interface Integration {
  icon: React.ElementType;
  name: string;
  description: string;
  example: string;
  href: string;
  badge?: string;
  category: 'dev' | 'comms' | 'pm' | 'data' | 'design' | 'infra';
}

type CategoryFilter = 'all' | Integration['category'];

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

const builtInCapabilities: Capability[] = [
  {
    icon: FileText,
    title: 'Read & Write Files',
    description: 'Opens, edits, and creates files anywhere in your project. Understands code, configs, docs, and data files.',
  },
  {
    icon: Terminal,
    title: 'Run Commands',
    description: 'Executes shell commands, runs scripts, installs packages, and manages your dev environment.',
  },
  {
    icon: Globe,
    title: 'Web Search',
    description: 'Searches the internet for documentation, Stack Overflow answers, package info, and current events.',
  },
  {
    icon: Eye,
    title: 'Computer Use',
    description: 'Sees your screen, clicks buttons, fills forms, and navigates apps. No setup needed.',
    badge: 'new',
  },
  {
    icon: Brain,
    title: 'Extended Thinking',
    description: 'Reasons step-by-step through complex problems before answering. Like having it "think out loud."',
  },
  {
    icon: Brain,
    title: 'Memory System',
    description: 'Remembers your preferences, projects, and past decisions across sessions. Gets better over time.',
  },
  {
    icon: Code2,
    title: 'Code Intelligence',
    description: 'Understands code structure, traces call stacks, follows imports, and navigates large codebases.',
  },
  {
    icon: TestTube,
    title: 'Run Tests',
    description: 'Executes test suites, reads failures, and fixes broken tests. Supports Jest, Vitest, pytest, and more.',
  },
  {
    icon: GitBranch,
    title: 'Git Operations',
    description: 'Commits, branches, merges, creates PRs, and manages your version control workflow.',
  },
  {
    icon: FolderOpen,
    title: 'Project Analysis',
    description: 'Scans your project structure, reads configs, and understands your tech stack automatically.',
  },
  {
    icon: Puzzle,
    title: 'Custom Skills',
    description: 'Create reusable /commands with a Markdown file. No code needed. Your personal automations.',
  },
  {
    icon: Bot,
    title: 'Sub-Agents',
    description: 'Spin up specialized agents for parallel tasks. A reviewer, a tester, a researcher: all at once.',
  },
  {
    icon: Zap,
    title: 'Hooks',
    description: 'Trigger shell commands automatically on events. Auto-format on save, lint before commit.',
  },
  {
    icon: Search,
    title: 'Codebase Search',
    description: 'Searches across files with regex, glob patterns, and AST-aware queries. Faster than grep.',
  },
  {
    icon: Workflow,
    title: 'Plan Mode',
    description: 'Claude proposes a plan before acting. Review and approve before any changes are made.',
  },
  {
    icon: Layers,
    title: 'Agent Teams',
    description: 'Multiple Claude sessions collaborating in parallel. Each handles a different part of the work.',
    badge: 'new',
  },
];

const integrations: Integration[] = [
  // Dev tools
  {
    icon: GitBranch,
    name: 'GitHub',
    description: 'PRs, issues, code search, file contents, releases',
    example: '"What are my open PRs?"',
    href: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    category: 'dev',
  },
  {
    icon: GitBranch,
    name: 'GitLab',
    description: 'Merge requests, issues, pipelines, project management',
    example: '"Show failing pipelines this week"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'dev',
  },
  {
    icon: Bug,
    name: 'Sentry',
    description: 'Error tracking, issue details, stack traces',
    example: '"What are the top errors in production?"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'dev',
  },
  {
    icon: Cloud,
    name: 'Cloudflare',
    description: 'Workers, KV, D1, R2, DNS management',
    example: '"List my Cloudflare Workers"',
    href: 'https://github.com/cloudflare/mcp-server-cloudflare',
    category: 'infra',
  },
  {
    icon: Server,
    name: 'Vercel',
    description: 'Deployments, environment variables, logs, projects',
    example: '"What\'s the latest deploy status?"',
    href: 'https://vercel.com/docs/mcp',
    category: 'infra',
  },

  // Communication
  {
    icon: MessageSquare,
    name: 'Slack',
    description: 'Read channels, search messages, send messages, read threads',
    example: '"Summarize #engineering from today"',
    href: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
    category: 'comms',
  },
  {
    icon: Mail,
    name: 'Gmail',
    description: 'Search emails, read messages, create drafts',
    example: '"Find emails from Sarah about the budget"',
    href: 'https://github.com/anthropics/anthropic-quickstarts',
    category: 'comms',
  },
  {
    icon: Calendar,
    name: 'Google Calendar',
    description: 'List events, find free time, create meetings',
    example: '"When am I free tomorrow afternoon?"',
    href: 'https://github.com/anthropics/anthropic-quickstarts',
    category: 'comms',
  },

  // Project management
  {
    icon: LayoutDashboard,
    name: 'Linear',
    description: 'Issues, projects, cycles, team management',
    example: '"What tickets are in this sprint?"',
    href: 'https://github.com/modelcontextprotocol/servers/tree/main/src/linear',
    category: 'pm',
  },
  {
    icon: LayoutDashboard,
    name: 'Jira',
    description: 'Issues, boards, sprints, comments, transitions',
    example: '"Create a bug ticket for the auth issue"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'pm',
  },
  {
    icon: BookOpen,
    name: 'Confluence',
    description: 'Search docs, read pages, create and update content',
    example: '"Find the architecture doc for payments"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'pm',
  },
  {
    icon: BookOpen,
    name: 'Notion',
    description: 'Search pages, read databases, create content',
    example: '"Add this meeting summary to our wiki"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'pm',
  },

  // Data
  {
    icon: Database,
    name: 'PostgreSQL',
    description: 'Run queries, inspect schemas, analyze data',
    example: '"Show me the top 10 users by revenue"',
    href: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    category: 'data',
  },
  {
    icon: Database,
    name: 'SQLite',
    description: 'Query local databases, inspect tables',
    example: '"How many records are in the orders table?"',
    href: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
    category: 'data',
  },
  {
    icon: BarChart2,
    name: 'Elasticsearch',
    description: 'Search indices, analyze logs, query data',
    example: '"Find all 500 errors from the last hour"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'data',
  },

  // Design
  {
    icon: Palette,
    name: 'Figma',
    description: 'Read designs, extract components and specs',
    example: '"What are the specs for the card component?"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'design',
  },
  {
    icon: Palette,
    name: 'Miro',
    description: 'Read boards, create diagrams, manage content',
    example: '"Create a diagram of our user flow"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'design',
  },

  // Infra
  {
    icon: Server,
    name: 'Docker',
    description: 'Manage containers, images, compose services',
    example: '"Restart the API container"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'infra',
  },
  {
    icon: Shield,
    name: 'AWS',
    description: 'S3, Lambda, EC2, CloudWatch, and more',
    example: '"List my S3 buckets"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'infra',
  },
  {
    icon: Database,
    name: 'Redis',
    description: 'Key-value operations, cache management',
    example: '"What keys are in the session cache?"',
    href: 'https://github.com/modelcontextprotocol/servers',
    category: 'data',
  },
];

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'All',
  dev: 'Developer Tools',
  comms: 'Communication',
  pm: 'Project Management',
  data: 'Data & Analytics',
  design: 'Design',
  infra: 'Infrastructure',
};

/* ─────────────────────────────────────────────
   Components
   ───────────────────────────────────────────── */

function CapabilityCard({ cap }: { cap: Capability }) {
  const Icon = cap.icon;
  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-fd-foreground text-sm">{cap.title}</h3>
          {cap.badge && (
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-green-600 dark:text-green-400">
              {cap.badge}
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-fd-muted-foreground leading-relaxed">{cap.description}</p>
    </div>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const Icon = integration.icon;
  return (
    <div className="group flex flex-col rounded-xl border border-fd-border bg-fd-card transition-colors hover:border-fd-muted-foreground/30 hover:bg-fd-accent">
      <div className="flex items-start gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-fd-foreground">{integration.name}</h3>
            {integration.badge && (
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {integration.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-fd-muted-foreground">{integration.description}</p>
        </div>
      </div>

      {/* Example + link */}
      <div className="border-t border-fd-border px-5 py-3 flex items-center justify-between">
        <span className="text-xs text-fd-muted-foreground font-mono truncate">
          {integration.example}
        </span>
        <a
          href={integration.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 ml-3 text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          aria-label={`Set up ${integration.name}`}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

import { useState } from 'react';

export default function CapabilitiesPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredIntegrations =
    filter === 'all'
      ? integrations
      : integrations.filter((i) => i.category === filter);

  return (
    <div className="flex flex-col bg-fd-background">
      {/* ── Hero ── */}
      <section className="relative mx-auto w-full max-w-5xl px-6 pt-16 pb-8 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <div className="animate-slide-up-fade mb-4 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">{builtInCapabilities.length} capabilities + {integrations.length} integrations</span>
          </div>

          <h1 className="animate-slide-up-fade delay-100 font-display text-4xl font-normal tracking-tight-display text-fd-foreground sm:text-5xl">
            What Claude Code Can Do
          </h1>
          <p className="animate-slide-up-fade delay-200 mx-auto mt-4 max-w-2xl text-lg text-fd-muted-foreground">
            Built-in superpowers plus connections to the tools you already use.
            Think of it as ChatGPT plugins, but they actually work.
          </p>
        </div>
      </section>

      {/* ── Built-in Capabilities ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Built-in Capabilities
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            These work out of the box. No setup, no plugins, no config.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {builtInCapabilities.map((cap) => (
            <CapabilityCard key={cap.title} cap={cap} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── Integrations (MCP) ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-8">
        <div className="mb-2">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Integrations
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            Connect Claude Code to your tools via{' '}
            <Link href="/docs/patterns/mcp-servers" className="underline hover:text-fd-foreground transition-colors">
              MCP (Model Context Protocol)
            </Link>
            . One conversation, all your data.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => {
            const count = cat === 'all' ? integrations.length : integrations.filter((i) => i.category === cat).length;
            if (count === 0 && cat !== 'all') return null;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === cat
                    ? 'bg-fd-primary text-fd-primary-foreground'
                    : 'bg-fd-accent text-fd-muted-foreground hover:text-fd-foreground'
                }`}
              >
                {categoryLabels[cat]}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard key={integration.name} integration={integration} />
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <p className="py-12 text-center text-fd-muted-foreground">
            No integrations in this category yet.
          </p>
        )}
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── Custom Skills Section ── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="overflow-hidden rounded-xl border border-fd-border">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <div className="mb-3 inline-flex items-center gap-2 text-sm text-fd-muted-foreground">
                <Puzzle className="h-4 w-4" />
                <span className="font-medium">Custom Skills</span>
              </div>
              <h3 className="font-display text-2xl font-normal tracking-tight-display text-fd-foreground sm:text-3xl">
                Build your own capabilities.
                <br />
                <span className="text-fd-muted-foreground">No code required.</span>
              </h3>
              <p className="mt-4 text-fd-muted-foreground leading-relaxed">
                A skill is a Markdown file that teaches Claude a new command.
                Write what you want it to do in plain English, save it as a <code className="text-fd-foreground">.md</code> file,
                and it becomes a <code className="text-fd-foreground">/slash-command</code> you can run anytime.
              </p>
              <div className="mt-4 space-y-2 text-sm text-fd-muted-foreground">
                <p><code className="text-fd-foreground">/weekly-status</code>: generates your status report from project data</p>
                <p><code className="text-fd-foreground">/meeting-prep</code>: gathers context from calendar, Slack, and docs</p>
                <p><code className="text-fd-foreground">/review-pr</code>: runs a structured code review on any PR</p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/tutorials/your-first-skill"
                  className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
                >
                  Build your first skill
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/docs/patterns/skills"
                  className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
                >
                  Read the docs
                </Link>
              </div>
            </div>

            <div className="border-t border-fd-border bg-fd-accent/50 p-6 lg:border-l lg:border-t-0 flex items-center">
              <div className="w-full rounded-lg border border-fd-border bg-fd-background p-4 font-mono text-xs leading-relaxed text-fd-muted-foreground">
                <div className="mb-3 text-fd-foreground font-medium">~/.claude/skills/weekly-status.md</div>
                <div className="space-y-1">
                  <p className="text-fd-foreground"># Weekly Status Report</p>
                  <p></p>
                  <p>Generate my weekly status report.</p>
                  <p></p>
                  <p>## Steps</p>
                  <p>1. Check git log for this week&apos;s commits</p>
                  <p>2. Read any open PRs and their status</p>
                  <p>3. Check Linear for completed tickets</p>
                  <p>4. Format as:</p>
                  <p>&nbsp;&nbsp;- Shipped this week</p>
                  <p>&nbsp;&nbsp;- In progress</p>
                  <p>&nbsp;&nbsp;- Blocked</p>
                  <p>&nbsp;&nbsp;- Next week plan</p>
                  <p></p>
                  <p>Keep it under 200 words. No fluff.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How MCP Works (brief) ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="rounded-xl border border-fd-border bg-fd-card p-8">
          <h3 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            How integrations work
          </h3>
          <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed max-w-2xl">
            Claude Code uses <strong>MCP (Model Context Protocol)</strong> to talk to external tools.
            Each integration is a small server that translates between Claude and the tool&apos;s API.
            You add them to a <code>.mcp.json</code> file in your project, and Claude discovers them automatically.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-fd-muted-foreground">
            <span className="rounded bg-fd-accent px-2 py-1">Your prompt</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span className="rounded bg-fd-accent px-2 py-1">Claude Code</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span className="rounded bg-fd-accent px-2 py-1">MCP Server</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span className="rounded bg-fd-accent px-2 py-1">GitHub / Slack / etc.</span>
          </div>
          <Link
            href="/docs/patterns/mcp-servers"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-fd-foreground hover:underline"
          >
            Full MCP setup guide
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Ready to try it?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            Start with the guided journey or jump straight into a tutorial.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Start the journey
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              Browse tutorials
            </Link>
          </div>

          {/* Affiliate end-card */}
          <div className="mt-8 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <p className="text-sm font-medium text-fd-foreground">
              Need Claude Pro to use all capabilities?
            </p>
            <p className="mt-1 text-xs text-fd-muted-foreground">
              Computer use, extended thinking, and most MCP integrations work best with Pro ($20/mo) or Max ($100/mo).
            </p>
            <a
              href="/docs/comparisons/pro-vs-max"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Compare Pro vs Max
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
