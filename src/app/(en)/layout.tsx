import type { ReactNode } from "react";
import { RootDocument, rootMetadata } from "@/components/root-document";

export const metadata = rootMetadata;

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
