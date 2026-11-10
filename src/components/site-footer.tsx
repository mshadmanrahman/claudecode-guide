import Link from "next/link";
import { flattenTree } from "fumadocs-core/page-tree";
import { FooterArt } from "@/components/footer-art";
import { FooterBridge, type BridgePage } from "@/components/footer-bridge";
import { FooterLanguageLink } from "@/components/footer-language-link";
import type { FooterScene } from "@/lib/footer-scenes";
import { source } from "@/lib/source";
import { SOCIAL } from "@/lib/site";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: ReadonlyArray<FooterLink>;
}

const COLUMNS: ReadonlyArray<FooterColumn> = [
  {
    heading: "Start",
    links: [
      { label: "Start here", href: "/start" },
      { label: "What it is", href: "/journey" },
      { label: "Set up", href: "/guide" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Recipes", href: "/docs/workflows/daily-practice" },
      { label: "Primitives", href: "/primitives" },
      { label: "Skills", href: "/skills" },
      { label: "Certification", href: "/certification" },
    ],
  },
  {
    heading: "Read",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "Field notes", href: SOCIAL.substack, external: true },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { label: "X", href: SOCIAL.x, external: true },
      { label: "LinkedIn", href: SOCIAL.linkedin, external: true },
      { label: "GitHub", href: SOCIAL.repo, external: true },
    ],
  },
];

const linkClass =
  "block rounded-sm py-[3px] text-[14px] text-[var(--ink)] transition-colors hover:text-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

const SECTION_TITLES: Readonly<Record<string, string>> = {
  comparisons: "Comparisons",
  foundations: "Foundations",
  frameworks: "Frameworks",
  patterns: "Patterns",
  templates: "Templates",
  workflows: "Recipes",
};

/** Docs pages in sidebar order, for the "Keep reading" bridge. */
function docsReadingOrder(): BridgePage[] {
  const titles = new Map(source.getPages().map((p) => [p.url, p.data.title]));
  return flattenTree(source.pageTree.children).flatMap((item) => {
    const section = SECTION_TITLES[item.url.split("/")[2] ?? ""];
    const title = titles.get(item.url);
    return section && title ? [{ url: item.url, title, section }] : [];
  });
}

interface SiteFooterProps {
  /** Pin the closing landscape (the 404 page has no route to read it from). */
  scene?: FooterScene;
}

export function SiteFooter({ scene }: SiteFooterProps) {
  return (
    <footer className="relative mt-auto bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto max-w-[1312px] px-4 md:px-16">
        <FooterBridge pages={docsReadingOrder()} />
        <div className="grid gap-7 pt-20 md:grid-cols-[1.3fr_2fr] md:gap-12 md:pt-24">
          <div>
            <Link href="/" className="rounded-sm text-[15px] font-semibold text-[var(--ink)]">
              Claude Code Guide
            </Link>
            <p className="mt-2 mb-0 max-w-[280px] text-[14px] leading-[1.6] text-[var(--muted)]">
              A field guide for people who build with Claude Code. Kept by{" "}
              <Link href="/about" className="text-[var(--muted)] underline underline-offset-2 hover:text-[var(--acc)]">
                Shadman Rahman
              </Link>
              .
            </p>
          </div>
          <nav aria-label="Site" className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h2 className="mb-2.5 text-[13px] font-medium text-[var(--muted)]">{col.heading}</h2>
                {col.links.map((link) =>
                  link.external ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  ),
                )}
                {col.heading === "Elsewhere" && <FooterLanguageLink className={linkClass} />}
              </div>
            ))}
          </nav>
        </div>
      </div>
      <FooterArt scene={scene}>
        <div className="footer-legal mx-auto flex max-w-[1312px] justify-between gap-3 px-4 text-[12px] md:px-16">
          <span>© 2026 Claude Code Guide</span>
          <span>
            <a href="/sitemap.xml" className="hover:text-[var(--acc)]">
              sitemap
            </a>
            {" · "}
            <a href="/llms.txt" className="hover:text-[var(--acc)]">
              llms.txt
            </a>
          </span>
        </div>
      </FooterArt>
    </footer>
  );
}
