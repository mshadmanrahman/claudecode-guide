import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DesignerGuideArticle } from '@/components/designer-guide-article';
import { DESIGNER_GUIDES } from '@/lib/designer-guides';
import { BN_DESIGNER_GUIDES } from '@/lib/i18n/bn/designer-guides';
import { sourceHash } from '@/lib/i18n/source-hash';
import { ogImage } from '@/lib/og/image';

/** Bangla designer guides. Only translated slugs get a page. */
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(BN_DESIGNER_GUIDES).map((slug) => ({ slug }));
}

function isStale(slug: string): boolean {
  const bn = BN_DESIGNER_GUIDES[slug];
  const en = DESIGNER_GUIDES[slug];
  return Boolean(bn && en && bn.sourceHash !== sourceHash(en));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = BN_DESIGNER_GUIDES[slug]?.content;
  if (!guide) return {};

  const url = `https://claudecodeguide.dev/bn/for-designers/${slug}`;
  const title = `${guide.title} | Designer-দের জন্য Claude`;

  return {
    title: { absolute: title },
    description: guide.description,
    alternates: {
      canonical: url,
      languages: { en: `https://claudecodeguide.dev/for-designers/${slug}`, bn: url },
    },
    openGraph: {
      title,
      description: guide.description,
      type: 'article',
      url,
      locale: 'bn_BD',
      images: [ogImage(`for-designers/${slug}`, DESIGNER_GUIDES[slug]?.title ?? guide.title)],
    },
    twitter: { card: 'summary_large_image', title, description: guide.description },
  };
}

export default async function BnDesignerGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = BN_DESIGNER_GUIDES[slug]?.content;
  if (!guide) notFound();

  return (
    <DesignerGuideArticle
      guide={guide}
      locale="bn"
      alternateHref={`/for-designers/${slug}`}
      stale={isStale(slug)}
    />
  );
}
