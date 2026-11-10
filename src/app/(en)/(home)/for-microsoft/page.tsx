import { MicrosoftHero } from '@/components/for-microsoft/hero';
import { FrameworkLink } from '@/components/framework-link';
import { MicrosoftGuideCards } from '@/components/for-microsoft/guide-cards';
import { MicrosoftGettingStarted } from '@/components/for-microsoft/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';
import { HubGuideIndex } from '@/components/hub-guide-index';
import { MICROSOFT_GUIDES } from '@/lib/microsoft-guides';

export default function ForMicrosoftPage() {
  return (
    <main className="overflow-x-clip">
      <MicrosoftHero />
      <PersonaWorkflowStrip persona="microsoft" />
      <div id="guides">
        <MicrosoftGuideCards />
      </div>
      <HubGuideIndex
        hubPath="/for-microsoft"
        hubName="Claude for Word, Excel and PowerPoint"
        hubDescription="Use Claude chat with Word, Excel and PowerPoint: draft documents, build formulas, analyze data and create presentations. No plugins or Claude Code required."
        guides={Object.values(MICROSOFT_GUIDES).map((g) => ({ slug: g.slug, title: g.title }))}
      />
      <MicrosoftGettingStarted />
      <FrameworkLink href="/docs/frameworks/for-microsoft" audience="Office users" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-microsoft-footer" />
      </div>
    </main>
  );
}
