'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { ClaudeMark } from '@/components/claude-mark';
import { useInView } from '@/hooks/use-in-view';

interface CopyBlockProps {
  code: string;
  language?: string;
}

const PLACEHOLDER = /(\[[^\]\n]+\])/g;
const isPlaceholder = (part: string) => /^\[[^\]\n]+\]$/.test(part);

export function CopyBlock({ code, language = 'bash' }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState<Record<number, string>>({});
  const [ref, inView] = useInView(0.4);
  const reduce = useReducedMotion();
  const isPrompt = language === 'text';
  const parts = useMemo(() => code.split(PLACEHOLDER), [code]);

  const finalText = () =>
    isPrompt ? parts.map((p, i) => (isPlaceholder(p) && values[i]?.trim() ? values[i].trim() : p)).join('') : code;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(finalText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const label = copied ? 'copied' : 'copy';
  const swap = reduce
    ? { duration: 0 }
    : { duration: 0.18 };

  if (isPrompt) {
    const fields = parts.filter(isPlaceholder).length;
    let fieldIndex = -1;
    return (
      <div
        ref={ref}
        className="overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--acc)_35%,var(--line))] bg-fd-background"
      >
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-4 py-2.5">
          <ClaudeMark className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium text-fd-foreground">Prompt</span>
          <span className="hidden text-xs text-fd-muted-foreground sm:inline">Paste into Claude</span>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--acc)] px-3 text-xs font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={swap}
                className="inline-flex items-center gap-1.5"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy prompt'}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <div className="whitespace-pre-wrap break-words px-4 py-4 text-sm leading-8 text-fd-foreground">
          {parts.map((part, i) => {
            if (!isPlaceholder(part)) return part;
            fieldIndex += 1;
            const n = fieldIndex;
            return (
              <motion.span
                key={i}
                className="inline-block rounded-md align-baseline"
                animate={
                  inView && !reduce
                    ? {
                        boxShadow: [
                          '0 0 0 0 color-mix(in srgb, var(--acc) 0%, transparent)',
                          '0 0 0 4px color-mix(in srgb, var(--acc) 35%, transparent)',
                          '0 0 0 0 color-mix(in srgb, var(--acc) 0%, transparent)',
                        ],
                      }
                    : undefined
                }
                transition={{ duration: 0.9, delay: 0.25 + n * 0.12, ease: 'easeOut' }}
              >
                <input
                  type="text"
                  value={values[i] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [i]: e.target.value }))}
                  placeholder={part}
                  aria-label={`Fill in ${part.slice(1, -1)}`}
                  size={Math.max(part.length, (values[i] ?? '').length, 6)}
                  className="rounded-md border-b border-dashed border-[var(--acc)] bg-[color-mix(in_srgb,var(--acc)_12%,transparent)] px-1.5 py-0 text-sm text-[var(--acc)] placeholder:text-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--acc)]"
                />
              </motion.span>
            );
          })}
        </div>
        {fields > 0 && (
          <p className="border-t border-[var(--line)] px-4 py-2 text-xs text-fd-muted-foreground">
            Click a violet field and type your own details, then copy.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2]">
      <div className="flex items-center justify-between border-b border-fd-border bg-[var(--code)] px-4 py-2">
        <span className="font-mono text-xs text-fd-muted-foreground">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-[var(--acc)]" />
              <span className="text-[var(--acc)]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-fd-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
