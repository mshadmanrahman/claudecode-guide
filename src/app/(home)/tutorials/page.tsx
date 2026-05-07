'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Play, Hammer, Sparkles, Briefcase, Rocket, Clock,
  TreePine, Network, Newspaper, Star, Lightbulb, BarChart2, BookOpen,
  Layout, Target, DollarSign, Monitor, Gamepad2, Image, Music,
  MessageCircle, Code2, Layers, GitPullRequest, X,
} from 'lucide-react';
import { DemoCard } from '@/components/demo-card';
import { EmailCapture } from '@/components/email-capture';
import { TutorialsNavFab } from '@/components/tutorials-nav-fab';

// ---- Types ----

interface TutorialCardData {
  title: string;
  description: string;
  duration: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate';
  outcome: string;
  href: string;
  icon: React.ReactNode;
  available: boolean;
}

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  audience: 'all' | 'beginner' | 'pm' | 'developer' | 'everyone';
  tutorials: TutorialCardData[];
}

type AudienceFilter = 'all' | 'beginner' | 'pm' | 'developer' | 'everyone';
type TimeFilter = 'all' | 'quick' | 'medium' | 'deep';

// ---- Data ----

const TUTORIAL_SECTIONS: TutorialSection[] = [
  {
    id: 'quick-wins',
    title: 'Quick wins',
    description: 'Fun stuff you can build in under 15 minutes. No coding, no terminal required.',
    audience: 'beginner',
    tutorials: [
      {
        title: 'Build a Quiz Game About Anything',
        description: 'Tell Claude a topic. Get a playable quiz with scoring, hints, and a leaderboard. Share it with friends.',
        duration: '10 min',
        durationMinutes: 10,
        difficulty: 'beginner',
        outcome: 'A working quiz game you can play in your browser and share with a link.',
        href: '/tutorials/quiz-game',
        icon: <Gamepad2 className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Make a Meme Generator',
        description: 'Describe the meme you want. Claude builds a page that creates memes with custom text on any image.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'beginner',
        outcome: 'A meme generator that runs locally. Upload any image, add text, download the result.',
        href: '/tutorials/meme-generator',
        icon: <Image className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Build a Spotify Playlist Analyzer',
        description: 'Paste your playlist. Get stats on mood, energy, tempo patterns, and a vibe summary you can share.',
        duration: '10 min',
        durationMinutes: 10,
        difficulty: 'beginner',
        outcome: "A visual breakdown of your playlist's vibe with shareable stats and recommendations.",
        href: '/tutorials/playlist-analyzer',
        icon: <Music className="h-5 w-5" />,
        available: true,
      },
    ],
  },
  {
    id: 'start-here',
    title: 'Start here',
    description: "No experience needed. Just a terminal and a Claude subscription. These are the ones I'd do first.",
    audience: 'beginner',
    tutorials: [
      {
        title: "Coming from ChatGPT? Here's What's Different",
        description: 'Claude feels different from ChatGPT. Here is why that happens, and how to fix it in five minutes so your preferences actually stick.',
        duration: '10 min',
        durationMinutes: 10,
        difficulty: 'beginner',
        outcome: 'A CLAUDE.md that loads your preferences automatically, so Claude knows who you are before you type your first message.',
        href: '/tutorials/coming-from-chatgpt',
        icon: <MessageCircle className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Build Your First CLAUDE.md in 5 Minutes',
        description: 'The single most important thing you can do. Create the file that turns Claude Code from generic to personalized.',
        duration: '5 min',
        durationMinutes: 5,
        difficulty: 'beginner',
        outcome: 'A working CLAUDE.md that knows your project, your stack, and your preferences.',
        href: '/tutorials/your-first-claude-md',
        icon: <Hammer className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Ship a Landing Page in 30 Minutes',
        description: 'Go from empty folder to a live website on the internet. No coding experience required.',
        duration: '30 min',
        durationMinutes: 30,
        difficulty: 'beginner',
        outcome: 'A deployed website on Vercel that you built with Claude Code.',
        href: '/tutorials/ship-a-landing-page',
        icon: <Rocket className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Create Your First Skill',
        description: 'Turn a task you do every week into a single command. Copy, paste, done.',
        duration: '10 min',
        durationMinutes: 10,
        difficulty: 'beginner',
        outcome: 'A reusable /skill command that automates a real task in your workflow.',
        href: '/tutorials/your-first-skill',
        icon: <Sparkles className="h-5 w-5" />,
        available: true,
      },
    ],
  },
  {
    id: 'new-features',
    title: 'New features',
    description: 'The latest Claude Code capabilities. Worth trying if you want to see how fast things are moving.',
    audience: 'beginner',
    tutorials: [
      {
        title: 'Let Claude See Your Screen in 5 Minutes',
        description: "Claude can now look at your screen, click buttons, and navigate apps. No setup. The feature that makes non-coders say 'wait, WHAT?'",
        duration: '5 min',
        durationMinutes: 5,
        difficulty: 'beginner',
        outcome: "Claude seeing your screen and interacting with your apps. You'll never describe a visual bug in words again.",
        href: '/tutorials/computer-use',
        icon: <Monitor className="h-5 w-5" />,
        available: true,
      },
    ],
  },
  {
    id: 'no-terminal',
    title: 'No terminal required',
    description: "These run entirely in the Claude.ai web app. Open a tab, paste a prompt, you're done.",
    audience: 'beginner',
    tutorials: [
      {
        title: 'Build a Stakeholder Map in 15 Minutes',
        description: 'Turn a messy list of names and roles into a structured stakeholder map, communication plan, and outreach messages.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'beginner',
        outcome: 'A stakeholder map, weekly communication plan, and a drafted outreach message, ready to paste into Notion.',
        href: '/tutorials/stakeholder-map',
        icon: <Network className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Automate Your Newsletter in 10 Minutes',
        description: 'Feed Claude your sources (URLs, topics, or tweets) and get a formatted newsletter draft ready to send.',
        duration: '10 min',
        durationMinutes: 10,
        difficulty: 'beginner',
        outcome: 'A full newsletter draft formatted for Substack or Beehiiv, plus a reusable prompt for every future issue.',
        href: '/tutorials/newsletter-automator',
        icon: <Newspaper className="h-5 w-5" />,
        available: true,
      },
    ],
  },
  {
    id: 'for-pms',
    title: 'For Product Managers',
    description: "You don't need to write a single line of code. These are built around how PMs actually spend their time.",
    audience: 'pm',
    tutorials: [
      {
        title: 'Product Discovery with Opportunity Solution Trees',
        description: "Use Teresa Torres' OST framework to go from raw customer interviews to validated experiments. No sticky notes required.",
        duration: '20 min',
        durationMinutes: 20,
        difficulty: 'intermediate',
        outcome: 'A living Opportunity Solution Tree with mapped opportunities, solutions, and experiment designs, built from real interview data.',
        href: '/tutorials/product-discovery-ost',
        icon: <TreePine className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Turn Meeting Notes into Jira Tickets',
        description: 'Paste your messy meeting notes. Get structured tickets with acceptance criteria. Never transcribe by hand again.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'intermediate',
        outcome: 'A skill that converts meeting notes into formatted Jira tickets automatically.',
        href: '/tutorials/meeting-to-jira',
        icon: <Briefcase className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Build a Weekly Status Report Generator',
        description: 'Pull from your projects and generate a stakeholder-ready status report in seconds.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'intermediate',
        outcome: 'A /weekly-status skill that generates your report from real data sources.',
        href: '/tutorials/weekly-status',
        icon: <Briefcase className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Run a Competitive Analysis in 30 Minutes',
        description: 'Feed Claude your product and competitor info. Get a structured matrix and clear positioning gaps.',
        duration: '30 min',
        durationMinutes: 30,
        difficulty: 'intermediate',
        outcome: 'A comparison matrix, positioning gap analysis, and a strategic recommendation ready to share.',
        href: '/tutorials/competitive-analysis',
        icon: <BarChart2 className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Turn Any Decision into a Clear Memo',
        description: 'Brain dump a messy decision. Get a structured memo with options, recommendation, and risks.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'intermediate',
        outcome: 'A decision memo ready for stakeholder review. Problem, options, recommendation, risk register.',
        href: '/tutorials/decision-memo',
        icon: <Lightbulb className="h-5 w-5" />,
        available: true,
      },
    ],
  },
  {
    id: 'for-developers',
    title: 'For Developers',
    description: "You already know the stack. These show you how to use Claude Code the way senior engineers actually use it, not how the demos make it look.",
    audience: 'developer',
    tutorials: [
      {
        title: 'Start a Next.js Project with Claude Code',
        description: 'Scaffold, configure, build, test, and deploy a production-ready Next.js 16 App Router project. TypeScript strict mode, Tailwind CSS 4, Vitest, and Vercel in one session.',
        duration: '20 min',
        durationMinutes: 20,
        difficulty: 'intermediate',
        outcome: 'A live Next.js 16 app on Vercel with a CLAUDE.md, passing tests, and zero TypeScript errors.',
        href: '/tutorials/nextjs-with-claude',
        icon: <Layers className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Debug and Refactor Like a Senior Dev',
        description: 'Feed Claude a real stack trace and watch it trace through your codebase. Refactor components with tests staying green. Build a debugging habit that scales.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'intermediate',
        outcome: 'A CLAUDE.md with project-specific debugging rules, a refactored component, and a repeatable workflow for any bug.',
        href: '/tutorials/debug-and-refactor',
        icon: <Code2 className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'PR Reviews That Actually Find Bugs',
        description: 'Stop rubber-stamping PRs. Use Claude to catch real bugs, identify untested code paths, and write review comments that actually help.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'intermediate',
        outcome: 'A repeatable PR review workflow using gh CLI and Claude: diff analysis, missing test identification, and drafted review comments ready to post.',
        href: '/tutorials/pr-review-workflow',
        icon: <GitPullRequest className="h-5 w-5" />,
        available: true,
      },
    ],
  },
  {
    id: 'for-everyone',
    title: 'For everyone',
    description: 'No code, no terminal. Just Claude doing useful work for you. Documents, data, people stuff.',
    audience: 'everyone',
    tutorials: [
      {
        title: 'Write a Performance Review in 20 Minutes',
        description: 'Paste your messy notes about a team member. Get a structured, balanced, specific review ready to submit.',
        duration: '20 min',
        durationMinutes: 20,
        difficulty: 'beginner',
        outcome: 'A complete performance review across all dimensions, ready to copy into your HR system.',
        href: '/tutorials/performance-review',
        icon: <Star className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Turn 5 Articles into a Research Briefing Doc',
        description: 'Paste your sources. Get a structured briefing with key insights, tensions, and implications.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'beginner',
        outcome: 'A one-page briefing doc ready to share with your team or leadership. Sourced, synthesised, and clear.',
        href: '/tutorials/research-briefing',
        icon: <BookOpen className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Build a Slide Deck Outline in 15 Minutes',
        description: 'Tell Claude your goal and content. Get a narrative arc, slide-by-slide outline, and speaker notes.',
        duration: '15 min',
        durationMinutes: 15,
        difficulty: 'beginner',
        outcome: 'A complete deck outline with a clear narrative and speaker notes, before you open PowerPoint.',
        href: '/tutorials/slide-deck-outline',
        icon: <Layout className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Build a Job Application Assistant',
        description: 'Paste the job description and your background. Get a match analysis, tailored cover letter, and interview prep.',
        duration: '20 min',
        durationMinutes: 20,
        difficulty: 'beginner',
        outcome: 'A tailored cover letter and answers to the top 3 interview questions, specific to the role.',
        href: '/tutorials/job-application-assistant',
        icon: <Target className="h-5 w-5" />,
        available: true,
      },
      {
        title: 'Build a Personal Finance Manager',
        description: 'Paste your spending data. Get a breakdown, honest analysis, savings plan, and monthly review template.',
        duration: '20 min',
        durationMinutes: 20,
        difficulty: 'beginner',
        outcome: 'A realistic savings plan with specific targets and a monthly review routine you will actually follow.',
        href: '/tutorials/personal-finance-manager',
        icon: <DollarSign className="h-5 w-5" />,
        available: true,
      },
    ],
  },
];

