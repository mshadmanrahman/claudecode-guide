'use client';

import Link from 'next/link';
import { Globe, Monitor, ArrowRight, type LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { DESIGNERS_HUB, type DesignersHubCopy } from '@/lib/hubs/designers';
import { localePrefix, type Locale } from '@/lib/i18n/locale';

/** Icon and colors per journey. The words live in `DESIGNERS_HUB.beforeAfter`. */
const JOURNEY_STYLE: Record<string, { icon: LucideIcon; envStyle: string; borderStyle: string; headerStyle: string }> = {
  web: {
    icon: Globe,
    envStyle: 'bg-[var(--code)] text-[var(--ink)]',
    borderStyle: 'border-[var(--line)] ',
    headerStyle: 'bg-[var(--code)]',
  },
  desktop: {
    icon: Monitor,
    envStyle: 'bg-[var(--chip)] text-[var(--acc)]  ',
    borderStyle: 'border-[var(--line)] ',
    headerStyle: 'bg-[var(--chip)] ',
  },
};

interface DesignerBeforeAfterProps {
  locale?: Locale;
  copy?: DesignersHubCopy['beforeAfter'];
}

export function DesignerBeforeAfter({ locale = 'en', copy = DESIGNERS_HUB.beforeAfter }: DesignerBeforeAfterProps) {
  const prefix = localePrefix(locale);
  const [ref, inView] = useInView(0.05);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            {copy.lead}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {copy.journeys.map((journey, ji) => {
            const style = JOURNEY_STYLE[journey.id] ?? JOURNEY_STYLE.web;
            const Icon = style.icon;
            return (
              <div
                key={journey.id}
                className={`glass overflow-hidden rounded-xl transition-all motion-reduce:transition-none duration-500 ${
                  inView ? 'animate-slide-up-fade' : 'opacity-0'
                }`}
                style={{ animationDelay: `${ji * 120 + 100}ms` }}
              >
                {/* Header */}
                <div className={`px-5 py-4 ${style.headerStyle} border-b ${style.borderStyle}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-fd-muted-foreground" />
                      <span className="text-sm font-semibold text-fd-foreground">{journey.label}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.envStyle}`}>
                      {journey.env}
                    </span>
                  </div>
                  <p className="text-xs text-fd-muted-foreground">&quot;{journey.nickname}&quot;</p>
                </div>

                {/* Tagline */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="text-xs leading-relaxed text-fd-muted-foreground">{journey.tagline}</p>
                </div>

                {/* Entry path */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                    {copy.entryPathLabel}
                  </p>
                  <div className="space-y-1">
                    {journey.entryPath.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[var(--muted)] text-xs font-mono w-4 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-fd-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Behavioral shifts */}
                <div className="divide-y divide-fd-border">
                  {journey.shifts.map((shift) => (
                    <div key={shift.area} className="px-5 py-4">
                      <p className="mb-3 text-xs font-semibold text-[var(--muted)]">
                        {shift.area}
                      </p>
                      <div className="space-y-2">
                        <div className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--code)]" />
                          <p className="text-xs leading-relaxed text-fd-muted-foreground">{shift.before}</p>
                        </div>
                        <div className="flex gap-2.5">
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--acc)]" />
                          <p className="text-xs leading-relaxed text-[var(--acc)] ">
                            {shift.after}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Structural shift */}
                <div className="px-5 py-4 border-t border-fd-border bg-fd-accent/40">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                    {copy.structuralShiftLabel}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--muted)]">{journey.structuralShift}</p>
                </div>

                {/* Guide links */}
                <div className="px-5 py-3 border-t border-fd-border">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                    {copy.appliesToLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {journey.appliesTo.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`${prefix}/for-designers/${guide.slug}`}
                        className="rounded-full border border-fd-border px-2.5 py-1 text-xs font-medium text-fd-muted-foreground hover:bg-fd-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
                      >
                        {guide.short}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
