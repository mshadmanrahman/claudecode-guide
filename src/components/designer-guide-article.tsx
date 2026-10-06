import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Languages } from 'lucide-react';
import type { DesignerGuide } from '@/lib/designer-guides';
import { EmailCapture } from '@/components/email-capture';
import { CopyBlock } from '@/components/guide/copy-block';
import { DesignerStepDemo } from '@/components/designer-step-demo';
import { DemoCard } from '@/components/demo-card';
import { DesignerRouteSwitcher } from '@/components/designer-route-switcher';
import { PersonaGuideTracker } from '@/components/persona-guide-tracker';
import { ArticleSchema } from '@/components/article-schema';
import { AuthorBio } from '@/components/author-bio';
import { BN_DESIGNER_GUIDES } from '@/lib/i18n/bn/designer-guides';
import { BN_TUTORIALS } from '@/lib/i18n/bn/tutorials';
import { localePrefix, ui, type Locale } from '@/lib/i18n/locale';

function DifficultyBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-[var(--chip)] px-2.5 py-1 text-[11px] font-medium text-[var(--acc)]">
      {label}
    </span>
  );
}

/** Bangla href for an internal guide or tutorial link when a translation exists; English otherwise. */
function resolveNext(href: string, locale: Locale): { href: string; fallback: boolean } {
  if (locale === 'en') return { href, fallback: false };
  const d = href.match(/^\/for-designers\/([a-z0-9-]+)$/);
  if (d) return BN_DESIGNER_GUIDES[d[1]] ? { href: `/bn${href}`, fallback: false } : { href, fallback: true };
  const tu = href.match(/^\/tutorials\/([a-z0-9-]+)$/);
  if (tu) return BN_TUTORIALS[tu[1]] ? { href: `/bn${href}`, fallback: false } : { href, fallback: true };
  return { href, fallback: false };
}

interface DesignerGuideArticleProps {
  guide: DesignerGuide;
  locale: Locale;
  /** The same guide in the other language, when it exists. */
  alternateHref?: string;
  /** True when the English source changed after this translation was made. */
  stale?: boolean;
}

