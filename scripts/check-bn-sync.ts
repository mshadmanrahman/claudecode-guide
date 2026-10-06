/**
 * Lists Bangla translations whose English source changed since they were made.
 * Warns, never fails: a stale page still renders, with a notice pointing to English.
 * Run: npm run check:bn  (also runs as prebuild)
 */
import { TUTORIALS } from "../src/lib/tutorials.ts";
import { BN_TUTORIALS } from "../src/lib/i18n/bn/tutorials.ts";
import { sourceHash } from "../src/lib/i18n/source-hash.ts";

let stale = 0;
for (const [slug, tr] of Object.entries(BN_TUTORIALS)) {
  if (!tr) continue;
  const en = TUTORIALS[slug];
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
const total = Object.keys(BN_TUTORIALS).length;
console.log(`bn-sync: ${total - stale}/${total} Bangla tutorials in sync`);
