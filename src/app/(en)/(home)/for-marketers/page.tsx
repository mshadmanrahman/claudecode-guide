import { MarketerHero } from '@/components/for-marketers/hero';
import { FrameworkLink } from '@/components/framework-link';
import { MarketerGuideCards } from '@/components/for-marketers/guide-cards';
import { MarketerGettingStarted } from '@/components/for-marketers/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';
import { HubGuideIndex } from '@/components/hub-guide-index';
import { MARKETER_GUIDES } from '@/lib/marketer-guides';

export default function ForMarketersPage() {
  return (
    <main className="overflow-x-clip">
      <MarketerHero />
      <PersonaWorkflowStrip persona="marketers" />
      <div id="guides">
        <MarketerGuideCards />
      </div>
      <HubGuideIndex
        hubPath="/for-marketers"
        hubName="Claude for Marketers"
        hubDescription="Practical Claude guides for marketers: social media posts, blog posts, email campaigns and ad copy, written faster. Brand voice setup included."
        guides={Object.values(MARKETER_GUIDES).map((g) => ({ slug: g.slug, title: g.title }))}
      />
      <MarketerGettingStarted />
      <FrameworkLink href="/docs/frameworks/for-marketers" audience="marketers" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-marketers-footer" />
      </div>
    </main>
  );
}
