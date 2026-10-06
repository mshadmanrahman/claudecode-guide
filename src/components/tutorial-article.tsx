import Link from "next/link";
import { ArrowLeft, ArrowRight, Languages } from "lucide-react";
import { SceneBackdrop } from "@/components/scene-backdrop";
import { EmailCapture } from "@/components/email-capture";
import { TutorialTracker } from "@/components/tutorial-tracker";
import { TutorialCompleteButton } from "@/components/tutorial-complete-button";
import { TutorialStepBody } from "@/components/tutorial-step-demo";
import { RouteSwitcher } from "@/components/route-switcher";
import { ShareCard } from "@/components/share-card";
import { AuthorBio } from "@/components/author-bio";
import { ArticleSchema } from "@/components/article-schema";
import { TUTORIALS, type Tutorial } from "@/lib/tutorials";
import { BN_TUTORIALS } from "@/lib/i18n/bn/tutorials";
import { BN_TRACK_TITLES, localePrefix, ui, type Locale } from "@/lib/i18n/locale";
import { findTrackPosition, pad2, type CatalogEntry } from "@/app/(home)/tutorials/catalog";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

/**
 * Where a tutorial link should go for this locale. A translated tutorial links
 * to its translation; an untranslated one falls back to English and says so.
 */
function resolveTutorial(slug: string, locale: Locale) {
  const bn = locale === "bn" ? BN_TUTORIALS[slug]?.content : undefined;
  const t = bn ?? TUTORIALS[slug];
  return {
    href: `${bn ? localePrefix(locale) : ""}/tutorials/${slug}`,
    tutorial: t,
    fallback: locale !== "en" && !bn,
  };
}

/** Same, for any internal tutorial href such as a tutorial's nextLink. */
function resolveHref(href: string, locale: Locale): { href: string; fallback: boolean } {
  const m = href.match(/^\/tutorials\/([a-z0-9-]+)$/);
  if (!m || locale === "en") return { href, fallback: false };
  const r = resolveTutorial(m[1], locale);
  return { href: r.href, fallback: r.fallback };
}

function trackTitle(id: string, title: string, locale: Locale): string {
  return locale === "bn" ? (BN_TRACK_TITLES[id] ?? title) : title.toLowerCase();
}

