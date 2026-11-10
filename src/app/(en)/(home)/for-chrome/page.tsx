import { ChromeHero } from '@/components/for-chrome/hero';
import { FrameworkLink } from '@/components/framework-link';
import { ChromeGuideCards } from '@/components/for-chrome/guide-cards';
import { ChromeGettingStarted } from '@/components/for-chrome/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';
import { HubGuideIndex } from '@/components/hub-guide-index';
import { CHROME_GUIDES } from '@/lib/chrome-guides';

export default function ForChromePage() {
  return (
    <main className="overflow-x-clip">
      <ChromeHero />
      <PersonaWorkflowStrip persona="chrome" />
      <div id="guides">
        <ChromeGuideCards />
      </div>
      <HubGuideIndex
        hubPath="/for-chrome"
        hubName="Claude for Chrome"
        hubDescription="Use Claude in Chrome: open claude.ai, install a Chrome extension, and run Claude alongside Gmail and Google Docs. Free, beginner-friendly guides."
        guides={Object.values(CHROME_GUIDES).map((g) => ({ slug: g.slug, title: g.title }))}
      />
      <ChromeGettingStarted />
      <FrameworkLink href="/docs/frameworks/for-chrome" audience="Chrome users" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-chrome-footer" />
      </div>
    </main>
  );
}
