'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, Monitor } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';

type Journey = 'web' | 'desktop';

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
    description: 'Turn a design into a running React component using plain English in the Code tab.',
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
    description: 'Turn raw interview notes into prioritized findings in one session.',
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
    id: 'web',
    label: 'On the web',
    icon: <Globe className="h-4 w-4" />,
    env: 'claude.ai',
    tagline: 'Open claude.ai in any browser. Nothing to install.',
    note: 'Paste or upload what you are working on. A Project keeps your working agreement and files together across conversations.',
    clusters: [
      { label: 'Foundation', slugs: ['set-up-claude'] },
      { label: 'Brief work', slugs: ['decode-a-brief', 'write-a-sharper-brief'] },
      { label: 'Evaluation', slugs: ['evaluate-your-designs', 'heuristic-evaluation'] },
      { label: 'Research and automation', slugs: ['research-synthesis', 'get-started-with-claude-design', 'automate-design-tasks'] },
    ],
  },
  {
    id: 'desktop',
    label: 'In the desktop app',
    icon: <Monitor className="h-4 w-4" />,
    env: 'Mac or Windows',
    tagline: 'The Claude desktop app. It can read a folder of your files.',
    note: 'Point Claude at a folder of briefs, interview notes and Figma exports, and it reads them directly instead of waiting for you to paste.',
    clusters: [
      { label: 'Foundation', slugs: ['set-up-claude'] },
      { label: 'Brief work', slugs: ['decode-a-brief', 'write-a-sharper-brief'] },
      { label: 'Evaluation', slugs: ['evaluate-your-designs', 'heuristic-evaluation'] },
      { label: 'Production', slugs: ['figma-for-ai-handoff'] },
      { label: 'Research and automation', slugs: ['research-synthesis', 'automate-design-tasks'] },
    ],
  },
];

const CODE_TAB_SLUGS = ['git-for-designers', 'build-your-first-flow'];

const ENV_BADGE_STYLES: Record<Journey, string> = {
  web: 'bg-[var(--code)] text-[var(--ink)]',
  desktop: 'bg-[var(--chip)] text-[var(--acc)]',
};

const TAB_ACTIVE_BORDER: Record<Journey, string> = {
  web: 'border-[var(--acc)]',
  desktop: 'border-[var(--acc)]',
};

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-[var(--chip)] text-[var(--acc)] '
      : 'bg-[var(--chip)] text-[var(--acc)] ';
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>{level}</span>
  );
}

export function DesignerGuideCards() {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<Journey>('web');

  const activeJourney = JOURNEY_DATA.find((j) => j.id === journey)!;
  const journeyGuideCount = activeJourney.clusters.reduce((sum, c) => sum + c.slugs.length, 0);
  let guideIndex = 0;

  return (
    <section id="guides" className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-12 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            Pick your path
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Two places to work with Claude. Pick yours to see the{' '}
            <span className="font-medium text-fd-foreground">{journeyGuideCount} guides</span>{' '}
            that work there.
          </p>
        </div>

        {/* Journey tabs */}
        <div
          className={`mb-8 transition-all motion-reduce:transition-none duration-500 delay-100 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div className="flex flex-wrap gap-1 border-b border-fd-border">
            {JOURNEY_DATA.map((j) => (
              <button
                key={j.id}
                onClick={() => {
                  setJourney(j.id);
                  trackEvent('designer_journey_tab_click', { journey: j.id, section: 'for-designers' });
                }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${
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
          className={`mb-10 glass rounded-xl p-5 transition-all motion-reduce:transition-none duration-300 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ENV_BADGE_STYLES[journey]}`}
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
                <p className="mb-4 text-xs font-semibold text-[var(--muted)]">
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
                        className={`group flex flex-col glass rounded-xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] transition-all motion-reduce:transition-none hover:border-fd-muted-foreground/30  duration-500 ${
                          inView ? 'animate-slide-up-fade' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(ci * 3 + (num % 3)) * 80 + 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-mono text-2xl font-light text-[var(--muted)]">
                            {String(num).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {guide.isNew && (
                              <span className="rounded-full bg-[var(--chip)] px-2 py-0.5 text-xs font-semibold text-[var(--acc)] ">
                                new
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-xs text-fd-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {guide.duration}
                            </span>
                            <DifficultyBadge level={guide.difficulty} />
                          </div>
                        </div>
                        <h3 className="mb-2 font-display text-base font-semibold text-fd-foreground leading-snug group-hover:text-fd-primary transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-fd-muted-foreground leading-relaxed flex-1">
                          {guide.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity motion-reduce:transition-none group-hover:opacity-100">
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

        {/* Code tab group */}
        <div className="mt-16 border-t border-fd-border pt-10">
          <h3 className="font-display text-xl font-semibold text-fd-foreground">
            When you want to ship code
          </h3>
          <p className="mt-2 max-w-xl text-sm text-fd-muted-foreground">
            These two build real code, so they run in the Code tab of the Claude desktop app
            (Claude Code), not in a regular conversation. Start with Git if you have not used it.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CODE_TAB_SLUGS.map((slug) => ALL_GUIDES[slug])
              .filter(Boolean)
              .map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/for-designers/${guide.slug}`}
                  onClick={() =>
                    trackEvent('designer_guide_card_click', {
                      guide_slug: guide.slug,
                      guide_title: guide.title,
                      cluster: 'code-tab',
                      journey: 'code-tab',
                      section: 'for-designers',
                    })
                  }
                  className="group flex flex-col glass rounded-xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] transition-colors motion-reduce:transition-none hover:border-fd-muted-foreground/30"
                >
                  <div className="mb-3 flex items-center justify-end gap-1.5">
                    <span className="flex items-center gap-1 text-xs text-fd-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {guide.duration}
                    </span>
                    <DifficultyBadge level={guide.difficulty} />
                  </div>
                  <h4 className="mb-2 font-display text-base font-semibold leading-snug text-fd-foreground transition-colors group-hover:text-fd-primary">
                    {guide.title}
                  </h4>
                  <p className="flex-1 text-sm leading-relaxed text-fd-muted-foreground">
                    {guide.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