const TOTAL_TUTORIALS = TUTORIAL_SECTIONS.reduce((sum, s) => sum + s.tutorials.length, 0);

const NAV_SECTIONS = TUTORIAL_SECTIONS.map((s) => ({ id: s.id, title: s.title }));

// ---- TutorialCard ----

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  outcome: string;
  href: string;
  icon: React.ReactNode;
  available: boolean;
}

function TutorialCard({ title, description, duration, difficulty, outcome, href, icon, available }: TutorialCardProps) {
  const content = (
    <div className={`group relative flex flex-col gap-4 rounded-xl border border-fd-border bg-fd-card p-6 transition-all ${available ? 'hover:border-fd-muted-foreground/30 hover:bg-fd-accent cursor-pointer' : ''}`}>
      {/* Badge row */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${difficulty === 'beginner' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'}`}>
          {difficulty}
        </span>
        {!available && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
            coming soon
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-fd-foreground group-hover:underline">{title}</h3>
          <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
        </div>
        {available && (
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {/* Outcome */}
      <div className="rounded-lg border border-fd-border bg-fd-background px-4 py-2.5">
        <p className="text-xs font-medium text-fd-muted-foreground">
          What you&apos;ll have at the end:
        </p>
        <p className="mt-0.5 text-sm text-fd-foreground">{outcome}</p>
      </div>
    </div>
  );

  if (available) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

// ---- Filter helpers ----

function matchesAudience(section: TutorialSection, filter: AudienceFilter): boolean {
  if (filter === 'all') return true;
  return section.audience === filter;
}

function matchesTime(tutorial: TutorialCardData, filter: TimeFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'quick') return tutorial.durationMinutes < 15;
  if (filter === 'medium') return tutorial.durationMinutes >= 15 && tutorial.durationMinutes <= 20;
  if (filter === 'deep') return tutorial.durationMinutes >= 30;
  return true;
}

// ---- FilterBar ----

interface FilterBarProps {
  audienceFilter: AudienceFilter;
  timeFilter: TimeFilter;
  onAudienceChange: (v: AudienceFilter) => void;
  onTimeChange: (v: TimeFilter) => void;
  onClear: () => void;
  visibleCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

const AUDIENCE_OPTIONS: { value: AudienceFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner-Friendly' },
  { value: 'pm', label: 'PM' },
  { value: 'developer', label: 'Developer' },
  { value: 'everyone', label: 'Everyone' },
];

const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'quick', label: 'Quick (<15 min)' },
  { value: 'medium', label: 'Medium (15-20 min)' },
  { value: 'deep', label: 'Deep (30 min)' },
];

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-fd-primary text-fd-primary-foreground'
          : 'bg-fd-accent text-fd-muted-foreground hover:text-fd-foreground'
      }`}
    >
      {children}
    </button>
  );
}

function FilterBar({
  audienceFilter,
  timeFilter,
  onAudienceChange,
  onTimeChange,
  onClear,
  visibleCount,
  totalCount,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="sticky top-14 z-20 border-b border-fd-border bg-fd-background/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-3xl px-6 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            {/* Audience group */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="w-16 shrink-0 text-xs text-fd-muted-foreground">Audience:</span>
              {AUDIENCE_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={audienceFilter === opt.value}
                  onClick={() => onAudienceChange(opt.value)}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>
            {/* Time group */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="w-16 shrink-0 text-xs text-fd-muted-foreground">Time:</span>
              {TIME_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={timeFilter === opt.value}
                  onClick={() => onTimeChange(opt.value)}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>
          </div>

          {/* Count + Clear */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-fd-muted-foreground whitespace-nowrap">
              {hasActiveFilters
                ? `Showing ${visibleCount} of ${totalCount} tutorials`
                : `${totalCount} tutorials`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="flex items-center gap-1 text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Animated section wrapper ----

function SectionWrapper({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!ref.current) return;

    if (visible) {
      // Measure the full height before transitioning in
      const el = ref.current;
      el.style.height = 'auto';
      const fullHeight = el.scrollHeight;
      setHeight(fullHeight);
      // Let it settle to auto after transition
      const timer = setTimeout(() => setHeight('auto'), 350);
      return () => clearTimeout(timer);
    } else {
      // Snapshot current height then collapse
      if (ref.current) {
        setHeight(ref.current.scrollHeight);
        // Use rAF to allow browser to paint the height before animating to 0
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight(0);
          });
        });
      }
    }
  }, [visible, mounted]);

  return (
    <div
      ref={ref}
      style={{
        height: mounted ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
        overflow: 'hidden',
        transition: mounted ? 'height 300ms ease, opacity 300ms ease' : undefined,
        opacity: mounted ? (visible ? 1 : 0) : 1,
      }}
    >
      {children}
    </div>
  );
}

// ---- Page ----

export default function TutorialsPage() {
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const hasActiveFilters = audienceFilter !== 'all' || timeFilter !== 'all';

  const clearFilters = useCallback(() => {
    setAudienceFilter('all');
    setTimeFilter('all');
  }, []);

  // Compute visible tutorials count
  const visibleCount = TUTORIAL_SECTIONS.reduce((total, section) => {
    const sectionVisible = matchesAudience(section, audienceFilter);
    if (!sectionVisible) return total;
    const visibleInSection = section.tutorials.filter((t) =>
      matchesTime(t, timeFilter)
    ).length;
    return total + visibleInSection;
  }, 0);

  return (
    <div className="flex flex-col bg-fd-background">
      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-accent px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            <Play className="h-3 w-3" />
            Hands-on learning
          </span>
        </div>
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Stop reading. Start building.
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground max-w-2xl mx-auto">
          Each one is a guided micro-project. You paste commands, see real output, and walk away with something that works. Most are 5-15 minutes.
        </p>

        <div className="mt-8 mx-auto max-w-xl text-left">
          <DemoCard title="What a tutorial feels like" loop={true} steps={[
            { type: 'cmd', text: 'claude' },
            { type: 'success', text: '✓ Claude Code ready' },
            { type: 'cmd', text: '"Create a landing page for my portfolio"', delay: 800 },
            { type: 'out', text: 'Planning: hero section, about, projects grid, contact...' },
            { type: 'success', text: '✓ Created index.html (beautiful gradient design)' },
            { type: 'success', text: '✓ Created styles.css (responsive, dark mode)' },
            { type: 'cmd', text: '"deploy it"', delay: 800 },
            { type: 'success', text: '✓ Deployed to https://your-site.vercel.app' },
            { type: 'warn', text: "→ From zero to live website. That's one tutorial." },
          ]} />
        </div>
      </section>

      {/* Sticky filter bar */}
      <FilterBar
        audienceFilter={audienceFilter}
        timeFilter={timeFilter}
        onAudienceChange={setAudienceFilter}
        onTimeChange={setTimeFilter}
        onClear={clearFilters}
        visibleCount={visibleCount}
        totalCount={TOTAL_TUTORIALS}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Tutorials grid */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24 pt-8">
        {TUTORIAL_SECTIONS.map((section) => {
          const sectionVisible = matchesAudience(section, audienceFilter);
          const visibleTutorials = section.tutorials.filter((t) =>
            matchesTime(t, timeFilter)
          );
          const showSection = sectionVisible && visibleTutorials.length > 0;

          return (
            <SectionWrapper key={section.id} visible={showSection}>
              <div id={section.id} className="mb-12">
                <div className="mb-8">
                  <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-fd-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <div className="grid gap-4">
                  {visibleTutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.href} {...tutorial} />
                  ))}
                </div>
              </div>
            </SectionWrapper>
          );
        })}

        {/* Empty state */}
        {visibleCount === 0 && hasActiveFilters && (
          <div className="py-16 text-center">
            <p className="text-fd-muted-foreground">No tutorials match those filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-fd-foreground underline underline-offset-2 hover:no-underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Railway deployment CTA */}
        <div className="mt-16 rounded-xl border border-fd-border bg-fd-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-fd-foreground">Built something and want it live?</p>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                Railway gives you one-click deploys from GitHub with a generous free tier. No config files.
              </p>
            </div>
            <a
              href="https://railway.com/?referralCode=shadman"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-4 py-2 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              Deploy your first app on Railway
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Email capture CTA */}
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-fd-border bg-fd-card p-10 text-center">
            <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
              Want more?
            </h2>
            <p className="mt-3 text-fd-muted-foreground max-w-lg mx-auto">
              I add new tutorials regularly. Subscribe and I&apos;ll tell you when they land.
            </p>
            <div className="mt-6 mx-auto max-w-md">
              <EmailCapture />
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Or work through the 9-step Interactive Guide
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Floating section nav */}
      <TutorialsNavFab sections={NAV_SECTIONS} />
    </div>
  );
}
