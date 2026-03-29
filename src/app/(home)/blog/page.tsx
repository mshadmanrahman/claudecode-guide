'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { DemoCard } from '@/components/demo-card';
import { useState, useMemo } from 'react';
import { getSortedPosts, getAllTags } from '@/data/blog-posts';
import type { BlogPost } from '@/data/blog-posts';

// ---------- Tag-based accent colors ----------

const TAG_COLORS: Record<string, string> = {
  'claude-code': 'bg-blue-500',
  'claude-md': 'bg-violet-500',
  'tutorial': 'bg-emerald-500',
  'productivity': 'bg-amber-500',
  'workflow': 'bg-rose-500',
  'hooks': 'bg-cyan-500',
  'mcp': 'bg-indigo-500',
  'advanced': 'bg-orange-500',
  'automation': 'bg-pink-500',
  'architecture': 'bg-teal-500',
  'best-practices': 'bg-lime-500',
  'memory': 'bg-fuchsia-500',
};

const FALLBACK_COLORS = [
  'bg-slate-500',
  'bg-zinc-500',
  'bg-neutral-500',
];

function getAccentColor(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }
  // Deterministic fallback based on first tag
  const hash = tags[0]?.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) ?? 0;
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

const TAG_PILL_COLORS: Record<string, string> = {
  'claude-code': 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  'claude-md': 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  'tutorial': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  'productivity': 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  'workflow': 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  'hooks': 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  'mcp': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
  'advanced': 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  'automation': 'bg-pink-500/10 text-pink-700 dark:text-pink-300',
  'architecture': 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
  'best-practices': 'bg-lime-500/10 text-lime-700 dark:text-lime-300',
  'memory': 'bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300',
};

function getTagPillColor(tag: string): string {
  return TAG_PILL_COLORS[tag] ?? 'bg-fd-muted text-fd-muted-foreground';
}

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
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? 'bg-fd-foreground text-fd-background shadow-sm'
          : 'bg-fd-muted text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
      }`}
    >
      {label}
    </button>
  );
}

// ---------- Tag Pill (inline on cards) ----------

function InlineTagPill({ tag }: { tag: string }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getTagPillColor(tag)}`}>
      {tag}
    </span>
  );
}

// ---------- Featured Hero Card ----------

function FeaturedHero({ post }: { post: BlogPost }) {
  const accent = getAccentColor(post.tags);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card transition-all hover:border-fd-muted-foreground/30 hover:shadow-lg lg:flex-row"
    >
      {/* Accent bar — top on mobile, left on desktop */}
      <div className={`h-1.5 w-full lg:h-auto lg:w-1.5 ${accent}`} />

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-fd-foreground px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fd-background">
            Latest
          </span>
          <span className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formatDate(post.date)}
          </span>
        </div>

        <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground sm:text-3xl lg:text-4xl">
          {post.title}
        </h2>

        <p className="max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <InlineTagPill key={tag} tag={tag} />
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-fd-foreground group-hover:gap-3 transition-all">
          Read article <ArrowRight className="h-4 w-4" />
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
  const accent = getAccentColor(post.tags);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex overflow-hidden rounded-xl border border-fd-border bg-fd-card transition-all duration-200 hover:-translate-y-1 hover:border-fd-muted-foreground/30 hover:shadow-md"
    >
      {/* Left accent bar */}
      <div className={`w-1 shrink-0 ${accent}`} />

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <span className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDate(post.date)}
        </span>

        <h3 className="font-display text-lg font-normal tracking-tight text-fd-foreground group-hover:underline decoration-fd-muted-foreground/40 underline-offset-4 sm:text-xl">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <InlineTagPill key={tag} tag={tag} />
          ))}
        </div>

        <span className="mt-auto flex items-center gap-1.5 pt-1 text-xs font-medium text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </span>
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
    <div className="flex flex-col bg-fd-background">
      {/* Header */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-4 sm:pt-20">
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-lg text-lg text-fd-muted-foreground">
          Tips, strategies, and real talk about working with Claude Code.
        </p>
      </section>

      {/* Filters + post count */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-8">
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
          <span className="ml-auto text-xs tabular-nums text-fd-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            {activeTag ? ` in "${activeTag}"` : ''}
          </span>
        </div>
      </section>

      {/* Featured hero */}
      {featuredPost && (
        <section className="mx-auto w-full max-w-5xl px-6 pb-8">
          <FeaturedHero post={featuredPost} />
        </section>
      )}

      {/* 2-column grid */}
      {gridPosts.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 pb-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 pb-16 text-center">
          <p className="text-fd-muted-foreground">No posts found for this tag.</p>
          <button
            onClick={() => setActiveTag(null)}
            className="mt-3 text-sm font-medium text-fd-foreground underline underline-offset-4"
          >
            Clear filter
          </button>
        </section>
      )}

      {/* Email capture */}
      <section className="mx-auto w-full max-w-2xl px-6 pb-24">
        <EmailCapture />
      </section>
    </div>
  );
}
