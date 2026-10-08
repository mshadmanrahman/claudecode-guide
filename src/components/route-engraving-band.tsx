"use client";

import { usePathname } from "next/navigation";
import { EngravingBand } from "@/components/engraving";
import type { SceneName } from "@/lib/scenes";

/**
 * Which landscape each section of the site ends on. Longest prefix wins, so
 * /bn/for-designers beats /bn. Anything unlisted (docs, 404) gets the valley.
 */
const ROUTE_SCENES: ReadonlyArray<readonly [string, SceneName]> = [
  ["/about", "archipelago"],
  ["/blog", "cabin"],
  ["/bn", "delta"],
  ["/bn/for-designers", "swatches"],
  ["/bn/tutorials", "workshop"],
  ["/capabilities", "overlook"],
  ["/certification", "summit"],
  ["/for-chrome", "signposts"],
  ["/for-designers", "swatches"],
  ["/for-hr", "green"],
  ["/for-marketers", "market"],
  ["/for-microsoft", "lakeside"],
  ["/for-teachers", "schoolhouse"],
  ["/guide", "gorge"],
  ["/journey", "steppingstones"],
  ["/pm-pilot", "harbor"],
  ["/primitives", "standingstones"],
  ["/roadmap", "viaduct"],
  ["/start", "trailhead"],
  ["/tutorials", "workshop"],
  ["/workflow", "watermills"],
];

export function sceneForPath(path: string): SceneName {
  let best: SceneName = "valley";
  let bestLen = 0;
  for (const [prefix, scene] of ROUTE_SCENES) {
    const hit = path === prefix || path.startsWith(`${prefix}/`);
    if (hit && prefix.length > bestLen) {
      best = scene;
      bestLen = prefix.length;
    }
  }
  return best;
}

/** The footer band for whatever page is showing. Lives in the shared layouts. */
export function RouteEngravingBand() {
  return <EngravingBand scene={sceneForPath(usePathname() ?? "/")} />;
}
