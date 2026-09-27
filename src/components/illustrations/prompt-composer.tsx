import { Caret, Win } from './kit';

interface PromptComposerIllustrationProps {
  text?: string;
}

const DEFAULT_TEXT =
  'I want a CLAUDE.md file for this project. Read the package.json, the README, and the top three folders so you understand the stack';

export function PromptComposerIllustration({
  text = DEFAULT_TEXT,
}: PromptComposerIllustrationProps) {
  return (
    <Win title="claude code" status="prompt" width={280}>
      <p className="il-prompt">
        <span className="il-acc" aria-hidden>
          &gt;{' '}
        </span>
        {text}
        <Caret />
      </p>
    </Win>
  );
}
