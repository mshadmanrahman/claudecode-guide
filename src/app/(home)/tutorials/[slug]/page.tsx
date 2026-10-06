import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TutorialArticle } from "@/components/tutorial-article";
import { TUTORIALS } from "@/lib/tutorials";
import { BN_TUTORIALS } from "@/lib/i18n/bn/tutorials";
import { ogImage } from "@/lib/og/image";

const ALL_SLUGS = Object.keys(TUTORIALS);

/* ------------------------------------------------------------------ */
/*  Static params for pre-rendering                                    */
/* ------------------------------------------------------------------ */

export function generateStaticParams(): Array<{ slug: string }> {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS[slug];
  if (!tutorial) return { title: "Tutorial not found" };

  const canonicalUrl = `https://claudecodeguide.dev/tutorials/${slug}`;
  const seoTitle = tutorial.title.includes("Claude Code")
    ? tutorial.title
    : `${tutorial.title} | Claude Code Tutorial`;

  return {
    title: { absolute: seoTitle },
    description: tutorial.description,
    alternates: {
      canonical: canonicalUrl,
      languages: BN_TUTORIALS[slug]
        ? { en: canonicalUrl, bn: `https://claudecodeguide.dev/bn/tutorials/${slug}` }
        : undefined,
    },
    openGraph: {
      title: seoTitle,
      description: tutorial.description,
      type: "article",
      url: canonicalUrl,
      images: [ogImage(`tutorials/${slug}`, tutorial.title)],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: tutorial.description,
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = TUTORIALS[slug];

  if (!tutorial) {
    notFound();
  }

  const hasBn = Boolean(BN_TUTORIALS[slug]);
  return (
    <TutorialArticle
      tutorial={tutorial}
      locale="en"
      alternateHref={hasBn ? `/bn/tutorials/${slug}` : undefined}
    />
  );
}
