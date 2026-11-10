import type { ReactNode } from "react";
import { RootDocument, rootMetadata } from "@/components/root-document";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = rootMetadata;

// Same shell as app/(en)/(home)/layout.tsx, under its own root so /bn/* renders lang="bn".
export default function BanglaRootLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="bn">
      <div className="relative isolate flex min-h-screen flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </RootDocument>
  );
}
