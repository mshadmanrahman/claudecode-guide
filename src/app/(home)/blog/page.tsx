'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    title: "Why Most People Use Claude Code Wrong (And How to Fix It in 5 Minutes)",
    description: "You installed Claude Code, typed a prompt, got a mid answer, and walked away. Here's what you missed.",
    date: "2026-03-29",
    author: "Shadman Rahman",
    slug: "why-most-people-use-claude-code-wrong",
  },
];

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
      <span className="mt-auto flex items-center gap-1 text-xs font-medium text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
        Read more <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export default function BlogPage() {
  return (
    <div className="flex flex-col bg-fd-background">
      <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-12 text-center">
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          Tips, strategies, and real talk about working with Claude Code.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="grid gap-4">
          {posts.map((post) => (
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
