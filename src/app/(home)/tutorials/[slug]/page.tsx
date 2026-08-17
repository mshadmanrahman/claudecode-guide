import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { DemoCard } from "@/components/demo-card";
import { EmailCapture } from "@/components/email-capture";
import { CopyBlock } from "@/components/guide/copy-block";
import { TutorialTracker } from "@/components/tutorial-tracker";
import { TutorialCompleteButton } from "@/components/tutorial-complete-button";
import { TutorialStepDemo } from "@/components/tutorial-step-demo";
import { RouteSwitcher, type TutorialRoute } from "@/components/route-switcher";
import { ShareCard } from "@/components/share-card";

import { TUTORIALS, type Tutorial } from "@/lib/tutorials";
import { ArticleSchema } from "@/components/article-schema";

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

function DifficultyBadge({ level }: { level: "beginner" | "intermediate" }) {
  const styles =
    level === "beginner"
      ? "bg-green-500/10 text-green-600 dark:text-green-400"
      : "bg-purple-500/10 text-purple-600 dark:text-purple-400";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles}`}
    >
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

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

  return (
    <div className="flex flex-col bg-fd-background">
      <ArticleSchema
        headline={tutorial.title}
        description={tutorial.description}
        url={`https://claudecodeguide.dev/tutorials/${slug}`}
      />
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
        <TutorialTracker slug={tutorial.slug} title={tutorial.title} />
        {/* Back link */}
        <Link
          href="/tutorials"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All tutorials
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
              <Clock className="h-3 w-3" />
              {tutorial.duration}
            </span>
            <DifficultyBadge level={tutorial.difficulty} />
          </div>

          <h1 className="font-display text-3xl font-normal tracking-tight text-fd-foreground sm:text-4xl">
            {tutorial.title}
          </h1>

          <p className="mt-4 text-lg text-fd-muted-foreground">
            {tutorial.description}
          </p>
        </header>

        {/* Route switcher */}
        <RouteSwitcher
          availableRoutes={tutorial.availableRoutes ?? ["terminal"]}
        />

        {/* Intro */}
        <div
          data-tutorial-intro
          className="mb-12 rounded-xl border border-fd-border bg-fd-card p-6"
        >
          <p className="text-sm leading-relaxed text-fd-muted-foreground">
            {tutorial.intro}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {tutorial.steps.map((step, index) => (
            <section key={index}>
              {/* Step header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-muted text-sm font-medium text-fd-muted-foreground">
                  {index + 1}
                </div>
                <div>
                  <h2 className="font-display text-lg font-medium text-fd-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm text-fd-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Code block */}
              {step.code && (
                <div className="ml-12 mt-4">
                  <CopyBlock
                    code={step.code.snippet}
                    language={step.code.language}
                  />
                </div>
              )}

              {/* Demo : renders appropriate variant based on selected route */}
              {(step.demo ?? step.appDemo ?? step.ideDemo) && (
                <div className="ml-12 mt-4">
                  <TutorialStepDemo
                    demo={step.demo}
                    appDemo={step.appDemo}
                    ideDemo={step.ideDemo}
                  />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div data-tutorial-complete-sentinel className="mt-20 space-y-8">
          {/* Mark as complete */}
          <TutorialCompleteButton slug={tutorial.slug} title={tutorial.title} />

          {/* Share card */}
          <ShareCard
            tutorialTitle={tutorial.title}
            tutorialSlug={tutorial.slug}
            duration={tutorial.duration}
          />

          {/* What's next */}
          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <p className="text-sm font-medium text-fd-muted-foreground mb-2">
              What&apos;s next?
            </p>
            <Link
              href={tutorial.nextLink.href}
              className="inline-flex items-center gap-2 text-fd-foreground font-medium hover:underline"
            >
              {tutorial.nextLink.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Email capture */}
          <EmailCapture placement="tutorial-post" />
        </div>
      </article>
    </div>
  );
}
