'use client';

import { useEffect, useRef } from 'react';
import { codeToHtml } from 'shiki';
import type { ThemeRegistration } from 'shiki';

const customTheme: ThemeRegistration = {
  name: 'claude-guide',
  type: 'dark',
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#d4d4d4',
  },
  tokenColors: [
    {
      name: 'Strings (values)',
      scope: ['string', 'string.quoted'],
      settings: { foreground: '#c792ea' }, // purple
    },
    {
      name: 'Property keys',
      scope: ['support.type.property-name', 'string.json support.type.property-name'],
      settings: { foreground: '#89ddff' }, // light blue
    },
    {
      name: 'Object keys generic',
      scope: ['meta.object-literal.key', 'entity.name.tag', 'variable.other.property'],
      settings: { foreground: '#89ddff' }, // light blue
    },
    {
      name: 'Punctuation and symbols',
      scope: [
        'punctuation',
        'meta.brace',
        'punctuation.definition.block',
        'punctuation.separator',
        'punctuation.definition.string',
        'punctuation.definition.dictionary',
        'punctuation.support.type.property-name',
      ],
      settings: { foreground: '#7ec699' }, // light green
    },
    {
      name: 'Keywords',
      scope: ['keyword', 'storage'],
      settings: { foreground: '#89ddff' }, // light blue
    },
    {
      name: 'Constants and numbers',
      scope: ['constant', 'constant.numeric', 'constant.language'],
      settings: { foreground: '#c792ea' }, // purple
    },
    {
      name: 'Variables',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#d4d4d4' },
    },
    {
      name: 'Functions',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#82aaff' }, // blue
    },
    {
      name: 'Comments',
      scope: ['comment'],
      settings: { foreground: '#637777', fontStyle: 'italic' },
    },
    {
      name: 'Operators',
      scope: ['keyword.operator'],
      settings: { foreground: '#7ec699' }, // light green
    },
  ],
};

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
          theme: customTheme,
        });

        // Create a wrapper with Carbon-style chrome
        const wrapper = document.createElement('div');
        wrapper.className = 'blog-code-block';
        wrapper.innerHTML = `
          <div style="background: #1e1e1e; border-radius: 12px; overflow: hidden; margin: 1.5rem 0; border: 1px solid #333; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; gap: 6px; padding: 12px 16px; background: #2d2d2d;">
              <span style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f57;"></span>
              <span style="width: 12px; height: 12px; border-radius: 50%; background: #febc2e;"></span>
              <span style="width: 12px; height: 12px; border-radius: 50%; background: #28c840;"></span>
            </div>
            <div style="padding: 0;">${highlighted}</div>
          </div>
        `;

        // Override shiki's generated pre/code styles and reset prose bleeding
        const shikiPre = wrapper.querySelector('pre');
        if (shikiPre) {
          shikiPre.style.margin = '0';
          shikiPre.style.padding = '16px 20px';
          shikiPre.style.borderRadius = '0';
          shikiPre.style.border = 'none';
          shikiPre.style.fontSize = '14px';
          shikiPre.style.lineHeight = '1.6';
          shikiPre.style.overflowX = 'auto';
          shikiPre.style.whiteSpace = 'pre-wrap';
          shikiPre.style.wordBreak = 'break-word';
          shikiPre.style.background = 'transparent';
        }

        // Reset prose code styles that bleed into the highlighted output
        const codeEls = wrapper.querySelectorAll('code');
        codeEls.forEach((code) => {
          code.style.background = 'transparent';
          code.style.padding = '0';
          code.style.borderRadius = '0';
          code.style.fontSize = 'inherit';
        });

        // Reset any span backgrounds from prose
        const spans = wrapper.querySelectorAll('span');
        spans.forEach((span) => {
          if (!span.style.color) return;
          span.style.background = 'transparent';
        });

        pre.replaceWith(wrapper);
      } catch {
        // Shiki failed for this block, leave original styling
      }
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
