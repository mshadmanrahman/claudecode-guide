import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { DESIGNER_GUIDES } from '@/lib/designer-guides';
import { EmailCapture } from '@/components/email-capture';
import { CopyBlock } from '@/components/guide/copy-block';
import { DesignerStepDemo } from '@/components/designer-step-demo';
import { DesignerRouteSwitcher } from '@/components/designer-route-switcher';
import { PersonaGuideTracker } from '@/components/persona-guide-tracker';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = DESIGNER_GUIDES[slug];

  if (!guide) return {};

  return {
    title: `${guide.title} | Claude for Designers`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(DESIGNER_GUIDES).map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Difficulty badge                                                    */
/* ------------------------------------------------------------------ */

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400';

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles}`}>
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function DesignerGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = DESIGNER_GUIDES[slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-fd-background">
      <PersonaGuideTracker slug={guide.slug} title={guide.title} section="for-designers" />
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/for-designers"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All designer guides
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
            For Designers
          </p>

          <h1 className="font-display text-3xl font-medium tracking-tight text-fd-foreground sm:text-4xl leading-snug">
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
            <DifficultyBadge level={guide.difficulty} />
          </div>
        </header>

        {/* Situation card — shown prominently like impeccable.style output box */}
        {guide.situation && (
          <div className="mb-10 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
            <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted px-5 py-3">
              <span className="font-mono text-xs text-fd-muted-foreground">{guide.slug}</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground/60">
                The situation
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
        <DesignerRouteSwitcher availableRoutes={guide.availableRoutes ?? ['claude-ai']} />

        {/* Outcomes grid (replaces intro when present) */}
        {guide.outcomes ? (
          <div data-persona-guide-intro className="mb-12">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
              What you walk away with
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {guide.outcomes.map((outcome, i) => (
                <div key={i} className="rounded-xl border border-fd-border bg-fd-card p-5">
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
          <div data-persona-guide-intro className="mb-12 rounded-xl border border-fd-border bg-fd-card p-6">
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              {guide.intro}
            </p>
          </div>
        )}

        {/* Prompt contrast */}
        {guide.promptContrast && (
          <div className="mb-12 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
              The difference one prompt makes
            </p>
            <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20 p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-red-500 dark:text-red-400">
                Don&apos;t
              </p>
              <p className="font-mono text-sm text-fd-foreground whitespace-pre-wrap leading-relaxed">
                {guide.promptContrast.bad}
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-950/20 p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
                Do this
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
                  Step {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-1 font-display text-xl font-medium text-fd-foreground leading-snug">
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

              {(step.demo ?? step.appDemo ?? step.ideDemo) && (
                <div className="mt-4">
                  <DesignerStepDemo
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
        <div data-persona-guide-sentinel className="mt-20 space-y-8">
          {/* What's next */}
          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <p className="text-sm font-medium text-fd-muted-foreground mb-2">
              What&apos;s next?
            </p>
            <Link
              href={guide.nextLink.href}
              className="inline-flex items-center gap-2 text-fd-foreground font-medium hover:underline"
            >
              {guide.nextLink.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <EmailCapture placement="for-designers-guide" />
        </div>
      </article>
    </div>
  );
}
