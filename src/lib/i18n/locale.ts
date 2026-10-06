/**
 * Site locales and the interface strings a translated page passes through.
 *
 * English stays the default and keeps its URLs. Bangla lives under the `/bn`
 * prefix the site already owned (the hand-built `/bn` landing page), so a
 * translated route is `/bn/<english path>`. Content translations live next to
 * this file in `bn/`; this file only holds chrome: labels, buttons, notices.
 */
export type Locale = "en" | "bn";

const UI = {
  en: {
    tutorials: "tutorials",
    of: "of",
    steps: "steps",
    step: "step",
    beginner: "beginner",
    intermediate: "intermediate",
    beforeYouStart: "Before you start",
    inThisTutorial: "in this tutorial",
    previous: "previous",
    next: "next",
    endOfTrack: "end of this track",
    pickAnotherTrack: "Pick another track",
    goDeeper: "go deeper",
    followAlongIn: "follow along in",
    youNeed: "You need: ",
    needApp: "A Claude account. Open claude.ai in a browser, or the Claude desktop app.",
    needTerminal: "Claude Code installed on your computer.",
    installGuide: "Install guide",
    needIde: "VS Code or Cursor with the Claude Code extension.",
    prompt: "Prompt",
    promptNofM: (i: number, n: number) => `Prompt ${i} of ${n}`,
    whatYouShouldSee: "what you should see",
    markComplete: "Mark as complete",
    doneNiceWork: "Done. Nice work.",
    inEnglish: "(English)",
    switchLanguage: "বাংলায় পড়ুন",
    staleNotice: "",
    readEnglish: "",
  },
  bn: {
    tutorials: "টিউটোরিয়াল",
    of: "/",
    steps: "ধাপ",
    step: "ধাপ",
    beginner: "beginner",
    intermediate: "intermediate",
    beforeYouStart: "শুরু করার আগে",
    inThisTutorial: "এই টিউটোরিয়ালে",
    previous: "আগেরটি",
    next: "পরেরটি",
    endOfTrack: "এই ট্র্যাক শেষ",
    pickAnotherTrack: "আরেকটি ট্র্যাক বেছে নিন",
    goDeeper: "আরও জানুন",
    followAlongIn: "কোথায় follow করবেন",
    youNeed: "যা লাগবে: ",
    needApp: "একটি Claude account। Browser-এ claude.ai খুলুন, অথবা Claude desktop app ব্যবহার করুন।",
    needTerminal: "আপনার কম্পিউটারে Claude Code install করা থাকতে হবে।",
    installGuide: "Install guide",
    needIde: "VS Code বা Cursor, সঙ্গে Claude Code extension।",
    prompt: "Prompt",
    promptNofM: (i: number, n: number) => `Prompt ${i} / ${n}`,
    whatYouShouldSee: "আপনি যা দেখবেন",
    markComplete: "Complete হিসেবে mark করুন",
    doneNiceWork: "Done! দারুণ কাজ করেছেন।",
    inEnglish: "(English)",
    switchLanguage: "Read in English",
    staleNotice: "এই অনুবাদের পরে English version-টি update হয়েছে, তাই কিছু অংশ পুরোনো হতে পারে।",
    readEnglish: "English version পড়ুন",
  },
} as const;

export type UiStrings = (typeof UI)["en"] | (typeof UI)["bn"];

export function ui(locale: Locale = "en"): UiStrings {
  return UI[locale];
}

/** Path prefix for a locale. English has none. */
export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

/** Track titles for the breadcrumb and pager, keyed by catalog track id. */
export const BN_TRACK_TITLES: Record<string, string> = {
  "start-here": "এখান থেকে শুরু করুন",
  "everyday-work": "প্রতিদিনের কাজ, install ছাড়াই",
  "build-something": "শেয়ার করার মতো কিছু বানান",
  "product-managers": "Product manager-দের জন্য",
  developers: "Developer-দের জন্য",
};
