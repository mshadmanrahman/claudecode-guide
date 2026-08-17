/**
 * FAQPage JSON-LD.
 *
 * Renders nothing. It mirrors FAQ questions that are already on the page as
 * visible headings, so search engines can read them as a structured Q and A
 * set. No page on the site emitted FAQPage schema before 2026-08-17.
 *
 * The `items` here duplicate the visible copy on purpose: schema.org wants
 * plain text, and the visible answers contain markdown and JSX that would not
 * survive extraction. Keep the two in sync when you edit an answer.
 */
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSchemaProps {
  items: FaqItem[];
}

export function FaqSchema({ items }: FaqSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
