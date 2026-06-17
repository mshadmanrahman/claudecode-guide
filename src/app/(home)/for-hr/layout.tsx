import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title:
    "Claude for HR: Job Descriptions, Onboarding, Performance Reviews, and More",
  description:
    "Practical Claude guides for HR professionals. Write job descriptions, generate interview questions, create onboarding plans, draft performance reviews, and communicate change — all faster than doing it manually.",
  openGraph: {
    title:
      "Claude for HR: Job Descriptions, Onboarding, Performance Reviews, and More",
    description:
      "Practical Claude guides for HR. Job descriptions, interview questions, onboarding plans, performance reviews, and employee communications.",
    type: "website",
  },
};

export default function ForHrLayout({ children }: { children: ReactNode }) {
  return children;
}
