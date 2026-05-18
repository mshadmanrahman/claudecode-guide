'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, FileText, BarChart2, Monitor } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { MICROSOFT_GUIDES } from '@/lib/microsoft-guides';

type MicrosoftJourney = 'word' | 'excel' | 'powerpoint';

interface GuideCluster {
  cluster: string;
  guideKeys: string[];
}

type JourneyData = {
  id: MicrosoftJourney;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  note: string;
  clusters: GuideCluster[];
};

const JOURNEY_DATA: JourneyData[] = [
  {
    id: 'word',
    label: 'Microsoft Word',
    icon: <FileText className="h-4 w-4" />,
    tagline: 'Draft, edit, improve',
    note: 'From blank page to polished document. Works for reports, memos, proposals, and everything in between.',
    clusters: [
      {
        cluster: 'Drafting',
        guideKeys: [
          'write-faster-in-word-with-claude',
          'edit-and-improve-word-documents-with-claude',
        ],
      },
      {
        cluster: 'Email',
        guideKeys: ['draft-outlook-emails-with-claude'],
      },
    ],
  },
  {
    id: 'excel',
    label: 'Microsoft Excel',
    icon: <BarChart2 className="h-4 w-4" />,
    tagline: 'Formulas and analysis',
    note: 'No formula knowledge needed. Describe what you want in plain English and Claude writes the formula.',
    clusters: [
      {
        cluster: 'Formulas and data',
        guideKeys: [
          'create-excel-formulas-with-claude',
          'analyze-data-in-excel-with-claude',
        ],
      },
    ],
  },
  {
    id: 'powerpoint',
    label: 'Microsoft PowerPoint',
    icon: <Monitor className="h-4 w-4" />,
    tagline: 'Decks and presentations',
    note: 'From blank deck to complete outline. Talking points, slide copy, and narrative flow.',
    clusters: [
      {
        cluster: 'Building decks',
        guideKeys: [
          'create-presentations-with-claude-for-powerpoint',
          'improve-powerpoint-slides-with-claude',
        ],
      },
    ],
  },
];

const TAB_ACTIVE_BORDER: Record<MicrosoftJourney, string> = {
  word: 'border-blue-600',
  excel: 'border-green-600',
  powerpoint: 'border-orange-600',
};

const JOURNEY_BADGE_STYLES: Record<MicrosoftJourney, string> = {
  word: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  excel: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  powerpoint: 'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
};

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${styles}`}>
      {level}
    </span>
  );
}

export function MicrosoftGuideCards() {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<MicrosoftJourney>('word');

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
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Pick your app
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Three Microsoft apps. Select the one you need below to see the{' '}
            <span className="font-medium text-fd-foreground">{journeyGuideCount} guides</span>{' '}
            for that app.
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
                  trackEvent('microsoft_journey_tab_click', {
                    journey: j.id,
                    section: 'for-microsoft',
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
              className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${JOURNEY_BADGE_STYLES[journey]}`}
            >
              {activeJourney.icon}
              {activeJourney.label}
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
            const clusterGuides = cluster.guideKeys
              .map((key) => MICROSOFT_GUIDES[key])
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
                        href={`/for-microsoft/${guide.slug}`}
                        onClick={() =>
                          trackEvent('microsoft_guide_card_click', {
                            guide_slug: guide.slug,
                            guide_title: guide.title,
                            cluster: cluster.cluster,
                            journey,
                            position: num,
                            section: 'for-microsoft',
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
