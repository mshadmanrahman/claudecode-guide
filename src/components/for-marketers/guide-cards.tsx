'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, PenLine, Megaphone, BarChart2 } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { MARKETER_GUIDES } from '@/lib/marketer-guides';

type Journey = 'content' | 'campaigns' | 'strategy';

interface GuideCluster {
  cluster: string;
  guideKeys: string[];
}

const JOURNEY_DATA: Array<{
  id: Journey;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  note: string;
  clusters: GuideCluster[];
}> = [
  {
    id: 'content',
    label: 'Content & copy',
    icon: <PenLine className="h-4 w-4" />,
    tagline: 'Social, blog, email',
    note: 'Brief Claude with your brand voice, audience, and angle. Get a first draft that needs editing, not a rewrite.',
    clusters: [
      {
        cluster: 'Content creation',
        guideKeys: [
          'give-claude-your-brand-voice',
          'write-social-media-posts-with-claude',
          'write-blog-posts-with-claude',
          'repurpose-content-with-claude',
        ],
      },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: <Megaphone className="h-4 w-4" />,
    tagline: 'Email, ads, landing pages',
    note: 'Campaign copy from a brief. Subject lines, ad variations, and email sequences.',
    clusters: [
      {
        cluster: 'Campaign copy',
        guideKeys: ['write-email-campaigns-with-claude', 'write-ad-copy-with-claude'],
      },
    ],
  },
  {
    id: 'strategy',
    label: 'Research & strategy',
    icon: <BarChart2 className="h-4 w-4" />,
    tagline: 'Before you write',
    note: 'Competitive landscape, customer language, and positioning angles. A first-pass to validate with primary research.',
    clusters: [
      {
        cluster: 'Research',
        guideKeys: ['do-market-research-with-claude', 'give-claude-your-brand-voice'],
      },
    ],
  },
];

const TAB_ACTIVE_BORDER: Record<Journey, string> = {
  content: 'border-violet-600',
  campaigns: 'border-rose-600',
  strategy: 'border-blue-600',
};

const ENV_BADGE_STYLES: Record<Journey, string> = {
  content: 'bg-violet-50 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  campaigns: 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  strategy: 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300',
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

export function MarketerGuideCards() {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<Journey>('content');

  const activeJourney = JOURNEY_DATA.find((j) => j.id === journey)!;
  const journeyGuideCount = activeJourney.clusters.reduce(
    (sum, c) => sum + c.guideKeys.length,
    0,
  );
  let guideIndex = 0;

  return (
    <section id="guides" className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-12 transition-all duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">02</span>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Pick your focus
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Three ways to use Claude for marketing work. Select a focus below to see the{' '}
            <span className="font-medium text-fd-foreground">{journeyGuideCount} guides</span> for
            that area.
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
                  trackEvent('marketer_journey_tab_click', {
                    journey: j.id,
                    section: 'for-marketers',
                  });
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
              {activeJourney.tagline}
            </span>
            <div>
              <p className="text-sm font-medium text-fd-foreground">{activeJourney.label}</p>
              <p className="mt-1 text-sm text-fd-muted-foreground">{activeJourney.note}</p>
            </div>
          </div>
        </div>

        {/* Guide clusters */}
        <div className="space-y-12">
          {activeJourney.clusters.map((cluster, ci) => {
            const clusterGuides = cluster.guideKeys
              .map((key) => MARKETER_GUIDES[key])
              .filter(Boolean);

            return (
              <div key={cluster.cluster}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
                  {cluster.cluster}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {clusterGuides.map((guide) => {
                    guideIndex++;
                    const num = guideIndex;
                    return (
                      <Link
                        key={guide.slug}
                        href={`/for-marketers/${guide.slug}`}
                        onClick={() =>
                          trackEvent('marketer_guide_card_click', {
                            guide_slug: guide.slug,
                            guide_title: guide.title,
                            cluster: cluster.cluster,
                            journey,
                            position: num,
                            section: 'for-marketers',
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
