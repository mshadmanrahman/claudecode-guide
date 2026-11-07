"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FOOTER_ART } from "@/lib/footer-art-manifest";
import type { FooterScene } from "@/lib/footer-scenes";

/** Exact-match routes. "/" can't be a prefix, or it would match everything. */
const EXACT_SCENES: Readonly<Record<string, FooterScene>> = {
  "/": "twinpeaks",
  "/bn": "delta",
};

/** Section prefixes. Longest prefix wins, so /docs/patterns beats /docs. */
const PREFIX_SCENES: ReadonlyArray<readonly [string, FooterScene]> = [
  ["/about", "sailboat"],
  ["/blog", "cabin"],
  ["/capabilities", "overlook"],
  ["/certification", "summit"],
  ["/docs/comparisons", "fork"],
  ["/docs/foundations", "cairn"],
  ["/docs/frameworks", "bridge"],
  ["/docs/patterns", "terraces"],
  ["/docs/templates", "hut"],
  ["/docs/workflows", "switchbacks"],
  ["/for-chrome", "signpost"],
  ["/for-designers", "meadow"],
  ["/for-hr", "green"],
  ["/for-marketers", "village"],
  ["/for-microsoft", "boathouse"],
  ["/for-teachers", "schoolhouse"],
  ["/guide", "gorge"],
  ["/journey", "haze"],
  ["/pm-pilot", "harbor"],
  ["/primitives", "standingstones"],
  ["/roadmap", "ridges"],
  ["/skills", "woodpile"],
  ["/start", "traveler"],
  ["/tutorials", "workshop"],
  ["/workflow", "watermill"],
];

/** Home, the docs index, the 404 page and anything unlisted end on the valley. */
const DEFAULT_SCENE: FooterScene = "valley";

const BN_PREFIX = /^\/bn(?=\/)/;

export function sceneForPath(rawPath: string): FooterScene {
  const exact = EXACT_SCENES[rawPath];
  if (exact) return exact;
  // Bangla pages are translations of the English route at the same path, so
  // /bn/for-teachers ends on the schoolhouse, not on the /bn delta.
  const path = rawPath.replace(BN_PREFIX, "");
  if (EXACT_SCENES[path]) return EXACT_SCENES[path];
  let best = DEFAULT_SCENE;
  let bestLen = 0;
  for (const [prefix, scene] of PREFIX_SCENES) {
    const hit = path === prefix || path.startsWith(`${prefix}/`);
    if (hit && prefix.length > bestLen) {
      best = scene;
      bestLen = prefix.length;
    }
  }
  return best;
}

interface FooterArtProps {
  /** Pin a scene instead of reading the route (the 404 page has no route of its own). */
  scene?: FooterScene;
  children?: React.ReactNode;
}

/** Engraved landscape that closes the page, under the footer links. */
export function FooterArt({ scene: pinned, children }: FooterArtProps) {
  const pathname = usePathname() ?? "/";
  const scene = pinned ?? sceneForPath(pathname);
  const src = FOOTER_ART[scene] ?? FOOTER_ART[DEFAULT_SCENE];
  return (
    <div className="footer-art" data-scene={scene}>
      {src && <Image key={src} src={src} alt="" aria-hidden="true" fill sizes="100vw" quality={90} className="engr-ink" />}
      {children}
    </div>
  );
}
