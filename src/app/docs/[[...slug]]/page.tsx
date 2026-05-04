import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DemoCard } from '@/components/demo-card';
import { VocabBridge } from '@/components/vocab-bridge';
import { EmailCapture } from '@/components/email-capture';
import { AffiliateCTA } from '@/components/affiliate-cta';
import { ComparisonRelatedLinks } from '@/components/comparison-related-links';
import { ChapterNav } from '@/components/docs/chapter-nav';
import { SectionIndex } from '@/components/docs/section-index';
import { PromptCard } from '@/components/prompt-card';
import { FromClaude } from '@/components/from-claude';
import { UseCaseMeta } from '@/components/use-case-meta';
import { AuthorBio } from '@/components/author-bio';
import { UseCaseWalkthrough } from '@/components/use-case-walkthrough';
import {
  ProjectFolderIllustration,
  PromptComposerIllustration,
  ClaudeQuestionsIllustration,
  FileWrittenIllustration,
  FileEditingIllustration,
  ClaudeKnowsIllustration,
  CalendarEventIllustration,
  MultiSourcePullIllustration,
  BriefDocumentIllustration,
  SkimOnPhoneIllustration,
  PreparedReadyIllustration,
  AntiSycophancyHero,
} from '@/components/illustrations';
import { getAffiliateCtasForPage } from '@/lib/affiliate-cta-config';
import { getComparisonArticleMetadata } from '@/lib/comparison-article';
import { getPageNavigation, getSections } from '@/lib/docs-navigation';
import type { Metadata } from 'next';

const mdxComponents = {
  ...defaultMdxComponents,
  DemoCard,
  VocabBridge,
  PromptCard,
  FromClaude,
  UseCaseMeta,
  AuthorBio,
  UseCaseWalkthrough,
  ProjectFolderIllustration,
  PromptComposerIllustration,
  ClaudeQuestionsIllustration,
  FileWrittenIllustration,
  FileEditingIllustration,
  ClaudeKnowsIllustration,
  CalendarEventIllustration,
  MultiSourcePullIllustration,
  BriefDocumentIllustration,
  SkimOnPhoneIllustration,
  PreparedReadyIllustration,
  AntiSycophancyHero,
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  // /docs with no slug -> show section index
  if (!params.slug || params.slug.length === 0) {
    const sections = getSections();
    return <SectionIndex sections={sections} />;
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any: fumadocs lazy-loads body/toc at runtime
  const data = page.data as any;
  const MDX = data.body;
  const pageSlug = params.slug?.length ? `docs/${params.slug.join('/')}` : 'docs';
  const ctas = getAffiliateCtasForPage(pageSlug);
  const inlineCta = ctas.find((cta) => cta.placement === 'inline');
  const midBannerCta = ctas.find((cta) => cta.placement === 'mid-banner');
  const endCardCta = ctas.find((cta) => cta.placement === 'end-card');
  const comparisonMetadata = getComparisonArticleMetadata(data);
  const isComparisonPage = pageSlug.startsWith('docs/comparisons/');
  const hasComparisonMetadata =
    Boolean(comparisonMetadata.targetKeyword) ||
    comparisonMetadata.comparisonEntities.length > 0;
  const hasRelatedLinks = comparisonMetadata.relatedLinks.length > 0;

  // Chapter Book navigation
  const navSlug = params.slug?.join('/') ?? '';
  const { prev, next, current, sectionPages } = getPageNavigation(navSlug);

  // Table of contents for the floating TOC
  const toc = data.toc ?? [];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <header className="mb-8">
        {current?.section && (
          <p className="text-sm font-medium text-fd-primary mb-2">{current.section}</p>
        )}
        <h1 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
          {data.title}
        </h1>
        {data.description && (
          <p className="mt-3 text-lg text-fd-muted-foreground">{data.description}</p>
        )}
      </header>

      {/* Table of contents (inline, collapsible) */}
      {toc.length > 2 && (
        <details className="mb-8 rounded-xl border border-fd-border bg-fd-card">
          <summary className="cursor-pointer px-5 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent rounded-xl transition-colors">
            On this page ({toc.length} sections)
          </summary>
          <nav className="px-5 pb-4">
            <ul className="space-y-1">
              {toc.map((item: { url: string; title: string; depth: number }) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-foreground ${
                      item.depth > 2
                        ? 'pl-6 text-fd-muted-foreground'
                        : 'text-fd-muted-foreground'
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      )}

      {/* Dev-only comparison metadata */}
      {process.env.NODE_ENV === 'development' &&
      isComparisonPage &&
      hasComparisonMetadata ? (
        <section className="mb-6 rounded-xl border border-dashed border-fd-border bg-fd-card/50 px-4 py-4 sm:px-5">
          {comparisonMetadata.targetKeyword ? (
            <p className="text-sm text-fd-muted-foreground">
              <span className="font-medium text-fd-foreground">
                Target keyword:
              </span>{' '}
              {comparisonMetadata.targetKeyword}
            </p>
          ) : null}
          {comparisonMetadata.comparisonEntities.length > 0 ? (
            <p className="mt-2 text-sm text-fd-muted-foreground">
              <span className="font-medium text-fd-foreground">
                Comparison entities:
              </span>{' '}
              {comparisonMetadata.comparisonEntities.join(' vs ')}
            </p>
          ) : null}
        </section>
      ) : null}

      {/* Inline affiliate CTA */}
      {inlineCta ? (
        <div className="mb-6">
          <AffiliateCTA {...inlineCta} />
        </div>
      ) : null}

      {/* Related comparison links (top) */}
      {isComparisonPage && hasRelatedLinks ? (
        <div className="mb-8">
          <ComparisonRelatedLinks
            title="Related Guides Near This Intro"
            links={comparisonMetadata.relatedLinks}
          />
        </div>
      ) : null}

      {/* Main content */}
      <div className="prose prose-fd max-w-none">
        <MDX components={mdxComponents} />
      </div>

      {/* Mid-banner affiliate CTA */}
      {midBannerCta ? (
        <div className="mt-10">
          <AffiliateCTA {...midBannerCta} />
        </div>
      ) : null}

      {/* End-card affiliate CTA */}
      {endCardCta ? (
        <div className="mt-8">
          <AffiliateCTA {...endCardCta} />
        </div>
      ) : null}

      {/* Related comparison links (bottom) */}
      {isComparisonPage && hasRelatedLinks ? (
        <div className="mt-10">
          <ComparisonRelatedLinks
            title="Continue Your Comparison Research"
            links={comparisonMetadata.relatedLinks}
          />
        </div>
      ) : null}

      {/* Email capture */}
      <div className="mt-16 border-t border-fd-border pt-8">
        <EmailCapture />
      </div>

      {/* Chapter Book navigation */}
      {current && (
        <ChapterNav
          prev={prev}
          next={next}
          current={current}
          sectionPages={sectionPages}
        />
      )}
    </article>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Documentation',
      description: 'Everything you need to know about Claude Code, organized by topic.',
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      images: [{ url: '/og-home.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: ['/og-home.png'],
    },
  };
}
