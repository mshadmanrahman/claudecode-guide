'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, Puzzle, LayoutGrid } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { CHROME_GUIDES } from '@/lib/chrome-guides';

type Journey = 'browser-basics' | 'chrome-extension' | 'google-workspace';

interface GuideEntry {
  slug: string;
  title: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
}

const ALL_GUIDES: Record<string, GuideEntry> = {
  'get-started-with-claude-in-your-browser': {
    slug: 'get-started-with-claude-in-your-browser',
    title: CHROME_GUIDES['get-started-with-claude-in-your-browser'].title,
    duration: CHROME_GUIDES['get-started-with-claude-in-your-browser'].duration,
    difficulty: CHROME_GUIDES['get-started-with-claude-in-your-browser'].difficulty,
    description: CHROME_GUIDES['get-started-with-claude-in-your-browser'].description,
  },
  'install-a-claude-chrome-extension': {
    slug: 'install-a-claude-chrome-extension',
    title: CHROME_GUIDES['install-a-claude-chrome-extension'].title,
    duration: CHROME_GUIDES['install-a-claude-chrome-extension'].duration,
    difficulty: CHROME_GUIDES['install-a-claude-chrome-extension'].difficulty,
    description: CHROME_GUIDES['install-a-claude-chrome-extension'].description,
  },
  'summarize-any-webpage-with-claude': {
    slug: 'summarize-any-webpage-with-claude',
    title: CHROME_GUIDES['summarize-any-webpage-with-claude'].title,
    duration: CHROME_GUIDES['summarize-any-webpage-with-claude'].duration,
    difficulty: CHROME_GUIDES['summarize-any-webpage-with-claude'].difficulty,
    description: CHROME_GUIDES['summarize-any-webpage-with-claude'].description,
  },
  'write-better-emails-in-gmail-with-claude': {
    slug: 'write-better-emails-in-gmail-with-claude',
    title: CHROME_GUIDES['write-better-emails-in-gmail-with-claude'].title,
    duration: CHROME_GUIDES['write-better-emails-in-gmail-with-claude'].duration,
    difficulty: CHROME_GUIDES['write-better-emails-in-gmail-with-claude'].difficulty,
    description: CHROME_GUIDES['write-better-emails-in-gmail-with-claude'].description,
  },
  'use-claude-with-google-docs': {
    slug: 'use-claude-with-google-docs',
    title: CHROME_GUIDES['use-claude-with-google-docs'].title,
    duration: CHROME_GUIDES['use-claude-with-google-docs'].duration,
    difficulty: CHROME_GUIDES['use-claude-with-google-docs'].difficulty,
    description: CHROME_GUIDES['use-claude-with-google-docs'].description,
  },
  'research-any-topic-with-claude': {
    slug: 'research-any-topic-with-claude',
    title: CHROME_GUIDES['research-any-topic-with-claude'].title,
    duration: CHROME_GUIDES['research-any-topic-with-claude'].duration,
    difficulty: CHROME_GUIDES['research-any-topic-with-claude'].difficulty,
    description: CHROME_GUIDES['research-any-topic-with-claude'].description,
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
    id: 'browser-basics',
    label: 'Browser basics',
    icon: <Globe className="h-4 w-4" />,
    env: 'Just claude.ai',
    tagline: 'No extensions. No installs. Just a browser tab.',
    note: 'Everything works from claude.ai opened in Chrome. The best starting point for anyone new to Claude.',
    clusters: [
      {
        label: 'Getting started',
        slugs: [
          'get-started-with-claude-in-your-browser',
          'summarize-any-webpage-with-claude',
          'write-better-emails-in-gmail-with-claude',
          'research-any-topic-with-claude',
        ],
      },
    ],
  },
  {
    id: 'chrome-extension',
    label: 'Chrome extension',
    icon: <Puzzle className="h-4 w-4" />,
    env: 'Extension installed',
    tagline: 'Claude one click away on any page.',
    note: 'Install a Claude extension and access it from your toolbar without switching tabs. Works on Gmail, Docs, news sites, anything.',
    clusters: [
      {
        label: 'Extension setup and use',
        slugs: ['install-a-claude-chrome-extension', 'summarize-any-webpage-with-claude'],
      },
    ],
  },
  {
    id: 'google-workspace',
    label: 'Google Workspace',
    icon: <LayoutGrid className="h-4 w-4" />,
    env: 'Gmail and Docs',
    tagline: 'Claude alongside the Google tools you already use.',
    note: 'Run Claude side by side with Gmail and Google Docs. Draft emails, write documents, and iterate without leaving your workflow.',
    clusters: [
      {
        label: 'Google tools',
        slugs: ['use-claude-with-google-docs', 'write-better-emails-in-gmail-with-claude'],
      },
    ],
  },
];

const ENV_BADGE_STYLES: Record<Journey, string> = {
  'browser-basics': 'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  'chrome-extension': 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  'google-workspace': 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300',
};

const TAB_ACTIVE_BORDER: Record<Journey, string> = {
  'browser-basics': 'border-orange-500',
  'chrome-extension': 'border-yellow-500',
  'google-workspace': 'border-blue-500',
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

export function ChromeGuideCards() {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<Journey>('browser-basics');

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
            Three ways to work with Claude in Chrome. Select your path below to see the{' '}
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
                  trackEvent('chrome_journey_tab_click', { journey: j.id, section: 'for-chrome' });
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
                        href={`/for-chrome/${guide.slug}`}
                        onClick={() =>
                          trackEvent('chrome_guide_card_click', {
                            guide_slug: guide.slug,
                            guide_title: guide.title,
                            cluster: cluster.label,
                            journey,
                            position: num,
                            section: 'for-chrome',
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
