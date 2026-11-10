import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

const url = 'https://claudecodeguide.dev/bn/for-teachers';
const title = 'শিক্ষকদের জন্য Claude: Lesson plan, quiz আর rubric-এর guide';
const description =
  'শিক্ষকদের জন্য Claude-এর practical guide: lesson plan লেখা, quiz-এর প্রশ্ন বানানো, rubric তৈরি, ছাত্রছাত্রীদের feedback আর অভিভাবকের email।';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: url,
    languages: { en: 'https://claudecodeguide.dev/for-teachers', bn: url },
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url,
    locale: 'bn_BD',
    images: [ogImage('for-teachers', 'Claude for Teachers: Lesson Plans, Quiz Questions, Rubrics, and More')],
  },
};

export default function BnForTeachersLayout({ children }: { children: ReactNode }) {
  return children;
}
