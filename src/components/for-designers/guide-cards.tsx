'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, FolderOpen, Terminal } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';

type Journey = 'claude-ai' | 'co-work' | 'claude-code';

interface GuideEntry {
  slug: string;
  title: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  isNew?: boolean;
}

const ALL_GUIDES: Record<string, GuideEntry> = {
  'set-up-claude': {
    slug: 'set-up-claude',
    title: 'Set Up Claude for Your Design Work',
    duration: '10 min',
    difficulty: 'beginner',
    description: 'Give Claude permanent context about your role, your users, and your output preferences.',
  },
  'decode-a-brief': {
    slug: 'decode-a-brief',
    title: 'Decode Any Design Brief',
    duration: '15 min',
    difficulty: 'beginner',
    description: 'Turn a vague brief into 20 pointed questions before you open Figma.',
  },
  'write-a-sharper-brief': {
    slug: 'write-a-sharper-brief',
    title: 'Write a Sharper Brief',
    duration: '15 min',
    difficulty: 'beginner',
    description: 'Rewrite an incoming brief so the design direction is unambiguous before kickoff.',
  },
  'evaluate-your-designs': {
    slug: 'evaluate-your-designs',
    title: 'Evaluate Your Designs',
    duration: '20 min',
    difficulty: 'beginner',
    description: 'Get a structured three-perspective critique before you share your work.',
  },
  'heuristic-evaluation': {
    slug: 'heuristic-evaluation',
    title: 'Run a Heuristic Evaluation',
    duration: '25 min',
    difficulty: 'intermediate',
    description: "Evaluate any interface against all 10 of Nielsen's usability heuristics.",
  },
  'figma-for-ai-handoff': {
    slug: 'figma-for-ai-handoff',
    title: 'Prepare Your Figma for AI Handoff',
    duration: '20 min',
    difficulty: 'intermediate',
    description: 'Clean up layer naming, add annotations, and export tokens before handing off.',
  },
  'build-your-first-flow': {
    slug: 'build-your-first-flow',
    title: 'Build Your First Flow with Claude Code',
    duration: '30 min',
    difficulty: 'intermediate',
    description: 'Turn a design into a running React component using only plain English and a terminal.',
  },
  'get-started-with-claude-design': {
    slug: 'get-started-with-claude-design',
    title: 'Get Started with Claude Design',
    duration: '15 min',
    difficulty: 'beginner',
    description: "Use Anthropic's text-to-prototype tool to go from brief to interactive prototype.",
  },
  'research-synthesis': {
    slug: 'research-synthesis',
    title: 'Synthesize User Research with Claude',
    duration: '20 min',
    difficulty: 'beginner',
    description: 'Turn raw interview notes into prioritised findings in one session.',
  },
  'automate-design-tasks': {
    slug: 'automate-design-tasks',
    title: 'Automate Repetitive Design Tasks',
    duration: '20 min',
    difficulty: 'beginner',
    description: 'Build a personal prompt library for microcopy, specs, accessibility, and more.',
  },
  'git-for-designers': {
    slug: 'git-for-designers',
    title: 'Git for Designers',
    duration: '20 min',
    difficulty: 'beginner',
    description: 'Commits, branches, and pull requests explained for designers working with Claude Code.',
    isNew: true,
  },
};

type JourneyCluster = { label: string; slugs: string[] };

const JOURNEY_DATA: Array<{
  id: Journey;
  label: string;
  icon: React.ReactNode;
  env: string;
  tagline: string;
  note: string;
  clusters: JourneyCluster[];
}> = [
  {
    id: 'claude-ai',
    label: 'Claude.ai',
    icon: <Globe className="h-4 w-4" />,
    env: 'Online only',
    tagline: 'Chat in your browser. No setup. No local files.',
    note: 'Everything lives in the cloud. Claude.ai Projects let you share context across sessions. Great starting point for any designer.',
    clusters: [
      { label: 'Foundation', slugs: ['set-up-claude'] },
      { label: 'Brief work', slugs: ['decode-a-brief', 'write-a-sharper-brief'] },
      { label: 'Evaluation', slugs: ['evaluate-your-designs', 'heuristic-evaluation'] },
      { label: 'Research and automation', slugs: ['research-synthesis', 'get-started-with-claude-design', 'automate-design-tasks'] },
    ],
  },
  {
    id: 'co-work',
    label: 'Claude Co-Work',
    icon: <FolderOpen className="h-4 w-4" />,
    env: 'Local workspace',
    tagline: 'Claude Code in a local folder. Reads your files directly.',
    note: 'You create a folder on your machine. Claude can read your briefs, interview notes, and Figma exports from it. More context, better answers than chat alone.',
    clusters: [
      { label: 'Foundation', slugs: ['set-up-claude'] },
      { label: 'Brief work', slugs: ['decode-a-brief', 'write-a-sharper-brief'] },
      { label: 'Evaluation', slugs: ['evaluate-your-designs', 'heuristic-evaluation'] },
      { label: 'Production', slugs: ['figma-for-ai-handoff'] },
      { label: 'Research and automation', slugs: ['research-synthesis', 'automate-design-tasks'] },
    ],
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    icon: <Terminal className="h-4 w-4" />,
    env: 'Local + terminal',
    tagline: 'Full environment. Claude builds and runs code.',
    note: 'Git knowledge required. Start with Guide 11 before Guide 07 if you have not used Git before.',
    clusters: [
      { label: 'Foundation', slugs: ['set-up-claude', 'git-for-designers'] },
      { label: 'Brief work', slugs: ['decode-a-brief', 'write-a-sharper-brief'] },
      { label: 'Evaluation', slugs: ['evaluate-your-designs', 'heuristic-evaluation'] },
      { label: 'Production', slugs: ['figma-for-ai-handoff', 'build-your-first-flow', 'get-started-with-claude-design'] },
      { label: 'Research and automation', slugs: ['research-synthesis', 'automate-design-tasks'] },
    ],
  },
];

