import { pmPilotSource } from '@/lib/source-pm-pilot';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { SkillExample } from '@/components/pm-pilot-docs/skill-example';
import { GitHubCta } from '@/components/pm-pilot-docs/github-cta';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

const mdxComponents = {
  ...defaultMdxComponents,
  SkillExample,
  GitHubCta,
};

export default async function PmPilotGuidePage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug ?? [];

  const page = pmPilotSource.getPage(slug);
  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = page.data as any;
  const MDX = data.body;

  const allPages = pmPilotSource.getPages();
  const currentUrl = slug.length === 0 ? '/pm-pilot/guide' : `/pm-pilot/guide/${slug.join('/')}`;
  const currentIndex = allPages.findIndex((p) => p.url === currentUrl);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <article className="mx-auto w-full max-w-2xl">
      <header className="mb-10">
        {data.command && (
          <div className="mb-3">
            <span className="inline-block rounded-md border border-fd-border bg-fd-muted px-2.5 py-1 font-mono text-xs font-medium text-fd-muted-foreground">
              {data.command}
            </span>
          </div>
        )}
        <h1 className="font-display text-3xl font-semibold text-fd-foreground sm:text-4xl">
          {data.title}
        </h1>
        {data.description && (
          <p className="mt-3 text-lg text-fd-muted-foreground leading-relaxed">{data.description}</p>
        )}
      </header>

      <div className="prose prose-fd max-w-none">
        <MDX components={mdxComponents} />
      </div>

      <div className="mt-16 flex items-stretch gap-4 border-t border-fd-border pt-8">
        {prev ? (
          <Link
            href={prev.url}
            className="group flex flex-1 items-center gap-3 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:shadow-sm hover:bg-fd-accent"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors" />
            <div className="min-w-0">
              <span className="text-xs text-fd-muted-foreground">Previous</span>
              <p className="text-sm font-medium text-fd-foreground truncate">{prev.data.title as string}</p>
            </div>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={next.url}
            className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-fd-border bg-fd-card p-5 text-right transition-all hover:shadow-sm hover:bg-fd-accent"
          >
            <div className="min-w-0">
              <span className="text-xs text-fd-muted-foreground">Next</span>
              <p className="text-sm font-medium text-fd-foreground truncate">{next.data.title as string}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors" />
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return pmPilotSource.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = pmPilotSource.getPage(slug);
  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = page.data as any;
  const canonicalUrl = slug.length === 0
    ? 'https://claudecodeguide.dev/pm-pilot/guide'
    : `https://claudecodeguide.dev/pm-pilot/guide/${slug.join('/')}`;

  return {
    title: `${data.title as string} - PM Pilot`,
    description: data.description as string | undefined,
    alternates: { canonical: canonicalUrl },
  };
}
