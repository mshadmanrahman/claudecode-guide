"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FOOTER_ART } from "@/lib/footer-art-manifest";
import type { SceneName } from "@/lib/scenes";

/**
 * Which landscape each section of the site ends on. Longest prefix wins, so
 * /bn/for-designers beats /bn. Anything unlisted (home, docs) gets the valley.
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

/** Engraved landscape under the footer links, one per section, down to the page bottom. */
export function FooterArt() {
  const scene = sceneForPath(usePathname() ?? "/");
  const src = FOOTER_ART[scene] ?? FOOTER_ART.valley;
  if (!src) return null;
  return (
    <div aria-hidden="true" className="footer-art" data-scene={scene}>
      <Image key={src} src={src} alt="" fill sizes="100vw" quality={85} className="engr-ink" />
    </div>
  );
}
