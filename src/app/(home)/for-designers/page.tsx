import { DesignerHero } from '@/components/for-designers/hero';
import { DesignerBeforeAfter } from '@/components/for-designers/before-after';
import { DesignerProcessMap } from '@/components/for-designers/design-process';
import { DesignerGuideCards } from '@/components/for-designers/guide-cards';
import { DesignerGettingStarted } from '@/components/for-designers/getting-started';
import { DesignerWhyExists } from '@/components/for-designers/why-exists';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';

export default function ForDesignersPage() {
  return (
    <main className="overflow-x-clip">
      <DesignerHero />
      <DesignerBeforeAfter />
      <DesignerProcessMap />
      <PersonaWorkflowStrip persona="designers" />
      <div id="guides">
        <DesignerGuideCards />
      </div>
      <DesignerGettingStarted />
      <DesignerWhyExists />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-designers-footer" />
      </div>
    </main>
  );
}
