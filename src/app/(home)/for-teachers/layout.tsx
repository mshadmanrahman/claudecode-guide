import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Claude for Teachers: Lesson Plans, Quiz Questions, Rubrics, and More',
  description:
    'Practical Claude guides for teachers. Write lesson plans, generate quiz questions, create grading rubrics, give student feedback, and draft parent emails, all faster than doing it manually.',
  openGraph: {
    title: 'Claude for Teachers: Lesson Plans, Quiz Questions, Rubrics, and More',
    description:
      'Practical Claude guides for teachers. Lesson plans, quiz questions, rubrics, student feedback, and parent emails.',
    type: 'website',
  },
};

export default function ForTeachersLayout({ children }: { children: ReactNode }) {
  return children;
}
