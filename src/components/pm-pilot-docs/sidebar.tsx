'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface NavItem {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const BASE = '/pm-pilot/guide';

const NAV: NavSection[] = [
  {
    title: '',
    items: [
      { label: 'Overview', href: BASE },
      { label: 'Getting Started', href: `${BASE}/getting-started` },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'Integrations', href: `${BASE}/integrations` },
      { label: 'Memory system', href: `${BASE}/memory-system` },
    ],
  },
  {
    title: 'PM Core',
    items: [
      { label: 'Meeting Prep', href: `${BASE}/skills/meeting-prep` },
      { label: 'PRD Writing', href: `${BASE}/skills/prd` },
      { label: 'Weekly Status', href: `${BASE}/skills/weekly-status` },
      { label: 'People Sync', href: `${BASE}/skills/people-sync` },
      { label: 'Deep Context', href: `${BASE}/skills/deep-context` },
      { label: 'Market Sizing', href: `${BASE}/skills/market-sizing` },
      { label: 'Prioritize', href: `${BASE}/skills/prioritize` },
      { label: 'Synthesize Interviews', href: `${BASE}/skills/synthesize-interviews` },
      { label: 'Critique', href: `${BASE}/skills/critique` },
      { label: 'Ask Company', href: `${BASE}/skills/ask-company` },
      { label: 'Dogfood', href: `${BASE}/skills/dogfood` },
      { label: 'Lenny Podcast', href: `${BASE}/skills/lenny-podcast` },
    ],
  },
  {
    title: 'Productivity',
    items: [
      { label: 'Session Init', href: `${BASE}/productivity/session-init` },
      { label: 'Handoff Doc', href: `${BASE}/productivity/handoff-doc` },
      { label: 'Orchestrator', href: `${BASE}/productivity/orchestrator` },
      { label: 'Strategic Compact', href: `${BASE}/productivity/strategic-compact` },
      { label: 'Manifest Reader', href: `${BASE}/productivity/manifest-reader` },
      { label: 'Meta Observer', href: `${BASE}/productivity/meta-observer` },
    ],
  },
  {
    title: 'Dev',
    items: [
      { label: 'TDD Workflow', href: `${BASE}/dev/tdd-workflow` },
      { label: 'Verification Loop', href: `${BASE}/dev/verification-loop` },
      { label: 'Search First', href: `${BASE}/dev/search-first` },
      { label: 'Security Review', href: `${BASE}/dev/security-review` },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Market Research', href: `${BASE}/content-writing/market-research` },
      { label: 'Writing Style', href: `${BASE}/content-writing/writing-style` },
      { label: 'Substack Writing', href: `${BASE}/content-writing/writing-substack` },
    ],
  },
];

export function PmPilotSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col py-6 pr-4">
      <div className="mb-6 px-2">
        <Link
          href="/pm-pilot"
          className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← PM Pilot
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {NAV.map((section, si) => (
          <div key={si}>
            {section.title && (
              <p className="mb-1.5 px-2 text-sm font-semibold text-fd-foreground">
                {section.title}
              </p>
            )}
            <div className="flex flex-col gap-px">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => trackEvent('pm_pilot_guide_nav', { label: item.label, section: section.title || 'top' })}
                    className={`block rounded-md py-1.5 text-sm transition-colors ${
                      section.title ? 'pl-4 pr-2' : 'px-2'
                    } ${
                      isActive
                        ? 'font-medium text-fd-foreground'
                        : 'text-fd-muted-foreground hover:text-fd-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
