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
