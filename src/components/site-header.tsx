'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, BookOpen } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { DocsDrawer } from './docs-drawer';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/start', label: 'Start Here' },
  { href: '/docs', label: 'Docs' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/pm-pilot', label: 'PM Pilot' },
  { href: '/blog', label: 'Blog' },
];

interface DocSection {
  name: string;
  pages: DocPageInfo[];
}

interface SiteHeaderProps {
  docsSections?: DocSection[];
}

export function SiteHeader({ docsSections }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isDocsPage = pathname.startsWith('/docs');
  const sections = docsSections ?? [];

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMobile();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMobile]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        closeMobile();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen, closeMobile]);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + '/');
  }

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
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive(link.href)
                    ? 'bg-fd-primary/10 text-fd-primary font-medium'
                    : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Docs drawer button, only on docs pages */}
            {isDocsPage && sections.length > 0 && (
              <button
                onClick={() => setDrawerOpen(true)}
                className="hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
                aria-label="Open documentation contents"
              >
                <BookOpen className="h-4 w-4" />
                <span className="text-xs">Contents</span>
              </button>
            )}

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden rounded-lg p-2 text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute left-0 right-0 top-14 z-40 border-b border-fd-border bg-fd-background/95 backdrop-blur-lg shadow-lg animate-in slide-in-from-top-2 duration-150"
          >
            <nav className="mx-auto max-w-5xl flex flex-col gap-0.5 px-4 py-3" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? 'bg-fd-primary/10 text-fd-primary font-medium'
                      : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Browse docs link on mobile for docs pages */}
              {isDocsPage && sections.length > 0 && (
                <button
                  onClick={() => {
                    closeMobile();
                    setDrawerOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse docs
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Docs drawer */}
      {isDocsPage && sections.length > 0 && (
        <DocsDrawer
          open={drawerOpen}
          onClose={closeDrawer}
          sections={sections}
        />
      )}
    </>
  );
}
