'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, Monitor } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { DESIGNERS_HUB, type DesignersHubCopy } from '@/lib/hubs/designers';
import { localePrefix, type Locale } from '@/lib/i18n/locale';

type Journey = 'web' | 'desktop';

/** The fields a card needs, so a page can pass translated guides. */
export interface GuideEntry {
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

/** Icon and guide slugs per journey, clusters in the same order as `DESIGNERS_HUB.cards.journeys[].clusters`. */
const JOURNEY_SHAPE: Record<Journey, { icon: React.ReactNode; clusters: string[][] }> = {
  desktop: {
    icon: <Monitor className="h-4 w-4" />,
    clusters: [
      ['set-up-claude'],
      ['decode-a-brief', 'write-a-sharper-brief'],
      ['evaluate-your-designs', 'heuristic-evaluation'],
      ['figma-for-ai-handoff'],
      ['research-synthesis', 'automate-design-tasks'],
    ],
  },
  web: {
    icon: <Globe className="h-4 w-4" />,
    clusters: [
      ['set-up-claude'],
      ['decode-a-brief', 'write-a-sharper-brief'],
      ['evaluate-your-designs', 'heuristic-evaluation'],
      ['research-synthesis', 'get-started-with-claude-design', 'automate-design-tasks'],
    ],
  },
};

interface DesignerGuideCardsProps {
  locale?: Locale;
  copy?: DesignersHubCopy['cards'];
  /** Per-slug overrides for title, description and duration, used by the Bangla hub. */
  guides?: Partial<Record<string, Pick<GuideEntry, 'title' | 'description' | 'duration'>>>;
}

const CODE_TAB_SLUGS = ['git-for-designers', 'build-your-first-flow'];

const ENV_BADGE_STYLES: Record<Journey, string> = {
  web: 'bg-[var(--code)] text-[var(--ink)]',
  desktop: 'bg-[var(--chip)] text-[var(--acc)]',
};

const TAB_ACTIVE_BORDER: Record<Journey, string> = {
  web: 'border-[var(--acc)]',
  desktop: 'border-[var(--acc)]',
};

function CardImage({ slug }: { slug: string }) {
  return (
    <span className="relative -mx-6 -mt-6 mb-5 block aspect-[2/1] overflow-hidden">
      <Image
        src={`/for-designers/${slug}.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 470px, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </span>
  );
}

function DifficultyBadge({ level, label }: { level: 'beginner' | 'intermediate'; label: string }) {
  const styles =
    level === 'beginner'
      ? 'bg-[var(--chip)] text-[var(--acc)] '
      : 'bg-[var(--chip)] text-[var(--acc)] ';
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>{label}</span>
  );
}

export function DesignerGuideCards({ locale = 'en', copy = DESIGNERS_HUB.cards, guides = {} }: DesignerGuideCardsProps) {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<Journey>('desktop');
  const prefix = localePrefix(locale);

  const guideFor = (slug: string): GuideEntry | undefined =>
    ALL_GUIDES[slug] && { ...ALL_GUIDES[slug], ...guides[slug] };
  const journeyData = copy.journeys.map((j) => {
    const shape = JOURNEY_SHAPE[j.id as Journey];
    return {
      ...j,
      id: j.id as Journey,
      icon: shape.icon,
      clusters: shape.clusters.map((slugs, i) => ({ label: j.clusters[i] ?? '', slugs })),
    };
  });
  const activeJourney = journeyData.find((j) => j.id === journey)!;
  const journeyGuideCount = activeJourney.clusters.reduce((sum, c) => sum + c.slugs.length, 0);
  let guideIndex = 0;

  return (
    <section id="guides" className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-12 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            {copy.introBefore}{' '}
            <span className="font-medium text-fd-foreground">
              {copy.introCount.replace('{n}', String(journeyGuideCount))}
            </span>{' '}
            {copy.introAfter}
          </p>
        </div>

        {/* Journey tabs */}
        <div
          className={`mb-8 transition-all motion-reduce:transition-none duration-500 delay-100 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div className="flex flex-wrap gap-1 border-b border-fd-border">
            {journeyData.map((j) => (
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
              .map(guideFor)
              .filter((g): g is GuideEntry => Boolean(g));

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
                        href={`${prefix}/for-designers/${guide.slug}`}
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
                        className={`group flex flex-col overflow-hidden glass rounded-xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] transition-all motion-reduce:transition-none hover:border-fd-muted-foreground/30  duration-500 ${
                          inView ? 'animate-slide-up-fade' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(ci * 3 + (num % 3)) * 80 + 100}ms` }}
                      >
                        <CardImage slug={guide.slug} />
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-mono text-2xl font-light text-[var(--muted)]">
                            {String(num).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {guide.isNew && (
                              <span className="rounded-full bg-[var(--chip)] px-2 py-0.5 text-xs font-semibold text-[var(--acc)] ">
                                {copy.isNew}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-xs text-fd-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {guide.duration}
                            </span>
                            <DifficultyBadge level={guide.difficulty} label={copy.difficulty[guide.difficulty]} />
                          </div>
                        </div>
                        <h3 className="mb-2 font-display text-base font-semibold text-fd-foreground leading-snug group-hover:text-fd-primary transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-fd-muted-foreground leading-relaxed flex-1">
                          {guide.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity motion-reduce:transition-none group-hover:opacity-100">
                          {copy.open} <ArrowRight className="h-3.5 w-3.5" />
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
            {copy.codeTabHeading}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-fd-muted-foreground">
            {copy.codeTabLead}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CODE_TAB_SLUGS.map(guideFor)
              .filter((g): g is GuideEntry => Boolean(g))
              .map((guide) => (
                <Link
                  key={guide.slug}
                  href={`${prefix}/for-designers/${guide.slug}`}
                  onClick={() =>
                    trackEvent('designer_guide_card_click', {
                      guide_slug: guide.slug,
                      guide_title: guide.title,
                      cluster: 'code-tab',
                      journey: 'code-tab',
                      section: 'for-designers',
                    })
                  }
                  className="group flex flex-col overflow-hidden glass rounded-xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] transition-colors motion-reduce:transition-none hover:border-fd-muted-foreground/30"
                >
                  <CardImage slug={guide.slug} />
                  <div className="mb-3 flex items-center justify-end gap-1.5">
                    <span className="flex items-center gap-1 text-xs text-fd-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {guide.duration}
                    </span>
                    <DifficultyBadge level={guide.difficulty} label={copy.difficulty[guide.difficulty]} />
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
