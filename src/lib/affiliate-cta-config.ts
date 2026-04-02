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
const DEFAULT_DESTINATION = 'https://claude.ai/upgrade';

const guideDrafts: Record<AffiliateCTAPlacement, CTAConfigDraft> = {
  inline: {
    title: 'Pick your Claude plan before you keep building',
    description:
      'Start with Pro for guided practice, then upgrade when your daily usage grows. Keep momentum without paying for unused capacity.',
    ctaLabel: 'Compare Pro vs Max',
    destination: '/docs/comparisons/pro-vs-max',
  },
  'mid-banner': {
    title: 'Ready for real projects?',
    description:
      'Use the same setup with your own repo. Claude plan limits affect throughput once you move from tutorials to production work.',
    ctaLabel: 'See pricing and limits',
    destination: DEFAULT_DESTINATION,
  },
  'end-card': {
    title: 'Keep shipping: choose the plan that matches your workload',
    description:
      'Use our side-by-side comparison to pick the lowest-cost plan that still supports your daily coding and review flow.',
    ctaLabel: 'Open plan comparison',
    destination: '/docs/comparisons/pro-vs-max',
  },
};

const comparisonDefaultDrafts: Record<AffiliateCTAPlacement, CTAConfigDraft> = {
  inline: {
    title: 'Compare options, then choose the right plan',
    description:
      'If Claude Code is your pick, validate plan limits and pricing before rollout so you do not hit avoidable bottlenecks later.',
    ctaLabel: 'View Claude plan breakdown',
    destination: '/docs/comparisons/pro-vs-max',
  },
  'mid-banner': {
    title: 'Decision shortcut: pricing + limits in one place',
    description:
      'Use this before committing team workflows. You get clear differences on usage ceilings, context, and expected cost.',
    ctaLabel: 'Review pricing details',
    destination: DEFAULT_DESTINATION,
  },
  'end-card': {
    title: 'Choose with confidence',
    description:
      'Open the final plan guide to match tool choice with budget, team size, and expected coding volume.',
    ctaLabel: 'Open buyer guide',
    destination: '/docs/comparisons/pro-vs-max',
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

export function getAffiliateCtasForPage(pageSlug: string): AffiliateCTAConfig[] {
  if (pageSlug === 'guide') {
    return CTA_PLACEMENTS.map((placement) =>
      createConfig(pageSlug, placement, guideDrafts[placement]),
    );
  }

  if (!pageSlug.startsWith('docs/comparisons/')) {
    return [];
  }

  return CTA_PLACEMENTS.map((placement) =>
    createConfig(pageSlug, placement, resolveComparisonDraft(pageSlug, placement)),
  );
}
