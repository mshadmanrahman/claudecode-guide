import type { AffiliateCTAPlacement } from '@/components/affiliate-cta';

export interface AffiliateCTAConfig {
  pageSlug: string;
  variantId: string;
  placement: AffiliateCTAPlacement;
  title: string;
  description: string;
  ctaLabel: string;
  destination: string;
}

type CTAConfigDraft = Omit<AffiliateCTAConfig, 'pageSlug' | 'variantId' | 'placement'>;

const CTA_PLACEMENTS: AffiliateCTAPlacement[] = ['inline', 'mid-banner', 'end-card'];

/**
 * Affiliate destinations that actually pay commissions.
 *
 * Vercel v0: $5/lead + 30% recurring 6 months (partners.dub.co/v0)
 * Railway: 15% recurring 12 months (railway.com/affiliate-program)
 * DigitalOcean: 10% recurring 12 months
 * Udemy: via Impact affiliate network
 * Coursera: via Impact affiliate network
 *
 * Replace placeholder URLs below with your actual affiliate tracking links
 * once you've signed up for each program.
 */
const AFFILIATE_LINKS = {
  vercelV0: 'https://v0.dev?ref=claudecodeguide',
  railway: 'https://railway.com?referralCode=shadman',
  digitalOcean: 'https://m.do.co/c/4710894edcd3',
  coursera: 'https://www.coursera.org/professional-certificates?utm_source=claudecodeguide',
  granola: 'https://www.granola.ai?via=shadman-rahman',
  warpReferral: 'https://app.warp.dev/referral/RVVXRNY',
  proVsMax: '/docs/comparisons/pro-vs-max',
} as const;

const guideDrafts: Record<AffiliateCTAPlacement, CTAConfigDraft> = {
  inline: {
    title: 'Pick your Claude plan before you keep building',
    description:
      'Start with Pro for guided practice, then upgrade when your daily usage grows. Keep momentum without paying for unused capacity.',
    ctaLabel: 'Compare Pro vs Max',
    destination: AFFILIATE_LINKS.proVsMax,
  },
  'mid-banner': {
    title: 'Need somewhere to deploy?',
    description:
      'Railway gives you one-click deploys from GitHub with generous free tier. Perfect for shipping what Claude Code builds.',
    ctaLabel: 'Try Railway free',
    destination: AFFILIATE_LINKS.railway,
  },
  'end-card': {
    title: 'Keep shipping: choose the plan that matches your workload',
    description:
      'Use our side-by-side comparison to pick the lowest-cost plan that still supports your daily coding and review flow.',
    ctaLabel: 'Open plan comparison',
    destination: AFFILIATE_LINKS.proVsMax,
  },
};

const comparisonDefaultDrafts: Record<AffiliateCTAPlacement, CTAConfigDraft> = {
  inline: {
    title: 'Compare options, then choose the right plan',
    description:
      'If Claude Code is your pick, validate plan limits and pricing before rollout so you do not hit avoidable bottlenecks later.',
    ctaLabel: 'View Claude plan breakdown',
    destination: AFFILIATE_LINKS.proVsMax,
  },
  'mid-banner': {
    title: 'Ship your first project with v0',
    description:
      'Use Vercel v0 to turn your Claude Code output into a deployed app in minutes. AI-generated UI meets one-click deploy.',
    ctaLabel: 'Try v0 free',
    destination: AFFILIATE_LINKS.vercelV0,
  },
  'end-card': {
    title: 'Choose with confidence',
    description:
      'Open the final plan guide to match tool choice with budget, team size, and expected coding volume.',
    ctaLabel: 'Open buyer guide',
    destination: AFFILIATE_LINKS.proVsMax,
  },
};

const comparisonOverrides: Record<
  string,
  Partial<Record<AffiliateCTAPlacement, Partial<CTAConfigDraft>>>
> = {
  'docs/comparisons/vs-cursor': {
    inline: {
      title: 'Cursor vs Claude settled?',
      description: 'Use the plan matrix next so you can estimate monthly cost before switching your default stack.',
      ctaLabel: 'See Claude plan matrix',
    },
  },
  'docs/comparisons/vs-copilot': {
    inline: {
      title: 'Copilot comparison done?',
      description: 'Validate Claude plan limits and upgrade thresholds before migrating team usage.',
      ctaLabel: 'Compare Claude plan limits',
    },
  },
  'docs/comparisons/vs-codex': {
    inline: {
      title: 'Choosing between Codex and Claude Code?',
      description:
        'Lock in the right Claude tier first so budget and throughput remain predictable after migration.',
      ctaLabel: 'Check Claude tiers',
    },
  },
};

