'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
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
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

type Persona = 'chatgpt-user' | 'pm' | 'developer';

interface JourneyNode {
  id: string;
  title: string;
  description: string;
  href: string;
  duration?: string;
  icon: React.ElementType;
  /** Which personas see this node highlighted */
  personas: Persona[];
  /** If true, this is an affiliate/upgrade touchpoint */
  isDecisionPoint?: boolean;
  affiliateLabel?: string;
  affiliateHref?: string;
  /** Badge text */
  badge?: string;
}

interface JourneySection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  colorClass: string;
  accentBg: string;
  nodes: JourneyNode[];
}

/* ─────────────────────────────────────────────
   Persona definitions
   ───────────────────────────────────────────── */

const personas: { id: Persona; label: string; tagline: string; icon: React.ElementType; color: string }[] = [
  {
    id: 'chatgpt-user',
    label: 'ChatGPT User',
    tagline: "I've used ChatGPT. What's different here?",
    icon: MessageSquare,
    color: 'border-green-500/40 bg-green-500/8 text-green-700 dark:text-green-400',
  },
  {
    id: 'pm',
    label: 'Product Manager',
    tagline: "I don't write code. Can I still use this?",
    icon: Briefcase,
    color: 'border-blue-500/40 bg-blue-500/8 text-blue-700 dark:text-blue-400',
  },
  {
    id: 'developer',
    label: 'Developer',
    tagline: 'I code. Show me what this can actually do.',
    icon: Code2,
    color: 'border-purple-500/40 bg-purple-500/8 text-purple-700 dark:text-purple-400',
  },
];

/* ─────────────────────────────────────────────
   Journey data
   ───────────────────────────────────────────── */

