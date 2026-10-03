import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SceneBackdrop } from '@/components/scene-backdrop';
import { ogImage } from '@/lib/og/image';

const ogTitle = 'Claude for Teachers: Lesson Plans, Quiz Questions, Rubrics, and More';
const ogDescription =
  'Practical Claude guides for teachers. Lesson plans, quiz questions, rubrics, student feedback, and parent emails.';

export const metadata: Metadata = {
  title: 'Claude for Teachers: Lesson Plans, Quiz Questions, Rubrics, and More',
  description:
    'Practical Claude guides for teachers. Write lesson plans, generate quiz questions, create grading rubrics, give student feedback, and draft parent emails, all faster than doing it manually.',
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: 'website',
    images: [ogImage('for-teachers', ogTitle)],
  },
};

export default function ForTeachersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SceneBackdrop variant="faded" scene="schoolhouse" />
      {children}
    </>
  );
}
