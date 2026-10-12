const MAX_TITLE_LENGTH = 60;

/**
 * Appends the brand suffix only while the full title fits in 60 characters.
 * Longer titles ship bare so search results show the page's own words, not
 * a truncated brand.
 */
export function seoTitle(title: string, suffix: string): string {
  const full = `${title} | ${suffix}`;
  return full.length <= MAX_TITLE_LENGTH ? full : title;
}
