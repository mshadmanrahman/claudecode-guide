'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { codeToHtml } from 'shiki';
import { claudeGuideTheme } from '@/lib/code-theme';

const LANG_MAP: Record<string, string> = {
  json: 'json',
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  python: 'python',
  py: 'python',
  html: 'html',
  css: 'css',
  yaml: 'yaml',
  yml: 'yaml',
  markdown: 'markdown',
  md: 'markdown',
  sql: 'sql',
  graphql: 'graphql',
  jsx: 'jsx',
  tsx: 'tsx',
};

// Animated React blocks a post can place with <div data-embed="name"></div>.
const EMBEDS = {
  'mods-agent-panel': dynamic(() => import('@/components/mods/mod-mocks').then((m) => m.ModsAgentPanelMock), { ssr: false }),
  'mods-usage': dynamic(() => import('@/components/mods/mod-mocks').then((m) => m.ModsUsageMock), { ssr: false }),
  'mods-active-pane': dynamic(() => import('@/components/mods/mod-mocks').then((m) => m.ModsActivePaneMock), { ssr: false }),
} as const;

function detectLanguage(code: string): string {
  const trimmed = code.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  if (trimmed.startsWith('$') || trimmed.startsWith('#!') || trimmed.includes('npm ') || trimmed.includes('git ')) return 'bash';
  if (trimmed.includes('import ') || trimmed.includes('export ') || trimmed.includes('const ')) return 'typescript';
  if (trimmed.includes('def ') || trimmed.includes('print(')) return 'python';
  if (trimmed.includes('<') && trimmed.includes('>')) return 'html';
  return 'text';
}

export function BlogContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preBlocks = container.querySelectorAll('pre');

    preBlocks.forEach(async (pre) => {
      const codeEl = pre.querySelector('code');
      if (!codeEl) return;

      const rawCode = codeEl.textContent ?? '';
      if (!rawCode.trim()) return;

      // Detect language from class or content
      const classLang = Array.from(codeEl.classList)
        .find((c) => c.startsWith('language-'))
        ?.replace('language-', '');
      const lang = LANG_MAP[classLang ?? ''] ?? detectLanguage(rawCode);

      try {
        const highlighted = await codeToHtml(rawCode, {
          lang,
          themes: { light: 'github-light', dark: claudeGuideTheme },
          defaultColor: false,
        });

        // Glass panel with a mono label bar and a copy button (docs + blog styles in globals.css)
        const wrapper = document.createElement('figure');
        wrapper.className = 'blog-code-block ccg-code not-prose';

        const bar = document.createElement('div');
        bar.className = 'ccg-code-bar';
        const label = document.createElement('span');
        label.textContent = lang === 'text' ? 'text' : lang;
        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'ccg-copy';
        copy.textContent = 'copy';
        copy.setAttribute('aria-label', 'Copy code');
        copy.addEventListener('click', () => {
          navigator.clipboard
            .writeText(rawCode)
            .then(() => {
              copy.textContent = 'copied';
              window.setTimeout(() => {
                copy.textContent = 'copy';
              }, 1600);
            })
            .catch(() => {
              copy.textContent = 'copy failed';
            });
        });
        bar.append(label, copy);

        const body = document.createElement('div');
        body.className = 'ccg-code-body';
        body.innerHTML = highlighted;

        wrapper.append(bar, body);
        pre.replaceWith(wrapper);
      } catch {
        // Shiki failed for this block, leave original styling
      }
    });
  }, [html]);

  // Split around <div data-embed="name" data-caption="..."></div> so each embed renders as a real component.
  const parts = html.split(/<div data-embed="([\w-]+)" data-caption="([^"]*)"><\/div>/);

  return (
    <div ref={containerRef}>
      {parts.map((part, i) => {
        if (i % 3 === 0) return part ? <div key={i} dangerouslySetInnerHTML={{ __html: part }} /> : null;
        if (i % 3 === 2) return null;
        const Embed = EMBEDS[part as keyof typeof EMBEDS];
        return Embed ? (
          <figure key={i} className="not-prose ccg-embed">
            <Embed />
            <figcaption>{parts[i + 1]}</figcaption>
          </figure>
        ) : null;
      })}
    </div>
  );
}
