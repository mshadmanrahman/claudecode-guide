'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SceneBackdrop } from '@/components/scene-backdrop';
import { EmailCapture } from '@/components/email-capture';
import { DemoCard } from '@/components/demo-card';
import { useState, useMemo } from 'react';
import { getSortedPosts, getAllTags } from '@/data/blog-posts';
import type { BlogPost } from '@/data/blog-posts';

import { KineticText } from '@/components/kinetic-text';
// ---------- Helpers ----------

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getTopTags(allTags: string[], posts: BlogPost[], limit: number): string[] {
  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  return [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

// ---------- Filter Pill ----------

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="ccg-filter"
    >
      {label}
    </button>
  );
}

// ---------- Tag list (inline on cards) ----------

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="ccg-tags" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

// ---------- Featured Hero Card ----------

function FeaturedHero({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass hm-card group flex flex-col overflow-hidden rounded-2xl lg:flex-row focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
    >
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8 lg:p-10">
        <div className="ccg-card-meta">
          <span className="ccg-pill">latest</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <h2 className="text-headline font-semibold leading-[1.1] tracking-[-0.035em] text-fd-foreground">
          {post.title}
        </h2>

        <p className="max-w-xl text-body leading-relaxed text-fd-muted-foreground">
          {post.description}
        </p>

        <TagList tags={post.tags.slice(0, 3)} />

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-fd-foreground">
          Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {/* Demo card on right side (desktop only) */}
      <div className="hidden border-t border-fd-border p-6 lg:flex lg:w-[380px] lg:shrink-0 lg:items-center lg:border-l lg:border-t-0 lg:p-8">
        <div className="w-full" onClick={(e) => e.preventDefault()}>
          <DemoCard
            title="claude-code"
            steps={[
              { type: 'cmd', text: 'claude', delay: 600 },
              { type: 'out', text: 'Loading CLAUDE.md...' },
              { type: 'success', text: 'Context loaded: 5 layers active' },
              { type: 'cmd', text: 'fix the auth bug in login.tsx', delay: 1000 },
              { type: 'out', text: 'Reading login.tsx...' },
              { type: 'out', text: 'Found: missing await on verifyToken()' },
              { type: 'success', text: 'Fixed and saved login.tsx' },
              { type: 'cmd', text: '/commit', delay: 800 },
              { type: 'success', text: 'Committed: fix(auth): await token verification' },
            ]}
            loop
            loopDelay={4000}
          />
        </div>
      </div>
    </Link>
  );
}

// ---------- Blog Card (grid item) ----------

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass hm-card group flex flex-col gap-3 rounded-xl p-5 sm:p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
    >
      <div className="ccg-card-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      <h3 className="text-lead font-semibold leading-snug tracking-[-0.02em] text-fd-foreground">
        {post.title}
      </h3>

      <p className="line-clamp-3 text-ui leading-relaxed text-fd-muted-foreground">
        {post.description}
      </p>

      <div className="mt-auto pt-1">
        <TagList tags={post.tags.slice(0, 3)} />
      </div>
    </Link>
  );
}

// ---------- Page ----------

export default function BlogPage() {
  const allPosts = getSortedPosts();
  const allTags = getAllTags();
  const topTags = useMemo(() => getTopTags(allTags, allPosts, 8), [allTags, allPosts]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  // When filtered, the first post is still the hero unless there is only 1 result
  const featuredPost = filteredPosts[0] ?? null;
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="flex flex-col">
      <SceneBackdrop variant="faded" scene="cabin" position="fixed" />
      {/* Header */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-4 sm:px-6 sm:pt-20">
        <h1 className="ccg-title">
          <KineticText>Blog</KineticText>
        </h1>
        <p className="hm-rise ccg-lead mt-4 max-w-xl">
          Things I&apos;ve learned using Claude Code daily. Tips, patterns, and the occasional honest take.
        </p>
      </section>

      {/* Filters + post count */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            label="All"
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {topTags.map((tag) => (
            <FilterPill
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
          <span className="ml-auto font-mono text-xs tabular-nums text-fd-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            {activeTag ? ` in "${activeTag}"` : ''}
          </span>
        </div>
      </section>

      {/* Featured hero */}
      {featuredPost && (
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-8">
          <FeaturedHero post={featuredPost} />
        </section>
      )}

      {/* 2-column grid */}
      {gridPosts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-16 text-center">
          <p className="text-fd-muted-foreground">Nothing in this tag yet.</p>
          <button
            onClick={() => setActiveTag(null)}
            className="mt-3 text-sm font-medium text-fd-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            Clear filter
          </button>
        </section>
      )}

      {/* Email capture */}
      <section className="mx-auto w-full max-w-2xl px-6 pb-24">
        <EmailCapture placement="blog-listing" />
      </section>
    </div>
  );
}
