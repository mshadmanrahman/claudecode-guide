import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface RelatedLink {
  href: string;
  title: string;
}

/**
 * The guides that follow `current` in hub order, wrapping around, skipping any
 * href in `skip` (usually the "What's next?" link already on the page).
 */
export function pickRelated(
  guides: { slug: string; title: string }[],
  current: string,
  hrefFor: (slug: string) => string,
  skip: string[] = [],
  count = 3,
): RelatedLink[] {
  const start = guides.findIndex((g) => g.slug === current);
  const ordered = [...guides.slice(start + 1), ...guides.slice(0, Math.max(start, 0))];
  return ordered
    .map((g) => ({ href: hrefFor(g.slug), title: g.title }))
    .filter((l) => !skip.includes(l.href))
    .slice(0, count);
}

/** A short list of same-section guides at the end of an article. */
export function RelatedGuides({ heading, links }: { heading: string; links: RelatedLink[] }) {
  if (links.length === 0) return null;
  return (
    <nav aria-label={heading}>
      <p className="mb-3 text-sm font-medium text-fd-muted-foreground">{heading}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex items-center gap-2 rounded-sm text-fd-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            >
              {l.title}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
