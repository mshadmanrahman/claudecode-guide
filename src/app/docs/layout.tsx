import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="font-mono text-sm font-bold tracking-tight">
            claudecodeguide<span className="text-fd-foreground">.dev</span>
          </span>
        ),
        url: '/',
      }}
      githubUrl="https://github.com/mshadmanrahman/claudecode-guide"
      sidebar={{
        defaultOpenLevel: 1,
        banner: (
          <div className="flex flex-wrap gap-2 pb-2 border-b border-fd-border mb-2">
            <a href="/guide" className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors">Guide</a>
            <span className="text-fd-border">|</span>
            <a href="/roadmap" className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors">Roadmap</a>
            <span className="text-fd-border">|</span>
            <a href="/tutorials" className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors">Tutorials</a>
            <span className="text-fd-border">|</span>
            <a href="/blog" className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors">Blog</a>
          </div>
        ),
        footer: (
          <div className="pt-2 border-t border-fd-border">
            <a
              href="https://github.com/mshadmanrahman/claudecode-guide/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Stuck? Open an issue
            </a>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
