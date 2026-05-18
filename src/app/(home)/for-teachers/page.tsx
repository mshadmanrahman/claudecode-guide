import { TeacherHero } from '@/components/for-teachers/hero';
import { TeacherGuideCards } from '@/components/for-teachers/guide-cards';
import { TeacherGettingStarted } from '@/components/for-teachers/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';

export default function ForTeachersPage() {
  return (
    <main className="overflow-x-clip">
      <TeacherHero />
      <div className="border-b border-fd-border" />
      <PersonaWorkflowStrip persona="teachers" />
      <div className="border-b border-fd-border" />
      <div id="guides">
        <TeacherGuideCards />
      </div>
      <div className="border-b border-fd-border" />
      <TeacherGettingStarted />
      <div className="border-b border-fd-border" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-teachers-footer" />
      </div>
    </main>
  );
}