function normalizeSlug(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function createConfig(
  pageSlug: string,
  placement: AffiliateCTAPlacement,
  draft: CTAConfigDraft,
): AffiliateCTAConfig {
  return {
    pageSlug,
    placement,
    variantId: `${normalizeSlug(pageSlug)}-${placement}`,
    ...draft,
  };
}

function resolveComparisonDraft(
  pageSlug: string,
  placement: AffiliateCTAPlacement,
): CTAConfigDraft {
  const defaultDraft = comparisonDefaultDrafts[placement];
  const override = comparisonOverrides[pageSlug]?.[placement];

  if (!override) return defaultDraft;

  return {
    ...defaultDraft,
    ...override,
  };
}

const tutorialDrafts: Record<AffiliateCTAPlacement, CTAConfigDraft> = {
  inline: {
    title: 'Want structured learning alongside this guide?',
    description:
      'Coursera professional certificates pair well with hands-on practice. Learn the theory, then build it with Claude Code.',
    ctaLabel: 'Browse certificates',
    destination: AFFILIATE_LINKS.coursera,
  },
  'mid-banner': {
    title: 'Deploy what you just built',
    description:
      'Railway gives you one-click deploys from GitHub with a generous free tier. Ship what Claude Code builds in minutes.',
    ctaLabel: 'Try Railway free',
    destination: AFFILIATE_LINKS.railway,
  },
  'end-card': {
    title: 'Keep building: pick a plan that fits',
    description:
      'Use our comparison to find the right Claude plan for your workload : from casual practice to daily production use.',
    ctaLabel: 'Open plan comparison',
    destination: AFFILIATE_LINKS.proVsMax,
  },
};

/**
 * Pages where Granola (AI meeting notes) is contextually relevant.
 * Granola referral: https://www.granola.ai?via=shadman-rahman
 */
const GRANOLA_PAGES = new Set([
  'docs/patterns/mcp-servers',
  'docs/workflows/daily-practice',
  'docs/workflows/pm-workflow',
  'docs/workflows/walk-into-your-1on1-prepared',
  'docs/workflows/write-a-prd-from-rough-notes',
  'docs/workflows/synthesize-user-research-into-findings',
  'docs/workflows/write-a-design-brief',
  'docs/workflows/prepare-for-a-design-review',
  'docs/workflows/turn-retro-notes-into-commitments',
  'docs/workflows/prepare-for-a-roadmap-review',
  'docs/workflows/team-adoption',
  'docs/templates/pm-workspace',
]);

/**
 * Pages where Railway (deployment platform) is contextually relevant.
 * Railway affiliate: https://railway.com?referralCode=shadman (15% recurring / 12 months)
 */
const RAILWAY_PAGES = new Set([
  'docs/workflows/ci-cd',
  'docs/workflows/debugging',
]);

const railwayDraft: CTAConfigDraft = {
  title: 'Need somewhere to deploy what you just automated?',
  description:
    'Railway gives you one-click deploys from GitHub with a generous free tier. Pair it with the CI/CD workflows on this page to go from commit to production without touching a config file.',
  ctaLabel: 'Try Railway free',
  destination: AFFILIATE_LINKS.railway,
};

/**
 * Pages where Warp (AI-native terminal) is contextually relevant.
 * Warp referral: https://app.warp.dev/referral/RVVXRNY (credit-only, not cash).
 * Single inline placement only; do not stack with other CTAs.
 */
const WARP_PAGES = new Set([
  'docs/foundations/which-interface',
]);

const terminalDraft: CTAConfigDraft = {
  title: 'Want a smarter terminal for Claude Code?',
  description:
    'Warp is an AI-native terminal that pairs well with the Claude Code CLI. Command blocks, inline AI suggestions, and a cleaner workflow than vanilla Terminal or iTerm. Heads up: this is a referral link.',
  ctaLabel: 'Try Warp free',
  destination: AFFILIATE_LINKS.warpReferral,
};

const workflowDrafts: Record<AffiliateCTAPlacement, CTAConfigDraft> = {
  inline: {
    title: 'Capture meetings without lifting a finger',
    description:
      'Granola uses AI to transcribe and summarize your meetings automatically. Pair it with Claude Code via MCP to turn meeting notes into action items, tickets, and code.',
    ctaLabel: 'Try Granola free',
    destination: AFFILIATE_LINKS.granola,
  },
  'mid-banner': {
    title: 'Need somewhere to deploy?',
    description:
      'Railway gives you one-click deploys from GitHub with generous free tier. Perfect for shipping what Claude Code builds.',
    ctaLabel: 'Try Railway free',
    destination: AFFILIATE_LINKS.railway,
  },
  'end-card': {
    title: 'Pick the right Claude plan for your workflow',
    description:
      'Use our side-by-side comparison to match plan to workload so you never hit limits mid-sprint.',
    ctaLabel: 'Open plan comparison',
    destination: AFFILIATE_LINKS.proVsMax,
  },
};

export function getAffiliateCtasForPage(pageSlug: string): AffiliateCTAConfig[] {
  if (pageSlug === 'guide') {
    return CTA_PLACEMENTS.map((placement) =>
      createConfig(pageSlug, placement, guideDrafts[placement]),
    );
  }

  if (pageSlug.startsWith('docs/tutorials/') || pageSlug.startsWith('tutorials/')) {
    return CTA_PLACEMENTS.map((placement) =>
      createConfig(pageSlug, placement, tutorialDrafts[placement]),
    );
  }

  if (GRANOLA_PAGES.has(pageSlug)) {
    return CTA_PLACEMENTS.map((placement) =>
      createConfig(pageSlug, placement, workflowDrafts[placement]),
    );
  }

  if (RAILWAY_PAGES.has(pageSlug)) {
    return [createConfig(pageSlug, 'inline', railwayDraft)];
  }

  if (WARP_PAGES.has(pageSlug)) {
    return [createConfig(pageSlug, 'inline', terminalDraft)];
  }

  if (!pageSlug.startsWith('docs/comparisons/')) {
    return [];
  }

  return CTA_PLACEMENTS.map((placement) =>
    createConfig(pageSlug, placement, resolveComparisonDraft(pageSlug, placement)),
  );
}
