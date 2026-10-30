/**
 * Bangla teacher guides, keyed by the English slug. Same style rules as
 * `./tutorials.ts`; translations are split into group files for parallel work.
 */
import type { TeacherGuide } from "@/lib/teacher-guides";
import type { Translation } from "@/lib/i18n/bn/tutorials";
import { BN_TEACHER_GUIDES_T1 } from "./teacher-guides/t1.ts";
import { BN_TEACHER_GUIDES_T2 } from "./teacher-guides/t2.ts";

export const BN_TEACHER_GUIDES: Partial<Record<string, Translation<TeacherGuide>>> = {
  ...BN_TEACHER_GUIDES_T1,
  ...BN_TEACHER_GUIDES_T2,
};
