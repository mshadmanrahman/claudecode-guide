import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { CHROME_GUIDES } from '@/lib/chrome-guides';
import { EmailCapture } from '@/components/email-capture';
import { CopyBlock } from '@/components/guide/copy-block';
import { DesignerStepDemo } from '@/components/designer-step-demo';
import { PersonaGuideTracker } from '@/components/persona-guide-tracker';
import { ArticleSchema } from '@/components/article-schema';
import { AuthorBio } from '@/components/author-bio';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = CHROME_GUIDES[slug];

  if (!guide) return {};

  const canonicalUrl = `https://claudecodeguide.dev/for-chrome/${slug}`;

  return {
    title: { absolute: `${guide.title} | Claude for Chrome` },
    description: guide.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: canonicalUrl,
      images: [{ url: '/api/og', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: ['/api/og'],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CHROME_GUIDES).map((slug) => ({ slug }));
}

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-[var(--chip)] text-[var(--acc)] '
      : 'bg-[var(--chip)] text-[var(--acc)] ';

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
    <div className="flex flex-col">
      <ArticleSchema
        headline={guide.title}
        description={guide.description}
        url={`https://claudecodeguide.dev/for-chrome/${slug}`}
      />
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

          <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
            {guide.title}
          </h1>

          <p className="mt-4 text-lg text-fd-muted-foreground">
            {guide.description}
          </p>
        </header>

        {/* Situation card */}
        {guide.situation && (
          <div className="mb-10 rounded-xl border border-fd-border bg-fd-accent/50 px-6 py-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">
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
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">
              What you walk away with
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
              The difference one prompt makes
            </p>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--code)] p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-300  font-mono">
                Don&apos;t
              </p>
              <p className="font-mono text-sm text-fd-foreground whitespace-pre-wrap leading-relaxed">
                {guide.promptContrast.bad}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--chip)] p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--acc)]  font-mono">
                Do this
              </p>
              <p className="font-mono text-sm text-fd-foreground whitespace-pre-wrap leading-relaxed">
                {guide.promptContrast.good}
              </p>
            </div>
            {guide.promptContrast.why && (
              <div className="rounded-xl border border-fd-border bg-fd-accent/30 p-4">
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fd-border bg-[var(--code)] text-sm font-medium text-fd-muted-foreground">
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
                  <DesignerStepDemo appDemo={step.appDemo} skipPrompts={Boolean(step.code)} />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div data-persona-guide-sentinel className="mt-20 space-y-8">
          {/* What's next */}
          <div className="rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-6">
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

        <AuthorBio />
      </article>
    </div>
  );
}
