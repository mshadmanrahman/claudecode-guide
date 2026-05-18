import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { CHROME_GUIDES } from '@/lib/chrome-guides';
import { EmailCapture } from '@/components/email-capture';
import { CopyBlock } from '@/components/guide/copy-block';
import { DesignerStepDemo } from '@/components/designer-step-demo';
import { PersonaGuideTracker } from '@/components/persona-guide-tracker';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = CHROME_GUIDES[slug];

  if (!guide) return {};

  return {
    title: `${guide.title} | Claude for Chrome`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CHROME_GUIDES).map((slug) => ({ slug }));
}

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

export default async function ChromeGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = CHROME_GUIDES[slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-fd-background">
      <PersonaGuideTracker slug={guide.slug} title={guide.title} section="for-chrome" />
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/for-chrome"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Chrome guides
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
              <Clock className="h-3 w-3" />
              {guide.duration}
            </span>
            <DifficultyBadge level={guide.difficulty} />
          </div>

          <h1 className="font-display text-3xl font-normal tracking-tight text-fd-foreground sm:text-4xl">
            {guide.title}
          </h1>

          <p className="mt-4 text-lg text-fd-muted-foreground">
            {guide.description}
          </p>
        </header>

        {/* Situation card */}
        {guide.situation && (
          <div className="mb-10 rounded-xl border-l-4 border-fd-primary/40 bg-fd-accent/50 px-6 py-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
              The situation
            </p>
            <p className="text-base font-medium text-fd-foreground leading-relaxed">
              {guide.situation.scene}
            </p>
            <p className="mt-3 text-sm text-fd-muted-foreground leading-relaxed">
              {guide.situation.outcome}
            </p>
          </div>
        )}

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
            {guide.promptContrast.why && (
              <div className="rounded-xl border border-fd-border bg-fd-accent/30 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground mb-1.5">
                  Why it matters
                </p>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  {guide.promptContrast.why}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="space-y-16">
          {guide.steps.map((step, index) => (
            <section key={index}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-muted text-sm font-medium text-fd-muted-foreground">
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-fd-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm text-fd-muted-foreground">
                    {step.description}
                  </p>
                  {step.list && (
                    <ol className="mt-3 space-y-2 list-decimal list-outside pl-4">
                      {step.list.map((item, i) => (
                        <li key={i} className="text-sm text-fd-muted-foreground leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>

              {step.code && (
                <div className="ml-12 mt-4">
                  <CopyBlock
                    code={step.code.snippet}
                    language={step.code.language}
                  />
                </div>
              )}

              {step.appDemo && (
                <div className="ml-12 mt-4">
                  <DesignerStepDemo appDemo={step.appDemo} />
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

          <EmailCapture placement="for-chrome-guide" />
        </div>
      </article>
    </div>
  );
}
