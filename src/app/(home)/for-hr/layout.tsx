import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ogImage } from '@/lib/og/image';

const ogTitle =
  "Claude for HR: Job Descriptions, Onboarding, Performance Reviews, and More";
const ogDescription =
  "Practical Claude guides for HR. Job descriptions, interview questions, onboarding plans, performance reviews, and employee communications.";

export const metadata: Metadata = {
  title: "Claude for HR: Practical Guides",
  description:
    "Practical Claude guides for HR: write job descriptions, generate interview questions, build onboarding plans, draft performance reviews, announce change.",
  alternates: { canonical: "https://claudecodeguide.dev/for-hr" },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: "website",
    images: [ogImage('for-hr', ogTitle)],
  },
};

export default function ForHrLayout({ children }: { children: ReactNode }) {
  return children;
}
