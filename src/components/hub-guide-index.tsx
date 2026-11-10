import Link from "next/link";
import { CollectionSchema } from "@/components/breadcrumb-schema";

interface HubGuideIndexProps {
  /** Hub path, e.g. "/for-hr". Guide links are `${hubPath}/${slug}`. */
  hubPath: string;
  /** Hub name for the CollectionPage schema, e.g. "Claude for HR". */
  hubName: string;
  hubDescription: string;
  guides: { slug: string; title: string }[];
}

/**
 * A plain list of every guide on a hub, plus CollectionPage JSON-LD.
 *
 * The hub card grids are tabbed client components, so guides in inactive tabs
 * never reach the server HTML. This list keeps every guide one link from the hub.
 */
export function HubGuideIndex({ hubPath, hubName, hubDescription, guides }: HubGuideIndexProps) {
  return (
    <section aria-labelledby="all-guides" className="mx-auto max-w-3xl px-6 pt-16">
      <CollectionSchema
        name={hubName}
        description={hubDescription}
        path={hubPath}
        items={guides.map((g) => ({ name: g.title, path: `${hubPath}/${g.slug}` }))}
      />
      <h2 id="all-guides" className="text-sm font-medium text-fd-foreground">
        All {guides.length} guides
      </h2>
      <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`${hubPath}/${g.slug}`}
              className="rounded-sm text-fd-muted-foreground underline underline-offset-2 hover:text-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            >
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
