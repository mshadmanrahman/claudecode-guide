/**
 * One engraved object per blog post and per skill, drawn in the footer's copperplate finish.
 * Files live in public/engraving/cards/ as transparent ink-alpha WebP (240px square).
 * A slug with no file returns null and the card renders without an object.
 */
const BLOG_OBJECT_SLUGS = new Set<string>([
  'why-most-people-use-claude-code-wrong',
  'claude-md-is-not-optional',
  'the-cold-start-problem',
  'claude-code-vs-chatgpt',
  'your-first-hour-with-claude-code',
  '3-prompts-that-changed-everything',
  'context-beats-cleverness',
  'sub-agents-the-feature-nobody-uses',
  'pm-shipped-feature-without-code',
  'memory-system-that-compounds',
  'hooks-set-it-up-once',
  'claude-code-cost-calculator',
  'plan-mode-saves-tokens',
  'mcp-servers-explained',
  'claude-code-overnight',
  '5-claude-md-mistakes',
  'claude-code-for-non-engineers',
  'handoff-protocol-saves-10-minutes',
  'skills-vs-prompts',
  'cursor-vs-claude-code',
  'how-to-debug-with-claude-code',
  'weekly-status-writes-itself',
  'team-adoption-what-works',
  'keyboard-shortcuts-youre-missing',
  'the-compound-effect-30-days',
  '10-claude-code-features-you-didnt-know-existed',
  '7-claude-md-sections-every-project-needs',
  '5-signs-you-should-upgrade-to-claude-max',
  '8-ways-pms-use-claude-code-without-writing-code',
  '6-autonomous-loop-ideas-to-run-overnight',
  '12-slash-commands-that-save-hours-per-week',
  '4-mcp-servers-every-developer-should-connect',
  '9-mistakes-killing-your-claude-code-productivity',
  '3-skills-you-can-build-in-under-10-minutes',
  'top-5-claude-code-workflows-for-solo-founders',
  'you-dont-need-settings-json-hacks',
  'rules-that-follow-claude-everywhere',
  'product-discovery-in-two-days',
  'how-to-use-claude-to-write-excel-formulas',
  'how-to-use-claude-in-chrome-browser',
  'claude-for-teachers-reclaim-planning-time',
  'stating-a-rule-twice-does-not-help',
  'claude-5-prompting-rules-fact-check',
  'claude-code-memory-at-scale-966-files',
  'how-to-mod-claude-code',
]);

const SKILL_OBJECT_NAMES = new Set<string>(['grill-me', 'crucible']);

export function blogObjectSrc(slug: string): string | null {
  return BLOG_OBJECT_SLUGS.has(slug) ? `/engraving/cards/blog-${slug}.webp` : null;
}

export function skillObjectSrc(name: string): string | null {
  return SKILL_OBJECT_NAMES.has(name) ? `/engraving/cards/skill-${name}.webp` : null;
}

export { BLOG_OBJECT_SLUGS, SKILL_OBJECT_NAMES };
