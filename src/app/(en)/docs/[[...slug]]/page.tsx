import Link from "next/link";
import { source, sourceBn } from "@/lib/source";
import { DocsPage } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/email-capture";
import { AffiliateCTA } from "@/components/affiliate-cta";
import { ComparisonRelatedLinks } from "@/components/comparison-related-links";
import { ChapterNav } from "@/components/docs/chapter-nav";
import { GithubStarCta } from "@/components/github-star-cta";
import { SectionIndex } from "@/components/docs/section-index";
import { ArticleHeader } from "@/components/docs/article-header";
import { getAffiliateCtasForPage } from "@/lib/affiliate-cta-config";
import { getComparisonArticleMetadata } from "@/lib/comparison-article";
import { getPageNavigation, getSections } from "@/lib/docs-navigation";
import type { Metadata } from "next";
import { ogImage } from "@/lib/og/image";
import { seoTitle } from "@/lib/seo-title";
import { X_HANDLE } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { mdxComponents } from "@/components/docs/mdx-components";

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
  const pageSlug = params.slug?.length
    ? `docs/${params.slug.join("/")}`
    : "docs";
  const ctas = getAffiliateCtasForPage(pageSlug);
  const inlineCta = ctas.find((cta) => cta.placement === "inline");
  const midBannerCta = ctas.find((cta) => cta.placement === "mid-banner");
  const endCardCta = ctas.find((cta) => cta.placement === "end-card");
  const comparisonMetadata = getComparisonArticleMetadata(data);
  const isComparisonPage = pageSlug.startsWith("docs/comparisons/");
  const hasComparisonMetadata =
    Boolean(comparisonMetadata.targetKeyword) ||
    comparisonMetadata.comparisonEntities.length > 0;
  const hasRelatedLinks = comparisonMetadata.relatedLinks.length > 0;

  // Chapter Book navigation
  const navSlug = params.slug?.join("/") ?? "";
  const { prev, next, current, sectionPages } = getPageNavigation(navSlug);

  // Table of contents for the floating TOC
  const toc = data.toc ?? [];

  // Reading time from the indexed text Fumadocs already extracts for search
  const contents: { content?: string }[] = data.structuredData?.contents ?? [];
  const wordCount = contents.reduce(
    (sum, block) => sum + (block.content?.split(/\s+/).filter(Boolean).length ?? 0),
    0,
  );
  const readMinutes = Math.max(1, Math.round(wordCount / 230));

  // "Checked on" line: only pages whose facts were compared with official sources carry it.
  const checkedOn: string | undefined = data.checkedOn;
  const sources: { title: string; url: string }[] = data.sources ?? [];
  const checkedOnLabel = checkedOn
    ? new Date(`${checkedOn}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : null;

  const canonicalUrl = `https://claudecodeguide.dev/docs/${params.slug.join("/")}`;
  const bnHref = sourceBn.getPage(params.slug) ? `/bn/docs/${params.slug.join("/")}` : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description ?? "",
    url: canonicalUrl,
    author: { "@type": "Person", name: "Shadman Rahman" },
    ...(checkedOn ? { dateModified: checkedOn } : {}),
    publisher: {
      "@type": "Organization",
      name: "Claude Code Guide",
      url: "https://claudecodeguide.dev",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: data.title, path: `/docs/${params.slug.join("/")}` },
        ]}
      />
      <DocsPage
        toc={toc}
        breadcrumb={{ enabled: false }}
        footer={{ enabled: false }}
        className="ccg-doc"
      >
        <ArticleHeader
          crumbs={["docs", ...(current?.section ? [current.section.toLowerCase()] : [])]}
          meta={`${readMinutes} min read`}
          title={data.title}
          lead={data.description}
        >
          {checkedOn && sources.length > 0 ? (
            <p className="mt-4 text-sm text-fd-muted-foreground">
              Checked on <time dateTime={checkedOn}>{checkedOnLabel}</time> against{" "}
              {sources.length === 1 ? "the official source" : "official sources"}:{" "}
              {sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 ? ", " : ""}
                  <a href={s.url} className="underline hover:text-fd-foreground">
                    {s.title}
                  </a>
                </span>
              ))}
              .
            </p>
          ) : null}
          {bnHref ? (
            <p className="mt-3 text-sm">
              <Link href={bnHref} hrefLang="bn" lang="bn" className="underline hover:text-fd-foreground">
                বাংলায় পড়ুন
              </Link>
            </p>
          ) : null}
        </ArticleHeader>

        {/* Dev-only comparison metadata */}
        {process.env.NODE_ENV === "development" &&
        isComparisonPage &&
        hasComparisonMetadata ? (
          <section className="mb-6 rounded-xl border border-dashed border-fd-border bg-fd-card/50 px-4 py-4 sm:px-5">
            {comparisonMetadata.targetKeyword ? (
              <p className="text-sm text-fd-muted-foreground">
                <span className="font-medium text-fd-foreground">
                  Target keyword:
                </span>{" "}
                {comparisonMetadata.targetKeyword}
              </p>
            ) : null}
            {comparisonMetadata.comparisonEntities.length > 0 ? (
              <p className="mt-2 text-sm text-fd-muted-foreground">
                <span className="font-medium text-fd-foreground">
                  Comparison entities:
                </span>{" "}
                {comparisonMetadata.comparisonEntities.join(" vs ")}
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
        <div className="prose prose-fd ccg-prose max-w-none">
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

        <GithubStarCta />

        {/* Email capture */}
        <div className="mt-16 border-t border-fd-border pt-8">
          <EmailCapture placement="docs-page" />
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
      </DocsPage>
    </>
  );
}

// Unknown slugs get the server-rendered 404 page (with links) instead of a client-rendered one.
export const dynamicParams = false;

export async function generateStaticParams() {
  // The empty slug is the /docs section index, which has no source page of its own.
  return [{ slug: [] }, ...source.generateParams()];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Claude Code Docs and Guides",
      description:
        "Claude Code docs in plain English: setup, CLAUDE.md, memory, skills, hooks, MCP servers, thinking modes, and honest comparisons with Cursor and Copilot.",
      alternates: { canonical: "https://claudecodeguide.dev/docs" },
      openGraph: { images: [ogImage("docs", "Documentation")] },
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const canonicalUrl = `https://claudecodeguide.dev/docs/${params.slug.join("/")}`;
  const bnUrl = sourceBn.getPage(params.slug)
    ? `https://claudecodeguide.dev/bn/docs/${params.slug.join("/")}`
    : null;

  return {
    title: { absolute: seoTitle(page.data.seoTitle ?? page.data.title, "Claude Code Guide") },
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
      ...(bnUrl ? { languages: { "x-default": canonicalUrl, en: canonicalUrl, bn: bnUrl } } : {}),
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      url: canonicalUrl,
      images: [ogImage(`docs/${params.slug.join("/")}`, page.data.title)],
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
