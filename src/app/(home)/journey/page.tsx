'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Monitor,
  CreditCard,
  Download,
  FileText,
  Rocket,
  Globe,
  Brain,
  Zap,
  Puzzle,
  Users,
  Terminal,
  LayoutDashboard,
  Bot,
  Cpu,
  Server,
  Shield,
  ExternalLink,
  Briefcase,
  Palette,
  Map,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface JourneyNode {
  id: string;
  title: string;
  description: string;
  href: string;
  duration?: string;
  icon: React.ElementType;
  audiences?: string[];
  badge?: string;
  isDecisionPoint?: boolean;
  affiliateLabel?: string;
  affiliateHref?: string;
}

interface Stage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  headerColor: string;
  headerBg: string;
  nodes: JourneyNode[];
}

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

const stages: Stage[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    subtitle: 'What is this thing?',
    headerColor: 'text-green-700 dark:text-green-300',
    headerBg: 'bg-green-50 border-green-200 dark:bg-green-950/40 dark:border-green-800/40',
    nodes: [
      {
        id: 'what-is-claude-code',
        title: 'What is Claude Code?',
        description: 'Not another chatbot. An AI that lives in your computer, reads your files, runs commands, and builds things.',
        href: '/docs/foundations/what-is-claude-code',
        duration: '5 min',
        icon: Sparkles,
        badge: 'start here',
      },
      {
        id: 'choose-interface',
        title: 'Choose Your Interface',
        description: 'Desktop app, web app, terminal, or IDE extension. Pick the one that fits.',
        href: '/docs/foundations/which-interface',
        duration: '3 min',
        icon: Monitor,
      },
      {
        id: 'pick-a-plan',
        title: 'Pick a Plan',
        description: "Free, Pro ($20/mo), or Max ($100/mo). Here's what you actually need.",
        href: '/docs/comparisons/pro-vs-max',
        duration: '4 min',
        icon: CreditCard,
        isDecisionPoint: true,
        affiliateLabel: 'Compare Pro vs Max',
        affiliateHref: '/docs/comparisons/pro-vs-max',
      },
    ],
  },
  {
    id: 'setup',
    number: '02',
    title: 'Set Up',
    subtitle: '~10 minutes to get running',
    headerColor: 'text-blue-700 dark:text-blue-300',
    headerBg: 'bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800/40',
    nodes: [
      {
        id: 'install',
        title: 'Install Claude Code',
        description: 'One command. Mac, Windows, Linux. Desktop app users just download and open.',
        href: '/docs/foundations/installation',
        duration: '5 min',
        icon: Download,
      },
      {
        id: 'first-claude-md',
        title: 'Your First CLAUDE.md',
        description: 'The file that teaches Claude about YOUR work. Run /init and it creates itself.',
        href: '/tutorials/your-first-claude-md',
        duration: '5 min',
        icon: FileText,
        badge: 'tutorial',
      },
      {
        id: 'glossary',
        title: 'Learn the Vocabulary',
        description: 'Context window, tokens, MCP, hooks... every term in plain English.',
        href: '/docs/foundations/glossary',
        duration: '3 min',
        icon: Brain,
        audiences: ['Beginners', 'PMs'],
      },
    ],
  },
  {
    id: 'first-win',
    number: '03',
    title: 'First Win',
    subtitle: 'Build something real',
    headerColor: 'text-amber-700 dark:text-amber-300',
    headerBg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/40',
    nodes: [
      {
        id: 'ship-landing-page',
        title: 'Ship a Landing Page',
        description: 'Empty folder to live website in 30 minutes. No coding needed.',
        href: '/tutorials/ship-a-landing-page',
        duration: '30 min',
        icon: Rocket,
        badge: 'tutorial',
        audiences: ['Founders', 'Students', 'Devs'],
      },
      {
        id: 'stakeholder-map',
        title: 'Build a Stakeholder Map',
        description: 'Messy list of people into a clear map. No terminal needed.',
        href: '/tutorials/stakeholder-map',
        duration: '15 min',
        icon: Users,
        badge: 'no code',
        audiences: ['PMs'],
      },
      {
        id: 'slide-deck-outline',
        title: 'Slide Deck Outline',
        description: 'Rough ideas into a structured presentation. Design reviews, pitches, updates.',
        href: '/tutorials/slide-deck-outline',
        duration: '10 min',
        icon: LayoutDashboard,
        badge: 'no code',
        audiences: ['Designers', 'PMs', 'Founders'],
      },
      {
        id: 'meeting-to-jira',
        title: 'Meeting Notes to Tickets',
        description: 'Paste raw notes, get structured tickets. 45 min of work in 5.',
        href: '/tutorials/meeting-to-jira',
        duration: '10 min',
        icon: LayoutDashboard,
        badge: 'tutorial',
        audiences: ['PMs'],
      },
      {
        id: 'deploy',
        title: 'Deploy It Live',
        description: 'Push to the internet. One command. Share the link.',
        href: '/docs/workflows/daily-practice',
        duration: '5 min',
        icon: Globe,
        audiences: ['Founders', 'Devs', 'Students'],
        isDecisionPoint: true,
        affiliateLabel: 'Deploy on Railway',
        affiliateHref: 'https://railway.com?referralCode=shadman',
      },
    ],
  },
  {
    id: 'build-habits',
    number: '04',
    title: 'Build Habits',
    subtitle: "From \"cool\" to \"can't work without\"",
    headerColor: 'text-purple-700 dark:text-purple-300',
    headerBg: 'bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800/40',
    nodes: [
      {
        id: 'session-lifecycle',
        title: 'How Sessions Work',
        description: 'Start warm, work efficiently, end with a trail. The key to power-user level.',
        href: '/docs/foundations/session-lifecycle',
        duration: '6 min',
        icon: Zap,
      },
      {
        id: 'memory-system',
        title: 'Memory System',
        description: 'After a week, Claude knows your preferences, projects, and style. Compound effect.',
        href: '/docs/foundations/memory-system',
        duration: '5 min',
        icon: Brain,
      },
      {
        id: 'daily-practice',
        title: 'Daily Practice',
        description: 'Morning standup, midday builds, end-of-day review. The rhythm.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min',
        icon: Terminal,
      },
      {
        id: 'cost-optimization',
        title: 'Keep Costs Down',
        description: '/compact, model selection, context tricks. Stop burning tokens.',
        href: '/docs/foundations/cost-optimization',
        duration: '5 min',
        icon: CreditCard,
      },
    ],
  },
  {
    id: 'level-up',
    number: '05',
    title: 'Level Up',
    subtitle: 'Skills, hooks, agents',
    headerColor: 'text-rose-700 dark:text-rose-300',
    headerBg: 'bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800/40',
    nodes: [
      {
        id: 'skills',
        title: 'Custom Skills',
        description: 'Any multi-step task as a single /command. Write Markdown, get automation.',
        href: '/tutorials/your-first-skill',
        duration: '10 min',
        icon: Puzzle,
        badge: 'tutorial',
      },
      {
        id: 'hooks',
        title: 'Hooks',
        description: 'Auto-run checks before commits. Format on save. Inject context.',
        href: '/docs/patterns/hooks',
        duration: '8 min',
        icon: Zap,
        audiences: ['Devs'],
      },
      {
        id: 'sub-agents',
        title: 'Sub-Agents',
        description: 'Specialized agents: code reviewer, test runner, researcher. In parallel.',
        href: '/docs/patterns/agents',
        duration: '10 min',
        icon: Bot,
        audiences: ['Devs'],
      },
      {
        id: 'mcp-servers',
        title: 'MCP Servers',
        description: 'Connect Claude to GitHub, Slack, Jira, Figma. The integration protocol.',
        href: '/docs/patterns/mcp-servers',
        duration: '12 min',
        icon: Server,
        audiences: ['PMs', 'Devs', 'Designers'],
      },
      {
        id: 'computer-use',
        title: 'Computer Use',
        description: 'Claude sees your screen, clicks buttons, navigates apps.',
        href: '/tutorials/computer-use',
        duration: '5 min',
        icon: Cpu,
        badge: 'new',
      },
    ],
  },
  {
    id: 'mastery',
    number: '06',
    title: 'Mastery',
    subtitle: 'Run Claude while you sleep',
    headerColor: 'text-indigo-700 dark:text-indigo-300',
    headerBg: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800/40',
    nodes: [
      {
        id: 'autonomous-loops',
        title: 'Autonomous Loops',
        description: 'Give a task, sleep, wake up to a PR. Safety controls built in.',
        href: '/docs/patterns/autonomous-loops',
        duration: '10 min',
        icon: Zap,
        audiences: ['Devs', 'Founders'],
      },
      {
        id: 'pm-workflow',
        title: 'PM Power Workflow',
        description: 'Meeting prep, status reports, competitive analysis. No code.',
        href: '/docs/workflows/pm-workflow',
        duration: '8 min',
        icon: Briefcase,
        audiences: ['PMs'],
      },
      {
        id: 'design-workflow',
        title: 'Design Automation',
        description: 'Component specs from Figma, accessibility audits, living style guides.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min',
        icon: Palette,
        audiences: ['Designers'],
      },
      {
        id: 'team-adoption',
        title: 'Team Rollout',
        description: 'Shared configs, onboarding, getting buy-in from skeptics.',
        href: '/docs/workflows/team-adoption',
        duration: '10 min',
        icon: Users,
        audiences: ['PMs', 'Devs', 'Founders'],
      },
      {
        id: 'templates',
        title: 'Grab a Template',
        description: 'Copy-paste CLAUDE.md for Next.js, Python, monorepos, PM workspaces.',
        href: '/docs/templates',
        icon: FileText,
      },
      {
        id: 'compare-tools',
        title: 'Compare Tools',
        description: 'Claude Code vs Cursor, Copilot, Codex, Windsurf. Honest comparisons.',
        href: '/docs/comparisons/vs-cursor',
        icon: Shield,
        audiences: ['Devs', 'Founders'],
        isDecisionPoint: true,
        affiliateLabel: 'Try v0 by Vercel',
        affiliateHref: 'https://v0.dev?ref=claudecodeguide',
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Audience badge colors
   ───────────────────────────────────────────── */

const audienceColor: Record<string, string> = {
  Beginners: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  PMs: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  Devs: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  Founders: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  Students: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
  Designers: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
};

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function JourneyPage() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  return (
    <div className="flex flex-col bg-fd-background">
      {/* ── Hero ── */}
      <section className="relative mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <div className="animate-slide-up-fade mb-3 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm">
            <Map className="h-3.5 w-3.5 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">The complete learning path</span>
          </div>

          <h1 className="animate-slide-up-fade delay-100 font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-5xl">
            The Claude Code Roadmap
          </h1>
          <p className="animate-slide-up-fade delay-200 mx-auto mt-3 max-w-lg text-base text-fd-muted-foreground">
            Six stages from first install to mastery. Click any topic to learn more.
          </p>
        </div>
      </section>

      {/* ── Stage Cards ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="space-y-6">
          {stages.map((stage, idx) => (
            <div key={stage.id} className="group">
              {/* Connector between stages */}
              {idx > 0 && (
                <div className="flex justify-center -mt-6 mb-3">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-6 bg-fd-border" />
                  </div>
                </div>
              )}

              {/* Stage card */}
              <div className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-sm">
                {/* Colored header */}
                <div className={`border-b px-5 py-4 sm:px-6 ${stage.headerBg}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-2xl font-bold ${stage.headerColor}`}>
                      {stage.number}
                    </span>
                    <div>
                      <h2 className={`font-display text-lg font-semibold tracking-tight ${stage.headerColor}`}>
                        {stage.title}
                      </h2>
                      <p className="text-sm text-fd-muted-foreground">{stage.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Node rows */}
                <div className="divide-y divide-fd-border/50">
                  {stage.nodes.map((node) => {
                    const Icon = node.icon;
                    const isExpanded = expandedNode === node.id;

                    return (
                      <div key={node.id}>
                        <button
                          onClick={() =>
                            setExpandedNode((prev) =>
                              prev === node.id ? null : node.id,
                            )
                          }
                          className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-fd-accent/50 sm:px-6 sm:gap-4"
                        >
                          <Icon className={`h-4 w-4 shrink-0 ${stage.headerColor}`} />

                          <span className="flex-1 text-sm font-medium text-fd-foreground min-w-0 truncate sm:truncate-none">
                            {node.title}
                          </span>

                          {/* Audience badges (desktop) */}
                          {node.audiences && (
                            <div className="hidden items-center gap-1 sm:flex">
                              {node.audiences.map((a) => (
                                <span
                                  key={a}
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium leading-tight ${audienceColor[a] ?? ''}`}
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          )}

                          {node.badge && (
                            <span className="shrink-0 rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                              {node.badge}
                            </span>
                          )}

                          {node.duration && (
                            <span className="hidden text-xs text-fd-muted-foreground sm:block shrink-0">
                              {node.duration}
                            </span>
                          )}

                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 text-fd-muted-foreground transition-transform ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        {/* Expanded detail */}
                        {isExpanded && (
                          <div className="bg-fd-accent/30 px-5 py-4 sm:px-6">
                            {/* Mobile audience badges */}
                            {node.audiences && (
                              <div className="flex flex-wrap gap-1 mb-2 sm:hidden">
                                {node.audiences.map((a) => (
                                  <span
                                    key={a}
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${audienceColor[a] ?? ''}`}
                                  >
                                    {a}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p className="text-sm text-fd-muted-foreground leading-relaxed">
                              {node.description}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <Link
                                href={node.href}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary px-4 py-2 text-xs font-medium text-fd-primary-foreground hover:opacity-90"
                              >
                                {node.duration ? `${node.duration} read` : 'Read more'}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                              {node.isDecisionPoint && node.affiliateHref && (
                                <a
                                  href={node.affiliateHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                                >
                                  {node.affiliateLabel}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Ready to start?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            New here? The{' '}
            <Link href="/guide" className="font-medium text-fd-foreground underline">
              step-by-step guide
            </Link>{' '}
            walks you through setup hands-on.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
            >
              Start the guided setup
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent"
            >
              Browse tutorials
            </Link>
          </div>

          <div className="mt-8 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <p className="text-sm font-medium text-fd-foreground">
              Need Claude Pro to follow along?
            </p>
            <p className="mt-1 text-xs text-fd-muted-foreground">
              Most tutorials work best with Claude Pro ($20/mo) or Max ($100/mo).
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
