import { HrHero } from "@/components/for-hr/hero";
import { HrGuideCards } from "@/components/for-hr/guide-cards";
import { HrGettingStarted } from "@/components/for-hr/getting-started";
import { PersonaWorkflowStrip } from "@/components/persona-workflow-strip";
import { EmailCapture } from "@/components/email-capture";

export default function ForHrPage() {
  return (
    <main className="overflow-x-clip">
      <HrHero />
      <PersonaWorkflowStrip persona="hr" />
      <div id="guides">
        <HrGuideCards />
      </div>
      <HrGettingStarted />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-hr-footer" />
      </div>
    </main>
  );
}
