import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Full text of an English docs page ("foundations/installation"), or null when
 * the page no longer exists. A Bangla docs page stores `sourceHash` of this text
 * in its frontmatter; when the English file changes, the hashes stop matching
 * and the translation is stale. Server and build time only.
 */
export function readEnglishDoc(slug: string): string | null {
  const file = join(process.cwd(), "content/docs", `${slug}.mdx`);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}
