/**
 * Footer landscapes, one per section. Every scene is set in the mountains
 * (the logo has two peaks); the subject changes by section. Kept apart from
 * `SceneName` in `@/lib/scenes`, which names the in-page panels and OG cards.
 */
export const FOOTER_SCENES = [
  "valley",
  "twinpeaks",
  "traveler",
  "haze",
  "ridges",
  "sailboat",
  "overlook",
  "summit",
  "gorge",
  "standingstones",
  "woodpile",
  "watermill",
  "cabin",
  "workshop",
  "meadow",
  "schoolhouse",
  "village",
  "boathouse",
  "signpost",
  "green",
  "harbor",
  "delta",
  "cairn",
  "switchbacks",
  "fork",
  "bridge",
  "terraces",
  "hut",
] as const;

export type FooterScene = (typeof FOOTER_SCENES)[number];
