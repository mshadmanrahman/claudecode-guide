/**
 * Compares Bangla translations with their English source.
 *   stale:   English changed since the translation was made
 *   missing: English page with no Bangla version yet
 *   orphan:  Bangla page whose English source was removed
 * Default: warns, never fails (runs as prebuild; a stale page still renders with a notice).
 * --strict: exit 1 on any drift.  --json: print the drift report as JSON (used by CI).
 */
import { TUTORIALS } from "../src/lib/tutorials.ts";
import { DESIGNER_GUIDES } from "../src/lib/designer-guides.ts";
import { TEACHER_GUIDES } from "../src/lib/teacher-guides.ts";
import { TEACHERS_HUB } from "../src/lib/hubs/teachers.ts";
import { DESIGNERS_HUB } from "../src/lib/hubs/designers.ts";
import { BN_TUTORIALS } from "../src/lib/i18n/bn/tutorials.ts";
import { BN_DESIGNER_GUIDES } from "../src/lib/i18n/bn/designer-guides.ts";
import { BN_TEACHER_GUIDES } from "../src/lib/i18n/bn/teacher-guides.ts";
import { BN_TEACHERS_HUB } from "../src/lib/i18n/bn/hubs/teachers.ts";
import { BN_DESIGNERS_HUB } from "../src/lib/i18n/bn/hubs/designers.ts";
import { sourceHash } from "../src/lib/i18n/source-hash.ts";

interface Drift {
  stale: string[];
  missing: string[];
  orphan: string[];
}

function diff(source: Record<string, unknown>, bn: Record<string, { sourceHash: string } | undefined>): Drift {
  const d: Drift = { stale: [], missing: [], orphan: [] };
  for (const [slug, tr] of Object.entries(bn)) {
    if (!tr) continue;
    const en = source[slug];
    if (!en) d.orphan.push(slug);
    else if (tr.sourceHash !== sourceHash(en)) d.stale.push(slug);
  }
  for (const slug of Object.keys(source)) if (!bn[slug]) d.missing.push(slug);
  return d;
}

/** English source and its Bangla translations, per content type. Hubs are keyed by hub name. */
const sources: Record<string, [Record<string, unknown>, Record<string, { sourceHash: string } | undefined>]> = {
  tutorials: [TUTORIALS, BN_TUTORIALS],
  designerGuides: [DESIGNER_GUIDES, BN_DESIGNER_GUIDES],
  teacherGuides: [TEACHER_GUIDES, BN_TEACHER_GUIDES],
  hubs: [
    { teachers: TEACHERS_HUB, designers: DESIGNERS_HUB },
    { teachers: BN_TEACHERS_HUB, designers: BN_DESIGNERS_HUB },
  ],
};

const report = Object.fromEntries(Object.entries(sources).map(([label, [en, bn]]) => [label, diff(en, bn)]));
const drifted = Object.values(report).some((d) => d.stale.length + d.missing.length + d.orphan.length > 0);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ drifted, ...report }));
} else {
  for (const [label, d] of Object.entries(report)) {
    for (const kind of ["stale", "missing", "orphan"] as const) {
      for (const slug of d[kind]) console.warn(`bn-sync: ${label}/${slug} is ${kind}`);
    }
    const total = Object.keys(sources[label][0]).length;
    const ok = total - d.stale.length - d.missing.length;
    console.log(`bn-sync: ${ok}/${total} ${label} have an in-sync Bangla version`);
  }
}
if (drifted && process.argv.includes("--strict")) process.exit(1);
