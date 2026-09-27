import type { ComponentProps } from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

type DocPreProps = ComponentProps<'pre'> & {
  title?: string;
  icon?: string;
  'data-language'?: string;
};

/**
 * MDX `pre` for docs: the Fumadocs CodeBlock, always with a filename bar.
 * Blocks without a `title="..."` meta fall back to their language name, so the
 * copy button sits in the bar instead of floating over the code.
 */
export function DocPre({ title, icon, children, ...props }: DocPreProps) {
  const lang = props['data-language'];
  const label = title ?? (lang && lang !== 'plaintext' ? lang : 'text');
  return (
    <CodeBlock {...props} title={label} icon={icon} className="ccg-code">
      <Pre>{children}</Pre>
    </CodeBlock>
  );
}
