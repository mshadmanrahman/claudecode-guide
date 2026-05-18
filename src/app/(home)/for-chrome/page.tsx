import { ChromeHero } from '@/components/for-chrome/hero';
import { ChromeGuideCards } from '@/components/for-chrome/guide-cards';
import { ChromeGettingStarted } from '@/components/for-chrome/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';

export default function ForChromePage() {
  return (
    <main className="overflow-x-clip">
      <ChromeHero />
      <div className="border-b border-fd-border" />
      <PersonaWorkflowStrip persona="chrome" />
      <div className="border-b border-fd-border" />
      <div id="guides">
        <ChromeGuideCards />
      </div>
      <div className="border-b border-fd-border" />
      <ChromeGettingStarted />
      <div className="border-b border-fd-border" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-chrome-footer" />
      </div>
    </main>
  );
}
