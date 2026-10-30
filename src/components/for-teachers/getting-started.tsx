'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { TEACHERS_HUB, type TeachersHubCopy } from '@/lib/hubs/teachers';
import { localePrefix, type Locale } from '@/lib/i18n/locale';

interface TeacherGettingStartedProps {
  locale?: Locale;
  copy?: TeachersHubCopy['gettingStarted'];
}

export function TeacherGettingStarted({ locale = 'en', copy = TEACHERS_HUB.gettingStarted }: TeacherGettingStartedProps) {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="px-4 py-12 sm:px-6" ref={ref}>
      <div className="glass mx-auto max-w-5xl rounded-2xl px-6 py-16 sm:px-10">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            {copy.lead}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* What you need */}
          <div
            className={`transition-all motion-reduce:transition-none duration-500 delay-100 ${
              inView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
          >
            <h3 className="font-display text-lg font-semibold text-fd-foreground mb-5">
              {copy.needHeading}
            </h3>
            <ul className="space-y-3">
              {copy.need.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-fd-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fd-primary/10 text-xs font-semibold text-fd-primary">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 glass rounded-xl p-4">
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {copy.tierNote}
              </p>
            </div>
          </div>

          {/* How it works */}
          <div
            className={`transition-all motion-reduce:transition-none duration-500 delay-200 ${
              inView ? 'animate-slide-up-fade' : 'opacity-0'
            }`}
          >
            <h3 className="font-display text-lg font-semibold text-fd-foreground mb-5">
              {copy.howHeading}
            </h3>
            <div className="glass rounded-xl p-5 space-y-4">
              {copy.how.map((text, i) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fd-border bg-[var(--code)] font-mono text-xs text-fd-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed pt-0.5">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={`${localePrefix(locale)}/for-teachers/write-lesson-plans-with-claude`}
                onClick={() =>
                  trackEvent('teacher_getting_started_click', {
                    step: 'cta',
                    section: 'for-teachers',
                  })
                }
                className="inline-flex items-center text-sm font-medium text-fd-foreground hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              >
                {copy.cta} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
