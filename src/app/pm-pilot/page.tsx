import type { Metadata } from 'next';
import { PmPilotHero } from '@/components/pm-pilot/hero';
import { PmPilotWorksWith } from '@/components/pm-pilot/works-with';
import { PmPilotBeforeAfter } from '@/components/pm-pilot/before-after';
import { PmPilotJourneyMap } from '@/components/pm-pilot/journey-map';
import { PmPilotTopSkills } from '@/components/pm-pilot/top-skills';
import { PmPilotGettingStarted } from '@/components/pm-pilot/getting-started';
import { PmPilotIntegrations } from '@/components/pm-pilot/integrations';
import { PmPilotMemorySystem } from '@/components/pm-pilot/memory-system';
import { PmPilotWhyExists } from '@/components/pm-pilot/why-exists';
import { PmPilotFullSkillRef } from '@/components/pm-pilot/full-skill-ref';
import { PmPilotStarCta } from '@/components/pm-pilot/star-cta';
import { PmPilotFooter } from '@/components/pm-pilot/footer';

const siteUrl = 'https://claudecodeguide.dev';

export const metadata: Metadata = {
  title: 'PM Pilot - AI-Powered Meeting Prep, PRDs, and Status Reports',
  description:
    'AI-powered meeting prep, PRDs, and status reports for product managers. Works with ChatGPT, Claude, Gemini, and gets even more powerful with Claude Code. Free and open source.',
  openGraph: {
    title: 'PM Pilot - AI-Powered Meeting Prep, PRDs, and Status Reports',
    description:
      'AI-powered meeting prep, PRDs, and status reports for product managers. Works with ChatGPT, Claude, Gemini. Free and open source.',
    type: 'website',
    siteName: 'Claude Code Guide',
    url: `${siteUrl}/pm-pilot`,
    images: [
      {
        url: `${siteUrl}/og-pm-pilot.png`,
        width: 1200,
        height: 630,
        alt: 'PM Pilot - AI-powered meeting prep, PRDs, and status reports for product managers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM Pilot - AI-Powered Meeting Prep, PRDs, and Status Reports',
    description:
      'AI-powered meeting prep, PRDs, and status reports. Works with ChatGPT, Claude, Gemini. Free and open source.',
    images: [`${siteUrl}/og-pm-pilot.png`],
  },
  keywords: [
    'pm pilot',
    'product management AI',
    'AI meeting prep',
    'PRD writing AI',
    'weekly status generator',
    'market sizing AI',
    'product management tools',
    'chatgpt for product managers',
    'claude for PMs',
    'AI productivity tools',
    'claude code skills',
    'PM tools 2024',
  ],
  alternates: {
    canonical: `${siteUrl}/pm-pilot`,
  },
};

export default function PmPilotPage() {
  return (
    <main className="overflow-x-clip">
      <PmPilotHero />
      <PmPilotWorksWith />
      <div className="border-b border-fd-border" />
      <PmPilotBeforeAfter />
      <div className="border-b border-fd-border" />
      <PmPilotJourneyMap />
      <div className="border-b border-fd-border" />
      <PmPilotTopSkills />
      <div className="border-b border-fd-border" />
      <PmPilotGettingStarted />
      <div className="border-b border-fd-border" />
      <PmPilotIntegrations />
      <div className="border-b border-fd-border" />
      <PmPilotMemorySystem />
      <div className="border-b border-fd-border" />
      <PmPilotWhyExists />
      <div className="border-b border-fd-border" />
      <PmPilotFullSkillRef />
      <div className="border-b border-fd-border" />
      <PmPilotStarCta />
      <PmPilotFooter />
    </main>
  );
}
