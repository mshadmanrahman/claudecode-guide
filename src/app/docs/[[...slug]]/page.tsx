import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DemoCard } from '@/components/demo-card';
import { EmailCapture } from '@/components/email-capture';
import { AffiliateCTA } from '@/components/affiliate-cta';
import { ComparisonRelatedLinks } from '@/components/comparison-related-links';
import { getAffiliateCtasForPage } from '@/lib/affiliate-cta-config';
import { getComparisonArticleMetadata } from '@/lib/comparison-article';
import type { Metadata } from 'next';

const mdxComponents = {
  ...defaultMdxComponents,
  DemoCard,
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fumadocs lazy-loads body/toc at runtime
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

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
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
        {inlineCta ? (
          <div className="mb-6">
            <AffiliateCTA {...inlineCta} />
          </div>
        ) : null}
        {isComparisonPage && hasRelatedLinks ? (
          <div className="mb-8">
            <ComparisonRelatedLinks
              title="Related Guides Near This Intro"
              links={comparisonMetadata.relatedLinks}
            />
          </div>
        ) : null}
        <MDX components={mdxComponents} />
        {midBannerCta ? (
          <div className="mt-10">
            <AffiliateCTA {...midBannerCta} />
          </div>
        ) : null}
        {endCardCta ? (
          <div className="mt-8">
            <AffiliateCTA {...endCardCta} />
          </div>
        ) : null}
        {isComparisonPage && hasRelatedLinks ? (
          <div className="mt-10">
            <ComparisonRelatedLinks
              title="Continue Your Comparison Research"
              links={comparisonMetadata.relatedLinks}
            />
          </div>
        ) : null}
        <div className="mt-16 border-t border-fd-border pt-8">
          <EmailCapture />
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const ogImageUrl = `/api/og?title=${encodeURIComponent(page.data.title)}&description=${encodeURIComponent(page.data.description ?? '')}`;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [ogImageUrl],
    },
  };
}
