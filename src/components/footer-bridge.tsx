"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BridgePage {
  url: string;
  title: string;
  section: string;
}

interface FooterBridgeProps {
  /** Docs pages in sidebar order. */
  pages: ReadonlyArray<BridgePage>;
}

/**
 * "Keep reading": the next docs page, in sidebar order, between the article
 * and the footer links. Docs turn off Fumadocs' own prev/next, and tutorials
 * and essays already end on their own next and related links, so this shows
 * on docs pages only.
 */
export function FooterBridge({ pages }: FooterBridgeProps) {
  const pathname = usePathname() ?? "/";
  const at = pages.findIndex((p) => p.url === pathname);
  const next = at >= 0 ? pages[at + 1] : undefined;
  if (!next) return null;

  const inSection = pages.filter((p) => p.section === next.section);
  const position = inSection.indexOf(next) + 1;

  return (
    <div className="footer-bridge">
      <p className="m-0 mb-3.5 text-[13px] text-[var(--muted)]">Keep reading</p>
      <Link href={next.url} className="footer-next group">
        <span>
          <small className="mb-1.5 block text-[13px] text-[var(--muted)]">
            Next in {next.section}, {position} of {inSection.length}
          </small>
          <strong className="block max-w-[560px] text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--ink)] group-hover:text-[var(--acc)] md:text-[28px]">
            {next.title}
          </strong>
        </span>
        <span className="text-[15px] whitespace-nowrap text-[var(--acc)]">Continue →</span>
      </Link>
    </div>
  );
}
