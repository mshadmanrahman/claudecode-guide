"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BN_PREFIX = /^\/bn(?=\/|$)/;

interface FooterLanguageLinkProps {
  className?: string;
}

/**
 * On a Bangla page this links to the same page in English; everywhere else it
 * links to the Bangla hub. Every /bn route is a translation of an English route
 * with the same path, so stripping the prefix is the English counterpart.
 */
export function FooterLanguageLink({ className }: FooterLanguageLinkProps) {
  const pathname = usePathname() ?? "/";
  const onBangla = BN_PREFIX.test(pathname);

  if (onBangla) {
    return (
      <Link href={pathname.replace(BN_PREFIX, "") || "/"} hrefLang="en" lang="en" className={className}>
        Read in English
      </Link>
    );
  }
  return (
    <Link href="/bn" hrefLang="bn" lang="bn" className={className}>
      বাংলায় পড়ুন
    </Link>
  );
}
