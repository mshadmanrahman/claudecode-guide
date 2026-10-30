import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TeacherGuideArticle } from '@/components/teacher-guide-article';
import { TEACHER_GUIDES } from '@/lib/teacher-guides';
import { BN_TEACHER_GUIDES } from '@/lib/i18n/bn/teacher-guides';
import { sourceHash } from '@/lib/i18n/source-hash';
import { ogImage } from '@/lib/og/image';
import { seoTitle } from '@/lib/seo-title';

/** Bangla teacher guides. Only translated slugs get a page. */
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(BN_TEACHER_GUIDES).map((slug) => ({ slug }));
}

function isStale(slug: string): boolean {
  const bn = BN_TEACHER_GUIDES[slug];
  const en = TEACHER_GUIDES[slug];
  return Boolean(bn && en && bn.sourceHash !== sourceHash(en));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = BN_TEACHER_GUIDES[slug]?.content;
  if (!guide) return {};

  const url = `https://claudecodeguide.dev/bn/for-teachers/${slug}`;
  const title = seoTitle(guide.title, 'শিক্ষকদের জন্য Claude');

  return {
    title: { absolute: title },
    description: guide.description,
    alternates: {
      canonical: url,
      languages: { en: `https://claudecodeguide.dev/for-teachers/${slug}`, bn: url },
    },
    openGraph: {
      title,
      description: guide.description,
      type: 'article',
      url,
      locale: 'bn_BD',
      images: [ogImage(`for-teachers/${slug}`, TEACHER_GUIDES[slug]?.title ?? guide.title)],
    },
    twitter: { card: 'summary_large_image', title, description: guide.description },
  };
}

export default async function BnTeacherGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = BN_TEACHER_GUIDES[slug]?.content;
  if (!guide) notFound();

  return (
    <TeacherGuideArticle
      guide={guide}
      locale="bn"
      alternateHref={`/for-teachers/${slug}`}
      stale={isStale(slug)}
    />
  );
}
