import Link from 'next/link';
import { ui } from '@/lib/i18n/locale';

/** Shown on a Bangla page whose English source changed after it was translated. */
export function StaleNotice({ englishHref }: { englishHref: string }) {
  const t = ui('bn');
  return (
    <p role="note" className="mx-auto mt-28 max-w-5xl rounded-xl border border-fd-border bg-[var(--code)] p-4 text-sm text-fd-muted-foreground">
      {t.staleNotice}{' '}
      <Link href={englishHref} hrefLang="en" className="text-[var(--acc)] underline underline-offset-4">
        {t.readEnglish}
      </Link>
    </p>
  );
}
