"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavLink {
  href: string;
  label: string;
}

interface DropdownLink {
  href: string;
  label: string;
  description: string;
}

const PRIMARY_NAV: NavLink[] = [
  { href: "/start", label: "Start Here" },
  { href: "/docs", label: "Docs" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/workflow", label: "Workflow" },
  { href: "/blog", label: "Blog" },
];

const FOR_YOUR_ROLE: DropdownLink[] = [
  {
    href: "/for-designers",
    label: "For Designers",
    description: "11 guides: briefs, research, handoff",
  },
  {
    href: "/for-chrome",
    label: "For Chrome",
    description: "6 guides: browser, Gmail, Google Docs",
  },
  {
    href: "/for-microsoft",
    label: "For Office",
    description: "7 guides: Word, Excel, PowerPoint",
  },
  {
    href: "/for-teachers",
    label: "For Teachers",
    description: "6 guides: plans, rubrics, feedback",
  },
  {
    href: "/for-marketers",
    label: "For Marketers",
    description: "7 guides: copy, campaigns, research",
  },
  {
    href: "/for-hr",
    label: "For HR",
    description: "6 guides: job descriptions, interviews, onboarding",
  },
  {
    href: "/pm-pilot",
    label: "PM Pilot",
    description: "AI-assisted product management",
  },
];

const ALL_NAV_LINKS: NavLink[] = [
  ...PRIMARY_NAV,
  ...FOR_YOUR_ROLE.map(({ href, label }) => ({ href, label })),
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeRole = useCallback(() => setRoleOpen(false), []);

  // Close mobile on Escape
  useEffect(() => {
    if (!mobileOpen && !roleOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMobile();
        closeRole();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, roleOpen, closeMobile, closeRole]);

  // Close mobile on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        closeMobile();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen, closeMobile]);

  // Close role dropdown on outside click
  useEffect(() => {
    if (!roleOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeRole();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [roleOpen, closeRole]);

  // Close both on route change
  useEffect(() => {
    closeMobile();
    closeRole();
  }, [pathname, closeMobile, closeRole]);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const isRoleActive = FOR_YOUR_ROLE.some((link) => isActive(link.href));

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-fd-border bg-fd-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center font-mono text-sm font-semibold text-fd-foreground hover:text-fd-foreground transition-colors"
          >
            claudecodeguide
            <span className="text-fd-muted-foreground">.dev</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive(link.href)
                    ? "bg-fd-primary/10 text-fd-primary font-medium"
                    : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* For Your Role dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setRoleOpen((prev) => !prev)}
                aria-expanded={roleOpen}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isRoleActive
                    ? "bg-fd-primary/10 text-fd-primary font-medium"
                    : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
                }`}
              >
                For Your Role
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${roleOpen ? "rotate-180" : ""}`}
                />
              </button>

              {roleOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 rounded-xl border border-fd-border bg-fd-background shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-1.5 grid gap-0.5">
                    {FOR_YOUR_ROLE.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`rounded-lg px-3 py-2.5 transition-colors ${
                          isActive(link.href)
                            ? "bg-fd-primary/10 text-fd-primary"
                            : "hover:bg-fd-accent"
                        }`}
                      >
                        <span className="block text-sm font-medium text-fd-foreground">
                          {link.label}
                        </span>
                        <span className="block text-xs text-fd-muted-foreground mt-0.5">
                          {link.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden rounded-lg p-2 text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute left-0 right-0 top-14 z-40 border-b border-fd-border bg-fd-background/95 backdrop-blur-lg shadow-lg animate-in slide-in-from-top-2 duration-150"
          >
            <nav
              className="mx-auto max-w-5xl flex flex-col gap-0.5 px-4 py-3"
              aria-label="Mobile navigation"
            >
              {ALL_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-fd-primary/10 text-fd-primary font-medium"
                      : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