/** One designer guide page. The English and Bangla routes both render this. */
export function DesignerGuideArticle({ guide, locale, alternateHref, stale }: DesignerGuideArticleProps) {
  const t = ui(locale);
  const slug = guide.slug;
  const prefix = localePrefix(locale);
  const next = resolveNext(guide.nextLink.href, locale);

  return (
    <div lang={locale} className="flex flex-col">
      <ArticleSchema
        headline={guide.title}
        description={guide.description}
        url={`https://claudecodeguide.dev${prefix}/for-designers/${slug}`}
      />
      <PersonaGuideTracker slug={guide.slug} title={guide.title} section="for-designers" />
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/for-designers"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.allDesignerGuides}
        </Link>

        {alternateHref && (
          <Link
            href={alternateHref}
            hrefLang={locale === 'en' ? 'bn' : 'en'}
            lang={locale === 'en' ? 'bn' : 'en'}
            className="mb-8 ml-4 inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {t.switchLanguage}
          </Link>
        )}

        {stale && alternateHref && (
          <p role="note" className="mb-8 rounded-xl border border-fd-border bg-[var(--code)] p-4 text-sm text-fd-muted-foreground">
            {t.staleNotice}{' '}
            <Link href={alternateHref} hrefLang="en" className="text-[var(--acc)] underline underline-offset-4">
              {t.readEnglish}
            </Link>
          </p>
        )}

        {/* Header */}
        <header className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">
            {t.forDesigners}
          </p>

          <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl leading-snug">
            {guide.title}
          </h1>

          <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
            {guide.description}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-md border border-fd-border px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
              <Clock className="h-3 w-3" />
              {guide.duration}
            </span>
            <DifficultyBadge label={guide.difficulty === 'beginner' ? t.beginner : t.intermediate} />
          </div>
        </header>

        {/* Situation card — shown prominently like impeccable.style output box */}
        {guide.situation && (
          <div className="mb-10 overflow-hidden rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2]">
            <div className="flex items-center justify-between border-b border-fd-border bg-[var(--code)] px-5 py-3">
              <span className="font-mono text-xs text-fd-muted-foreground">{guide.slug}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-fd-muted-foreground/60 font-mono">
                {t.theSituation}
              </span>
            </div>
            <div className="px-5 py-5">
              <p className="text-base font-medium text-fd-foreground leading-relaxed">
                {guide.situation.scene}
              </p>
              <p className="mt-3 text-sm text-fd-muted-foreground leading-relaxed border-t border-fd-border/60 pt-3">
                {guide.situation.outcome}
              </p>
            </div>
          </div>
        )}

        {/* Route switcher */}
        {guide.usesCodeTab ? (
          <p className="mb-8 rounded-xl border border-fd-border bg-[var(--code)] p-4 text-sm leading-relaxed text-fd-muted-foreground">
            <span className="font-medium text-fd-foreground">{t.usesCodeTabLead}</span>
            {t.usesCodeTabBody}
          </p>
        ) : (
          <DesignerRouteSwitcher availableRoutes={guide.availableRoutes ?? ['web', 'desktop']} locale={locale} />
        )}

        {/* Outcomes grid (replaces intro when present) */}
        {guide.outcomes ? (
          <div data-persona-guide-intro className="mb-12">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">
              {t.walkAwayWith}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {guide.outcomes.map((outcome, i) => (
                <div key={i} className="rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-5">
                  <span className="font-mono text-3xl font-light text-fd-muted-foreground/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-sm text-fd-foreground leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div data-persona-guide-intro className="mb-12 rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-6">
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              {guide.intro}
            </p>
          </div>
        )}

        {/* Prompt contrast */}
        {guide.promptContrast && (
          <div className="mb-12 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">
              {t.promptDifference}
            </p>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--code)] p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-300  font-mono">
                {t.dont}
              </p>
              <p className="font-mono text-sm text-fd-foreground whitespace-pre-wrap leading-relaxed">
                {guide.promptContrast.bad}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--chip)] p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--acc)]  font-mono">
                {t.doThis}
              </p>
              <p className="font-mono text-sm text-fd-foreground whitespace-pre-wrap leading-relaxed">
                {guide.promptContrast.good}
              </p>
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-12">
          {guide.steps.map((step, index) => (
            <section key={index} className="border-t border-fd-border pt-10 first:border-t-0 first:pt-0">
              <div className="mb-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground/50">
                  {t.step} {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-1 font-display text-xl font-semibold text-fd-foreground leading-snug tracking-[-0.035em]">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.list && (
                  <ol className="mt-4 space-y-2 list-decimal list-outside pl-4">
                    {step.list.map((item, i) => (
                      <li key={i} className="text-sm text-fd-muted-foreground leading-relaxed pl-1">
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {step.code && (
                <div className="mt-4">
                  <CopyBlock
                    code={step.code.snippet}
                    language={step.code.language}
                  />
                </div>
              )}

              {guide.usesCodeTab && step.demo ? (
                <div className="mt-4">
                  <DemoCard title={step.demo.title} steps={step.demo.steps} loop={false} />
                </div>
              ) : (step.appDemo ?? step.desktopDemo) ? (
                <div className="mt-4">
                  <DesignerStepDemo appDemo={step.appDemo} desktopDemo={step.desktopDemo} skipPrompts={Boolean(step.code)} locale={locale} />
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div data-persona-guide-sentinel className="mt-20 space-y-8">
          {/* What's next */}
          <div className="rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-6">
            <p className="text-sm font-medium text-fd-muted-foreground mb-2">
              {t.whatsNext}
            </p>
            <Link
              href={next.href}
              className="inline-flex items-center gap-2 text-fd-foreground font-medium hover:underline"
            >
              {guide.nextLink.label}
              {next.fallback && <span className="font-normal text-fd-muted-foreground">{t.inEnglish}</span>}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <EmailCapture placement="for-designers-guide" />
        </div>

        <AuthorBio />
      </article>
    </div>
  );
}
