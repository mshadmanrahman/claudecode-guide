import { MicrosoftHero } from '@/components/for-microsoft/hero';
import { MicrosoftGuideCards } from '@/components/for-microsoft/guide-cards';
import { MicrosoftGettingStarted } from '@/components/for-microsoft/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';

export default function ForMicrosoftPage() {
  return (
    <main className="overflow-x-clip">
      <MicrosoftHero />
      <div className="border-b border-fd-border" />
      <PersonaWorkflowStrip persona="microsoft" />
      <div className="border-b border-fd-border" />
      <div id="guides">
        <MicrosoftGuideCards />
      </div>
      <div className="border-b border-fd-border" />
      <MicrosoftGettingStarted />
      <div className="border-b border-fd-border" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-microsoft-footer" />
      </div>
    </main>
  );
}
