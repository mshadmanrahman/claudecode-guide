"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavLink {
  href: string;
  label: string;
  /** Hidden between 768px and 1024px to keep the bar on one line */
  wideOnly?: boolean;
  /** Off-site link: opens in a new tab */
  external?: boolean;
}

interface DropdownLink {
  href: string;
  label: string;
  description: string;
}

const PRIMARY_NAV: NavLink[] = [
  { href: "/docs", label: "Docs" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/workflow", label: "Workflow", wideOnly: true },
  { href: "/about", label: "About", wideOnly: true },
  { href: "https://shadmanrahman.substack.com/", label: "Product Field Notes", external: true },
];

const PATHS: DropdownLink[] = [
  { href: "/start", label: "Brand new", description: "Pick an interface and make something in 10 minutes" },
  { href: "/for-teachers", label: "Teachers", description: "Lesson plans, rubrics, parent emails" },
  { href: "/for-designers", label: "Designers", description: "Briefs, research, critique, handoff" },
  { href: "/for-marketers", label: "Marketers", description: "Copy, campaigns, research" },
  { href: "/for-hr", label: "HR teams", description: "Job descriptions, interviews, onboarding" },
  { href: "/pm-pilot", label: "Product managers", description: "PM Pilot: AI-assisted product management" },
  { href: "/for-chrome", label: "Chrome", description: "Browser, Gmail, Google Docs" },
  { href: "/for-microsoft", label: "Office", description: "Word, Excel, PowerPoint" },
  { href: "/certification", label: "Certification", description: "The 4 Claude credentials: prices, format, eligibility" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="5" stroke="currentColor" strokeOpacity=".5" />
      <path d="M5 15 L9 9 L12 13 L14 10 L17 15" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pathsOpen, setPathsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setPathsOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !pathsOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (pathsOpen && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setPathsOpen(false);
      }
      if (mobileOpen && barRef.current && !barRef.current.contains(target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mobileOpen, pathsOpen, closeAll]);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const pathsActive = PATHS.some((link) => isActive(link.href));

  const navItem = (active: boolean) =>
    `rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors lg:px-3.5 ${focusRing} ${
      active ? "bg-[var(--chip)] text-[var(--acc)]" : "text-[var(--ink)] hover:bg-[var(--chip)]"
    }`;

  return (
    <div className="sticky top-0 z-50 px-4 pt-2 md:px-16 md:pt-5">
      <div ref={barRef} className="relative mx-auto max-w-[1312px]">
        <header className="glass flex h-14 items-center justify-between rounded-xl pl-4 pr-2 text-[var(--ink)] md:h-[60px] md:pl-5 md:pr-3">
          <Link
            href="/"
            className={`flex items-center gap-2.5 rounded-md text-base font-semibold tracking-[-0.01em] ${focusRing}`}
          >
            <Logo />
            Claude Code Guide
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setPathsOpen((prev) => !prev)}
                aria-expanded={pathsOpen}
                aria-controls="paths-menu"
                className={`flex cursor-pointer items-center gap-1 ${navItem(pathsActive)}`}
              >
                Paths
                <ChevronDown
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${pathsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {pathsOpen && (
                <div
                  id="paths-menu"
                  className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-lg"
                >
                  {PATHS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-lg px-3 py-2.5 transition-colors ${focusRing} ${
                        isActive(link.href) ? "bg-[var(--chip)]" : "hover:bg-[var(--chip)]"
                      }`}
                    >
                      <span
                        className={`block text-sm font-medium ${
                          isActive(link.href) ? "text-[var(--acc)]" : "text-[var(--ink)]"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--muted)]">{link.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${link.wideOnly ? "hidden lg:block" : ""} whitespace-nowrap ${navItem(isActive(link.href))}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/start"
              className={`glass hidden h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors hover:bg-[var(--glass2)] sm:flex ${focusRing}`}
            >
              Start free
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink)] md:hidden ${focusRing}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </header>

        {mobileOpen && (
          <div
            id="mobile-menu"
            className="absolute left-0 right-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-lg md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={navItem(isActive(link.href))}
                >
                  {link.label}
                </Link>
              ))}
              <p className="px-2.5 pb-1 pt-3 font-mono text-label uppercase text-[var(--muted)]">Paths</p>
              {PATHS.map((link) => (
                <Link key={link.href} href={link.href} className={navItem(isActive(link.href))}>
                  {link.label}
                </Link>
              ))}
              <Link
                href="/start"
                className={`mt-2 flex h-11 items-center justify-center rounded-lg border border-[var(--line)] text-sm font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
              >
                Start free
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
