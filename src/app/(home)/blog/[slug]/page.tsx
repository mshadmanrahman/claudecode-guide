import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { BlogContent } from '@/components/blog-content';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, blogPosts } from '@/data/blog-posts';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Claude Code Guide Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: '/og-home.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og-home.png'],
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

  return (
    <div className="flex flex-col bg-fd-background">
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>

        <div className="flex items-center gap-3 text-sm text-fd-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {post.author}
          </span>
        </div>

        <h1 className="font-display text-3xl font-normal tracking-tight text-fd-foreground sm:text-4xl mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-fd-muted-foreground mb-6">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-12">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="inline-flex items-center gap-1 rounded-full bg-fd-muted px-2.5 py-1 text-xs text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
            >
              <Tag className="h-2.5 w-2.5" />
              {tag}
            </Link>
          ))}
        </div>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-normal [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-fd-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_code]:rounded [&_code]:bg-fd-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_.blog-code-block_code]:bg-transparent [&_.blog-code-block_code]:p-0 [&_.blog-code-block_code]:rounded-none [&_.blog-code-block_pre]:bg-transparent [&_.blog-code-block_pre]:p-0 [&_.blog-code-block_pre]:m-0 [&_.blog-code-block_pre]:border-0 [&_li]:text-fd-muted-foreground [&_table]:text-sm [&_th]:text-left [&_th]:p-3 [&_th]:border-b [&_th]:border-fd-border [&_td]:p-3 [&_td]:border-b [&_td]:border-fd-border [&_a]:text-fd-foreground [&_a]:underline [&_a]:hover:text-fd-muted-foreground [&_strong]:text-fd-foreground [&_em]:text-fd-foreground [&_blockquote]:border-l-2 [&_blockquote]:border-fd-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-fd-muted-foreground"
        >
          <BlogContent html={post.content} />
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-fd-border pt-8">
            <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground mb-6">
              Related Posts
            </h2>
            <div className="grid gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:border-fd-muted-foreground/30 hover:bg-fd-accent"
                >
                  <div className="flex items-center gap-2 text-xs text-fd-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(related.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="font-display text-base font-normal tracking-tight text-fd-foreground group-hover:underline">
                    {related.title}
                  </h3>
                  <p className="text-sm text-fd-muted-foreground line-clamp-2">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-fd-border pt-8">
          <EmailCapture />
        </div>
      </article>
    </div>
  );
}
