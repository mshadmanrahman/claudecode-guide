import { MarketerHero } from '@/components/for-marketers/hero';
import { MarketerGuideCards } from '@/components/for-marketers/guide-cards';
import { MarketerGettingStarted } from '@/components/for-marketers/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';

export default function ForMarketersPage() {
  return (
    <main className="overflow-x-clip">
      <MarketerHero />
      <PersonaWorkflowStrip persona="marketers" />
      <div id="guides">
        <MarketerGuideCards />
      </div>
      <MarketerGettingStarted />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-marketers-footer" />
      </div>
    </main>
  );
}
