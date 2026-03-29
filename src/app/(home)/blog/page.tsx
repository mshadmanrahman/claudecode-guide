'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { useState } from 'react';
import { getSortedPosts, getAllTags } from '@/data/blog-posts';
import type { BlogPost } from '@/data/blog-posts';

function TagPill({ tag, active, onClick }: { tag: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'bg-fd-foreground text-fd-background'
          : 'bg-fd-muted text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
      }`}
    >
      {tag}
    </button>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-muted-foreground/30 hover:bg-fd-accent"
    >
      <div className="flex items-center gap-3 text-xs text-fd-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {post.author}
        </span>
      </div>
      <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground group-hover:underline">
        {post.title}
      </h2>
      <p className="text-sm text-fd-muted-foreground">{post.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-fd-muted px-2 py-0.5 text-[10px] text-fd-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-auto flex items-center gap-1 text-xs font-medium text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
        Read more <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export default function BlogPage() {
  const allPosts = getSortedPosts();
  const allTags = getAllTags();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  return (
    <div className="flex flex-col bg-fd-background">
      <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-8 text-center">
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          Tips, strategies, and real talk about working with Claude Code.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-fd-muted-foreground" />
          <TagPill
            tag="All"
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map((tag) => (
            <TagPill
              key={tag}
              tag={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-fd-muted-foreground">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          {activeTag ? ` tagged "${activeTag}"` : ''}
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <EmailCapture />
      </section>
    </div>
  );
}
