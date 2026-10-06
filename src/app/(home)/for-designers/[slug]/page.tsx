import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DESIGNER_GUIDES } from '@/lib/designer-guides';
import { BN_DESIGNER_GUIDES } from '@/lib/i18n/bn/designer-guides';
import { DesignerGuideArticle } from '@/components/designer-guide-article';
import { ogImage } from '@/lib/og/image';

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

  const canonicalUrl = `https://claudecodeguide.dev/for-designers/${slug}`;

  return {
    title: { absolute: `${guide.title} | Claude for Designers` },
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
      ...(BN_DESIGNER_GUIDES[slug] && {
        languages: { en: canonicalUrl, bn: `https://claudecodeguide.dev/bn/for-designers/${slug}` },
      }),
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: canonicalUrl,
      images: [ogImage(`for-designers/${slug}`, guide.title)],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(DESIGNER_GUIDES).map((slug) => ({ slug }));
}

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
    <DesignerGuideArticle
      guide={guide}
      locale="en"
      alternateHref={BN_DESIGNER_GUIDES[slug] ? `/bn/for-designers/${slug}` : undefined}
    />
  );
}
