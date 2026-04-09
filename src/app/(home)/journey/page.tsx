'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
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
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

type Persona = 'chatgpt-user' | 'pm' | 'developer' | 'founder' | 'student' | 'designer';

interface JourneyNode {
  id: string;
  title: string;
  description: string;
  href: string;
  duration?: string;
  icon: React.ElementType;
  personas: Persona[];
  isDecisionPoint?: boolean;
  affiliateLabel?: string;
  affiliateHref?: string;
  badge?: string;
}

interface JourneySection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  colorClass: string;
  accentBg: string;
  accentBorder: string;
  dotColor: string;
  nodes: JourneyNode[];
}

/* ─────────────────────────────────────────────
   Persona definitions
   ───────────────────────────────────────────── */

const personas: {
  id: Persona;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: 'chatgpt-user',
    label: 'ChatGPT User',
    shortLabel: 'ChatGPT',
    tagline: "I've used AI chat. What's different here?",
    icon: MessageSquare,
    color: 'border-green-500/40 bg-green-500/8 text-green-700 dark:text-green-400',
  },
  {
    id: 'founder',
    label: 'Founder',
    shortLabel: 'Founder',
    tagline: 'I need to ship an MVP, fast.',
    icon: Lightbulb,
    color: 'border-orange-500/40 bg-orange-500/8 text-orange-700 dark:text-orange-400',
  },
  {
    id: 'pm',
    label: 'Product Manager',
    shortLabel: 'PM',
    tagline: "I don't write code. Can I still use this?",
    icon: Briefcase,
    color: 'border-blue-500/40 bg-blue-500/8 text-blue-700 dark:text-blue-400',
  },
  {
    id: 'designer',
    label: 'Designer',
    shortLabel: 'Designer',
    tagline: 'I do UX/UI. How does this fit my workflow?',
    icon: Palette,
    color: 'border-pink-500/40 bg-pink-500/8 text-pink-700 dark:text-pink-400',
  },
  {
    id: 'developer',
    label: 'Developer',
    shortLabel: 'Dev',
    tagline: 'I code. Show me what this can actually do.',
    icon: Code2,
    color: 'border-purple-500/40 bg-purple-500/8 text-purple-700 dark:text-purple-400',
  },
  {
    id: 'student',
    label: 'Student',
    shortLabel: 'Student',
    tagline: "I'm learning to code with AI help.",
    icon: GraduationCap,
    color: 'border-cyan-500/40 bg-cyan-500/8 text-cyan-700 dark:text-cyan-400',
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
    accentBorder: 'border-green-500/30',
    dotColor: 'bg-green-500',
    nodes: [
      {
        id: 'what-is-claude-code',
        title: 'What is Claude Code?',
        description:
          'Not another chatbot. Claude Code is an AI that lives in your computer, reads your files, runs commands, and builds things. Think ChatGPT... but it can actually DO stuff.',
        href: '/docs/foundations/what-is-claude-code',
        duration: '5 min read',
        icon: Sparkles,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
        badge: 'start here',
      },
      {
        id: 'choose-interface',
        title: 'Choose Your Interface',
        description:
          'Desktop app, web app, terminal, or IDE extension. Pick the one that feels right. The desktop app is the easiest start for non-coders.',
        href: '/docs/foundations/which-interface',
        duration: '3 min read',
        icon: Monitor,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
      },
      {
        id: 'pick-a-plan',
        title: 'Pick a Plan',
        description:
          "Free tier, Pro ($20/mo), or Max ($100/mo)? Here's what you actually need based on how you'll use it.",
        href: '/docs/comparisons/pro-vs-max',
        duration: '4 min read',
        icon: CreditCard,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
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
    accentBorder: 'border-blue-500/30',
    dotColor: 'bg-blue-500',
    nodes: [
      {
        id: 'install',
        title: 'Install Claude Code',
        description:
          'One command to install. Works on Mac, Windows, and Linux. If you chose the desktop app, just download and open it.',
        href: '/docs/foundations/installation',
        duration: '5 min',
        icon: Download,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
      },
      {
        id: 'first-claude-md',
        title: 'Write Your First CLAUDE.md',
        description:
          'The magic file that teaches Claude about YOUR work. Your role, your preferences, your project. This is what makes it personal.',
        href: '/tutorials/your-first-claude-md',
        duration: '5 min tutorial',
        icon: FileText,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
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
        personas: ['chatgpt-user', 'pm', 'student', 'founder', 'designer'],
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
    accentBorder: 'border-amber-500/30',
    dotColor: 'bg-amber-500',
    nodes: [
      {
        id: 'ship-landing-page',
        title: 'Ship a Landing Page',
        description:
          'From empty folder to live website in 30 minutes. No coding experience needed. Claude writes it, you review it.',
        href: '/tutorials/ship-a-landing-page',
        duration: '30 min tutorial',
        icon: Rocket,
        personas: ['chatgpt-user', 'developer', 'founder', 'student'],
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
        id: 'slide-deck-outline',
        title: 'Generate a Slide Deck Outline',
        description:
          'Turn rough ideas into a structured presentation. Great for design reviews, stakeholder updates, and pitch decks.',
        href: '/tutorials/slide-deck-outline',
        duration: '10 min tutorial',
        icon: LayoutDashboard,
        personas: ['designer', 'pm', 'founder'],
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
          'Push your creation to the internet. Railway or Vercel, one command. Share the link.',
        href: '/docs/workflows/daily-practice',
        duration: '5 min',
        icon: Globe,
        personas: ['chatgpt-user', 'developer', 'founder', 'student'],
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
    subtitle: "Go from \"that was cool\" to \"I can't work without this.\"",
    colorClass: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    dotColor: 'bg-purple-500',
    nodes: [
      {
        id: 'session-lifecycle',
        title: 'How Sessions Work',
        description:
          'Start warm, work efficiently, end with a trail. The session lifecycle separates power users from frustrated ones.',
        href: '/docs/foundations/session-lifecycle',
        duration: '6 min read',
        icon: Zap,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
      },
      {
        id: 'memory-system',
        title: 'Memory: It Remembers You',
        description:
          'After a week of use, Claude knows your preferences, your projects, your writing style. The compound effect is real.',
        href: '/docs/foundations/memory-system',
        duration: '5 min read',
        icon: Brain,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
      },
      {
        id: 'daily-practice',
        title: 'Daily Practice',
        description:
          'Morning standup, midday builds, end-of-day review. The rhythm that makes AI feel like a natural extension of your workflow.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min read',
        icon: Terminal,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
      },
      {
        id: 'cost-optimization',
        title: 'Keep Costs Down',
        description:
          "Context window tricks, when to use /compact, how to pick the right model. Don't burn money on tokens you don't need.",
        href: '/docs/foundations/cost-optimization',
        duration: '5 min read',
        icon: CreditCard,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student'],
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
    accentBorder: 'border-rose-500/30',
    dotColor: 'bg-rose-500',
    nodes: [
      {
        id: 'skills',
        title: 'Create Custom Skills',
        description:
          'Turn any multi-step task into a single /command. Write a Markdown file, get a personal automation. No code required.',
        href: '/tutorials/your-first-skill',
        duration: '10 min tutorial',
        icon: Puzzle,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
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
          'Claude talks to GitHub, Slack, Jira, Linear, Figma, your database. MCP is the protocol that makes Claude a hub, not a silo.',
        href: '/docs/patterns/mcp-servers',
        duration: '12 min read',
        icon: Server,
        personas: ['pm', 'developer', 'designer'],
      },
      {
        id: 'computer-use',
        title: 'Computer Use (NEW)',
        description:
          'Claude can see your screen, click buttons, and navigate apps. No setup. Just say "look at my screen" and it does.',
        href: '/tutorials/computer-use',
        duration: '5 min read',
        icon: Cpu,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
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
    accentBorder: 'border-indigo-500/30',
    dotColor: 'bg-indigo-500',
    nodes: [
      {
        id: 'autonomous-loops',
        title: 'Autonomous Loops',
        description:
          'Give Claude a task, go to sleep, wake up to a PR. Safety controls, progress reports, and automatic checkpoints.',
        href: '/docs/patterns/autonomous-loops',
        duration: '10 min read',
        icon: Zap,
        personas: ['developer', 'founder'],
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
        id: 'design-workflow',
        title: 'Design System Automation',
        description:
          'Generate component specs from Figma, audit for accessibility, maintain a living style guide. Claude as your design ops assistant.',
        href: '/docs/workflows/daily-practice',
        duration: '8 min read',
        icon: Palette,
        personas: ['designer'],
      },
      {
        id: 'team-adoption',
        title: 'Roll Out to Your Team',
        description:
          'Shared CLAUDE.md configs, onboarding guides, getting buy-in from skeptics. The playbook for team-wide adoption.',
        href: '/docs/workflows/team-adoption',
        duration: '10 min read',
        icon: Users,
        personas: ['pm', 'developer', 'founder'],
      },
      {
        id: 'templates',
        title: 'Grab a Template & Ship',
        description:
          'Copy-paste CLAUDE.md for Next.js, Python, monorepos, PM workspaces. Battle-tested by real teams.',
        href: '/docs/templates',
        duration: 'Browse',
        icon: FileText,
        personas: ['chatgpt-user', 'pm', 'developer', 'founder', 'student', 'designer'],
      },
      {
        id: 'compare-tools',
        title: 'Compare Your Options',
        description:
          'Claude Code vs Cursor, vs Copilot, vs Codex, vs Windsurf. Honest side-by-side comparisons.',
        href: '/docs/comparisons/vs-cursor',
        duration: 'Browse',
        icon: Shield,
        personas: ['chatgpt-user', 'developer', 'founder', 'student'],
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

function NodeRow({
  node,
  isHighlighted,
  isCompleted,
  isExpanded,
  onToggleComplete,
  onToggleExpand,
  accentColor,
  dotColor,
}: {
  node: JourneyNode;
  isHighlighted: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  onToggleComplete: () => void;
  onToggleExpand: () => void;
  accentColor: string;
  dotColor: string;
}) {
  const Icon = node.icon;

  return (
    <div
      className={`transition-all ${
        isHighlighted ? 'opacity-100' : 'opacity-25 pointer-events-none'
      }`}
    >
      {/* Collapsed row */}
      <button
        onClick={onToggleExpand}
        disabled={!isHighlighted}
        className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all sm:gap-4 sm:px-5 sm:py-4 ${
          isExpanded
            ? 'border-fd-border bg-fd-card shadow-sm'
            : 'border-fd-border/60 bg-fd-background hover:border-fd-border hover:bg-fd-card/50'
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleComplete();
          }}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            isCompleted
              ? `${dotColor} border-transparent text-white`
              : 'border-fd-border text-transparent hover:border-fd-foreground hover:text-fd-muted-foreground'
          }`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check className="h-3 w-3" />
        </button>

        {/* Icon */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-fd-border/60 ${
            isExpanded ? 'bg-fd-accent' : 'bg-fd-background'
          }`}
        >
          <Icon className={`h-4 w-4 ${accentColor}`} />
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <span
            className={`text-sm font-medium text-fd-foreground ${
              isCompleted ? 'line-through opacity-60' : ''
            }`}
          >
            {node.title}
          </span>
          {node.duration && !isExpanded && (
            <span className="ml-2 text-xs text-fd-muted-foreground hidden sm:inline">
              {node.duration}
            </span>
          )}
        </div>

        {/* Badge */}
        {node.badge && (
          <span className="shrink-0 rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
            {node.badge}
          </span>
        )}

        {/* Expand chevron */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded details (inline accordion) */}
      {isExpanded && (
        <div className="ml-6 sm:ml-10 border-l-2 border-fd-border/40 pl-5 sm:pl-7 pb-1 pt-3">
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            {node.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href={node.href}
              className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary px-4 py-2 text-xs font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              {node.duration ? node.duration : 'Read more'}
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
  const [activePersona, setActivePersona] = useState<Persona>('chatgpt-user');
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

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

  function toggleExpand(nodeId: string) {
    setExpandedNode((prev) => (prev === nodeId ? null : nodeId));
  }

  const visibleNodes = journeySections.flatMap((s) =>
    s.nodes.filter((n) => n.personas.includes(activePersona)),
  );
  const completedCount = visibleNodes.filter((n) => completed.has(n.id)).length;

  return (
    <div className="flex flex-col bg-fd-background">
      {/* ── Hero ── */}
      <section className="relative mx-auto w-full max-w-3xl px-6 pt-16 pb-8 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <div className="animate-slide-up-fade mb-3 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">Your personal learning path</span>
          </div>

          <h1 className="animate-slide-up-fade delay-100 font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-5xl">
            Your Journey to Claude Code
          </h1>
          <p className="animate-slide-up-fade delay-200 mx-auto mt-3 max-w-xl text-base text-fd-muted-foreground">
            Pick who you are. See your path. Expand any step for details.
          </p>
        </div>
      </section>

      {/* ── Persona Selector ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-6">
        <p className="text-xs font-medium text-fd-muted-foreground mb-3 text-center">
          I am a...
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {personas.map((p) => {
            const Icon = p.icon;
            const isActive = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActivePersona(p.id);
                  setExpandedNode(null);
                }}
                className={`group relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center transition-all ${
                  isActive
                    ? `${p.color} ring-2 ring-current/20`
                    : 'border-fd-border bg-fd-card hover:border-fd-muted-foreground/30'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? '' : 'text-fd-muted-foreground'} transition-colors`}
                />
                <span className="text-xs font-medium leading-tight text-fd-foreground">
                  {p.shortLabel}
                </span>
                {isActive && (
                  <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-fd-primary text-fd-primary-foreground">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {/* Tagline for active persona */}
        <p className="mt-3 text-center text-sm text-fd-muted-foreground italic">
          &ldquo;{personas.find((p) => p.id === activePersona)?.tagline}&rdquo;
        </p>
      </section>

      {/* ── Progress ── */}
      {mounted && (
        <section className="mx-auto w-full max-w-3xl px-6 pb-8">
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

      {/* ── Vertical Timeline ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/40 via-purple-500/40 to-indigo-500/40 sm:left-6" />

          <div className="space-y-10">
            {journeySections.map((section) => {
              const relevantNodes = section.nodes.filter((n) =>
                n.personas.includes(activePersona),
              );
              const sectionCompleted = relevantNodes.filter((n) =>
                completed.has(n.id),
              ).length;
              const allDone = relevantNodes.length > 0 && sectionCompleted === relevantNodes.length;

              return (
                <div key={section.id} className="relative">
                  {/* Stage header with dot on the line */}
                  <div className="flex items-center gap-4 mb-4 sm:gap-5">
                    {/* Dot on timeline */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12 ${
                        allDone
                          ? 'border-green-500 bg-green-500 text-white'
                          : `border-fd-border ${section.accentBg}`
                      }`}
                    >
                      {allDone ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className={`font-mono text-sm font-bold ${section.colorClass}`}>
                          {section.number}
                        </span>
                      )}
                    </div>

                    {/* Stage title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h2 className={`font-display text-lg font-semibold tracking-tight ${section.colorClass}`}>
                          {section.title}
                        </h2>
                        {mounted && (
                          <span className="text-xs text-fd-muted-foreground tabular-nums">
                            {sectionCompleted}/{relevantNodes.length}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-fd-muted-foreground">{section.subtitle}</p>
                    </div>
                  </div>

                  {/* Nodes */}
                  <div className="ml-5 space-y-2 sm:ml-6 pl-5 sm:pl-7">
                    {section.nodes.map((node) => (
                      <NodeRow
                        key={node.id}
                        node={node}
                        isHighlighted={node.personas.includes(activePersona)}
                        isCompleted={completed.has(node.id)}
                        isExpanded={expandedNode === node.id}
                        onToggleComplete={() => toggleComplete(node.id)}
                        onToggleExpand={() => toggleExpand(node.id)}
                        accentColor={section.colorClass}
                        dotColor={section.dotColor}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
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
            Click the first step on your journey, or jump straight into a tutorial.
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