const ENV_BADGE_STYLES: Record<Journey, string> = {
  'claude-ai': 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
  'co-work': 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'claude-code': 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300',
};

const TAB_ACTIVE_BORDER: Record<Journey, string> = {
  'claude-ai': 'border-slate-500',
  'co-work': 'border-emerald-600',
  'claude-code': 'border-blue-700',
};

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${styles}`}>{level}</span>
  );
}

export function DesignerGuideCards() {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<Journey>('claude-ai');

  const activeJourney = JOURNEY_DATA.find((j) => j.id === journey)!;
  const journeyGuideCount = activeJourney.clusters.reduce((sum, c) => sum + c.slugs.length, 0);
  let guideIndex = 0;

  return (
    <section id="guides" className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-12 transition-all duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">02</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Pick your path
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Three ways to work with Claude. Select your path below to see the{' '}
            <span className="font-medium text-fd-foreground">{journeyGuideCount} guides</span>{' '}
            for that journey.
          </p>
        </div>

        {/* Journey tabs */}
        <div
          className={`mb-8 transition-all duration-500 delay-100 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div className="flex gap-1 border-b border-fd-border">
            {JOURNEY_DATA.map((j) => (
              <button
                key={j.id}
                onClick={() => {
                  setJourney(j.id);
                  trackEvent('designer_journey_tab_click', { journey: j.id, section: 'for-designers' });
                }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                  journey === j.id
                    ? `${TAB_ACTIVE_BORDER[j.id]} text-fd-foreground`
                    : 'border-transparent text-fd-muted-foreground hover:text-fd-foreground'
                }`}
              >
                {j.icon}
                {j.label}
              </button>
            ))}
          </div>
        </div>

        {/* Journey context */}
        <div
          className={`mb-10 rounded-xl border border-fd-border bg-fd-card p-5 transition-all duration-300 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${ENV_BADGE_STYLES[journey]}`}
            >
              {activeJourney.icon}
              {activeJourney.env}
            </span>
            <div>
              <p className="text-sm font-medium text-fd-foreground">{activeJourney.tagline}</p>
              <p className="mt-1 text-sm text-fd-muted-foreground">{activeJourney.note}</p>
            </div>
          </div>
        </div>

        {/* Guide clusters */}
        <div className="space-y-12">
          {activeJourney.clusters.map((cluster, ci) => {
            const clusterGuides = cluster.slugs
              .map((slug) => ALL_GUIDES[slug])
              .filter(Boolean);

            return (
              <div key={cluster.label}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
                  {cluster.label}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {clusterGuides.map((guide) => {
                    guideIndex++;
                    const num = guideIndex;
                    return (
                      <Link
                        key={guide.slug}
                        href={`/for-designers/${guide.slug}`}
                        onClick={() =>
                          trackEvent('designer_guide_card_click', {
                            guide_slug: guide.slug,
                            guide_title: guide.title,
                            cluster: cluster.label,
                            journey,
                            position: num,
                            section: 'for-designers',
                          })
                        }
                        className={`group flex flex-col rounded-xl border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-muted-foreground/30 hover:shadow-md duration-500 ${
                          inView ? 'animate-slide-up-fade' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(ci * 3 + (num % 3)) * 80 + 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-mono text-2xl font-light text-fd-muted-foreground/30">
                            {String(num).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {guide.isNew && (
                              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                                new
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-[11px] text-fd-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {guide.duration}
                            </span>
                            <DifficultyBadge level={guide.difficulty} />
                          </div>
                        </div>
                        <h3 className="mb-2 font-display text-base font-medium text-fd-foreground leading-snug group-hover:text-fd-primary transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-fd-muted-foreground leading-relaxed flex-1">
                          {guide.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          Open <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
