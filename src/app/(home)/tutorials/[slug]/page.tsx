import { SceneBackdrop } from '@/components/scene-backdrop';
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { TutorialTracker } from "@/components/tutorial-tracker";
import { TutorialCompleteButton } from "@/components/tutorial-complete-button";
import { TutorialStepBody } from "@/components/tutorial-step-demo";
import { RouteSwitcher } from "@/components/route-switcher";
import { ShareCard } from "@/components/share-card";
import { AuthorBio } from "@/components/author-bio";

import { TUTORIALS } from "@/lib/tutorials";
import { ArticleSchema } from "@/components/article-schema";
import { findTrackPosition, pad2, type CatalogEntry } from "../catalog";

const ALL_SLUGS = Object.keys(TUTORIALS);

/* ------------------------------------------------------------------ */
/*  Static params for pre-rendering                                    */
/* ------------------------------------------------------------------ */

export function generateStaticParams(): Array<{ slug: string }> {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS[slug];
  if (!tutorial) return { title: "Tutorial not found" };

  const canonicalUrl = `https://claudecodeguide.dev/tutorials/${slug}`;
  const seoTitle = tutorial.title.includes("Claude Code")
    ? tutorial.title
    : `${tutorial.title} | Claude Code Tutorial`;

  return {
    title: { absolute: seoTitle },
    description: tutorial.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seoTitle,
      description: tutorial.description,
      type: "article",
      url: canonicalUrl,
      images: [{ url: "/api/og", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: tutorial.description,
      images: ["/api/og"],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Difficulty badge component                                         */
/* ------------------------------------------------------------------ */

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

function PagerLink({ entry, dir }: { entry: CatalogEntry; dir: "prev" | "next" }) {
  const t = TUTORIALS[entry.slug];
  return (
    <Link
      href={`/tutorials/${entry.slug}`}
      rel={dir}
      className={`glass group flex min-w-0 flex-1 flex-col gap-1.5 rounded-xl p-5 transition-colors hover:border-[var(--acc)] ${
        dir === "next" ? "sm:items-end sm:text-right" : ""
      } ${focusRing}`}
    >
      <span className="flex items-center gap-1.5 font-mono text-xs text-[var(--muted)]">
        {dir === "prev" && <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />}
        {dir === "prev" ? "previous" : "next"} / {t.duration}
        {dir === "next" && <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
      </span>
      <span className="font-semibold leading-snug tracking-[-0.02em] group-hover:text-[var(--acc)]">
        {entry.title}
      </span>
    </Link>
  );
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = TUTORIALS[slug];

  if (!tutorial) {
    notFound();
  }

  const routes = tutorial.availableRoutes ?? ["terminal"];
  const position = findTrackPosition(slug);
  const total = tutorial.steps.length;
  const nextHref = position?.next ? `/tutorials/${position.next.slug}` : undefined;
  const showDeeper =
    tutorial.nextLink.href !== nextHref && tutorial.nextLink.href !== "/tutorials";
  const deeperIsExternal = tutorial.nextLink.href.startsWith("http");

  return (
    <div className="flex flex-col text-[var(--ink)]">
      <SceneBackdrop variant="faded" scene="workshop" className="scene--reading" />
      <ArticleSchema
        headline={tutorial.title}
        description={tutorial.description}
        url={`https://claudecodeguide.dev/tutorials/${slug}`}
      />
      <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-24 sm:px-6 md:pt-12">
        <TutorialTracker slug={tutorial.slug} title={tutorial.title} />

        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-[var(--muted)]">
          <Link href="/tutorials" className={`rounded-sm hover:text-[var(--ink)] ${focusRing}`}>
            tutorials
          </Link>
          {position && (
            <>
              <span aria-hidden="true"> / </span>
              <Link
                href={`/tutorials#${position.track.id}`}
                className={`rounded-sm hover:text-[var(--ink)] ${focusRing}`}
              >
                {position.track.title.toLowerCase()}
              </Link>
              <span aria-hidden="true"> / </span>
              <span>
                {position.index + 1} of {position.track.entries.length}
              </span>
            </>
          )}
        </nav>

        <header className="mb-8">
          <p className="m-0 font-mono text-xs text-[var(--acc)]">
            {tutorial.duration} / {tutorial.difficulty} / {total} steps
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
          aria-label="Before you start"
          className="glass mb-8 flex flex-col gap-5 rounded-xl p-5 sm:p-6"
        >
          <p className="m-0 text-ui leading-relaxed">{tutorial.intro}</p>
          <div className="border-t border-[var(--line)] pt-5">
            <RouteSwitcher availableRoutes={routes} />
          </div>
        </section>

        <nav aria-label="Steps in this tutorial" className="mb-14">
          <p className="m-0 mb-2 font-mono text-xs text-[var(--muted)]">in this tutorial</p>
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
                step {pad2(index + 1)} / {pad2(total)}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">{step.title}</h2>
              <p className="mt-2 mb-5 text-ui leading-relaxed text-[var(--muted)]">{step.description}</p>
              <TutorialStepBody
                availableRoutes={routes}
                code={step.code}
                demo={step.demo}
                appDemo={step.appDemo}
                ideDemo={step.ideDemo}
              />
            </li>
          ))}
        </ol>

        <div data-tutorial-complete-sentinel className="mt-20 space-y-8">
          <TutorialCompleteButton slug={tutorial.slug} title={tutorial.title} />

          {position && (position.prev || position.next) && (
            <nav aria-label={`More in ${position.track.title}`}>
              <p className="m-0 mb-3 font-mono text-xs text-[var(--muted)]">
                {position.track.title.toLowerCase()} / {position.index + 1} of {position.track.entries.length}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {position.prev && <PagerLink entry={position.prev} dir="prev" />}
                {position.next && <PagerLink entry={position.next} dir="next" />}
              </div>
            </nav>
          )}

          {position && !position.next && (
            <Link
              href="/tutorials"
              className={`glass flex flex-col gap-1.5 rounded-xl p-5 transition-colors hover:border-[var(--acc)] ${focusRing}`}
            >
              <span className="font-mono text-xs text-[var(--muted)]">end of this track</span>
              <span className="font-semibold">Pick another track</span>
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
                <span className="font-mono text-xs text-[var(--muted)]">go deeper</span>
                {tutorial.nextLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                href={tutorial.nextLink.href}
                className={`flex items-center gap-2 rounded-sm text-ui font-medium hover:text-[var(--acc)] ${focusRing}`}
              >
                <span className="font-mono text-xs text-[var(--muted)]">go deeper</span>
                {tutorial.nextLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}

          <ShareCard
            tutorialTitle={tutorial.title}
            tutorialSlug={tutorial.slug}
            duration={tutorial.duration}
          />

          <EmailCapture placement="tutorial-post" />
        </div>

        <AuthorBio />
      </article>
    </div>
  );
}
