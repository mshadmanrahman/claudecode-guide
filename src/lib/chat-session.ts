import type { ChatStep } from '@/components/app-chat-demo';
import type { CliStep } from '@/components/claude-code-mock';

/**
 * A chat script replayed as a Claude Code session: each user turn is typed and
 * sent, each reply arrives after a short think. Steps with a hand-written
 * cliDemo get tool rows too; this keeps every other step on the same mock.
 */
export function chatToSession(steps: ChatStep[]): CliStep[] {
  return steps.flatMap((s): CliStep[] =>
    s.role === 'user' ? [{ kind: 'prompt', text: s.text }] : [{ kind: 'thinking', ms: 900 }, { kind: 'say', text: s.text }],
  );
}

/** One line of the old terminal card script. */
export interface TerminalLine {
  type: 'cmd' | 'out' | 'success' | 'warn' | 'error';
  text: string;
}

/**
 * A terminal card script replayed as a Code tab session, for translations that
 * still carry the old shape: `claude "X"` becomes the prompt X, any other
 * command becomes a Bash row whose result is the next output line.
 */
export function demoToSession(lines: TerminalLine[]): CliStep[] {
  const steps: CliStep[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.type === 'cmd') {
      const cmd = line.text.replace(/^\$\s*/, '').trim();
      const ask = cmd.match(/^claude\s+"(.+)"$/);
      if (ask) steps.push({ kind: 'prompt', text: ask[1] }, { kind: 'thinking', ms: 900 });
      else if (cmd !== 'claude') {
        const next = lines[i + 1];
        const result = next && next.type !== 'cmd' ? next.text : 'Done';
        if (next && next.type !== 'cmd') i++;
        steps.push({ kind: 'tool', name: 'Bash', arg: cmd, result });
      }
    } else {
      steps.push({ kind: 'say', text: line.text });
    }
  }
  return steps;
}
