import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { notFound } from 'next/navigation';

const posts: Record<string, {
  title: string;
  description: string;
  date: string;
  author: string;
  content: React.ReactNode;
}> = {
  'why-most-people-use-claude-code-wrong': {
    title: "Why Most People Use Claude Code Wrong (And How to Fix It in 5 Minutes)",
    description: "You installed Claude Code, typed a prompt, got a mid answer, and walked away. Here's what you missed.",
    date: "2026-03-29",
    author: "Shadman Rahman",
    content: (
      <>
        <p>Most people install Claude Code, type a question, get a mediocre answer, and walk away thinking &quot;AI isn&apos;t that useful yet.&quot;</p>
        <p>But the problem isn&apos;t Claude Code. It&apos;s that they skipped the one file that makes it actually work.</p>

        <h2>The CLAUDE.md Gap</h2>
        <p>Without a <code>CLAUDE.md</code> file, every session starts blind. Claude Code doesn&apos;t know your stack, your coding style, or your preferences. It&apos;s guessing. And guessing produces mid results.</p>
        <p>With CLAUDE.md, the same prompt produces dramatically different output. Your stack, your conventions, your communication preferences — all loaded before you even type.</p>

        <h2>The 5-Minute Fix</h2>
        <ol>
          <li>Run <code>claude /init</code> in your project root</li>
          <li>It generates a basic CLAUDE.md from your codebase</li>
          <li>Add your communication preferences (&quot;be direct, no fluff&quot;)</li>
          <li>Add your session lifecycle (&quot;read memory at start, write handoff at end&quot;)</li>
        </ol>
        <p>That&apos;s it. Four steps. Under 5 minutes. The improvement is immediate and honestly kind of wild.</p>

        <h2>What Changes</h2>
        <table>
          <thead><tr><th>Before</th><th>After</th></tr></thead>
          <tbody>
            <tr><td><code>.jsx</code> files in a TypeScript project</td><td><code>.tsx</code> every time</td></tr>
            <tr><td>Inline styles when you use Tailwind</td><td>Tailwind classes automatically</td></tr>
            <tr><td>Verbose explanations</td><td>Direct answers matching your style</td></tr>
            <tr><td>Every session starts cold</td><td>Memory + handoffs = zero re-explanation</td></tr>
          </tbody>
        </table>

        <h2>The Compound Effect</h2>
        <p>The real magic isn&apos;t day one. It&apos;s week three.</p>
        <p>By then, Claude Code has accumulated your corrections, your preferences, and your project context. It stops making the mistakes you&apos;ve already fixed. Sessions start faster. The gap between &quot;using Claude Code&quot; and &quot;having Claude Code as an operating system&quot; gets wider every day.</p>

        <h2>Start Here</h2>
        <p>Read the full <Link href="/docs/foundations/claude-md" className="underline hover:text-fd-foreground">CLAUDE.md Guide</Link> for the five-layer architecture. Or jump straight to the <Link href="/guide" className="underline hover:text-fd-foreground">Interactive Setup Guide</Link> and follow the 9 steps.</p>
        <p>Either way, don&apos;t use Claude Code without a CLAUDE.md. The difference is night and day.</p>
      </>
    ),
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const post = posts[params.slug];
  if (!post) notFound();

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
        <p className="text-lg text-fd-muted-foreground mb-12">
          {post.description}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-fd-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_code]:rounded [&_code]:bg-fd-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_li]:text-fd-muted-foreground [&_table]:text-sm [&_th]:text-left [&_th]:p-3 [&_th]:border-b [&_th]:border-fd-border [&_td]:p-3 [&_td]:border-b [&_td]:border-fd-border">
          {post.content}
        </div>

        <div className="mt-16 border-t border-fd-border pt-8">
          <EmailCapture />
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
