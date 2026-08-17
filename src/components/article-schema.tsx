/**
 * Article JSON-LD for non-docs pages.
 *
 * Docs pages build this inline in src/app/docs/[[...slug]]/page.tsx. Blog
 * posts, tutorials and the /for-* verticals shipped without any structured
 * data until 2026-08-17, so search engines had no author, publisher or
 * publication date for roughly two thirds of the site's indexable routes.
 */
interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  /** ISO date string. Omit when the page has no meaningful publication date. */
  datePublished?: string;
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
}: ArticleSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    ...(datePublished ? { datePublished } : {}),
    author: { "@type": "Person", name: "Shadman Rahman" },
    publisher: {
      "@type": "Organization",
      name: "Claude Code Guide",
      url: "https://claudecodeguide.dev",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