function PagerLink({ entry, dir, locale }: { entry: CatalogEntry; dir: "prev" | "next"; locale: Locale }) {
  const t = ui(locale);
  const r = resolveTutorial(entry.slug, locale);
  const title = locale === "en" || r.fallback ? entry.title : r.tutorial.title;
  return (
    <Link
      href={r.href}
      rel={dir}
      className={`glass group flex min-w-0 flex-1 flex-col gap-1.5 rounded-xl p-5 transition-colors hover:border-[var(--acc)] ${
        dir === "next" ? "sm:items-end sm:text-right" : ""
      } ${focusRing}`}
    >
      <span className="flex items-center gap-1.5 font-mono text-xs text-[var(--muted)]">
        {dir === "prev" && <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />}
        {dir === "prev" ? t.previous : t.next} / {r.tutorial.duration}
        {dir === "next" && <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
      </span>
      <span className="font-semibold leading-snug tracking-[-0.02em] group-hover:text-[var(--acc)]">
        {title}
        {r.fallback && <span className="font-normal text-[var(--muted)]"> {t.inEnglish}</span>}
      </span>
    </Link>
  );
}

interface TutorialArticleProps {
  tutorial: Tutorial;
  locale: Locale;
  /** The same tutorial in the other language, when it exists. */
  alternateHref?: string;
  /** True when the English source changed after this translation was made. */
  stale?: boolean;
}

/** One tutorial page. The English and Bangla routes both render this. */
export function TutorialArticle({ tutorial, locale, alternateHref, stale }: TutorialArticleProps) {
  const t = ui(locale);
  const slug = tutorial.slug;
  const routes = tutorial.availableRoutes ?? ["terminal"];
  const position = findTrackPosition(slug);
  const total = tutorial.steps.length;
  const nextHref = position?.next ? resolveTutorial(position.next.slug, locale).href : undefined;
  const deeper = resolveHref(tutorial.nextLink.href, locale);
  const showDeeper = deeper.href !== nextHref && tutorial.nextLink.href !== "/tutorials";
  const deeperIsExternal = tutorial.nextLink.href.startsWith("http");
  const prefix = localePrefix(locale);
  const difficulty = tutorial.difficulty === "beginner" ? t.beginner : t.intermediate;

  return (
    <div lang={locale} className="flex flex-col text-[var(--ink)]">
      <SceneBackdrop variant="faded" scene="workshop" className="scene--reading" />
      <ArticleSchema
        headline={tutorial.title}
        description={tutorial.description}
        url={`https://claudecodeguide.dev${prefix}/tutorials/${slug}`}
      />
      <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-24 sm:px-6 md:pt-12">
        <TutorialTracker slug={tutorial.slug} title={tutorial.title} />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-[var(--muted)]">
            <Link href="/tutorials" className={`rounded-sm hover:text-[var(--ink)] ${focusRing}`}>
              {t.tutorials}
            </Link>
            {position && (
              <>
                <span aria-hidden="true"> / </span>
                <Link
                  href={`/tutorials#${position.track.id}`}
                  className={`rounded-sm hover:text-[var(--ink)] ${focusRing}`}
                >
                  {trackTitle(position.track.id, position.track.title, locale)}
                </Link>
                <span aria-hidden="true"> / </span>
                <span>
                  {position.index + 1} {t.of} {position.track.entries.length}
                </span>
              </>
            )}
          </nav>
          {alternateHref && (
            <Link
              href={alternateHref}
              hrefLang={locale === "en" ? "bn" : "en"}
              lang={locale === "en" ? "bn" : "en"}
              className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)] transition-colors hover:border-[var(--acc)] hover:text-[var(--ink)] ${focusRing}`}
            >
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              {t.switchLanguage}
            </Link>
          )}
        </div>

        {stale && alternateHref && (
          <p role="note" className="glass mb-8 rounded-xl px-4 py-3 text-sm text-[var(--muted)]">
            {t.staleNotice}{" "}
            <Link href={alternateHref} hrefLang="en" className="text-[var(--acc)] underline underline-offset-4">
              {t.readEnglish}
            </Link>
          </p>
        )}

        <header className="mb-8">
          <p className="m-0 font-mono text-xs text-[var(--acc)]">
            {tutorial.duration} / {difficulty} / {total} {t.steps}
          </p>
          <h1 className="mt-3 text-display-article font-semibold leading-[1.08] tracking-[-0.035em]">
            {tutorial.title}
          </h1>
          <p className="mt-4 text-body leading-[1.55] text-[var(--muted)] md:text-lead">
            {tutorial.description}
          </p>
        </header>

        <section
          data-tutorial-intro
          aria-label={t.beforeYouStart}
          className="glass mb-8 flex flex-col gap-5 rounded-xl p-5 sm:p-6"
        >
          <p className="m-0 text-ui leading-relaxed">{tutorial.intro}</p>
          <div className="border-t border-[var(--line)] pt-5">
            <RouteSwitcher availableRoutes={routes} locale={locale} />
          </div>
        </section>

        <nav aria-label={t.inThisTutorial} className="mb-14">
          <p className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">{t.inThisTutorial}</p>
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {tutorial.steps.map((step, index) => (
              <li key={index}>
                <a
                  href={`#step-${index + 1}`}
                  className={`flex gap-3 rounded-md py-1 text-ui text-[var(--muted)] transition-colors hover:text-[var(--ink)] ${focusRing}`}
                >
                  <span className="font-mono text-compact text-[var(--acc)]">{pad2(index + 1)}</span>
                  {step.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="m-0 flex list-none flex-col gap-16 p-0">
          {tutorial.steps.map((step, index) => (
            <li
              key={index}
              id={`step-${index + 1}`}
              className="min-w-0 scroll-mt-[calc(var(--site-header-h)+1rem)]"
            >
              <p className="m-0 font-mono text-xs text-[var(--acc)]">
                {t.step} {pad2(index + 1)} / {pad2(total)}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">{step.title}</h2>
              <p className="mt-2 mb-5 text-ui leading-relaxed text-[var(--muted)]">{step.description}</p>
              <TutorialStepBody
                availableRoutes={routes}
                code={step.code}
                demo={step.demo}
                appDemo={step.appDemo}
                ideDemo={step.ideDemo}
                cliDemo={step.cliDemo}
                title={step.title}
                locale={locale}
              />
            </li>
          ))}
        </ol>

        <div data-tutorial-complete-sentinel className="mt-20 space-y-8">
          <TutorialCompleteButton slug={tutorial.slug} title={tutorial.title} locale={locale} />

          {position && (position.prev || position.next) && (
            <nav aria-label={trackTitle(position.track.id, position.track.title, locale)}>
              <p className="m-0 mb-3 font-mono text-xs text-[var(--muted)]">
                {trackTitle(position.track.id, position.track.title, locale)} / {position.index + 1} {t.of}{" "}
                {position.track.entries.length}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {position.prev && <PagerLink entry={position.prev} dir="prev" locale={locale} />}
                {position.next && <PagerLink entry={position.next} dir="next" locale={locale} />}
              </div>
            </nav>
          )}

          {position && !position.next && (
            <Link
              href="/tutorials"
              className={`glass flex flex-col gap-1.5 rounded-xl p-5 transition-colors hover:border-[var(--acc)] ${focusRing}`}
            >
              <span className="font-mono text-xs text-[var(--muted)]">{t.endOfTrack}</span>
              <span className="font-semibold">{t.pickAnotherTrack}</span>
            </Link>
          )}

          {showDeeper &&
            (deeperIsExternal ? (
              <a
                href={tutorial.nextLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-sm text-ui font-medium hover:text-[var(--acc)] ${focusRing}`}
              >
                <span className="font-mono text-xs text-[var(--muted)]">{t.goDeeper}</span>
                {tutorial.nextLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                href={deeper.href}
                className={`flex items-center gap-2 rounded-sm text-ui font-medium hover:text-[var(--acc)] ${focusRing}`}
              >
                <span className="font-mono text-xs text-[var(--muted)]">{t.goDeeper}</span>
                {tutorial.nextLink.label}
                {deeper.fallback && <span className="font-normal text-[var(--muted)]">{t.inEnglish}</span>}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}

          <ShareCard
            tutorialTitle={tutorial.title}
            tutorialSlug={tutorial.slug}
            duration={tutorial.duration}
            locale={locale}
          />

          <EmailCapture placement="tutorial-post" />
        </div>

        <AuthorBio />
      </article>
    </div>
  );
}
