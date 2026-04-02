import Link from 'next/link';
import type { ComparisonRelatedLink } from '@/lib/comparison-article';

interface ComparisonRelatedLinksProps {
  title: string;
  links: ComparisonRelatedLink[];
}

export function ComparisonRelatedLinks({
  title,
  links,
}: ComparisonRelatedLinksProps) {
  if (!links.length) return null;

  return (
    <aside className="rounded-2xl border border-fd-border bg-fd-card/60 p-5 sm:p-6">
      <h2 className="font-display text-xl font-medium tracking-tight text-fd-foreground">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.title}`} className="rounded-xl border border-fd-border bg-fd-background p-4">
            <Link
              href={link.href}
              className="font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:text-fd-primary"
            >
              {link.title}
            </Link>
            {link.description ? (
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                {link.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
