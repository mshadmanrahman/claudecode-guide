import type { Locale } from '@/lib/i18n/locale';

const CLAUDE_URL = 'https://claude.ai';

interface WhereToPasteProps {
  locale?: Locale;
}

/**
 * One line under a persona guide's title telling a first-time visitor where the
 * prompts go. Shorts viewers arrive without knowing claude.ai exists.
 */
export function WhereToPaste({ locale = 'en' }: WhereToPasteProps) {
  const link = (
    <a
      href={CLAUDE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-fd-foreground underline underline-offset-4"
    >
      claude.ai
    </a>
  );

  return (
    <p className="mt-3 text-base text-fd-muted-foreground">
      {locale === 'bn' ? (
        <>আরেকটা tab-এ {link} (free) খুলুন, তারপর নিচের prompt-টা paste করুন। ChatGPT-তেও কাজ করে।</>
      ) : (
        <>Open {link} (free) in another tab and paste the prompt below. Works in ChatGPT too.</>
      )}
    </p>
  );
}
