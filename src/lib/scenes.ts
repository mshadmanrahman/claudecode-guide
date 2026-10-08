/**
 * Each scene is a landscape matched to a page's audience. The paintings live in
 * public/scene/ (day and night, used by the OG cards); the ink engravings drawn
 * from them live in public/engraving/ (used by the page panels and footer band).
 */
export type SceneName =
  | "valley"
  | "harbor"
  | "schoolhouse"
  | "swatches"
  | "market"
  | "green"
  | "signposts"
  | "lakeside"
  | "trailhead"
  | "summit"
  | "archipelago"
  | "cabin"
  | "delta"
  | "workshop"
  | "watermills"
  | "steppingstones"
  | "gorge"
  | "overlook"
  | "standingstones"
  | "viaduct";
