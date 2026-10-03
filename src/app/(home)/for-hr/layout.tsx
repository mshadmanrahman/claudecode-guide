import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SceneBackdrop } from "@/components/scene-backdrop";
import { ogImage } from '@/lib/og/image';

const ogTitle =
  "Claude for HR: Job Descriptions, Onboarding, Performance Reviews, and More";
const ogDescription =
  "Practical Claude guides for HR. Job descriptions, interview questions, onboarding plans, performance reviews, and employee communications.";

export const metadata: Metadata = {
  title:
    "Claude for HR: Job Descriptions, Onboarding, Performance Reviews, and More",
  description:
    "Practical Claude guides for HR professionals. Write job descriptions, generate interview questions, create onboarding plans, draft performance reviews, and communicate change, all faster than doing it manually.",
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: "website",
    images: [ogImage('for-hr', ogTitle)],
  },
};

export default function ForHrLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SceneBackdrop variant="faded" scene="green" />
      {children}
    </>
  );
}
