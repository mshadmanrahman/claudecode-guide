"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, Languages } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavLink {
  href: string;
  label: string;
  /** Hidden between 768px and 1024px to keep the bar on one line */
  wideOnly?: boolean;
}

interface DropdownLink {
  href: string;
  label: string;
  description: string;
}

interface DropdownGroup {
  heading?: string;
  links: ReadonlyArray<DropdownLink>;
}

interface Dropdown {
  id: "paths" | "learn";
  label: string;
  groups: ReadonlyArray<DropdownGroup>;
}

const PRIMARY_NAV: ReadonlyArray<NavLink> = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About", wideOnly: true },
];

const DROPDOWNS: ReadonlyArray<Dropdown> = [
  {
    id: "paths",
    label: "Paths",
    groups: [
      {
        heading: "By role",
        links: [
          { href: "/for-teachers", label: "Teachers", description: "Lesson plans, rubrics, parent emails" },
          { href: "/for-designers", label: "Designers", description: "Briefs, research, critique, handoff" },
          { href: "/for-marketers", label: "Marketers", description: "Copy, campaigns, research" },
          { href: "/for-hr", label: "HR teams", description: "Job descriptions, interviews, onboarding" },
          { href: "/pm-pilot", label: "Product managers", description: "PM Pilot: AI-assisted product management" },
        ],
      },
      {
        heading: "By tool",
        links: [
          { href: "/for-chrome", label: "Chrome", description: "Browser, Gmail, Google Docs" },
          { href: "/for-microsoft", label: "Office", description: "Word, Excel, PowerPoint" },
        ],
      },
      {
        links: [
          { href: "/workflow", label: "A day with Claude", description: "One prompt for each part of a working day" },
        ],
      },
    ],
  },
  {
    id: "learn",
    label: "Learn",
    groups: [
      {
        links: [
          { href: "/docs", label: "Docs", description: "Foundations, patterns, templates" },
          { href: "/tutorials", label: "Tutorials", description: "Step-by-step builds you can follow" },
          { href: "/docs/workflows/daily-practice", label: "Recipes", description: "Ready-made workflows for real tasks" },
          { href: "/primitives", label: "Primitives", description: "When to use a rule, hook, skill or agent" },
          { href: "/certification", label: "Certification", description: "The 4 Claude credentials: prices, format, eligibility" },
        ],
      },
    ],
  },
];

const BN_PREFIX = /^\/bn(?=\/|$)/;

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
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Dropdown["id"] | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (openMenu && navRef.current && !navRef.current.contains(target)) {
        setOpenMenu(null);
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
  }, [mobileOpen, openMenu, closeAll]);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  function menuActive(menu: Dropdown): boolean {
    return menu.groups.some((group) => group.links.some((link) => isActive(link.href)));
  }

  /** On a Bangla page, the same page in English (every /bn route mirrors an English path). */
  const englishHref = BN_PREFIX.test(pathname) ? pathname.replace(BN_PREFIX, "") || "/" : null;

  const navItem = (active: boolean) =>
    `rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors lg:px-3.5 ${focusRing} ${
      active ? "bg-[var(--chip)] text-[var(--acc)]" : "text-[var(--ink)] hover:bg-[var(--chip)]"
    }`;

  const groupHeading = "px-3 pb-1 pt-2.5 font-mono text-label uppercase text-[var(--muted)]";

  return (
    <div className="sticky top-0 z-50 px-4 pt-2 md:px-16 md:pt-5">
      <div ref={barRef} className="relative mx-auto max-w-[1312px]">
        <header className="glass flex h-14 items-center justify-between rounded-xl pl-4 pr-2 text-[var(--ink)] md:h-[60px] md:pl-5 md:pr-3">
          <Link
            href="/"
            className={`flex items-center gap-2.5 whitespace-nowrap rounded-md text-body font-semibold tracking-[-0.01em] ${focusRing}`}
          >
            <Logo />
            Claude Code Guide
          </Link>

          <nav ref={navRef} className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {DROPDOWNS.map((menu) => {
              const open = openMenu === menu.id;
              const menuId = `${menu.id}-menu`;
              return (
                <div key={menu.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenu((prev) => (prev === menu.id ? null : menu.id))}
                    aria-expanded={open}
                    aria-controls={menuId}
                    className={`flex cursor-pointer items-center gap-1 whitespace-nowrap ${navItem(menuActive(menu))}`}
                  >
                    {menu.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div
                      id={menuId}
                      className="absolute left-0 top-full mt-2 max-h-[calc(100dvh-7rem)] w-80 overflow-y-auto rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-lg"
                    >
                      {menu.groups.map((group, gi) => (
                        <div
                          key={group.heading ?? gi}
                          className={gi > 0 ? "mt-1.5 border-t border-[var(--line)] pt-1.5" : ""}
                        >
                          {group.heading && <p className={groupHeading}>{group.heading}</p>}
                          {group.links.map((link) => (
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
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${link.wideOnly ? "hidden lg:block" : ""} whitespace-nowrap ${navItem(isActive(link.href))}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {englishHref && (
              <Link
                href={englishHref}
                hrefLang="en"
                lang="en"
                aria-label="Read in English"
                className={`hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[var(--line)] px-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--chip)] sm:flex ${focusRing}`}
              >
                <Languages className="h-4 w-4" aria-hidden="true" />
                <span className="hidden lg:inline">
                  <span className="hidden xl:inline">Read in&nbsp;</span>English
                </span>
              </Link>
            )}
            {/* Icon only between 768px and 1024px, where the bar is tightest */}
            <ThemeToggle className="md:[&>span]:hidden lg:[&>span]:inline" />
            <Link
              href="/start"
              className={`btn-secondary hidden h-10 items-center whitespace-nowrap px-4 text-sm font-medium sm:flex ${focusRing}`}
            >
              Start here
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
              {englishHref && (
                <Link
                  href={englishHref}
                  hrefLang="en"
                  lang="en"
                  className={`flex items-center gap-1.5 ${navItem(false)}`}
                >
                  <Languages className="h-4 w-4" aria-hidden="true" />
                  Read in English
                </Link>
              )}
              {DROPDOWNS.map((menu) => (
                <div key={menu.id} className="flex flex-col gap-0.5">
                  <p className="px-2.5 pb-1 pt-3 font-mono text-label uppercase text-[var(--muted)]">{menu.label}</p>
                  {menu.groups.flatMap((group) => group.links).map((link) => (
                    <Link key={link.href} href={link.href} className={navItem(isActive(link.href))}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              <p className="px-2.5 pb-1 pt-3 font-mono text-label uppercase text-[var(--muted)]">Read</p>
              {PRIMARY_NAV.map((link) => (
                <Link key={link.href} href={link.href} className={navItem(isActive(link.href))}>
                  {link.label}
                </Link>
              ))}
              <Link
                href="/start"
                className={`mt-2 flex h-11 items-center justify-center rounded-lg border border-[var(--line)] text-sm font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
              >
                Start here
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
