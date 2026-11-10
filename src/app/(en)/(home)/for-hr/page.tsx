import { HrHero } from "@/components/for-hr/hero";
import { FrameworkLink } from "@/components/framework-link";
import { HrGuideCards } from "@/components/for-hr/guide-cards";
import { HrGettingStarted } from "@/components/for-hr/getting-started";
import { PersonaWorkflowStrip } from "@/components/persona-workflow-strip";
import { EmailCapture } from "@/components/email-capture";
import { HubGuideIndex } from "@/components/hub-guide-index";
import { HR_GUIDES } from "@/lib/hr-guides";

export default function ForHrPage() {
  return (
    <main className="overflow-x-clip">
      <HrHero />
      <PersonaWorkflowStrip persona="hr" />
      <div id="guides">
        <HrGuideCards />
      </div>
      <HubGuideIndex
        hubPath="/for-hr"
        hubName="Claude for HR"
        hubDescription="Practical Claude guides for HR: write job descriptions, generate interview questions, build onboarding plans, draft performance reviews, announce change."
        guides={Object.values(HR_GUIDES).map((g) => ({ slug: g.slug, title: g.title }))}
      />
      <HrGettingStarted />
      <FrameworkLink href="/docs/frameworks/for-hr" audience="HR teams" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-hr-footer" />
      </div>
    </main>
  );
}
