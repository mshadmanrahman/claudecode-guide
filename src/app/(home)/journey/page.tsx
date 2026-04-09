'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Briefcase,
  Code2,
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
  Lightbulb,
  GraduationCap,
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
  /** Audience badges shown on the node */
  audiences: string[];
  isDecisionPoint?: boolean;
  affiliateLabel?: string;
  affiliateHref?: string;
  badge?: string;
}

interface JourneyStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  colorClass: string;
  accentBg: string;
  dotColor: string;
  nodes: JourneyNode[];
}

/* ─────────────────────────────────────────────
   Journey data
   ───────────────────────────────────────────── */

const stages: JourneyStage[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    subtitle: 'What is this thing and why should I care?',
    colorClass: 'text-green-600 dark:text-green-400',
    accentBg: 'bg-green-500/10',
    dotColor: 'bg-green-500',
    nodes: [
      {
        id: 'what-is-claude-code',
        title: 'What is Claude Code?',
        description:
          'Not another chatbot. Claude Code is an AI that lives in your computer, reads your files, runs commands, and builds things.',
        href: '/docs/foundations/what-is-claude-code',
        duration: '5 min read',
        icon: Sparkles,
        audiences: ['Everyone'],
        badge: 'start here',
      },
      {
        id: 'choose-interface',
        title: 'Choose Your Interface',
        description:
          'Desktop app, web app, terminal, or IDE extension. Pick the one that feels right. The desktop app is the easiest start.',
        href: '/docs/foundations/which-interface',
        duration: '3 min read',
        icon: Monitor,
        audiences: ['Everyone'],
      },
      {
        id: 'pick-a-plan',
        title: 'Pick a Plan',
        description:
          "Free tier, Pro ($20/mo), or Max ($100/mo)? Here's what you actually need based on how you'll use it.",
        href: '/docs/comparisons/pro-vs-max',
        duration: '4 min read',
        icon: CreditCard,
        audiences: ['Everyone'],
        isDecisionPoint: true,
        affiliateLabel: 'Get Claude Pro',
        affiliateHref: 'https://claude.ai/upgrade',
      },
    ],
  },
  {
    id: 'setup',
    number: '02',
    title: 'Set Up',
    subtitle: 'Get it running. About 10 minutes.',
    colorClass: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-500/10',
    dotColor: 'bg-blue-500',
    nodes: [
      {
        id: 'install',
        title: 'Install Claude Code',
        description:
          'One command to install. Works on Mac, Windows, and Linux. Desktop app users: just download and open.',
        href: '/docs/foundations/installation',
        duration: '5 min',
        icon: Download,
        audiences: ['Everyone'],
      },
      {
        id: 'first-claude-md',
        title: 'Write Your First CLAUDE.md',
        description:
          'The magic file that teaches Claude about YOUR work. Run /init and Claude creates it from your project automatically.',
        href: '/tutorials/your-first-claude-md',
        duration: '5 min tutorial',
        icon: FileText,
        audiences: ['Everyone'],
        badge: 'tutorial',
      },
      {
        id: 'glossary',
        title: 'Learn the Vocabulary',
        description:
          'Context window, tokens, MCP, hooks... every term explained in plain English.',
        href: '/docs/foundations/glossary',
        duration: '3 min skim',
        icon: Brain,
        audiences: ['Beginners', 'PMs'],
      },
    ],
  },
  {
    id: 'first-win',
    number: '03',
    title: 'First Win',
    subtitle: 'Build something real. Feel the magic.',
    colorClass: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-500/10',
    dotColor: 'bg-amber-500',
    nodes: [
      {
        id: 'ship-landing-page',
        title: 'Ship a Landing Page',
        description:
          'From empty folder to live website in 30 minutes. No coding experience needed.',
        href: '/tutorials/ship-a-landing-page',
        duration: '30 min tutorial',
        icon: Rocket,
        audiences: ['Founders', 'Students', 'Devs'],
        badge: 'tutorial',
      },
      {
        id: 'stakeholder-map',
        title: 'Build a Stakeholder Map',
        description:
          'Turn a messy list of people into a clear stakeholder map. Uses the Claude app, no terminal needed.',
        href: '/tutorials/stakeholder-map',
        duration: '15 min tutorial',
        icon: Users,
        audiences: ['PMs'],
        badge: 'no code',
      },
      {
        id: 'slide-deck-outline',
        title: 'Generate a Slide Deck Outline',
        description:
          'Turn rough ideas into a structured presentation. Great for design reviews, stakeholder updates, and pitch decks.',
        href: '/tutorials/slide-deck-outline',
        duration: '10 min tutorial',
        icon: LayoutDashboard,
        audiences: ['Designers', 'PMs', 'Founders'],
        badge: 'no code',
      },
      {
        id: 'meeting-to-jira',
        title: 'Meeting Notes to Jira Tickets',
        description:
          'Paste raw meeting notes, get structured tickets. 45 minutes of work in 5.',
        href: '/tutorials/meeting-to-jira',
        duration: '10 min tutorial',
        icon: LayoutDashboard,
        audiences: ['PMs'],
        badge: 'tutorial',
      },
      {
        id: 'deploy',
        title: 'Deploy It Live',
        description:
          'Push your creation to the internet. One command. Share the link.',
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
    subtitle: "Go from \"cool\" to \"can't work without it.\"",
    colorClass: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-500/10',
    dotColor: 'bg-purple-500',
    nodes: [
      {
        id: 'session-lifecycle',
        title: 'How Sessions Work',
        description:
          'Start warm, work efficiently, end with a trail. This is what separates power users from frustrated ones.',
        href: '/docs/foundations/session-lifecycle',
        duration: '6 min read',
        icon: Zap,
        audiences: ['Everyone'],
      },
      {
        id: 'memory-system',
        title: 'Memory: It Remembers You',
        description:
          'After a week, Claude knows your preferences, projects, and writing style. The compound effect is real.',
        href: '/docs/foundations/memory-system',
        duration: '5 min read',
        icon: Brain,
        audiences: ['Everyone'],
      },
      {
        id: 'daily-practice',
        title: 'Daily Practice',
        description:
          'Morning standup, midday builds, end-of-day review. The rhythm that makes AI feel natural.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min read',
        icon: Terminal,
        audiences: ['Everyone'],
      },
      {
        id: 'cost-optimization',
        title: 'Keep Costs Down',
        description:
          "Context window tricks, /compact, model selection. Don't burn money on tokens you don't need.",
        href: '/docs/foundations/cost-optimization',
        duration: '5 min read',
        icon: CreditCard,
        audiences: ['Everyone'],
      },
    ],
  },
  {
    id: 'level-up',
    number: '05',
    title: 'Level Up',
    subtitle: 'Skills, hooks, agents. This is where it gets powerful.',
    colorClass: 'text-rose-600 dark:text-rose-400',
    accentBg: 'bg-rose-500/10',
    dotColor: 'bg-rose-500',
    nodes: [
      {
        id: 'skills',
        title: 'Custom Skills',
        description:
          'Turn any multi-step task into a single /command. Write a Markdown file, get a personal automation.',
        href: '/tutorials/your-first-skill',
        duration: '10 min tutorial',
        icon: Puzzle,
        audiences: ['Everyone'],
        badge: 'tutorial',
      },
      {
        id: 'hooks',
        title: 'Hooks',
        description:
          'Run checks before every commit. Format code on save. Inject context automatically.',
        href: '/docs/patterns/hooks',
        duration: '8 min read',
        icon: Zap,
        audiences: ['Devs'],
      },
      {
        id: 'sub-agents',
        title: 'Sub-Agents',
        description:
          'Spin up specialized agents: code reviewer, test runner, researcher. All working in parallel.',
        href: '/docs/patterns/agents',
        duration: '10 min read',
        icon: Bot,
        audiences: ['Devs'],
      },
      {
        id: 'mcp-servers',
        title: 'MCP Servers',
        description:
          'Connect Claude to GitHub, Slack, Jira, Linear, Figma. The protocol that makes Claude a hub.',
        href: '/docs/patterns/mcp-servers',
        duration: '12 min read',
        icon: Server,
        audiences: ['PMs', 'Devs', 'Designers'],
      },
      {
        id: 'computer-use',
        title: 'Computer Use',
        description:
          'Claude can see your screen, click buttons, and navigate apps. Say "look at my screen" and it does.',
        href: '/tutorials/computer-use',
        duration: '5 min read',
        icon: Cpu,
        audiences: ['Everyone'],
        badge: 'new',
      },
    ],
  },
  {
    id: 'mastery',
    number: '06',
    title: 'Mastery',
    subtitle: 'Run Claude while you sleep. Lead your team.',
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    dotColor: 'bg-indigo-500',
    nodes: [
      {
        id: 'autonomous-loops',
        title: 'Autonomous Loops',
        description:
          'Give Claude a task, go to sleep, wake up to a PR. Safety controls and automatic checkpoints.',
        href: '/docs/patterns/autonomous-loops',
        duration: '10 min read',
        icon: Zap,
        audiences: ['Devs', 'Founders'],
      },
      {
        id: 'pm-workflow',
        title: 'PM Power Workflow',
        description:
          'Meeting prep, status reports, competitive analysis, decision memos. All without code.',
        href: '/docs/workflows/pm-workflow',
        duration: '8 min read',
        icon: Briefcase,
        audiences: ['PMs'],
      },
      {
        id: 'design-workflow',
        title: 'Design System Automation',
        description:
          'Generate component specs from Figma, audit accessibility, maintain a living style guide.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min read',
        icon: Palette,
        audiences: ['Designers'],
      },
      {
        id: 'team-adoption',
        title: 'Roll Out to Your Team',
        description:
          'Shared configs, onboarding guides, getting buy-in from skeptics. The adoption playbook.',
        href: '/docs/workflows/team-adoption',
        duration: '10 min read',
        icon: Users,
        audiences: ['PMs', 'Devs', 'Founders'],
      },
      {
        id: 'templates',
        title: 'Grab a Template',
        description:
          'Copy-paste CLAUDE.md for Next.js, Python, monorepos, PM workspaces. Battle-tested.',
        href: '/docs/templates',
        duration: 'Browse',
        icon: FileText,
        audiences: ['Everyone'],
      },
      {
        id: 'compare-tools',
        title: 'Compare Your Options',
        description:
          'Claude Code vs Cursor, Copilot, Codex, Windsurf. Honest side-by-side comparisons.',
        href: '/docs/comparisons/vs-cursor',
        duration: 'Browse',
        icon: Shield,
        audiences: ['Devs', 'Founders', 'Students'],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Audience color map
   ───────────────────────────────────────────── */

const audienceColors: Record<string, string> = {
  Everyone: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  Beginners: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  PMs: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Devs: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Founders: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Students: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Designers: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

/* ─────────────────────────────────────────────
   Components
   ───────────────────────────────────────────── */

function NodeCard({
  node,
  isExpanded,
  onToggle,
  stageColor,
}: {
  node: JourneyNode;
  isExpanded: boolean;
  onToggle: () => void;
  stageColor: string;
}) {
  const Icon = node.icon;

  return (
    <div
      className={`rounded-xl border transition-all ${
        isExpanded
          ? 'border-fd-border bg-fd-card shadow-sm'
          : 'border-fd-border/60 bg-fd-background hover:border-fd-border hover:bg-fd-card/50'
      }`}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left sm:gap-4 sm:px-5 sm:py-3.5"
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-fd-border/60 ${
            isExpanded ? 'bg-fd-accent' : 'bg-fd-background'
          }`}
        >
          <Icon className={`h-4 w-4 ${stageColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-fd-foreground">{node.title}</span>
        </div>

        {/* Audience badges */}
        <div className="hidden items-center gap-1 sm:flex">
          {node.audiences.map((a) => (
            <span
              key={a}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${audienceColors[a] ?? audienceColors.Everyone}`}
            >
              {a}
            </span>
          ))}
        </div>

        {/* Feature badge */}
        {node.badge && (
          <span className="shrink-0 rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
            {node.badge}
          </span>
        )}

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-fd-border/40 px-5 pb-4 pt-3 sm:px-6">
          {/* Mobile audience badges */}
          <div className="flex flex-wrap items-center gap-1 mb-3 sm:hidden">
            {node.audiences.map((a) => (
              <span
                key={a}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${audienceColors[a] ?? audienceColors.Everyone}`}
              >
                {a}
              </span>
            ))}
          </div>

          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            {node.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href={node.href}
              className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary px-4 py-2 text-xs font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              {node.duration ?? 'Read more'}
              <ArrowRight className="h-3 w-3" />
            </Link>
            {node.isDecisionPoint && node.affiliateHref && (
              <a
                href={node.affiliateHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
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
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function JourneyPage() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  function toggleExpand(nodeId: string) {
    setExpandedNode((prev) => (prev === nodeId ? null : nodeId));
  }

  const totalNodes = stages.reduce((sum, s) => sum + s.nodes.length, 0);

  return (
    <div className="flex flex-col bg-fd-background">
      {/* ── Hero ── */}
      <section className="relative mx-auto w-full max-w-3xl px-6 pt-16 pb-10 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <div className="animate-slide-up-fade mb-3 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm">
            <Map className="h-3.5 w-3.5 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">
              {stages.length} stages &middot; {totalNodes} topics
            </span>
          </div>

          <h1 className="animate-slide-up-fade delay-100 font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-5xl">
            The Claude Code Roadmap
          </h1>
          <p className="animate-slide-up-fade delay-200 mx-auto mt-3 max-w-xl text-base text-fd-muted-foreground">
            Everything you need to go from zero to mastery. Expand any topic for details.
          </p>

          {/* Legend */}
          <div className="animate-slide-up-fade delay-300 mt-6 flex flex-wrap items-center justify-center gap-2">
            {Object.entries(audienceColors).map(([label, cls]) => (
              <span
                key={label}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${cls}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/40 via-purple-500/40 to-indigo-500/40 sm:left-6" />

          <div className="space-y-10">
            {stages.map((stage) => (
              <div key={stage.id} className="relative">
                {/* Stage header */}
                <div className="flex items-center gap-4 mb-4 sm:gap-5">
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-fd-border sm:h-12 sm:w-12 ${stage.accentBg}`}
                  >
                    <span className={`font-mono text-sm font-bold ${stage.colorClass}`}>
                      {stage.number}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={`font-display text-lg font-semibold tracking-tight ${stage.colorClass}`}>
                      {stage.title}
                    </h2>
                    <p className="text-sm text-fd-muted-foreground">{stage.subtitle}</p>
                  </div>
                </div>

                {/* Nodes */}
                <div className="ml-5 space-y-2 pl-5 sm:ml-6 sm:pl-7">
                  {stage.nodes.map((node) => (
                    <NodeCard
                      key={node.id}
                      node={node}
                      isExpanded={expandedNode === node.id}
                      onToggle={() => toggleExpand(node.id)}
                      stageColor={stage.colorClass}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
            walks you through setup. Or jump into a tutorial.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Start the guided setup
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
              Need Claude Pro to follow along?
            </p>
            <p className="mt-1 text-xs text-fd-muted-foreground">
              Most tutorials work best with Claude Pro ($20/mo) or Max ($100/mo).
            </p>
            <a
              href="https://claude.ai/upgrade"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Get Claude Pro
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