const journeySections: JourneySection[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    subtitle: 'What is this thing and why should I care?',
    colorClass: 'text-green-600 dark:text-green-400',
    accentBg: 'bg-green-500/10',
    nodes: [
      {
        id: 'what-is-claude-code',
        title: 'What is Claude Code?',
        description:
          'Not another chatbot. Claude Code is an AI that lives in your computer, reads your files, runs commands, and builds things. Think ChatGPT... but it can actually DO stuff.',
        href: '/docs/foundations/what-is-claude-code',
        duration: '5 min read',
        icon: Sparkles,
        personas: ['chatgpt-user', 'pm', 'developer'],
        badge: 'start here',
      },
      {
        id: 'choose-interface',
        title: 'Choose Your Interface',
        description:
          'Desktop app, web app, terminal, or IDE extension. Pick the one that feels right. (Hint: the desktop app is the easiest start.)',
        href: '/docs/foundations/which-interface',
        duration: '3 min read',
        icon: Monitor,
        personas: ['chatgpt-user', 'pm', 'developer'],
      },
      {
        id: 'pick-a-plan',
        title: 'Pick a Plan',
        description:
          'Free tier, Pro ($20/mo), or Max ($100/mo)? Here\'s what you actually need based on how you\'ll use it.',
        href: '/docs/comparisons/pro-vs-max',
        duration: '4 min read',
        icon: CreditCard,
        personas: ['chatgpt-user', 'pm', 'developer'],
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
    subtitle: 'Get it running. Takes about 10 minutes.',
    colorClass: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-500/10',
    nodes: [
      {
        id: 'install',
        title: 'Install Claude Code',
        description:
          'One command to install. Works on Mac, Windows, and Linux. If you chose the desktop app, just download and open it.',
        href: '/docs/foundations/installation',
        duration: '5 min',
        icon: Download,
        personas: ['chatgpt-user', 'pm', 'developer'],
      },
      {
        id: 'first-claude-md',
        title: 'Write Your First CLAUDE.md',
        description:
          'The magic file that teaches Claude about YOUR work. Your role, your preferences, your project. This is what makes it personal.',
        href: '/tutorials/your-first-claude-md',
        duration: '5 min tutorial',
        icon: FileText,
        personas: ['chatgpt-user', 'pm', 'developer'],
        badge: 'tutorial',
      },
      {
        id: 'glossary',
        title: 'Learn the Vocabulary',
        description:
          'Context window, tokens, MCP, hooks... every term explained in plain English. Bookmark this page.',
        href: '/docs/foundations/glossary',
        duration: '3 min skim',
        icon: Brain,
        personas: ['chatgpt-user', 'pm'],
      },
    ],
  },
  {
    id: 'first-win',
    number: '03',
    title: 'Get Your First Win',
    subtitle: 'Build something real. Feel the magic.',
    colorClass: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-500/10',
    nodes: [
      {
        id: 'ship-landing-page',
        title: 'Ship a Landing Page',
        description:
          'From empty folder to live website in 30 minutes. No coding experience needed. Claude writes it, you review it.',
        href: '/tutorials/ship-a-landing-page',
        duration: '30 min tutorial',
        icon: Rocket,
        personas: ['chatgpt-user', 'developer'],
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
        personas: ['pm'],
        badge: 'no code',
      },
      {
        id: 'meeting-to-jira',
        title: 'Meeting Notes to Jira Tickets',
        description:
          'Paste raw meeting notes, get structured Jira tickets. The task that used to take 45 minutes now takes 5.',
        href: '/tutorials/meeting-to-jira',
        duration: '10 min tutorial',
        icon: LayoutDashboard,
        personas: ['pm'],
        badge: 'tutorial',
      },
      {
        id: 'deploy',
        title: 'Deploy It Live',
        description:
          'Push your creation to the internet. Railway or Vercel, one command. Share the link with friends.',
        href: '/docs/workflows/daily-practice',
        duration: '5 min',
        icon: Globe,
        personas: ['chatgpt-user', 'developer'],
        isDecisionPoint: true,
        affiliateLabel: 'Deploy on Railway',
        affiliateHref: 'https://railway.com?referralCode=shadman',
      },
    ],
  },
  {
    id: 'build-habits',
    number: '04',
    title: 'Build the Habits',
    subtitle: 'Go from "that was cool" to "I can\'t work without this."',
    colorClass: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-500/10',
    nodes: [
      {
        id: 'session-lifecycle',
        title: 'How Sessions Work',
        description:
          'Start warm, work efficiently, end with a trail. The session lifecycle is what separates power users from frustrated ones.',
        href: '/docs/foundations/session-lifecycle',
        duration: '6 min read',
        icon: Zap,
        personas: ['chatgpt-user', 'pm', 'developer'],
      },
      {
        id: 'memory-system',
        title: 'Memory: It Remembers You',
        description:
          'After a week of use, Claude knows your preferences, your projects, your writing style. The compound effect is real.',
        href: '/docs/foundations/memory-system',
        duration: '5 min read',
        icon: Brain,
        personas: ['chatgpt-user', 'pm', 'developer'],
      },
      {
        id: 'daily-practice',
        title: 'Daily Practice',
        description:
          'Morning standup, midday builds, end-of-day review. The rhythm that makes AI feel like a natural extension of your workflow.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min read',
        icon: Terminal,
        personas: ['chatgpt-user', 'pm', 'developer'],
      },
      {
        id: 'cost-optimization',
        title: 'Keep Costs Down',
        description:
          'Context window tricks, when to use /compact, how to pick the right model. Don\'t burn money on tokens you don\'t need.',
        href: '/docs/foundations/cost-optimization',
        duration: '5 min read',
        icon: CreditCard,
        personas: ['chatgpt-user', 'pm', 'developer'],
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
    nodes: [
      {
        id: 'skills',
        title: 'Create Custom Skills',
        description:
          'Turn any multi-step task into a single /command. Write a Markdown file, get a personal automation. No code required.',
        href: '/tutorials/your-first-skill',
        duration: '10 min tutorial',
        icon: Puzzle,
        personas: ['chatgpt-user', 'pm', 'developer'],
        badge: 'tutorial',
      },
      {
        id: 'hooks',
        title: 'Hooks: Automatic Quality Gates',
        description:
          'Run checks before every commit. Format code on save. Inject context automatically. Set it once, forget it.',
        href: '/docs/patterns/hooks',
        duration: '8 min read',
        icon: Zap,
        personas: ['developer'],
      },
      {
        id: 'sub-agents',
        title: 'Sub-Agents: Delegation',
        description:
          'Spin up specialized agents for focused tasks. A code reviewer, a test runner, a researcher. All working in parallel.',
        href: '/docs/patterns/agents',
        duration: '10 min read',
        icon: Bot,
        personas: ['developer'],
      },
      {
        id: 'mcp-servers',
        title: 'MCP: Connect Everything',
        description:
          'Claude talks to GitHub, Slack, Jira, Linear, your database. MCP is the protocol that makes Claude a hub, not a silo.',
        href: '/docs/patterns/mcp-servers',
        duration: '12 min read',
        icon: Server,
        personas: ['pm', 'developer'],
      },
      {
        id: 'computer-use',
        title: 'Computer Use (NEW)',
        description:
          'Claude can now see your screen, click buttons, and navigate apps. No setup. Just say "look at my screen" and it does.',
        href: '/tutorials/computer-use',
        duration: '5 min read',
        icon: Cpu,
        personas: ['chatgpt-user', 'pm', 'developer'],
        badge: 'new in 2026',
      },
    ],
  },
  {
    id: 'mastery',
    number: '06',
    title: 'Mastery',
    subtitle: 'Run Claude while you sleep. Lead your team to adopt it.',
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    nodes: [
      {
        id: 'autonomous-loops',
        title: 'Autonomous Loops',
        description:
          'Give Claude a task, go to sleep, wake up to a PR. Safety controls, progress reports, and automatic checkpoints.',
        href: '/docs/patterns/autonomous-loops',
        duration: '10 min read',
        icon: Zap,
        personas: ['developer'],
      },
      {
        id: 'pm-workflow',
        title: 'The PM Power Workflow',
        description:
          'Meeting prep, status reports, competitive analysis, decision memos. All without writing a line of code.',
        href: '/docs/workflows/pm-workflow',
        duration: '8 min read',
        icon: Briefcase,
        personas: ['pm'],
      },
      {
        id: 'team-adoption',
        title: 'Roll Out to Your Team',
        description:
          'Shared CLAUDE.md configs, onboarding guides, getting buy-in from skeptics. The playbook for team-wide adoption.',
        href: '/docs/workflows/team-adoption',
        duration: '10 min read',
        icon: Users,
        personas: ['pm', 'developer'],
      },
      {
        id: 'templates',
        title: 'Grab a Template & Ship',
        description:
          'Copy-paste CLAUDE.md for Next.js, Python, monorepos, PM workspaces. Battle-tested by real teams.',
        href: '/docs/templates',
        duration: 'Browse',
        icon: FileText,
        personas: ['chatgpt-user', 'pm', 'developer'],
      },
      {
        id: 'compare-tools',
        title: 'Compare Your Options',
        description:
          'Claude Code vs Cursor, vs Copilot, vs Codex, vs Windsurf. Honest side-by-side comparisons. No agenda.',
        href: '/docs/comparisons/vs-cursor',
        duration: 'Browse',
        icon: Shield,
        personas: ['chatgpt-user', 'developer'],
        isDecisionPoint: true,
        affiliateLabel: 'Try v0 by Vercel',
        affiliateHref: 'https://v0.dev?ref=claudecodeguide',
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

const STORAGE_KEY = 'ccg-journey-progress';

function loadProgress(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveProgress(completed: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch {
    // silently ignore if localStorage is full/blocked
  }
}

/* ─────────────────────────────────────────────
   Components
   ───────────────────────────────────────────── */

function PersonaCard({
  persona,
  isSelected,
  onSelect,
}: {
  persona: (typeof personas)[number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = persona.icon;
  return (
    <button
      onClick={onSelect}
      className={`group relative flex flex-col items-start rounded-xl border p-4 text-left transition-all sm:p-5 ${
        isSelected
          ? `${persona.color} ring-2 ring-current/20`
          : 'border-fd-border bg-fd-card hover:border-fd-muted-foreground/30 hover:bg-fd-accent'
      }`}
    >
      <Icon
        className={`mb-2 h-5 w-5 ${isSelected ? '' : 'text-fd-muted-foreground group-hover:text-fd-foreground'} transition-colors`}
      />
      <span className="font-display text-base font-normal tracking-tight text-fd-foreground">
        {persona.label}
      </span>
      <span className="mt-0.5 text-xs text-fd-muted-foreground">{persona.tagline}</span>
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-fd-primary text-fd-primary-foreground">
          <Check className="h-3 w-3" />
        </div>
      )}
    </button>
  );
}

/** Compact node for the bird's-eye map */
function MapNode({
  node,
  isHighlighted,
  isCompleted,
  onToggleComplete,
  accentColor,
}: {
  node: JourneyNode;
  isHighlighted: boolean;
  isCompleted: boolean;
  onToggleComplete: () => void;
  accentColor: string;
}) {
  const Icon = node.icon;

  return (
    <div
      className={`group relative rounded-lg border transition-all ${
        isHighlighted
          ? 'border-fd-border bg-fd-card shadow-sm hover:shadow-md'
          : 'border-fd-border/40 bg-fd-background/50 opacity-35'
      }`}
    >
      <div className="flex items-center gap-2.5 p-2.5">
        {/* Compact checkbox */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleComplete();
          }}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
            isCompleted
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-fd-border text-transparent hover:border-fd-foreground hover:text-fd-muted-foreground'
          }`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check className="h-2.5 w-2.5" />
        </button>

        {/* Icon */}
        <Icon className={`h-3.5 w-3.5 shrink-0 ${isHighlighted ? accentColor : 'text-fd-muted-foreground'}`} />

        {/* Title + badge */}
        <div className="flex-1 min-w-0">
          <Link
            href={node.href}
            className={`block text-xs font-medium text-fd-foreground leading-tight hover:underline truncate ${isCompleted ? 'line-through opacity-60' : ''}`}
          >
            {node.title}
          </Link>
        </div>

        {/* Badge */}
        {node.badge && (
          <span className="shrink-0 rounded-full bg-fd-accent px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-fd-muted-foreground">
            {node.badge}
          </span>
        )}
      </div>

      {/* Affiliate CTA — compact */}
      {node.isDecisionPoint && node.affiliateHref && isHighlighted && (
        <div className="border-t border-fd-border/50 px-2.5 py-1.5">
          <a
            href={node.affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {node.affiliateLabel}
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      )}
    </div>
  );
}

/** Expanded detail card shown below the map on hover/click */
function DetailPanel({
  node,
  accentColor,
}: {
  node: JourneyNode | null;
  accentColor: string;
}) {
  if (!node) return (
    <div className="rounded-xl border border-dashed border-fd-border bg-fd-background/50 p-6 text-center">
      <p className="text-sm text-fd-muted-foreground">Click any node above to see details</p>
    </div>
  );

  const Icon = node.icon;
  return (
    <div className="animate-fade-in rounded-xl border border-fd-border bg-fd-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background ${accentColor}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={node.href} className="font-medium text-fd-foreground hover:underline">
              {node.title}
            </Link>
            {node.duration && <span className="text-xs text-fd-muted-foreground">{node.duration}</span>}
            {node.badge && (
              <span className="rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
                {node.badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-fd-muted-foreground leading-relaxed">{node.description}</p>
          <Link
            href={node.href}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-fd-foreground hover:underline"
          >
            Go to guide <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-fd-accent">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums text-fd-muted-foreground">
        {completed}/{total}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function JourneyPage() {
  const [activePersona, setActivePersona] = useState<Persona>('chatgpt-user');
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(null);
  const [selectedSectionColor, setSelectedSectionColor] = useState('text-fd-muted-foreground');

  useEffect(() => {
    setCompleted(loadProgress());
    setMounted(true);
  }, []);

  function toggleComplete(nodeId: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      saveProgress(next);
      return next;
    });
  }

  // Count visible nodes for the active persona
  const visibleNodes = journeySections.flatMap((s) =>
    s.nodes.filter((n) => n.personas.includes(activePersona)),
  );
  const completedCount = visibleNodes.filter((n) => completed.has(n.id)).length;

  return (
    <div className="flex flex-col bg-fd-background">
      {/* ── Hero ── */}
      <section className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-6 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <div className="animate-slide-up-fade mb-3 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">Interactive learning map</span>
          </div>

          <h1 className="animate-slide-up-fade delay-100 font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
            Your Journey to Claude Code
          </h1>
          <p className="animate-slide-up-fade delay-200 mx-auto mt-3 max-w-xl text-base text-fd-muted-foreground">
            Pick who you are. See the whole map. Click nodes for details.
          </p>
        </div>
      </section>

      {/* ── Persona Selector (compact row) ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-4">
        <div className="flex items-center gap-3 justify-center">
          <span className="text-xs font-medium text-fd-muted-foreground">I am a</span>
          <div className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-muted p-1">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                    activePersona === p.id
                      ? 'bg-fd-background border border-fd-border text-fd-foreground shadow-sm'
                      : 'text-fd-muted-foreground hover:text-fd-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Progress Bar (compact) ── */}
      {mounted && (
        <section className="mx-auto w-full max-w-2xl px-6 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-fd-muted-foreground shrink-0">Progress</span>
            <ProgressBar completed={completedCount} total={visibleNodes.length} />
            {completedCount > 0 && completedCount === visibleNodes.length && (
              <span className="text-xs font-medium text-green-600 dark:text-green-400 shrink-0">
                Complete!
              </span>
            )}
          </div>
        </section>
      )}

      {/* ── Bird's-Eye Map ── */}
      <section className="w-full pb-6 overflow-hidden">
        {/* Scrollable container */}
        <div className="overflow-x-auto px-6 pb-4 scrollbar-thin">
          <div className="mx-auto flex gap-3 min-w-[900px] max-w-6xl">
            {journeySections.map((section, sIdx) => {
              const sectionNodes = section.nodes;
              const relevantNodes = sectionNodes.filter((n) =>
                n.personas.includes(activePersona),
              );
              const sectionCompleted = relevantNodes.filter((n) => completed.has(n.id)).length;

              return (
                <div key={section.id} className="flex items-stretch gap-3 flex-1">
                  {/* Stage column */}
                  <div className="flex flex-col min-w-[140px] flex-1">
                    {/* Stage header */}
                    <div className={`mb-2 rounded-lg border border-fd-border ${section.accentBg} p-2.5 text-center`}>
                      <div className={`font-mono text-xs font-bold ${section.colorClass}`}>
                        {section.number}
                      </div>
                      <div className="font-display text-sm font-medium text-fd-foreground mt-0.5 leading-tight">
                        {section.title}
                      </div>
                      {mounted && (
                        <div className="text-[10px] text-fd-muted-foreground mt-1 tabular-nums">
                          {sectionCompleted}/{relevantNodes.length} done
                        </div>
                      )}
                    </div>

                    {/* Nodes */}
                    <div className="space-y-1.5 flex-1">
                      {sectionNodes.map((node) => (
                        <div
                          key={node.id}
                          onClick={() => {
                            setSelectedNode(node);
                            setSelectedSectionColor(section.colorClass);
                          }}
                          className="cursor-pointer"
                        >
                          <MapNode
                            node={node}
                            isHighlighted={node.personas.includes(activePersona)}
                            isCompleted={completed.has(node.id)}
                            onToggleComplete={() => toggleComplete(node.id)}
                            accentColor={section.colorClass}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connector arrow between stages */}
                  {sIdx < journeySections.length - 1 && (
                    <div className="flex items-center shrink-0 px-0.5">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-4 bg-fd-border" />
                        <ArrowRight className="h-3 w-3 text-fd-border" />
                        <div className="w-px h-4 bg-fd-border" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Detail Panel (below map) ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <DetailPanel node={selectedNode} accentColor={selectedSectionColor} />
      </section>

      {/* ── Bottom CTA ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Ready to start?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            Click any node on the map above, or jump straight into the first tutorial.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tutorials/your-first-claude-md"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Start the first tutorial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/foundations/which-interface"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              Browse the docs
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
