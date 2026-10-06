/**
 * Lists Bangla translations whose English source changed since they were made.
 * Warns, never fails: a stale page still renders, with a notice pointing to English.
 * Run: npm run check:bn  (also runs as prebuild)
 */
import { TUTORIALS } from "../src/lib/tutorials.ts";
import { DESIGNER_GUIDES } from "../src/lib/designer-guides.ts";
import { BN_TUTORIALS } from "../src/lib/i18n/bn/tutorials.ts";
import { BN_DESIGNER_GUIDES } from "../src/lib/i18n/bn/designer-guides.ts";
import { sourceHash } from "../src/lib/i18n/source-hash.ts";

function check(label: string, source: Record<string, unknown>, bn: Record<string, { sourceHash: string } | undefined>) {
  let stale = 0;
  for (const [slug, tr] of Object.entries(bn)) {
    if (!tr) continue;
    const en = source[slug];
    if (!en) {
      console.warn(`bn-sync: ${slug} has no English source`);
      stale++;
      continue;
    }
    const now = sourceHash(en);
    if (tr.sourceHash !== now) {
      console.warn(`bn-sync: ${slug} is stale (stored ${tr.sourceHash}, English now ${now})`);
      stale++;
    }
  }
  const total = Object.keys(bn).length;
  console.log(`bn-sync: ${total - stale}/${total} Bangla ${label} in sync`);
}

check("tutorials", TUTORIALS, BN_TUTORIALS);
check("designer guides", DESIGNER_GUIDES, BN_DESIGNER_GUIDES);
