import { DesignerHero } from '@/components/for-designers/hero';
import { FrameworkLink } from '@/components/framework-link';
import { DesignerBeforeAfter } from '@/components/for-designers/before-after';
import { DesignerProcessMap } from '@/components/for-designers/design-process';
import { DesignerGuideCards } from '@/components/for-designers/guide-cards';
import { DesignerGettingStarted } from '@/components/for-designers/getting-started';
import { DesignerWhyExists } from '@/components/for-designers/why-exists';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';
import { HubGuideIndex } from '@/components/hub-guide-index';
import { DESIGNER_GUIDES } from '@/lib/designer-guides';

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
      <HubGuideIndex
        hubPath="/for-designers"
        hubName="Claude for Designers"
        hubDescription="Practical Claude guides for UX and UI designers: decode briefs, run heuristic evaluations, synthesize research and build prototypes. Free, task-oriented."
        guides={Object.values(DESIGNER_GUIDES).map((g) => ({ slug: g.slug, title: g.title }))}
      />
      <DesignerGettingStarted />
      <DesignerWhyExists />
      <FrameworkLink href="/docs/frameworks/for-designers" audience="designers" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-designers-footer" />
      </div>
    </main>
  );
}
