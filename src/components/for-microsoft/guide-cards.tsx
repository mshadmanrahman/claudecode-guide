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
  word: 'border-[var(--acc)]',
  excel: 'border-[var(--acc)]',
  powerpoint: 'border-[var(--acc)]',
};

const JOURNEY_BADGE_STYLES: Record<MicrosoftJourney, string> = {
  word: 'bg-[var(--chip)] text-[var(--acc)]  ',
  excel: 'bg-[var(--chip)] text-[var(--acc)]  ',
  powerpoint: 'bg-[var(--chip)] text-[var(--acc)]  ',
};

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-[var(--chip)] text-[var(--acc)] '
      : 'bg-[var(--chip)] text-[var(--acc)] ';
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>
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
          className={`mb-12 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
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
          className={`mb-8 transition-all motion-reduce:transition-none duration-500 delay-100 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div className="flex flex-wrap gap-1 border-b border-fd-border">
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
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all motion-reduce:transition-none border-b-2 -mb-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${
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
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <span
              className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${JOURNEY_BADGE_STYLES[journey]}`}
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
                <p className="mb-4 text-sm font-medium text-[var(--muted)]">
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
                        className={`group glass flex flex-col rounded-xl p-6 transition-all motion-reduce:transition-none hover:bg-[var(--glass2)] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${
                          inView ? 'animate-slide-up-fade' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(ci * 3 + (num % 3)) * 80 + 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-mono text-2xl font-light text-[var(--muted)]">
                            {String(num).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
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
      </div>
    </section>
  );
}
