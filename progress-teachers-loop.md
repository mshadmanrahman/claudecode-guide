---
created: 2026-10-30
type: plan
status: complete
tags: [ccg, for-teachers, ostad, long-task]
related: "[[reference_ostad_class_feedback_sheet]]"
---

```text
TASK:   Add a "batch-to-batch lesson loop" guide to the live /for-teachers path, telling the "6s disappeared" story with real numbers, plus a downloadable lesson-retro skill.
OUTPUT: https://claudecodeguide.dev/for-teachers/<new-slug> and the skill file under public/
CHECKS: 1. Change list (what Batch 2 feedback changed in Batch 3) shown to Shadman and approved before page copy is written
        2. npm run build exits 0
        3. curl of the live guide URL returns 200 and contains "166/18" and "135/14"
        4. curl of the skill download URL returns 200 and the file has no /Users/ paths or private names
        5. The guide card shows on /for-teachers at 390px and 1280px (computed-style check)
SCOPE:  _opensource/claudecode-guide only (src/lib/teacher-guides.ts, its components, public/). Sheets and memory read-only.
LIMIT:  Ask before naming any student or quoting a comment word for word; stop if not live after 3 deploy attempts.
```

## Baseline (2026-10-30T20:30:34Z)

1. Fail: change list not yet shown.
2. Pass: npm run build exit 0 before any edit.
3. Fail: candidate slug /for-teachers/improve-your-course-batch-by-batch returns 404. /for-teachers returns 200.
4. Fail: no skill file yet.
5. Fail: no card yet.

## Log

- Step 1: extracted changes from Batch 2 comments (two 6s, 2026-08-12) and handoff [[2026-08-19-ostad-batch3-design-decisions]]. Result: change list ready. Next: Shadman approves it.
- Step 2: change list approved by Shadman (honest framing: low scores arrived night of Class 1; no causal claim). Next: build.
- Step 3: guide entry, download field, card key, public/skills/lesson-retro/SKILL.md (3014 bytes). tsc clean, npm run build exit 0. Next: verify.
- Step 4: dev server, card opacity 1 at 390px (342 wide) and 1280px (480 wide), no horizontal scroll, 0 console errors, skill fetch 200. Next: ship.
- Step 5: pushed db79446. Live guide 200 with "166/18" and "135/14"; live skill 200, no /Users/ or private names; /for-teachers hub links the card. All 5 checks pass.
