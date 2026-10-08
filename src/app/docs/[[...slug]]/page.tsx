import { source } from "@/lib/source";
import { DocsPage } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { ClaudeCodeMock } from "@/components/claude-code-mock";
import { AppSessionMock } from "@/components/docs/app-session-mock";
import { ModelPickerMock } from "@/components/docs/model-picker-mock";
import { VocabBridge } from "@/components/vocab-bridge";
import { EmailCapture } from "@/components/email-capture";
import { AffiliateCTA } from "@/components/affiliate-cta";
import { ComparisonRelatedLinks } from "@/components/comparison-related-links";
import { ChapterNav } from "@/components/docs/chapter-nav";
import { GithubStarCta } from "@/components/github-star-cta";
import { SectionIndex } from "@/components/docs/section-index";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocPre } from "@/components/docs/doc-pre";
import { ArticleHeader } from "@/components/docs/article-header";
import { PromptCard } from "@/components/prompt-card";
import { FromClaude } from "@/components/from-claude";
import { UseCaseMeta } from "@/components/use-case-meta";
import { AuthorBio } from "@/components/author-bio";
import { UseCaseWalkthrough } from "@/components/use-case-walkthrough";
import {
  ProjectFolderIllustration,
  PromptComposerIllustration,
  ClaudeQuestionsIllustration,
  FileWrittenIllustration,
  FileEditingIllustration,
  ClaudeKnowsIllustration,
  CalendarEventIllustration,
  MultiSourcePullIllustration,
  BriefDocumentIllustration,
  SkimOnPhoneIllustration,
  PreparedReadyIllustration,
  AntiSycophancyHero,
} from "@/components/illustrations";
import {
  MemoryRouterDiagram,
  EveryTurnTaxDiagram,
  MoreFilesTrapDiagram,
  ClaudeMdRouterDiagram,
  IsolationWallsDiagram,
  FiveCLoopDiagram,
  CheckPanelDiagram,
  PersonaFlowDiagram,
  PromptCachePrefixDiagram,
  EnvVarScopesDiagram,
  ReleaseCheckDiagram,
} from "@/components/docs/doc-diagrams";
import { getAffiliateCtasForPage } from "@/lib/affiliate-cta-config";
import { getComparisonArticleMetadata } from "@/lib/comparison-article";
import { getPageNavigation, getSections } from "@/lib/docs-navigation";
import type { Metadata } from "next";
import { ogImage } from "@/lib/og/image";

const mdxComponents = {
  ...defaultMdxComponents,
  pre: DocPre,
  Callout: DocCallout,
  // Scripted sessions render in the desktop app by default; TerminalMock keeps the CLI look.
  ClaudeCodeMock: AppSessionMock,
  TerminalMock: ClaudeCodeMock,
  ModelPickerMock,
  VocabBridge,
  PromptCard,
  FromClaude,
  UseCaseMeta,
  AuthorBio,
  UseCaseWalkthrough,
  ProjectFolderIllustration,
  PromptComposerIllustration,
  ClaudeQuestionsIllustration,
  FileWrittenIllustration,
  FileEditingIllustration,
  ClaudeKnowsIllustration,
  CalendarEventIllustration,
  MultiSourcePullIllustration,
  BriefDocumentIllustration,
  SkimOnPhoneIllustration,
  PreparedReadyIllustration,
  AntiSycophancyHero,
  MemoryRouterDiagram,
  EveryTurnTaxDiagram,
  MoreFilesTrapDiagram,
  ClaudeMdRouterDiagram,
  IsolationWallsDiagram,
  FiveCLoopDiagram,
  CheckPanelDiagram,
  PersonaFlowDiagram,
  PromptCachePrefixDiagram,
  EnvVarScopesDiagram,
  ReleaseCheckDiagram,
};

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

  const canonicalUrl = `https://claudecodeguide.dev/docs/${params.slug.join("/")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description ?? "",
    url: canonicalUrl,
    author: { "@type": "Person", name: "Shadman Rahman" },
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
        />

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

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Documentation",
      description:
        "Everything you need to know about Claude Code, organized by topic.",
      alternates: { canonical: "https://claudecodeguide.dev/docs" },
      openGraph: { images: [ogImage("docs", "Documentation")] },
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const canonicalUrl = `https://claudecodeguide.dev/docs/${params.slug.join("/")}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      url: canonicalUrl,
      images: [ogImage(`docs/${params.slug.join("/")}`, page.data.title)],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
    },
  };
}
