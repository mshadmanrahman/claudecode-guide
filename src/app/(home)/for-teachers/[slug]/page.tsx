import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TEACHER_GUIDES } from '@/lib/teacher-guides';
import { BN_TEACHER_GUIDES } from '@/lib/i18n/bn/teacher-guides';
import { TeacherGuideArticle } from '@/components/teacher-guide-article';
import { ogImage } from '@/lib/og/image';
import { seoTitle } from '@/lib/seo-title';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = TEACHER_GUIDES[slug];

  if (!guide) return {};

  const canonicalUrl = `https://claudecodeguide.dev/for-teachers/${slug}`;

  return {
    title: { absolute: seoTitle(guide.title, 'Claude for Teachers') },
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
      languages: BN_TEACHER_GUIDES[slug]
        ? { en: canonicalUrl, bn: `https://claudecodeguide.dev/bn/for-teachers/${slug}` }
        : undefined,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: canonicalUrl,
      images: [ogImage(`for-teachers/${slug}`, guide.title)],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(TEACHER_GUIDES).map((slug) => ({ slug }));
}

export default async function TeacherGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = TEACHER_GUIDES[slug];

  if (!guide) {
    notFound();
  }

  return (
    <TeacherGuideArticle
      guide={guide}
      locale="en"
      alternateHref={BN_TEACHER_GUIDES[slug] ? `/bn/for-teachers/${slug}` : undefined}
    />
  );
}
