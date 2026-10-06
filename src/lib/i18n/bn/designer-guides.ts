/**
 * Bangla designer guides, keyed by the English slug. Same style rules as
 * `./tutorials.ts`; translations are split into group files for parallel work.
 */
import type { DesignerGuide } from "@/lib/designer-guides";
import type { Translation } from "@/lib/i18n/bn/tutorials";
import { BN_DESIGNER_GUIDES_D1 } from "./designer-guides/d1.ts";
import { BN_DESIGNER_GUIDES_D2 } from "./designer-guides/d2.ts";

export const BN_DESIGNER_GUIDES: Partial<Record<string, Translation<DesignerGuide>>> = {
  ...BN_DESIGNER_GUIDES_D1,
  ...BN_DESIGNER_GUIDES_D2,
};
