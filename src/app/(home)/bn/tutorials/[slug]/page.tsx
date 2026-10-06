import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TutorialArticle } from "@/components/tutorial-article";
import { TUTORIALS } from "@/lib/tutorials";
import { BN_TUTORIALS } from "@/lib/i18n/bn/tutorials";
import { sourceHash } from "@/lib/i18n/source-hash";
import { ogImage } from "@/lib/og/image";

/**
 * Bangla tutorials. Only slugs with a translation get a page; the rest have
 * no Bangla URL at all, so nothing here is half translated.
 */
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(BN_TUTORIALS).map((slug) => ({ slug }));
}

function isStale(slug: string): boolean {
  const bn = BN_TUTORIALS[slug];
  const en = TUTORIALS[slug];
  return Boolean(bn && en && bn.sourceHash !== sourceHash(en));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = BN_TUTORIALS[slug]?.content;
  if (!tutorial) return { title: "Tutorial not found" };

  const url = `https://claudecodeguide.dev/bn/tutorials/${slug}`;
  const title = `${tutorial.title} | Claude Code টিউটোরিয়াল`;

  return {
    title: { absolute: title },
    description: tutorial.description,
    alternates: {
      canonical: url,
      languages: { en: `https://claudecodeguide.dev/tutorials/${slug}`, bn: url },
    },
    openGraph: {
      title,
      description: tutorial.description,
      type: "article",
      url,
      locale: "bn_BD",
      images: [ogImage(`tutorials/${slug}`, TUTORIALS[slug]?.title ?? tutorial.title)],
    },
    twitter: { card: "summary_large_image", title, description: tutorial.description },
  };
}

export default async function BnTutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = BN_TUTORIALS[slug]?.content;
  if (!tutorial) notFound();

  return (
    <TutorialArticle
      tutorial={tutorial}
      locale="bn"
      alternateHref={`/tutorials/${slug}`}
      stale={isStale(slug)}
    />
  );
}
