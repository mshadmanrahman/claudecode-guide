'use client';

import type { CliStep } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';

/**
 * Docs default for scripted sessions: the same steps the terminal mock takes,
 * shown in the Code tab of the desktop app. Title comes from the first prompt,
 * the folder chip from the cwd the page passed to the terminal version.
 */
export function AppSessionMock({
  steps,
  cwd,
  loop,
  height,
}: {
  steps: CliStep[];
  cwd?: string;
  loop?: boolean;
  height?: number;
}) {
  const first = steps.find((s) => s.kind === 'prompt');
  const text = first && 'text' in first ? String(first.text) : 'New session';
  const title = text.length > 42 ? `${text.slice(0, 40).trimEnd()}…` : text;
  const folder = cwd ? cwd.split('/').filter(Boolean).at(-1) : undefined;
  return <ClaudeDesktopCodeMock steps={steps} title={title} folder={folder} loop={loop} height={height} />;
}
