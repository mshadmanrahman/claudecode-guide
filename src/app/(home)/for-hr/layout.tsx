import type { Metadata } from "next";
import type { ReactNode } from "react";

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
    images: [
      {
        url: `https://claudecodeguide.dev/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`,
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  },
};

export default function ForHrLayout({ children }: { children: ReactNode }) {
  return children;
}
