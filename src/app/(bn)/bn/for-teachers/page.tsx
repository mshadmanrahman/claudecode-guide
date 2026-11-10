import { TeacherHero } from '@/components/for-teachers/hero';
import { TeacherGuideCards, type TeacherCardGuide } from '@/components/for-teachers/guide-cards';
import { TeacherGettingStarted } from '@/components/for-teachers/getting-started';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { StaleNotice } from '@/components/stale-notice';
import { TEACHERS_HUB } from '@/lib/hubs/teachers';
import { BN_TEACHERS_HUB } from '@/lib/i18n/bn/hubs/teachers';
import { BN_TEACHER_GUIDES } from '@/lib/i18n/bn/teacher-guides';
import { sourceHash } from '@/lib/i18n/source-hash';

const guides: Record<string, TeacherCardGuide> = Object.fromEntries(
  Object.entries(BN_TEACHER_GUIDES).flatMap(([slug, t]) =>
    t ? [[slug, { slug, title: t.content.title, description: t.content.description, duration: t.content.duration, difficulty: t.content.difficulty }]] : [],
  ),
);

export default function BnForTeachersPage() {
  const copy = BN_TEACHERS_HUB.content;
  const stale = BN_TEACHERS_HUB.sourceHash !== sourceHash(TEACHERS_HUB);
  return (
    <main lang="bn" className="overflow-x-clip">
      {stale && <StaleNotice englishHref="/for-teachers" />}
      <TeacherHero locale="bn" copy={copy} />
      <PersonaWorkflowStrip persona="teachers" locale="bn" copy={copy.strip} />
      <div id="guides">
        <TeacherGuideCards locale="bn" copy={copy.cards} guides={guides} />
      </div>
      <TeacherGettingStarted locale="bn" copy={copy.gettingStarted} />
    </main>
  );
}
