'use client';

import Link from 'next/link';
import { BookOpen, CheckSquare, MessageCircle, type LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

import { AudienceDemoPanel } from '@/components/audience-demo-panel';
import { KineticText } from '@/components/kinetic-text';
import { LanguageSwitch } from '@/components/language-switch';
import { TEACHERS_HUB, type TeachersHubCopy } from '@/lib/hubs/teachers';
import { localePrefix, type Locale } from '@/lib/i18n/locale';

const JOURNEY_ICONS: Record<string, LucideIcon> = {
  'lesson-planning': BookOpen,
  assessment: CheckSquare,
  communication: MessageCircle,
};

interface TeacherHeroProps {
  locale?: Locale;
  copy?: TeachersHubCopy;
}

export function TeacherHero({ locale = 'en', copy = TEACHERS_HUB }: TeacherHeroProps) {
  const hero = copy.hero;
  const prefix = localePrefix(locale);
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <LanguageSwitch
        locale={locale}
        href={locale === 'en' ? '/bn/for-teachers' : '/for-teachers'}
        className="mb-8"
      />

      <h1 className="font-display text-5xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        <KineticText>{hero.headline}<br />
        <span className="text-[var(--muted)]">{hero.headlineMuted}</span></KineticText>
      </h1>

      <p className="hm-rise mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        {hero.lead}
      </p>

      <AudienceDemoPanel
        audience="teachers"
        copy={locale === 'en' ? undefined : copy.demo}
        className="hm-rise mt-12 h-[560px] rounded-3xl border border-[var(--line)] md:h-[460px]"
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {hero.journeys.map((j) => {
          const Icon = JOURNEY_ICONS[j.id] ?? BookOpen;
          return (
            <div key={j.id} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-[var(--muted)]" aria-hidden="true" />
                <span className="text-sm font-semibold text-fd-foreground">{j.label}</span>
              </div>
              <p className="text-xs font-medium text-fd-foreground mb-1">{j.tagline}</p>
              <p className="text-xs leading-relaxed text-fd-muted-foreground">{j.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href={`${prefix}/for-teachers/write-lesson-plans-with-claude`}
          onClick={() => trackEvent('teacher_hero_cta_click', { cta: 'start_lesson_planning', section: 'for-teachers' })}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--acc)] px-6 text-sm font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          {hero.ctaPrimary}
        </Link>
        <Link
          href="#guides"
          onClick={() => trackEvent('teacher_hero_cta_click', { cta: 'browse_guides', section: 'for-teachers' })}
          className="glass inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          {hero.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}
