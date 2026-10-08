import { Fragment } from "react";
import Link from "next/link";
import { FooterLanguageLink } from "@/components/footer-language-link";

interface FooterLink {
  label: string;
  href: string;
}

const SITE_LINKS: ReadonlyArray<FooterLink> = [
  { label: "docs", href: "/docs" },
  { label: "tutorials", href: "/tutorials" },
  { label: "essays", href: "/blog" },
  { label: "certification", href: "/certification" },
  { label: "roadmap", href: "/roadmap" },
  { label: "journey", href: "/journey" },
  { label: "about", href: "/about" },
  { label: "sitemap", href: "/sitemap.xml" },
  { label: "llms.txt", href: "/llms.txt" },
];

const SOCIAL_LINKS: ReadonlyArray<FooterLink> = [
  { label: "linkedin", href: "https://www.linkedin.com/in/shadmanrahman" },
  { label: "product field notes", href: "https://shadmanrahman.substack.com/" },
  { label: "github", href: "https://github.com/mshadmanrahman/claudecode-guide" },
];

const linkClass =
  "rounded-sm text-[var(--ink)] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-[var(--line)] bg-[var(--bg)] px-4 pb-9 pt-10 font-mono text-caption md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-3">
        <nav aria-label="Site" className="glass flex flex-wrap gap-x-5 gap-y-2 self-start rounded-lg px-3.5 py-2.5">
          {SITE_LINKS.map((link) => (
            <Fragment key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
              {link.href === "/about" && <FooterLanguageLink className={linkClass} />}
            </Fragment>
          ))}
        </nav>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="glass m-0 self-start rounded-lg px-3.5 py-2.5 text-[var(--ink)]">
            kept by{" "}
            <Link href="/about" className={linkClass}>
              Shadman Rahman
            </Link>
          </p>
          <div className="glass flex gap-5 self-start rounded-lg px-3.5 py-2.5 sm:self-auto">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
