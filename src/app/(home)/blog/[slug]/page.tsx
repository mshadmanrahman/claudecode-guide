import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Paintbrush,
  Mic,
  NotebookPen,
} from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { GithubStarCta } from "@/components/github-star-cta";
import { BlogContent } from "@/components/blog-content";
import { AuthorBio } from "@/components/author-bio";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import { ArticleSchema } from "@/components/article-schema";
import { ArticleHeader } from "@/components/docs/article-header";
import { ogImage } from "@/lib/og/image";

const DESIGNER_RELEVANT_SLUGS = new Set([
  "claude-code-for-non-engineers",
  "8-ways-pms-use-claude-code-without-writing-code",
  "claude-md-is-not-optional",
  "context-beats-cleverness",
  "5-claude-md-mistakes",
  "7-claude-md-sections-every-project-needs",
  "why-most-people-use-claude-code-wrong",
  "the-cold-start-problem",
  "3-prompts-that-changed-everything",
  "rules-that-follow-claude-everywhere",
  "your-first-hour-with-claude-code",
]);

const WISPR_RELEVANT_SLUGS = new Set([
  "how-to-use-claude-in-chrome-browser",
  "how-to-use-claude-to-write-excel-formulas",
  "why-most-people-use-claude-code-wrong",
  "3-prompts-that-changed-everything",
  "context-beats-cleverness",
  "your-first-hour-with-claude-code",
]);

const GRANOLA_RELEVANT_SLUGS = new Set([
  "claude-for-teachers-reclaim-planning-time",
  "8-ways-pms-use-claude-code-without-writing-code",
  "weekly-status-writes-itself",
  "top-5-claude-code-workflows-for-solo-founders",
  "discovery-sprint",
]);

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const canonicalUrl = `https://claudecodeguide.dev/blog/${post.slug}`;
  const seoTitle = post.seoTitle ?? post.title;
  const seoDescription = post.seoDescription ?? post.description;

  return {
    title: { absolute: `${seoTitle} | Claude Code Guide Blog` },
    description: seoDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [ogImage(`blog/${post.slug}`, post.title)],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 3);
  const wordCount = post.content
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 230));

  return (
    <div className="flex flex-col">
      <ArticleSchema
        headline={post.title}
        description={post.description}
        url={`https://claudecodeguide.dev/blog/${post.slug}`}
        datePublished={post.date}
      />
      <article className="ccg-post mx-auto w-full px-4 pt-10 pb-16 sm:px-6 sm:pt-14">
        <Link href="/blog" className="ccg-back">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          back to blog
        </Link>

        <ArticleHeader
          crumbs={["blog", formatDate(post.date)]}
          meta={`${readMinutes} min read`}
          title={post.title}
          lead={post.description}
        >
          <ul className="ccg-tags mt-5" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </ArticleHeader>

        <div className="prose ccg-prose max-w-none">
          <BlogContent html={post.content} />
        </div>

        {DESIGNER_RELEVANT_SLUGS.has(params.slug) && (
          <div className="glass mt-12 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Paintbrush className="h-4 w-4 text-fd-muted-foreground" />
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-fd-muted-foreground">
                For designers
              </span>
            </div>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              If you are a UX or UI designer, we have a guide series built
              specifically for your work: decoding briefs, running heuristic
              evaluations, synthesizing research, and handing off to code. No
              terminal required for most of it.
            </p>
            <Link
              href="/for-designers"
              className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:underline"
            >
              Browse the designer guides
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {WISPR_RELEVANT_SLUGS.has(params.slug) && (
          <div className="glass mt-6 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mic className="h-4 w-4 text-fd-muted-foreground" />
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-fd-muted-foreground">
                What I use for this
              </span>
            </div>
            <p className="text-sm font-medium text-fd-foreground mb-2">
              Wispr Flow
            </p>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              Instead of typing prompts, I speak them. Wispr Flow transcribes
              voice directly into any input field, including Claude. You end up
              giving Claude more context, faster. I use it constantly. Free to
              try.
            </p>
            <a
              href="https://ref.wisprflow.ai/shadman-rahman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:underline"
            >
              Try Wispr Flow free
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {GRANOLA_RELEVANT_SLUGS.has(params.slug) && (
          <div className="glass mt-6 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <NotebookPen className="h-4 w-4 text-fd-muted-foreground" />
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-fd-muted-foreground">
                What I use for this
              </span>
            </div>
            <p className="text-sm font-medium text-fd-foreground mb-2">
              Granola
            </p>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              Granola transcribes and summarizes meetings automatically in the
              background. I paste the notes straight into Claude. No manual
              capture, no missed context. It has saved hours of admin time every
              week.
            </p>
            <a
              href="https://www.granola.ai?via=shadman-rahman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:underline"
            >
              Try Granola free
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        <GithubStarCta />

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-fd-border pt-8" aria-labelledby="related-posts">
            <h2
              id="related-posts"
              className="mb-6 text-title font-semibold tracking-[-0.025em] text-fd-foreground"
            >
              Related posts
            </h2>
            <div className="grid gap-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="glass hm-card flex flex-col gap-2 rounded-xl p-5"
                >
                  <time dateTime={related.date} className="font-mono text-xs text-fd-muted-foreground">
                    {formatDate(related.date)}
                  </time>
                  <h3 className="text-body font-medium tracking-[-0.01em] text-fd-foreground">
                    {related.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-fd-muted-foreground">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 border-t border-fd-border pt-8">
          <EmailCapture placement="blog-post" />
        </div>

        <AuthorBio />
      </article>
    </div>
  );
}
