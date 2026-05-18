'use client';

import Link from 'next/link';
import { BookOpen, CheckSquare, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const JOURNEYS = [
  {
    id: 'lesson-planning',
    label: 'Lesson planning',
    icon: BookOpen,
    tagline: 'Plans, activities, and units',
    note: 'From topic to structured lesson plan in minutes. Any subject, any year group.',
  },
  {
    id: 'assessment',
    label: 'Assessment',
    icon: CheckSquare,
    tagline: 'Questions, rubrics, feedback',
    note: 'Quiz questions, marking rubrics, and written feedback on student work.',
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageCircle,
    tagline: 'Emails and reports',
    note: 'Parent emails, report comments, and sensitive communications drafted for you.',
  },
];

export function TeacherHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <nav className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Structural overview</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">For teachers</span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">Claude Code guide</span>
      </nav>

      <h1 className="font-serif text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        You plan. You teach. You assess.<br />
        <em className="italic text-fd-muted-foreground">Claude handles the paperwork.</em>
      </h1>

      <p className="mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        Teachers spend hours every week on tasks that are not teaching: writing lesson plans, generating quiz questions, drafting parent emails, marking feedback. These guides show you how to use Claude for all of it, so your time goes back to the room.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {JOURNEYS.map((j) => {
          const Icon = j.icon;
          return (
            <div key={j.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Works for
              </p>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-fd-foreground/70" />
                <span className="text-sm font-semibold text-fd-foreground">{j.label}</span>
              </div>
              <p className="text-xs font-medium text-fd-foreground/80 mb-1">{j.tagline}</p>
              <p className="text-[11px] leading-relaxed text-fd-muted-foreground">{j.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/for-teachers/write-lesson-plans-with-claude"
          onClick={() => trackEvent('teacher_hero_cta_click', { cta: 'start_lesson_planning', section: 'for-teachers' })}
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Start with lesson planning
        </Link>
        <Link
          href="#guides"
          onClick={() => trackEvent('teacher_hero_cta_click', { cta: 'browse_guides', section: 'for-teachers' })}
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
