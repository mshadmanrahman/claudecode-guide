import { AuthorPhoto } from "@/components/author-photo";
import type { ReactNode } from 'react';

interface ArticleHeaderProps {
  /** Mono breadcrumb segments, e.g. ["docs", "foundations"]. */
  crumbs: string[];
  /** Optional pill after the crumbs, e.g. a reading time or date. */
  meta?: ReactNode;
  title: string;
  lead?: string;
  /** Extra row under the byline, e.g. tags. */
  children?: ReactNode;
}

/**
 * Shared header for docs pages and blog posts: mono crumbs, 54px title,
 * muted lead, author row with a hairline under it.
 */
export function ArticleHeader({ crumbs, meta, title, lead, children }: ArticleHeaderProps) {
  return (
    <header className="ccg-article-header not-prose">
      <div className="ccg-crumbs">
        {crumbs.map((crumb, i) => (
          <span key={`${crumb}-${i}`} className="contents">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            <span>{crumb}</span>
          </span>
        ))}
        {meta ? <span className="ccg-pill">{meta}</span> : null}
      </div>
      <h1 className="ccg-title">{title}</h1>
      {lead ? <p className="ccg-lead">{lead}</p> : null}
      <div className="ccg-byline">
        <AuthorPhoto size={28} className="shrink-0" />
        <span className="font-medium text-fd-foreground">Shadman Rahman</span>
        <span className="text-fd-muted-foreground">Principal PM</span>
      </div>
      {children}
    </header>
  );
}
