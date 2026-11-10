import { TeacherHero } from '@/components/for-teachers/hero';
import { FrameworkLink } from '@/components/framework-link';
import { TeacherGuideCards } from '@/components/for-teachers/guide-cards';
import { TeacherGettingStarted } from '@/components/for-teachers/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { EmailCapture } from '@/components/email-capture';
import { HubGuideIndex } from '@/components/hub-guide-index';
import { TEACHER_GUIDES } from '@/lib/teacher-guides';

export default function ForTeachersPage() {
  return (
    <main className="overflow-x-clip">
      <TeacherHero />
      <PersonaWorkflowStrip persona="teachers" />
      <div id="guides">
        <TeacherGuideCards />
      </div>
      <HubGuideIndex
        hubPath="/for-teachers"
        hubName="Claude for Teachers"
        hubDescription="Practical Claude guides for teachers: write lesson plans, generate quiz questions, build grading rubrics, give student feedback and draft parent emails."
        guides={Object.values(TEACHER_GUIDES).map((g) => ({ slug: g.slug, title: g.title }))}
      />
      <TeacherGettingStarted />
      <FrameworkLink href="/docs/frameworks/for-teachers" audience="teachers" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-teachers-footer" />
      </div>
    </main>
  );
}
