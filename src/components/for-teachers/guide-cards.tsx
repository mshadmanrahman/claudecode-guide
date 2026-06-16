'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, CheckSquare, MessageCircle } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { TEACHER_GUIDES } from '@/lib/teacher-guides';

type Journey = 'lesson-planning' | 'assessment' | 'communication';

interface JourneyCluster {
  cluster: string;
  guideKeys: string[];
}

const JOURNEY_DATA: Array<{
  id: Journey;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  note: string;
  clusters: JourneyCluster[];
}> = [
  {
    id: 'lesson-planning',
    label: 'Lesson planning',
    icon: <BookOpen className="h-4 w-4" />,
    tagline: 'Plans and activities',
    note: 'Give Claude the topic, year group, and learning objective. It builds the plan.',
    clusters: [
      { cluster: 'Planning', guideKeys: ['write-lesson-plans-with-claude', 'differentiate-instruction-with-claude'] },
    ],
  },
  {
    id: 'assessment',
    label: 'Assessment',
    icon: <CheckSquare className="h-4 w-4" />,
    tagline: 'Questions, rubrics, feedback',
    note: 'Question banks, marking rubrics, and written feedback from your bullet-point notes.',
    clusters: [
      { cluster: 'Assessment', guideKeys: ['create-quiz-questions-with-claude', 'write-grading-rubrics-with-claude', 'give-student-feedback-with-claude'] },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: <MessageCircle className="h-4 w-4" />,
    tagline: 'Emails and reports',
    note: 'Parent emails, sensitive messages, and report comments drafted in under a minute.',
    clusters: [
      { cluster: 'Communication', guideKeys: ['write-parent-emails-with-claude', 'give-student-feedback-with-claude'] },
    ],
  },
];

const TAB_ACTIVE_BORDER: Record<Journey, string> = {
  'lesson-planning': 'border-emerald-600',
  'assessment': 'border-violet-600',
  'communication': 'border-amber-600',
};

const ENV_BADGE_STYLES: Record<Journey, string> = {
  'lesson-planning': 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'assessment': 'bg-violet-50 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  'communication': 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
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

export function TeacherGuideCards() {
  const [ref, inView] = useInView(0.05);
  const [journey, setJourney] = useState<Journey>('lesson-planning');

  const activeJourney = JOURNEY_DATA.find((j) => j.id === journey)!;
  const journeyGuideCount = activeJourney.clusters.reduce((sum, c) => sum + c.guideKeys.length, 0);
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
            Three areas where Claude saves the most teacher time. Select one to see the{' '}
            <span className="font-medium text-fd-foreground">{journeyGuideCount} guides</span>{' '}
            for that area.
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
                  trackEvent('teacher_journey_tab_click', { journey: j.id, section: 'for-teachers' });
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
              <p className="text-sm text-fd-muted-foreground">{activeJourney.note}</p>
            </div>
          </div>
        </div>

        {/* Guide clusters */}
        <div className="space-y-12">
          {activeJourney.clusters.map((cluster, ci) => {
            const clusterGuides = cluster.guideKeys
              .map((key) => TEACHER_GUIDES[key])
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
                        href={`/for-teachers/${guide.slug}`}
                        onClick={() =>
                          trackEvent('teacher_guide_card_click', {
                            guide_slug: guide.slug,
                            guide_title: guide.title,
                            cluster: cluster.cluster,
                            journey,
                            position: num,
                            section: 'for-teachers',
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
