/** Social cards are 1200x630, the crop Facebook, LinkedIn, X and Slack all use. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export interface OgImageEntry {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * The openGraph image entry for a page, pointing at its own card from
 * src/app/og/[[...slug]]/route.tsx. Twitter needs nothing extra: the root
 * layout sets no twitter image, so Next copies this one into twitter:image.
 */
export function ogImage(path: string, title?: string): OgImageEntry {
  const key = path.replace(/^\/+|\/+$/g, "");
  return {
    url: key ? `/og/${key}` : "/og",
    ...OG_SIZE,
    alt: title ? `${title} | Claude Code Guide` : "Claude Code Guide",
  };
}
