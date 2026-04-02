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
import { getAffiliateCtasForPage } from '@/lib/affiliate-cta-config';
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

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        {inlineCta ? (
          <div className="mb-6">
            <AffiliateCTA {...inlineCta} />
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

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
    },
  };
}
