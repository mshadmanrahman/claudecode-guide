const SITE = "https://claudecodeguide.dev";

export interface Crumb {
  name: string;
  /** Site path such as "/blog". */
  path: string;
}

/** BreadcrumbList JSON-LD. Pass the trail from the home page down to the current page. */
export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE}${crumb.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface CollectionSchemaProps {
  name: string;
  description: string;
  /** Site path of the hub, such as "/blog". */
  path: string;
  items: { name: string; path: string }[];
}

/** CollectionPage JSON-LD with an ItemList of the hub's child pages. */
export function CollectionSchema({ name, description, path, items }: CollectionSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE}${path}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: `${SITE}${item.path}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
