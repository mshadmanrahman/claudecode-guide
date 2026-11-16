import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Languages } from "lucide-react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { sourceBn } from "@/lib/source";
import { readEnglishDoc } from "@/lib/i18n/bn-docs";
import { sourceHash } from "@/lib/i18n/source-hash";
import { ui } from "@/lib/i18n/locale";
import { mdxComponents } from "@/components/docs/mdx-components";
import { ArticleHeader } from "@/components/docs/article-header";
import { ComparisonRelatedLinks } from "@/components/comparison-related-links";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { EmailCapture } from "@/components/email-capture";
import { getComparisonArticleMetadata } from "@/lib/comparison-article";
import { ogImage } from "@/lib/og/image";
import { seoTitle } from "@/lib/seo-title";
import { X_HANDLE } from "@/lib/site";

/**
 * Bangla docs. Only pages with a translation in content/docs-bn get a URL, at
 * the same slug as the English page under /docs.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return sourceBn.generateParams();
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (n: number) => String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export default async function BnDocPage(props: PageProps) {
  const { slug } = await props.params;
  const page = sourceBn.getPage(slug);
  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any: fumadocs lazy-loads body/toc at runtime
  const data = page.data as any;
  const MDX = data.body;
  const t = ui("bn");
  const path = slug.join("/");
  const englishHref = `/docs/${path}`;
  const english = readEnglishDoc(path);
  const stale = english !== null && data.sourceHash !== sourceHash(english);
  const related = getComparisonArticleMetadata(data).relatedLinks;
  const toc = data.toc ?? [];

  const contents: { content?: string }[] = data.structuredData?.contents ?? [];
  const wordCount = contents.reduce(
    (sum, block) => sum + (block.content?.split(/\s+/).filter(Boolean).length ?? 0),
    0,
  );
  const readMinutes = Math.max(1, Math.round(wordCount / 230));

  const checkedOn: string | undefined = data.checkedOn;
  const sources: { title: string; url: string }[] = data.sources ?? [];

  const url = `https://claudecodeguide.dev/bn/docs/${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description ?? "",
    url,
    inLanguage: "bn",
    author: { "@type": "Person", name: "Shadman Rahman" },
    ...(checkedOn ? { dateModified: checkedOn } : {}),
    publisher: { "@type": "Organization", name: "Claude Code Guide", url: "https://claudecodeguide.dev" },
  };

  return (
    <div lang="bn" className="text-[var(--ink)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        crumbs={[
          { name: "বাংলা", path: "/bn" },
          { name: data.title, path: `/bn/docs/${path}` },
        ]}
      />
      <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-24 sm:px-6 md:pt-12">
        <div className="mb-6 flex justify-end">
          <Link
            href={englishHref}
            hrefLang="en"
            lang="en"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)] transition-colors hover:border-[var(--acc)] hover:text-[var(--ink)]"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {t.switchLanguage}
          </Link>
        </div>

        <ArticleHeader
          crumbs={["bn", "docs", slug[0]]}
          meta={`${toBn(readMinutes)} মিনিটের পড়া`}
          title={data.title}
          lead={data.description}
        >
          {checkedOn && sources.length > 0 ? (
            <p className="mt-4 text-sm text-fd-muted-foreground">
              <time dateTime={checkedOn}>{checkedOn}</time> তারিখে official source-এর সঙ্গে মিলিয়ে দেখা:{" "}
              {sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 ? ", " : ""}
                  <a href={s.url} lang="en" className="underline hover:text-fd-foreground">
                    {s.title}
                  </a>
                </span>
              ))}
              ।
            </p>
          ) : null}
        </ArticleHeader>

        {stale && (
          <p role="note" className="glass mb-8 rounded-xl px-4 py-3 text-sm text-[var(--muted)]">
            {t.staleNotice}{" "}
            <Link href={englishHref} hrefLang="en" className="text-[var(--acc)] underline underline-offset-4">
              {t.readEnglish}
            </Link>
          </p>
        )}

        {toc.length > 3 && (
          <InlineTOC items={toc} className="mb-10">
            এই পেজে যা আছে
          </InlineTOC>
        )}

        <div className="prose prose-fd ccg-prose max-w-none">
          <MDX components={mdxComponents} />
        </div>

        {related.length > 0 && (
          <div className="mt-10">
            <ComparisonRelatedLinks title="আরও পড়ুন" links={related} />
          </div>
        )}

        <div className="mt-16 border-t border-fd-border pt-8">
          <EmailCapture placement="bn-docs-page" />
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = sourceBn.getPage(slug);
  if (!page) notFound();

  const path = slug.join("/");
  const url = `https://claudecodeguide.dev/bn/docs/${path}`;
  const en = `https://claudecodeguide.dev/docs/${path}`;
  const title = seoTitle(page.data.seoTitle ?? page.data.title, "Claude Code Guide");

  return {
    title: { absolute: title },
    description: page.data.description,
    alternates: { canonical: url, languages: { "x-default": en, en, bn: url } },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      url,
      locale: "bn_BD",
      images: [ogImage(`docs/${path}`, page.data.title)],
    },
    twitter: {
      site: X_HANDLE,
      creator: X_HANDLE,
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
    },
  };
}
